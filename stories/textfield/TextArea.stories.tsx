import React from 'react'

import { fn } from 'storybook/test'

import { TextArea } from '@/components/textfield/TextArea'

import { COLORS_SEKAI_KEYS } from '@/styles/sekai-colors'

import type { Meta, StoryObj } from '@storybook/react'

const meta = {
  title: 'UI/TextArea',
  component: TextArea,
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
    value: {
      description: 'The text to display in the textarea',
      table: {
        type: { summary: 'string' },
      },
    },
    onChange: {
      description: 'Callback triggered on value change',
      table: {
        type: { summary: '(value: string) => void' },
      },
      control: false,
    },
    placeholder: {
      description: 'Placeholder text',
      table: {
        type: { summary: 'string' },
      },
    },
    disabled: {
      description: 'textarea disabled',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    maxLength: {
      description: 'Maximum input length',
      table: {
        type: { summary: 'number' },
      },
    },
    resize: {
      description: 'Textarea resize style',
      table: {
        type: { summary: 'none | both | horizontal | vertical' },
        defaultValue: { summary: 'none' },
      },
      control: { type: 'select' },
      options: ['none', 'both', 'horizontal', 'vertical'],
    },
  },
  args: {
    onChange: fn(),
    style: { width: '100%', height: '100%' },
  },
} satisfies Meta<typeof TextArea>

export default meta
type Story = StoryObj<typeof meta>

export const DefaultLight: Story = {
  args: {
    id: 'text-area-default-light',
    sekai: 'Miku',
    themeMode: 'light',
    value: '',
    placeholder: '入力できます。',
    disabled: false,
    maxLength: 0,
    resize: 'none',
  },
  parameters: {
    sekai: 'Miku',
    background: 'light',
  },
}

export const DefaultDark: Story = {
  args: {
    id: 'text-area-default-dark',
    sekai: 'Miku',
    themeMode: 'dark',
    value: '',
    placeholder: '入力できます。',
    disabled: false,
    maxLength: 0,
    resize: 'none',
  },
  parameters: {
    sekai: 'Miku',
    background: 'dark',
  },
}
