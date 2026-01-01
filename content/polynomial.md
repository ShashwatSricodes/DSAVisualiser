# Polynomial Multiplication using Linked Lists

A polynomial is an expression consisting of variables and coefficients. For example: 2x² + 3x + 1

When multiplying two polynomials, we:
1. Multiply each term of the first polynomial with each term of the second polynomial
2. Add the terms with the same exponents
3. Arrange the result in descending order of exponents

## Implementation using Linked Lists

Each node in our linked list represents a term in the polynomial, storing:
- Coefficient (the number)
- Exponent (the power of x)

For example, for 2x² + 3x + 1:
- First node: {coefficient: 2, exponent: 2}
- Second node: {coefficient: 3, exponent: 1}
- Third node: {coefficient: 1, exponent: 0} 