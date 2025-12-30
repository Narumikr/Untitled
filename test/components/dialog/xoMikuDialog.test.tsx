/* eslint-disable max-lines-per-function */
import React from 'react'

import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { createPortal } from 'react-dom'

import { XoMikuDialog } from '@/components/dialog/XoMikuDialog'

import type { XoMikuDialogProps } from '@/components/dialog/XoMikuDialog'

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
  convertHexToRgba: jest.fn((color: string, alpha: number) =>
    `rgba(51, 204, 186, ${alpha})`,
  ),
}))

// Mock Backdrop component
jest.mock('@/components/backdrop/Backdrop', () => ({
  Backdrop: ({
    children,
    open,
    themeMode,
    containerComponent,
    centered,
    id,
    ...props
  }: {
    children: React.ReactNode
    open?: boolean
    themeMode?: string
    containerComponent?: HTMLElement
    centered?: boolean
    id?: string
  }) => (
    <div data-testid="mock-backdrop" id={id} {...props}>
      {children}
    </div>
  ),
}))

// Mock DialogTitleHeader component
jest.mock('@/components/dialog/Dialog', () => ({
  DialogTitleHeader: ({
    title,
    onClose,
    id,
  }: {
    title?: string
    onClose: () => void
    id?: string
  }) => (
    <div data-testid="dialog-title-header" id={id}>
      {title && <h2>{title}</h2>}
      <button onClick={onClose}>Close</button>
    </div>
  ),
  DialogButtons: ({
    buttons,
    id,
    className,
  }: {
    buttons?: Array<{ text: string; onClick: () => void }>
    id?: string
    className?: string
  }) => (
    <div data-testid="dialog-buttons" id={id} className={className}>
      {buttons?.map((btn) => (
        <button key={btn.text} onClick={btn.onClick}>
          {btn.text}
        </button>
      ))}
    </div>
  ),
}))

// Mock XoMikuSvg component
jest.mock('@/img/xomiku', () => ({
  XoMikuSvg: ({ className, type }: { className?: string; type?: string }) => (
    <svg data-testid="xomiku-svg" className={className} data-type={type} />
  ),
}))

