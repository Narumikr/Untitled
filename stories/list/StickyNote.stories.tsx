import React from 'react'

import { fn } from 'storybook/test'

import { List } from '@/components/list/List'
import { StickyNote } from '@/components/list/StickyNote'

import { COLORS_SEKAI_KEYS } from '@/styles/sekai-colors'

import type { StickyNoteProps } from '@/components/list/StickyNote'
import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'UI/StickyNote',
  component: StickyNote,
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
    children: {
      description: 'StickyNote contents',
      // @ts-expect-error Storybook's typing issue
      type: { required: true },
      table: {
        type: { summary: 'React.ReactNode' },
      },
      control: false,
    },
    as: {
      description: 'StickyNote as button or text',
      table: {
        type: { summary: 'button | text' },
        defaultValue: { summary: 'button' },
      },
    },
    disabled: {
      description: 'Button disabled for setting as button',
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
    },
    onClick: {
      description: 'Click handler for setting as button',
      table: { type: { summary: '() => void' } },
    },
  },
  args: { onClick: fn() },
} satisfies Meta<typeof StickyNote>

export default meta
type Story = StoryObj<typeof meta>

const TemplateStory = {
  render: (args: StickyNoteProps) => {
    return (
      <List sekai={args.sekai}>
        <StickyNote {...args} style={{ marginBottom: 8 }}>
          Sample 1
        </StickyNote>
        <StickyNote {...args}>Sample 2</StickyNote>
      </List>
    )
  },
}

export const StickyNoteButtonLight: Story = {
  ...TemplateStory,
  args: {
    id: 'sticky-note-button-light',
    sekai: 'Miku',
    children: <></>,
    as: 'button',
    disabled: false,
  },
  parameters: {
    sekai: 'Miku',
    background: 'light',
  },
}

export const StickyNoteButtonDark: Story = {
  ...TemplateStory,
  args: {
    id: 'sticky-note-button-dark',
    sekai: 'Miku',
    children: <></>,
    as: 'button',
    disabled: false,
  },
  parameters: {
    sekai: 'Miku',
    background: 'dark',
  },
}

export const StickyNoteTextLight: Story = {
  ...TemplateStory,
  args: {
    id: 'sticky-note-text-light',
    sekai: 'Miku',
    children: <></>,
    as: 'text',
  },
  parameters: {
    sekai: 'Miku',
    background: 'light',
  },
}

export const StickyNoteTextDark: Story = {
  ...TemplateStory,
  args: {
    id: 'sticky-note-text-dark',
    sekai: 'Miku',
    children: <></>,
    as: 'text',
  },
  parameters: {
    sekai: 'Miku',
    background: 'dark',
  },
}
