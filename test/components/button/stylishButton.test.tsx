/* eslint-disable max-lines-per-function */
import React from 'react'

import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { StylishButton } from '@/components/button/StylishButton'

import type { StylishButtonProps } from '@/components/button/StylishButton'

// Mock ArrowSvg
jest.mock('@/img/arrow', () => ({
  ArrowSvg: ({ className, vector }: { className?: string; vector?: string }) => (
    <svg data-testid="arrow-icon" className={className} data-vector={vector} />
  ),
}))

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

describe('StylishButton Component', () => {
  const defaultProps: StylishButtonProps = {
    children: 'Click me',
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('Rendering', () => {
    it('should render without crashing', () => {
      render(<StylishButton {...defaultProps} />)
      expect(screen.getByRole('button')).toBeInTheDocument()
    })

    it('should render children content', () => {
      render(<StylishButton {...defaultProps}>Test Button</StylishButton>)
      expect(screen.getByText('Test Button')).toBeInTheDocument()
    })

    it('should render with custom id', () => {
      render(<StylishButton {...defaultProps} id="custom-button" />)
      const button = screen.getByRole('button')
      expect(button).toHaveAttribute('id', 'custom-button')
    })

    it('should render with custom className', () => {
      render(<StylishButton {...defaultProps} className="custom-class" />)
      const button = screen.getByRole('button')
      expect(button).toHaveClass('custom-class')
    })

    it('should render with custom styles', () => {
      const customStyle = { backgroundColor: 'red' }
      render(<StylishButton {...defaultProps} style={customStyle} />)
      const button = screen.getByRole('button')
      expect(button).toHaveStyle('background-color: rgb(255, 0, 0)')
    })

    it('should have type="button" by default', () => {
      render(<StylishButton {...defaultProps} />)
      const button = screen.getByRole('button')
      expect(button).toHaveAttribute('type', 'button')
    })

    it('should render complex children', () => {
      render(
        <StylishButton {...defaultProps}>
          <span>Icon</span>
          <span>Text</span>
        </StylishButton>,
      )
      expect(screen.getByText('Icon')).toBeInTheDocument()
      expect(screen.getByText('Text')).toBeInTheDocument()
    })

    it('should render decoration div', () => {
      const { container } = render(<StylishButton {...defaultProps} />)
      const decoration = container.querySelector('.sekai-stylish-button-decoration')
      expect(decoration).toBeInTheDocument()
    })
  })

  describe('Arrow Icon Prop', () => {
    it('should render ArrowSvg icon by default', () => {
      render(<StylishButton {...defaultProps} />)
      expect(screen.getByTestId('arrow-icon')).toBeInTheDocument()
    })

    it('should render ArrowSvg when arrowIcon is true', () => {
      render(<StylishButton {...defaultProps} arrowIcon={true} />)
      expect(screen.getByTestId('arrow-icon')).toBeInTheDocument()
    })

    it('should not render ArrowSvg when arrowIcon is false', () => {
      render(<StylishButton {...defaultProps} arrowIcon={false} />)
      expect(screen.queryByTestId('arrow-icon')).not.toBeInTheDocument()
    })

    it('should render ArrowSvg with vector="right"', () => {
      render(<StylishButton {...defaultProps} />)
      const icon = screen.getByTestId('arrow-icon')
      expect(icon).toHaveAttribute('data-vector', 'right')
    })

    it('should toggle arrow icon on re-render', () => {
      const { rerender } = render(<StylishButton {...defaultProps} arrowIcon={true} />)
      expect(screen.getByTestId('arrow-icon')).toBeInTheDocument()

      rerender(<StylishButton {...defaultProps} arrowIcon={false} />)
      expect(screen.queryByTestId('arrow-icon')).not.toBeInTheDocument()

      rerender(<StylishButton {...defaultProps} arrowIcon={true} />)
      expect(screen.getByTestId('arrow-icon')).toBeInTheDocument()
    })
  })

  describe('Disabled State', () => {
    it('should be enabled by default', () => {
      render(<StylishButton {...defaultProps} />)
      const button = screen.getByRole('button')
      expect(button).not.toBeDisabled()
    })

    it('should be disabled when disabled prop is true', () => {
      render(<StylishButton {...defaultProps} disabled={true} />)
      const button = screen.getByRole('button')
      expect(button).toBeDisabled()
    })

    it('should be enabled when disabled prop is false', () => {
      render(<StylishButton {...defaultProps} disabled={false} />)
      const button = screen.getByRole('button')
      expect(button).not.toBeDisabled()
    })

    it('should not call onClick when disabled', async () => {
      const user = userEvent.setup()
      const handleClick = jest.fn()
      render(<StylishButton {...defaultProps} disabled={true} onClick={handleClick} />)

      const button = screen.getByRole('button')
      await user.click(button)

      expect(handleClick).not.toHaveBeenCalled()
    })
  })

  describe('Click Handling', () => {
    it('should call onClick when clicked', async () => {
      const user = userEvent.setup()
      const handleClick = jest.fn()
      render(<StylishButton {...defaultProps} onClick={handleClick} />)

      const button = screen.getByRole('button')
      await user.click(button)

      expect(handleClick).toHaveBeenCalledTimes(1)
    })

    it('should handle multiple clicks', async () => {
      const user = userEvent.setup()
      const handleClick = jest.fn()
      render(<StylishButton {...defaultProps} onClick={handleClick} />)

      const button = screen.getByRole('button')
      await user.click(button)
      await user.click(button)
      await user.click(button)

      expect(handleClick).toHaveBeenCalledTimes(3)
    })

    it('should work without onClick handler', async () => {
      const user = userEvent.setup()
      render(<StylishButton {...defaultProps} />)

      const button = screen.getByRole('button')
      await expect(user.click(button)).resolves.not.toThrow()
    })
  })

  describe('Theme Integration', () => {
    beforeEach(() => {
      const useOptionalSekai = require('@/internal/useOptionalSekai').useOptionalSekai
      useOptionalSekai.mockReturnValue({
        sekaiColor: '#33ccba',
        modeTheme: 'light',
        isLight: true,
      })
    })

    it('should apply sekai color CSS variables', () => {
      const { container } = render(<StylishButton {...defaultProps} sekai="Miku" />)
      const button = container.querySelector('button')

      expect(button).toHaveStyle({
        '--sekai-color': '#33ccba',
      })
    })

    it('should apply sekai color hover CSS variables', () => {
      const { container } = render(<StylishButton {...defaultProps} />)
      const button = container.querySelector('button')

      expect(button).toHaveStyle({
        '--sekai-color-hover': 'rgba(51, 204, 186, 0.3)',
      })
    })

    it('should call convertHexToRgba with correct alpha for light mode', () => {
      const convertHexToRgba = require('@/utils/converter').convertHexToRgba
      render(<StylishButton {...defaultProps} />)

      expect(convertHexToRgba).toHaveBeenCalledWith('#33ccba', 0.3)
    })

    it('should call convertHexToRgba with correct alpha for dark mode', () => {
      const useOptionalSekai = require('@/internal/useOptionalSekai').useOptionalSekai
      useOptionalSekai.mockReturnValue({
        sekaiColor: '#33ccba',
        modeTheme: 'dark',
        isLight: false,
      })

      const convertHexToRgba = require('@/utils/converter').convertHexToRgba
      render(<StylishButton {...defaultProps} themeMode="dark" />)

      expect(convertHexToRgba).toHaveBeenCalledWith('#33ccba', 0.5)
    })

    it('should apply light theme mode class', () => {
      const { container } = render(<StylishButton {...defaultProps} themeMode="light" />)
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

      const { container } = render(<StylishButton {...defaultProps} themeMode="dark" />)
      const button = container.querySelector('button')
      expect(button?.className).toContain('dark')
    })
  })

  describe('Custom Styling', () => {
    it('should merge custom className with default classes', () => {
      render(<StylishButton {...defaultProps} className="custom-btn" />)
      const button = screen.getByRole('button')
      expect(button).toHaveClass('custom-btn')
    })

    it('should merge custom styles with option styles', () => {
      const customStyle = { padding: '20px', margin: '10px' }
      const { container } = render(<StylishButton {...defaultProps} style={customStyle} />)
      const button = container.querySelector('button')

      expect(button).toHaveStyle({
        padding: '20px',
        margin: '10px',
      })
    })

    it('should preserve custom styles alongside sekai color variables', () => {
      const customStyle = { borderRadius: '8px' }
      const { container } = render(<StylishButton {...defaultProps} sekai="Miku" style={customStyle} />)
      const button = container.querySelector('button')

      expect(button).toHaveStyle({
        borderRadius: '8px',
        '--sekai-color': '#33ccba',
      })
    })
  })

  describe('Edge Cases', () => {
    it('should handle empty children gracefully', () => {
      render(<StylishButton children={null} />)
      const button = screen.getByRole('button')
      expect(button).toBeInTheDocument()
    })

    it('should handle undefined children', () => {
      render(<StylishButton children={undefined} />)
      const button = screen.getByRole('button')
      expect(button).toBeInTheDocument()
    })

    it('should handle very long text', () => {
      const longText = 'A'.repeat(500)
      render(<StylishButton {...defaultProps}>{longText}</StylishButton>)
      expect(screen.getByText(longText)).toBeInTheDocument()
    })

    it('should handle special characters in children', () => {
      render(<StylishButton {...defaultProps}>{'<>&"\'`'}</StylishButton>)
      expect(screen.getByText('<>&"\'`')).toBeInTheDocument()
    })
  })

  describe('Accessibility', () => {
    it('should be keyboard accessible', async () => {
      const user = userEvent.setup()
      const handleClick = jest.fn()
      render(<StylishButton {...defaultProps} onClick={handleClick} />)

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
      render(<StylishButton {...defaultProps} onClick={handleClick} />)

      const button = screen.getByRole('button')

      await user.tab()
      expect(button).toHaveFocus()

      await user.keyboard(' ')
      expect(handleClick).toHaveBeenCalledTimes(1)
    })

    it('should have button role', () => {
      render(<StylishButton {...defaultProps} />)
      expect(screen.getByRole('button')).toBeInTheDocument()
    })

    it('should not be focusable when disabled', () => {
      render(<StylishButton {...defaultProps} disabled={true} />)
      const button = screen.getByRole('button')
      expect(button).toBeDisabled()
    })
  })

  describe('Integration Tests', () => {
    it('should update on re-render', () => {
      const { rerender } = render(<StylishButton {...defaultProps}>Original</StylishButton>)
      expect(screen.getByText('Original')).toBeInTheDocument()

      rerender(<StylishButton {...defaultProps}>Updated</StylishButton>)
      expect(screen.getByText('Updated')).toBeInTheDocument()
      expect(screen.queryByText('Original')).not.toBeInTheDocument()
    })

    it('should update disabled state on re-render', () => {
      const { rerender } = render(<StylishButton {...defaultProps} disabled={false} />)
      const button = screen.getByRole('button')
      expect(button).not.toBeDisabled()

      rerender(<StylishButton {...defaultProps} disabled={true} />)
      expect(button).toBeDisabled()
    })

    it('should handle rapid clicks', async () => {
      const user = userEvent.setup()
      const handleClick = jest.fn()
      render(<StylishButton {...defaultProps} onClick={handleClick} />)

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
      const { rerender } = render(<StylishButton {...defaultProps} sekai="Miku" />)
      let button = screen.getByRole('button')
      expect(button).toBeInTheDocument()

      rerender(<StylishButton {...defaultProps} sekai="Ichika" />)
      button = screen.getByRole('button')
      expect(button).toBeInTheDocument()
    })

    it('should maintain decoration element across re-renders', () => {
      const { container, rerender } = render(<StylishButton {...defaultProps} />)
      let decoration = container.querySelector('.sekai-stylish-button-decoration')
      expect(decoration).toBeInTheDocument()

      rerender(<StylishButton {...defaultProps} disabled={true} />)
      decoration = container.querySelector('.sekai-stylish-button-decoration')
      expect(decoration).toBeInTheDocument()
    })
  })

  describe('Decoration Element', () => {
    it('should render decoration div with correct class', () => {
      const { container } = render(<StylishButton {...defaultProps} />)
      const decoration = container.querySelector('.sekai-stylish-button-decoration')
      expect(decoration).toBeInTheDocument()
    })

    it('should maintain decoration when arrowIcon changes', () => {
      const { container, rerender } = render(<StylishButton {...defaultProps} arrowIcon={true} />)
      let decoration = container.querySelector('.sekai-stylish-button-decoration')
      expect(decoration).toBeInTheDocument()

      rerender(<StylishButton {...defaultProps} arrowIcon={false} />)
      decoration = container.querySelector('.sekai-stylish-button-decoration')
      expect(decoration).toBeInTheDocument()
    })
  })

  describe('CSS Variables', () => {
    beforeEach(() => {
      const useOptionalSekai = require('@/internal/useOptionalSekai').useOptionalSekai
      useOptionalSekai.mockReturnValue({
        sekaiColor: '#33ccba',
        modeTheme: 'light',
        isLight: true,
      })
    })

    it('should set --sekai-color CSS variable', () => {
      const { container } = render(<StylishButton {...defaultProps} sekai="Miku" />)
      const button = container.querySelector('button')
      expect(button).toHaveStyle({ '--sekai-color': '#33ccba' })
    })

    it('should set --sekai-color-hover CSS variable', () => {
      const { container } = render(<StylishButton {...defaultProps} />)
      const button = container.querySelector('button')
      expect(button).toHaveStyle({ '--sekai-color-hover': 'rgba(51, 204, 186, 0.3)' })
    })
  })
})
