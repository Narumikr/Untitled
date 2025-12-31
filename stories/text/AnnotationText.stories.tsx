import { AnnotationText } from '@/components/text/UtilText'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'UI/AnnotationText',
  component: AnnotationText,
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
      description: 'Text to display',
      table: {
        type: { summary: 'string' },
      },
    },
  },
  args: {},
} satisfies Meta<typeof AnnotationText>

export default meta
type Story = StoryObj<typeof meta>

export const DefaultLight: Story = {
  args: {
    id: 'annotation-text-default-light',
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
    id: 'annotation-text-default-dark',
    themeMode: 'dark',
    children: 'Hello SEKAI',
  },
  parameters: {
    sekai: 'Miku',
    background: 'dark',
  },
}
