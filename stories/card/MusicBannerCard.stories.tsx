import React from 'react'

import { fn } from 'storybook/test'

import { MusicBannerCard } from '@/components/card/MusicBannerCard'

import { COLORS_SEKAI_KEYS } from '@/styles/sekai-colors'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Special/MusicBannerCard',
  component: MusicBannerCard,
  decorators: [
    (Story) => (
      <div style={{ width: 250, maxWidth: '80vw', height: 150 }}>
        <Story />
      </div>
    ),
  ],
  parameters: {},
  tags: ['autodocs'],
  argTypes: {
    id: {
      description: 'Unique Id',
      table: {
        type: { summary: 'string' },
      },
    },
    className: {
      description: 'Custom styles',
      table: {
        type: { summary: 'string' },
      },
      control: false,
    },
    style: {
      description: 'Style object',
      table: {
        type: { summary: 'React.CSSProperties' },
      },
      control: false,
    },
    sekai: {
      description: 'What SEKAI color to use',
      table: {
        type: { summary: 'ColorsSekaiKey' },
        defaultValue: { summary: 'Miku' },
      },
      control: { type: 'select' },
      options: [...Object.keys(COLORS_SEKAI_KEYS)],
    },
    themeMode: {
      description: 'Light or Dark mode',
      table: {
        type: { summary: 'PaletteMode' },
        defaultValue: { summary: 'light' },
      },
      control: { type: 'select' },
      options: ['light', 'dark'],
    },
    ref: {
      description: 'Ref to the root element',
      table: {
        type: { summary: 'React.Ref<HTMLDivElement>' },
      },
      control: false,
    },
    musicTitle: {
      description: 'Music title',
      // @ts-expect-error Storybook's typing issue
      type: { required: true },
      table: {
        type: { summary: 'string' },
      },
    },
    artist: {
      description: 'Artist name',
      // @ts-expect-error Storybook's typing issue
      type: { required: true },
      table: {
        type: { summary: 'string' },
      },
    },
    selected: {
      description: 'Whether the card is selected',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
      control: { type: 'boolean' },
    },
    onSelect: {
      description: 'Callback when the card is selected',
      table: {
        type: { summary: '(select: boolean) => void' },
      },
      control: false,
    },
    onClick: {
      description: 'Callback when the card is clicked',
      table: {
        type: { summary: '() => void' },
      },
      control: false,
    },
    onBlur: {
      description: 'Callback when the card loses focus',
      table: {
        type: { summary: '() => void' },
      },
      control: false,
    },
    onMouseLeave: {
      description: 'Callback when the mouse pointer leaves the card',
      table: {
        type: { summary: '() => void' },
      },
      control: false,
    },
    variants: {
      description: 'Variants of the MusicBannerCard',
      table: {
        type: { summary: "'default' | 'view-all'" },
        defaultValue: { summary: 'default' },
      },
      control: { type: 'select' },
      options: ['default', 'view-all'],
    },
  },
  args: {
    onSelect: fn(),
    onClick: fn(),
    onBlur: fn(),
    onMouseLeave: fn(),
  },
} satisfies Meta<typeof MusicBannerCard>

export default meta
type Story = StoryObj<typeof meta>

export const DefaultLight: Story = {
  args: {
    id: 'music-banner-card-default-light',
    sekai: 'Miku',
    themeMode: 'light',
    musicTitle: 'ペンタトニック',
    artist: '星乃一歌 × 花里みのり × 小豆沢こはね × 天馬司 × 宵崎奏 × 初音ミク',
    selected: false,
    variants: 'default',
  },
  parameters: {
    sekai: 'Miku',
    background: 'light',
  },
}

export const DefaultDark: Story = {
  args: {
    id: 'music-banner-card-default-dark',
    sekai: 'Miku',
    themeMode: 'dark',
    musicTitle: 'ペンタトニック',
    artist: '星乃一歌 × 花里みのり × 小豆沢こはね × 天馬司 × 宵崎奏 × 初音ミク',
    selected: false,
    variants: 'default',
  },
  parameters: {
    sekai: 'Miku',
    background: 'dark',
  },
}

export const ViewAllLight: Story = {
  args: {
    id: 'music-banner-card-view-all-light',
    sekai: 'Miku',
    themeMode: 'light',
    musicTitle: 'ペンタトニック',
    artist: '星乃一歌 × 花里みのり × 小豆沢こはね × 天馬司 × 宵崎奏 × 初音ミク',
    selected: false,
    variants: 'view-all',
  },
  parameters: {
    sekai: 'Miku',
    background: 'light',
  },
}

export const ViewAllDark: Story = {
  args: {
    id: 'music-banner-card-view-all-dark',
    sekai: 'Miku',
    themeMode: 'dark',
    musicTitle: 'ペンタトニック',
    artist: '星乃一歌 × 花里みのり × 小豆沢こはね × 天馬司 × 宵崎奏 × 初音ミク',
    selected: false,
    variants: 'view-all',
  },
  parameters: {
    sekai: 'Miku',
    background: 'dark',
  },
}

export const SelectedLight: Story = {
  args: {
    id: 'music-banner-card-selected-light',
    sekai: 'Miku',
    themeMode: 'light',
    musicTitle: 'ペンタトニック',
    artist: '星乃一歌 × 花里みのり × 小豆沢こはね × 天馬司 × 宵崎奏 × 初音ミク',
    selected: true,
    variants: 'default',
  },
  parameters: {
    sekai: 'Miku',
    background: 'light',
  },
}

export const SelectedDark: Story = {
  args: {
    id: 'music-banner-card-selected-dark',
    sekai: 'Miku',
    themeMode: 'dark',
    musicTitle: 'ペンタトニック',
    artist: '星乃一歌 × 花里みのり × 小豆沢こはね × 天馬司 × 宵崎奏 × 初音ミク',
    selected: true,
    variants: 'default',
  },
  parameters: {
    sekai: 'Miku',
    background: 'dark',
  },
}
