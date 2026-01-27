/**
 * Component Test Template
 *
 * Usage:
 * 1. Copy this file to test/components/{folder}/{component-name}.test.tsx
 * 2. Replace all occurrences of:
 *    - ComponentName -> Your component name (PascalCase)
 *    - component-folder -> Your component folder name (kebab-case)
 * 3. Update defaultProps with required props
 * 4. Add component-specific tests
 * 5. Remove this header comment
 */

/* eslint-disable max-lines-per-function */
import React from 'react'

import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { ComponentName } from '@/components/component-folder/ComponentName'

import type { ComponentNameProps } from '@/components/component-folder/ComponentName'

// === MOCKS ===

// Mock useOptionalSekai hook (required for themed components)
jest.mock('@/internal/useOptionalSekai', () => ({
  useOptionalSekai: jest.fn(() => ({
    sekaiColor: '#33ccba',
    modeTheme: 'light',
    isLight: true,
  })),
}))

// Mock converter utilities
jest.mock('@/utils/converter', () => ({
  convertHexToRgba: jest.fn(
    (color: string, alpha: number) => `rgba(51, 204, 186, ${alpha})`,
  ),
  convertHexToRgbaMixWithBlackOrWhite: jest.fn(() => 'rgba(51, 204, 186, 0.8)'),
}))

// Add additional mocks as needed (SVG, portal, etc.)

// === TEST SUITE ===

