import React from 'react'

import { fn } from 'storybook/test'

import { List } from '@/components/list/List'
import { ListItemButton } from '@/components/list/ListItemButton'

import { COLORS_SEKAI_KEYS } from '@/styles/sekai-colors'

import type { ListItemButtonProps } from '@/components/list/ListItemButton'
import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'UI/ListItemButton',
  component: ListItemButton,
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
      description: 'ListItemButton contents',
      // @ts-expect-error Storybook's typing issue
      type: { required: true },
      table: { type: { summary: 'React.ReactNode' } },
    },
    icon: {
      description: 'Icon src or component',
      table: {
        type: { summary: 'string | React.ReactNode' },
      },
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
} satisfies Meta<typeof ListItemButton>

export default meta
type Story = StoryObj<typeof meta>

const TemplateStory = {
  render: (args: ListItemButtonProps) => {
    return (
      <List sekai={args.sekai} themeMode={args.themeMode}>
        <ListItemButton {...args}>Sample 1</ListItemButton>
        <ListItemButton {...args}>Sample 2</ListItemButton>
      </List>
    )
  },
}

export const DefaultLight: Story = {
  ...TemplateStory,
  args: {
    id: 'list-item-button-default-light',
    sekai: 'Miku',
    themeMode: 'light',
    children: <></>,
    icon: undefined,
    disabled: false,
  },
  parameters: {
    sekai: 'Miku',
    background: 'light',
  },
}

export const DefaultDark: Story = {
  ...TemplateStory,
  args: {
    id: 'list-item-button-default-dark',
    sekai: 'Miku',
    themeMode: 'dark',
    children: <></>,
    icon: undefined,
    disabled: false,
  },
  parameters: {
    sekai: 'Miku',
    background: 'dark',
  },
}

export const IconLight: Story = {
  ...TemplateStory,
  args: {
    id: 'list-item-button-icon-light',
    sekai: 'Miku',
    themeMode: 'light',
    children: <></>,
    icon: '../../../stories/assets/youtube.svg',
    disabled: false,
  },
  parameters: {
    sekai: 'Miku',
    background: 'light',
  },
}

export const IconDark: Story = {
  ...TemplateStory,
  args: {
    id: 'list-item-button-icon-dark',
    sekai: 'Miku',
    themeMode: 'dark',
    children: <></>,
    icon: '../../../stories/assets/youtube.svg',
    disabled: false,
  },
  parameters: {
    sekai: 'Miku',
    background: 'dark',
  },
}

export const DisabledLight: Story = {
  ...TemplateStory,
  args: {
    id: 'list-item-button-disabled-light',
    sekai: 'Miku',
    themeMode: 'light',
    children: <></>,
    icon: '../../../stories/assets/youtube.svg',
    disabled: true,
  },
  parameters: {
    sekai: 'Miku',
    background: 'light',
  },
}

export const DisabledDark: Story = {
  ...TemplateStory,
  args: {
    id: 'list-item-button-disabled-dark',
    sekai: 'Miku',
    themeMode: 'dark',
    children: <></>,
    icon: '../../../stories/assets/youtube.svg',
    disabled: true,
  },
  parameters: {
    sekai: 'Miku',
    background: 'dark',
  },
}
