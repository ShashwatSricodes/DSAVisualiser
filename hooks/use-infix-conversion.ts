import { useState } from 'react'
import { Token, ConversionStep } from '@/components/visualizer/stack-applications/types'
import { isOperator, hasHigherPrecedence, Operator } from '@/lib/stack-operations'

export function useInfixConversion() {
  const [steps, setSteps] = useState<ConversionStep[]>([])
  const [isConverting, setIsConverting] = useState(false)
  const [result, setResult] = useState<Token[]>([])

  const tokenize = (expression: string): Token[] => {
    const tokens: Token[] = []
    let current = ''
    
    for (const char of expression.replace(/\s+/g, '')) {
      if (isOperator(char)) {
        if (current) {
          tokens.push({ value: current, type: 'operand' })
          current = ''
        }
        tokens.push({ value: char, type: 'operator' })
      } else if (char === '(' || char === ')') {
        if (current) {
          tokens.push({ value: current, type: 'operand' })
          current = ''
        }
        tokens.push({ value: char, type: 'parenthesis' })
      } else {
        current += char
      }
    }
    
    if (current) {
      tokens.push({ value: current, type: 'operand' })
    }
    
    return tokens
  }

  const addStep = (
    stack: Token[], 
    output: Token[], 
    currentToken: Token | undefined, 
    position: number,
    message: string
  ) => {
    setSteps(prev => [...prev, {
      state: {
        stack: [...stack],
        output: [...output],
        currentToken,
        currentPosition: position,
        message
      },
      action: message,
      timestamp: Date.now()
    }])
  }

  const convert = async (expression: string) => {
    setIsConverting(true)
    setSteps([])
    
    const tokens = tokenize(expression)
    const stack: Token[] = []
    const output: Token[] = []
    
    for (let i = 0; i < tokens.length; i++) {
      const token = tokens[i]
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      if (token.type === 'operand') {
        output.push(token)
        addStep(stack, output, token, i, `Add operand ${token.value} to output`)
      }
      else if (token.type === 'operator') {
        while (stack.length > 0 && 
               stack[stack.length - 1].type === 'operator' && 
               hasHigherPrecedence(stack[stack.length - 1].value as Operator, token.value as Operator)) {
          const operator = stack.pop()!
          output.push(operator)
          addStep(stack, output, token, i, `Pop operator ${operator.value} from stack to output`)
        }
        stack.push(token)
        addStep(stack, output, token, i, `Push operator ${token.value} to stack`)
      }
      else if (token.value === '(') {
        stack.push(token)
        addStep(stack, output, token, i, `Push opening parenthesis to stack`)
      }
      else if (token.value === ')') {
        while (stack.length > 0 && stack[stack.length - 1].value !== '(') {
          const operator = stack.pop()!
          output.push(operator)
          addStep(stack, output, token, i, `Pop operator ${operator.value} from stack to output`)
        }
        if (stack.length > 0) stack.pop() // Remove '('
        addStep(stack, output, token, i, `Remove opening parenthesis from stack`)
      }
    }
    
    while (stack.length > 0) {
      const operator = stack.pop()!
      output.push(operator)
      addStep(stack, output, undefined, tokens.length, `Pop remaining operator ${operator.value} from stack to output`)
    }
    
    setResult(output)
    setIsConverting(false)
  }

  return {
    steps,
    isConverting,
    result,
    convert
  }
} 