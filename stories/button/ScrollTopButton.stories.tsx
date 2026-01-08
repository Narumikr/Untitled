import React from 'react'

import { ScrollTopButton } from '@/components/button/ScrollTopButton'

import { COLORS_SEKAI_KEYS } from '@/styles/sekai-colors'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'UI/ScrollTopButton',
  component: ScrollTopButton,
  decorators: [
    (Story) => (
      <div
        style={{
          width: 500,
          height: 1000,
        }}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      disable: true,
    },
    invisible: true,
  },
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
        type: { summary: 'React.Ref<HTMLButtonElement>' },
      },
      control: false,
    },
    pos: {
      description: 'Position of the button',
      table: {
        type: { summary: 'bottom-right | bottom-left' },
        defaultValue: { summary: 'bottom-right' },
      },
      control: { type: 'select' },
      options: ['bottom-right', 'bottom-left'],
    },
  },
  args: {},
} satisfies Meta<typeof ScrollTopButton>

export default meta
type Story = StoryObj<typeof meta>

export const DefaultLight: Story = {
  args: {
    id: 'scroll-top-button-default-light',
    sekai: 'Miku',
    themeMode: 'light',
  },
  parameters: {
    sekai: 'Miku',
    background: 'light',
  },
}

export const DefaultDark: Story = {
  args: {
    id: 'scroll-top-button-default-dark',
    sekai: 'Miku',
    themeMode: 'dark',
  },
  parameters: {
    sekai: 'Miku',
    background: 'dark',
  },
}
