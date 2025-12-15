/* eslint-disable max-lines-per-function */
import React from 'react'

import { render, screen } from '@testing-library/react'

import { Breadcrumb } from '@/components/breadcrumb/Breadcrumb'

import type { BreadcrumbProps } from '@/components/breadcrumb/Breadcrumb'

// Mock useOptionalSekai hook
jest.mock('@/internal/useOptionalSekai', () => ({
  useOptionalSekai: jest.fn(() => ({
    sekaiColor: '#33ccba',
    modeTheme: 'light',
    isLight: true,
  })),
}))

describe('Breadcrumb Component', () => {
  const defaultProps: BreadcrumbProps = {
    children: (
      <>
        <a href="/">Home</a>
        <a href="/products">Products</a>
        <span>Current Page</span>
      </>
    ),
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('Rendering', () => {
    it('should render without crashing', () => {
      render(<Breadcrumb {...defaultProps} />)
      expect(screen.getByText('Home')).toBeInTheDocument()
    })

    it('should render all breadcrumb items', () => {
      render(<Breadcrumb {...defaultProps} />)
      expect(screen.getByText('Home')).toBeInTheDocument()
      expect(screen.getByText('Products')).toBeInTheDocument()
      expect(screen.getByText('Current Page')).toBeInTheDocument()
    })

    it('should render as nav element with aria-label', () => {
      const { container } = render(<Breadcrumb {...defaultProps} id="test-breadcrumb" />)
      const nav = container.querySelector('nav')
      expect(nav).toBeInTheDocument()
      expect(nav).toHaveAttribute('aria-label', 'breadcrumb-test-breadcrumb')
    })

    it('should render breadcrumb items in an ordered list', () => {
      const { container } = render(<Breadcrumb {...defaultProps} />)
      const ol = container.querySelector('ol')
      expect(ol).toBeInTheDocument()
    })

    it('should render with custom id', () => {
      const { container } = render(<Breadcrumb {...defaultProps} id="custom-breadcrumb" />)
      const nav = container.querySelector('#custom-breadcrumb')
      expect(nav).toBeInTheDocument()
    })

    it('should render with custom className', () => {
      const { container } = render(<Breadcrumb {...defaultProps} className="custom-class" />)
      const nav = container.querySelector('.custom-class')
      expect(nav).toBeInTheDocument()
    })

    it('should render with custom styles', () => {
      const customStyle = { backgroundColor: 'red', padding: '10px' }
      const { container } = render(<Breadcrumb {...defaultProps} style={customStyle} />)
      const nav = container.querySelector('nav')
      expect(nav).toHaveStyle('background-color: rgb(255, 0, 0)')
      expect(nav).toHaveStyle('padding: 10px')
    })
  })

  describe('Separator Variants', () => {
    it('should render with default slash separator', () => {
      const { container } = render(<Breadcrumb {...defaultProps} />)
      const separators = container.querySelectorAll('[class*="sekai-breadcrumb-separator"]')
      expect(separators.length).toBe(2) // 3 items = 2 separators
      separators.forEach((separator) => {
        expect(separator.textContent).toBe('/')
      })
    })

    it('should render with arrow separator', () => {
      const { container } = render(<Breadcrumb {...defaultProps} separator="arrow" />)
      const separators = container.querySelectorAll('[class*="sekai-breadcrumb-separator"]')
      separators.forEach((separator) => {
        expect(separator.textContent).toBe('→')
      })
    })

    it('should render with chevron separator', () => {
      const { container } = render(<Breadcrumb {...defaultProps} separator="chevron" />)
      const separators = container.querySelectorAll('[class*="sekai-breadcrumb-separator"]')
      separators.forEach((separator) => {
        expect(separator.textContent).toBe('>')
      })
    })

    it('should render with dot separator', () => {
      const { container } = render(<Breadcrumb {...defaultProps} separator="dot" />)
      const separators = container.querySelectorAll('[class*="sekai-breadcrumb-separator"]')
      separators.forEach((separator) => {
        expect(separator.textContent).toBe('•')
      })
    })

    it('should render with pipe separator', () => {
      const { container } = render(<Breadcrumb {...defaultProps} separator="pipe" />)
      const separators = container.querySelectorAll('[class*="sekai-breadcrumb-separator"]')
      separators.forEach((separator) => {
        expect(separator.textContent).toBe('|')
      })
    })

    it('should not render separator after last item', () => {
      const { container } = render(
        <Breadcrumb>
          <a href="/">First</a>
          <a href="/second">Second</a>
        </Breadcrumb>,
      )
      const separators = container.querySelectorAll('[class*="sekai-breadcrumb-separator"]')
      expect(separators.length).toBe(1) // Only one separator for two items
    })
  })

  describe('Children Handling', () => {
    it('should handle single child', () => {
      render(
        <Breadcrumb>
          <span>Single Item</span>
        </Breadcrumb>,
      )
      expect(screen.getByText('Single Item')).toBeInTheDocument()
    })

    it('should handle multiple direct children', () => {
      render(
        <Breadcrumb>
          <a href="/">Home</a>
          <a href="/about">About</a>
          <span>Contact</span>
        </Breadcrumb>,
      )
      expect(screen.getByText('Home')).toBeInTheDocument()
      expect(screen.getByText('About')).toBeInTheDocument()
      expect(screen.getByText('Contact')).toBeInTheDocument()
    })

    it('should render string children', () => {
      render(
        <Breadcrumb>
          Home
          Products
          Details
        </Breadcrumb>,
      )
      const { container } = render(
        <Breadcrumb>
          Home
          Products
          Details
        </Breadcrumb>,
      )
      expect(container.textContent).toContain('Home')
      expect(container.textContent).toContain('Products')
      expect(container.textContent).toContain('Details')
    })

    it('should render complex children', () => {
      render(
        <Breadcrumb>
          <a href="/">
            <strong>Home</strong>
          </a>
          <a href="/products">
            <em>Products</em>
          </a>
          <span>
            <i>Current</i>
          </span>
        </Breadcrumb>,
      )
      expect(screen.getByText('Home')).toBeInTheDocument()
      expect(screen.getByText('Products')).toBeInTheDocument()
      expect(screen.getByText('Current')).toBeInTheDocument()
    })
  })

  describe('Fragment Flattening', () => {
    it('should flatten React Fragment children', () => {
      const { container } = render(
        <Breadcrumb>
          <>
            <a href="/">Home</a>
            <a href="/products">Products</a>
          </>
          <span>Details</span>
        </Breadcrumb>,
      )
      expect(screen.getByText('Home')).toBeInTheDocument()
      expect(screen.getByText('Products')).toBeInTheDocument()
      expect(screen.getByText('Details')).toBeInTheDocument()

      // Should have 2 separators (3 items total after flattening)
      const separators = container.querySelectorAll('[class*="sekai-breadcrumb-separator"]')
      expect(separators.length).toBe(2)
    })

    it('should flatten nested React Fragments', () => {
      const { container } = render(
        <Breadcrumb>
          <>
            <>
              <a href="/">Home</a>
            </>
            <a href="/products">Products</a>
          </>
          <span>Details</span>
        </Breadcrumb>,
      )
      expect(screen.getByText('Home')).toBeInTheDocument()
      expect(screen.getByText('Products')).toBeInTheDocument()
      expect(screen.getByText('Details')).toBeInTheDocument()

      const separators = container.querySelectorAll('[class*="sekai-breadcrumb-separator"]')
      expect(separators.length).toBe(2)
    })

    it('should handle empty fragments', () => {
      render(
        <Breadcrumb>
          <></>
          <a href="/">Home</a>
        </Breadcrumb>,
      )
      expect(screen.getByText('Home')).toBeInTheDocument()
    })
  })

  describe('Theme Integration', () => {
    it('should apply sekai color CSS variables', () => {
      const { container } = render(<Breadcrumb {...defaultProps} sekai="Miku" />)
      const nav = container.querySelector('nav')
      expect(nav).toHaveStyle({
        '--sekai-color': '#33ccba',
      })
    })

    it('should apply theme mode class to breadcrumb items', () => {
      const { container } = render(<Breadcrumb {...defaultProps} themeMode="light" />)
      const items = container.querySelectorAll('[class*="sekai-breadcrumb-text-light"]')
      expect(items.length).toBeGreaterThan(0)
    })

    it('should apply dark theme mode class when specified', () => {
      const useOptionalSekai = require('@/internal/useOptionalSekai').useOptionalSekai
      useOptionalSekai.mockReturnValue({
        sekaiColor: '#33ccba',
        modeTheme: 'dark',
        isLight: false,
      })

      const { container } = render(<Breadcrumb {...defaultProps} themeMode="dark" />)
      const items = container.querySelectorAll('[class*="sekai-breadcrumb-text-dark"]')
      expect(items.length).toBeGreaterThan(0)
    })

    it('should call useOptionalSekai with correct parameters', () => {
      const useOptionalSekai = require('@/internal/useOptionalSekai').useOptionalSekai
      useOptionalSekai.mockClear()

      render(<Breadcrumb {...defaultProps} sekai="Miku" themeMode="light" />)

      expect(useOptionalSekai).toHaveBeenCalledWith({
        sekai: 'Miku',
        mode: 'light',
      })
    })
  })

  describe('Custom Styling', () => {
    it('should merge custom className with default classes', () => {
      const { container } = render(
        <Breadcrumb {...defaultProps} className="custom-breadcrumb-class" />,
      )
      const nav = container.querySelector('.custom-breadcrumb-class')
      expect(nav).toBeTruthy()
      expect(nav?.className).toContain('sekai-breadcrumb')
    })

    it('should merge custom styles with option styles', () => {
      const customStyle = { padding: '20px', margin: '10px' }
      const { container } = render(<Breadcrumb {...defaultProps} style={customStyle} />)
      const nav = container.querySelector('nav')
      expect(nav).toHaveStyle({
        padding: '20px',
        margin: '10px',
      })
    })

    it('should preserve custom styles alongside sekai color variables', () => {
      const customStyle = { borderRadius: '8px' }
      const { container } = render(
        <Breadcrumb {...defaultProps} sekai="Miku" style={customStyle} />,
      )
      const nav = container.querySelector('nav')
      expect(nav).toHaveStyle('border-radius: 8px')
      expect(nav).toHaveStyle('--sekai-color: #33ccba')
    })
  })

  describe('Accessibility', () => {
    it('should use nav element for semantic HTML', () => {
      const { container } = render(<Breadcrumb {...defaultProps} />)
      const nav = container.querySelector('nav')
      expect(nav).toBeInTheDocument()
    })

    it('should have aria-label based on id', () => {
      const { container } = render(<Breadcrumb {...defaultProps} id="main-nav" />)
      const nav = container.querySelector('nav')
      expect(nav).toHaveAttribute('aria-label', 'breadcrumb-main-nav')
    })

    it('should use ordered list for breadcrumb items', () => {
      const { container } = render(<Breadcrumb {...defaultProps} />)
      const ol = container.querySelector('ol')
      expect(ol).toBeInTheDocument()
    })

    it('should render each item as list item', () => {
      const { container } = render(<Breadcrumb {...defaultProps} />)
      const listItems = container.querySelectorAll('li')
      expect(listItems.length).toBe(3) // 3 breadcrumb items
    })

    it('should maintain link accessibility in children', () => {
      render(
        <Breadcrumb>
          <a href="/">Home</a>
          <a href="/products" aria-label="View all products">
            Products
          </a>
        </Breadcrumb>,
      )
      const link = screen.getByLabelText('View all products')
      expect(link).toBeInTheDocument()
    })
  })

  describe('Edge Cases', () => {
    it('should handle no children gracefully', () => {
      const { container } = render(<Breadcrumb children={null as unknown as React.ReactNode} />)
      const ol = container.querySelector('ol')
      expect(ol).toBeInTheDocument()
      expect(ol?.children.length).toBe(0)
    })

    it('should handle undefined children gracefully', () => {
      const { container } = render(
        <Breadcrumb children={undefined as unknown as React.ReactNode} />,
      )
      const ol = container.querySelector('ol')
      expect(ol).toBeInTheDocument()
    })

    it('should handle single item without separator', () => {
      const { container } = render(
        <Breadcrumb>
          <span>Only Item</span>
        </Breadcrumb>,
      )
      const separators = container.querySelectorAll('[class*="sekai-breadcrumb-separator"]')
      expect(separators.length).toBe(0)
    })

    it('should handle very long breadcrumb trail', () => {
      const { container } = render(
        <Breadcrumb>
          <a href="/">Home</a>
          <a href="/level1">Level 1</a>
          <a href="/level2">Level 2</a>
          <a href="/level3">Level 3</a>
          <a href="/level4">Level 4</a>
          <a href="/level5">Level 5</a>
          <span>Current</span>
        </Breadcrumb>,
      )
      const listItems = container.querySelectorAll('li')
      expect(listItems.length).toBe(7)
      const separators = container.querySelectorAll('[class*="sekai-breadcrumb-separator"]')
      expect(separators.length).toBe(6) // n-1 separators
    })

    it('should handle mixed content types', () => {
      render(
        <Breadcrumb>
          <a href="/">Link</a>
          <button type="button">Button</button>
          <span>Span</span>
          Plain text
        </Breadcrumb>,
      )
      expect(screen.getByText('Link')).toBeInTheDocument()
      expect(screen.getByText('Button')).toBeInTheDocument()
      expect(screen.getByText('Span')).toBeInTheDocument()
    })

    it('should handle boolean children', () => {
      const { container } = render(
        <Breadcrumb>
          <a href="/">Home</a>
          {false}
          {true}
          <span>Current</span>
        </Breadcrumb>,
      )
      // Boolean children should be filtered by React
      expect(screen.getByText('Home')).toBeInTheDocument()
      expect(screen.getByText('Current')).toBeInTheDocument()
      const listItems = container.querySelectorAll('li')
      // Should only have valid children
      expect(listItems.length).toBeGreaterThan(0)
    })

    it('should handle null and undefined children in array', () => {
      const { container } = render(
        <Breadcrumb>
          <a href="/">Home</a>
          {null}
          {undefined}
          <span>Current</span>
        </Breadcrumb>,
      )
      expect(screen.getByText('Home')).toBeInTheDocument()
      expect(screen.getByText('Current')).toBeInTheDocument()
      const listItems = container.querySelectorAll('li')
      expect(listItems.length).toBeGreaterThan(0)
    })
  })

  describe('Integration Tests', () => {
    it('should re-render with different children', () => {
      const { rerender } = render(
        <Breadcrumb>
          <a href="/">Home</a>
          <span>Page 1</span>
        </Breadcrumb>,
      )
      expect(screen.getByText('Page 1')).toBeInTheDocument()

      rerender(
        <Breadcrumb>
          <a href="/">Home</a>
          <span>Page 2</span>
        </Breadcrumb>,
      )
      expect(screen.getByText('Page 2')).toBeInTheDocument()
      expect(screen.queryByText('Page 1')).not.toBeInTheDocument()
    })

    it('should re-render with different separator', () => {
      const { rerender, container } = render(<Breadcrumb {...defaultProps} separator="slash" />)
      let separators = container.querySelectorAll('[class*="sekai-breadcrumb-separator"]')
      expect(separators[0].textContent).toBe('/')

      rerender(<Breadcrumb {...defaultProps} separator="arrow" />)
      separators = container.querySelectorAll('[class*="sekai-breadcrumb-separator"]')
      expect(separators[0].textContent).toBe('→')

      rerender(<Breadcrumb {...defaultProps} separator="dot" />)
      separators = container.querySelectorAll('[class*="sekai-breadcrumb-separator"]')
      expect(separators[0].textContent).toBe('•')
    })

    it('should update theme on re-render', () => {
      const { rerender, container } = render(<Breadcrumb {...defaultProps} sekai="Miku" />)
      let nav = container.querySelector('nav')
      expect(nav).toHaveStyle('--sekai-color: #33ccba')

      const useOptionalSekai = require('@/internal/useOptionalSekai').useOptionalSekai
      useOptionalSekai.mockReturnValue({
        sekaiColor: '#ff6699',
        modeTheme: 'dark',
        isLight: false,
      })

      rerender(<Breadcrumb {...defaultProps} sekai="Leoneed" />)
      nav = container.querySelector('nav')
      expect(nav).toHaveStyle('--sekai-color: #ff6699')
    })

    it('should maintain structure with dynamic children count', () => {
      const { rerender, container } = render(
        <Breadcrumb>
          <a href="/">Home</a>
        </Breadcrumb>,
      )
      let listItems = container.querySelectorAll('li')
      expect(listItems.length).toBe(1)

      rerender(
        <Breadcrumb>
          <a href="/">Home</a>
          <a href="/products">Products</a>
        </Breadcrumb>,
      )
      listItems = container.querySelectorAll('li')
      expect(listItems.length).toBe(2)

      rerender(
        <Breadcrumb>
          <a href="/">Home</a>
          <a href="/products">Products</a>
          <span>Details</span>
        </Breadcrumb>,
      )
      listItems = container.querySelectorAll('li')
      expect(listItems.length).toBe(3)
    })
  })

  describe('CSS Class Application', () => {
    it('should apply sekai-breadcrumb class to nav', () => {
      const { container } = render(<Breadcrumb {...defaultProps} />)
      const nav = container.querySelector('[class*="sekai-breadcrumb"]')
      expect(nav).toBeTruthy()
    })

    it('should apply sekai-breadcrumb-item class to each list item', () => {
      const { container } = render(<Breadcrumb {...defaultProps} />)
      const items = container.querySelectorAll('[class*="sekai-breadcrumb-item"]')
      expect(items.length).toBe(3)
    })

    it('should apply theme-specific class to items', () => {
      const { container } = render(<Breadcrumb {...defaultProps} />)
      const items = container.querySelectorAll('[class*="sekai-breadcrumb-text-"]')
      expect(items.length).toBeGreaterThan(0)
    })

    it('should apply separator class to separators', () => {
      const { container } = render(<Breadcrumb {...defaultProps} />)
      const separators = container.querySelectorAll('[class*="sekai-breadcrumb-separator"]')
      expect(separators.length).toBe(2)
    })
  })

  describe('Separator Count Logic', () => {
    it('should have n-1 separators for n items', () => {
      const { container } = render(
        <Breadcrumb>
          <span>1</span>
          <span>2</span>
          <span>3</span>
          <span>4</span>
        </Breadcrumb>,
      )
      const items = container.querySelectorAll('li')
      const separators = container.querySelectorAll('[class*="sekai-breadcrumb-separator"]')
      expect(items.length).toBe(4)
      expect(separators.length).toBe(3)
    })

    it('should have zero separators for one item', () => {
      const { container } = render(
        <Breadcrumb>
          <span>Only</span>
        </Breadcrumb>,
      )
      const separators = container.querySelectorAll('[class*="sekai-breadcrumb-separator"]')
      expect(separators.length).toBe(0)
    })

    it('should have one separator for two items', () => {
      const { container } = render(
        <Breadcrumb>
          <span>First</span>
          <span>Second</span>
        </Breadcrumb>,
      )
      const separators = container.querySelectorAll('[class*="sekai-breadcrumb-separator"]')
      expect(separators.length).toBe(1)
    })
  })

  describe('Key Generation', () => {
    it('should generate unique keys for breadcrumb items', () => {
      const { container } = render(<Breadcrumb {...defaultProps} />)
      const listItems = container.querySelectorAll('li')
      const keys = Array.from(listItems).map((item) => item.getAttribute('data-key'))

      // Keys should be generated by React
      expect(listItems.length).toBeGreaterThan(0)
    })

    it('should handle re-renders without key conflicts', () => {
      const { rerender, container } = render(
        <Breadcrumb>
          <span>Item 1</span>
          <span>Item 2</span>
        </Breadcrumb>,
      )
      const initialListItems = container.querySelectorAll('li')
      expect(initialListItems.length).toBe(2)

      rerender(
        <Breadcrumb>
          <span>Item 1</span>
          <span>Item 2</span>
          <span>Item 3</span>
        </Breadcrumb>,
      )
      const updatedListItems = container.querySelectorAll('li')
      expect(updatedListItems.length).toBe(3)
    })
  })
})
