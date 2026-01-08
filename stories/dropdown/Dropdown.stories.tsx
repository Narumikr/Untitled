import React from 'react'

import { fn } from 'storybook/test'

import { Dropdown } from '@/components/dropdown/Dropdown'

import { COLORS_SEKAI_KEYS } from '@/styles/sekai-colors'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'UI/Dropdown',
  component: Dropdown,
  decorators: [
    (Story) => (
      <div
        style={{
          width: 500,
          maxWidth: '80vw',
          height: 150,
          display: 'flex',
          justifyContent: 'center',
        }}>
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
    options: {
      description: 'Options to display in the dropdown',
      // @ts-expect-error Storybook's typing issue
      type: { required: true },
      table: {
        type: { summary: 'DropdownOption[]' },
      },
    },
    defaultValue: {
      description: 'Default selected value, if no setting placeholder',
      table: {
        type: { summary: 'string' },
      },
    },
    onSelect: {
      description: 'Function to call when an option is selected',
      table: {
        type: { summary: '(value: string) => void' },
      },
      control: false,
    },
    placeholder: {
      description: 'Placeholder text when no option is selected',
      table: {
        type: { summary: 'string' },
      },
    },
  },
  args: {
    onSelect: fn(),
  },
} satisfies Meta<typeof Dropdown>

export default meta
type Story = StoryObj<typeof meta>

export const DefaultLight: Story = {
  args: {
    id: 'dropdown-default-light',
    sekai: 'Miku',
    themeMode: 'light',
    options: [
      { label: 'Option 1', value: 'option1' },
      { label: 'Option 2', value: 'option2' },
      { label: 'Option 3', value: 'option3' },
    ],
    defaultValue: '',
    placeholder: 'Select an option',
  },
  parameters: {
    sekai: 'Miku',
    background: 'light',
  },
}

export const DefaultDark: Story = {
  args: {
    id: 'dropdown-default-dark',
    sekai: 'Miku',
    themeMode: 'dark',
    options: [
      { label: 'Option 1', value: 'option1' },
      { label: 'Option 2', value: 'option2' },
      { label: 'Option 3', value: 'option3' },
    ],
    defaultValue: '',
    placeholder: 'Select an option',
  },
  parameters: {
    sekai: 'Miku',
    background: 'dark',
  },
}
