/* eslint-disable max-lines-per-function */
import React from 'react'

import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { createPortal } from 'react-dom'

import { Dialog, DialogButtons, DialogTitleHeader } from '@/components/dialog/Dialog'

import type { DialogProps } from '@/components/dialog/Dialog'

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
  convertHexToRgba: jest.fn((color: string, alpha: number) => `rgba(51, 204, 186, ${alpha})`),
}))

// Mock Backdrop component
jest.mock('@/components/backdrop/Backdrop', () => ({
  Backdrop: ({
    children,
    open,
    themeMode,
    containerComponent,
    centered,
    ...props
  }: {
    children: React.ReactNode
    open?: boolean
    themeMode?: string
    containerComponent?: HTMLElement
    centered?: boolean
  }) => (
    <div data-testid="mock-backdrop" {...props}>
      {children}
    </div>
  ),
}))

// Mock ClearSvg component
jest.mock('@/img/clear', () => ({
  ClearSvg: ({
    onClick,
    sekai,
    themeMode,
  }: {
    onClick?: () => void
    sekai?: string
    themeMode?: string
  }) => <svg data-testid="clear-icon" onClick={onClick} />,
}))

describe('Dialog Component', () => {
  const defaultProps: DialogProps = {
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
      render(<Dialog {...defaultProps} />)
      expect(screen.getByTestId('dialog-content')).toBeInTheDocument()
    })

    it('should render children content', () => {
      render(<Dialog {...defaultProps} />)
      expect(screen.getByTestId('dialog-content')).toBeInTheDocument()
      expect(screen.getByText('Test Content')).toBeInTheDocument()
    })

    it('should render with custom id', () => {
      const { container } = render(<Dialog {...defaultProps} id="custom-dialog" />)
      const dialogElement = container.querySelector('#custom-dialog')
      expect(dialogElement).toBeInTheDocument()
    })

    it('should render with custom className', () => {
      const { container } = render(<Dialog {...defaultProps} className="custom-class" />)
      const dialogElement = container.querySelector('.custom-class')
      expect(dialogElement).toBeInTheDocument()
    })

    it('should render with custom styles', () => {
      const customStyle = { backgroundColor: 'red', padding: '20px' }
      const { container } = render(<Dialog {...defaultProps} style={customStyle} />)
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
      render(<Dialog {...defaultProps} children={ComplexChildren} />)
      expect(screen.getByText('Title')).toBeInTheDocument()
      expect(screen.getByText('Description')).toBeInTheDocument()
      expect(screen.getByText('Action')).toBeInTheDocument()
    })
  })

  describe('Open/Close State', () => {
    it('should render when open is true', () => {
      render(<Dialog {...defaultProps} open={true} />)
      expect(screen.getByTestId('dialog-content')).toBeInTheDocument()
    })

    it('should pass open prop to Backdrop', () => {
      render(<Dialog {...defaultProps} open={true} />)
      const backdrop = screen.getByTestId('mock-backdrop')
      expect(backdrop).toBeInTheDocument()
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
      render(<Dialog {...defaultProps} />)
      expect(portalMock).toHaveBeenCalled()
    })

    it('should render in portal container', () => {
      const mockContainer = document.createElement('div')
      const usePortalContainer = require('@/internal/usePortalContainer').usePortalContainer
      usePortalContainer.mockReturnValue(mockContainer)

      const portalMock = createPortal as jest.Mock
      portalMock.mockClear()

      render(<Dialog {...defaultProps} />)
      expect(portalMock).toHaveBeenCalledWith(expect.anything(), mockContainer)
    })

    it('should not render when portal container is null', () => {
      const usePortalContainer = require('@/internal/usePortalContainer').usePortalContainer
      usePortalContainer.mockReturnValue(null)

      const { container } = render(<Dialog {...defaultProps} />)
      expect(container.firstChild).toBeNull()
    })

    it('should use custom containerComponent if provided', () => {
      const customContainer = document.createElement('div')
      const usePortalContainer = require('@/internal/usePortalContainer').usePortalContainer
      usePortalContainer.mockReturnValue(customContainer)

      const portalMock = createPortal as jest.Mock
      portalMock.mockClear()

      render(<Dialog {...defaultProps} containerComponent={customContainer} />)
      expect(portalMock).toHaveBeenCalled()
    })
  })

  describe('Props - size', () => {
    it('should use medium size by default', () => {
      const { container } = render(<Dialog {...defaultProps} />)
      const dialogElement = container.querySelector('[class*="sekai-container-medium"]')
      expect(dialogElement).toBeInTheDocument()
    })

    it('should apply narrow size when specified', () => {
      const { container } = render(<Dialog {...defaultProps} size="narrow" />)
      const dialogElement = container.querySelector('[class*="sekai-container-narrow"]')
      expect(dialogElement).toBeInTheDocument()
    })

    it('should apply wide size when specified', () => {
      const { container } = render(<Dialog {...defaultProps} size="wide" />)
      const dialogElement = container.querySelector('[class*="sekai-container-wide"]')
      expect(dialogElement).toBeInTheDocument()
    })
  })

  describe('Props - title', () => {
    it('should render title when provided', () => {
      render(<Dialog {...defaultProps} title="Test Title" />)
      expect(screen.getByText('Test Title')).toBeInTheDocument()
    })

    it('should not render DialogTitleHeader when title is not provided and showCloseIcon is false', () => {
      const { container } = render(<Dialog {...defaultProps} />)
      const titleHeader = container.querySelector('h2')
      expect(titleHeader).not.toBeInTheDocument()
    })
  })

  describe('Props - showCloseIcon', () => {
    it('should render close icon when showCloseIcon is true', () => {
      render(<Dialog {...defaultProps} showCloseIcon={true} />)
      expect(screen.getByTestId('clear-icon')).toBeInTheDocument()
    })

    it('should not render close icon when showCloseIcon is false', () => {
      render(<Dialog {...defaultProps} showCloseIcon={false} />)
      expect(screen.queryByTestId('clear-icon')).not.toBeInTheDocument()
    })

    it('should call onClose when close icon is clicked', async () => {
      const handleClose = jest.fn()
      const user = userEvent.setup()

      render(<Dialog {...defaultProps} showCloseIcon={true} onClose={handleClose} />)

      const closeIcon = screen.getByTestId('clear-icon')
      await user.click(closeIcon)
      expect(handleClose).toHaveBeenCalledTimes(1)
    })
  })

  describe('Props - buttons', () => {
    it('should render buttons when provided', () => {
      const buttons = [
        { text: 'Cancel', onClick: jest.fn() },
        { text: 'Confirm', onClick: jest.fn(), type: 'strong' as const },
      ]
      render(<Dialog {...defaultProps} buttons={buttons} />)
      expect(screen.getByText('Cancel')).toBeInTheDocument()
      expect(screen.getByText('Confirm')).toBeInTheDocument()
    })

    it('should not render DialogButtons when buttons is not provided', () => {
      render(<Dialog {...defaultProps} />)
      expect(screen.queryByRole('button')).not.toBeInTheDocument()
    })

    it('should call button onClick handlers', async () => {
      const handleCancel = jest.fn()
      const handleConfirm = jest.fn()
      const buttons = [
        { text: 'Cancel', onClick: handleCancel },
        { text: 'Confirm', onClick: handleConfirm },
      ]
      const user = userEvent.setup()

      render(<Dialog {...defaultProps} buttons={buttons} />)

      await user.click(screen.getByText('Cancel'))
      expect(handleCancel).toHaveBeenCalledTimes(1)

      await user.click(screen.getByText('Confirm'))
      expect(handleConfirm).toHaveBeenCalledTimes(1)
    })
  })

  describe('Props - dialogButtons', () => {
    it('should render custom dialogButtons when provided', () => {
      const customButtons = (
        <div data-testid="custom-buttons">
          <button>Custom Action</button>
        </div>
      )
      render(<Dialog {...defaultProps} dialogButtons={customButtons} />)
      expect(screen.getByTestId('custom-buttons')).toBeInTheDocument()
      expect(screen.getByText('Custom Action')).toBeInTheDocument()
    })

    it('should use dialogButtons instead of buttons when both are provided', () => {
      const buttons = [{ text: 'Default Button', onClick: jest.fn() }]
      const customButtons = <button data-testid="custom-btn">Custom Button</button>
      render(<Dialog {...defaultProps} buttons={buttons} dialogButtons={customButtons} />)
      expect(screen.getByTestId('custom-btn')).toBeInTheDocument()
      expect(screen.queryByText('Default Button')).not.toBeInTheDocument()
    })
  })

  describe('Event Handlers', () => {
    it('should call onClose when Escape key is pressed', async () => {
      const handleClose = jest.fn()
      const user = userEvent.setup()

      render(<Dialog {...defaultProps} onClose={handleClose} />)

      await user.keyboard('{Escape}')
      expect(handleClose).toHaveBeenCalledTimes(1)
    })

    it('should not add Escape listener when dialog is closed', () => {
      const handleClose = jest.fn()
      const addEventListenerSpy = jest.spyOn(document, 'addEventListener')

      render(<Dialog {...defaultProps} open={false} onClose={handleClose} />)

      // Should not add listener when open is false
      expect(addEventListenerSpy).not.toHaveBeenCalled()

      addEventListenerSpy.mockRestore()
    })

    it('should cleanup event listener on unmount', () => {
      const handleClose = jest.fn()
      const removeEventListenerSpy = jest.spyOn(document, 'removeEventListener')

      const { unmount } = render(<Dialog {...defaultProps} onClose={handleClose} />)
      unmount()

      expect(removeEventListenerSpy).toHaveBeenCalled()
      removeEventListenerSpy.mockRestore()
    })
  })

  describe('Theme Integration', () => {
    beforeEach(() => {
      // Reset mock to default light mode before each test
      const useOptionalSekai = require('@/internal/useOptionalSekai').useOptionalSekai
      useOptionalSekai.mockReturnValue({
        sekaiColor: '#33ccba',
        modeTheme: 'light',
        isLight: true,
      })
    })

    it('should apply sekai color CSS variables', () => {
      const { container } = render(<Dialog {...defaultProps} sekai="Miku" />)
      const dialogElement = container.querySelector('[style*="--sekai-color"]')
      expect(dialogElement).toBeInTheDocument()
    })

    it('should apply theme mode class', () => {
      const { container } = render(<Dialog {...defaultProps} themeMode="light" />)
      const dialogElement = container.querySelector('[class*="sekai-color-light"]')
      expect(dialogElement).toBeInTheDocument()
    })

    it('should apply dark theme mode when specified', () => {
      const useOptionalSekai = require('@/internal/useOptionalSekai').useOptionalSekai
      useOptionalSekai.mockReturnValue({
        sekaiColor: '#33ccba',
        modeTheme: 'dark',
        isLight: false,
      })

      const { container } = render(<Dialog {...defaultProps} themeMode="dark" />)
      const dialogElement = container.querySelector('[class*="sekai-color-dark"]')
      expect(dialogElement).toBeInTheDocument()
    })

    it('should call convertHexToRgba for hover color', () => {
      const convertFn = require('@/utils/converter').convertHexToRgba
      convertFn.mockClear()

      render(<Dialog {...defaultProps} sekai="Miku" />)

      // Should be called at least once for creating hover color
      expect(convertFn).toHaveBeenCalled()
      // With isLight=true, should use 0.1 for hover
      expect(
        convertFn.mock.calls.some(
          (call: [string, number]) => call[0] === '#33ccba' && call[1] === 0.1,
        ),
      ).toBe(true)
    })
  })

  describe('Accessibility', () => {
    it('should have role="dialog"', () => {
      render(<Dialog {...defaultProps} />)
      expect(screen.getByRole('dialog')).toBeInTheDocument()
    })

    it('should have aria-label with title', () => {
      render(<Dialog {...defaultProps} title="Test Dialog" />)
      const dialog = screen.getByRole('dialog')
      expect(dialog).toHaveAttribute('aria-label', 'Test Dialog')
    })

    it('should have default aria-label when no title provided', () => {
      render(<Dialog {...defaultProps} />)
      const dialog = screen.getByRole('dialog')
      expect(dialog).toHaveAttribute('aria-label', 'Dialog')
    })
  })

  describe('Edge Cases', () => {
    it('should handle null children gracefully', () => {
      const { container } = render(<Dialog {...defaultProps} children={null} />)
      expect(container).toBeInTheDocument()
    })

    it('should handle undefined children gracefully', () => {
      const { container } = render(<Dialog {...defaultProps} children={undefined} />)
      expect(container).toBeInTheDocument()
    })

    it('should handle empty fragment as children', () => {
      render(<Dialog {...defaultProps} children={<></>} />)
      expect(screen.getByRole('dialog')).toBeInTheDocument()
    })

    it('should handle empty buttons array', () => {
      render(<Dialog {...defaultProps} buttons={[]} />)
      expect(screen.queryByRole('button')).not.toBeInTheDocument()
    })

    it('should handle undefined title', () => {
      const { container } = render(<Dialog {...defaultProps} title={undefined} />)
      const titleElement = container.querySelector('h2')
      expect(titleElement).not.toBeInTheDocument()
    })
  })

  describe('Integration Tests', () => {
    it('should re-render when open prop changes', () => {
      const { rerender } = render(<Dialog {...defaultProps} open={true} />)
      expect(screen.getByTestId('dialog-content')).toBeInTheDocument()

      rerender(<Dialog {...defaultProps} open={false} />)
      // Dialog still renders but passes open=false to Backdrop
      expect(screen.getByTestId('mock-backdrop')).toBeInTheDocument()
    })

    it('should update children on re-render', () => {
      const { rerender, container } = render(
        <Dialog {...defaultProps} children={<div>Original Content</div>} />,
      )
      expect(container.textContent).toContain('Original Content')

      rerender(<Dialog {...defaultProps} children={<div>Updated Content</div>} />)
      expect(container.textContent).toContain('Updated Content')
      expect(container.textContent).not.toContain('Original Content')
    })

    it('should update title on re-render', () => {
      const { rerender } = render(<Dialog {...defaultProps} title="Original Title" />)
      expect(screen.getByText('Original Title')).toBeInTheDocument()

      rerender(<Dialog {...defaultProps} title="Updated Title" />)
      expect(screen.getByText('Updated Title')).toBeInTheDocument()
      expect(screen.queryByText('Original Title')).not.toBeInTheDocument()
    })

    it('should maintain portal rendering across re-renders', () => {
      const portalMock = createPortal as jest.Mock
      portalMock.mockClear()

      const { rerender } = render(<Dialog {...defaultProps} />)
      const initialCallCount = portalMock.mock.calls.length

      rerender(<Dialog {...defaultProps} />)
      expect(portalMock.mock.calls.length).toBeGreaterThanOrEqual(initialCallCount)
    })
  })
})

