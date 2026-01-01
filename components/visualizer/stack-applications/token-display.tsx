"use client"

import { Token } from "./types"

interface TokenDisplayProps {
  token: Token
  highlighted?: boolean
}

export function TokenDisplay({ token, highlighted = false }: TokenDisplayProps) {
  const getColor = () => {
    switch (token.type) {
      case 'operator': return 'bg-blue-500/20 text-blue-500'
      case 'operand': return 'bg-green-500/20 text-green-500'
      case 'parenthesis': return 'bg-orange-500/20 text-orange-500'
      default: return 'bg-muted'
    }
  }

  return (
    <div className={`px-3 py-1.5 rounded-md font-mono text-sm ${getColor()} ${
      highlighted ? 'ring-2 ring-primary' : ''
    }`}>
      {token.value}
    </div>
  )
} 