describe('ComponentName Component', () => {
  // Default props - update with your component's required props
  const defaultProps: ComponentNameProps = {
    // Required props here
  }

  // Reset mocks between tests
  beforeEach(() => {
    jest.clearAllMocks()
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  // ============================================
  // RENDERING TESTS
  // ============================================

  describe('Rendering', () => {
    it('should render without crashing', () => {
      render(<ComponentName {...defaultProps} />)
      // Update selector based on your component
      // expect(screen.getByRole('...')).toBeInTheDocument()
    })

    it('should render with custom id', () => {
      render(<ComponentName {...defaultProps} id="custom-id" />)
      const { container } = render(<ComponentName {...defaultProps} id="custom-id" />)
      expect(container.querySelector('#custom-id')).toBeInTheDocument()
    })

    it('should render with custom className', () => {
      const { container } = render(<ComponentName {...defaultProps} className="custom-class" />)
      expect(container.querySelector('.custom-class')).toBeInTheDocument()
    })

    it('should render with custom styles', () => {
      const customStyle = { backgroundColor: 'red', padding: '10px' }
      const { container } = render(<ComponentName {...defaultProps} style={customStyle} />)
      const element = container.firstChild as HTMLElement
      expect(element).toHaveStyle('background-color: rgb(255, 0, 0)')
      expect(element).toHaveStyle('padding: 10px')
    })

    it('should render children content', () => {
      render(
        <ComponentName {...defaultProps}>
          <span data-testid="child-content">Child Content</span>
        </ComponentName>,
      )
      expect(screen.getByTestId('child-content')).toBeInTheDocument()
    })
  })

  // ============================================
  // PROPS TESTS
  // ============================================

  describe('Props', () => {
    // Add tests for each prop

    describe('propName', () => {
      it('should apply propName when provided', () => {
        // render(<ComponentName {...defaultProps} propName="value" />)
        // Assert prop behavior
      })

      it('should use default when propName not provided', () => {
        // render(<ComponentName {...defaultProps} />)
        // Assert default behavior
      })
    })

    // Add more prop tests...
  })

  // ============================================
  // STATE MANAGEMENT TESTS
  // ============================================

  describe('State Management', () => {
    it('should initialize with correct state', () => {
      // render(<ComponentName {...defaultProps} />)
      // Assert initial state
    })

    it('should update state on interaction', async () => {
      const user = userEvent.setup()
      render(<ComponentName {...defaultProps} />)

      // Interact and assert state change
      // await user.click(screen.getByRole('button'))
      // expect(...).toBe(...)
    })
  })

  // ============================================
  // EVENT HANDLER TESTS
  // ============================================

  describe('Event Handlers', () => {
    it('should call onClick when clicked', async () => {
      const handleClick = jest.fn()
      const user = userEvent.setup()

      render(<ComponentName {...defaultProps} onClick={handleClick} />)

      // await user.click(screen.getByRole('button'))
      // expect(handleClick).toHaveBeenCalledTimes(1)
    })

    it('should call onKeyDown when key pressed', async () => {
      const handleKeyDown = jest.fn()
      const user = userEvent.setup()

      render(<ComponentName {...defaultProps} onKeyDown={handleKeyDown} />)

      // const element = screen.getByRole('button')
      // await user.tab()
      // await user.keyboard('{Enter}')
      // expect(handleKeyDown).toHaveBeenCalled()
    })

    // Add more event handler tests...
  })

  // ============================================
  // THEME INTEGRATION TESTS
  // ============================================

  describe('Theme Integration', () => {
    it('should apply sekai color CSS variables', () => {
      const { container } = render(<ComponentName {...defaultProps} sekai="Miku" />)
      const element = container.firstChild as HTMLElement
      expect(element).toHaveStyle({ '--sekai-color': '#33ccba' })
    })

    it('should apply sekai color hover CSS variables', () => {
      const { container } = render(<ComponentName {...defaultProps} />)
      const element = container.firstChild as HTMLElement
      expect(element).toHaveStyle({ '--sekai-color-hover': 'rgba(51, 204, 186, 0.1)' })
    })

    it('should apply light theme mode class', () => {
      const { container } = render(<ComponentName {...defaultProps} themeMode="light" />)
      expect(container.querySelector('[class*="light"]')).toBeTruthy()
    })

    it('should apply dark theme mode class', () => {
      const useOptionalSekai = require('@/internal/useOptionalSekai').useOptionalSekai
      useOptionalSekai.mockReturnValue({
        sekaiColor: '#33ccba',
        modeTheme: 'dark',
        isLight: false,
      })

      const { container } = render(<ComponentName {...defaultProps} themeMode="dark" />)
      expect(container.querySelector('[class*="dark"]')).toBeTruthy()
    })

    it('should call useOptionalSekai with correct parameters', () => {
      const useOptionalSekai = require('@/internal/useOptionalSekai').useOptionalSekai
      useOptionalSekai.mockClear()

      render(<ComponentName {...defaultProps} sekai="Miku" themeMode="light" />)

      expect(useOptionalSekai).toHaveBeenCalledWith({
        sekai: 'Miku',
        mode: 'light',
      })
    })
  })

  // ============================================
  // ACCESSIBILITY TESTS
  // ============================================

  describe('Accessibility', () => {
    it('should have proper ARIA attributes', () => {
      render(<ComponentName {...defaultProps} />)
      // Assert ARIA attributes based on component type
      // expect(screen.getByRole('button')).toHaveAttribute('aria-...')
    })

    it('should be keyboard accessible', async () => {
      const user = userEvent.setup()
      render(<ComponentName {...defaultProps} />)

      await user.tab()
      // expect(screen.getByRole('button')).toHaveFocus()
    })

    it('should support Enter key activation', async () => {
      const handleClick = jest.fn()
      const user = userEvent.setup()

      render(<ComponentName {...defaultProps} onClick={handleClick} />)

      await user.tab()
      await user.keyboard('{Enter}')
      // expect(handleClick).toHaveBeenCalled()
    })

    it('should support Space key activation', async () => {
      const handleClick = jest.fn()
      const user = userEvent.setup()

      render(<ComponentName {...defaultProps} onClick={handleClick} />)

      await user.tab()
      await user.keyboard(' ')
      // expect(handleClick).toHaveBeenCalled()
    })
  })

  // ============================================
  // EDGE CASE TESTS
  // ============================================

  describe('Edge Cases', () => {
    it('should handle null children gracefully', () => {
      const { container } = render(<ComponentName {...defaultProps} children={null} />)
      expect(container).toBeInTheDocument()
    })

    it('should handle undefined children gracefully', () => {
      const { container } = render(<ComponentName {...defaultProps} children={undefined} />)
      expect(container).toBeInTheDocument()
    })

    it('should handle empty string', () => {
      // render(<ComponentName {...defaultProps} text="" />)
      // Assert behavior with empty string
    })

    it('should handle very long content', () => {
      const longContent = 'A'.repeat(1000)
      // render(<ComponentName {...defaultProps} content={longContent} />)
      // Assert content is handled correctly
    })

    it('should handle special characters', () => {
      const specialContent = '<script>alert("xss")</script>'
      // render(<ComponentName {...defaultProps} content={specialContent} />)
      // Assert content is escaped/handled safely
    })
  })

  // ============================================
  // INTEGRATION TESTS
  // ============================================

  describe('Integration Tests', () => {
    it('should maintain state across re-renders', async () => {
      const user = userEvent.setup()
      const { rerender } = render(<ComponentName {...defaultProps} />)

      // Trigger state change
      // await user.click(screen.getByRole('button'))

      // Re-render with same props
      rerender(<ComponentName {...defaultProps} />)

      // Assert state is preserved
    })

    it('should update correctly when props change', () => {
      const { rerender } = render(<ComponentName {...defaultProps} />)

      rerender(<ComponentName {...defaultProps} /* changed prop */ />)

      // Assert component updated correctly
    })

    it('should handle rapid interactions', async () => {
      const handleClick = jest.fn()
      const user = userEvent.setup()

      render(<ComponentName {...defaultProps} onClick={handleClick} />)

      // Simulate rapid clicks
      // await user.click(screen.getByRole('button'))
      // await user.click(screen.getByRole('button'))
      // await user.click(screen.getByRole('button'))

      // expect(handleClick).toHaveBeenCalledTimes(3)
    })
  })

  // ============================================
  // CSS CLASS TESTS
  // ============================================

  describe('CSS Classes', () => {
    it('should apply base component class', () => {
      const { container } = render(<ComponentName {...defaultProps} />)
      expect(container.querySelector('[class*="sekai-component-name"]')).toBeTruthy()
    })

    it('should merge custom className with default classes', () => {
      const { container } = render(
        <ComponentName {...defaultProps} className="custom-class" />,
      )
      const element = container.querySelector('.custom-class')
      expect(element).toBeTruthy()
      // Also check that default class is still applied
    })
  })

  // ============================================
  // CSS VARIABLE TESTS
  // ============================================

  describe('CSS Variables', () => {
    it('should set --sekai-color CSS variable', () => {
      const { container } = render(<ComponentName {...defaultProps} sekai="Miku" />)
      const element = container.querySelector('[style*="--sekai-color"]')
      expect(element).toBeTruthy()
    })

    it('should merge custom styles with option styles', () => {
      const customStyle = { padding: '20px' }
      const { container } = render(
        <ComponentName {...defaultProps} sekai="Miku" style={customStyle} />,
      )
      const element = container.firstChild as HTMLElement
      expect(element).toHaveStyle('padding: 20px')
      expect(element).toHaveStyle('--sekai-color: #33ccba')
    })
  })
})
