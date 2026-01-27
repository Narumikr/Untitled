import React from 'react'

import { fn } from 'storybook/test'

import { PrskLinkCard } from '@/components/card/PrskLinkCard'

import { ProfileSvg } from '@/img/profile'

import { COLORS_SEKAI_KEYS } from '@/styles/sekai-colors'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Special/PrskLinkCard',
  component: PrskLinkCard,
  decorators: [
    (Story) => (
      <div style={{ width: 390, maxWidth: '80vw', display: 'flex', justifyContent: 'center' }}>
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
        defaultValue: { summary: '' },
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
    height: {
      description: 'PrskLinkCard height',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '72' },
      },
    },
    width: {
      description: 'PrskLinkCard width',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '160' },
      },
    },
    onClick: {
      description: 'Click handler',
      table: { type: { summary: '() => void' } },
    },
    title: {
      description: 'Title text',
      table: {
        type: { summary: 'string' },
      },
      // @ts-expect-error Storybook's typing issue
      type: { required: true },
    },
    subText: {
      description: 'Subtext, displayed as outline text',
      table: {
        type: { summary: 'string' },
      },
      // @ts-expect-error Storybook's typing issue
      type: { required: true },
    },
    icon: {
      description: 'Icon image src or component ',
      table: {
        type: { summary: 'string | React.ReactNode' },
      },
      // @ts-expect-error Storybook's typing issue
      type: { required: true },
    },
  },
  args: {},
} satisfies Meta<typeof PrskLinkCard>

export default meta
type Story = StoryObj<typeof meta>

export const DefaultLight: Story = {
  args: {
    id: 'prsk-link-card-default-light',
    sekai: 'Miku',
    themeMode: 'light',
    height: 85,
    width: 160,
    onClick: fn(),
    title: 'プロフィール',
    subText: 'Profile',
    icon: <ProfileSvg />,
  },
  parameters: {
    sekai: 'Miku',
    background: 'light',
  },
}

export const DefaultDark: Story = {
  args: {
    id: 'prsk-link-card-default-dark',
    sekai: 'Miku',
    themeMode: 'dark',
    height: 85,
    width: 160,
    onClick: fn(),
    title: 'プロフィール',
    subText: 'Profile',
    icon: <ProfileSvg themeMode="dark" />,
  },
  parameters: {
    sekai: 'Miku',
    background: 'dark',
  },
}
