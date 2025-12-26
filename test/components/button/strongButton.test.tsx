/* eslint-disable max-lines-per-function */
import React from 'react'

import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { StrongButton } from '@/components/button/StrongButton'

import type { StrongButtonProps } from '@/components/button/StrongButton'

// Mock useOptionalSekai hook
jest.mock('@/internal/useOptionalSekai', () => ({
  useOptionalSekai: jest.fn(() => ({
    sekaiColor: '#33ccba',
    modeTheme: 'light',
    isLight: true,
  })),
}))

// Mock converter
jest.mock('@/utils/converter', () => ({
  convertHexToRgba: jest.fn((color: string, alpha: number) => `rgba(51, 204, 186, ${alpha})`),
}))

describe('StrongButton Component', () => {
  const defaultProps: StrongButtonProps = {
    children: 'Click me',
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('Rendering', () => {
    it('should render without crashing', () => {
      render(<StrongButton {...defaultProps} />)
      expect(screen.getByRole('button')).toBeInTheDocument()
    })

    it('should render children content', () => {
      render(<StrongButton {...defaultProps}>Test Button</StrongButton>)
      expect(screen.getByText('Test Button')).toBeInTheDocument()
    })

    it('should render with custom id', () => {
      render(<StrongButton {...defaultProps} id="custom-button" />)
      const button = screen.getByRole('button')
      expect(button).toHaveAttribute('id', 'custom-button')
    })

    it('should render with custom className', () => {
      render(<StrongButton {...defaultProps} className="custom-class" />)
      const button = screen.getByRole('button')
      expect(button).toHaveClass('custom-class')
    })

    it('should render with custom styles', () => {
      const customStyle = { backgroundColor: 'red' }
      render(<StrongButton {...defaultProps} style={customStyle} />)
      const button = screen.getByRole('button')
      expect(button).toHaveStyle('background-color: rgb(255, 0, 0)')
    })

    it('should have type="button" by default', () => {
      render(<StrongButton {...defaultProps} />)
      const button = screen.getByRole('button')
      expect(button).toHaveAttribute('type', 'button')
    })

    it('should render complex children', () => {
      render(
        <StrongButton {...defaultProps}>
          <span>Icon</span>
          <span>Text</span>
        </StrongButton>,
      )
      expect(screen.getByText('Icon')).toBeInTheDocument()
      expect(screen.getByText('Text')).toBeInTheDocument()
    })
  })

  describe('Disabled State', () => {
    it('should be enabled by default', () => {
      render(<StrongButton {...defaultProps} />)
      const button = screen.getByRole('button')
      expect(button).not.toBeDisabled()
    })

    it('should be disabled when disabled prop is true', () => {
      render(<StrongButton {...defaultProps} disabled={true} />)
      const button = screen.getByRole('button')
      expect(button).toBeDisabled()
    })

    it('should be enabled when disabled prop is false', () => {
      render(<StrongButton {...defaultProps} disabled={false} />)
      const button = screen.getByRole('button')
      expect(button).not.toBeDisabled()
    })

    it('should not call onClick when disabled', async () => {
      const user = userEvent.setup()
      const handleClick = jest.fn()
      render(<StrongButton {...defaultProps} disabled={true} onClick={handleClick} />)

      const button = screen.getByRole('button')
      await user.click(button)

      expect(handleClick).not.toHaveBeenCalled()
    })
  })

  describe('Click Handling', () => {
    it('should call onClick when clicked', async () => {
      const user = userEvent.setup()
      const handleClick = jest.fn()
      render(<StrongButton {...defaultProps} onClick={handleClick} />)

      const button = screen.getByRole('button')
      await user.click(button)

      expect(handleClick).toHaveBeenCalledTimes(1)
    })

    it('should handle multiple clicks', async () => {
      const user = userEvent.setup()
      const handleClick = jest.fn()
      render(<StrongButton {...defaultProps} onClick={handleClick} />)

      const button = screen.getByRole('button')
      await user.click(button)
      await user.click(button)
      await user.click(button)

      expect(handleClick).toHaveBeenCalledTimes(3)
    })

    it('should work without onClick handler', async () => {
      const user = userEvent.setup()
      render(<StrongButton {...defaultProps} />)

      const button = screen.getByRole('button')
      await expect(user.click(button)).resolves.not.toThrow()
    })
  })

  describe('Theme Integration', () => {
    it('should apply sekai color CSS variables', () => {
      const { container } = render(<StrongButton {...defaultProps} sekai="Miku" />)
      const button = container.querySelector('button')

      expect(button).toHaveStyle({
        '--sekai-color': '#33ccba',
      })
    })

    it('should apply sekai background color CSS variables', () => {
      const { container } = render(<StrongButton {...defaultProps} />)
      const button = container.querySelector('button')

      expect(button).toHaveStyle({
        '--sekai-color-bg': 'rgba(51, 204, 186, 0.8)',
      })
    })

    it('should call convertHexToRgba with correct alpha', () => {
      const convertHexToRgba = require('@/utils/converter').convertHexToRgba
      render(<StrongButton {...defaultProps} />)

      expect(convertHexToRgba).toHaveBeenCalledWith('#33ccba', 0.8)
    })

    it('should apply light theme mode class', () => {
      const { container } = render(<StrongButton {...defaultProps} themeMode="light" />)
      const button = container.querySelector('button')
      expect(button?.className).toContain('light')
    })

    it('should apply dark theme mode class', () => {
      const useOptionalSekai = require('@/internal/useOptionalSekai').useOptionalSekai
      useOptionalSekai.mockReturnValue({
        sekaiColor: '#33ccba',
        modeTheme: 'dark',
        isLight: false,
      })

      const { container } = render(<StrongButton {...defaultProps} themeMode="dark" />)
      const button = container.querySelector('button')
      expect(button?.className).toContain('dark')
    })
  })

  describe('Custom Styling', () => {
    it('should merge custom className with default classes', () => {
      render(<StrongButton {...defaultProps} className="custom-btn" />)
      const button = screen.getByRole('button')
      expect(button).toHaveClass('custom-btn')
    })

    it('should merge custom styles with option styles', () => {
      const customStyle = { padding: '20px', margin: '10px' }
      const { container } = render(<StrongButton {...defaultProps} style={customStyle} />)
      const button = container.querySelector('button')

      expect(button).toHaveStyle({
        padding: '20px',
        margin: '10px',
      })
    })

    it('should preserve custom styles alongside sekai color variables', () => {
      const customStyle = { borderRadius: '8px' }
      const { container } = render(<StrongButton {...defaultProps} sekai="Miku" style={customStyle} />)
      const button = container.querySelector('button')

      expect(button).toHaveStyle({
        borderRadius: '8px',
        '--sekai-color': '#33ccba',
      })
    })
  })

  describe('HTML Attributes', () => {
    it('should support aria-label attribute', () => {
      render(<StrongButton {...defaultProps} aria-label="Submit form" />)
      const button = screen.getByRole('button')
      expect(button).toHaveAttribute('aria-label', 'Submit form')
    })

    it('should support data-testid attribute', () => {
      render(<StrongButton {...defaultProps} data-testid="test-button" />)
      expect(screen.getByTestId('test-button')).toBeInTheDocument()
    })

    it('should support tabIndex attribute', () => {
      render(<StrongButton {...defaultProps} tabIndex={0} />)
      const button = screen.getByRole('button')
      expect(button).toHaveAttribute('tabIndex', '0')
    })

    it('should support title attribute', () => {
      render(<StrongButton {...defaultProps} title="Tooltip text" />)
      const button = screen.getByRole('button')
      expect(button).toHaveAttribute('title', 'Tooltip text')
    })
  })

  describe('Edge Cases', () => {
    it('should handle empty children gracefully', () => {
      render(<StrongButton children={null} />)
      const button = screen.getByRole('button')
      expect(button).toBeInTheDocument()
    })

    it('should handle undefined children', () => {
      render(<StrongButton children={undefined} />)
      const button = screen.getByRole('button')
      expect(button).toBeInTheDocument()
    })

    it('should handle very long text', () => {
      const longText = 'A'.repeat(500)
      render(<StrongButton {...defaultProps}>{longText}</StrongButton>)
      expect(screen.getByText(longText)).toBeInTheDocument()
    })

    it('should handle special characters in children', () => {
      render(<StrongButton {...defaultProps}>{'<>&"\'`'}</StrongButton>)
      expect(screen.getByText('<>&"\'`')).toBeInTheDocument()
    })
  })

  describe('Accessibility', () => {
    it('should be keyboard accessible', async () => {
      const user = userEvent.setup()
      const handleClick = jest.fn()
      render(<StrongButton {...defaultProps} onClick={handleClick} />)

      const button = screen.getByRole('button')

      // Tab to button
      await user.tab()
      expect(button).toHaveFocus()

      // Press Enter
      await user.keyboard('{Enter}')
      expect(handleClick).toHaveBeenCalledTimes(1)
    })

    it('should support Space key', async () => {
      const user = userEvent.setup()
      const handleClick = jest.fn()
      render(<StrongButton {...defaultProps} onClick={handleClick} />)

      const button = screen.getByRole('button')

      await user.tab()
      expect(button).toHaveFocus()

      await user.keyboard(' ')
      expect(handleClick).toHaveBeenCalledTimes(1)
    })

    it('should have button role', () => {
      render(<StrongButton {...defaultProps} />)
      expect(screen.getByRole('button')).toBeInTheDocument()
    })

    it('should not be focusable when disabled', () => {
      render(<StrongButton {...defaultProps} disabled={true} />)
      const button = screen.getByRole('button')
      expect(button).toBeDisabled()
    })
  })

  describe('Integration Tests', () => {
    it('should update on re-render', () => {
      const { rerender } = render(<StrongButton {...defaultProps}>Original</StrongButton>)
      expect(screen.getByText('Original')).toBeInTheDocument()

      rerender(<StrongButton {...defaultProps}>Updated</StrongButton>)
      expect(screen.getByText('Updated')).toBeInTheDocument()
      expect(screen.queryByText('Original')).not.toBeInTheDocument()
    })

    it('should update disabled state on re-render', () => {
      const { rerender } = render(<StrongButton {...defaultProps} disabled={false} />)
      const button = screen.getByRole('button')
      expect(button).not.toBeDisabled()

      rerender(<StrongButton {...defaultProps} disabled={true} />)
      expect(button).toBeDisabled()
    })

    it('should handle rapid clicks', async () => {
      const user = userEvent.setup()
      const handleClick = jest.fn()
      render(<StrongButton {...defaultProps} onClick={handleClick} />)

      const button = screen.getByRole('button')

      // Rapid clicks
      await user.click(button)
      await user.click(button)
      await user.click(button)
      await user.click(button)
      await user.click(button)

      expect(handleClick).toHaveBeenCalledTimes(5)
    })

    it('should update theme on re-render', () => {
      const { rerender } = render(<StrongButton {...defaultProps} sekai="Miku" />)
      let button = screen.getByRole('button')
      expect(button).toBeInTheDocument()

      rerender(<StrongButton {...defaultProps} sekai="Ichika" />)
      button = screen.getByRole('button')
      expect(button).toBeInTheDocument()
    })
  })

  describe('CSS Variables', () => {
    it('should set --sekai-color CSS variable', () => {
      const { container } = render(<StrongButton {...defaultProps} sekai="Miku" />)
      const button = container.querySelector('button')
      expect(button).toHaveStyle({ '--sekai-color': '#33ccba' })
    })

    it('should set --sekai-color-bg CSS variable', () => {
      const { container } = render(<StrongButton {...defaultProps} />)
      const button = container.querySelector('button')
      expect(button).toHaveStyle({ '--sekai-color-bg': 'rgba(51, 204, 186, 0.8)' })
    })
  })
})
