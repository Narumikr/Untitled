/* eslint-disable max-lines-per-function */
import React from 'react'

import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { HamburgerButton } from '@/components/button/HamburgerButton'

import type { HamburgerButtonProps } from '@/components/button/HamburgerButton'

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

describe('HamburgerButton Component', () => {
  const defaultProps: HamburgerButtonProps = {
    open: false,
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('Rendering', () => {
    it('should render without crashing', () => {
      render(<HamburgerButton {...defaultProps} />)
      expect(screen.getByRole('button')).toBeInTheDocument()
    })

    it('should render three hamburger lines', () => {
      const { container } = render(<HamburgerButton {...defaultProps} />)
      const lines = container.querySelectorAll('span')
      expect(lines).toHaveLength(3)
    })

    it('should render with custom id', () => {
      render(<HamburgerButton {...defaultProps} id="custom-hamburger" />)
      const button = screen.getByRole('button')
      expect(button).toHaveAttribute('id', 'custom-hamburger')
    })

    it('should render with custom className', () => {
      render(<HamburgerButton {...defaultProps} className="custom-class" />)
      const button = screen.getByRole('button')
      expect(button).toHaveClass('custom-class')
    })

    it('should render with custom styles', () => {
      const customStyle = { backgroundColor: 'red' }
      render(<HamburgerButton {...defaultProps} style={customStyle} />)
      const button = screen.getByRole('button')
      expect(button).toHaveStyle('background-color: rgb(255, 0, 0)')
    })

    it('should have type="button"', () => {
      render(<HamburgerButton {...defaultProps} />)
      const button = screen.getByRole('button')
      expect(button).toHaveAttribute('type', 'button')
    })
  })

  describe('Open/Close State', () => {
    it('should be closed by default', () => {
      render(<HamburgerButton open={false} />)
      const button = screen.getByRole('button')
      expect(button).toHaveAttribute('aria-expanded', 'false')
    })

    it('should be open when open prop is true', () => {
      render(<HamburgerButton open={true} />)
      const button = screen.getByRole('button')
      expect(button).toHaveAttribute('aria-expanded', 'true')
    })

    it('should apply open class to lines when open', () => {
      const { container } = render(<HamburgerButton open={true} />)
      const lines = container.querySelectorAll('span')

      lines.forEach((line) => {
        expect(line.className).toContain('sekai-open')
      })
    })

    it('should not apply open class to lines when closed', () => {
      const { container } = render(<HamburgerButton open={false} />)
      const lines = container.querySelectorAll('span')

      lines.forEach((line) => {
        expect(line.className).not.toContain('sekai-open')
      })
    })

    it('should update state on re-render', () => {
      const { rerender } = render(<HamburgerButton open={false} />)
      let button = screen.getByRole('button')
      expect(button).toHaveAttribute('aria-expanded', 'false')

      rerender(<HamburgerButton open={true} />)
      button = screen.getByRole('button')
      expect(button).toHaveAttribute('aria-expanded', 'true')
    })
  })

  describe('Click Handling', () => {
    it('should call onClick when clicked', async () => {
      const user = userEvent.setup()
      const handleClick = jest.fn()
      render(<HamburgerButton {...defaultProps} onClick={handleClick} />)

      const button = screen.getByRole('button')
      await user.click(button)

      expect(handleClick).toHaveBeenCalledTimes(1)
    })

    it('should handle multiple clicks', async () => {
      const user = userEvent.setup()
      const handleClick = jest.fn()
      render(<HamburgerButton {...defaultProps} onClick={handleClick} />)

      const button = screen.getByRole('button')
      await user.click(button)
      await user.click(button)
      await user.click(button)

      expect(handleClick).toHaveBeenCalledTimes(3)
    })

    it('should work without onClick handler', async () => {
      const user = userEvent.setup()
      render(<HamburgerButton {...defaultProps} />)

      const button = screen.getByRole('button')
      await expect(user.click(button)).resolves.not.toThrow()
    })
  })

  describe('Accessibility', () => {
    it('should have aria-expanded attribute', () => {
      render(<HamburgerButton {...defaultProps} />)
      const button = screen.getByRole('button')
      expect(button).toHaveAttribute('aria-expanded')
    })

    it('should have "Close menu" label when open', () => {
      render(<HamburgerButton open={true} />)
      const button = screen.getByRole('button')
      expect(button).toHaveAttribute('aria-label', 'Close menu')
    })

    it('should have "Open menu" label when closed', () => {
      render(<HamburgerButton open={false} />)
      const button = screen.getByRole('button')
      expect(button).toHaveAttribute('aria-label', 'Open menu')
    })

    it('should update aria-label when state changes', () => {
      const { rerender } = render(<HamburgerButton open={false} />)
      let button = screen.getByRole('button')
      expect(button).toHaveAttribute('aria-label', 'Open menu')

      rerender(<HamburgerButton open={true} />)
      button = screen.getByRole('button')
      expect(button).toHaveAttribute('aria-label', 'Close menu')
    })

    it('should be keyboard accessible', async () => {
      const user = userEvent.setup()
      const handleClick = jest.fn()
      render(<HamburgerButton {...defaultProps} onClick={handleClick} />)

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
      render(<HamburgerButton {...defaultProps} onClick={handleClick} />)

      const button = screen.getByRole('button')

      await user.tab()
      expect(button).toHaveFocus()

      await user.keyboard(' ')
      expect(handleClick).toHaveBeenCalledTimes(1)
    })

    it('should have button role', () => {
      render(<HamburgerButton {...defaultProps} />)
      expect(screen.getByRole('button')).toBeInTheDocument()
    })
  })

  describe('Theme Integration', () => {
    it('should apply sekai color CSS variables', () => {
      const { container } = render(<HamburgerButton {...defaultProps} sekai="Miku" />)
      const button = container.querySelector('button')

      expect(button).toHaveStyle({
        '--sekai-color-bg': 'rgba(51, 204, 186, 0.8)',
      })
    })

    it('should call convertHexToRgba with correct alpha', () => {
      const convertHexToRgba = require('@/utils/converter').convertHexToRgba
      render(<HamburgerButton {...defaultProps} />)

      expect(convertHexToRgba).toHaveBeenCalledWith('#33ccba', 0.8)
    })

    it('should apply light theme mode class', () => {
      const { container } = render(<HamburgerButton {...defaultProps} themeMode="light" />)
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

      const { container } = render(<HamburgerButton {...defaultProps} themeMode="dark" />)
      const button = container.querySelector('button')
      expect(button?.className).toContain('dark')
    })
  })

  describe('Custom Styling', () => {
    it('should merge custom className with default classes', () => {
      render(<HamburgerButton {...defaultProps} className="custom-hamburger" />)
      const button = screen.getByRole('button')
      expect(button).toHaveClass('custom-hamburger')
    })

    it('should merge custom styles with option styles', () => {
      const customStyle = { padding: '20px', margin: '10px' }
      const { container } = render(<HamburgerButton {...defaultProps} style={customStyle} />)
      const button = container.querySelector('button')

      expect(button).toHaveStyle({
        padding: '20px',
        margin: '10px',
      })
    })

    it('should preserve custom styles alongside sekai color variables', () => {
      const customStyle = { borderRadius: '8px' }
      const { container } = render(
        <HamburgerButton {...defaultProps} sekai="Miku" style={customStyle} />,
      )
      const button = container.querySelector('button')

      expect(button).toHaveStyle({
        'borderRadius': '8px',
        '--sekai-color-bg': 'rgba(51, 204, 186, 0.8)',
      })
    })
  })

  describe('Hamburger Lines', () => {
    it('should render all three lines with correct class', () => {
      const { container } = render(<HamburgerButton {...defaultProps} />)
      const lines = container.querySelectorAll('.sekai-hamburger-line')
      expect(lines).toHaveLength(3)
    })

    it('should have unique keys for each line', () => {
      const { container } = render(<HamburgerButton {...defaultProps} />)
      const lines = container.querySelectorAll('span')

      expect(lines[0]).toBeInTheDocument()
      expect(lines[1]).toBeInTheDocument()
      expect(lines[2]).toBeInTheDocument()
    })

    it('should toggle open class on all lines', () => {
      const { container, rerender } = render(<HamburgerButton open={false} />)
      let lines = container.querySelectorAll('span')

      lines.forEach((line) => {
        expect(line.className).not.toContain('sekai-open')
      })

      rerender(<HamburgerButton open={true} />)
      lines = container.querySelectorAll('span')

      lines.forEach((line) => {
        expect(line.className).toContain('sekai-open')
      })
    })
  })

  describe('Integration Tests', () => {
    it('should toggle between open and closed states', () => {
      const { rerender } = render(<HamburgerButton open={false} />)
      let button = screen.getByRole('button')

      expect(button).toHaveAttribute('aria-expanded', 'false')
      expect(button).toHaveAttribute('aria-label', 'Open menu')

      rerender(<HamburgerButton open={true} />)
      button = screen.getByRole('button')

      expect(button).toHaveAttribute('aria-expanded', 'true')
      expect(button).toHaveAttribute('aria-label', 'Close menu')

      rerender(<HamburgerButton open={false} />)
      button = screen.getByRole('button')

      expect(button).toHaveAttribute('aria-expanded', 'false')
      expect(button).toHaveAttribute('aria-label', 'Open menu')
    })

    it('should handle rapid clicks', async () => {
      const user = userEvent.setup()
      const handleClick = jest.fn()
      render(<HamburgerButton {...defaultProps} onClick={handleClick} />)

      const button = screen.getByRole('button')

      // Rapid clicks
      await user.click(button)
      await user.click(button)
      await user.click(button)
      await user.click(button)
      await user.click(button)

      expect(handleClick).toHaveBeenCalledTimes(5)
    })

    it('should maintain correct ARIA attributes across re-renders', () => {
      const { rerender } = render(<HamburgerButton open={false} sekai="Miku" />)
      let button = screen.getByRole('button')

      expect(button).toHaveAttribute('aria-expanded', 'false')
      expect(button).toHaveAttribute('aria-label', 'Open menu')

      rerender(<HamburgerButton open={true} sekai="Ichika" />)
      button = screen.getByRole('button')

      expect(button).toHaveAttribute('aria-expanded', 'true')
      expect(button).toHaveAttribute('aria-label', 'Close menu')
    })
  })

  describe('CSS Variables', () => {
    it('should set --sekai-color-bg CSS variable', () => {
      const { container } = render(<HamburgerButton {...defaultProps} sekai="Miku" />)
      const button = container.querySelector('button')
      expect(button).toHaveStyle({ '--sekai-color-bg': 'rgba(51, 204, 186, 0.8)' })
    })
  })
})
