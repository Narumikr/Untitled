import React from 'react'

import { fn } from 'storybook/test'

import { SideMenu } from '@/components/sidemenu/SideMenu'

import { COLORS_SEKAI_KEYS } from '@/styles/sekai-colors'

import type { Meta, StoryObj } from '@storybook/react'

const meta = {
  title: 'UI/SideMenu',
  component: SideMenu,
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
    open: {
      description: 'SideMenu open',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
      control: { type: 'boolean' },
    },
    onClick: {
      description: 'Callback when hamburger button is clicked',
      table: {
        type: { summary: '() => void' },
      },
      control: false,
    },
    children: {
      description: 'SideMenu contents',
      // @ts-expect-error Storybook's typing issue
      type: { required: true },
      table: { type: { summary: 'React.ReactNode' } },
      control: false,
    },
    pos: {
      description: 'SideMenu position',
      table: {
        type: { summary: "'left' | 'right'" },
        defaultValue: { summary: 'left' },
      },
      control: { type: 'select' },
      options: ['left', 'right'],
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
    onClick: fn(),
  },
} satisfies Meta<typeof SideMenu>

const PropsChildren = () => (
  <div>
    {Array.from({ length: 25 }).map((_, index) => (
      <p key={index} style={{ margin: '8px 0', width: '100%' }}>
        Item {index + 1}
      </p>
    ))}
  </div>
)

export default meta
type Story = StoryObj<typeof meta>

export const DefaultLight: Story = {
  args: {
    id: 'side-menu-default-light',
    sekai: 'Miku',
    themeMode: 'light',
    open: false,
    children: <PropsChildren />,
    pos: 'left',
  },
  parameters: {
    sekai: 'Miku',
    background: 'light',
    portal: true,
  },
}

export const DefaultDark: Story = {
  args: {
    id: 'side-menu-default-dark',
    sekai: 'Miku',
    themeMode: 'dark',
    open: false,
    children: <PropsChildren />,
    pos: 'left',
  },
  parameters: {
    sekai: 'Miku',
    background: 'dark',
    portal: true,
  },
}

export const PosRightLight: Story = {
  args: {
    id: 'side-menu-pos-right-light',
    sekai: 'Miku',
    themeMode: 'light',
    open: false,
    children: <PropsChildren />,
    pos: 'right',
  },
  parameters: {
    sekai: 'Miku',
    background: 'light',
    portal: true,
  },
}

export const PosRightDark: Story = {
  args: {
    id: 'side-menu-pos-right-dark',
    sekai: 'Miku',
    themeMode: 'dark',
    open: false,
    children: <PropsChildren />,
    pos: 'right',
  },
  parameters: {
    sekai: 'Miku',
    background: 'dark',
    portal: true,
  },
}
