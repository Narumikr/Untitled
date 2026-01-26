import { Pagination } from '@/components/pagination/Pagination'

import { COLORS_SEKAI_KEYS } from '@/styles/sekai-colors'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'UI/Pagination',
  component: Pagination,
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
    count: {
      description: 'Total number of pages',
      // @ts-expect-error Storybook's typing issue
      type: { required: true },
      table: {
        type: { summary: 'number' },
      },
    },
    page: {
      description: 'Current page index (Page 1 index is 0)',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '1' },
      },
    },
    onChangePage: {
      description: 'Callback function when page changes',
      table: {
        type: { summary: '(page: number) => void' },
      },
      control: false,
    },
    siblingCount: {
      description: 'Number of sibling pages to show',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '1' },
      },
    },
    size: {
      description: 'Size of the pagination',
      table: {
        type: { summary: 'PaginationSize' },
        defaultValue: { summary: 'medium' },
      },
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
    },
  },
  args: {},
} satisfies Meta<typeof Pagination>

export default meta
type Story = StoryObj<typeof meta>

export const DefaultLight: Story = {
  args: {
    id: 'pagination-default-light',
    sekai: 'Miku',
    themeMode: 'light',
    count: 10,
    page: 0,
    siblingCount: 1,
    size: 'medium',
  },
  parameters: {
    sekai: 'Miku',
    background: 'light',
  },
}

export const DefaultDark: Story = {
  args: {
    id: 'pagination-default-dark',
    sekai: 'Miku',
    themeMode: 'dark',
    count: 10,
    page: 0,
    siblingCount: 1,
    size: 'medium',
  },
  parameters: {
    sekai: 'Miku',
    background: 'dark',
  },
}