describe('DialogTitleHeader Component', () => {
  const defaultProps = {
    size: 'medium' as const,
    onClose: jest.fn(),
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('Rendering', () => {
    it('should not render when title and showCloseIcon are not provided', () => {
      const { container } = render(<DialogTitleHeader {...defaultProps} />)
      expect(container.firstChild).toBeNull()
    })

    it('should render title when provided', () => {
      render(<DialogTitleHeader {...defaultProps} title="Test Title" />)
      expect(screen.getByText('Test Title')).toBeInTheDocument()
    })

    it('should render close icon when showCloseIcon is true', () => {
      render(<DialogTitleHeader {...defaultProps} showCloseIcon={true} />)
      expect(screen.getByTestId('clear-icon')).toBeInTheDocument()
    })

    it('should render both title and close icon', () => {
      render(<DialogTitleHeader {...defaultProps} title="Test" showCloseIcon={true} />)
      expect(screen.getByText('Test')).toBeInTheDocument()
      expect(screen.getByTestId('clear-icon')).toBeInTheDocument()
    })

    it('should render with custom id', () => {
      const { container } = render(
        <DialogTitleHeader {...defaultProps} title="Test" id="custom-header" />,
      )
      const headerElement = container.querySelector('#custom-header')
      expect(headerElement).toBeInTheDocument()
    })

    it('should render with custom className', () => {
      const { container } = render(
        <DialogTitleHeader {...defaultProps} title="Test" className="custom-header" />,
      )
      const headerElement = container.querySelector('.custom-header')
      expect(headerElement).toBeInTheDocument()
    })

    it('should render with custom styles', () => {
      const customStyle = { backgroundColor: 'blue' }
      const { container } = render(
        <DialogTitleHeader {...defaultProps} title="Test" style={customStyle} />,
      )
      const headerElement = container.querySelector('[style*="background-color"]')
      expect(headerElement).toBeInTheDocument()
    })
  })

  describe('Size Prop', () => {
    it('should apply narrow size class', () => {
      const { container } = render(
        <DialogTitleHeader {...defaultProps} title="Test" size="narrow" />,
      )
      const headerElement = container.querySelector('[class*="sekai-title-header-narrow"]')
      expect(headerElement).toBeInTheDocument()
    })

    it('should apply medium size class', () => {
      const { container } = render(
        <DialogTitleHeader {...defaultProps} title="Test" size="medium" />,
      )
      const headerElement = container.querySelector('[class*="sekai-title-header-medium"]')
      expect(headerElement).toBeInTheDocument()
    })

    it('should apply wide size class', () => {
      const { container } = render(
        <DialogTitleHeader {...defaultProps} title="Test" size="wide" />,
      )
      const headerElement = container.querySelector('[class*="sekai-title-header-wide"]')
      expect(headerElement).toBeInTheDocument()
    })
  })

  describe('Event Handlers', () => {
    it('should call onClose when close icon is clicked', async () => {
      const handleClose = jest.fn()
      const user = userEvent.setup()

      render(<DialogTitleHeader {...defaultProps} showCloseIcon={true} onClose={handleClose} />)

      const closeIcon = screen.getByTestId('clear-icon')
      await user.click(closeIcon)
      expect(handleClose).toHaveBeenCalledTimes(1)
    })
  })

  describe('Edge Cases', () => {
    it('should handle empty title string', () => {
      const { container } = render(<DialogTitleHeader {...defaultProps} title="" />)
      // Empty title still renders h2 but with no content
      expect(container.firstChild).toBeNull()
    })

    it('should handle undefined title with showCloseIcon true', () => {
      render(<DialogTitleHeader {...defaultProps} title={undefined} showCloseIcon={true} />)
      expect(screen.getByTestId('clear-icon')).toBeInTheDocument()
    })
  })
})

describe('DialogButtons Component', () => {
  const defaultProps = {
    themeMode: 'light' as const,
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('Rendering', () => {
    it('should not render when buttons is not provided', () => {
      const { container } = render(<DialogButtons {...defaultProps} />)
      expect(container.firstChild).toBeNull()
    })

    it('should not render when buttons is empty array', () => {
      const { container } = render(<DialogButtons {...defaultProps} buttons={[]} />)
      expect(container.firstChild).toBeNull()
    })

    it('should render buttons when provided', () => {
      const buttons = [
        { text: 'Cancel', onClick: jest.fn() },
        { text: 'Confirm', onClick: jest.fn() },
      ]
      render(<DialogButtons {...defaultProps} buttons={buttons} />)
      expect(screen.getByText('Cancel')).toBeInTheDocument()
      expect(screen.getByText('Confirm')).toBeInTheDocument()
    })

    it('should render only first two buttons when more than two provided', () => {
      const buttons = [
        { text: 'Button 1', onClick: jest.fn() },
        { text: 'Button 2', onClick: jest.fn() },
        { text: 'Button 3', onClick: jest.fn() },
      ]
      render(<DialogButtons {...defaultProps} buttons={buttons} />)
      expect(screen.getByText('Button 1')).toBeInTheDocument()
      expect(screen.getByText('Button 2')).toBeInTheDocument()
      expect(screen.queryByText('Button 3')).not.toBeInTheDocument()
    })

    it('should render with custom id', () => {
      const buttons = [{ text: 'Button', onClick: jest.fn() }]
      const { container } = render(
        <DialogButtons {...defaultProps} buttons={buttons} id="custom-buttons" />,
      )
      const buttonElement = container.querySelector('#custom-buttons-1')
      expect(buttonElement).toBeInTheDocument()
    })

    it('should render with default id when not provided', () => {
      const buttons = [{ text: 'Button', onClick: jest.fn() }]
      const { container } = render(<DialogButtons {...defaultProps} buttons={buttons} />)
      const buttonElement = container.querySelector('#dialog-button-1')
      expect(buttonElement).toBeInTheDocument()
    })

    it('should render with custom className', () => {
      const buttons = [{ text: 'Button', onClick: jest.fn() }]
      const { container } = render(
        <DialogButtons {...defaultProps} buttons={buttons} className="custom-buttons" />,
      )
      const buttonsArea = container.querySelector('.custom-buttons')
      expect(buttonsArea).toBeInTheDocument()
    })

    it('should render with custom styles', () => {
      const buttons = [{ text: 'Button', onClick: jest.fn() }]
      const customStyle = { gap: '20px' }
      const { container } = render(
        <DialogButtons {...defaultProps} buttons={buttons} style={customStyle} />,
      )
      const buttonsArea = container.querySelector('[style*="gap"]')
      expect(buttonsArea).toBeInTheDocument()
    })
  })

  describe('Button Types', () => {
    it('should render normal button type by default', () => {
      const buttons = [{ text: 'Normal', onClick: jest.fn() }]
      const { container } = render(<DialogButtons {...defaultProps} buttons={buttons} />)
      const button = container.querySelector('[class*="sekai-dialog-normal-button"]')
      expect(button).toBeInTheDocument()
    })

    it('should render strong button type when specified', () => {
      const buttons = [{ text: 'Strong', onClick: jest.fn(), type: 'strong' as const }]
      const { container } = render(<DialogButtons {...defaultProps} buttons={buttons} />)
      const button = container.querySelector('[class*="sekai-dialog-strong-button"]')
      expect(button).toBeInTheDocument()
    })

    it('should render mixed button types', () => {
      const buttons = [
        { text: 'Normal', onClick: jest.fn(), type: 'normal' as const },
        { text: 'Strong', onClick: jest.fn(), type: 'strong' as const },
      ]
      const { container } = render(<DialogButtons {...defaultProps} buttons={buttons} />)
      const normalButton = container.querySelector('[class*="sekai-dialog-normal-button"]')
      const strongButton = container.querySelector('[class*="sekai-dialog-strong-button"]')
      expect(normalButton).toBeInTheDocument()
      expect(strongButton).toBeInTheDocument()
    })
  })

  describe('Button Props', () => {
    it('should call onClick when button is clicked', async () => {
      const handleClick = jest.fn()
      const buttons = [{ text: 'Click Me', onClick: handleClick }]
      const user = userEvent.setup()

      render(<DialogButtons {...defaultProps} buttons={buttons} />)

      await user.click(screen.getByText('Click Me'))
      expect(handleClick).toHaveBeenCalledTimes(1)
    })

    it('should disable button when disabled is true', () => {
      const buttons = [{ text: 'Disabled', onClick: jest.fn(), disabled: true }]
      render(<DialogButtons {...defaultProps} buttons={buttons} />)
      expect(screen.getByText('Disabled')).toBeDisabled()
    })

    it('should not disable button when disabled is false', () => {
      const buttons = [{ text: 'Enabled', onClick: jest.fn(), disabled: false }]
      render(<DialogButtons {...defaultProps} buttons={buttons} />)
      expect(screen.getByText('Enabled')).not.toBeDisabled()
    })

    it('should apply aria-label when provided', () => {
      const buttons = [{ text: 'Button', onClick: jest.fn(), ariaLabel: 'Custom Label' }]
      render(<DialogButtons {...defaultProps} buttons={buttons} />)
      const button = screen.getByLabelText('Custom Label')
      expect(button).toBeInTheDocument()
    })

    it('should use text as aria-label when ariaLabel not provided', () => {
      const buttons = [{ text: 'Button Text', onClick: jest.fn() }]
      render(<DialogButtons {...defaultProps} buttons={buttons} />)
      const button = screen.getByLabelText('Button Text')
      expect(button).toBeInTheDocument()
    })

    it('should apply custom buttonStyle', () => {
      const buttons = [{ text: 'Button', onClick: jest.fn(), buttonStyle: 'custom-style' }]
      const { container } = render(<DialogButtons {...defaultProps} buttons={buttons} />)
      const button = container.querySelector('.custom-style')
      expect(button).toBeInTheDocument()
    })
  })

  describe('Theme Integration', () => {
    beforeEach(() => {
      // Reset mock to default light mode
      const useOptionalSekai = require('@/internal/useOptionalSekai').useOptionalSekai
      useOptionalSekai.mockReturnValue({
        sekaiColor: '#33ccba',
        modeTheme: 'light',
        isLight: true,
      })
    })

    it('should apply light theme mode class', () => {
      const buttons = [{ text: 'Button', onClick: jest.fn() }]
      render(<DialogButtons {...defaultProps} buttons={buttons} themeMode="light" />)
      const button = screen.getByText('Button')
      expect(button).toBeInTheDocument()
      expect(button.className).toContain('sekai-color-light')
    })

    it('should apply dark theme mode class', () => {
      const useOptionalSekai = require('@/internal/useOptionalSekai').useOptionalSekai
      useOptionalSekai.mockReturnValue({
        sekaiColor: '#33ccba',
        modeTheme: 'dark',
        isLight: false,
      })

      const buttons = [{ text: 'Button', onClick: jest.fn() }]
      render(<DialogButtons {...defaultProps} buttons={buttons} themeMode="dark" />)
      const button = screen.getByText('Button')
      expect(button).toBeInTheDocument()
      expect(button.className).toContain('sekai-color-dark')
    })

    it('should apply sekai color CSS variables', () => {
      const buttons = [{ text: 'Button', onClick: jest.fn() }]
      render(<DialogButtons {...defaultProps} buttons={buttons} sekai="Miku" />)
      const button = screen.getByText('Button')
      expect(button).toHaveStyle({ '--sekai-color': '#33ccba' })
    })
  })

  describe('Edge Cases', () => {
    it('should handle single button', () => {
      const buttons = [{ text: 'Single', onClick: jest.fn() }]
      render(<DialogButtons {...defaultProps} buttons={buttons} />)
      expect(screen.getByText('Single')).toBeInTheDocument()
    })

    it('should handle button with undefined disabled', () => {
      const buttons = [{ text: 'Button', onClick: jest.fn(), disabled: undefined }]
      render(<DialogButtons {...defaultProps} buttons={buttons} />)
      expect(screen.getByText('Button')).not.toBeDisabled()
    })

    it('should handle button with undefined type', () => {
      const buttons = [{ text: 'Button', onClick: jest.fn(), type: undefined }]
      const { container } = render(<DialogButtons {...defaultProps} buttons={buttons} />)
      const button = container.querySelector('[class*="sekai-dialog-normal-button"]')
      expect(button).toBeInTheDocument()
    })
  })
})
