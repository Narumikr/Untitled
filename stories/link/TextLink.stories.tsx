import { TextLink } from '@/components/link/TextLink'

import { COLORS_SEKAI_KEYS } from '@/styles/sekai-colors'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'UI/TextLink',
  component: TextLink,
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
      table: {
        type: { summary: 'string' },
      },
    },
    href: {
      description: 'URL that a link points to',
      table: {
        type: { summary: 'string' },
      },
    },
    isExternal: {
      description: 'External link or Inner link',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    disabled: {
      description: 'Whether the link is valid',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    ariaLabel: {
      description: 'Text for aria-label',
      table: {
        type: { summary: 'string' },
      },
    },
  },
  args: {},
} satisfies Meta<typeof TextLink>

export default meta
type Story = StoryObj<typeof meta>

export const DefaultLight: Story = {
  args: {
    id: 'text-link-default-light',
    sekai: 'Miku',
    themeMode: 'light',
    text: 'テキストリンク',
    href: '',
    isExternal: true,
    disabled: false,
    ariaLabel: '',
  },
  parameters: {
    sekai: 'Miku',
    background: 'light',
  },
}

export const DefaultDark: Story = {
  args: {
    id: 'text-link-default-dark',
    sekai: 'Miku',
    themeMode: 'dark',
    text: 'テキストリンク',
    href: '',
    isExternal: true,
    disabled: false,
    ariaLabel: '',
  },
  parameters: {
    sekai: 'Miku',
    background: 'dark',
  },
}
