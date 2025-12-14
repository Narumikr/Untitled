import { fn } from 'storybook/test'

import { Toast } from '@/components/toast/Toast'

import { COLORS_SEKAI_KEYS } from '@/styles/sekai-colors'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'UI/Toast',
  component: Toast,
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
    sekai: {
      description: 'What SEKAI color to use',
      table: {
        type: { summary: 'ColorsSekaiKey' },
        defaultValue: { summary: 'Miku' },
      },
      control: { type: 'select' },
      options: [...Object.keys(COLORS_SEKAI_KEYS)],
    },
    style: {
      description: 'Style object',
      table: {
        type: { summary: 'React.CSSProperties' },
      },
      control: false,
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
      description: 'Whether the toast is open',
      // @ts-expect-error Storybook's typing issue
      type: { required: true },
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    onClose: {
      description: 'Callback when the toast is closed',
      // @ts-expect-error Storybook's typing issue
      type: { required: true },
      table: {
        type: { summary: '() => void' },
      },
      control: false,
    },
    pos: {
      description: 'Toast position',
      table: {
        type: { summary: 'ToastPosition' },
        defaultValue: { summary: 'bottom' },
      },
      control: { type: 'select' },
      options: ['top', 'bottom'],
    },
    message: {
      description: 'Toast message content',
      // @ts-expect-error Storybook's typing issue
      type: { required: true },
      table: {
        type: { summary: 'string | string[]' },
      },
    },
    isError: {
      description: 'Whether the toast indicates an error',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    duration: {
      description: 'Duration in milliseconds before the toast closes',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '3000' },
      },
    },
    containerComponent: {
      description: 'Target element where the portal content will be rendered',
      table: {
        type: { summary: 'HTMLElement' },
        defaultValue: { summary: 'document.body' },
      },
      control: false,
    },
  },
  args: {
    onClose: fn(),
  },
} satisfies Meta<typeof Toast>

export default meta
type Story = StoryObj<typeof meta>

export const DefaultLight: Story = {
  args: {
    id: 'toast-default-light',
    sekai: 'Miku',
    themeMode: 'light',
    open: true,
    message: 'This is a Toast',
    pos: 'bottom',
    isError: false,
    duration: 3000,
  },
  parameters: {
    sekai: 'Miku',
    background: 'light',
    portal: true,
  },
}

export const DefaultDark: Story = {
  args: {
    id: 'toast-default-dark',
    sekai: 'Miku',
    themeMode: 'dark',
    open: true,
    message: 'This is a Toast',
    pos: 'bottom',
    isError: false,
    duration: 3000,
  },
  parameters: {
    sekai: 'Miku',
    background: 'dark',
    portal: true,
  },
}

export const TopLight: Story = {
  args: {
    id: 'toast-top-light',
    sekai: 'Miku',
    themeMode: 'light',
    open: true,
    message: 'This is a Toast',
    pos: 'top',
    isError: false,
    duration: 3000,
  },
  parameters: {
    sekai: 'Miku',
    background: 'light',
    portal: true,
  },
}

export const TopDark: Story = {
  args: {
    id: 'toast-top-dark',
    sekai: 'Miku',
    themeMode: 'dark',
    open: true,
    message: 'This is a Toast',
    pos: 'top',
    isError: false,
    duration: 3000,
  },
  parameters: {
    sekai: 'Miku',
    background: 'dark',
    portal: true,
  },
}

export const MultilineLight: Story = {
  args: {
    id: 'toast-multiline-light',
    sekai: 'Miku',
    themeMode: 'light',
    open: true,
    message: ['This is a Toast', 'with multiple lines'],
    pos: 'bottom',
    isError: false,
    duration: 3000,
  },
  parameters: {
    sekai: 'Miku',
    background: 'light',
    portal: true,
  },
}

export const MultilineDark: Story = {
  args: {
    id: 'toast-multiline-dark',
    sekai: 'Miku',
    themeMode: 'dark',
    open: true,
    message: ['This is a Toast', 'with multiple lines'],
    pos: 'bottom',
    isError: false,
    duration: 3000,
  },
  parameters: {
    sekai: 'Miku',
    background: 'dark',
    portal: true,
  },
}

export const ErrorLight: Story = {
  args: {
    id: 'toast-top-light',
    sekai: 'Miku',
    themeMode: 'light',
    open: true,
    message: 'An error has occurred',
    pos: 'bottom',
    isError: true,
    duration: 3000,
  },
  parameters: {
    sekai: 'Miku',
    background: 'light',
    portal: true,
  },
}

export const ErrorDark: Story = {
  args: {
    id: 'toast-Error-dark',
    sekai: 'Miku',
    themeMode: 'dark',
    open: true,
    message: 'An error has occurred',
    pos: 'bottom',
    isError: true,
    duration: 3000,
  },
  parameters: {
    sekai: 'Miku',
    background: 'dark',
    portal: true,
  },
}
