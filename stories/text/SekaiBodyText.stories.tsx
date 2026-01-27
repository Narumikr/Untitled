import { SekaiBodyText } from '@/components/text/UtilText'

import { COLORS_SEKAI_KEYS } from '@/styles/sekai-colors'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'UI/SekaiBodyText',
  component: SekaiBodyText,
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
        type: { summary: 'React.Ref<HTMLParagraphElement>' },
      },
      control: false,
    },
    children: {
      description: 'Text to display',
      table: {
        type: { summary: 'string' },
      },
      control: false,
    },
  },
  args: {},
} satisfies Meta<typeof SekaiBodyText>

export default meta
type Story = StoryObj<typeof meta>

export const DefaultLight: Story = {
  args: {
    id: 'sekai-body-text-default-light',
    sekai: 'Miku',
    themeMode: 'light',
    children: 'Hello SEKAI',
  },
  parameters: {
    sekai: 'Miku',
    background: 'light',
  },
}

export const DefaultDark: Story = {
  args: {
    id: 'sekai-body-text-default-dark',
    sekai: 'Miku',
    themeMode: 'dark',
    children: 'Hello SEKAI',
  },
  parameters: {
    sekai: 'Miku',
    background: 'dark',
  },
}
