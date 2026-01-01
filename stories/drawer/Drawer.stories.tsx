import React from 'react'

import { fn } from 'storybook/test'

import { Drawer } from '@/components/drawer/Drawer'

import { COLORS_SEKAI_KEYS } from '@/styles/sekai-colors'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'UI/Drawer',
  component: Drawer,
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
      description: 'Drawer open',
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
      description: 'Drawer contents',
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
    onClose: {
      description: 'Drawer close method',
      // @ts-expect-error Storybook's typing issue
      type: { required: true },
      table: { type: { summary: '() => void' } },
    },
    pos: {
      description: 'Drawer position',
      table: {
        type: { summary: 'DrawerPosition' },
        defaultValue: { summary: 'right' },
      },
      control: { type: 'select' },
      options: ['right', 'left', 'top', 'bottom'],
    },
  },
  args: {
    onClose: fn(),
  },
} satisfies Meta<typeof Drawer>

export default meta
type Story = StoryObj<typeof meta>

export const DefaultLight: Story = {
  args: {
    id: 'drawer-default-light',
    themeMode: 'light',
    open: true,
    children: <></>,
    pos: 'right',
  },
  parameters: {
    sekai: 'Miku',
    background: 'light',
    portal: true,
  },
}

export const DefaultDark: Story = {
  args: {
    id: 'drawer-default-dark',
    themeMode: 'dark',
    open: true,
    children: <></>,
    pos: 'right',
  },
  parameters: {
    sekai: 'Miku',
    background: 'dark',
    portal: true,
  },
}

export const PositionLeft: Story = {
  args: {
    id: 'drawer-position-left',
    themeMode: 'light',
    open: true,
    children: <></>,
    pos: 'left',
  },
  parameters: {
    sekai: 'Miku',
    background: 'light',
    portal: true,
  },
}

export const PositionTop: Story = {
  args: {
    id: 'drawer-position-top',
    themeMode: 'light',
    open: true,
    children: <></>,
    pos: 'top',
  },
  parameters: {
    sekai: 'Miku',
    background: 'light',
    portal: true,
  },
}

export const PositionBottom: Story = {
  args: {
    id: 'drawer-position-bottom',
    themeMode: 'light',
    open: true,
    children: <></>,
    pos: 'bottom',
  },
  parameters: {
    sekai: 'Miku',
    background: 'light',
    portal: true,
  },
}
