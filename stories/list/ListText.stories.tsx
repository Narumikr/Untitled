import React from 'react'

import { List } from '@/components/list/List'
import { ListItemText } from '@/components/list/ListItemText'

import { COLORS_SEKAI_KEYS } from '@/styles/sekai-colors'

import type { ListItemTextProps } from '@/components/list/ListItemText'
import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'UI/ListItemText',
  component: ListItemText,
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
      description: 'ListItemText contents',
      // @ts-expect-error Storybook's typing issue
      type: { required: true },
      table: {
        type: { summary: 'React.ReactNode' },
      },
      control: false,
    },
    as: {
      description: 'ListItemText child component type',
      table: {
        type: { summary: 'p | span' },
        defaultValue: { summary: 'p' },
      },
      control: { type: 'select' },
      options: ['p', 'span'],
    },
    icon: {
      description: 'Icon src or component',
      table: {
        type: { summary: 'string | React.ReactNode' },
      },
      control: false,
    },
  },
  args: {},
} satisfies Meta<typeof ListItemText>

export default meta
type Story = StoryObj<typeof meta>

const TemplateStory = {
  render: (args: ListItemTextProps) => {
    return (
      <List sekai={args.sekai} themeMode={args.themeMode}>
        <ListItemText {...args}>Sample 1</ListItemText>
        <ListItemText {...args}>Sample 2</ListItemText>
      </List>
    )
  },
}

export const DefaultLight: Story = {
  ...TemplateStory,
  args: {
    id: 'list-item-text-default-light',
    sekai: 'Miku',
    themeMode: 'light',
    children: <></>,
    as: 'p',
    icon: undefined,
  },
  parameters: {
    sekai: 'Miku',
    background: 'light',
  },
}

export const DefaultDark: Story = {
  ...TemplateStory,
  args: {
    id: 'list-item-text-default-dark',
    sekai: 'Miku',
    themeMode: 'dark',
    children: <></>,
    as: 'p',
    icon: undefined,
  },
  parameters: {
    sekai: 'Miku',
    background: 'dark',
  },
}

export const IconLight: Story = {
  ...TemplateStory,
  args: {
    id: 'list-item-text-icon-light',
    sekai: 'Miku',
    themeMode: 'light',
    children: <></>,
    as: 'p',
    icon: '../../../stories/assets/youtube.svg',
  },
  parameters: {
    sekai: 'Miku',
    background: 'light',
  },
}

export const IconDark: Story = {
  ...TemplateStory,
  args: {
    id: 'list-item-text-icon-dark',
    sekai: 'Miku',
    themeMode: 'dark',
    children: <></>,
    as: 'p',
    icon: '../../../stories/assets/youtube.svg',
  },
  parameters: {
    sekai: 'Miku',
    background: 'dark',
  },
}
