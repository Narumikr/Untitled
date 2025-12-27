/* eslint-disable max-lines-per-function */
import React from 'react'

import { render, screen } from '@testing-library/react'

import { Card, CardContent, CardTitle } from '@/components/card/Card'

import type { CardProps, CardContentProps, CardTitleProps } from '@/components/card/Card'

// === MOCKS ===

jest.mock('@/internal/useOptionalSekai', () => ({
  useOptionalSekai: jest.fn(() => ({
    sekaiColor: '#33ccba',
    modeTheme: 'light',
    isLight: true,
  })),
}))

jest.mock('@/utils/converter', () => ({
  convertHexToRgba: jest.fn((color: string, alpha: number) => `rgba(51, 204, 186, ${alpha})`),
}))

// === CARD COMPONENT TESTS ===

describe('Card Component', () => {
  const defaultProps: CardProps = {
    children: <div>Card Content</div>,
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('Rendering', () => {
    it('should render without crashing', () => {
      render(<Card {...defaultProps} />)
      expect(screen.getByText('Card Content')).toBeInTheDocument()
    })

    it('should render children content', () => {
      render(
        <Card {...defaultProps}>
          <span data-testid="child-content">Child Content</span>
        </Card>,
      )
      expect(screen.getByTestId('child-content')).toBeInTheDocument()
    })

    it('should render with custom id', () => {
      const { container } = render(<Card {...defaultProps} id="custom-card" />)
      expect(container.querySelector('#custom-card')).toBeInTheDocument()
    })

    it('should render with custom className', () => {
      const { container } = render(<Card {...defaultProps} className="custom-class" />)
      expect(container.querySelector('.custom-class')).toBeInTheDocument()
    })

    it('should render with custom styles', () => {
      const customStyle = { backgroundColor: 'red', padding: '10px' }
      const { container } = render(<Card {...defaultProps} style={customStyle} />)
      const element = container.firstChild as HTMLElement
      expect(element).toHaveStyle('background-color: rgb(255, 0, 0)')
      expect(element).toHaveStyle('padding: 10px')
    })

    it('should render complex children', () => {
      render(
        <Card {...defaultProps}>
          <div>First Child</div>
          <div>Second Child</div>
        </Card>,
      )
      expect(screen.getByText('First Child')).toBeInTheDocument()
      expect(screen.getByText('Second Child')).toBeInTheDocument()
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
      const { container } = render(<Card {...defaultProps} sekai="Miku" />)
      const element = container.firstChild as HTMLElement
      expect(element).toHaveStyle({ '--sekai-color': '#33ccba' })
    })

    it('should apply sekai color shadow CSS variables', () => {
      const { container } = render(<Card {...defaultProps} />)
      const element = container.firstChild as HTMLElement
      expect(element).toHaveStyle({ '--sekai-color-shadow': 'rgba(51, 204, 186, 0.75)' })
    })

    it('should call convertHexToRgba with correct alpha', () => {
      const convertHexToRgba = require('@/utils/converter').convertHexToRgba
      render(<Card {...defaultProps} />)
      expect(convertHexToRgba).toHaveBeenCalledWith('#33ccba', 0.75)
    })

    it('should apply light theme mode class', () => {
      const { container } = render(<Card {...defaultProps} themeMode="light" />)
      expect(container.querySelector('[class*="light"]')).toBeTruthy()
    })

    it('should apply dark theme mode class', () => {
      const useOptionalSekai = require('@/internal/useOptionalSekai').useOptionalSekai
      useOptionalSekai.mockReturnValue({
        sekaiColor: '#33ccba',
        modeTheme: 'dark',
        isLight: false,
      })

      const { container } = render(<Card {...defaultProps} themeMode="dark" />)
      expect(container.querySelector('[class*="dark"]')).toBeTruthy()
    })

    it('should call useOptionalSekai with correct parameters', () => {
      const useOptionalSekai = require('@/internal/useOptionalSekai').useOptionalSekai
      useOptionalSekai.mockClear()

      render(<Card {...defaultProps} sekai="Miku" themeMode="light" />)

      expect(useOptionalSekai).toHaveBeenCalledWith({
        sekai: 'Miku',
        mode: 'light',
      })
    })
  })

  describe('HTML Attributes', () => {
    it('should support aria-label attribute', () => {
      const { container } = render(<Card {...defaultProps} aria-label="Card description" />)
      const card = container.firstChild as HTMLElement
      expect(card).toHaveAttribute('aria-label', 'Card description')
    })

    it('should support data-testid attribute', () => {
      render(<Card {...defaultProps} data-testid="test-card" />)
      expect(screen.getByTestId('test-card')).toBeInTheDocument()
    })

    it('should support role attribute', () => {
      const { container } = render(<Card {...defaultProps} role="article" />)
      const card = container.firstChild as HTMLElement
      expect(card).toHaveAttribute('role', 'article')
    })

    it('should pass through div props', () => {
      const handleClick = jest.fn()
      const { container } = render(<Card {...defaultProps} onClick={handleClick} />)
      const card = container.firstChild as HTMLElement
      card.click()
      expect(handleClick).toHaveBeenCalledTimes(1)
    })
  })

  describe('Custom Styling', () => {
    it('should merge custom className with default classes', () => {
      const { container } = render(<Card {...defaultProps} className="custom-card" />)
      const card = container.firstChild as HTMLElement
      expect(card).toHaveClass('custom-card')
    })

    it('should merge custom styles with option styles', () => {
      const customStyle = { padding: '20px', margin: '10px' }
      const { container } = render(<Card {...defaultProps} style={customStyle} />)
      const card = container.firstChild as HTMLElement

      expect(card).toHaveStyle({
        padding: '20px',
        margin: '10px',
      })
    })

    it('should preserve custom styles alongside sekai color variables', () => {
      const customStyle = { borderRadius: '8px' }
      const { container } = render(<Card {...defaultProps} sekai="Miku" style={customStyle} />)
      const card = container.firstChild as HTMLElement

      expect(card).toHaveStyle({
        'borderRadius': '8px',
        '--sekai-color': '#33ccba',
      })
    })
  })

  describe('Edge Cases', () => {
    it('should handle null children', () => {
      const { container } = render(<Card children={null as unknown as React.ReactNode} />)
      expect(container.firstChild).toBeInTheDocument()
    })

    it('should handle multiple nested children', () => {
      render(
        <Card {...defaultProps}>
          <div>
            <span>Nested Level 1</span>
            <div>
              <span>Nested Level 2</span>
            </div>
          </div>
        </Card>,
      )
      expect(screen.getByText('Nested Level 1')).toBeInTheDocument()
      expect(screen.getByText('Nested Level 2')).toBeInTheDocument()
    })
  })

  describe('Integration Tests', () => {
    it('should update on re-render', () => {
      const { rerender } = render(<Card {...defaultProps}>Original</Card>)
      expect(screen.getByText('Original')).toBeInTheDocument()

      rerender(<Card {...defaultProps}>Updated</Card>)
      expect(screen.getByText('Updated')).toBeInTheDocument()
      expect(screen.queryByText('Original')).not.toBeInTheDocument()
    })

    it('should update sekai color on re-render', () => {
      const useOptionalSekai = require('@/internal/useOptionalSekai').useOptionalSekai
      useOptionalSekai.mockReturnValue({
        sekaiColor: '#33ccba',
        modeTheme: 'light',
        isLight: true,
      })

      const { rerender, container } = render(<Card {...defaultProps} sekai="Miku" />)
      let card = container.firstChild as HTMLElement
      expect(card).toHaveStyle({ '--sekai-color': '#33ccba' })

      useOptionalSekai.mockReturnValue({
        sekaiColor: '#ff6699',
        modeTheme: 'light',
        isLight: true,
      })

      rerender(<Card {...defaultProps} sekai="Ichika" />)
      card = container.firstChild as HTMLElement
      expect(card).toHaveStyle({ '--sekai-color': '#ff6699' })
    })
  })
})

// === CARD CONTENT COMPONENT TESTS ===

describe('CardContent Component', () => {
  const defaultProps: CardContentProps = {
    children: <div>Content</div>,
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('Rendering', () => {
    it('should render without crashing', () => {
      render(<CardContent {...defaultProps} />)
      expect(screen.getByText('Content')).toBeInTheDocument()
    })

    it('should render children content', () => {
      render(
        <CardContent {...defaultProps}>
          <span data-testid="child-content">Child Content</span>
        </CardContent>,
      )
      expect(screen.getByTestId('child-content')).toBeInTheDocument()
    })

    it('should render with custom id', () => {
      const { container } = render(<CardContent {...defaultProps} id="custom-content" />)
      expect(container.querySelector('#custom-content')).toBeInTheDocument()
    })

    it('should render with custom className', () => {
      const { container } = render(<CardContent {...defaultProps} className="custom-class" />)
      expect(container.querySelector('.custom-class')).toBeInTheDocument()
    })

    it('should render with custom styles', () => {
      const customStyle = { backgroundColor: 'blue', padding: '15px' }
      const { container } = render(<CardContent {...defaultProps} style={customStyle} />)
      const element = container.firstChild as HTMLElement
      expect(element).toHaveStyle('background-color: rgb(0, 0, 255)')
      expect(element).toHaveStyle('padding: 15px')
    })
  })

  describe('Theme Integration', () => {
    it('should apply light theme mode class', () => {
      const { container } = render(<CardContent {...defaultProps} themeMode="light" />)
      expect(container.querySelector('[class*="light"]')).toBeTruthy()
    })

    it('should apply dark theme mode class', () => {
      const useOptionalSekai = require('@/internal/useOptionalSekai').useOptionalSekai
      useOptionalSekai.mockReturnValue({
        sekaiColor: '#33ccba',
        modeTheme: 'dark',
        isLight: false,
      })

      const { container } = render(<CardContent {...defaultProps} themeMode="dark" />)
      expect(container.querySelector('[class*="dark"]')).toBeTruthy()
    })

    it('should call useOptionalSekai with correct parameters', () => {
      const useOptionalSekai = require('@/internal/useOptionalSekai').useOptionalSekai
      useOptionalSekai.mockClear()

      render(<CardContent {...defaultProps} themeMode="light" />)

      expect(useOptionalSekai).toHaveBeenCalledWith({
        mode: 'light',
      })
    })
  })

  describe('Edge Cases', () => {
    it('should handle null children', () => {
      const { container } = render(
        <CardContent children={null as unknown as React.ReactNode} />,
      )
      expect(container.firstChild).toBeInTheDocument()
    })

    it('should handle undefined id', () => {
      const { container } = render(<CardContent {...defaultProps} id={undefined} />)
      expect(container.firstChild).not.toHaveAttribute('id')
    })
  })

  describe('Integration Tests', () => {
    it('should update on re-render', () => {
      const { rerender } = render(<CardContent {...defaultProps}>Original</CardContent>)
      expect(screen.getByText('Original')).toBeInTheDocument()

      rerender(<CardContent {...defaultProps}>Updated</CardContent>)
      expect(screen.getByText('Updated')).toBeInTheDocument()
    })
  })
})

// === CARD TITLE COMPONENT TESTS ===

describe('CardTitle Component', () => {
  const defaultProps: CardTitleProps = {
    title: 'Card Title',
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('Rendering', () => {
    it('should render without crashing', () => {
      render(<CardTitle {...defaultProps} />)
      expect(screen.getByRole('heading', { level: 3 })).toBeInTheDocument()
    })

    it('should render title text', () => {
      render(<CardTitle {...defaultProps} title="Test Title" />)
      expect(screen.getByText('Test Title')).toBeInTheDocument()
    })

    it('should render with custom id', () => {
      const { container } = render(<CardTitle {...defaultProps} id="custom-title" />)
      expect(container.querySelector('#custom-title')).toBeInTheDocument()
    })

    it('should render with custom className', () => {
      const { container } = render(<CardTitle {...defaultProps} className="custom-class" />)
      expect(container.querySelector('.custom-class')).toBeInTheDocument()
    })

    it('should render with custom styles', () => {
      const customStyle = { color: 'red', fontSize: '24px' }
      const { container } = render(<CardTitle {...defaultProps} style={customStyle} />)
      const element = container.firstChild as HTMLElement
      expect(element).toHaveStyle('color: rgb(255, 0, 0)')
      expect(element).toHaveStyle('font-size: 24px')
    })

    it('should render as h3 element', () => {
      render(<CardTitle {...defaultProps} />)
      const heading = screen.getByRole('heading', { level: 3 })
      expect(heading.tagName).toBe('H3')
    })
  })

  describe('Underline Prop', () => {
    it('should apply underline class when underline is true', () => {
      const { container } = render(<CardTitle {...defaultProps} underline={true} />)
      expect(container.querySelector('[class*="underline"]')).toBeTruthy()
    })

    it('should not apply underline class when underline is undefined', () => {
      const { container } = render(<CardTitle {...defaultProps} />)
      expect(container.querySelector('[class*="underline"]')).toBeFalsy()
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
      const { container } = render(<CardTitle {...defaultProps} sekai="Miku" />)
      const element = container.firstChild as HTMLElement
      expect(element).toHaveStyle({ '--sekai-color': '#33ccba' })
    })

    it('should apply light theme mode class', () => {
      const { container } = render(<CardTitle {...defaultProps} themeMode="light" />)
      expect(container.querySelector('[class*="light"]')).toBeTruthy()
    })

    it('should apply dark theme mode class', () => {
      const useOptionalSekai = require('@/internal/useOptionalSekai').useOptionalSekai
      useOptionalSekai.mockReturnValue({
        sekaiColor: '#33ccba',
        modeTheme: 'dark',
        isLight: false,
      })

      const { container } = render(<CardTitle {...defaultProps} themeMode="dark" />)
      expect(container.querySelector('[class*="dark"]')).toBeTruthy()
    })

    it('should call useOptionalSekai with correct parameters', () => {
      const useOptionalSekai = require('@/internal/useOptionalSekai').useOptionalSekai
      useOptionalSekai.mockClear()

      render(<CardTitle {...defaultProps} sekai="Miku" themeMode="light" />)

      expect(useOptionalSekai).toHaveBeenCalledWith({
        sekai: 'Miku',
        mode: 'light',
      })
    })
  })

  describe('Custom Styling', () => {
    it('should merge custom className with default classes', () => {
      const { container } = render(<CardTitle {...defaultProps} className="custom-title" />)
      const title = container.firstChild as HTMLElement
      expect(title).toHaveClass('custom-title')
    })

    it('should preserve custom styles alongside sekai color variables', () => {
      const customStyle = { fontWeight: 'bold' }
      const { container } = render(
        <CardTitle {...defaultProps} sekai="Miku" style={customStyle} />,
      )
      const title = container.firstChild as HTMLElement

      expect(title).toHaveStyle({
        'fontWeight': 'bold',
        '--sekai-color': '#33ccba',
      })
    })
  })

  describe('Edge Cases', () => {
    it('should handle empty title', () => {
      render(<CardTitle {...defaultProps} title="" />)
      const heading = screen.getByRole('heading', { level: 3 })
      expect(heading).toBeInTheDocument()
      expect(heading).toHaveTextContent('')
    })

    it('should handle very long title', () => {
      const longTitle = 'A'.repeat(500)
      render(<CardTitle {...defaultProps} title={longTitle} />)
      expect(screen.getByText(longTitle)).toBeInTheDocument()
    })

    it('should handle special characters in title', () => {
      render(<CardTitle {...defaultProps} title={'<>&"\'`'} />)
      expect(screen.getByText('<>&"\'`')).toBeInTheDocument()
    })
  })

  describe('Integration Tests', () => {
    it('should update title on re-render', () => {
      const { rerender } = render(<CardTitle {...defaultProps} title="Original" />)
      expect(screen.getByText('Original')).toBeInTheDocument()

      rerender(<CardTitle {...defaultProps} title="Updated" />)
      expect(screen.getByText('Updated')).toBeInTheDocument()
      expect(screen.queryByText('Original')).not.toBeInTheDocument()
    })

    it('should update underline state on re-render', () => {
      const { rerender, container } = render(<CardTitle {...defaultProps} />)
      expect(container.querySelector('[class*="underline"]')).toBeFalsy()

      rerender(<CardTitle {...defaultProps} underline={true} />)
      expect(container.querySelector('[class*="underline"]')).toBeTruthy()
    })
  })
})
