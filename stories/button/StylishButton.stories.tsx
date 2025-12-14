import { fn } from 'storybook/test'

import { StylishButton } from '@/components/button/StylishButton'

import { COLORS_SEKAI_KEYS } from '@/styles/sekai-colors'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'UI/StylishButton',
  component: StylishButton,
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
      description: 'Button contents',
      table: { type: { summary: 'React.ReactNode' } },
    },
    disabled: {
      description: 'Button disabled',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    onClick: {
      description: 'Click handler',
      table: {
        type: { summary: '() => void' },
      },
    },
    arrowIcon: {
      description: 'Show arrow icon',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
  },
  args: { onClick: fn() },
} satisfies Meta<typeof StylishButton>

export default meta
type Story = StoryObj<typeof meta>

export const DefaultLight: Story = {
  args: {
    id: 'stylish-button-default-light',
    sekai: 'Miku',
    themeMode: 'light',
    children: 'Hatsune Miku',
    disabled: false,
    arrowIcon: true,
  },
  parameters: {
    sekai: 'Miku',
    background: 'light',
  },
}

export const DefaultDark: Story = {
  args: {
    id: 'stylish-button-default-dark',
    sekai: 'Miku',
    themeMode: 'dark',
    children: 'Hatsune Miku',
    disabled: false,
    arrowIcon: true,
  },
  parameters: {
    sekai: 'Miku',
    background: 'dark',
  },
}

export const DisabledLight: Story = {
  args: {
    id: 'stylish-button-disabled-light',
    sekai: 'Miku',
    themeMode: 'light',
    children: 'Hatsune Miku',
    disabled: true,
    arrowIcon: true,
  },
  parameters: {
    sekai: 'Miku',
    background: 'light',
  },
}

export const DisabledDark: Story = {
  args: {
    id: 'stylish-button-disabled-dark',
    sekai: 'Miku',
    themeMode: 'dark',
    children: 'Hatsune Miku',
    disabled: true,
    arrowIcon: true,
  },
  parameters: {
    sekai: 'Miku',
    background: 'dark',
  },
}
