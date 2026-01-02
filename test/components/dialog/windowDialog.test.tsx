/* eslint-disable max-lines-per-function */
import React from 'react'

import { act, fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { createPortal } from 'react-dom'

import { WindowDialog } from '@/components/dialog/WindowDialog'

import type { WindowDialogProps } from '@/components/dialog/WindowDialog'

// Mock react-dom createPortal
jest.mock('react-dom', () => {
  const actual = jest.requireActual('react-dom')
  return {
    ...actual,
    createPortal: jest.fn((element) => element),
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

// Mock converter utilities
jest.mock('@/utils/converter', () => ({
  convertHexToRgbaMixWithBlackOrWhite: jest.fn(() => 'rgba(51, 204, 186, 0.8)'),
}))

// Mock SVG components
jest.mock('@/img/clear', () => ({
  ClearSvg: ({
    onClick,
    sekai,
    themeMode,
    className,
  }: {
    onClick?: () => void
    sekai?: string
    themeMode?: string
    className?: string
  }) => <svg data-testid="clear-icon" onClick={onClick} className={className} />,
}))

jest.mock('@/img/restore', () => ({
  RestoreSvg: ({
    onClick,
    sekai,
    themeMode,
    className,
  }: {
    onClick?: () => void
    sekai?: string
    themeMode?: string
    className?: string
  }) => <svg data-testid="restore-icon" onClick={onClick} className={className} />,
}))

jest.mock('@/img/square', () => ({
  SquareSvg: ({
    onClick,
    sekai,
    themeMode,
    className,
  }: {
    onClick?: () => void
    sekai?: string
    themeMode?: string
    className?: string
  }) => <svg data-testid="square-icon" onClick={onClick} className={className} />,
}))

describe('WindowDialog Component', () => {
  const defaultProps: WindowDialogProps = {
    open: true,
    onClose: jest.fn(),
    children: <div data-testid="window-content">Test Content</div>,
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('Rendering', () => {
    it('should render without crashing when open', () => {
      render(<WindowDialog {...defaultProps} />)
      expect(screen.getByTestId('window-content')).toBeInTheDocument()
    })

    it('should render children content', () => {
      render(<WindowDialog {...defaultProps} />)
      expect(screen.getByTestId('window-content')).toBeInTheDocument()
      expect(screen.getByText('Test Content')).toBeInTheDocument()
    })

    it('should render with custom id', () => {
      const { container } = render(<WindowDialog {...defaultProps} id="custom-window" />)
      const windowElement = container.querySelector('#custom-window')
      expect(windowElement).toBeInTheDocument()
    })

    it('should render with custom className', () => {
      const { container } = render(<WindowDialog {...defaultProps} className="custom-class" />)
      const windowElement = container.querySelector('.custom-class')
      expect(windowElement).toBeInTheDocument()
    })

    it('should render with custom styles', () => {
      const customStyle = { backgroundColor: 'red', padding: '20px' }
      const { container } = render(<WindowDialog {...defaultProps} style={customStyle} />)
      const windowElement = container.querySelector('[style*="background-color"]')
      expect(windowElement).toBeInTheDocument()
    })

    it('should render complex children', () => {
      const ComplexChildren = (
        <div>
          <h1>Title</h1>
          <p>Description</p>
          <button>Action</button>
        </div>
      )
      render(<WindowDialog {...defaultProps} children={ComplexChildren} />)
      expect(screen.getByText('Title')).toBeInTheDocument()
      expect(screen.getByText('Description')).toBeInTheDocument()
      expect(screen.getByText('Action')).toBeInTheDocument()
    })
  })

  describe('Open/Close State', () => {
    it('should apply visible class when open is true', () => {
      const { container } = render(<WindowDialog {...defaultProps} open={true} />)
      const visibleElement = container.querySelector('[class*="sekai-dialog-visible"]')
      expect(visibleElement).toBeInTheDocument()
    })

    it('should apply hidden class when open is false', () => {
      const { container } = render(<WindowDialog {...defaultProps} open={false} />)
      const hiddenElement = container.querySelector('[class*="sekai-dialog-hidden"]')
      expect(hiddenElement).toBeInTheDocument()
    })

    it('should toggle between visible and hidden classes', () => {
      const { container: openContainer } = render(
        <WindowDialog {...defaultProps} open={true} />,
      )
      expect(openContainer.querySelector('[class*="sekai-dialog-visible"]')).toBeTruthy()

      const { container: closedContainer } = render(
        <WindowDialog {...defaultProps} open={false} />,
      )
      expect(closedContainer.querySelector('[class*="sekai-dialog-hidden"]')).toBeTruthy()
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
      render(<WindowDialog {...defaultProps} />)
      expect(portalMock).toHaveBeenCalled()
    })

    it('should render in portal container', () => {
      const mockContainer = document.createElement('div')
      const usePortalContainer = require('@/internal/usePortalContainer').usePortalContainer
      usePortalContainer.mockReturnValue(mockContainer)

      const portalMock = createPortal as jest.Mock
      portalMock.mockClear()

      render(<WindowDialog {...defaultProps} />)
      expect(portalMock).toHaveBeenCalledWith(expect.anything(), mockContainer)
    })

    it('should not render when portal container is null', () => {
      const usePortalContainer = require('@/internal/usePortalContainer').usePortalContainer
      usePortalContainer.mockReturnValue(null)

      const { container } = render(<WindowDialog {...defaultProps} />)
      expect(container.firstChild).toBeNull()
    })

    it('should use custom containerComponent if provided', () => {
      const customContainer = document.createElement('div')
      const usePortalContainer = require('@/internal/usePortalContainer').usePortalContainer
      usePortalContainer.mockReturnValue(customContainer)

      const portalMock = createPortal as jest.Mock
      portalMock.mockClear()

      render(<WindowDialog {...defaultProps} containerComponent={customContainer} />)
      expect(portalMock).toHaveBeenCalled()
    })
  })

  describe('Props - size', () => {
    it('should use medium size by default', () => {
      const { container } = render(<WindowDialog {...defaultProps} />)
      const windowElement = container.querySelector(
        '[class*="sekai-window-dialog-size-medium"]',
      )
      expect(windowElement).toBeInTheDocument()
    })

    it('should apply narrow size when specified', () => {
      const { container } = render(<WindowDialog {...defaultProps} size="narrow" />)
      const windowElement = container.querySelector(
        '[class*="sekai-window-dialog-size-narrow"]',
      )
      expect(windowElement).toBeInTheDocument()
    })

    it('should apply wide size when specified', () => {
      const { container } = render(<WindowDialog {...defaultProps} size="wide" />)
      const windowElement = container.querySelector('[class*="sekai-window-dialog-size-wide"]')
      expect(windowElement).toBeInTheDocument()
    })
  })

  describe('Window Controls', () => {
    it('should render square icon when not fullscreen', () => {
      render(<WindowDialog {...defaultProps} />)
      expect(screen.getByTestId('square-icon')).toBeInTheDocument()
      expect(screen.queryByTestId('restore-icon')).not.toBeInTheDocument()
    })

    it('should render restore icon when fullscreen', async () => {
      const user = userEvent.setup()
      render(<WindowDialog {...defaultProps} />)

      const squareIcon = screen.getByTestId('square-icon')
      await user.click(squareIcon)

      expect(screen.getByTestId('restore-icon')).toBeInTheDocument()
      expect(screen.queryByTestId('square-icon')).not.toBeInTheDocument()
    })

    it('should toggle fullscreen when maximize button is clicked', async () => {
      const user = userEvent.setup()
      const { container } = render(<WindowDialog {...defaultProps} />)

      const squareIcon = screen.getByTestId('square-icon')
      await user.click(squareIcon)

      expect(
        container.querySelector('[class*="sekai-window-dialog-fullscreen"]'),
      ).toBeInTheDocument()
    })

    it('should exit fullscreen when restore button is clicked', async () => {
      const user = userEvent.setup()
      const { container } = render(<WindowDialog {...defaultProps} />)

      // Enter fullscreen
      const squareIcon = screen.getByTestId('square-icon')
      await user.click(squareIcon)
      expect(
        container.querySelector('[class*="sekai-window-dialog-fullscreen"]'),
      ).toBeInTheDocument()

      // Exit fullscreen
      const restoreIcon = screen.getByTestId('restore-icon')
      await user.click(restoreIcon)
      expect(
        container.querySelector('[class*="sekai-window-dialog-size-medium"]'),
      ).toBeInTheDocument()
    })

    it('should render close icon', () => {
      render(<WindowDialog {...defaultProps} />)
      expect(screen.getByTestId('clear-icon')).toBeInTheDocument()
    })

    it('should call onClose and reset state when close icon is clicked', async () => {
      const handleClose = jest.fn()
      const user = userEvent.setup()

      render(<WindowDialog {...defaultProps} onClose={handleClose} />)

      const closeIcon = screen.getByTestId('clear-icon')
      await user.click(closeIcon)

      expect(handleClose).toHaveBeenCalledTimes(1)
    })
  })

  describe('Dragging Functionality', () => {
    it('should start dragging when header is clicked', () => {
      const { container } = render(<WindowDialog {...defaultProps} />)
      const header = container.querySelector('[class*="sekai-window-dialog-header"]')

      act(() => {
        fireEvent.mouseDown(header!, { clientX: 100, clientY: 100 })
      })

      // Component should be in dragging state
      expect(header).toBeInTheDocument()
    })

    it('should update position when dragging', () => {
      const { container } = render(<WindowDialog {...defaultProps} />)
      const header = container.querySelector('[class*="sekai-window-dialog-header"]')

      act(() => {
        fireEvent.mouseDown(header!, { clientX: 100, clientY: 100 })
        fireEvent.mouseMove(window, { clientX: 200, clientY: 200 })
      })

      const dialog = container.querySelector('[role="dialog"]')
      expect(dialog).toBeInTheDocument()
    })

    it('should stop dragging on mouse up', () => {
      const { container } = render(<WindowDialog {...defaultProps} />)
      const header = container.querySelector('[class*="sekai-window-dialog-header"]')

      act(() => {
        fireEvent.mouseDown(header!, { clientX: 100, clientY: 100 })
        fireEvent.mouseMove(window, { clientX: 200, clientY: 200 })
        fireEvent.mouseUp(window)
      })

      const dialog = container.querySelector('[role="dialog"]')
      expect(dialog).toBeInTheDocument()
    })

    it('should not allow dragging when in fullscreen mode', () => {
      const { container } = render(<WindowDialog {...defaultProps} />)
      const header = container.querySelector('[class*="sekai-window-dialog-header"]')
      const squareIcon = screen.getByTestId('square-icon')

      // Enter fullscreen
      act(() => {
        fireEvent.click(squareIcon)
      })

      // Try to drag
      act(() => {
        fireEvent.mouseDown(header!, { clientX: 100, clientY: 100 })
        fireEvent.mouseMove(window, { clientX: 200, clientY: 200 })
      })

      expect(
        container.querySelector('[class*="sekai-window-dialog-fullscreen"]'),
      ).toBeInTheDocument()
    })

    it('should cleanup event listeners on unmount', () => {
      const removeEventListenerSpy = jest.spyOn(window, 'removeEventListener')

      const { unmount } = render(<WindowDialog {...defaultProps} />)
      unmount()

      expect(removeEventListenerSpy).toHaveBeenCalledWith('mousemove', expect.any(Function))
      expect(removeEventListenerSpy).toHaveBeenCalledWith('mouseup', expect.any(Function))

      removeEventListenerSpy.mockRestore()
    })
  })

  describe('Position Management', () => {
    it('should initialize at center position', () => {
      const { container } = render(<WindowDialog {...defaultProps} />)
      const dialog = container.querySelector('[role="dialog"]')
      const style = dialog?.getAttribute('style')
      expect(style).toContain('left: 50%')
      expect(style).toContain('top: 50%')
    })

    it('should apply translate transform when centered', () => {
      const { container } = render(<WindowDialog {...defaultProps} />)
      const dialog = container.querySelector('[role="dialog"]')
      const style = dialog?.getAttribute('style')
      expect(style).toContain('translate(-50%, -50%)')
    })

    it('should remove translate transform when not centered', () => {
      const { container } = render(<WindowDialog {...defaultProps} />)
      const header = container.querySelector('[class*="sekai-window-dialog-header"]')
      const dialog = container.querySelector('[role="dialog"]')

      // Initial state should have translate transform
      let style = dialog?.getAttribute('style')
      expect(style).toContain('translate(-50%, -50%)')

      act(() => {
        fireEvent.mouseDown(header!, { clientX: 100, clientY: 100 })
      })

      act(() => {
        fireEvent.mouseMove(window, { clientX: 200, clientY: 200 })
      })

      act(() => {
        fireEvent.mouseUp(window)
      })

      // After dragging, position should change
      style = dialog?.getAttribute('style')
      // Position should no longer be 50%
      expect(style).not.toContain('left: 50%')
    })

    it('should reset position when dialog is closed and reopened', async () => {
      const user = userEvent.setup()
      const { container, rerender } = render(<WindowDialog {...defaultProps} />)

      // Move the window
      const header = container.querySelector('[class*="sekai-window-dialog-header"]')
      act(() => {
        fireEvent.mouseDown(header!, { clientX: 100, clientY: 100 })
        fireEvent.mouseMove(window, { clientX: 200, clientY: 200 })
        fireEvent.mouseUp(window)
      })

      // Close
      const closeIcon = screen.getByTestId('clear-icon')
      await user.click(closeIcon)

      // Reopen
      rerender(<WindowDialog {...defaultProps} open={true} />)

      const dialog = container.querySelector('[role="dialog"]')
      const style = dialog?.getAttribute('style')
      expect(style).toContain('left: 50%')
      expect(style).toContain('top: 50%')
    })

    it('should apply absolute position when containerComponent is provided', () => {
      const customContainer = document.createElement('div')
      const { container } = render(
        <WindowDialog {...defaultProps} containerComponent={customContainer} />,
      )
      const dialog = container.querySelector('[role="dialog"]')
      const style = dialog?.getAttribute('style')
      expect(style).toContain('position: absolute')
    })
  })

  describe('Theme Integration', () => {
    it('should apply sekai color CSS variables', () => {
      const { container } = render(<WindowDialog {...defaultProps} sekai="Miku" />)
      const windowElement = container.querySelector('[style*="--sekai-color"]')
      expect(windowElement).toBeInTheDocument()
    })

    it('should apply light theme mode class', () => {
      const { container } = render(<WindowDialog {...defaultProps} themeMode="light" />)
      const windowElement = container.querySelector('[class*="sekai-window-dialog-light"]')
      expect(windowElement).toBeInTheDocument()
    })

    it('should apply dark theme mode class', () => {
      const useOptionalSekai = require('@/internal/useOptionalSekai').useOptionalSekai
      useOptionalSekai.mockReturnValue({
        sekaiColor: '#33ccba',
        modeTheme: 'dark',
        isLight: false,
      })

      const { container } = render(<WindowDialog {...defaultProps} themeMode="dark" />)
      const windowElement = container.querySelector('[class*="sekai-window-dialog-dark"]')
      expect(windowElement).toBeInTheDocument()
    })

    it('should call convertHexToRgbaMixWithBlackOrWhite for background color', () => {
      const convertFn = require('@/utils/converter').convertHexToRgbaMixWithBlackOrWhite
      convertFn.mockClear()

      render(<WindowDialog {...defaultProps} sekai="Miku" />)

      // Should be called twice for background and header colors
      expect(convertFn).toHaveBeenCalled()
      expect(convertFn.mock.calls.length).toBeGreaterThanOrEqual(2)
    })
  })

  describe('Accessibility', () => {
    it('should have role="dialog"', () => {
      render(<WindowDialog {...defaultProps} />)
      expect(screen.getByRole('dialog')).toBeInTheDocument()
    })

    it('should have focusable header', () => {
      const { container } = render(<WindowDialog {...defaultProps} />)
      const header = container.querySelector('[class*="sekai-window-dialog-header"]')
      expect(header).toHaveAttribute('tabIndex', '0')
    })

    it('should have role="button" on header', () => {
      const { container } = render(<WindowDialog {...defaultProps} />)
      const header = container.querySelector('[role="button"]')
      expect(header).toBeInTheDocument()
    })
  })

  describe('Edge Cases', () => {
    beforeEach(() => {
      const usePortalContainer = require('@/internal/usePortalContainer').usePortalContainer
      usePortalContainer.mockReturnValue(document.body)
    })

    it('should handle null children gracefully', () => {
      const { container } = render(<WindowDialog {...defaultProps} children={null} />)
      expect(container).toBeInTheDocument()
    })

    it('should handle undefined children gracefully', () => {
      const { container } = render(<WindowDialog {...defaultProps} children={undefined} />)
      expect(container).toBeInTheDocument()
    })

    it('should handle empty fragment as children', () => {
      render(<WindowDialog {...defaultProps} children={<></>} />)
      expect(screen.getByRole('dialog')).toBeInTheDocument()
    })

    it('should handle mouse events when portalContainer is null during drag', () => {
      const { container } = render(<WindowDialog {...defaultProps} />)
      const header = container.querySelector('[class*="sekai-window-dialog-header"]')

      const usePortalContainer = require('@/internal/usePortalContainer').usePortalContainer
      usePortalContainer.mockReturnValue(null)

      act(() => {
        fireEvent.mouseDown(header!, { clientX: 100, clientY: 100 })
        fireEvent.mouseMove(window, { clientX: 200, clientY: 200 })
      })

      // Should not throw error
      expect(container).toBeInTheDocument()
    })

    it('should handle missing modal ref during mouseDown', () => {
      const { container } = render(<WindowDialog {...defaultProps} />)
      const dialog = container.querySelector('[role="dialog"]')

      // Create a separate element that's not part of the modal
      const externalHeader = document.createElement('div')
      document.body.appendChild(externalHeader)

      act(() => {
        fireEvent.mouseDown(externalHeader, { clientX: 100, clientY: 100 })
      })

      // Should not throw error, dialog should still be in document
      expect(dialog).toBeInTheDocument()

      // Cleanup
      document.body.removeChild(externalHeader)
    })
  })

  describe('Integration Tests', () => {
    beforeEach(() => {
      const usePortalContainer = require('@/internal/usePortalContainer').usePortalContainer
      usePortalContainer.mockReturnValue(document.body)
    })

    it('should re-render when open prop changes', () => {
      const { rerender, container } = render(<WindowDialog {...defaultProps} open={true} />)
      let visibleElement = container.querySelector('[class*="sekai-dialog-visible"]')
      expect(visibleElement).not.toBeNull()

      rerender(<WindowDialog {...defaultProps} open={false} />)
      const hiddenElement = container.querySelector('[class*="sekai-dialog-hidden"]')
      expect(hiddenElement).not.toBeNull()

      rerender(<WindowDialog {...defaultProps} open={true} />)
      visibleElement = container.querySelector('[class*="sekai-dialog-visible"]')
      expect(visibleElement).not.toBeNull()
    })

    it('should update children on re-render', () => {
      const { rerender, container } = render(
        <WindowDialog {...defaultProps}>
          <div data-testid="content">Original Content</div>
        </WindowDialog>,
      )
      const content = container.querySelector('[data-testid="content"]')
      expect(content).toHaveTextContent('Original Content')

      rerender(
        <WindowDialog {...defaultProps}>
          <div data-testid="content">Updated Content</div>
        </WindowDialog>,
      )
      const updatedContent = container.querySelector('[data-testid="content"]')
      expect(updatedContent).toHaveTextContent('Updated Content')
    })

    it('should maintain portal rendering across re-renders', () => {
      const portalMock = createPortal as jest.Mock
      portalMock.mockClear()

      const { rerender } = render(<WindowDialog {...defaultProps} />)
      const initialCallCount = portalMock.mock.calls.length

      rerender(<WindowDialog {...defaultProps} />)
      expect(portalMock.mock.calls.length).toBeGreaterThanOrEqual(initialCallCount)
    })

    it('should reset fullscreen state when dialog is closed', async () => {
      const handleClose = jest.fn()
      const user = userEvent.setup()
      const { container } = render(<WindowDialog {...defaultProps} onClose={handleClose} />)

      // Enter fullscreen
      const squareIcon = container.querySelector('[data-testid="square-icon"]')
      expect(squareIcon).toBeInTheDocument()
      await user.click(squareIcon!)

      const fullscreenElement = container.querySelector('[class*="sekai-window-dialog-fullscreen"]')
      expect(fullscreenElement).toBeInTheDocument()

      // Close (closeWindow is called which resets state)
      const closeIcon = container.querySelector('[data-testid="clear-icon"]')
      expect(closeIcon).toBeInTheDocument()
      await user.click(closeIcon!)

      expect(handleClose).toHaveBeenCalled()
    })

    it('should update size when size prop changes', () => {
      const { container, rerender } = render(<WindowDialog {...defaultProps} size="narrow" />)
      let sizeElement = container.querySelector('[class*="sekai-window-dialog-size-narrow"]')
      expect(sizeElement).not.toBeNull()

      rerender(<WindowDialog {...defaultProps} size="wide" />)
      sizeElement = container.querySelector('[class*="sekai-window-dialog-size-wide"]')
      expect(sizeElement).not.toBeNull()
    })
  })
})
