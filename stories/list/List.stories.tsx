import React from 'react'

import { List } from '@/components/list/List'

import { COLORS_SEKAI_KEYS } from '@/styles/sekai-colors'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'UI/List',
  component: List,
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
        type: { summary: 'React.Ref<HTMLUListElement> | React.Ref<HTMLOListElement>' },
      },
      control: false,
    },
    children: {
      description: 'List contents',
      // @ts-expect-error Storybook's typing issue
      type: { required: true },
      table: {
        type: { summary: 'React.ReactNode' },
      },
      control: false,
    },
    as: {
      description: 'List base component',
      table: {
        type: { summary: 'ul | ol' },
        defaultValue: { summary: 'ul' },
      },
      control: { type: 'select' },
      options: ['ul', 'ol'],
    },
    noBullet: {
      description: 'Remove bullet list style',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
      control: { type: 'boolean' },
    },
  },
  args: {},
} satisfies Meta<typeof List>

export default meta
type Story = StoryObj<typeof meta>

const sample = ['Sample 1', 'Sample 2', 'Sample 3']

export const BulletLight: Story = {
  args: {
    id: 'list-bullet-light',
    sekai: 'Miku',
    themeMode: 'light',
    children: sample.map((el) => <li key={el}>{el}</li>),
    as: 'ul',
    noBullet: false,
  },
  parameters: {
    sekai: 'Miku',
    background: 'light',
  },
}

export const BulletDark: Story = {
  args: {
    id: 'list-bullet-dark',
    sekai: 'Miku',
    themeMode: 'dark',
    children: sample.map((el) => <li key={el}>{el}</li>),
    as: 'ul',
    noBullet: false,
  },
  parameters: {
    sekai: 'Miku',
    background: 'dark',
  },
}

export const OrderLight: Story = {
  args: {
    id: 'list-order-light',
    sekai: 'Miku',
    themeMode: 'light',
    children: sample.map((el) => <li key={el}>{el}</li>),
    as: 'ol',
    noBullet: false,
  },
  parameters: {
    sekai: 'Miku',
    background: 'light',
  },
}

export const OrderDark: Story = {
  args: {
    id: 'list-order-dark',
    sekai: 'Miku',
    themeMode: 'dark',
    children: sample.map((el) => <li key={el}>{el}</li>),
    as: 'ol',
    noBullet: false,
  },
  parameters: {
    sekai: 'Miku',
    background: 'dark',
  },
}
