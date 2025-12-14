import { DoReMeetEffect } from '@/components/effect/DoReMeetEffect'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Special/DoReMeetEffect',
  component: DoReMeetEffect,
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
    sekaiKeys: {
      description: 'What SEKAI colors to use effect',
      table: {
        type: { summary: 'ColorsSekaiKey[]' },
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
    text: {
      description: 'Text to display',
      // @ts-expect-error Storybook's typing issue
      type: { required: true },
      table: {
        type: { summary: 'string' },
      },
    },
    duration: {
      description: 'Time interval (in ms) for the color change effect',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '250' },
      },
    },
  },
  args: {},
} satisfies Meta<typeof DoReMeetEffect>

export default meta
type Story = StoryObj<typeof meta>

export const DefaultLight: Story = {
  args: {
    id: 'do-re-meet-effect-default-light',
    sekaiKeys: ['Miku', 'Kanade', 'Haruka', 'Nene', 'An', 'Saki'],
    themeMode: 'light',
    text: '劇場版プロセカのエンドロールでのドレミファソラシド〜🎶演出をイメージ! Click me!',
    duration: 250,
  },
  parameters: {
    sekai: 'Miku',
    background: 'light',
  },
}

export const DefaultDark: Story = {
  args: {
    id: 'do-re-meet-effect-default-dark',
    sekaiKeys: ['Miku', 'Kanade', 'Haruka', 'Nene', 'An', 'Saki'],
    themeMode: 'dark',
    text: '劇場版プロセカのエンドロールでのドレミファソラシド〜🎶演出をイメージ! Click me!',
    duration: 250,
  },
  parameters: {
    sekai: 'Miku',
    background: 'dark',
  },
}
