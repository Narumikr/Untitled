import React, { useCallback, useMemo, useState } from 'react'

import clsx from 'clsx'

import { ArrowSvg } from '@/img/arrow'
import { useOptionalSekai } from '@/internal/useOptionalSekai'
import { convertHexToRgba } from '@/utils/converter'

import styles from './Pagination.module.scss'

import type { PaletteMode } from '@/hooks/useThemeMode'
import type { ColorsSekaiKey } from '@/styles/sekai-colors'

export type PaginationSize = 'small' | 'medium' | 'large'

export interface PaginationProps {
  id?: string
  className?: string
  style?: React.CSSProperties
  sekai?: ColorsSekaiKey
  themeMode?: PaletteMode
  ref?: React.Ref<HTMLDivElement>
  count: number
  page?: number
  onChangePage?: (page: number) => void
  siblingCount?: number
  size?: PaginationSize
}

const PaginationConstants = {
  PageTop: 0,
  Ellipsis: -1,
  BorderItemRange: 2,
  DefaultSiblingCount: 1,
} as const

export const Pagination = ({
  sekai,
  themeMode,
  count,
  page,
  onChangePage,
  siblingCount = PaginationConstants.DefaultSiblingCount,
  size = 'medium',
  ...rest
}: PaginationProps) => {
  const { sekaiColor, modeTheme, isLight } = useOptionalSekai({ sekai, mode: themeMode })

  const sekaiColorHover = convertHexToRgba(sekaiColor, isLight ? 0.2 : 0.4)

  const optionStyle = {
    '--sekai-color': sekaiColor,
    '--sekai-color-hover': sekaiColorHover,
  }

  const { currentPage, handleChangePage, handlePrevPage, handleNextPage, rangePagination } =
    usePaginagion({
      count,
      page,
      onChangePage,
      siblingCount,
    })

  const ctrlButtonProps = { sekai, themeMode, size }

  return (
    <div
      {...rest}
      ref={rest.ref}
      className={clsx(styles[`sekai-pagination-${size}`], rest.className)}
      style={{ ...(optionStyle as React.CSSProperties), ...rest.style }}>
      <CtrlButton {...ctrlButtonProps} isPrev={true} onClick={handlePrevPage} />
      {rangePagination.map((item, index) => {
        if (item === PaginationConstants.Ellipsis) {
          return (
            <span key={index} className={styles['sekai-pagination-ellipsis']}>
              {'...'}
            </span>
          )
        }
        return (
          <button
            key={index}
            className={clsx(
              styles[`sekai-pagination-button-${size}`],
              styles[`sekai-color-${modeTheme}`],
              {
                [styles[`sekai-pagination-selected`]]: item === currentPage,
              },
            )}
            onClick={() => handleChangePage(item)}>
            {item + 1}
          </button>
        )
      })}
      <CtrlButton {...ctrlButtonProps} isPrev={false} onClick={handleNextPage} />
    </div>
  )
}

type CtrlButtonProps = Pick<PaginationProps, 'sekai' | 'themeMode' | 'size'> & {
  isPrev: boolean
  onClick: () => void
}

const CtrlButton = ({ size, isPrev, onClick, ...rest }: CtrlButtonProps) => {
  const vector = isPrev ? 'left' : 'right'
  return (
    <button className={clsx(styles[`sekai-pagination-button-${size}`])} onClick={onClick}>
      <ArrowSvg {...rest} vector={vector} className={styles['sekai-pagination-arrow']} />
    </button>
  )
}

type PaginationCustomHookProps = Pick<
  PaginationProps,
  'count' | 'page' | 'onChangePage' | 'siblingCount'
