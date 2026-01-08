import { fn } from 'storybook/test'

import { Chip } from '@/components/select/Chip'

import { COLORS_SEKAI_KEYS } from '@/styles/sekai-colors'

import type { Meta, StoryObj } from '@storybook/react'

const meta = {
  title: 'UI/Chip',
  component: Chip,
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
        type: { summary: 'React.Ref<HTMLDivElement>' },
      },
      control: false,
    },
    label: {
      description: 'Label text',
      table: {
        type: { summary: 'string' },
      },
      // @ts-expect-error Storybook's typing issue
      type: { required: true },
    },
    onClick: {
      description: 'Click handler',
      table: {
        type: { summary: '() => void' },
      },
      control: false,
    },
    onDelete: {
      description: 'Delete handler',
      table: {
        type: { summary: '() => void' },
      },
      control: false,
    },
    size: {
      description: 'Chip size',
      table: {
        type: { summary: 'small | medeium | large' },
        defaultValue: { summary: 'medium' },
      },
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
    },
    variant: {
      description: 'Chip variant',
      table: {
        type: { summary: 'filled | outlined' },
        defaultValue: { summary: 'filled' },
      },
      control: { type: 'select' },
      options: ['filled', 'outlined'],
    },
  },
  args: {
    onClick: fn(),
    onDelete: fn(),
  },
} satisfies Meta<typeof Chip>

export default meta
type Story = StoryObj<typeof meta>

export const DefaultLight: Story = {
  args: {
    id: 'chip-default-light',
    sekai: 'Miku',
    themeMode: 'light',
    label: 'Hatsune Miku',
    size: 'medium',
    variant: 'filled',
  },
  parameters: {
    sekai: 'Miku',
    background: 'light',
  },
}

export const DefaultDark: Story = {
  args: {
    id: 'chip-default-dark',
    sekai: 'Miku',
    themeMode: 'dark',
    label: 'Hatsune Miku',
    size: 'medium',
    variant: 'filled',
  },
  parameters: {
    sekai: 'Miku',
    background: 'dark',
  },
}

export const SmallLight: Story = {
  args: {
    id: 'chip-small-light',
    sekai: 'Miku',
    themeMode: 'light',
    label: 'Hatsune Miku',
    size: 'small',
    variant: 'filled',
  },
  parameters: {
    sekai: 'Miku',
    background: 'light',
  },
}

export const LargeLight: Story = {
  args: {
    id: 'chip-large-light',
    sekai: 'Miku',
    themeMode: 'light',
    label: 'Hatsune Miku',
    size: 'large',
    variant: 'filled',
  },
  parameters: {
    sekai: 'Miku',
    background: 'light',
  },
}

export const OutlineLight: Story = {
  args: {
    id: 'chip-outlined-light',
    sekai: 'Miku',
    themeMode: 'light',
    label: 'Hatsune Miku',
    size: 'medium',
    variant: 'outlined',
  },
  parameters: {
    sekai: 'Miku',
    background: 'light',
  },
}
