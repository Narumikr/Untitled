/* eslint-disable max-lines-per-function */
import React from 'react'

import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { BasicButton } from '@/components/button/BasicButton'

import type { BasicButtonProps } from '@/components/button/BasicButton'

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

describe('BasicButton Component', () => {
  const defaultProps: BasicButtonProps = {
    children: 'Click me',
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('Rendering', () => {
    it('should render without crashing', () => {
      render(<BasicButton {...defaultProps} />)
      expect(screen.getByRole('button')).toBeInTheDocument()
    })

    it('should render children content', () => {
      render(<BasicButton {...defaultProps}>Test Button</BasicButton>)
      expect(screen.getByText('Test Button')).toBeInTheDocument()
    })

    it('should render with custom id', () => {
      render(<BasicButton {...defaultProps} id="custom-button" />)
      const button = screen.getByRole('button')
      expect(button).toHaveAttribute('id', 'custom-button')
    })

    it('should render with custom className', () => {
      render(<BasicButton {...defaultProps} className="custom-class" />)
      const button = screen.getByRole('button')
      expect(button).toHaveClass('custom-class')
    })

    it('should render with custom styles', () => {
      const customStyle = { backgroundColor: 'red' }
      render(<BasicButton {...defaultProps} style={customStyle} />)
      const button = screen.getByRole('button')
      expect(button).toHaveStyle('background-color: rgb(255, 0, 0)')
    })

    it('should have type="button" by default', () => {
      render(<BasicButton {...defaultProps} />)
      const button = screen.getByRole('button')
      expect(button).toHaveAttribute('type', 'button')
    })

    it('should render complex children', () => {
      render(
        <BasicButton {...defaultProps}>
          <span>Icon</span>
          <span>Text</span>
        </BasicButton>,
      )
      expect(screen.getByText('Icon')).toBeInTheDocument()
      expect(screen.getByText('Text')).toBeInTheDocument()
    })
  })

  describe('WithText Prop', () => {
    it('should apply text color when withText is true', () => {
      const { container } = render(<BasicButton {...defaultProps} withText={true} />)
      const button = container.querySelector('button')
      expect(button).toHaveStyle({
        color: '#33ccba',
      })
    })

    it('should not apply text color when withText is false', () => {
      const { container } = render(<BasicButton {...defaultProps} withText={false} />)
      const button = container.querySelector('button')
      const style = button?.getAttribute('style')
      // Color should not be explicitly set in inline styles (or should not be sekaiColor)
      expect(style).not.toContain('color: rgb(51, 204, 186)')
    })

    it('should not apply text color by default (withText defaults to false)', () => {
      const { container } = render(<BasicButton {...defaultProps} />)
      const button = container.querySelector('button')
      const style = button?.getAttribute('style')
      expect(style).not.toContain('color: rgb(51, 204, 186)')
    })
  })

  describe('Disabled State', () => {
    it('should be enabled by default', () => {
      render(<BasicButton {...defaultProps} />)
      const button = screen.getByRole('button')
      expect(button).not.toBeDisabled()
    })

    it('should be disabled when disabled prop is true', () => {
      render(<BasicButton {...defaultProps} disabled={true} />)
      const button = screen.getByRole('button')
      expect(button).toBeDisabled()
    })

    it('should be enabled when disabled prop is false', () => {
      render(<BasicButton {...defaultProps} disabled={false} />)
      const button = screen.getByRole('button')
      expect(button).not.toBeDisabled()
    })

    it('should not call onClick when disabled', async () => {
      const user = userEvent.setup()
      const handleClick = jest.fn()
      render(<BasicButton {...defaultProps} disabled={true} onClick={handleClick} />)

      const button = screen.getByRole('button')
      await user.click(button)

      expect(handleClick).not.toHaveBeenCalled()
    })
  })

  describe('Click Handling', () => {
    it('should call onClick when clicked', async () => {
      const user = userEvent.setup()
      const handleClick = jest.fn()
      render(<BasicButton {...defaultProps} onClick={handleClick} />)

      const button = screen.getByRole('button')
      await user.click(button)

      expect(handleClick).toHaveBeenCalledTimes(1)
    })

    it('should handle multiple clicks', async () => {
      const user = userEvent.setup()
      const handleClick = jest.fn()
      render(<BasicButton {...defaultProps} onClick={handleClick} />)

      const button = screen.getByRole('button')
      await user.click(button)
      await user.click(button)
      await user.click(button)

      expect(handleClick).toHaveBeenCalledTimes(3)
    })

    it('should work without onClick handler', async () => {
      const user = userEvent.setup()
      render(<BasicButton {...defaultProps} />)

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
      const { container } = render(<BasicButton {...defaultProps} sekai="Miku" />)
      const button = container.querySelector('button')

      expect(button).toHaveStyle({
        '--sekai-color': '#33ccba',
      })
    })

    it('should apply sekai color hover CSS variables', () => {
      const { container } = render(<BasicButton {...defaultProps} />)
      const button = container.querySelector('button')

      expect(button).toHaveStyle({
        '--sekai-color-hover': 'rgba(51, 204, 186, 0.1)',
      })
    })

    it('should call convertHexToRgba with correct alpha for light mode', () => {
      const convertHexToRgba = require('@/utils/converter').convertHexToRgba
      render(<BasicButton {...defaultProps} />)

      expect(convertHexToRgba).toHaveBeenCalledWith('#33ccba', 0.1)
    })

    it('should call convertHexToRgba with correct alpha for dark mode', () => {
      const useOptionalSekai = require('@/internal/useOptionalSekai').useOptionalSekai
      useOptionalSekai.mockReturnValue({
        sekaiColor: '#33ccba',
        modeTheme: 'dark',
        isLight: false,
      })

      const convertHexToRgba = require('@/utils/converter').convertHexToRgba
      render(<BasicButton {...defaultProps} themeMode="dark" />)

      expect(convertHexToRgba).toHaveBeenCalledWith('#33ccba', 0.3)
    })

    it('should apply light theme mode class', () => {
      const { container } = render(<BasicButton {...defaultProps} themeMode="light" />)
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

      const { container } = render(<BasicButton {...defaultProps} themeMode="dark" />)
      const button = container.querySelector('button')
      expect(button?.className).toContain('dark')
    })
  })

  describe('Custom Styling', () => {
    it('should merge custom className with default classes', () => {
      render(<BasicButton {...defaultProps} className="custom-btn" />)
      const button = screen.getByRole('button')
      expect(button).toHaveClass('custom-btn')
    })

    it('should merge custom styles with option styles', () => {
      const customStyle = { padding: '20px', margin: '10px' }
      const { container } = render(<BasicButton {...defaultProps} style={customStyle} />)
      const button = container.querySelector('button')

      expect(button).toHaveStyle({
        padding: '20px',
        margin: '10px',
      })
    })

    it('should preserve custom styles alongside sekai color variables', () => {
      const customStyle = { borderRadius: '8px' }
      const { container } = render(
        <BasicButton {...defaultProps} sekai="Miku" style={customStyle} />,
      )
      const button = container.querySelector('button')

      expect(button).toHaveStyle({
        'borderRadius': '8px',
        '--sekai-color': '#33ccba',
      })
    })
  })

  describe('HTML Attributes', () => {
    it('should support aria-label attribute', () => {
      render(<BasicButton {...defaultProps} aria-label="Submit form" />)
      const button = screen.getByRole('button')
      expect(button).toHaveAttribute('aria-label', 'Submit form')
    })

    it('should support data-testid attribute', () => {
      render(<BasicButton {...defaultProps} data-testid="test-button" />)
      expect(screen.getByTestId('test-button')).toBeInTheDocument()
    })

    it('should support tabIndex attribute', () => {
      render(<BasicButton {...defaultProps} tabIndex={0} />)
      const button = screen.getByRole('button')
      expect(button).toHaveAttribute('tabIndex', '0')
    })

    it('should support title attribute', () => {
      render(<BasicButton {...defaultProps} title="Tooltip text" />)
      const button = screen.getByRole('button')
      expect(button).toHaveAttribute('title', 'Tooltip text')
    })
  })

  describe('Edge Cases', () => {
    it('should handle empty children gracefully', () => {
      render(<BasicButton children={null} />)
      const button = screen.getByRole('button')
      expect(button).toBeInTheDocument()
    })

    it('should handle undefined children', () => {
      render(<BasicButton children={undefined} />)
      const button = screen.getByRole('button')
      expect(button).toBeInTheDocument()
    })

    it('should handle very long text', () => {
      const longText = 'A'.repeat(500)
      render(<BasicButton {...defaultProps}>{longText}</BasicButton>)
      expect(screen.getByText(longText)).toBeInTheDocument()
    })

    it('should handle special characters in children', () => {
      render(<BasicButton {...defaultProps}>{'<>&"\'`'}</BasicButton>)
      expect(screen.getByText('<>&"\'`')).toBeInTheDocument()
    })
  })

  describe('Accessibility', () => {
    it('should be keyboard accessible', async () => {
      const user = userEvent.setup()
      const handleClick = jest.fn()
      render(<BasicButton {...defaultProps} onClick={handleClick} />)

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
      render(<BasicButton {...defaultProps} onClick={handleClick} />)

      const button = screen.getByRole('button')

      await user.tab()
      expect(button).toHaveFocus()

      await user.keyboard(' ')
      expect(handleClick).toHaveBeenCalledTimes(1)
    })

    it('should have button role', () => {
      render(<BasicButton {...defaultProps} />)
      expect(screen.getByRole('button')).toBeInTheDocument()
    })

    it('should not be focusable when disabled', () => {
      render(<BasicButton {...defaultProps} disabled={true} />)
      const button = screen.getByRole('button')
      expect(button).toBeDisabled()
    })
  })

  describe('Integration Tests', () => {
    it('should update on re-render', () => {
      const { rerender } = render(<BasicButton {...defaultProps}>Original</BasicButton>)
      expect(screen.getByText('Original')).toBeInTheDocument()

      rerender(<BasicButton {...defaultProps}>Updated</BasicButton>)
      expect(screen.getByText('Updated')).toBeInTheDocument()
      expect(screen.queryByText('Original')).not.toBeInTheDocument()
    })

    it('should update disabled state on re-render', () => {
      const { rerender } = render(<BasicButton {...defaultProps} disabled={false} />)
      const button = screen.getByRole('button')
      expect(button).not.toBeDisabled()

      rerender(<BasicButton {...defaultProps} disabled={true} />)
      expect(button).toBeDisabled()
    })

    it('should update withText prop on re-render', () => {
      const { rerender, container } = render(<BasicButton {...defaultProps} withText={false} />)
      let button = container.querySelector('button')
      const style = button?.getAttribute('style')
      expect(style).not.toContain('color: rgb(51, 204, 186)')

      rerender(<BasicButton {...defaultProps} withText={true} />)
      button = container.querySelector('button')
      expect(button).toHaveStyle({ color: '#33ccba' })
    })

    it('should handle rapid clicks', async () => {
      const user = userEvent.setup()
      const handleClick = jest.fn()
      render(<BasicButton {...defaultProps} onClick={handleClick} />)

      const button = screen.getByRole('button')

      // Rapid clicks
      await user.click(button)
      await user.click(button)
      await user.click(button)
      await user.click(button)
      await user.click(button)

      expect(handleClick).toHaveBeenCalledTimes(5)
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
      const { container } = render(<BasicButton {...defaultProps} sekai="Miku" />)
      const button = container.querySelector('button')
      expect(button).toHaveStyle({ '--sekai-color': '#33ccba' })
    })

    it('should set --sekai-color-hover CSS variable', () => {
      const { container } = render(<BasicButton {...defaultProps} />)
      const button = container.querySelector('button')
      expect(button).toHaveStyle({ '--sekai-color-hover': 'rgba(51, 204, 186, 0.1)' })
    })
  })
})
