# Stack Applications

## Infix to Postfix Conversion

Converting infix expressions (e.g., `3 + 4 * 2`) to postfix notation (e.g., `3 4 2 * +`) using a stack.

### Algorithm
1. Scan the infix expression from left to right
2. If the scanned character is an operand, add it to output
3. If the scanned character is an operator:
   - While stack is not empty and top operator has higher/equal precedence:
     - Pop operator from stack to output
   - Push the scanned operator to stack
4. If scanned character is '(', push it to stack
5. If scanned character is ')', pop stack to output until '(' is found
6. After scanning, pop remaining operators from stack to output

### Operator Precedence
- Higher precedence operators are evaluated first
- In case of equal precedence, evaluate from left to right
- Precedence order: ^, *, /, +, -

### Examples
- Input: `a + b * c`
- Output: `a b c * +`

- Input: `(a + b) * c`
- Output: `a b + c *` 