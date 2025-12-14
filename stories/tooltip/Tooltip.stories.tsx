import React from 'react'

import { Tooltip } from '@/components/tooltip/Tooltip'

import { COLORS_SEKAI_KEYS } from '@/styles/sekai-colors'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'UI/Tooltip',
  component: Tooltip,
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
    sekai: {
      description: 'What SEKAI color to use',
      table: {
        type: { summary: 'ColorsSekaiKey' },
        defaultValue: { summary: 'Miku' },
      },
      control: { type: 'select' },
      options: [...Object.keys(COLORS_SEKAI_KEYS)],
    },
    style: {
      description: 'Style object',
      table: {
        type: { summary: 'React.CSSProperties' },
      },
      control: false,
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
      description: 'Tooltip contents',
      // @ts-expect-error Storybook's typing issue
      type: { required: true },
      table: { type: { summary: 'React.ReactNode' } },
    },
    text: {
      description: 'Tooltip text',
      // @ts-expect-error Storybook's typing issue
      type: { required: true },
      table: {
        type: { summary: 'string' },
      },
    },
    pos: {
      description: 'Tooltip position',
      table: {
        type: { summary: 'TooltipPosition' },
        defaultValue: { summary: 'top' },
      },
      control: { type: 'select' },
      options: ['top', 'bottom'],
    },
  },
  args: {},
} satisfies Meta<typeof Tooltip>

export default meta
type Story = StoryObj<typeof meta>

const SampleText = () => <p style={{ margin: 0 }}>This is sample text for check tooltip</p>

export const TopLight: Story = {
  args: {
    id: 'tooltip-top-light',
    sekai: 'Miku',
    themeMode: 'light',
    children: <SampleText />,
    text: 'This is a tooltip',
    pos: 'top',
  },
  parameters: {
    sekai: 'Miku',
    background: 'light',
  },
}

export const TopDark: Story = {
  args: {
    id: 'tooltip-top-dark',
    sekai: 'Miku',
    themeMode: 'dark',
    children: <SampleText />,
    text: 'This is a tooltip',
    pos: 'top',
  },
  parameters: {
    sekai: 'Miku',
    background: 'dark',
  },
}

export const BottomLight: Story = {
  args: {
    id: 'tooltip-bottom-light',
    sekai: 'Miku',
    themeMode: 'light',
    children: <SampleText />,
    text: 'This is a tooltip',
    pos: 'bottom',
  },
  parameters: {
    sekai: 'Miku',
    background: 'light',
  },
}

export const BottomDark: Story = {
  args: {
    id: 'tooltip-bottom-dark',
    sekai: 'Miku',
    themeMode: 'dark',
    children: <SampleText />,
    text: 'This is a tooltip',
    pos: 'bottom',
  },
  parameters: {
    sekai: 'Miku',
    background: 'dark',
  },
}
