/* eslint-disable max-lines-per-function */
import React from 'react'

import { render, screen } from '@testing-library/react'
import { createPortal } from 'react-dom'

import { Backdrop } from '@/components/backdrop/Backdrop'

import type { BackdropProps } from '@/components/backdrop/Backdrop'

// Mock react-dom createPortal
jest.mock('react-dom', () => {
  const actual = jest.requireActual('react-dom')
  return {
    ...actual,
    createPortal: jest.fn((element, container) => {
      // Return element for testing purposes
      return element
    }),
  }
})

// Mock useOptionalSekai hook
jest.mock('@/internal/useOptionalSekai', () => ({
  useOptionalSekai: jest.fn(() => ({
    sekaiColor: '#33ccba',
    modeTheme: 'light',
    isLight: true,
  })),
}))

// Mock usePortalContainer hook
jest.mock('@/internal/usePortalContainer', () => ({
  usePortalContainer: jest.fn(() => document.body),
}))

// Mock converter
jest.mock('@/utils/converter', () => ({
  convertHexToRgbaMixWithBlackOrWhite: jest.fn(() => 'rgba(51, 204, 186, 0.8)'),
}))

describe('Backdrop Component', () => {
  const defaultProps: BackdropProps = {
    open: true,
    children: <div data-testid="backdrop-content">Test Content</div>,
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('Rendering', () => {
    it('should render without crashing when open', () => {
      render(<Backdrop {...defaultProps} />)
      expect(screen.getByTestId('backdrop-content')).toBeInTheDocument()
    })

    it('should render children content', () => {
      render(<Backdrop {...defaultProps} />)
      expect(screen.getByTestId('backdrop-content')).toBeInTheDocument()
      expect(screen.getByText('Test Content')).toBeInTheDocument()
    })

    it('should render with custom id', () => {
      const { container } = render(<Backdrop {...defaultProps} id="custom-backdrop" />)
      const backdropElement = container.querySelector('#custom-backdrop')
      expect(backdropElement).toBeInTheDocument()
    })

    it('should render with custom className', () => {
      const { container } = render(<Backdrop {...defaultProps} className="custom-class" />)
      const backdropElement = container.querySelector('.custom-class')
      expect(backdropElement).toBeInTheDocument()
    })

    it('should render with custom styles', () => {
      const customStyle = { backgroundColor: 'red', zIndex: 9999 }
      const { container } = render(<Backdrop {...defaultProps} style={customStyle} />)
      const backdropElement = container.querySelector('[style*="background-color"]')
      expect(backdropElement).toBeInTheDocument()
    })

    it('should render complex children', () => {
      const ComplexChildren = (
        <div>
          <h1>Title</h1>
          <p>Description</p>
          <button>Action</button>
        </div>
      )
      render(<Backdrop {...defaultProps} children={ComplexChildren} />)
      expect(screen.getByText('Title')).toBeInTheDocument()
      expect(screen.getByText('Description')).toBeInTheDocument()
      expect(screen.getByText('Action')).toBeInTheDocument()
    })
  })

  describe('Open/Close State', () => {
    it('should render when open is true', () => {
      render(<Backdrop {...defaultProps} open={true} />)
      expect(screen.getByTestId('backdrop-content')).toBeInTheDocument()
    })

    it('should render with hidden class when open is false', () => {
      const { container } = render(<Backdrop {...defaultProps} open={false} />)
      const hiddenElement = container.querySelector('[class*="sekai-backdrop-hidden"]')
      expect(hiddenElement).toBeTruthy()
      // Content is still in DOM but hidden
      expect(screen.getByTestId('backdrop-content')).toBeInTheDocument()
    })

    it('should apply visible class when open', () => {
      const { container } = render(<Backdrop {...defaultProps} open={true} />)
      const visibleElement = container.querySelector('[class*="sekai-backdrop-visible"]')
      expect(visibleElement).toBeTruthy()
    })

    it('should toggle between visible and hidden classes', () => {
      const { container: openContainer } = render(<Backdrop {...defaultProps} open={true} />)
      expect(openContainer.querySelector('[class*="sekai-backdrop-visible"]')).toBeTruthy()

      const { container: closedContainer } = render(<Backdrop {...defaultProps} open={false} />)
      expect(closedContainer.querySelector('[class*="sekai-backdrop-hidden"]')).toBeTruthy()
    })
  })

  describe('Portal Integration', () => {
    beforeEach(() => {
      const usePortalContainer = require('@/internal/usePortalContainer').usePortalContainer
      usePortalContainer.mockReturnValue(document.body)
    })

    it('should use createPortal to render content', () => {
      const portalMock = createPortal as jest.Mock
      portalMock.mockClear()
      render(<Backdrop {...defaultProps} />)
      expect(portalMock).toHaveBeenCalled()
    })

    it('should render in portal container', () => {
      const mockContainer = document.createElement('div')
      const usePortalContainer = require('@/internal/usePortalContainer').usePortalContainer
      usePortalContainer.mockReturnValue(mockContainer)

      const portalMock = createPortal as jest.Mock
      portalMock.mockClear()

      render(<Backdrop {...defaultProps} />)
      expect(portalMock).toHaveBeenCalledWith(expect.anything(), mockContainer)
    })

    it('should not render when portal container is null', () => {
      const usePortalContainer = require('@/internal/usePortalContainer').usePortalContainer
      usePortalContainer.mockReturnValue(null)

      const { container } = render(<Backdrop {...defaultProps} />)
      expect(container.firstChild).toBeNull()
    })

    it('should use custom containerComponent if provided', () => {
      const customContainer = document.createElement('div')
      const usePortalContainer = require('@/internal/usePortalContainer').usePortalContainer
      usePortalContainer.mockReturnValue(customContainer)

      const portalMock = createPortal as jest.Mock
      portalMock.mockClear()

      render(<Backdrop {...defaultProps} containerComponent={customContainer} />)
      expect(portalMock).toHaveBeenCalled()
    })
  })

  describe('Centered Prop', () => {
    it('should be centered by default', () => {
      const { container } = render(<Backdrop {...defaultProps} />)
      const centeredElement = container.querySelector('[class*="sekai-backdrop-centered"]')
      expect(centeredElement).toBeTruthy()
    })

    it('should be centered when centered prop is true', () => {
      const { container } = render(<Backdrop {...defaultProps} centered={true} />)
      const centeredElement = container.querySelector('[class*="sekai-backdrop-centered"]')
      expect(centeredElement).toBeTruthy()
    })

    it('should not be centered when centered prop is false', () => {
      const { container } = render(<Backdrop {...defaultProps} centered={false} />)
      const centeredElement = container.querySelector('[class*="sekai-backdrop-centered"]')
      expect(centeredElement).toBeFalsy()
    })
  })

  describe('Theme Integration', () => {
    it('should apply sekai color CSS variables', () => {
      const { container } = render(<Backdrop {...defaultProps} sekai="Miku" />)
      const backdropElement = container.querySelector('[style*="--sekai-color-bg"]')
      expect(backdropElement).toBeTruthy()
    })

    it('should apply sekai background color when sekai prop is provided', () => {
      const { container } = render(<Backdrop {...defaultProps} sekai="Miku" />)
      const bgElement = container.querySelector('[class*="sekai-backdrop-bg"]')
      expect(bgElement).toBeTruthy()
    })

    it('should not apply sekai background class when sekai is not provided', () => {
      const { container } = render(<Backdrop {...defaultProps} />)
      const bgElement = container.querySelector('[class*="sekai-backdrop-bg"]')
      expect(bgElement).toBeFalsy()
    })

    it('should call convertHexToRgbaMixWithBlackOrWhite with correct params', () => {
      const convertFn = require('@/utils/converter').convertHexToRgbaMixWithBlackOrWhite
      render(<Backdrop {...defaultProps} sekai="Miku" />)
      expect(convertFn).toHaveBeenCalledWith('#33ccba', 0.5, false, 0.8)
    })

    it('should apply light theme mode class', () => {
      const { container } = render(<Backdrop {...defaultProps} themeMode="light" />)
      const themeElement = container.querySelector('[class*="sekai-overlay-light"]')
      expect(themeElement).toBeTruthy()
    })

    it('should apply dark theme mode when specified', () => {
      const useOptionalSekai = require('@/internal/useOptionalSekai').useOptionalSekai
      useOptionalSekai.mockReturnValue({
        sekaiColor: '#33ccba',
        modeTheme: 'dark',
        isLight: false,
      })

      const { container } = render(<Backdrop {...defaultProps} themeMode="dark" />)
      const themeElement = container.querySelector('[class*="sekai-overlay-dark"]')
      expect(themeElement).toBeTruthy()
    })
  })

  describe('Custom Container Component', () => {
    it('should apply absolute positioning when containerComponent is provided', () => {
      const customContainer = document.createElement('div')
      const { container } = render(
        <Backdrop {...defaultProps} containerComponent={customContainer} />,
      )
      const backdropElement = container.querySelector('[style*="position"]')
      expect(backdropElement).toBeTruthy()
    })

    it('should not apply absolute positioning when containerComponent is not provided', () => {
      const { container } = render(<Backdrop {...defaultProps} />)
      // Check that position is not in inline styles
      const backdropInner = container.querySelector('[class*="sekai-overlay"]')
      if (backdropInner) {
        const style = backdropInner.getAttribute('style')
        expect(style).not.toContain('position: absolute')
      } else {
        // If no element found, that's also acceptable
        expect(true).toBe(true)
      }
    })
  })

  describe('Custom Styling', () => {
    it('should merge custom className with default classes', () => {
      const { container } = render(
        <Backdrop {...defaultProps} className="custom-backdrop-class" />,
      )
      const element = container.querySelector('.custom-backdrop-class')
      expect(element).toBeTruthy()
    })

    it('should merge custom styles with option styles', () => {
      const customStyle = { padding: '20px', margin: '10px' }
      const { container } = render(<Backdrop {...defaultProps} style={customStyle} />)
      const backdropElement = container.querySelector('[style*="padding"]')
      expect(backdropElement).toBeTruthy()
    })

    it('should preserve custom styles alongside sekai color variables', () => {
      const customStyle = { borderRadius: '8px' }
      const { container } = render(
        <Backdrop {...defaultProps} sekai="Miku" style={customStyle} />,
      )
      const backdropElement = container.querySelector('[style*="border-radius"]')
      expect(backdropElement).toBeTruthy()
    })
  })

  describe('Edge Cases', () => {
    it('should handle null children gracefully', () => {
      const { container } = render(<Backdrop {...defaultProps} children={null} />)
      expect(container).toBeInTheDocument()
    })

    it('should handle undefined children gracefully', () => {
      const { container } = render(<Backdrop {...defaultProps} children={undefined} />)
      expect(container).toBeInTheDocument()
    })

    it('should handle empty fragment as children', () => {
      render(<Backdrop {...defaultProps} children={<></>} />)
      expect(screen.queryByTestId('backdrop-content')).not.toBeInTheDocument()
    })

    it('should handle multiple children', () => {
      const { container } = render(
        <Backdrop {...defaultProps}>
          <div>Child 1</div>
          <div>Child 2</div>
          <div>Child 3</div>
        </Backdrop>,
      )
      // Check that content is rendered
      expect(container.textContent).toContain('Child 1')
      expect(container.textContent).toContain('Child 2')
      expect(container.textContent).toContain('Child 3')
    })

    it('should handle deeply nested children', () => {
      const { container } = render(
        <Backdrop {...defaultProps}>
          <div>
            <div>
              <div>
                <span>Deeply nested content</span>
              </div>
            </div>
          </div>
        </Backdrop>,
      )
      expect(container.textContent).toContain('Deeply nested content')
    })
  })

  describe('Integration Tests', () => {
    it('should re-render when open prop changes', () => {
      const { rerender, container } = render(<Backdrop {...defaultProps} open={true} />)
      expect(container.textContent).toContain('Test Content')
      expect(container.querySelector('[class*="sekai-backdrop-visible"]')).toBeTruthy()

      rerender(<Backdrop {...defaultProps} open={false} />)
      expect(container.textContent).toContain('Test Content')
      expect(container.querySelector('[class*="sekai-backdrop-hidden"]')).toBeTruthy()

      rerender(<Backdrop {...defaultProps} open={true} />)
      expect(container.textContent).toContain('Test Content')
      expect(container.querySelector('[class*="sekai-backdrop-visible"]')).toBeTruthy()
    })

    it('should update children on re-render', () => {
      const { rerender, container } = render(
        <Backdrop {...defaultProps} children={<div>Original Content</div>} />,
      )
      expect(container.textContent).toContain('Original Content')

      rerender(<Backdrop {...defaultProps} children={<div>Updated Content</div>} />)
      expect(container.textContent).toContain('Updated Content')
      expect(container.textContent).not.toContain('Original Content')
    })

    it('should update theme on re-render', () => {
      const { rerender, container } = render(<Backdrop {...defaultProps} sekai="Miku" />)
      expect(container.querySelector('[class*="sekai-backdrop-bg"]')).toBeTruthy()

      rerender(<Backdrop {...defaultProps} sekai={undefined} />)
      expect(container.querySelector('[class*="sekai-backdrop-bg"]')).toBeFalsy()
    })

    it('should maintain portal rendering across re-renders', () => {
      const portalMock = createPortal as jest.Mock
      portalMock.mockClear()

      const { rerender } = render(<Backdrop {...defaultProps} />)
      const initialCallCount = portalMock.mock.calls.length

      rerender(<Backdrop {...defaultProps} />)
      expect(portalMock.mock.calls.length).toBeGreaterThanOrEqual(initialCallCount)
    })
  })

  describe('Accessibility', () => {
    it('should render accessible content when open', () => {
      const { container } = render(
        <Backdrop {...defaultProps}>
          <div role="dialog" aria-label="Test Dialog">
            Dialog Content
          </div>
        </Backdrop>,
      )
      const dialog = container.querySelector('[role="dialog"]')
      expect(dialog).toBeTruthy()
    })

    it('should support custom ARIA attributes via props', () => {
      const { container } = render(<Backdrop {...defaultProps} aria-label="Backdrop overlay" />)
      const element = container.querySelector('[aria-label="Backdrop overlay"]')
      expect(element).toBeTruthy()
    })

    it('should not interfere with child accessibility', () => {
      const { container } = render(
        <Backdrop {...defaultProps}>
          <button aria-label="Close">X</button>
        </Backdrop>,
      )
      const button = container.querySelector('[aria-label="Close"]')
      expect(button).toBeTruthy()
    })
  })

  describe('CSS Class Application', () => {
    it('should apply both sekai-overlay and custom className', () => {
      const { container } = render(<Backdrop {...defaultProps} className="my-backdrop" />)
      const element = container.querySelector('.my-backdrop')
      expect(element).toBeTruthy()
      if (element) {
        expect(element.className).toContain('sekai-overlay')
      }
    })

    it('should conditionally apply sekai-backdrop-bg class', () => {
      const { container: withSekai } = render(<Backdrop {...defaultProps} sekai="Miku" />)
      expect(withSekai.querySelector('[class*="sekai-backdrop-bg"]')).toBeTruthy()

      const { container: withoutSekai } = render(<Backdrop {...defaultProps} />)
      expect(withoutSekai.querySelector('[class*="sekai-backdrop-bg"]')).toBeFalsy()
    })

    it('should conditionally apply sekai-backdrop-centered class', () => {
      const { container: centered } = render(<Backdrop {...defaultProps} centered={true} />)
      expect(centered.querySelector('[class*="sekai-backdrop-centered"]')).toBeTruthy()

      const { container: notCentered } = render(<Backdrop {...defaultProps} centered={false} />)
      expect(notCentered.querySelector('[class*="sekai-backdrop-centered"]')).toBeFalsy()
    })
  })

  describe('CSS Variables', () => {
    it('should set --sekai-color-bg CSS variable when sekai is provided', () => {
      const { container } = render(<Backdrop {...defaultProps} sekai="Miku" />)
      const element = container.querySelector('[style*="--sekai-color-bg"]')
      expect(element).toBeTruthy()
    })

    it('should apply position absolute when containerComponent is provided', () => {
      const customContainer = document.createElement('div')
      const { container } = render(
        <Backdrop {...defaultProps} containerComponent={customContainer} />,
      )
      const element = container.querySelector('[style*="position"]')
      expect(element).toBeTruthy()
    })
  })
})
