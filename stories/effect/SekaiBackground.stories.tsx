import { SekaiBackground } from '@/components/effect/SekaiBackground'

import type { Meta, StoryObj } from '@storybook/react'

const meta = {
  title: 'Special/SekaiBackground',
  component: SekaiBackground,
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
    containerComponent: {
      description: 'Target element where the portal content will be rendered',
      table: {
        type: { summary: 'HTMLElement' },
        defaultValue: { summary: 'document.body' },
      },
      control: false,
    },
    bgOpacity: {
      description: 'Background opacity',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '0.3' },
      },
      control: { type: 'number' },
    },
  },
  args: {},
} satisfies Meta<typeof SekaiBackground>

export default meta
type Story = StoryObj<typeof meta>

export const DefaultLight: Story = {
  args: {
    id: 'sekai-background-default-light',
    bgOpacity: 0.3,
  },
  parameters: {
    background: 'light',
    portal: true,
  },
}

export const DefaultDark: Story = {
  args: {
    id: 'sekai-background-default-dark',
    bgOpacity: 0.3,
  },
  parameters: {
    background: 'dark',
    portal: true,
  },
}