>
const usePaginagion = ({
  count,
  page,
  onChangePage,
  siblingCount = PaginationConstants.DefaultSiblingCount,
}: PaginationCustomHookProps) => {
  const pageLastIndex = useMemo(() => count - 1, [count])

  const [currentPage, setCurrentPage] = useState(page ?? PaginationConstants.PageTop)
  const handleChangePage = useCallback(
    (page: number) => {
      if (
        PaginationConstants.PageTop > page ||
        page > pageLastIndex ||
        page === PaginationConstants.Ellipsis
      ) {
        return
      }
      setCurrentPage(page)
      onChangePage?.(page)
    },
    [pageLastIndex, onChangePage],
  )
  const handlePrevPage = () => handleChangePage(currentPage - 1)
  const handleNextPage = () => handleChangePage(currentPage + 1)

  // Calculate the left and right sibling indices,
  // and whether to show ellipses on the left and right sides.
  const [leftSiblingIndex, rightSiblingIndex, isBorderLeftEllipsis, isBorderRightEllipsis] =
    useMemo(() => {
      const left = Math.max(
        currentPage - siblingCount,
        PaginationConstants.PageTop + PaginationConstants.BorderItemRange,
      )
      const right = Math.min(
        currentPage + siblingCount,
        pageLastIndex - PaginationConstants.BorderItemRange,
      )
      return [
        left,
        right,
        left > PaginationConstants.PageTop + PaginationConstants.BorderItemRange,
        right < pageLastIndex - PaginationConstants.BorderItemRange,
      ]
    }, [currentPage, siblingCount, pageLastIndex])

  // Total number of pagination items to display:
  // 2 items at each end + siblings on both sides + the current page
  const dispItemsCount = useMemo(() => 2 * 2 + siblingCount * 2 + 1, [siblingCount])

  const isEdgeIndex = useCallback(
    (idx: number) => {
      return (
        PaginationConstants.BorderItemRange + siblingCount > idx ||
        pageLastIndex - PaginationConstants.BorderItemRange - siblingCount < idx
      )
    },
    [pageLastIndex, siblingCount],
  )

  // Function to calculate the middle range of pagination
  const calculateMiddleRange = useCallback((): number[] => {
    if (isEdgeIndex(currentPage)) {
      const halfDisplayRange = Math.floor(Math.min(dispItemsCount, count - 1) / 2)
      const leftEdge =
        halfDisplayRange >= currentPage
          ? Math.max(2, halfDisplayRange - siblingCount)
          : Math.min(
              pageLastIndex - 2,
              Math.max(pageLastIndex - halfDisplayRange - siblingCount, halfDisplayRange),
            )
      return Array.from(
        { length: Math.min(pageLastIndex - 1, leftEdge + 1 + siblingCount * 2) - leftEdge },
        (_, i) => leftEdge + i,
      )
    } else {
      return Array.from(
        { length: rightSiblingIndex - leftSiblingIndex + 1 },
        (_, i) => leftSiblingIndex + i,
      )
    }
  }, [
    currentPage,
    siblingCount,
    count,
    dispItemsCount,
    isEdgeIndex,
    leftSiblingIndex,
    rightSiblingIndex,
    pageLastIndex,
  ])

  // Final range builder
  const rangePagination = useMemo(() => {
    if (count <= PaginationConstants.BorderItemRange * 2 + 1)
      return Array.from({ length: count }, (_, i) => i)

    return [
      PaginationConstants.PageTop,
      ...(isBorderLeftEllipsis && dispItemsCount < count
        ? [PaginationConstants.Ellipsis]
        : [PaginationConstants.PageTop + 1]),
      ...calculateMiddleRange(),
      ...(isBorderRightEllipsis && dispItemsCount < count
        ? [PaginationConstants.Ellipsis]
        : [pageLastIndex - 1]),
      pageLastIndex,
    ]
  }, [
    count,
    pageLastIndex,
    dispItemsCount,
    isBorderLeftEllipsis,
    isBorderRightEllipsis,
    calculateMiddleRange,
  ])

  return {
    currentPage,
    handleChangePage,
    handlePrevPage,
    handleNextPage,
    rangePagination,
  }
}
