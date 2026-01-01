export type TokenType = 'operator' | 'operand' | 'parenthesis'

export interface Token {
  value: string
  type: TokenType
}

export interface StackState {
  stack: Token[]
  output: Token[]
  currentToken?: Token
  currentPosition: number
  message: string
}

export interface ConversionStep {
  state: StackState
  action: string
  timestamp: number
} 