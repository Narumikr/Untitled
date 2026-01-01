/* eslint-disable max-lines-per-function */
import React from 'react'

import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { PrskLinkCard } from '@/components/card/PrskLinkCard'

import type { PrskLinkCardProps } from '@/components/card/PrskLinkCard'

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

// Mock NamePlate component
jest.mock('@/components/text/NamePlate', () => ({
  NamePlate: ({
    text,
    id,
    className,
  }: {
    text: string
    id?: string
    className?: string
  }) => (
    <div data-testid="name-plate" id={id} className={className}>
      {text}
    </div>
  ),
}))

// Mock OutlineText component
jest.mock('@/components/text/OutlineText', () => ({
  OutlineText: ({
    text,
    id,
    className,
  }: {
    text: string
    id?: string
    className?: string
  }) => (
    <div data-testid="outline-text" id={id} className={className}>
      {text}
    </div>
  ),
}))

// === TEST SUITE ===

describe('PrskLinkCard Component', () => {
  const defaultProps: PrskLinkCardProps = {
    title: 'Test Title',
    subText: 'Test SubText',
    icon: 'https://example.com/icon.png',
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('Rendering', () => {
    it('should render without crashing', () => {
      render(<PrskLinkCard {...defaultProps} />)
      expect(screen.getByRole('button')).toBeInTheDocument()
    })

    it('should render title text', () => {
      render(<PrskLinkCard {...defaultProps} title="Card Title" />)
      expect(screen.getByText('Card Title')).toBeInTheDocument()
    })

    it('should render subText', () => {
      render(<PrskLinkCard {...defaultProps} subText="Card SubText" />)
      expect(screen.getByText('Card SubText')).toBeInTheDocument()
    })

    it('should render with custom id', () => {
      const { container } = render(<PrskLinkCard {...defaultProps} id="custom-prsk-card" />)
      expect(container.querySelector('#custom-prsk-card')).toBeInTheDocument()
    })

    it('should render with custom className', () => {
      const { container } = render(<PrskLinkCard {...defaultProps} className="custom-class" />)
      expect(container.querySelector('.custom-class')).toBeInTheDocument()
    })

    it('should render with custom styles', () => {
      const customStyle = { backgroundColor: 'blue' }
      const { container } = render(<PrskLinkCard {...defaultProps} style={customStyle} />)
      const element = container.firstChild as HTMLElement
      expect(element).toHaveStyle('background-color: rgb(0, 0, 255)')
    })

    it('should render NamePlate component', () => {
      render(<PrskLinkCard {...defaultProps} />)
      expect(screen.getByTestId('name-plate')).toBeInTheDocument()
    })

    it('should render OutlineText component', () => {
      render(<PrskLinkCard {...defaultProps} />)
      expect(screen.getByTestId('outline-text')).toBeInTheDocument()
    })
  })

  describe('Icon Rendering', () => {
    it('should render img element when icon is a string URL', () => {
      const { container } = render(
        <PrskLinkCard {...defaultProps} icon="https://example.com/icon.png" />,
      )
      const img = container.querySelector('img')
      expect(img).toBeInTheDocument()
      expect(img).toHaveAttribute('src', 'https://example.com/icon.png')
    })

    it('should render img with empty alt attribute', () => {
      const { container } = render(
        <PrskLinkCard {...defaultProps} icon="https://example.com/icon.png" />,
      )
      const img = container.querySelector('img')
      expect(img).toHaveAttribute('alt', '')
    })

    it('should render React node when icon is not a string', () => {
      const iconNode = <svg data-testid="custom-svg-icon" />
      render(<PrskLinkCard {...defaultProps} icon={iconNode} />)
      expect(screen.getByTestId('custom-svg-icon')).toBeInTheDocument()
    })

    it('should render complex React node as icon', () => {
      const iconNode = (
        <div data-testid="complex-icon">
          <span>Icon Content</span>
        </div>
      )
      render(<PrskLinkCard {...defaultProps} icon={iconNode} />)
      expect(screen.getByTestId('complex-icon')).toBeInTheDocument()
      expect(screen.getByText('Icon Content')).toBeInTheDocument()
    })
  })

  describe('Size Props', () => {
    it('should use default height of 72px', () => {
      render(<PrskLinkCard {...defaultProps} />)
      const button = screen.getByRole('button')
      expect(button).toHaveStyle({ height: '72px' })
    })

    it('should use default width of 160px', () => {
      render(<PrskLinkCard {...defaultProps} />)
      const button = screen.getByRole('button')
      expect(button).toHaveStyle({ width: '160px' })
    })

    it('should apply custom height', () => {
      render(<PrskLinkCard {...defaultProps} height={100} />)
      const button = screen.getByRole('button')
      expect(button).toHaveStyle({ height: '100px' })
    })

    it('should apply custom width', () => {
      render(<PrskLinkCard {...defaultProps} width={200} />)
      const button = screen.getByRole('button')
      expect(button).toHaveStyle({ width: '200px' })
    })

    it('should apply both custom height and width', () => {
      render(<PrskLinkCard {...defaultProps} height={150} width={250} />)
      const button = screen.getByRole('button')
      expect(button).toHaveStyle({ height: '150px', width: '250px' })
    })
  })

  describe('Click Handling', () => {
    it('should call onClick when button is clicked', async () => {
      const user = userEvent.setup()
      const handleClick = jest.fn()
      render(<PrskLinkCard {...defaultProps} onClick={handleClick} />)

      const button = screen.getByRole('button')
      await user.click(button)
      expect(handleClick).toHaveBeenCalledTimes(1)
    })

    it('should handle multiple clicks', async () => {
      const user = userEvent.setup()
      const handleClick = jest.fn()
      render(<PrskLinkCard {...defaultProps} onClick={handleClick} />)

      const button = screen.getByRole('button')
      await user.click(button)
      await user.click(button)
      await user.click(button)
      expect(handleClick).toHaveBeenCalledTimes(3)
    })

    it('should work without onClick handler', async () => {
      const user = userEvent.setup()
      render(<PrskLinkCard {...defaultProps} />)

      const button = screen.getByRole('button')
      await expect(user.click(button)).resolves.not.toThrow()
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

    it('should call useOptionalSekai with correct parameters', () => {
      const useOptionalSekai = require('@/internal/useOptionalSekai').useOptionalSekai
      useOptionalSekai.mockClear()

      render(<PrskLinkCard {...defaultProps} sekai="Miku" themeMode="light" />)

      expect(useOptionalSekai).toHaveBeenCalledWith({
        sekai: 'Miku',
        mode: 'light',
      })
    })

    it('should apply light theme mode class to button', () => {
      const { container } = render(<PrskLinkCard {...defaultProps} themeMode="light" />)
      const button = container.querySelector('button')
      expect(button?.className).toContain('light')
    })

    it('should apply dark theme mode class to button', () => {
      const useOptionalSekai = require('@/internal/useOptionalSekai').useOptionalSekai
      useOptionalSekai.mockReturnValue({
        sekaiColor: '#33ccba',
        modeTheme: 'dark',
        isLight: false,
      })

      const { container } = render(<PrskLinkCard {...defaultProps} themeMode="dark" />)
      const button = container.querySelector('button')
      expect(button?.className).toContain('dark')
    })
  })

  describe('ID Generation', () => {
    it('should generate title id from provided id', () => {
      render(<PrskLinkCard {...defaultProps} id="my-card" />)
      const namePlate = screen.getByTestId('name-plate')
      expect(namePlate).toHaveAttribute('id', 'my-card-title')
    })

    it('should generate subtext id from provided id', () => {
      render(<PrskLinkCard {...defaultProps} id="my-card" />)
      const outlineText = screen.getByTestId('outline-text')
      expect(outlineText).toHaveAttribute('id', 'my-card-subtext')
    })

    it('should use default id when id is not provided', () => {
      render(<PrskLinkCard {...defaultProps} />)
      const namePlate = screen.getByTestId('name-plate')
      expect(namePlate).toHaveAttribute('id', 'prsk-link-card-title')
    })
  })

  describe('Accessibility', () => {
    it('should have button role', () => {
      render(<PrskLinkCard {...defaultProps} />)
      expect(screen.getByRole('button')).toBeInTheDocument()
    })

    it('should be keyboard accessible', async () => {
      const user = userEvent.setup()
      render(<PrskLinkCard {...defaultProps} />)

      const button = screen.getByRole('button')
      await user.tab()
      expect(button).toHaveFocus()
    })

    it('should support Enter key activation', async () => {
      const user = userEvent.setup()
      const handleClick = jest.fn()
      render(<PrskLinkCard {...defaultProps} onClick={handleClick} />)

      await user.tab()
      await user.keyboard('{Enter}')
      expect(handleClick).toHaveBeenCalledTimes(1)
    })

    it('should support Space key activation', async () => {
      const user = userEvent.setup()
      const handleClick = jest.fn()
      render(<PrskLinkCard {...defaultProps} onClick={handleClick} />)

      await user.tab()
      await user.keyboard(' ')
      expect(handleClick).toHaveBeenCalledTimes(1)
    })
  })

  describe('Edge Cases', () => {
    it('should handle empty title', () => {
      render(<PrskLinkCard {...defaultProps} title="" />)
      expect(screen.getByRole('button')).toBeInTheDocument()
    })

    it('should handle empty subText', () => {
      render(<PrskLinkCard {...defaultProps} subText="" />)
      expect(screen.getByRole('button')).toBeInTheDocument()
    })

    it('should handle very long title', () => {
      const longTitle = 'A'.repeat(500)
      render(<PrskLinkCard {...defaultProps} title={longTitle} />)
      expect(screen.getByText(longTitle)).toBeInTheDocument()
    })

    it('should handle very long subText', () => {
      const longSubText = 'B'.repeat(500)
      render(<PrskLinkCard {...defaultProps} subText={longSubText} />)
      expect(screen.getByText(longSubText)).toBeInTheDocument()
    })

    it('should handle special characters in title', () => {
      render(<PrskLinkCard {...defaultProps} title={'<>&"\'`'} />)
      expect(screen.getByText('<>&"\'`')).toBeInTheDocument()
    })

    it('should handle special characters in subText', () => {
      render(<PrskLinkCard {...defaultProps} subText={'<>&"\'`'} />)
      expect(screen.getByText('<>&"\'`')).toBeInTheDocument()
    })

    it('should handle height of 0', () => {
      render(<PrskLinkCard {...defaultProps} height={0} />)
      const button = screen.getByRole('button')
      expect(button).toHaveStyle({ height: '0px' })
    })

    it('should handle width of 0', () => {
      render(<PrskLinkCard {...defaultProps} width={0} />)
      const button = screen.getByRole('button')
      expect(button).toHaveStyle({ width: '0px' })
    })
  })

  describe('Integration Tests', () => {
    it('should update title on re-render', () => {
      const { rerender } = render(<PrskLinkCard {...defaultProps} title="Original" />)
      expect(screen.getByText('Original')).toBeInTheDocument()

      rerender(<PrskLinkCard {...defaultProps} title="Updated" />)
      expect(screen.getByText('Updated')).toBeInTheDocument()
      expect(screen.queryByText('Original')).not.toBeInTheDocument()
    })

    it('should update subText on re-render', () => {
      const { rerender } = render(<PrskLinkCard {...defaultProps} subText="Original Sub" />)
      expect(screen.getByText('Original Sub')).toBeInTheDocument()

      rerender(<PrskLinkCard {...defaultProps} subText="Updated Sub" />)
      expect(screen.getByText('Updated Sub')).toBeInTheDocument()
    })

    it('should update icon on re-render', () => {
      const { rerender, container } = render(
        <PrskLinkCard {...defaultProps} icon="https://example.com/icon1.png" />,
      )
      let img = container.querySelector('img')
      expect(img).toHaveAttribute('src', 'https://example.com/icon1.png')

      rerender(<PrskLinkCard {...defaultProps} icon="https://example.com/icon2.png" />)
      img = container.querySelector('img')
      expect(img).toHaveAttribute('src', 'https://example.com/icon2.png')
    })

    it('should update size on re-render', () => {
      const { rerender } = render(<PrskLinkCard {...defaultProps} height={72} width={160} />)
      let button = screen.getByRole('button')
      expect(button).toHaveStyle({ height: '72px', width: '160px' })

      rerender(<PrskLinkCard {...defaultProps} height={100} width={200} />)
      button = screen.getByRole('button')
      expect(button).toHaveStyle({ height: '100px', width: '200px' })
    })

    it('should handle rapid clicks', async () => {
      const user = userEvent.setup()
      const handleClick = jest.fn()
      render(<PrskLinkCard {...defaultProps} onClick={handleClick} />)

      const button = screen.getByRole('button')
      await user.click(button)
      await user.click(button)
      await user.click(button)
      await user.click(button)
      await user.click(button)

      expect(handleClick).toHaveBeenCalledTimes(5)
    })

    it('should switch from string icon to React node icon', () => {
      const { rerender, container } = render(
        <PrskLinkCard {...defaultProps} icon="https://example.com/icon.png" />,
      )
      expect(container.querySelector('img')).toBeInTheDocument()

      rerender(<PrskLinkCard {...defaultProps} icon={<svg data-testid="svg-icon" />} />)
      expect(container.querySelector('img')).not.toBeInTheDocument()
      expect(screen.getByTestId('svg-icon')).toBeInTheDocument()
    })
  })

  describe('Custom Styling', () => {
    it('should merge custom className with default classes', () => {
      const { container } = render(<PrskLinkCard {...defaultProps} className="custom-card" />)
      const card = container.firstChild as HTMLElement
      expect(card).toHaveClass('custom-card')
    })

    it('should merge custom styles with default styles', () => {
      const customStyle = { padding: '20px', margin: '10px' }
      const { container } = render(<PrskLinkCard {...defaultProps} style={customStyle} />)
      const card = container.firstChild as HTMLElement

      expect(card).toHaveStyle({
        padding: '20px',
        margin: '10px',
      })
    })
  })
})
