from flask import Flask, render_template_string, request
import sqlite3
import re
from lxml import etree
from bs4 import BeautifulSoup

app = Flask(__name__)

conn = sqlite3.connect(':memory:', check_same_thread=False)
cursor = conn.cursor()

def detect_language(code):
    code = code.strip()
    if re.search(r'^\s*<\s*html', code, re.I) or re.search(r'<\/?(html|head|body|div|p|span|h1|style)', code, re.I):
        if '<style>' in code:
            return 'html+css'
        else:
            return 'html'
    if re.search(r'^\s*(SELECT|INSERT|UPDATE|DELETE|CREATE|DROP|ALTER)\b', code, re.I):
        return 'sql'
    if re.search(r'^[\s\S]*\{[\s\S]*\}[\s\S]*$', code):
        return 'css'
    return 'unknown'

def run_sql(code):
    output = []
    try:
        statements = [stmt.strip() for stmt in code.strip().split(';') if stmt.strip()]
        for stmt in statements:
            cursor.execute(stmt)
            if stmt.lower().startswith('select'):
                rows = cursor.fetchall()
                cols = [desc[0] for desc in cursor.description]
                output.append(f"Query: {stmt}")
                output.append("Columns: " + ", ".join(cols))
                for row in rows:
                    output.append(str(row))
            else:
                conn.commit()
                output.append(f"Executed: {stmt}")
    except Exception as e:
        output.append(f"Error: {e}")
    return "\n".join(output)

def validate_html_strict(html_code):
    try:
        soup = BeautifulSoup(html_code, 'html.parser')  # or 'html5lib'
        return True, ""
    except Exception as e:
        return False, str(e)

def apply_css_inline(html, css):
    from bs4 import BeautifulSoup
    soup = BeautifulSoup(html, 'html.parser')

    def parse_css(css_text):
        rules = {}
        css_text = re.sub(r'/\*.*?\*/', '', css_text, flags=re.S)
        blocks = re.findall(r'([^{]+){([^}]+)}', css_text)
        for selector, body in blocks:
            selector = selector.strip()
            props = {}
            for prop in body.strip().split(';'):
                if ':' in prop:
                    k,v = prop.split(':',1)
                    props[k.strip()] = v.strip()
            rules[selector] = props
        return rules

    rules = parse_css(css)

    for selector, props in rules.items():
        elements = []
        if selector.startswith('#'):
            el = soup.find(id=selector[1:])
            if el:
                elements.append(el)
        elif selector.startswith('.'):
            elements.extend(soup.find_all(class_=selector[1:]))
        elif '.' in selector:
            tag, cls = selector.split('.', 1)
            elements.extend(soup.find_all(tag, class_=cls))
        elif '#' in selector:
            tag, eid = selector.split('#', 1)
            el = soup.find(tag, id=eid)
            if el:
                elements.append(el)
        else:
            elements.extend(soup.find_all(selector))
        
        for el in elements:
            style = el.get('style','')
            for k,v in props.items():
                style += f"{k}: {v}; "
            el['style'] = style.strip()

    return str(soup)

@app.route("/", methods=["GET", "POST"])
def index():
    code = ''
    detected = ''
    output_text = ''
    rendered_html = ''
    error = ''
    interpreted_code = ''

    if request.method == "POST":
        code = request.form.get("code", "")
        detected = detect_language(code)

        if detected == 'sql':
            output_text = run_sql(code)

        elif detected == 'html+css':
            css = ''
            html_code = code
            m = re.search(r'<style.*?>(.*?)<\/style>', code, re.S|re.I)
            if m:
                css = m.group(1)
                html_code = re.sub(r'<style.*?>.*?<\/style>', '', code, re.S|re.I)

            valid, err_msg = validate_html_strict(html_code)
            if not valid:
                error = f"HTML Syntax Error: {err_msg}"
            else:
                interpreted_code = apply_css_inline(html_code, css)
                rendered_html = interpreted_code

        elif detected == 'html':
            valid, err_msg = validate_html_strict(code)
            if not valid:
                error = f"HTML Syntax Error: {err_msg}"
            else:
                interpreted_code = code
                rendered_html = code

        elif detected == 'css':
            output_text = "CSS code detected but no HTML provided to apply styles."

        else:
            output_text = "Language not detected or not supported."

    return render_template_string("""
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Multi-language Interpreter</title>
  <style>
    body {
      font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
      background-color: #f4f6f8;
      margin: 0;
      padding: 20px;
      color: #333;
    }

    h1 {
      text-align: center;
      color: #2c3e50;
    }

    form {
      background: #fff;
      padding: 20px;
      border-radius: 12px;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
      max-width: 800px;
      margin: 0 auto 20px;
    }

    .label {
      font-weight: 600;
      margin-top: 15px;
      display: block;
      font-size: 16px;
      color: #34495e;
    }

    textarea {
      width: 100%;
      height: 180px;
      font-family: monospace;
      font-size: 14px;
      padding: 10px;
      border-radius: 8px;
      border: 1px solid #ccc;
      resize: vertical;
      background: #fdfdfd;
    }

    button {
      display: inline-block;
      margin-top: 15px;
      padding: 10px 20px;
      background-color: #3498db;
      color: white;
      border: none;
      border-radius: 6px;
      font-size: 15px;
      cursor: pointer;
      transition: background-color 0.2s ease-in-out;
    }

    button:hover {
      background-color: #2980b9;
    }

    pre, #output, #rendered, #error, #interpreted_code {
      background: #f9f9f9;
      border: 1px solid #ccc;
      padding: 15px;
      border-radius: 8px;
      white-space: pre-wrap;
      word-wrap: break-word;
      margin-top: 10px;
      font-size: 14px;
      overflow-x: auto;
    }

    #error {
      background: #ffecec;
      color: #d8000c;
      border-color: #f5c6cb;
    }

    iframe {
      width: 100%;
      height: 300px;
      border: 1px solid #ccc;
      border-radius: 8px;
      margin-top: 10px;
    }

    .output-section {
      background: #fff;
      padding: 20px;
      border-radius: 12px;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
      max-width: 800px;
      margin: 20px auto;
    }

    strong {
      color: #2c3e50;
    }
  </style>
</head>
<body>
  <h1>Multi-language Interpreter</h1>

  <form method="post">
    <label for="code" class="label">Enter your code:</label>
    <textarea id="code" name="code">{{ code }}</textarea>
    <button type="submit">Run</button>
  </form>

  <div class="output-section">
    {% if detected %}
      <div class="label">Detected language: <strong>{{ detected }}</strong></div>
    {% endif %}

    {% if error %}
      <div id="error" class="label">Error:</div>
      <pre id="error">{{ error }}</pre>
    {% else %}
      {% if output_text %}
        <div class="label">Output / Logs:</div>
        <pre id="output">{{ output_text }}</pre>
      {% endif %}

      {% if interpreted_code %}
        <div class="label">Interpreted HTML+CSS Code:</div>
        <pre id="interpreted_code">{{ interpreted_code }}</pre>
      {% endif %}

      {% if rendered_html %}
        <div class="label">Rendered HTML+CSS Preview:</div>
        <iframe id="preview"></iframe>
        <script>
          const iframe = document.getElementById('preview');
          const content = `{{ rendered_html|tojson|safe }}`;
          iframe.srcdoc = content;
        </script>
      {% endif %}
    {% endif %}
  </div>
</body>
</html>

""", code=code, detected=detected, output_text=output_text, rendered_html=rendered_html, error=error, interpreted_code=interpreted_code)

if __name__ == "__main__":
    app.run(debug=True)
