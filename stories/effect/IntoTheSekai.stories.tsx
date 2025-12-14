import { fn } from 'storybook/test'

import { IntoTheSekai } from '@/components/effect/IntoTheSekai'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Special/IntoTheSekai',
  component: IntoTheSekai,
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
    execEvent: {
      description: 'Event triggered when the animation ends',
      table: {
        type: { summary: 'Function' },
      },
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
  },
  args: {
    execEvent: fn(),
  },
} satisfies Meta<typeof IntoTheSekai>

export default meta
type Story = StoryObj<typeof meta>

export const DefaultLight: Story = {
  args: {
    id: 'into-the-sekai-default-light',
  },
  parameters: {
    sekai: 'Miku',
    background: 'light',
    portal: true,
  },
}

export const DefaultDark: Story = {
  args: {
    id: 'into-the-sekai-default-dark',
  },
  parameters: {
    sekai: 'Miku',
    background: 'dark',
    portal: true,
  },
}
