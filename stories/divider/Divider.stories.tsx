import React from 'react'

import { Divider } from '@/components/divider/Divider'

import { COLORS_SEKAI_KEYS } from '@/styles/sekai-colors'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'UI/Divider',
  component: Divider,
  decorators: [
    (Story) => (
      <div
        style={{
          width: 500,
          maxWidth: '80vw',
          height: 150,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: '1px solid #ccc',
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
    ref: {
      description: 'Ref to the root element',
      table: {
        type: { summary: 'React.Ref<HTMLDivElement>' },
      },
      control: false,
    },
    children: {
      description: 'Dialog contents',
      table: {
        type: { summary: 'React.ReactNode' },
      },
      control: false,
    },
    pairColor: {
      description: 'What SEKAI color to use for the gradient end',
      table: {
        type: { summary: 'ColorsSekaiKey' },
        defaultValue: { summary: 'undefined' },
      },
      control: { type: 'select' },
      options: [undefined, ...Object.keys(COLORS_SEKAI_KEYS)],
    },
    lineHeight: {
      description: 'Divider line height in px',
      table: {
        type: { summary: 'number | string' },
        defaultValue: { summary: '2px' },
      },
    },
    variant: {
      description: 'Divider variant',
      table: {
        type: { summary: 'fullWidth | inset | middle' },
        defaultValue: { summary: 'fullWidth' },
      },
      control: { type: 'select' },
      options: ['fullWidth', 'inset', 'middle'],
    },
    textAlign: {
      description: 'Text align when children is present',
      table: {
        type: { summary: 'left | center | right' },
        defaultValue: { summary: 'center' },
      },
      control: { type: 'select' },
      options: ['left', 'center', 'right'],
    },
    shadow: {
      description: 'Apply shadow to the divider',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
      control: { type: 'boolean' },
    },
  },
  args: {},
} satisfies Meta<typeof Divider>

export default meta
type Story = StoryObj<typeof meta>

const ViewStoryText = () => <span>Sample Text</span>

export const DefaultLight: Story = {
  args: {
    id: 'divider-default-light',
    sekai: 'Miku',
    themeMode: 'light',
    children: undefined,
    pairColor: undefined,
    lineHeight: 2,
    variant: 'fullWidth',
    textAlign: 'center',
    shadow: false,
  },
  parameters: {
    sekai: 'Miku',
    background: 'light',
  },
}

export const DefaultDark: Story = {
  args: {
    id: 'divider-default-dark',
    sekai: 'Miku',
    themeMode: 'dark',
    children: undefined,
    pairColor: undefined,
    lineHeight: 2,
    variant: 'fullWidth',
    textAlign: 'center',
    shadow: false,
  },
  parameters: {
    sekai: 'Miku',
    background: 'dark',
  },
}

export const PairColorLight: Story = {
  args: {
    id: 'divider-pair-color-light',
    sekai: 'Ichika',
    themeMode: 'light',
    children: undefined,
    pairColor: 'Saki',
    lineHeight: 2,
    variant: 'fullWidth',
    textAlign: 'center',
    shadow: false,
  },
  parameters: {
    sekai: 'Miku',
    background: 'light',
  },
}

export const PairColorDark: Story = {
  args: {
    id: 'divider-pair-color-dark',
    sekai: 'Ichika',
    themeMode: 'dark',
    children: undefined,
    pairColor: 'Saki',
    lineHeight: 2,
    variant: 'fullWidth',
    textAlign: 'center',
    shadow: false,
  },
  parameters: {
    sekai: 'Miku',
    background: 'dark',
  },
}

export const InsetLight: Story = {
  args: {
    id: 'divider-inset-light',
    sekai: 'Haruka',
    themeMode: 'light',
    children: undefined,
    pairColor: 'Minori',
    lineHeight: 2,
    variant: 'inset',
    textAlign: 'center',
    shadow: false,
  },
  parameters: {
    sekai: 'Miku',
    background: 'light',
  },
}

export const MiddleLight: Story = {
  args: {
    id: 'divider-middle-light',
    sekai: 'An',
    themeMode: 'light',
    children: undefined,
    pairColor: 'Kohane',
    lineHeight: 2,
    variant: 'middle',
    textAlign: 'center',
    shadow: false,
  },
  parameters: {
    sekai: 'Miku',
    background: 'light',
  },
}

export const TextCenterLight: Story = {
  args: {
    id: 'divider-text-center-light',
    sekai: 'Kanade',
    themeMode: 'light',
    children: <ViewStoryText />,
    pairColor: 'Mafuyu',
    lineHeight: 2,
    variant: 'fullWidth',
    textAlign: 'center',
    shadow: false,
  },
  parameters: {
    sekai: 'Miku',
    background: 'light',
  },
}

export const TextCenterDark: Story = {
  args: {
    id: 'divider-text-center-dark',
    sekai: 'Kanade',
    themeMode: 'dark',
    children: <ViewStoryText />,
    pairColor: 'Mafuyu',
    lineHeight: 2,
    variant: 'fullWidth',
    textAlign: 'center',
    shadow: false,
  },
  parameters: {
    sekai: 'Miku',
    background: 'dark',
  },
}

export const TextLeftLight: Story = {
  args: {
    id: 'divider-text-left-light',
    sekai: 'Nene',
    themeMode: 'light',
    children: <ViewStoryText />,
    pairColor: 'Emu',
    lineHeight: 2,
    variant: 'fullWidth',
    textAlign: 'left',
    shadow: false,
  },
  parameters: {
    sekai: 'Miku',
    background: 'light',
  },
}

export const TextRightLight: Story = {
  args: {
    id: 'divider-text-right-light',
    sekai: 'Akito',
    themeMode: 'light',
    children: <ViewStoryText />,
    pairColor: 'Toya',
    lineHeight: 2,
    variant: 'fullWidth',
    textAlign: 'right',
    shadow: false,
  },
  parameters: {
    sekai: 'Miku',
    background: 'light',
  },
}

export const ShadowLight: Story = {
  args: {
    id: 'divider-shadow-light',
    sekai: 'Miku',
    themeMode: 'light',
    children: <ViewStoryText />,
    pairColor: 'Luka',
    lineHeight: 2,
    variant: 'fullWidth',
    textAlign: 'center',
    shadow: true,
  },
  parameters: {
    sekai: 'Miku',
    background: 'light',
  },
}

export const ShadowDark: Story = {
  args: {
    id: 'divider-shadow-dark',
    sekai: 'Airi',
    themeMode: 'dark',
    children: <ViewStoryText />,
    pairColor: 'Shizuku',
    lineHeight: 2,
    variant: 'fullWidth',
    textAlign: 'center',
    shadow: true,
  },
  parameters: {
    sekai: 'Miku',
    background: 'dark',
  },
}
