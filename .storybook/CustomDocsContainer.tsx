import React, { useEffect } from 'react'

import { DocsContainer } from '@storybook/addon-docs/blocks'

import { DARK_MODE, LIGHT_MODE } from '@/hooks/useThemeMode'
import {
  BACKGROUND_DARK_MODE,
  BACKGROUND_LIGHT_MODE,
  COLOR_DARK_MODE,
  COLOR_LIGHT_MODE,
} from '@/internal/color.constant'

import type { PaletteMode } from '@/hooks/useThemeMode'
import type { DocsContextProps } from '@storybook/addon-docs/blocks'

interface CustomDocsContainerProps {
  children: React.ReactNode
  context: DocsContextProps
}

export const CustomDocsContainer = ({ children, context }: CustomDocsContainerProps) => {
  const lightStoryIds = sortStories(context, LIGHT_MODE)
  const darkStoryIds = sortStories(context, DARK_MODE)
  const lightStyles = lightStoryIds
    .map((id) => createStyleForStory(id, COLOR_LIGHT_MODE, BACKGROUND_LIGHT_MODE))
    .join('\n')
  const darkStyles = darkStoryIds
    .map((id) => createStyleForStory(id, COLOR_DARK_MODE, BACKGROUND_DARK_MODE))
    .join('\n')
  const styles = lightStyles + darkStyles

  useEffect(() => {
    if (!context.componentStories().length) return
    if (context.componentStories()[0].parameters.invisible) {
      // This might break depending on the Storybook version.
      const target = document.querySelector('.docs-story')
      if (target) {
        const p = document.createElement('p')
        p.textContent = 'こちらのコンポーネントはDocsのプレビューはありません。'
        target.appendChild(p)
      }
    }
  }, [context])

  return (
    <DocsContainer context={context}>
      <div>
        <style>{styles}</style>
        {children}
      </div>
    </DocsContainer>
  )
}

const createStyleForStory = (storyId: string, textColor: string, backgroudColor: string) => {
  return `
    #anchor--${storyId} .docs-story {
      color: ${textColor} !important;
      background-color: ${backgroudColor} !important;
    }
    `
}

const sortStories = (context: DocsContextProps, mode: PaletteMode) => {
  const storyIds = Array.from(context.componentStories())
    .map((el) => (mode === el.parameters.background ? el.id : -1))
    .filter((el) => -1 !== el)
  return storyIds
}
