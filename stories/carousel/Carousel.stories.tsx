import React from 'react'

import { Carousel } from '@/components/carousel/Carousel'

import { COLORS_SEKAI_KEYS } from '@/styles/sekai-colors'

import type { Meta, StoryObj } from '@storybook/react'

const meta = {
  title: 'UI/Carousel',
  component: Carousel,
  decorators: [
    (Story) => (
      <div
        style={{
          minWidth: 500,
          maxWidth: '40vw',
          height: 250,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
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
      description: 'Carousel contents',
      // @ts-expect-error Storybook's typing issue
      type: { required: true },
      table: {
        type: { summary: 'React.ReactNode' },
      },
      control: false,
    },
    size: {
      description: 'Size of the carousel',
      table: {
        type: { summary: 'wide | normal | single' },
        defaultValue: { summary: 'normal' },
      },
      control: { type: 'select' },
      options: ['wide', 'normal', 'single'],
    },
    autoPlay: {
      description: 'Whether to auto play the slides',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
      control: { type: 'boolean' },
    },
    loopInfinite: {
      description: 'Whether to loop the slides infinitely',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
      control: { type: 'boolean' },
    },
    pagination: {
      description: 'Whether to show pagination dots',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
      control: { type: 'boolean' },
    },
  },
  args: {},
} satisfies Meta<typeof Carousel>

export default meta
type Story = StoryObj<typeof meta>

const sampleStyles: React.CSSProperties = {
  width: 390,
  height: 250,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '24px',
  color: 'white',
}

const sampleSlides = [
  <div key="1" style={{ backgroundColor: '#4455dd', ...sampleStyles }} />,
  <div key="2" style={{ backgroundColor: '#88dd44', ...sampleStyles }} />,
  <div key="3" style={{ backgroundColor: '#ee1166', ...sampleStyles }} />,
  <div key="4" style={{ backgroundColor: '#ff9900', ...sampleStyles }} />,
  <div key="5" style={{ backgroundColor: '#884499', ...sampleStyles }} />,
  <div key="6" style={{ backgroundColor: '#f5f5f7', ...sampleStyles }} />,
  <div key="7" style={{ backgroundColor: '#4455dd', ...sampleStyles }} />,
  <div key="8" style={{ backgroundColor: '#88dd44', ...sampleStyles }} />,
  <div key="9" style={{ backgroundColor: '#ee1166', ...sampleStyles }} />,
  <div key="10" style={{ backgroundColor: '#ff9900', ...sampleStyles }} />,
  <div key="11" style={{ backgroundColor: '#884499', ...sampleStyles }} />,
  <div key="12" style={{ backgroundColor: '#f5f5f7', ...sampleStyles }} />,
]

export const DefaultLight: Story = {
  args: {
    id: 'carousel-default-light',
    sekai: 'Miku',
    themeMode: 'light',
    children: sampleSlides,
    size: 'normal',
    loopInfinite: true,
    autoPlay: true,
    pagination: false,
  },
  parameters: {
    sekai: 'Miku',
    background: 'light',
  },
}

export const DefaultDark: Story = {
  args: {
    id: 'carousel-default-dark',
    sekai: 'Miku',
    themeMode: 'dark',
    children: sampleSlides,
    size: 'normal',
    loopInfinite: true,
    autoPlay: true,
    pagination: true,
  },
  parameters: {
    sekai: 'Miku',
    background: 'dark',
  },
}

export const SingleLight: Story = {
  args: {
    id: 'carousel-single-light',
    sekai: 'Miku',
    themeMode: 'light',
    children: sampleSlides,
    size: 'single',
    loopInfinite: true,
    autoPlay: true,
    pagination: false,
  },
  parameters: {
    sekai: 'Miku',
    background: 'light',
  },
}

export const WideLight: Story = {
  args: {
    id: 'carousel-wide-light',
    sekai: 'Miku',
    themeMode: 'light',
    children: sampleSlides,
    size: 'wide',
    loopInfinite: true,
    autoPlay: true,
    pagination: false,
  },
  parameters: {
    sekai: 'Miku',
    background: 'light',
  },
}

export const PaginationLight: Story = {
  args: {
    id: 'carousel-pagination-light',
    sekai: 'Miku',
    themeMode: 'light',
    children: sampleSlides,
    size: 'normal',
    loopInfinite: true,
    autoPlay: true,
    pagination: true,
  },
  parameters: {
    sekai: 'Miku',
    background: 'light',
  },
}
