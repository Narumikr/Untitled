import React, { useMemo } from 'react'

import { YourSekaiProvider } from '@/components/provider/YourSekaiProvider'

import { DARK_MODE, LIGHT_MODE } from '@/hooks/useThemeMode'
import { createSekai } from '@/utils/createSekai'

import { COLORS_SEKAI_KEYS } from '@/styles/sekai-colors'

import type { PaletteMode } from '@/hooks/useThemeMode'
import type { ColorsSekaiKey } from '@/styles/sekai-colors'
import type { StoryContext, StoryFn } from '@storybook/react-vite'

interface CustomDocsDecoratorsProps {
  story: StoryFn
  context: StoryContext
}

export const CustomDocsDecorators = ({ story: Story, context }: CustomDocsDecoratorsProps) => {
  const sekai: ColorsSekaiKey = context.parameters.sekai || COLORS_SEKAI_KEYS.Miku
  const isDark = DARK_MODE === context.parameters.background
  const modeTheme = isDark ? DARK_MODE : LIGHT_MODE
  const isDocs = context.viewMode === 'docs'
  const isPortal: boolean = context.parameters.portal
  const isPortalDocsPreview = isPortal && isDocs

  const storySekai = useMemo<ColorsSekaiKey>(() => sekai, [sekai])
  const storyMode = useMemo<PaletteMode>(() => modeTheme, [modeTheme])

  const sekaiTheme = useMemo(
    () =>
      createSekai({
        palette: {
          sekai: storySekai,
          mode: storyMode,
        },
      }),
    [storySekai, storyMode],
  )

  return (
    <YourSekaiProvider
      sekaiTheme={sekaiTheme}
      options={{ disableStoreSekai: true, disableStoreTheme: true }}>
      {Story(
        {
          ...context.args,
          ...(isPortalDocsPreview && {
            containerComponent: getContainerPortalRoot(context, isDocs) ?? undefined,
          }),
        },
        context,
      )}
    </YourSekaiProvider>
  )
}

const getContainerPortalRoot = (context: StoryContext, isDocs: boolean) => {
  const isPrimary = context.canvasElement.id.indexOf('primary') !== -1
  const nodeList = document.querySelectorAll(`#anchor--${context.id}`) || []
  return isDocs
    ? nodeList.length > 1
      ? nodeList[isPrimary ? 0 : 1]?.querySelector('.docs-story')
      : document.getElementById(`anchor--${context.id}`)?.querySelector('.docs-story')
    : document.body
}
