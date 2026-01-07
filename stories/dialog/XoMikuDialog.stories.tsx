import React from 'react'

import { fn } from 'storybook/test'

import { XoMikuDialog } from '@/components/dialog/XoMikuDialog'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Special/XoMikuDialog',
  component: XoMikuDialog,
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
      description: 'Dialog open',
      table: {
        type: { summary: 'boolean' },
      },
    },
    children: {
      description: 'Dialog contents',
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
    buttons: {
      description: 'Use Dialog default buttons',
      table: { type: { summary: 'DialogButton[]' } },
      control: { type: 'object' },
    },
  },
  args: {
    onClose: fn(),
  },
} satisfies Meta<typeof XoMikuDialog>

export default meta
type Story = StoryObj<typeof meta>

const commonArgs = {
  open: true,
  children: <span>開かれた窓のセカイのミクをイメージしたコンセプトダイアログ</span>,
  title: 'Dialog Title',
}

export const DefaultLight: Story = {
  args: {
    ...commonArgs,
    id: 'xo-miku-dialog-default-light',
    themeMode: 'light',
    size: 'medium',
    buttons: [
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
    ],
  },
  parameters: {
    sekai: 'Miku',
    background: 'light',
    portal: true,
  },
}

export const DefalutDark: Story = {
  args: {
    ...commonArgs,
    id: 'xo-miku-dialog-default-dark',
    themeMode: 'dark',
    size: 'medium',
    buttons: [
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
    ],
  },
  parameters: {
    sekai: 'Miku',
    background: 'dark',
    portal: true,
  },
}
