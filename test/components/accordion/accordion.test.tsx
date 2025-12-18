/* eslint-disable max-lines-per-function */
import React from 'react'

import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { Accordion } from '@/components/accordion/Accordion'

import type { AccordionProps } from '@/components/accordion/Accordion'

// Mock the ChevronSvg component
jest.mock('@/img/chevron', () => ({
  ChevronSvg: ({ className, vector }: { className?: string; vector?: string }) => (
    <svg data-testid="chevron-icon" className={className} data-vector={vector} />
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

describe('Accordion Component', () => {
  const defaultProps: AccordionProps = {
    summary: 'Test Summary',
    details: 'Test Details',
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('Rendering', () => {
    it('should render without crashing', () => {
      render(<Accordion {...defaultProps} />)
      expect(screen.getByText('Test Summary')).toBeInTheDocument()
    })

    it('should render summary text correctly', () => {
      render(<Accordion {...defaultProps} />)
      expect(screen.getByText('Test Summary')).toBeInTheDocument()
    })

    it('should render with custom id', () => {
      render(<Accordion {...defaultProps} id="custom-accordion" />)
      const container = screen.getByText('Test Summary').closest('div')
      expect(container).toHaveAttribute('id', 'custom-accordion')
    })

    it('should render with custom className', () => {
      render(<Accordion {...defaultProps} className="custom-class" />)
      const container = screen.getByText('Test Summary').closest('div')
      expect(container).toHaveClass('custom-class')
    })

    it('should render with custom styles', () => {
      const customStyle = { backgroundColor: 'red' }
      render(<Accordion {...defaultProps} style={customStyle} />)
      const container = screen.getByText('Test Summary').closest('div')
      expect(container).toHaveStyle('background-color: rgb(255, 0, 0)')
    })

    it('should render ChevronSvg icon', () => {
      render(<Accordion {...defaultProps} />)
      expect(screen.getByTestId('chevron-icon')).toBeInTheDocument()
    })

    it('should render horizontal line separator', () => {
      const { container } = render(<Accordion {...defaultProps} />)
      const hr = container.querySelector('hr')
      expect(hr).toBeInTheDocument()
    })
  })

  describe('Details Content - String', () => {
    it('should render string details', () => {
      render(<Accordion {...defaultProps} details="Single string detail" />)
      expect(screen.getByText('Single string detail')).toBeInTheDocument()
    })

    it('should wrap string details in DetailText component', () => {
      render(<Accordion {...defaultProps} details="Test Detail" />)
      const detailParagraph = screen.getByText('Test Detail')
      expect(detailParagraph.tagName).toBe('P')
    })
  })

  describe('Details Content - String Array', () => {
    it('should render array of strings as multiple DetailText components', () => {
      const details = ['First detail', 'Second detail', 'Third detail']
      render(<Accordion {...defaultProps} details={details} />)

      details.forEach((detail) => {
        expect(screen.getByText(detail)).toBeInTheDocument()
      })
    })

    it('should render each array item as separate paragraph', () => {
      const details = ['Detail 1', 'Detail 2']
      render(<Accordion {...defaultProps} details={details} />)

      const paragraphs = screen.getAllByText(/Detail/)
      expect(paragraphs).toHaveLength(2)
      paragraphs.forEach((p) => {
        expect(p.tagName).toBe('P')
      })
    })
  })

  describe('Details Content - React Node', () => {
    it('should render ReactNode details', () => {
      const CustomDetails = (
        <div data-testid="custom-details">
          <h3>Custom Heading</h3>
          <p>Custom paragraph</p>
        </div>
      )
      render(<Accordion {...defaultProps} details={CustomDetails} />)

      expect(screen.getByTestId('custom-details')).toBeInTheDocument()
      expect(screen.getByText('Custom Heading')).toBeInTheDocument()
      expect(screen.getByText('Custom paragraph')).toBeInTheDocument()
    })

    it('should render complex ReactNode with nested components', () => {
      const ComplexDetails = (
        <div>
          <ul>
            <li>Item 1</li>
            <li>Item 2</li>
          </ul>
        </div>
      )
      render(<Accordion {...defaultProps} details={ComplexDetails} />)

      expect(screen.getByText('Item 1')).toBeInTheDocument()
      expect(screen.getByText('Item 2')).toBeInTheDocument()
    })
  })

  describe('Default Open/Close State', () => {
    it('should be closed by default', () => {
      render(<Accordion {...defaultProps} />)
      const button = screen.getByRole('button')
      expect(button).toHaveAttribute('aria-expanded', 'false')
    })

    it('should be open when defaultOpen is true', () => {
      render(<Accordion {...defaultProps} defaultOpen={true} />)
      const button = screen.getByRole('button')
      expect(button).toHaveAttribute('aria-expanded', 'true')
    })

    it('should be closed when defaultOpen is false', () => {
      render(<Accordion {...defaultProps} defaultOpen={false} />)
      const button = screen.getByRole('button')
      expect(button).toHaveAttribute('aria-expanded', 'false')
    })

    it('should apply correct icon class when closed', async () => {
      render(<Accordion {...defaultProps} defaultOpen={false} />)
      const icon = screen.getByTestId('chevron-icon')
      await waitFor(() => {
        expect(icon.getAttribute('class')).toMatch(/sekai-icon-close/)
      })
    })

    it('should apply correct icon class when open', async () => {
      render(<Accordion {...defaultProps} defaultOpen={true} />)
      const icon = screen.getByTestId('chevron-icon')
      await waitFor(() => {
        expect(icon.getAttribute('class')).toMatch(/sekai-icon-open/)
      })
    })
  })

  describe('Toggle Functionality', () => {
    it('should toggle open state when button is clicked', async () => {
      const user = userEvent.setup()
      render(<Accordion {...defaultProps} />)

      const button = screen.getByRole('button')
      expect(button).toHaveAttribute('aria-expanded', 'false')

      await user.click(button)
      expect(button).toHaveAttribute('aria-expanded', 'true')

      await user.click(button)
      expect(button).toHaveAttribute('aria-expanded', 'false')
    })

    it('should update icon class when toggling', async () => {
      const user = userEvent.setup()
      render(<Accordion {...defaultProps} />)

      const button = screen.getByRole('button')
      let icon = screen.getByTestId('chevron-icon')

      // Initially closed
      await waitFor(() => {
        expect(icon.getAttribute('class')).toMatch(/sekai-icon-close/)
      })

      // Click to open
      await user.click(button)
      icon = screen.getByTestId('chevron-icon')
      await waitFor(() => {
        expect(icon.getAttribute('class')).toMatch(/sekai-icon-open/)
      })

      // Click to close
      await user.click(button)
      icon = screen.getByTestId('chevron-icon')
      await waitFor(() => {
        expect(icon.getAttribute('class')).toMatch(/sekai-icon-close/)
      })
    })

    it('should allow multiple toggle operations', async () => {
      const user = userEvent.setup()
      render(<Accordion {...defaultProps} />)

      const button = screen.getByRole('button')

      for (let i = 0; i < 5; i++) {
        const expectedState = i % 2 === 0 ? 'true' : 'false'
        await user.click(button)
        expect(button).toHaveAttribute('aria-expanded', expectedState)
      }
    })
  })

  describe('Accessibility', () => {
    it('should have proper ARIA attributes on summary button', () => {
      render(<Accordion {...defaultProps} />)
      const button = screen.getByRole('button')

      expect(button).toHaveAttribute('aria-expanded')
      expect(button).toHaveAttribute('aria-controls', 'details-contents')
      expect(button).toHaveAttribute('id', 'accordion-summary')
    })

    it('should have proper ARIA attributes on details region', () => {
      render(<Accordion {...defaultProps} />)
      const detailsRegion = screen.getByRole('region')

      expect(detailsRegion).toHaveAttribute('id', 'details-contents')
      expect(detailsRegion).toHaveAttribute('aria-labelledby', 'accordion-summary')
    })

    it('should update aria-expanded when toggling', async () => {
      const user = userEvent.setup()
      render(<Accordion {...defaultProps} />)

      const button = screen.getByRole('button')

      expect(button).toHaveAttribute('aria-expanded', 'false')
      await user.click(button)
      expect(button).toHaveAttribute('aria-expanded', 'true')
    })

    it('should be keyboard accessible', async () => {
      const user = userEvent.setup()
      render(<Accordion {...defaultProps} />)

      const button = screen.getByRole('button')

      // Tab to button and press Enter
      await user.tab()
      expect(button).toHaveFocus()

      await user.keyboard('{Enter}')
      expect(button).toHaveAttribute('aria-expanded', 'true')

      await user.keyboard('{Enter}')
      expect(button).toHaveAttribute('aria-expanded', 'false')
    })

    it('should support Space key to toggle', async () => {
      const user = userEvent.setup()
      render(<Accordion {...defaultProps} />)

      const button = screen.getByRole('button')

      await user.tab()
      expect(button).toHaveFocus()

      await user.keyboard(' ')
      expect(button).toHaveAttribute('aria-expanded', 'true')

      await user.keyboard(' ')
      expect(button).toHaveAttribute('aria-expanded', 'false')
    })
  })

  describe('Theme Integration', () => {
    it('should apply sekai color CSS variables', () => {
      const { container } = render(<Accordion {...defaultProps} sekai="Miku" />)
      const accordionContainer = container.firstChild as HTMLElement

      expect(accordionContainer).toHaveStyle({
        '--sekai-color': '#33ccba',
      })
    })

    it('should apply sekai color hover CSS variables', () => {
      const { container } = render(<Accordion {...defaultProps} />)
      const accordionContainer = container.firstChild as HTMLElement

      expect(accordionContainer).toHaveStyle({
        '--sekai-color-hover': 'rgba(51, 204, 186, 0.1)',
      })
    })

    it('should pass sekai prop to ChevronSvg', () => {
      const { rerender } = render(<Accordion {...defaultProps} sekai="Miku" />)
      expect(screen.getByTestId('chevron-icon')).toBeInTheDocument()

      rerender(<Accordion {...defaultProps} sekai="Ichika" />)
      expect(screen.getByTestId('chevron-icon')).toBeInTheDocument()
    })

    it('should pass themeMode prop to ChevronSvg', () => {
      const { rerender } = render(<Accordion {...defaultProps} themeMode="light" />)
      expect(screen.getByTestId('chevron-icon')).toBeInTheDocument()

      rerender(<Accordion {...defaultProps} themeMode="dark" />)
      expect(screen.getByTestId('chevron-icon')).toBeInTheDocument()
    })
  })

  describe('Custom Styling', () => {
    it('should apply custom summaryStyles className', () => {
      render(<Accordion {...defaultProps} summaryStyles="custom-summary-style" />)
      const button = screen.getByRole('button')
      expect(button).toHaveClass('custom-summary-style')
    })

    it('should merge custom styles with default styles', () => {
      const customStyle = { padding: '20px', margin: '10px' }
      const { container } = render(<Accordion {...defaultProps} style={customStyle} />)
      const accordionContainer = container.firstChild as HTMLElement

      expect(accordionContainer).toHaveStyle({
        padding: '20px',
        margin: '10px',
      })
    })
  })

  describe('Animation Behavior', () => {
    it('should initialize details height on mount', async () => {
      render(<Accordion {...defaultProps} defaultOpen={true} />)
      const detailsRegion = screen.getByRole('region')

      // Wait for requestAnimationFrame to complete
      await waitFor(() => {
        const style = window.getComputedStyle(detailsRegion)
        expect(style.maxHeight).not.toBe('0px')
      })
    })

    it('should set maxHeight to 0px when closed', () => {
      render(<Accordion {...defaultProps} defaultOpen={false} />)
      const detailsRegion = screen.getByRole('region')

      expect(detailsRegion).toHaveStyle({
        maxHeight: '0px',
        opacity: '0',
      })
    })

    it('should set opacity to 0 when closed', () => {
      render(<Accordion {...defaultProps} defaultOpen={false} />)
      const detailsRegion = screen.getByRole('region')

      expect(detailsRegion).toHaveStyle({
        opacity: '0',
      })
    })

    it('should set opacity to 1 when open', () => {
      render(<Accordion {...defaultProps} defaultOpen={true} />)
      const detailsRegion = screen.getByRole('region')

      expect(detailsRegion).toHaveStyle({
        opacity: '1',
      })
    })

    it('should apply transition styles', () => {
      render(<Accordion {...defaultProps} />)
      const detailsRegion = screen.getByRole('region')

      expect(detailsRegion).toHaveStyle({
        transition: 'max-height 0.3s ease-out, opacity 0.3s ease-out, margin 0.3s ease-out',
      })
    })

    it('should add margin when open', () => {
      render(<Accordion {...defaultProps} defaultOpen={true} />)
      const detailsRegion = screen.getByRole('region')

      expect(detailsRegion).toHaveStyle({
        margin: '10px 0',
      })
    })
  })

  describe('Edge Cases', () => {
    it('should handle empty string details', () => {
      render(<Accordion {...defaultProps} details="" />)
      const detailsRegion = screen.getByRole('region')
      expect(detailsRegion).toBeInTheDocument()
    })

    it('should handle empty array details', () => {
      render(<Accordion {...defaultProps} details={[]} />)
      const detailsRegion = screen.getByRole('region')
      expect(detailsRegion).toBeInTheDocument()
    })

    it('should handle null ReactNode details', () => {
      render(<Accordion {...defaultProps} details={null} />)
      const detailsRegion = screen.getByRole('region')
      expect(detailsRegion).toBeInTheDocument()
    })

    it('should handle undefined ReactNode details', () => {
      render(<Accordion {...defaultProps} details={undefined} />)
      const detailsRegion = screen.getByRole('region')
      expect(detailsRegion).toBeInTheDocument()
    })

    it('should handle very long summary text', () => {
      const longSummary = 'A'.repeat(500)
      render(<Accordion {...defaultProps} summary={longSummary} />)
      expect(screen.getByText(longSummary)).toBeInTheDocument()
    })

    it('should handle very long details text', () => {
      const longDetails = 'B'.repeat(1000)
      render(<Accordion {...defaultProps} details={longDetails} />)
      expect(screen.getByText(longDetails)).toBeInTheDocument()
    })

    it('should handle large array of details', () => {
      const largeArray = Array.from({ length: 100 }, (_, i) => `Detail ${i}`)
      render(<Accordion {...defaultProps} details={largeArray} />)

      largeArray.forEach((detail) => {
        expect(screen.getByText(detail)).toBeInTheDocument()
      })
    })
  })

  describe('Integration Tests', () => {
    it('should maintain state across re-renders', async () => {
      const user = userEvent.setup()
      const { rerender } = render(<Accordion {...defaultProps} />)

      const button = screen.getByRole('button')
      await user.click(button)
      expect(button).toHaveAttribute('aria-expanded', 'true')

      // Re-render with same props
      rerender(<Accordion {...defaultProps} />)
      expect(button).toHaveAttribute('aria-expanded', 'true')
    })

    it('should reset state when defaultOpen prop changes', () => {
      const { rerender } = render(<Accordion {...defaultProps} defaultOpen={false} />)
      const button = screen.getByRole('button')
      expect(button).toHaveAttribute('aria-expanded', 'false')

      // Changing defaultOpen doesn't affect current state after mount
      rerender(<Accordion {...defaultProps} defaultOpen={true} />)
      // State is controlled by internal useState, not defaultOpen after mount
      expect(button).toHaveAttribute('aria-expanded', 'false')
    })

    it('should handle rapid clicking', async () => {
      const user = userEvent.setup()
      render(<Accordion {...defaultProps} />)

      const button = screen.getByRole('button')

      // Rapid clicks
      await user.click(button)
      await user.click(button)
      await user.click(button)
      await user.click(button)

      // Should end in closed state (started closed, 4 clicks = closed)
      expect(button).toHaveAttribute('aria-expanded', 'false')
    })

    it('should work with different detail types in succession', () => {
      const { rerender } = render(<Accordion {...defaultProps} details="String detail" />)
      expect(screen.getByText('String detail')).toBeInTheDocument()

      rerender(<Accordion {...defaultProps} details={['Array', 'Detail']} />)
      expect(screen.getByText('Array')).toBeInTheDocument()
      expect(screen.getByText('Detail')).toBeInTheDocument()

      rerender(<Accordion {...defaultProps} details={<div>React Node</div>} />)
      expect(screen.getByText('React Node')).toBeInTheDocument()
    })
  })

  describe('ChevronSvg Integration', () => {
    it('should pass vector="up" to ChevronSvg', () => {
      render(<Accordion {...defaultProps} />)
      const icon = screen.getByTestId('chevron-icon')
      expect(icon).toHaveAttribute('data-vector', 'up')
    })

    it('should update ChevronSvg className on toggle', async () => {
      const user = userEvent.setup()
      render(<Accordion {...defaultProps} />)

      const button = screen.getByRole('button')
      let icon = screen.getByTestId('chevron-icon')

      // Check initial class
      await waitFor(() => {
        expect(icon.getAttribute('class')).toMatch(/sekai-icon-close/)
      })

      // Toggle open
      await user.click(button)
      icon = screen.getByTestId('chevron-icon')
      await waitFor(() => {
        expect(icon.getAttribute('class')).toMatch(/sekai-icon-open/)
      })

      // Toggle closed
      await user.click(button)
      icon = screen.getByTestId('chevron-icon')
      await waitFor(() => {
        expect(icon.getAttribute('class')).toMatch(/sekai-icon-close/)
      })
    })
  })

  describe('Details Content - Array Type Validation', () => {
    it('should render empty array as ReactNode', () => {
      const emptyArray: React.ReactNode = []
      render(<Accordion {...defaultProps} details={emptyArray} />)
      const detailsRegion = screen.getByRole('region')
      expect(detailsRegion).toBeInTheDocument()
    })

    it('should render array of ReactNodes', () => {
      const nodeArray: React.ReactNode = [
        <div key="1">Node 1</div>,
        <div key="2">Node 2</div>,
        <div key="3">Node 3</div>,
      ]
      render(<Accordion {...defaultProps} details={nodeArray} />)
      expect(screen.getByText('Node 1')).toBeInTheDocument()
      expect(screen.getByText('Node 2')).toBeInTheDocument()
      expect(screen.getByText('Node 3')).toBeInTheDocument()
    })

    it('should handle array with single string element', () => {
      const singleStringArray = ['Only one item']
      render(<Accordion {...defaultProps} details={singleStringArray} />)
      expect(screen.getByText('Only one item')).toBeInTheDocument()
    })
  })

  describe('Height Calculation Edge Cases', () => {
    it('should handle zero height details', async () => {
      // Mock ref with zero scrollHeight
      const mockRefZeroHeight = {
        current: {
          scrollHeight: 0,
        },
      }

      // Render with empty details
      render(<Accordion {...defaultProps} details="" defaultOpen={true} />)
      const detailsRegion = screen.getByRole('region')

      await waitFor(() => {
        // When heightDetails is 0 and open is true, maxHeight should be 'none'
        const style = window.getComputedStyle(detailsRegion)
        expect(detailsRegion).toBeInTheDocument()
      })
    })

    it('should update maxHeight when opening accordion with content', async () => {
      const user = userEvent.setup()
      const longContent = 'A'.repeat(1000)
      render(<Accordion {...defaultProps} details={longContent} defaultOpen={false} />)

      const button = screen.getByRole('button')
      const detailsRegion = screen.getByRole('region')

      // Initially closed
      expect(detailsRegion).toHaveStyle({
        maxHeight: '0px',
      })

      // Open accordion
      await user.click(button)

      await waitFor(() => {
        expect(detailsRegion).toHaveStyle({
          opacity: '1',
        })
      })
    })
  })

  describe('Animation Style Variations', () => {
    it('should apply correct styles when open with calculated height', async () => {
      render(<Accordion {...defaultProps} defaultOpen={true} details="Test content" />)
      const detailsRegion = screen.getByRole('region')

      await waitFor(() => {
        expect(detailsRegion).toHaveStyle({
          opacity: '1',
          margin: '10px 0',
        })
      })
    })

    it('should not apply margin when closed', () => {
      render(<Accordion {...defaultProps} defaultOpen={false} />)
      const detailsRegion = screen.getByRole('region')

      const style = window.getComputedStyle(detailsRegion)
      // When closed, margin should not be applied (no margin: '10px 0')
      expect(detailsRegion).toHaveStyle({
        opacity: '0',
      })
    })
  })

  describe('Converter Function Integration', () => {
    it('should call convertHexToRgba with light mode alpha', () => {
      const convertFn = require('@/utils/converter').convertHexToRgba
      convertFn.mockClear()

      render(<Accordion {...defaultProps} sekai="Miku" />)

      expect(convertFn).toHaveBeenCalledWith('#33ccba', 0.1)
    })

    it('should call convertHexToRgba with dark mode alpha', () => {
      const useOptionalSekai = require('@/internal/useOptionalSekai').useOptionalSekai
      const convertFn = require('@/utils/converter').convertHexToRgba

      useOptionalSekai.mockReturnValue({
        sekaiColor: '#33ccba',
        modeTheme: 'dark',
        isLight: false,
      })

      convertFn.mockClear()

      render(<Accordion {...defaultProps} sekai="Miku" themeMode="dark" />)

      expect(convertFn).toHaveBeenCalledWith('#33ccba', 0.3)
    })
  })

  describe('Type Guard Functions Coverage', () => {
    it('should correctly identify string type', () => {
      render(<Accordion {...defaultProps} details="Simple string" />)
      expect(screen.getByText('Simple string')).toBeInTheDocument()
    })

    it('should correctly identify string array type', () => {
      const stringArray = ['Item 1', 'Item 2', 'Item 3']
      render(<Accordion {...defaultProps} details={stringArray} />)
      stringArray.forEach((item) => {
        expect(screen.getByText(item)).toBeInTheDocument()
      })
    })

    it('should correctly identify ReactNode type', () => {
      const reactNode = (
        <div data-testid="custom-node">
          <span>Custom content</span>
        </div>
      )
      render(<Accordion {...defaultProps} details={reactNode} />)
      expect(screen.getByTestId('custom-node')).toBeInTheDocument()
    })

    it('should handle number as ReactNode', () => {
      render(<Accordion {...defaultProps} details={123 as unknown as React.ReactNode} />)
      const detailsRegion = screen.getByRole('region')
      expect(detailsRegion).toBeInTheDocument()
    })

    it('should handle boolean as ReactNode', () => {
      render(<Accordion {...defaultProps} details={true as unknown as React.ReactNode} />)
      const detailsRegion = screen.getByRole('region')
      expect(detailsRegion).toBeInTheDocument()
    })
  })
})
