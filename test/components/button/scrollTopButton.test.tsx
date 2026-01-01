/* eslint-disable max-lines-per-function */
import React from 'react'

import { render, screen, waitFor, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { createPortal } from 'react-dom'

import { ScrollTopButton } from '@/components/button/ScrollTopButton'

import type { ScrollTopButtonProps } from '@/components/button/ScrollTopButton'

// Mock react-dom createPortal
jest.mock('react-dom', () => {
  const actual = jest.requireActual('react-dom')
  return {
    ...actual,
    createPortal: jest.fn((element, container) => {
      return element
    }),
  }
})

// Mock ChevronSvg
jest.mock('@/img/chevron', () => ({
  ChevronSvg: ({
    className,
    sekai,
    themeMode,
  }: {
    className?: string
    sekai?: string
    themeMode?: string
  }) => (
    <svg
      data-testid="chevron-icon"
      className={className}
      data-sekai={sekai}
      data-theme={themeMode}
    />
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
  convertHexToRgbaMixWithBlackOrWhite: jest.fn(() => 'rgba(51, 204, 186, 0.8)'),
}))

describe('ScrollTopButton Component', () => {
  const defaultProps: ScrollTopButtonProps = {}

  beforeEach(() => {
    jest.clearAllMocks()
    window.scrollY = 0
    window.scrollTo = jest.fn()
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  // Helper function to show the button
  const showButton = async () => {
    await act(async () => {
      window.scrollY = 400
      window.dispatchEvent(new Event('scroll'))
    })
  }

  describe('Rendering', () => {
    it('should not render when scrollY is 0', () => {
      window.scrollY = 0
      const { container } = render(<ScrollTopButton {...defaultProps} />)
      expect(container.firstChild).toBeNull()
    })

    it('should not render when scrollY is less than 300', () => {
      window.scrollY = 299
      const { container } = render(<ScrollTopButton {...defaultProps} />)
      expect(container.firstChild).toBeNull()
    })

    it('should render when scrollY is greater than 300', async () => {
      render(<ScrollTopButton {...defaultProps} />)

      await showButton()

      await waitFor(() => {
        expect(screen.getByTestId('chevron-icon')).toBeInTheDocument()
      })
    })

    it('should render with custom id', async () => {
      render(<ScrollTopButton {...defaultProps} id="custom-scroll-button" />)

      await showButton()

      await waitFor(() => {
        const button = screen.getByTestId('chevron-icon').closest('button')
        expect(button).toHaveAttribute('id', 'custom-scroll-button')
      })
    })

    it('should render with custom className', async () => {
      render(<ScrollTopButton {...defaultProps} className="custom-class" />)

      await showButton()

      await waitFor(() => {
        const button = screen.getByTestId('chevron-icon').closest('button')
        expect(button).toHaveClass('custom-class')
      })
    })

    it('should render with custom styles', async () => {
      const customStyle = { backgroundColor: 'red' }
      render(<ScrollTopButton {...defaultProps} style={customStyle} />)

      await showButton()

      await waitFor(() => {
        const button = screen.getByTestId('chevron-icon').closest('button')
        expect(button).toHaveStyle('background-color: rgb(255, 0, 0)')
      })
    })

    it('should render ChevronSvg icon', async () => {
      render(<ScrollTopButton {...defaultProps} />)

      await showButton()

      await waitFor(() => {
        expect(screen.getByTestId('chevron-icon')).toBeInTheDocument()
      })
    })
  })

  describe('Position Prop', () => {
    it('should render at bottom-right by default', async () => {
      const { container } = render(<ScrollTopButton {...defaultProps} />)

      await showButton()

      await waitFor(() => {
        const button = container.querySelector('button')
        expect(button?.className).toContain('bottom-right')
      })
    })

    it('should render at bottom-right when pos is "bottom-right"', async () => {
      const { container } = render(<ScrollTopButton {...defaultProps} pos="bottom-right" />)

      await showButton()

      await waitFor(() => {
        const button = container.querySelector('button')
        expect(button?.className).toContain('bottom-right')
      })
    })

    it('should render at bottom-left when pos is "bottom-left"', async () => {
      const { container } = render(<ScrollTopButton {...defaultProps} pos="bottom-left" />)

      await showButton()

      await waitFor(() => {
        const button = container.querySelector('button')
        expect(button?.className).toContain('bottom-left')
      })
    })
  })

  describe('Scroll Behavior', () => {
    it('should call window.scrollTo with correct params when clicked', async () => {
      const user = userEvent.setup()
      render(<ScrollTopButton {...defaultProps} />)

      await showButton()

      await waitFor(async () => {
        const button = screen.getByTestId('chevron-icon').closest('button')
        if (button) {
          await user.click(button)
        }
      })

      expect(window.scrollTo).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' })
    })

    it('should handle multiple clicks', async () => {
      const user = userEvent.setup()
      render(<ScrollTopButton {...defaultProps} />)

      await showButton()

      await waitFor(async () => {
        const button = screen.getByTestId('chevron-icon').closest('button')
        if (button) {
          await user.click(button)
          await user.click(button)
          await user.click(button)
        }
      })

      expect(window.scrollTo).toHaveBeenCalledTimes(3)
    })
  })

  describe('Scroll Event Listener', () => {
    it('should register and cleanup scroll event listener on mount and unmount', () => {
      const addEventListenerSpy = jest.spyOn(window, 'addEventListener')
      const removeEventListenerSpy = jest.spyOn(window, 'removeEventListener')

      const { unmount } = render(<ScrollTopButton {...defaultProps} />)

      expect(addEventListenerSpy).toHaveBeenCalledWith('scroll', expect.any(Function))

      const scrollListener = addEventListenerSpy.mock.calls.find(
        ([eventType]) => eventType === 'scroll',
      )?.[1] as EventListener | undefined

      expect(scrollListener).toBeDefined()

      unmount()

      if (scrollListener) {
        expect(removeEventListenerSpy).toHaveBeenCalledWith('scroll', scrollListener)
      }

      addEventListenerSpy.mockRestore()
      removeEventListenerSpy.mockRestore()
    })

    it('should hide button when scrolling below 300px', async () => {
      const { container } = render(<ScrollTopButton {...defaultProps} />)

      await showButton()

      await waitFor(() => {
        expect(screen.getByTestId('chevron-icon')).toBeInTheDocument()
      })

      await act(async () => {
        window.scrollY = 100
        window.dispatchEvent(new Event('scroll'))
      })

      await waitFor(() => {
        expect(container.firstChild).toBeNull()
      })
    })

    it('should update visibility at exactly 300px threshold', async () => {
      const { container } = render(<ScrollTopButton {...defaultProps} />)

      // Just below threshold
      await act(async () => {
        window.scrollY = 300
        window.dispatchEvent(new Event('scroll'))
      })

      await waitFor(() => {
        expect(container.firstChild).toBeNull()
      })

      // Just above threshold
      await act(async () => {
        window.scrollY = 301
        window.dispatchEvent(new Event('scroll'))
      })

      await waitFor(() => {
        expect(screen.getByTestId('chevron-icon')).toBeInTheDocument()
      })
    })
  })

  describe('Portal Integration', () => {
    it('should use createPortal to render content', async () => {
      const portalMock = createPortal as jest.Mock
      portalMock.mockClear()

      render(<ScrollTopButton {...defaultProps} />)

      await showButton()

      await waitFor(() => {
        expect(portalMock).toHaveBeenCalled()
      })
    })

    it('should render in document.body', async () => {
      const portalMock = createPortal as jest.Mock
      portalMock.mockClear()

      render(<ScrollTopButton {...defaultProps} />)

      await showButton()

      await waitFor(() => {
        expect(portalMock).toHaveBeenCalledWith(expect.anything(), document.body)
      })
    })
  })

  describe('Theme Integration', () => {
    it('should apply sekai color CSS variables', async () => {
      const { container } = render(<ScrollTopButton {...defaultProps} sekai="Miku" />)

      await showButton()

      await waitFor(() => {
        const button = container.querySelector('button')
        expect(button).toHaveStyle({
          '--sekai-color': '#33ccba',
        })
      })
    })

    it('should apply sekai background color CSS variables', async () => {
      const { container } = render(<ScrollTopButton {...defaultProps} />)

      await showButton()

      await waitFor(() => {
        const button = container.querySelector('button')
        expect(button).toHaveStyle({
          '--sekai-color-bg': 'rgba(51, 204, 186, 0.8)',
        })
      })
    })

    it('should call convertHexToRgbaMixWithBlackOrWhite correctly', async () => {
      const convertFn = require('@/utils/converter').convertHexToRgbaMixWithBlackOrWhite
      render(<ScrollTopButton {...defaultProps} />)

      await showButton()

      await waitFor(() => {
        expect(convertFn).toHaveBeenCalledWith('#33ccba', 0.5, true)
      })
    })

    it('should pass sekai prop to ChevronSvg', async () => {
      render(<ScrollTopButton {...defaultProps} sekai="Miku" />)

      await showButton()

      await waitFor(() => {
        const icon = screen.getByTestId('chevron-icon')
        expect(icon).toHaveAttribute('data-sekai', 'Miku')
      })
    })

    it('should pass themeMode prop to ChevronSvg', async () => {
      render(<ScrollTopButton {...defaultProps} themeMode="dark" />)

      await showButton()

      await waitFor(() => {
        const icon = screen.getByTestId('chevron-icon')
        expect(icon).toHaveAttribute('data-theme', 'dark')
      })
    })
  })

  describe('Custom Styling', () => {
    it('should merge custom className with default classes', async () => {
      render(<ScrollTopButton {...defaultProps} className="custom-scroll" />)

      await showButton()

      await waitFor(() => {
        const button = screen.getByTestId('chevron-icon').closest('button')
        expect(button).toHaveClass('custom-scroll')
      })
    })

    it('should merge custom styles with option styles', async () => {
      const customStyle = { padding: '20px', margin: '10px' }
      const { container } = render(<ScrollTopButton {...defaultProps} style={customStyle} />)

      await showButton()

      await waitFor(() => {
        const button = container.querySelector('button')
        expect(button).toHaveStyle({
          padding: '20px',
          margin: '10px',
        })
      })
    })

    it('should preserve custom styles alongside sekai color variables', async () => {
      const customStyle = { borderRadius: '50%' }
      const { container } = render(
        <ScrollTopButton {...defaultProps} sekai="Miku" style={customStyle} />,
      )

      await showButton()

      await waitFor(() => {
        const button = container.querySelector('button')
        expect(button).toHaveStyle({
          'borderRadius': '50%',
          '--sekai-color': '#33ccba',
        })
      })
    })
  })

  describe('Accessibility', () => {
    it('should be keyboard accessible', async () => {
      const user = userEvent.setup()
      render(<ScrollTopButton {...defaultProps} />)

      await showButton()

      await waitFor(async () => {
        const button = screen.getByTestId('chevron-icon').closest('button')
        if (button) {
          await user.tab()
          expect(button).toHaveFocus()

          await user.keyboard('{Enter}')
          expect(window.scrollTo).toHaveBeenCalled()
        }
      })
    })
  })

  describe('Edge Cases', () => {
    it('should handle very large scrollY values', async () => {
      render(<ScrollTopButton {...defaultProps} />)

      await act(async () => {
        window.scrollY = 999999
        window.dispatchEvent(new Event('scroll'))
      })

      await waitFor(() => {
        expect(screen.getByTestId('chevron-icon')).toBeInTheDocument()
      })
    })

    it('should handle negative scrollY values', () => {
      window.scrollY = -100
      const { container } = render(<ScrollTopButton {...defaultProps} />)
      expect(container.firstChild).toBeNull()
    })
  })

  describe('Integration Tests', () => {
    it('should show and hide based on scroll position changes', async () => {
      const { container } = render(<ScrollTopButton {...defaultProps} />)

      // Start hidden
      expect(container.firstChild).toBeNull()

      // Scroll down
      await act(async () => {
        window.scrollY = 400
        window.dispatchEvent(new Event('scroll'))
      })

      await waitFor(() => {
        expect(screen.getByTestId('chevron-icon')).toBeInTheDocument()
      })

      // Scroll up
      await act(async () => {
        window.scrollY = 200
        window.dispatchEvent(new Event('scroll'))
      })

      await waitFor(() => {
        expect(container.firstChild).toBeNull()
      })

      // Scroll down again
      await act(async () => {
        window.scrollY = 500
        window.dispatchEvent(new Event('scroll'))
      })

      await waitFor(() => {
        expect(screen.getByTestId('chevron-icon')).toBeInTheDocument()
      })
    })

    it('should clean up scroll event listener on unmount', async () => {
      const removeEventListenerSpy = jest.spyOn(window, 'removeEventListener')
      const { unmount } = render(<ScrollTopButton {...defaultProps} />)

      await showButton()

      unmount()

      expect(removeEventListenerSpy).toHaveBeenCalledWith('scroll', expect.any(Function))
      removeEventListenerSpy.mockRestore()
    })

    it('should update theme on re-render', async () => {
      const { rerender } = render(<ScrollTopButton {...defaultProps} sekai="Miku" />)

      await showButton()

      await waitFor(() => {
        const icon = screen.getByTestId('chevron-icon')
        expect(icon).toHaveAttribute('data-sekai', 'Miku')
      })

      rerender(<ScrollTopButton {...defaultProps} sekai="Ichika" />)

      await waitFor(() => {
        const icon = screen.getByTestId('chevron-icon')
        expect(icon).toHaveAttribute('data-sekai', 'Ichika')
      })
    })
  })
})
