import { NamePlate } from '@/components/text/NamePlate'

import { COLORS_SEKAI_KEYS } from '@/styles/sekai-colors'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'UI/NamePlate',
  component: NamePlate,
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
    colorCount: {
      description: 'Number of color text',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '1' },
      },
    },
  },
  args: {},
} satisfies Meta<typeof NamePlate>

export default meta
type Story = StoryObj<typeof meta>

export const DefaultLight: Story = {
  args: {
    id: 'nameplate-default-light',
    sekai: 'Miku',
    themeMode: 'light',
    text: '初音ミク',
    colorCount: 1,
  },
  parameters: {
    sekai: 'Miku',
    background: 'light',
  },
}

export const DefaultDark: Story = {
  args: {
    id: 'nameplate-default-dark',
    sekai: 'Miku',
    themeMode: 'dark',
    text: '初音ミク',
    colorCount: 1,
  },
  parameters: {
    sekai: 'Miku',
    background: 'dark',
  },
}
