/**
 * Portal Component Test Template
 *
 * Use this template for components that use React Portals:
 * - Dialog
 * - Drawer
 * - Dropdown
 * - Tooltip
 * - Toast
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

import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { createPortal } from 'react-dom'

import { ComponentName } from '@/components/component-folder/ComponentName'

import type { ComponentNameProps } from '@/components/component-folder/ComponentName'

// === MOCKS ===

// Mock react-dom createPortal
jest.mock('react-dom', () => {
  const actual = jest.requireActual('react-dom')
  return {
    ...actual,
    createPortal: jest.fn((element, container) => element),
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
  convertHexToRgbaMixWithBlackOrWhite: jest.fn(() => 'rgba(51, 204, 186, 0.8)'),
}))

// === TEST SUITE ===

describe('ComponentName Component', () => {
  // Default props - update with your component's required props
  const defaultProps: ComponentNameProps = {
    open: true,
    children: <div data-testid="component-content">Test Content</div>,
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
    it('should render without crashing when open', () => {
      render(<ComponentName {...defaultProps} />)
      expect(screen.getByTestId('component-content')).toBeInTheDocument()
    })

    it('should render children content', () => {
      render(<ComponentName {...defaultProps} />)
      expect(screen.getByTestId('component-content')).toBeInTheDocument()
      expect(screen.getByText('Test Content')).toBeInTheDocument()
    })

    it('should render with custom id', () => {
      const { container } = render(<ComponentName {...defaultProps} id="custom-id" />)
      expect(container.querySelector('#custom-id')).toBeInTheDocument()
    })

    it('should render with custom className', () => {
      const { container } = render(<ComponentName {...defaultProps} className="custom-class" />)
      expect(container.querySelector('.custom-class')).toBeInTheDocument()
    })

    it('should render with custom styles', () => {
      const customStyle = { backgroundColor: 'red', zIndex: 9999 }
      const { container } = render(<ComponentName {...defaultProps} style={customStyle} />)
      const element = container.querySelector('[style*="background-color"]')
      expect(element).toBeInTheDocument()
    })

    it('should render complex children', () => {
      const ComplexChildren = (
        <div>
          <h1>Title</h1>
          <p>Description</p>
          <button>Action</button>
        </div>
      )
      render(<ComponentName {...defaultProps} children={ComplexChildren} />)
      expect(screen.getByText('Title')).toBeInTheDocument()
      expect(screen.getByText('Description')).toBeInTheDocument()
      expect(screen.getByText('Action')).toBeInTheDocument()
    })
  })

  // ============================================
  // OPEN/CLOSE STATE TESTS
  // ============================================

  describe('Open/Close State', () => {
    it('should render when open is true', () => {
      render(<ComponentName {...defaultProps} open={true} />)
      expect(screen.getByTestId('component-content')).toBeInTheDocument()
    })

    it('should not render content when open is false', () => {
      render(<ComponentName {...defaultProps} open={false} />)
      expect(screen.queryByTestId('component-content')).not.toBeInTheDocument()
    })

    it('should toggle visibility when open prop changes', () => {
      const { rerender } = render(<ComponentName {...defaultProps} open={true} />)
      expect(screen.getByTestId('component-content')).toBeInTheDocument()

      rerender(<ComponentName {...defaultProps} open={false} />)
      expect(screen.queryByTestId('component-content')).not.toBeInTheDocument()

      rerender(<ComponentName {...defaultProps} open={true} />)
      expect(screen.getByTestId('component-content')).toBeInTheDocument()
    })
  })

  // ============================================
  // PORTAL INTEGRATION TESTS
  // ============================================

  describe('Portal Integration', () => {
    beforeEach(() => {
      const usePortalContainer = require('@/internal/usePortalContainer').usePortalContainer
      usePortalContainer.mockReturnValue(document.body)
    })

    it('should use createPortal to render content', () => {
      const portalMock = createPortal as jest.Mock
      portalMock.mockClear()
      render(<ComponentName {...defaultProps} />)
      expect(portalMock).toHaveBeenCalled()
    })

    it('should render in portal container', () => {
      const mockContainer = document.createElement('div')
      const usePortalContainer = require('@/internal/usePortalContainer').usePortalContainer
      usePortalContainer.mockReturnValue(mockContainer)

      const portalMock = createPortal as jest.Mock
      portalMock.mockClear()

      render(<ComponentName {...defaultProps} />)
      expect(portalMock).toHaveBeenCalledWith(expect.anything(), mockContainer)
    })

    it('should not render when portal container is null', () => {
      const usePortalContainer = require('@/internal/usePortalContainer').usePortalContainer
      usePortalContainer.mockReturnValue(null)

      const { container } = render(<ComponentName {...defaultProps} />)
      expect(container.firstChild).toBeNull()
    })

    it('should use custom containerComponent if provided', () => {
      const customContainer = document.createElement('div')
      const usePortalContainer = require('@/internal/usePortalContainer').usePortalContainer
      usePortalContainer.mockReturnValue(customContainer)

      const portalMock = createPortal as jest.Mock
      portalMock.mockClear()

      render(<ComponentName {...defaultProps} containerComponent={customContainer} />)
      expect(portalMock).toHaveBeenCalled()
    })
  })

  // ============================================
  // CLOSE HANDLER TESTS
  // ============================================

  describe('Close Handler', () => {
    it('should call onClose when backdrop is clicked', async () => {
      const handleClose = jest.fn()
      const user = userEvent.setup()

      const { container } = render(<ComponentName {...defaultProps} onClose={handleClose} />)

      // Find and click the backdrop/overlay element
      // Update selector based on your component structure
      const backdrop = container.querySelector('[class*="overlay"]')
      if (backdrop) {
        await user.click(backdrop)
        expect(handleClose).toHaveBeenCalled()
      }
    })

    it('should call onClose when Escape key is pressed', async () => {
      const handleClose = jest.fn()
      const user = userEvent.setup()

      render(<ComponentName {...defaultProps} onClose={handleClose} />)

      await user.keyboard('{Escape}')
      expect(handleClose).toHaveBeenCalled()
    })

    it('should not close when clicking inside content', async () => {
      const handleClose = jest.fn()
      const user = userEvent.setup()

      render(<ComponentName {...defaultProps} onClose={handleClose} />)

      await user.click(screen.getByTestId('component-content'))
      expect(handleClose).not.toHaveBeenCalled()
    })
  })

  // ============================================
  // THEME INTEGRATION TESTS
  // ============================================

  describe('Theme Integration', () => {
    it('should apply sekai color CSS variables', () => {
      const { container } = render(<ComponentName {...defaultProps} sekai="Miku" />)
      const element = container.querySelector('[style*="--sekai-color"]')
      expect(element).toBeTruthy()
    })

    it('should apply light theme mode class', () => {
      const { container } = render(<ComponentName {...defaultProps} themeMode="light" />)
      const themeElement = container.querySelector('[class*="light"]')
      expect(themeElement).toBeTruthy()
    })

    it('should apply dark theme mode class', () => {
      const useOptionalSekai = require('@/internal/useOptionalSekai').useOptionalSekai
      useOptionalSekai.mockReturnValue({
        sekaiColor: '#33ccba',
        modeTheme: 'dark',
        isLight: false,
      })

      const { container } = render(<ComponentName {...defaultProps} themeMode="dark" />)
      const themeElement = container.querySelector('[class*="dark"]')
      expect(themeElement).toBeTruthy()
    })
  })

  // ============================================
  // ACCESSIBILITY TESTS
  // ============================================

  describe('Accessibility', () => {
    // For Dialog components
    it('should have role="dialog"', () => {
      render(<ComponentName {...defaultProps} />)
      expect(screen.getByRole('dialog')).toBeInTheDocument()
    })

    it('should have aria-modal="true"', () => {
      render(<ComponentName {...defaultProps} />)
      const dialog = screen.getByRole('dialog')
      expect(dialog).toHaveAttribute('aria-modal', 'true')
    })

    it('should have aria-labelledby when title is provided', () => {
      render(<ComponentName {...defaultProps} title="Dialog Title" />)
      const dialog = screen.getByRole('dialog')
      expect(dialog).toHaveAttribute('aria-labelledby')
    })

    it('should trap focus within component', async () => {
      const user = userEvent.setup()
      render(
        <ComponentName {...defaultProps}>
          <button>First</button>
          <button>Second</button>
        </ComponentName>,
      )

      await user.tab()
      expect(screen.getByText('First')).toHaveFocus()

      await user.tab()
      expect(screen.getByText('Second')).toHaveFocus()
    })

    it('should return focus to trigger on close', async () => {
      // This depends on implementation
    })

    it('should support screen readers', () => {
      render(
        <ComponentName {...defaultProps}>
          <div role="dialog" aria-label="Test Dialog">
            Dialog Content
          </div>
        </ComponentName>,
      )
      expect(screen.getByLabelText('Test Dialog')).toBeInTheDocument()
    })
  })

  // ============================================
  // Z-INDEX TESTS
  // ============================================

  describe('Z-Index Management', () => {
    it('should apply default z-index from global styles', () => {
      const { container } = render(<ComponentName {...defaultProps} />)
      // Check that z-index is applied via CSS class
      const element = container.querySelector('[class*="overlay"]')
      expect(element).toBeTruthy()
    })

    it('should allow custom z-index via style prop', () => {
      const { container } = render(<ComponentName {...defaultProps} style={{ zIndex: 9999 }} />)
      const element = container.querySelector('[style*="z-index"]')
      expect(element).toBeTruthy()
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

    it('should handle empty fragment as children', () => {
      render(<ComponentName {...defaultProps} children={<></>} />)
      expect(screen.queryByTestId('component-content')).not.toBeInTheDocument()
    })

    it('should handle multiple children', () => {
      const { container } = render(
        <ComponentName {...defaultProps}>
          <div>Child 1</div>
          <div>Child 2</div>
          <div>Child 3</div>
        </ComponentName>,
      )
      expect(container.textContent).toContain('Child 1')
      expect(container.textContent).toContain('Child 2')
      expect(container.textContent).toContain('Child 3')
    })

    it('should handle deeply nested children', () => {
      const { container } = render(
        <ComponentName {...defaultProps}>
          <div>
            <div>
              <div>
                <span>Deeply nested content</span>
              </div>
            </div>
          </div>
        </ComponentName>,
      )
      expect(container.textContent).toContain('Deeply nested content')
    })
  })

  // ============================================
  // INTEGRATION TESTS
  // ============================================

  describe('Integration Tests', () => {
    it('should re-render when open prop changes', () => {
      const { rerender, container } = render(<ComponentName {...defaultProps} open={true} />)
      expect(container.textContent).toContain('Test Content')

      rerender(<ComponentName {...defaultProps} open={false} />)
      expect(screen.queryByTestId('component-content')).not.toBeInTheDocument()

      rerender(<ComponentName {...defaultProps} open={true} />)
      expect(container.textContent).toContain('Test Content')
    })

    it('should update children on re-render', () => {
      const { rerender, container } = render(
        <ComponentName {...defaultProps} children={<div>Original Content</div>} />,
      )
      expect(container.textContent).toContain('Original Content')

      rerender(<ComponentName {...defaultProps} children={<div>Updated Content</div>} />)
      expect(container.textContent).toContain('Updated Content')
      expect(container.textContent).not.toContain('Original Content')
    })

    it('should update theme on re-render', () => {
      const { rerender, container } = render(<ComponentName {...defaultProps} sekai="Miku" />)

      const useOptionalSekai = require('@/internal/useOptionalSekai').useOptionalSekai
      useOptionalSekai.mockReturnValue({
        sekaiColor: '#ff6699',
        modeTheme: 'dark',
        isLight: false,
      })

      rerender(<ComponentName {...defaultProps} sekai="Leoneed" />)
      // Assert theme updated
    })

    it('should maintain portal rendering across re-renders', () => {
      const portalMock = createPortal as jest.Mock
      portalMock.mockClear()

      const { rerender } = render(<ComponentName {...defaultProps} />)
      const initialCallCount = portalMock.mock.calls.length

      rerender(<ComponentName {...defaultProps} />)
      expect(portalMock.mock.calls.length).toBeGreaterThanOrEqual(initialCallCount)
    })
  })

  // ============================================
  // CSS CLASS TESTS
  // ============================================

  describe('CSS Classes', () => {
    it('should apply overlay class', () => {
      const { container } = render(<ComponentName {...defaultProps} />)
      expect(container.querySelector('[class*="overlay"]')).toBeTruthy()
    })

    it('should merge custom className with default classes', () => {
      const { container } = render(<ComponentName {...defaultProps} className="custom-class" />)
      const element = container.querySelector('.custom-class')
      expect(element).toBeTruthy()
    })
  })

  // ============================================
  // CSS VARIABLE TESTS
  // ============================================

  describe('CSS Variables', () => {
    it('should set --sekai-color-bg CSS variable when sekai is provided', () => {
      const { container } = render(<ComponentName {...defaultProps} sekai="Miku" />)
      const element = container.querySelector('[style*="--sekai-color"]')
      expect(element).toBeTruthy()
    })
  })
})
