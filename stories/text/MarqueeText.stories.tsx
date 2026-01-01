import React from 'react'

import { MarqueeText } from '@/components/text/MarqueeText'

import { COLORS_SEKAI_KEYS } from '@/styles/sekai-colors'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'UI/MarqueeText',
  component: MarqueeText,
  decorators: [
    (Story) => (
      <div
        style={{
          width: 390,
          maxWidth: '80vw',
          height: 150,
          display: 'flex',
          alignItems: 'center',
        }}>
        <Story />
      </div>
    ),
  ],
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
      description: 'MarqueeText contents',
      // @ts-expect-error Storybook's typing issue
      type: { required: true },
      table: { type: { summary: 'React.ReactNode' } },
      control: false,
    },
    duration: {
      description: 'Scroll duration in seconds',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: 'calculated based on text width' },
      },
      control: { type: 'number' },
    },
    parentBackgroundColor: {
      description: 'Background color of the parent element',
      table: {
        type: { summary: 'string' },
      },
      control: false,
    },
  },
  args: {},
} satisfies Meta<typeof MarqueeText>

export default meta
type Story = StoryObj<typeof meta>

const StringChildren =
  'Ellipsis (…) is used in the MarqueeText component to indicate that a string has overflowed.'
const ComponentChildren = (
  <span>For non-primitive content, the overflow is shown with a faded background overlay.</span>
)

export const StringLight: Story = {
  args: {
    id: 'marquee-text-string-light',
    sekai: 'Miku',
    themeMode: 'light',
    children: StringChildren,
    duration: 0,
    parentBackgroundColor: undefined,
  },
  parameters: {
    sekai: 'Miku',
    background: 'light',
  },
}

export const StringDark: Story = {
  args: {
    id: 'marquee-text-string-dark',
    sekai: 'Miku',
    themeMode: 'dark',
    children: StringChildren,
    duration: 0,
    parentBackgroundColor: undefined,
  },
  parameters: {
    sekai: 'Miku',
    background: 'dark',
  },
}

export const ComponentLight: Story = {
  args: {
    id: 'marquee-text-component-light',
    sekai: 'Miku',
    themeMode: 'light',
    children: ComponentChildren,
    duration: 0,
    parentBackgroundColor: undefined,
  },
  parameters: {
    sekai: 'Miku',
    background: 'light',
  },
}

export const ComponentDark: Story = {
  args: {
    id: 'marquee-text-component-dark',
    sekai: 'Miku',
    themeMode: 'dark',
    children: ComponentChildren,
    duration: 0,
    parentBackgroundColor: undefined,
  },
  parameters: {
    sekai: 'Miku',
    background: 'dark',
  },
}
