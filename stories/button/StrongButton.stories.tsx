import { fn } from 'storybook/test'

import { StrongButton } from '@/components/button/StrongButton'

import { COLORS_SEKAI_KEYS } from '@/styles/sekai-colors'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'UI/StrongButton',
  component: StrongButton,
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
        type: { summary: 'React.Ref<HTMLButtonElement>' },
      },
      control: false,
    },
    children: {
      description: 'Button contents',
      table: { type: { summary: 'React.ReactNode' } },
      control: false,
    },
    disabled: {
      description: 'Button disabled',
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
    },
    onClick: {
      description: 'Click handler',
      table: { type: { summary: '() => void' } },
    },
  },
  args: { onClick: fn() },
} satisfies Meta<typeof StrongButton>

export default meta
type Story = StoryObj<typeof meta>

export const DefaultLight: Story = {
  args: {
    id: 'strong-button-default-light',
    sekai: 'Miku',
    themeMode: 'light',
    children: 'Hatsune Miku',
    disabled: false,
  },
  parameters: {
    sekai: 'Miku',
    background: 'light',
  },
}

export const DefaultDark: Story = {
  args: {
    id: 'strong-button-default-dark',
    sekai: 'Miku',
    themeMode: 'dark',
    children: 'Hatsune Miku',
    disabled: false,
  },
  parameters: {
    sekai: 'Miku',
    background: 'dark',
  },
}

export const DisabledLight: Story = {
  args: {
    id: 'strong-button-disabled-light',
    sekai: 'Miku',
    themeMode: 'light',
    children: 'Hatsune Miku',
    disabled: true,
  },
  parameters: {
    sekai: 'Miku',
    background: 'light',
  },
}

export const DisabledtDark: Story = {
  args: {
    id: 'strong-button-disabled-dark',
    sekai: 'Miku',
    themeMode: 'dark',
    children: 'Hatsune Miku',
    disabled: true,
  },
  parameters: {
    sekai: 'Miku',
    background: 'dark',
  },
}
