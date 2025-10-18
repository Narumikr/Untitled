import { BodyText } from '@/components/text/UtilText'

import type { Meta, StoryObj } from '@storybook/react'

const meta = {
  title: 'Untitled/BodyText',
  component: BodyText,
  parameters: {},
  tags: ['autodocs'],
  argTypes: {
    id: {
      description: 'Unique Id',
      table: {
        type: { summary: 'string' }
      }
    },
    className: {
      description: 'Custom styles',
      table: {
        type: { summary: 'string' }
      },
      control: false
    },
    style: {
      description: 'Style object',
      table: {
        type: { summary: 'React.CSSProperties' }
      },
      control: false
    },
    themeMode: {
      description: 'Light or Dark mode',
      table: {
        type: { summary: 'PaletteMode' },
        defaultValue: { summary: 'light' }
      },
      control: { type: 'select' },
      options: ['light', 'dark']
    },
    children: {
      description: 'Text to display',
      table: {
        type: { summary: 'string' }
      }
    }
  },
  args: {}
} satisfies Meta<typeof BodyText>

export default meta
type Story = StoryObj<typeof meta>

export const DefaultLight: Story = {
  args: {
    id: 'body-text-default-light',
    themeMode: 'light',
    children: 'Hello SEKAI'
  },
  parameters: {
    sekai: 'Miku',
    background: 'light'
  }
}

export const DefaultDark: Story = {
  args: {
    id: 'body-text-default-dark',
    themeMode: 'dark',
    children: 'Hello SEKAI'
  },
  parameters: {
    sekai: 'Miku',
    background: 'dark'
  }
}
