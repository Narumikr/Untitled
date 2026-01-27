import React from 'react'

import { Card, CardContent, CardTitle } from '@/components/card/Card'

import { COLORS_SEKAI_KEYS } from '@/styles/sekai-colors'

import type { CardProps } from '@/components/card/Card'
import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'UI/Card',
  component: Card,
  decorators: [
    (Story) => (
      <div style={{ width: 390, maxWidth: '80vw', display: 'flex', justifyContent: 'center' }}>
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
      description: 'Card contents',
      // @ts-expect-error Storybook's typing issue
      type: { required: true },
      table: { type: { summary: 'React.ReactNode' } },
      control: false,
    },
  },
  args: {},
} satisfies Meta<typeof Card>

export default meta
type Story = StoryObj<typeof meta>

const TemplateStory = {
  render: (args: CardProps) => {
    const commonArgs = { sekai: args.sekai, themeMode: args.themeMode }
    return (
      <Card {...commonArgs}>
        <CardContent themeMode={args.themeMode}>
          <CardTitle {...commonArgs} title="Card Title" underline />
          {args.children}
        </CardContent>
      </Card>
    )
  },
}

export const DefaultLight: Story = {
  ...TemplateStory,
  args: {
    id: 'card-default-light',
    sekai: 'Miku',
    themeMode: 'light',
    children: (
      <p>
        Card内部でコンテンツをラップするCardContentやタイトル表示のためのCardTitleコンポーネントも提供しています
      </p>
    ),
  },
  parameters: {
    sekai: 'Miku',
    background: 'light',
  },
}

export const DefaultDark: Story = {
  ...TemplateStory,
  args: {
    id: 'card-default-dark',
    sekai: 'Miku',
    themeMode: 'dark',
    children: (
      <p>
        Card内部でコンテンツをラップするCardContentやタイトル表示のためのCardTitleコンポーネントも提供しています
      </p>
    ),
  },
  parameters: {
    sekai: 'Miku',
    background: 'dark',
  },
}
