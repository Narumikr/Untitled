import React from 'react'

import { Accordion } from '@/components/accordion/Accordion'

import { COLORS_SEKAI_KEYS } from '@/styles/sekai-colors'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'UI/Accordion',
  component: Accordion,
  decorators: [
    (Story) => (
      <div style={{ width: 500, maxWidth: '80vw', height: 150 }}>
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
    summary: {
      description: 'Summary text',
      // @ts-expect-error Storybook's typing issue
      type: { required: true },
      table: {
        type: { summary: 'string' },
      },
    },
    summaryStyles: {
      description: 'Custom summary styles',
      table: {
        type: { summary: 'string' },
      },
      control: false,
    },
    defaultOpen: {
      description: 'Initial value for accordion open/close',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    details: {
      description: 'Details text, text list or ReactNode',
      // @ts-expect-error Storybook's typing issue
      type: { required: true },
      table: {
        type: { summary: 'string | string[] | React.ReactNode' },
      },
    },
  },
  args: {},
} satisfies Meta<typeof Accordion>

export default meta
type Story = StoryObj<typeof meta>

export const DefaultLight: Story = {
  args: {
    id: 'accordion-default-light',
    sekai: 'Miku',
    themeMode: 'light',
    summary: 'このライブラリは何？',
    defaultOpen: false,
    details: ['プへの好きが溢れて開発開始', '趣味マシマシ、こだわりマシマシ、バグ少なめ'],
  },
  parameters: {
    sekai: 'Miku',
    background: 'light',
  },
}

export const DefaultDark: Story = {
  args: {
    id: 'accordion-default-dark',
    sekai: 'Miku',
    themeMode: 'dark',
    summary: 'このライブラリは何？',
    defaultOpen: false,
    details: ['プへの好きが溢れて開発開始', '趣味マシマシ、こだわりマシマシ、バグ少なめ'],
  },
  parameters: {
    sekai: 'Miku',
    background: 'dark',
  },
}
