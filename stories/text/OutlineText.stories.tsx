import { OutlineText } from '@/components/text/OutlineText'

import { COLORS_SEKAI_KEYS } from '@/styles/sekai-colors'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'UI/OutlineText',
  component: OutlineText,
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
        type: { summary: 'React.Ref<HTMLSpanElement>' },
      },
      control: false,
    },
    text: {
      description: 'Text to display',
      table: {
        type: { summary: 'string' },
      },
    },
  },
  args: {},
} satisfies Meta<typeof OutlineText>

export default meta
type Story = StoryObj<typeof meta>

export const DefaultLight: Story = {
  args: {
    id: 'outline-text-default-light',
    sekai: 'Miku',
    themeMode: 'light',
    text: 'Project SEKAI feat. Hatsune Miku',
  },
  parameters: {
    sekai: 'Miku',
    background: 'light',
  },
}

export const DefaultDark: Story = {
  args: {
    id: 'outline-text-default-dark',
    sekai: 'Miku',
    themeMode: 'dark',
    text: 'Project SEKAI feat. Hatsune Miku',
  },
  parameters: {
    sekai: 'Miku',
    background: 'dark',
  },
}
