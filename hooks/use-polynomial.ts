import { useState, useEffect } from 'react'

export interface Term {
  coefficient: number
  exponent: number
}

export interface PolynomialNode {
  id: string
  term: Term
  next: string | null
}

export interface Polynomial {
  head: string | null
  nodes: Map<string, PolynomialNode>
}

export type MultiplicationStep = {
  type: 'SELECT_TERMS' | 'MULTIPLY' | 'ADD_TO_RESULT'
  term1?: Term
  term2?: Term
  resultTerm?: Term
  intermediateResult?: Term[]
  node1?: string
  node2?: string
  message: string
}

export function usePolynomial() {
  const [poly1, setPoly1] = useState<Polynomial>({ head: null, nodes: new Map() })
  const [poly2, setPoly2] = useState<Polynomial>({ head: null, nodes: new Map() })
  const [result, setResult] = useState<Polynomial>({ head: null, nodes: new Map() })
  const [steps, setSteps] = useState<MultiplicationStep[]>([])
  const [currentStep, setCurrentStep] = useState(-1)
  const [highlightedNodes, setHighlightedNodes] = useState<{
    poly1: string[]
    poly2: string[]
    result: string[]
  }>({ poly1: [], poly2: [], result: [] })

  const createPolynomial = (terms: Term[]): Polynomial => {
    const nodes = new Map<string, PolynomialNode>()
    let head: string | null = null
    let prev: string | null = null

    terms.forEach((term, index) => {
      const id = `node-${index}`
      nodes.set(id, {
        id,
        term,
        next: null
      })

      if (!head) head = id
      if (prev) nodes.get(prev)!.next = id
      prev = id
    })

    return { head, nodes }
  }

  const loadExample = () => {
    // Example: (2x^2 + 3x + 1) * (x + 2)
    const terms1 = [
      { coefficient: 2, exponent: 2 },
      { coefficient: 3, exponent: 1 },
      { coefficient: 1, exponent: 0 }
    ]
    const terms2 = [
      { coefficient: 1, exponent: 1 },
      { coefficient: 2, exponent: 0 }
    ]

    setPoly1(createPolynomial(terms1))
    setPoly2(createPolynomial(terms2))
    setResult({ head: null, nodes: new Map() })
    setSteps([])
    setCurrentStep(-1)
  }

  const parsePolynomial = (input: string): Term[] => {
    // Basic parsing of format like "2x^2 + 3x + 1"
    const terms: Term[] = []
    const parts = input.split(/\s*\+\s*/)
    
    parts.forEach(part => {
      const match = part.match(/^(-?\d*)?(?:x(?:\^(\d+))?)?$/)
      if (match) {
        const coefficient = match[1] ? parseInt(match[1]) : (part.includes('x') ? 1 : parseInt(part))
        const exponent = match[2] ? parseInt(match[2]) : (part.includes('x') ? 1 : 0)
        terms.push({ coefficient, exponent })
      }
    })
    
    return terms.sort((a, b) => b.exponent - a.exponent)
  }

  const multiply = async () => {
    const steps: MultiplicationStep[] = []
    const resultTerms = new Map<number, number>()

    let node1 = poly1.head
    while (node1) {
      const term1 = poly1.nodes.get(node1)!.term

      let node2 = poly2.head
      while (node2) {
        const term2 = poly2.nodes.get(node2)!.term

        // Step 1: Select terms
        steps.push({
          type: 'SELECT_TERMS',
          term1,
          term2,
          node1,
          node2,
          message: `Selecting terms: ${formatTerm(term1)} and ${formatTerm(term2)}`
        })

        // Step 2: Multiply terms
        const resultExp = term1.exponent + term2.exponent
        const resultCoef = term1.coefficient * term2.coefficient
        const resultTerm = { coefficient: resultCoef, exponent: resultExp }
        
        steps.push({
          type: 'MULTIPLY',
          term1,
          term2,
          resultTerm,
          node1,
          node2,
          message: `${formatTerm(term1)} × ${formatTerm(term2)} = ${formatTerm(resultTerm)}`
        })

        // Step 3: Add to result
        const currentValue = resultTerms.get(resultExp) || 0
        resultTerms.set(resultExp, currentValue + resultCoef)

        // Create a sorted array of all current terms
        const currentTerms = Array.from(resultTerms.entries())
          .map(([exp, coef]) => ({ coefficient: coef, exponent: exp }))
          .sort((a, b) => {
            // Sort by exponent first
            if (b.exponent !== a.exponent) return b.exponent - a.exponent
            // If exponents are equal, sort by coefficient
            return Math.abs(b.coefficient) - Math.abs(a.coefficient)
          })
          .filter(term => term.coefficient !== 0) // Remove terms with coefficient 0

        steps.push({
          type: 'ADD_TO_RESULT',
          resultTerm: resultTerm,
          intermediateResult: currentTerms,
          node1,
          node2,
          message: `Adding ${formatTerm(resultTerm)} to result, combined terms: ${
            currentTerms.map(formatTerm).join(' + ')
          }`
        })

        node2 = poly2.nodes.get(node2)!.next
      }
      node1 = poly1.nodes.get(node1)!.next
    }

    setSteps(steps)
    setCurrentStep(0)
  }

  useEffect(() => {
    if (currentStep < 0 || !steps[currentStep]) return

    const step = steps[currentStep]
    const newHighlighted = {
      poly1: [] as string[],
      poly2: [] as string[],
      result: [] as string[]
    }

    if (step.node1) newHighlighted.poly1.push(step.node1)
    if (step.node2) newHighlighted.poly2.push(step.node2)

    // Update result based on current step
    if (step.type === 'ADD_TO_RESULT' && step.intermediateResult) {
      // Create new polynomial from the current step's intermediate result
      const newResult = createPolynomial(step.intermediateResult)
      setResult(newResult)

      // Highlight the current term being added
      if (step.resultTerm) {
        const resultNode = Array.from(newResult.nodes.entries())
          .find(([_, node]) => 
            node.term.exponent === step.resultTerm!.exponent && 
            node.term.coefficient === step.resultTerm!.coefficient
          )?.[0]
        if (resultNode) {
          newHighlighted.result.push(resultNode)
        }
      }
    }

    setHighlightedNodes(newHighlighted)
  }, [currentStep, steps])

  const formatTerm = (term: Term): string => {
    if (term.exponent === 0) return term.coefficient.toString()
    const coef = term.coefficient === 1 ? '' : term.coefficient === -1 ? '-' : term.coefficient.toString()
    const exp = term.exponent === 1 ? 'x' : `x^${term.exponent}`
    return `${coef}${exp}`
  }

  return {
    poly1,
    poly2,
    result,
    steps,
    currentStep,
    highlightedNodes,
    createPolynomial,
    loadExample,
    parsePolynomial,
    multiply,
    setCurrentStep,
    setPoly1,
    setPoly2
  }
} 