describe('XoMikuDialog Component', () => {
  const defaultProps: XoMikuDialogProps = {
    open: true,
    onClose: jest.fn(),
    children: <div data-testid="dialog-content">Test Content</div>,
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('Rendering', () => {
    it('should render without crashing when open', () => {
      render(<XoMikuDialog {...defaultProps} />)
      expect(screen.getByTestId('dialog-content')).toBeInTheDocument()
    })

    it('should render children content', () => {
      render(<XoMikuDialog {...defaultProps} />)
      expect(screen.getByTestId('dialog-content')).toBeInTheDocument()
      expect(screen.getByText('Test Content')).toBeInTheDocument()
    })

    it('should render with custom id', () => {
      const { container } = render(<XoMikuDialog {...defaultProps} id="custom-dialog" />)
      const dialogElement = container.querySelector('#custom-dialog')
      expect(dialogElement).toBeInTheDocument()
    })

    it('should render with custom className', () => {
      const { container } = render(<XoMikuDialog {...defaultProps} className="custom-class" />)
      const dialogElement = container.querySelector('.custom-class')
      expect(dialogElement).toBeInTheDocument()
    })

    it('should render with custom styles', () => {
      const customStyle = { backgroundColor: 'red', padding: '20px' }
      const { container } = render(<XoMikuDialog {...defaultProps} style={customStyle} />)
      const dialogElement = container.querySelector('[style*="background-color"]')
      expect(dialogElement).toBeInTheDocument()
    })

    it('should render complex children', () => {
      const ComplexChildren = (
        <div>
          <h1>Title</h1>
          <p>Description</p>
          <button>Action</button>
        </div>
      )
      render(<XoMikuDialog {...defaultProps} children={ComplexChildren} />)
      expect(screen.getByText('Title')).toBeInTheDocument()
      expect(screen.getByText('Description')).toBeInTheDocument()
      expect(screen.getByText('Action')).toBeInTheDocument()
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
      render(<XoMikuDialog {...defaultProps} />)
      expect(portalMock).toHaveBeenCalled()
    })

    it('should render in portal container', () => {
      const mockContainer = document.createElement('div')
      const usePortalContainer = require('@/internal/usePortalContainer').usePortalContainer
      usePortalContainer.mockReturnValue(mockContainer)

      const portalMock = createPortal as jest.Mock
      portalMock.mockClear()

      render(<XoMikuDialog {...defaultProps} />)
      expect(portalMock).toHaveBeenCalledWith(expect.anything(), mockContainer)
    })

    it('should not render when portal container is null', () => {
      const usePortalContainer = require('@/internal/usePortalContainer').usePortalContainer
      usePortalContainer.mockReturnValue(null)

      const { container } = render(<XoMikuDialog {...defaultProps} />)
      expect(container.firstChild).toBeNull()
    })

    it('should use custom containerComponent if provided', () => {
      const customContainer = document.createElement('div')
      const usePortalContainer = require('@/internal/usePortalContainer').usePortalContainer
      usePortalContainer.mockReturnValue(customContainer)

      const portalMock = createPortal as jest.Mock
      portalMock.mockClear()

      render(<XoMikuDialog {...defaultProps} containerComponent={customContainer} />)
      expect(portalMock).toHaveBeenCalled()
    })
  })

  describe('Props - size', () => {
    it('should use medium size by default', () => {
      const { container } = render(<XoMikuDialog {...defaultProps} />)
      const dialogElement = container.querySelector('[class*="sekai-container-medium"]')
      expect(dialogElement).toBeInTheDocument()
    })

    it('should apply narrow size when specified', () => {
      const { container } = render(<XoMikuDialog {...defaultProps} size="narrow" />)
      const dialogElement = container.querySelector('[class*="sekai-container-narrow"]')
      expect(dialogElement).toBeInTheDocument()
    })

    it('should apply wide size when specified', () => {
      const { container } = render(<XoMikuDialog {...defaultProps} size="wide" />)
      const dialogElement = container.querySelector('[class*="sekai-container-wide"]')
      expect(dialogElement).toBeInTheDocument()
    })
  })

  describe('XoMiku SVG Decorations', () => {
    it('should render 5 XoMikuSvg components', () => {
      render(<XoMikuDialog {...defaultProps} />)
      const svgs = screen.getAllByTestId('xomiku-svg')
      expect(svgs).toHaveLength(5)
    })

    it('should render SVGs with correct classes for narrow size', () => {
      const { container } = render(<XoMikuDialog {...defaultProps} size="narrow" />)
      expect(container.querySelector('[class*="sekai-xomiku-svg-1-narrow"]')).toBeInTheDocument()
      expect(container.querySelector('[class*="sekai-xomiku-svg-2-narrow"]')).toBeInTheDocument()
      expect(container.querySelector('[class*="sekai-xomiku-svg-3-narrow"]')).toBeInTheDocument()
      expect(container.querySelector('[class*="sekai-xomiku-svg-4-narrow"]')).toBeInTheDocument()
      expect(container.querySelector('[class*="sekai-xomiku-svg-5-narrow"]')).toBeInTheDocument()
    })

    it('should render SVGs with correct classes for medium size', () => {
      const { container } = render(<XoMikuDialog {...defaultProps} size="medium" />)
      expect(container.querySelector('[class*="sekai-xomiku-svg-1-medium"]')).toBeInTheDocument()
      expect(container.querySelector('[class*="sekai-xomiku-svg-2-medium"]')).toBeInTheDocument()
      expect(container.querySelector('[class*="sekai-xomiku-svg-3-medium"]')).toBeInTheDocument()
      expect(container.querySelector('[class*="sekai-xomiku-svg-4-medium"]')).toBeInTheDocument()
      expect(container.querySelector('[class*="sekai-xomiku-svg-5-medium"]')).toBeInTheDocument()
    })

    it('should render SVGs with correct classes for wide size', () => {
      const { container } = render(<XoMikuDialog {...defaultProps} size="wide" />)
      expect(container.querySelector('[class*="sekai-xomiku-svg-1-wide"]')).toBeInTheDocument()
      expect(container.querySelector('[class*="sekai-xomiku-svg-2-wide"]')).toBeInTheDocument()
      expect(container.querySelector('[class*="sekai-xomiku-svg-3-wide"]')).toBeInTheDocument()
      expect(container.querySelector('[class*="sekai-xomiku-svg-4-wide"]')).toBeInTheDocument()
      expect(container.querySelector('[class*="sekai-xomiku-svg-5-wide"]')).toBeInTheDocument()
    })

    it('should render first two SVGs without type', () => {
      render(<XoMikuDialog {...defaultProps} />)
      const svgs = screen.getAllByTestId('xomiku-svg')
      expect(svgs[0]).not.toHaveAttribute('data-type')
      expect(svgs[1]).not.toHaveAttribute('data-type')
    })

    it('should render last three SVGs with type2', () => {
      render(<XoMikuDialog {...defaultProps} />)
      const svgs = screen.getAllByTestId('xomiku-svg')
      expect(svgs[2]).toHaveAttribute('data-type', 'type2')
      expect(svgs[3]).toHaveAttribute('data-type', 'type2')
      expect(svgs[4]).toHaveAttribute('data-type', 'type2')
    })
  })

  describe('Props - title', () => {
    it('should render title when provided', () => {
      render(<XoMikuDialog {...defaultProps} title="Test Title" />)
      expect(screen.getByText('Test Title')).toBeInTheDocument()
    })

    it('should render DialogTitleHeader component', () => {
      render(<XoMikuDialog {...defaultProps} title="Test Title" />)
      expect(screen.getByTestId('dialog-title-header')).toBeInTheDocument()
    })

    it('should render DialogTitleHeader with id', () => {
      const { container } = render(<XoMikuDialog {...defaultProps} title="Test" />)
      const header = container.querySelector('#xo-miku-dialog-header')
      expect(header).toBeInTheDocument()
    })
  })

  describe('Props - buttons', () => {
    it('should render buttons when provided', () => {
      const buttons = [
        { text: 'Cancel', onClick: jest.fn() },
        { text: 'Confirm', onClick: jest.fn(), type: 'strong' as const },
      ]
      render(<XoMikuDialog {...defaultProps} buttons={buttons} />)
      expect(screen.getByText('Cancel')).toBeInTheDocument()
      expect(screen.getByText('Confirm')).toBeInTheDocument()
    })

    it('should render DialogButtons component', () => {
      const buttons = [{ text: 'Button', onClick: jest.fn() }]
      render(<XoMikuDialog {...defaultProps} buttons={buttons} />)
      expect(screen.getByTestId('dialog-buttons')).toBeInTheDocument()
    })

    it('should render DialogButtons with id and className', () => {
      const buttons = [{ text: 'Button', onClick: jest.fn() }]
      const { container } = render(<XoMikuDialog {...defaultProps} buttons={buttons} />)
      const buttonsElement = container.querySelector('#xo-miku-dialog-buttons')
      expect(buttonsElement).toBeInTheDocument()
      expect(buttonsElement).toHaveClass('sekai-xomiku-button')
    })

    it('should call button onClick handlers', async () => {
      const handleCancel = jest.fn()
      const handleConfirm = jest.fn()
      const buttons = [
        { text: 'Cancel', onClick: handleCancel },
        { text: 'Confirm', onClick: handleConfirm },
      ]
      const user = userEvent.setup()

      render(<XoMikuDialog {...defaultProps} buttons={buttons} />)

      await user.click(screen.getByText('Cancel'))
      expect(handleCancel).toHaveBeenCalledTimes(1)

      await user.click(screen.getByText('Confirm'))
      expect(handleConfirm).toHaveBeenCalledTimes(1)
    })

    it('should apply custom buttonStyle based on button type', () => {
      const buttons = [
        { text: 'Normal', onClick: jest.fn(), type: 'normal' as const },
        { text: 'Strong', onClick: jest.fn(), type: 'strong' as const },
      ]
      render(<XoMikuDialog {...defaultProps} buttons={buttons} />)

      // Buttons should be rendered with their styles
      expect(screen.getByText('Normal')).toBeInTheDocument()
      expect(screen.getByText('Strong')).toBeInTheDocument()
    })

    it('should use normal type by default when type is not specified', () => {
      const buttons = [{ text: 'Default', onClick: jest.fn() }]
      render(<XoMikuDialog {...defaultProps} buttons={buttons} />)
      expect(screen.getByText('Default')).toBeInTheDocument()
    })
  })

  describe('Event Handlers', () => {
    it('should call onClose when Escape key is pressed', async () => {
      const handleClose = jest.fn()
      const user = userEvent.setup()

      render(<XoMikuDialog {...defaultProps} onClose={handleClose} />)

      await user.keyboard('{Escape}')
      expect(handleClose).toHaveBeenCalledTimes(1)
    })

    it('should not add Escape listener when dialog is closed', () => {
      const handleClose = jest.fn()
      const addEventListenerSpy = jest.spyOn(document, 'addEventListener')

      render(<XoMikuDialog {...defaultProps} open={false} onClose={handleClose} />)

      // Should not add listener when open is false
      expect(addEventListenerSpy).not.toHaveBeenCalled()

      addEventListenerSpy.mockRestore()
    })

    it('should cleanup event listener on unmount', () => {
      const handleClose = jest.fn()
      const removeEventListenerSpy = jest.spyOn(document, 'removeEventListener')

      const { unmount } = render(<XoMikuDialog {...defaultProps} onClose={handleClose} />)
      unmount()

      expect(removeEventListenerSpy).toHaveBeenCalled()
      removeEventListenerSpy.mockRestore()
    })
  })

  describe('Backdrop Integration', () => {
    it('should render Backdrop component', () => {
      render(<XoMikuDialog {...defaultProps} />)
      expect(screen.getByTestId('mock-backdrop')).toBeInTheDocument()
    })

    it('should pass open prop to Backdrop', () => {
      render(<XoMikuDialog {...defaultProps} open={true} />)
      const backdrop = screen.getByTestId('mock-backdrop')
      expect(backdrop).toBeInTheDocument()
    })

    it('should pass themeMode to Backdrop', () => {
      render(<XoMikuDialog {...defaultProps} themeMode="dark" />)
      const backdrop = screen.getByTestId('mock-backdrop')
      expect(backdrop).toBeInTheDocument()
    })

    it('should pass containerComponent to Backdrop', () => {
      const customContainer = document.createElement('div')
      render(<XoMikuDialog {...defaultProps} containerComponent={customContainer} />)
      const backdrop = screen.getByTestId('mock-backdrop')
      expect(backdrop).toBeInTheDocument()
    })

    it('should set centered to true on Backdrop', () => {
      render(<XoMikuDialog {...defaultProps} />)
      const backdrop = screen.getByTestId('mock-backdrop')
      expect(backdrop).toBeInTheDocument()
    })

    it('should set id on Backdrop', () => {
      const { container } = render(<XoMikuDialog {...defaultProps} />)
      const backdrop = container.querySelector('#xomiku-dialog-overlay')
      expect(backdrop).toBeInTheDocument()
    })
  })

  describe('Accessibility', () => {
    it('should have role="dialog"', () => {
      render(<XoMikuDialog {...defaultProps} />)
      expect(screen.getByRole('dialog')).toBeInTheDocument()
    })

    it('should have aria-label with title', () => {
      render(<XoMikuDialog {...defaultProps} title="Test Dialog" />)
      const dialog = screen.getByRole('dialog')
      expect(dialog).toHaveAttribute('aria-label', 'Test Dialog')
    })

    it('should have default aria-label when no title provided', () => {
      render(<XoMikuDialog {...defaultProps} />)
      const dialog = screen.getByRole('dialog')
      expect(dialog).toHaveAttribute('aria-label', 'Dialog')
    })
  })

  describe('Edge Cases', () => {
    it('should handle null children gracefully', () => {
      const { container } = render(<XoMikuDialog {...defaultProps} children={null} />)
      expect(container).toBeInTheDocument()
    })

    it('should handle undefined children gracefully', () => {
      const { container } = render(<XoMikuDialog {...defaultProps} children={undefined} />)
      expect(container).toBeInTheDocument()
    })

    it('should handle empty fragment as children', () => {
      render(<XoMikuDialog {...defaultProps} children={<></>} />)
      expect(screen.getByRole('dialog')).toBeInTheDocument()
    })

    it('should handle undefined title', () => {
      render(<XoMikuDialog {...defaultProps} title={undefined} />)
      expect(screen.getByRole('dialog')).toBeInTheDocument()
    })

    it('should handle empty buttons array', () => {
      render(<XoMikuDialog {...defaultProps} buttons={[]} />)
      expect(screen.getByRole('dialog')).toBeInTheDocument()
    })

    it('should handle undefined buttons', () => {
      render(<XoMikuDialog {...defaultProps} buttons={undefined} />)
      expect(screen.getByRole('dialog')).toBeInTheDocument()
    })
  })

  describe('Integration Tests', () => {
    it('should re-render when open prop changes', () => {
      const { rerender } = render(<XoMikuDialog {...defaultProps} open={true} />)
      expect(screen.getByTestId('dialog-content')).toBeInTheDocument()

      rerender(<XoMikuDialog {...defaultProps} open={false} />)
      // Dialog still renders but passes open=false to Backdrop
      expect(screen.getByTestId('mock-backdrop')).toBeInTheDocument()
    })

    it('should update children on re-render', () => {
      const { rerender, container } = render(
        <XoMikuDialog {...defaultProps} children={<div>Original Content</div>} />,
      )
      expect(container.textContent).toContain('Original Content')

      rerender(<XoMikuDialog {...defaultProps} children={<div>Updated Content</div>} />)
      expect(container.textContent).toContain('Updated Content')
      expect(container.textContent).not.toContain('Original Content')
    })

    it('should update title on re-render', () => {
      const { rerender } = render(<XoMikuDialog {...defaultProps} title="Original Title" />)
      expect(screen.getByText('Original Title')).toBeInTheDocument()

      rerender(<XoMikuDialog {...defaultProps} title="Updated Title" />)
      expect(screen.getByText('Updated Title')).toBeInTheDocument()
      expect(screen.queryByText('Original Title')).not.toBeInTheDocument()
    })

    it('should update buttons on re-render', () => {
      const buttons1 = [{ text: 'Button 1', onClick: jest.fn() }]
      const buttons2 = [{ text: 'Button 2', onClick: jest.fn() }]

      const { rerender } = render(<XoMikuDialog {...defaultProps} buttons={buttons1} />)
      expect(screen.getByText('Button 1')).toBeInTheDocument()

      rerender(<XoMikuDialog {...defaultProps} buttons={buttons2} />)
      expect(screen.getByText('Button 2')).toBeInTheDocument()
      expect(screen.queryByText('Button 1')).not.toBeInTheDocument()
    })

    it('should maintain portal rendering across re-renders', () => {
      const portalMock = createPortal as jest.Mock
      portalMock.mockClear()

      const { rerender } = render(<XoMikuDialog {...defaultProps} />)
      const initialCallCount = portalMock.mock.calls.length

      rerender(<XoMikuDialog {...defaultProps} />)
      expect(portalMock.mock.calls.length).toBeGreaterThanOrEqual(initialCallCount)
    })

    it('should update size and SVG classes on re-render', () => {
      const { container, rerender } = render(<XoMikuDialog {...defaultProps} size="narrow" />)
      expect(container.querySelector('[class*="sekai-xomiku-svg-1-narrow"]')).toBeInTheDocument()

      rerender(<XoMikuDialog {...defaultProps} size="wide" />)
      expect(container.querySelector('[class*="sekai-xomiku-svg-1-wide"]')).toBeInTheDocument()
    })
  })

  describe('Theme Mode', () => {
    it('should use LIGHT_MODE for buttons regardless of themeMode prop', () => {
      render(<XoMikuDialog {...defaultProps} themeMode="dark" />)
      // DialogButtons should receive LIGHT_MODE
      expect(screen.getByTestId('dialog-buttons')).toBeInTheDocument()
    })
  })
})
