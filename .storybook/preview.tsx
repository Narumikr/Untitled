import React from 'react'

import { CustomDocsContainer } from './CustomDocsContainer'
import { CustomDocsDecorators } from './CustomDocsDecorators'
import './storybook.css'

import type { Preview, StoryContext, StoryFn } from '@storybook/react-vite'

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    layout: 'centered',
    docs: {
      container: CustomDocsContainer,
    },
    options: {
      storySort: {
        order: ['Untitled', 'Special', 'UI'],
      },
    },
  },
  decorators: [
    (Story: StoryFn, context: StoryContext) => {
      return <CustomDocsDecorators story={Story} context={context} />
    },
  ],
}

export default preview
