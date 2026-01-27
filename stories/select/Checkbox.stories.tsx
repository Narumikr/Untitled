import { fn } from 'storybook/test'

import { Checkbox } from '@/components/select/Checkbox'

import { COLORS_SEKAI_KEYS } from '@/styles/sekai-colors'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'UI/Checkbox',
  component: Checkbox,
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
    ref: {
      description: 'Ref to the root element',
      table: {
        type: { summary: 'React.Ref<HTMLInputElement>' },
      },
      control: false,
    },
    checked: {
      description: 'Controls whether the checkbox is checked',
      table: {
        type: { summary: 'boolean' },
      },
    },
    disabled: {
      description: 'Controls whether the checkbox is disabled',
      table: {
        type: { summary: 'boolean' },
      },
    },
    onChange: {
      description: 'Callback fired when the checkbox state changes',
      table: {
        type: { summary: '(value: boolean) => void' },
      },
    },
    filling: {
      description: 'Whether to use filling style',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
      control: { type: 'boolean' },
    },
  },
  args: {
    onChange: fn(),
  },
} satisfies Meta<typeof Checkbox>

export default meta
type Story = StoryObj<typeof meta>

export const DefaultLight: Story = {
  args: {
    id: 'checkbox-default-light',
    sekai: 'Miku',
    themeMode: 'light',
    checked: true,
    disabled: false,
    filling: false,
  },
  parameters: {
    sekai: 'Miku',
    background: 'light',
  },
}

export const DefaultDark: Story = {
  args: {
    id: 'checkbox-default-dark',
    sekai: 'Miku',
    themeMode: 'dark',
    checked: true,
    disabled: false,
    filling: false,
  },
  parameters: {
    sekai: 'Miku',
    background: 'dark',
  },
}

export const FillingLight: Story = {
  args: {
    id: 'checkbox-default-light',
    sekai: 'Miku',
    themeMode: 'light',
    checked: true,
    disabled: false,
    filling: true,
  },
  parameters: {
    sekai: 'Miku',
    background: 'light',
  },
}

export const FiilingDark: Story = {
  args: {
    id: 'checkbox-default-dark',
    sekai: 'Miku',
    themeMode: 'dark',
    checked: true,
    disabled: false,
    filling: true,
  },
  parameters: {
    sekai: 'Miku',
    background: 'dark',
  },
}
