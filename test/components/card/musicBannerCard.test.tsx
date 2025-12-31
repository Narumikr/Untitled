/* eslint-disable max-lines-per-function */
import React from 'react'

import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { MusicBannerCard } from '@/components/card/MusicBannerCard'

import type { MusicBannerCardProps } from '@/components/card/MusicBannerCard'

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

// Mock SVG icons
jest.mock('@/img/compactDisc', () => ({
  CompactDiscIcon: ({ className }: { className?: string }) => (
    <svg data-testid="compact-disc-icon" className={className} />
  ),
}))

jest.mock('@/img/equalizer', () => ({
  EqualizerIcon: ({ className }: { className?: string }) => (
    <svg data-testid="equalizer-icon" className={className} />
  ),
}))

// Mock MarqueeText component
jest.mock('@/components/text/MarqueeText', () => ({
  MarqueeText: ({ children, className }: { children: React.ReactNode; className?: string }) => (
    <div data-testid="marquee-text" className={className}>
      {children}
    </div>
  ),
}))

// === TEST SUITE ===

describe('MusicBannerCard Component', () => {
  const defaultProps: MusicBannerCardProps = {
    musicTitle: 'Test Song',
    artist: 'Test Artist',
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('Rendering', () => {
    it('should render without crashing', () => {
      render(<MusicBannerCard {...defaultProps} />)
      expect(screen.getByRole('button')).toBeInTheDocument()
    })

    it('should render music title', () => {
      render(<MusicBannerCard {...defaultProps} musicTitle="Amazing Song" />)
      expect(screen.getByText('Amazing Song')).toBeInTheDocument()
    })

    it('should render artist name', () => {
      render(<MusicBannerCard {...defaultProps} artist="Famous Artist" />)
      expect(screen.getByText('Famous Artist')).toBeInTheDocument()
    })

    it('should render with custom id', () => {
      const { container } = render(<MusicBannerCard {...defaultProps} id="custom-music-card" />)
      expect(container.querySelector('#custom-music-card')).toBeInTheDocument()
    })

    it('should render with custom className', () => {
      const { container } = render(<MusicBannerCard {...defaultProps} className="custom-class" />)
      expect(container.querySelector('.custom-class')).toBeInTheDocument()
    })

    it('should render with custom styles', () => {
      const customStyle = { backgroundColor: 'red' }
      const { container } = render(<MusicBannerCard {...defaultProps} style={customStyle} />)
      const element = container.firstChild as HTMLElement
      expect(element).toHaveStyle('background-color: rgb(255, 0, 0)')
    })

    it('should render icons', () => {
      render(<MusicBannerCard {...defaultProps} />)
      expect(screen.getByTestId('compact-disc-icon')).toBeInTheDocument()
      expect(screen.getByTestId('equalizer-icon')).toBeInTheDocument()
    })

    it('should have role="button"', () => {
      render(<MusicBannerCard {...defaultProps} />)
      expect(screen.getByRole('button')).toBeInTheDocument()
    })

    it('should have tabIndex=0 for keyboard accessibility', () => {
      render(<MusicBannerCard {...defaultProps} />)
      const card = screen.getByRole('button')
      expect(card).toHaveAttribute('tabIndex', '0')
    })
  })

  describe('Selected State', () => {
    it('should not be selected by default', () => {
      const { container } = render(<MusicBannerCard {...defaultProps} />)
      expect(container.querySelector('[class*="selected"]')).toBeFalsy()
    })

    it('should be selected when selected prop is true', () => {
      const { container } = render(<MusicBannerCard {...defaultProps} selected={true} />)
      expect(container.querySelector('[class*="selected"]')).toBeTruthy()
    })

    it('should not be selected when selected prop is false', () => {
      const { container } = render(<MusicBannerCard {...defaultProps} selected={false} />)
      expect(container.querySelector('[class*="selected"]')).toBeFalsy()
    })

    it('should update selected state when prop changes', () => {
      const { container, rerender } = render(
        <MusicBannerCard {...defaultProps} selected={false} />,
      )
      expect(container.querySelector('[class*="selected"]')).toBeFalsy()

      rerender(<MusicBannerCard {...defaultProps} selected={true} />)
      expect(container.querySelector('[class*="selected"]')).toBeTruthy()
    })
  })

  describe('Focus and Hover Interactions', () => {
    it('should become selected on focus', async () => {
      const user = userEvent.setup()
      const onSelect = jest.fn()
      render(<MusicBannerCard {...defaultProps} onSelect={onSelect} />)

      const card = screen.getByRole('button')
      await user.tab()
      expect(card).toHaveFocus()
      expect(onSelect).toHaveBeenCalledWith(true)
    })

    it('should become selected on mouse enter', async () => {
      const user = userEvent.setup()
      const onSelect = jest.fn()
      render(<MusicBannerCard {...defaultProps} onSelect={onSelect} />)

      const card = screen.getByRole('button')
      await user.hover(card)
      expect(onSelect).toHaveBeenCalledWith(true)
    })

    it('should call onBlur when blurred', async () => {
      const user = userEvent.setup()
      const onBlur = jest.fn()
      render(
        <>
          <MusicBannerCard {...defaultProps} onBlur={onBlur} />
          <button>Other Button</button>
        </>,
      )

      const card = screen.getByRole('button', { name: /test song/i })
      await user.tab()
      expect(card).toHaveFocus()

      await user.tab()
      expect(onBlur).toHaveBeenCalled()
    })

    it('should call onMouseLeave when mouse leaves', async () => {
      const user = userEvent.setup()
      const onMouseLeave = jest.fn()
      render(<MusicBannerCard {...defaultProps} onMouseLeave={onMouseLeave} />)

      const card = screen.getByRole('button')
      await user.hover(card)
      await user.unhover(card)
      expect(onMouseLeave).toHaveBeenCalled()
    })
  })

  describe('Click Handling', () => {
    it('should call onClick when clicked', async () => {
      const user = userEvent.setup()
      const handleClick = jest.fn()
      render(<MusicBannerCard {...defaultProps} onClick={handleClick} />)

      const card = screen.getByRole('button')
      await user.click(card)
      expect(handleClick).toHaveBeenCalledTimes(1)
    })

    it('should handle multiple clicks', async () => {
      const user = userEvent.setup()
      const handleClick = jest.fn()
      render(<MusicBannerCard {...defaultProps} onClick={handleClick} />)

      const card = screen.getByRole('button')
      await user.click(card)
      await user.click(card)
      await user.click(card)
      expect(handleClick).toHaveBeenCalledTimes(3)
    })

    it('should work without onClick handler', async () => {
      const user = userEvent.setup()
      render(<MusicBannerCard {...defaultProps} />)

      const card = screen.getByRole('button')
      await expect(user.click(card)).resolves.not.toThrow()
    })
  })

  describe('Keyboard Navigation', () => {
    it('should activate with Enter key when onClick is provided', async () => {
      const user = userEvent.setup()
      const handleClick = jest.fn()
      render(<MusicBannerCard {...defaultProps} onClick={handleClick} />)

      const card = screen.getByRole('button')
      await user.tab()
      expect(card).toHaveFocus()

      await user.keyboard('{Enter}')
      expect(handleClick).toHaveBeenCalledTimes(1)
    })

    it('should be focusable with Tab key', async () => {
      const user = userEvent.setup()
      render(<MusicBannerCard {...defaultProps} />)

      const card = screen.getByRole('button')
      await user.tab()
      expect(card).toHaveFocus()
    })
  })

  describe('Variants', () => {
    it('should use default variant by default', () => {
      const { container } = render(<MusicBannerCard {...defaultProps} />)
      expect(container.firstChild).toBeInTheDocument()
    })

    it('should apply view-all variant', () => {
      const { container } = render(<MusicBannerCard {...defaultProps} variants="view-all" />)
      expect(container.firstChild).toBeInTheDocument()
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

    it('should pass sekai prop to Card', () => {
      const useOptionalSekai = require('@/internal/useOptionalSekai').useOptionalSekai
      useOptionalSekai.mockClear()

      render(<MusicBannerCard {...defaultProps} sekai="Miku" />)
      expect(useOptionalSekai).toHaveBeenCalled()
    })

    it('should pass themeMode prop to Card', () => {
      const useOptionalSekai = require('@/internal/useOptionalSekai').useOptionalSekai
      useOptionalSekai.mockClear()

      render(<MusicBannerCard {...defaultProps} themeMode="light" />)
      expect(useOptionalSekai).toHaveBeenCalled()
    })
  })

  describe('onSelect Callback', () => {
    it('should call onSelect with true when focused', async () => {
      const user = userEvent.setup()
      const onSelect = jest.fn()
      render(<MusicBannerCard {...defaultProps} onSelect={onSelect} />)

      await user.tab()
      expect(onSelect).toHaveBeenCalledWith(true)
    })

    it('should call onSelect with true when mouse enters', async () => {
      const user = userEvent.setup()
      const onSelect = jest.fn()
      render(<MusicBannerCard {...defaultProps} onSelect={onSelect} />)

      const card = screen.getByRole('button')
      await user.hover(card)
      expect(onSelect).toHaveBeenCalledWith(true)
    })

    it('should work without onSelect handler', async () => {
      const user = userEvent.setup()
      render(<MusicBannerCard {...defaultProps} />)

      const card = screen.getByRole('button')
      await expect(user.hover(card)).resolves.not.toThrow()
    })
  })

  describe('Edge Cases', () => {
    it('should handle empty musicTitle', () => {
      render(<MusicBannerCard {...defaultProps} musicTitle="" />)
      expect(screen.getByRole('button')).toBeInTheDocument()
    })

    it('should handle empty artist', () => {
      render(<MusicBannerCard {...defaultProps} artist="" />)
      expect(screen.getByRole('button')).toBeInTheDocument()
    })

    it('should handle very long musicTitle', () => {
      const longTitle = 'A'.repeat(500)
      render(<MusicBannerCard {...defaultProps} musicTitle={longTitle} />)
      expect(screen.getByText(longTitle)).toBeInTheDocument()
    })

    it('should handle very long artist name', () => {
      const longArtist = 'B'.repeat(500)
      render(<MusicBannerCard {...defaultProps} artist={longArtist} />)
      expect(screen.getByText(longArtist)).toBeInTheDocument()
    })

    it('should handle special characters in musicTitle', () => {
      render(<MusicBannerCard {...defaultProps} musicTitle={'<>&"\'`'} />)
      expect(screen.getByText('<>&"\'`')).toBeInTheDocument()
    })

    it('should handle special characters in artist', () => {
      render(<MusicBannerCard {...defaultProps} artist={'<>&"\'`'} />)
      expect(screen.getByText('<>&"\'`')).toBeInTheDocument()
    })
  })

  describe('Integration Tests', () => {
    it('should update musicTitle on re-render', () => {
      const { rerender } = render(<MusicBannerCard {...defaultProps} musicTitle="Original" />)
      expect(screen.getByText('Original')).toBeInTheDocument()

      rerender(<MusicBannerCard {...defaultProps} musicTitle="Updated" />)
      expect(screen.getByText('Updated')).toBeInTheDocument()
      expect(screen.queryByText('Original')).not.toBeInTheDocument()
    })

    it('should update artist on re-render', () => {
      const { rerender } = render(<MusicBannerCard {...defaultProps} artist="Original Artist" />)
      expect(screen.getByText('Original Artist')).toBeInTheDocument()

      rerender(<MusicBannerCard {...defaultProps} artist="Updated Artist" />)
      expect(screen.getByText('Updated Artist')).toBeInTheDocument()
    })

    it('should handle rapid interactions', async () => {
      const user = userEvent.setup()
      const handleClick = jest.fn()
      const onSelect = jest.fn()
      render(<MusicBannerCard {...defaultProps} onClick={handleClick} onSelect={onSelect} />)

      const card = screen.getByRole('button')

      await user.click(card)
      await user.click(card)
      await user.click(card)

      expect(handleClick).toHaveBeenCalledTimes(3)
    })

    it('should maintain state across re-renders', () => {
      const { rerender, container } = render(
        <MusicBannerCard {...defaultProps} selected={true} />,
      )
      expect(container.querySelector('[class*="selected"]')).toBeTruthy()

      rerender(<MusicBannerCard {...defaultProps} selected={true} />)
      expect(container.querySelector('[class*="selected"]')).toBeTruthy()
    })
  })

  describe('Accessibility', () => {
    it('should have button role', () => {
      render(<MusicBannerCard {...defaultProps} />)
      expect(screen.getByRole('button')).toBeInTheDocument()
    })

    it('should be keyboard accessible', async () => {
      const user = userEvent.setup()
      render(<MusicBannerCard {...defaultProps} />)

      const card = screen.getByRole('button')
      await user.tab()
      expect(card).toHaveFocus()
    })

    it('should support Enter key activation', async () => {
      const user = userEvent.setup()
      const handleClick = jest.fn()
      render(<MusicBannerCard {...defaultProps} onClick={handleClick} />)

      await user.tab()
      await user.keyboard('{Enter}')
      expect(handleClick).toHaveBeenCalledTimes(1)
    })
  })
})
