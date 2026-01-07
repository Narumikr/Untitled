import { fn } from 'storybook/test'

import { WindowDialog } from '@/components/dialog/WindowDialog'

import { COLORS_SEKAI_KEYS } from '@/styles/sekai-colors'

import type { ColorsSekaiKey } from '@/styles/sekai-colors'
import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'UI/WindowDialog',
  component: WindowDialog,
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
    open: {
      description: 'WindowDialog open',
      // @ts-expect-error Storybook's typing issue
      type: { required: true },
      table: {
        type: { summary: 'boolean' },
      },
    },
    children: {
      description: 'WindowDialog contents',
      // @ts-expect-error Storybook's typing issue
      type: { required: true },
      table: { type: { summary: 'React.ReactNode' } },
      control: false,
    },
    containerComponent: {
      description: 'Target element where the portal content will be rendered',
      table: {
        type: { summary: 'HTMLElement' },
        defaultValue: { summary: 'document.body' },
      },
      control: false,
    },
    size: {
      description: 'WindowDialog size',
      table: {
        type: { summary: 'WindowDialogSize' },
        defaultValue: { summary: 'medium' },
      },
      control: 'select',
      options: ['narrow', 'medium', 'wide'],
    },
    onClose: {
      description: 'WindowDialog close method',
      // @ts-expect-error Storybook's typing issue
      type: { required: true },
      table: { type: { summary: '() => void' } },
    },
  },
  args: {
    onClose: fn(),
  },
} satisfies Meta<typeof WindowDialog>

export default meta
type Story = StoryObj<typeof meta>

const commonArgs = {
  sekai: COLORS_SEKAI_KEYS.Miku as ColorsSekaiKey,
  open: true,
  children: 'WindowDialog Contents',
}

export const LightMedium: Story = {
  args: {
    ...commonArgs,
    id: 'WindowDialog-light-medium',
    themeMode: 'light',
    size: 'medium',
  },
  parameters: {
    sekai: 'Miku',
    background: 'light',
    portal: true,
  },
}

export const DarkMedium: Story = {
  args: {
    ...commonArgs,
    id: 'WindowDialog-dark-medium',
    themeMode: 'dark',
    size: 'medium',
  },
  parameters: {
    sekai: 'Miku',
    background: 'dark',
    portal: true,
  },
}
