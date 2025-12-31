import { fn } from 'storybook/test'

import { BasicButton } from '@/components/button/BasicButton'

import { COLORS_SEKAI_KEYS } from '@/styles/sekai-colors'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'UI/BasicButton',
  component: BasicButton,
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
    withText: {
      description: 'Apply SEKAI color to text',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
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
      description: 'Button contents',
      table: { type: { summary: 'React.ReactNode' } },
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
} satisfies Meta<typeof BasicButton>

export default meta
type Story = StoryObj<typeof meta>

export const DefaultLight: Story = {
  args: {
    id: 'basic-button-default-light',
    sekai: 'Miku',
    withText: false,
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
    id: 'basic-button-default-dark',
    sekai: 'Miku',
    withText: false,
    themeMode: 'dark',
    children: 'Hatsune Miku',
    disabled: false,
  },
  parameters: {
    sekai: 'Miku',
    background: 'dark',
  },
}

export const WithTextLight: Story = {
  args: {
    id: 'basic-button-with-text-light',
    sekai: 'Miku',
    withText: true,
    themeMode: 'light',
    children: 'Hatsune Miku',
    disabled: false,
  },
  parameters: {
    sekai: 'Miku',
    background: 'light',
  },
}

export const WithTextDark: Story = {
  args: {
    id: 'basic-button-with-text-dark',
    sekai: 'Miku',
    withText: true,
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
    id: 'basic-button-disabled-light',
    sekai: 'Miku',
    withText: false,
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
    id: 'basic-button-disabled-dark',
    sekai: 'Miku',
    withText: false,
    themeMode: 'dark',
    children: 'Hatsune Miku',
    disabled: true,
  },
  parameters: {
    sekai: 'Miku',
    background: 'dark',
  },
}
