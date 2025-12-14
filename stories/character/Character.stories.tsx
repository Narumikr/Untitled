import { COLORS_SEKAI_KEYS } from '@/styles/sekai-colors'

import { Character } from './Character'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Special/SekaiCharacter',
  component: Character,
  parameters: {},
  tags: ['autodocs'],
  argTypes: {
    sekai: {
      description: 'What SEKAI color to use',
      table: {
        type: { summary: 'ColorsSekaiKey' },
      },
      control: { type: 'select' },
      options: [...Object.keys(COLORS_SEKAI_KEYS)],
    },
    locale: {
      description: 'What language to use for character name',
      table: {
        type: { summary: 'string' },
      },
      control: { type: 'select' },
      options: ['ja', 'en', 'zh-hant'],
    },
  },
  args: {},
} satisfies Meta<typeof Character>

export default meta
type Story = StoryObj<typeof meta>

export const SEKAICharacter: Story = {
  args: {
    sekai: 'Miku',
    locale: 'ja',
  },
  parameters: {
    sekai: 'Miku',
    background: 'light',
  },
}
