import { Token } from "@/components/visualizer/stack-applications/types"

export type Operator = '+' | '-' | '*' | '/' | '^'
export type OperatorInfo = { precedence: number; associativity: 'left' | 'right' }

export const operators: Record<Operator, OperatorInfo> = {
  '+': { precedence: 1, associativity: 'left' },
  '-': { precedence: 1, associativity: 'left' },
  '*': { precedence: 2, associativity: 'left' },
  '/': { precedence: 2, associativity: 'left' },
  '^': { precedence: 3, associativity: 'right' },
}

export function isOperator(char: string): char is Operator {
  return Object.keys(operators).includes(char)
}

export function hasHigherPrecedence(op1: Operator, op2: Operator): boolean {
  const p1 = operators[op1].precedence
  const p2 = operators[op2].precedence
  
  if (operators[op1].associativity === 'left') {
    return p1 >= p2
  }
  return p1 > p2
}

export function evaluatePostfix(tokens: Token[]): number {
  const stack: number[] = []
  
  for (const token of tokens) {
    if (token.type === 'operand') {
      stack.push(Number(token.value))
    } else if (token.type === 'operator' && isOperator(token.value)) {
      const b = stack.pop()!
      const a = stack.pop()!
      
      switch (token.value) {
        case '+': stack.push(a + b); break
        case '-': stack.push(a - b); break
        case '*': stack.push(a * b); break
        case '/': stack.push(a / b); break
        case '^': stack.push(Math.pow(a, b)); break
      }
    }
  }
  
  return stack[0]
} 