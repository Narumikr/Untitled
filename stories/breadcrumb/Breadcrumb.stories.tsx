import React from 'react'

import { Breadcrumb } from '@/components/breadcrumb/Breadcrumb'

import { COLORS_SEKAI_KEYS } from '@/styles/sekai-colors'

import type { Meta, StoryObj } from '@storybook/react'

const meta = {
  title: 'UI/Breadcrumb',
  component: Breadcrumb,
  decorators: [],
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
    children: {
      description: 'Breadcrumb contents',
      // @ts-expect-error Storybook's typing issue
      type: { required: true },
      table: {
        type: { summary: 'React.ReactNode' },
      },
      control: false,
    },
    separator: {
      description: 'Kind of separator',
      table: {
        type: { summary: 'slash | arrow | chevron | dot | pipe' },
        defaultValue: { summary: 'slash' },
      },
      control: { type: 'select' },
      options: ['slash', 'arrow', 'chevron', 'dot', 'pipe'],
    },
  },
  args: {},
} satisfies Meta<typeof Breadcrumb>

export default meta
type Story = StoryObj<typeof meta>

export const DefaultLight: Story = {
  args: {
    id: 'breadcrumb-default-light',
    sekai: 'Miku',
    themeMode: 'light',
    children: (
      <>
        <a href="/">Top</a>
        <a href="/">Sub</a>
        <span>current</span>
      </>
    ),
    separator: 'slash',
  },
  parameters: {
    sekai: 'Miku',
    background: 'light',
  },
}

export const DefaultDark: Story = {
  args: {
    id: 'breadcrumb-default-dark',
    sekai: 'Miku',
    themeMode: 'dark',
    children: (
      <>
        <a href="/">Top</a>
        <a href="/">Sub</a>
        <span>current</span>
      </>
    ),
  },
  parameters: {
    sekai: 'Miku',
    background: 'dark',
  },
}

export const ArrowSeparator: Story = {
  args: {
    id: 'breadcrumb-arrow-separator-light',
    sekai: 'Miku',
    themeMode: 'light',
    children: (
      <>
        <a href="/">Top</a>
        <a href="/">Sub</a>
        <span>current</span>
      </>
    ),
    separator: 'arrow',
  },
  parameters: {
    sekai: 'Miku',
    background: 'light',
  },
}

export const ChevronSeparator: Story = {
  args: {
    id: 'breadcrumb-chevron-separator-light',
    sekai: 'Miku',
    themeMode: 'light',
    children: (
      <>
        <a href="/">Top</a>
        <a href="/">Sub</a>
        <span>current</span>
      </>
    ),
    separator: 'chevron',
  },
  parameters: {
    sekai: 'Miku',
    background: 'light',
  },
}

export const DotSeparator: Story = {
  args: {
    id: 'breadcrumb-dot-separator-light',
    sekai: 'Miku',
    themeMode: 'light',
    children: (
      <>
        <a href="/">Top</a>
        <a href="/">Sub</a>
        <span>current</span>
      </>
    ),
    separator: 'dot',
  },
  parameters: {
    sekai: 'Miku',
    background: 'light',
  },
}

export const PipeSeparator: Story = {
  args: {
    id: 'breadcrumb-pipe-separator-light',
    sekai: 'Miku',
    themeMode: 'light',
    children: (
      <>
        <a href="/">Top</a>
        <a href="/">Sub</a>
        <span>current</span>
      </>
    ),
    separator: 'pipe',
  },
  parameters: {
    sekai: 'Miku',
    background: 'light',
  },
}
