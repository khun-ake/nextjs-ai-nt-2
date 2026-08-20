import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'

describe('Basic Setup Test', () => {
  it('renders a simple element', () => {
    const { container } = render(<div>Hello Vitest</div>)
    expect(container.textContent).toBe('Hello Vitest')
  })
})
