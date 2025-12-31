import { fn } from 'storybook/test'

import { Dialog } from '@/components/dialog/Dialog'

import { COLORS_SEKAI_KEYS } from '@/styles/sekai-colors'

import type { DialogButton } from '@/components/dialog/Dialog'
import type { ColorsSekaiKey } from '@/styles/sekai-colors'
import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'UI/Dialog',
  component: Dialog,
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
    open: {
      description: 'Dialog open',
      // @ts-expect-error Storybook's typing issue
      type: { required: true },
      table: {
        type: { summary: 'boolean' },
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
      description: 'Dialog contents',
      // @ts-expect-error Storybook's typing issue
      type: { required: true },
      table: { type: { summary: 'React.ReactNode' } },
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
      description: 'Dialog size',
      table: {
        type: { summary: 'DialogSize' },
        defaultValue: { summary: 'medium' },
      },
      control: 'select',
      options: ['narrow', 'medium', 'wide'],
    },
    onClose: {
      description: 'Dialog close method',
      // @ts-expect-error Storybook's typing issue
      type: { required: true },
      table: { type: { summary: '() => void' } },
    },
    title: {
      description: 'Dialog header title',
      table: { type: { summary: 'string' } },
    },
    showCloseIcon: {
      description: 'Whether to display close icon',
      control: { type: 'boolean' },
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
    },
    buttons: {
      description: 'Use Dialog default buttons',
      table: { type: { summary: 'DialogButton[]' } },
      control: { type: 'object' },
    },
    dialogButtons: {
      description: 'Use custom buttons component',
      table: { type: { summary: 'React.ReactNode' } },
      control: false,
    },
  },
  args: {
    onClose: fn(),
  },
} satisfies Meta<typeof Dialog>

export default meta
type Story = StoryObj<typeof meta>

const commonArgs = {
  sekai: COLORS_SEKAI_KEYS.Miku as ColorsSekaiKey,
  open: true,
  children: 'Dialog Contents',
  title: 'Dialog Title',
}

export const LightMedium: Story = {
  args: {
    ...commonArgs,
    id: 'dialog-light-medium',
    themeMode: 'light',
    size: 'medium',
    showCloseIcon: false,
    buttons: [],
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
    id: 'dialog-dark-medium',
    themeMode: 'dark',
    size: 'medium',
    showCloseIcon: false,
    buttons: [],
  },
  parameters: {
    sekai: 'Miku',
    background: 'dark',
    portal: true,
  },
}

export const LightNarrow: Story = {
  args: {
    ...commonArgs,
    id: 'dialog-light-narrow',
    themeMode: 'light',
    size: 'narrow',
    showCloseIcon: false,
    buttons: [],
  },
  parameters: {
    sekai: 'Miku',
    background: 'light',
    portal: true,
  },
}

export const DarkNarrow: Story = {
  args: {
    ...commonArgs,
    id: 'dialog-dark-narrow',
    themeMode: 'dark',
    size: 'narrow',
    showCloseIcon: false,
    buttons: [],
  },
  parameters: {
    sekai: 'Miku',
    background: 'dark',
    portal: true,
  },
}

export const LightWide: Story = {
  args: {
    ...commonArgs,
    id: 'dialog-light-wide',
    themeMode: 'light',
    size: 'wide',
    showCloseIcon: false,
    buttons: [],
  },
  parameters: {
    sekai: 'Miku',
    background: 'light',
    portal: true,
  },
}

export const DarkWide: Story = {
  args: {
    ...commonArgs,
    id: 'dialog-dark-wide',
    themeMode: 'dark',
    size: 'wide',
    showCloseIcon: false,
    buttons: [],
  },
  parameters: {
    sekai: 'Miku',
    background: 'dark',
    portal: true,
  },
}

export const CloseIconLight: Story = {
  args: {
    ...commonArgs,
    id: 'dialog-light-close-icon',
    themeMode: 'light',
    size: 'medium',
    showCloseIcon: true,
    buttons: [],
  },
  parameters: {
    sekai: 'Miku',
    background: 'light',
    portal: true,
  },
}

export const CloseIconDark: Story = {
  args: {
    ...commonArgs,
    id: 'dialog-dark-close-icon',
    themeMode: 'dark',
    size: 'medium',
    showCloseIcon: true,
    buttons: [],
  },
  parameters: {
    sekai: 'Miku',
    background: 'dark',
    portal: true,
  },
}

const buttons: DialogButton[] = [
  {
    text: 'Cancel',
    onClick: fn(),
    type: 'normal',
    disabled: false,
    ariaLabel: 'Cancel',
    buttonStyle: '',
  },
  {
    text: 'OK',
    onClick: fn(),
    type: 'normal',
    disabled: false,
    ariaLabel: 'OK',
    buttonStyle: '',
  },
  {
    text: 'OK',
    onClick: fn(),
    type: 'strong',
    disabled: false,
    ariaLabel: 'OK',
    buttonStyle: '',
  },
]
export const OneButtonsLight: Story = {
  args: {
    ...commonArgs,
    id: 'dialog-light-one-button',
    themeMode: 'light',
    buttons: [buttons[1]] as DialogButton[],
    size: 'medium',
    showCloseIcon: false,
  },
  parameters: {
    sekai: 'Miku',
    background: 'light',
    portal: true,
  },
}

export const OneButtonsDark: Story = {
  args: {
    ...commonArgs,
    id: 'dialog-dark-one-button',
    themeMode: 'dark',
    buttons: [buttons[1]] as DialogButton[],
    size: 'medium',
    showCloseIcon: false,
  },
  parameters: {
    sekai: 'Miku',
    background: 'dark',
    portal: true,
  },
}

export const DoubleButtonsLight: Story = {
  args: {
    ...commonArgs,
    id: 'dialog-light-double-button',
    themeMode: 'light',
    buttons: [buttons[0], buttons[1]] as DialogButton[],
    size: 'medium',
    showCloseIcon: false,
  },
  parameters: {
    sekai: 'Miku',
    background: 'light',
    portal: true,
  },
}

export const DoubleButtonsDark: Story = {
  args: {
    ...commonArgs,
    id: 'dialog-dark-double-button',
    themeMode: 'dark',
    buttons: [buttons[0], buttons[1]] as DialogButton[],
    size: 'medium',
    showCloseIcon: false,
  },
  parameters: {
    sekai: 'Miku',
    background: 'dark',
    portal: true,
  },
}

export const StrongButtonsLight: Story = {
  args: {
    ...commonArgs,
    id: 'dialog-light-strong-button',
    themeMode: 'light',
    buttons: [buttons[0], buttons[2]] as DialogButton[],
    size: 'medium',
    showCloseIcon: false,
  },
  parameters: {
    sekai: 'Miku',
    background: 'light',
    portal: true,
  },
}

export const StrongButtonsDark: Story = {
  args: {
    ...commonArgs,
    id: 'dialog-dark-strong-button',
    themeMode: 'dark',
    buttons: [buttons[0], buttons[2]] as DialogButton[],
    size: 'medium',
    showCloseIcon: false,
  },
  parameters: {
    sekai: 'Miku',
    background: 'dark',
    portal: true,
  },
}
