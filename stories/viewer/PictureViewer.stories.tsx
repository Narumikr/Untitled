import React from 'react'

import { PictureViewer } from '@/components/viewer/PictureViewer'

import { COLORS_SEKAI_KEYS } from '@/styles/sekai-colors'

import type { Meta, StoryObj } from '@storybook/react'

const meta = {
  title: 'UI/PictureViewer',
  component: PictureViewer,
  decorators: [
    (Story) => (
      <div
        style={{
          width: 500,
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
    ref: {
      description: 'Ref to the root element',
      table: {
        type: { summary: 'React.Ref<HTMLDivElement>' },
      },
      control: false,
    },
    imgSrc: {
      description: 'Src of the image to display',
      // @ts-expect-error Storybook's typing issue
      type: { required: true },
      table: {
        type: { summary: 'string' },
      },
    },
    alt: {
      description: 'Alt text for image',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },
    width: {
      description: 'The width of the image',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '210' },
      },
    },
    objectFit: {
      description: 'The CSS object-fit property value.',
      table: {
        type: { summary: 'contain | cover' },
        defaultValue: { summary: 'contain' },
      },
      control: { type: 'select' },
      options: ['contain', 'cover'],
    },
    containerComponent: {
      description: 'Target element where the portal content will be rendered',
      table: {
        type: { summary: 'HTMLElement' },
        defaultValue: { summary: 'document.body' },
      },
      control: false,
    },
  },
  args: {},
} satisfies Meta<typeof PictureViewer>

export default meta
type Story = StoryObj<typeof meta>

export const DefaultLight: Story = {
  args: {
    id: 'picture-viewer-default-light',
    sekai: 'Miku',
    themeMode: 'light',
    imgSrc: 'https://placehold.co/210x140/33aaee/ffc800?text=Sample',
    alt: '',
    width: 120,
  },
  parameters: {
    sekai: 'Miku',
    background: 'light',
    portal: true,
  },
}

export const DefaultDark: Story = {
  args: {
    id: 'picture-viewer-default-dark',
    sekai: 'Miku',
    themeMode: 'dark',
    imgSrc: 'https://placehold.co/210x140/33aaee/ffc800?text=Sample',
    alt: '',
    width: 120,
  },
  parameters: {
    sekai: 'Miku',
    background: 'dark',
    portal: true,
  },
}
