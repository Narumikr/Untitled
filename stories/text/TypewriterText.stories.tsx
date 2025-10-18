import { TypewriterText } from '@/components/text/TypewriterText'

import { COLORS_SEKAI_KEYS } from '@/styles/sekai-colors'

import type { Meta, StoryObj } from '@storybook/react'

const meta = {
  title: 'UI/TypewriterText',
  component: TypewriterText,
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
    text: {
      description: 'Text to display',
      // @ts-expect-error Storybook's typing issue
      type: { required: true },
      table: {
        type: { summary: 'string' },
      },
    },
    options: {
      description: 'Typewriter options (typing speed, loop, cursor)',
      table: {
        type: { summary: 'TypewriterTextOptions' },
        defaultValue: { summary: '{ speed: 100, loop: false, cursor: true }' },
      },
    },
  },
  args: {},
} satisfies Meta<typeof TypewriterText>

export default meta
type Story = StoryObj<typeof meta>

export const DefaultLight: Story = {
  args: {
    id: 'typewriter-text-default-light',
    sekai: 'Miku',
    themeMode: 'light',
    text: 'This is an example of TypewriterText component.',
    options: { speed: 100, loop: false, cursor: true },
  },
  parameters: {
    sekai: 'Miku',
    background: 'light',
  },
}

export const DefaultDark: Story = {
  args: {
    id: 'typewriter-text-default-dark',
    sekai: 'Miku',
    themeMode: 'dark',
    text: 'This is an example of TypewriterText component.',
    options: { speed: 100, loop: false, cursor: true },
  },
  parameters: {
    sekai: 'Miku',
    background: 'dark',
  },
}

export const LoopLight: Story = {
  args: {
    id: 'typewriter-text-loop-light',
    sekai: 'Miku',
    themeMode: 'light',
    text: 'This is an example of TypewriterText component.',
    options: { speed: 100, loop: true, cursor: true },
  },
  parameters: {
    sekai: 'Miku',
    background: 'light',
  },
}

export const LoopDark: Story = {
  args: {
    id: 'typewriter-text-loop-dark',
    sekai: 'Miku',
    themeMode: 'dark',
    text: 'This is an example of TypewriterText component.',
    options: { speed: 100, loop: true, cursor: true },
  },
  parameters: {
    sekai: 'Miku',
    background: 'dark',
  },
}
