import React, { useEffect, useRef, useState } from 'react'

import clsx from 'clsx'

import { ChevronSvg } from '@/img/chevron'
import { useOptionalSekai } from '@/internal/useOptionalSekai'
import { convertHexToRgba } from '@/utils/converter'

import globalStyles from '@/styles/global.module.scss'

import styles from './Accordion.module.scss'

import type { PaletteMode } from '@/hooks/useThemeMode'
import type { ColorsSekaiKey } from '@/styles/sekai-colors'

export interface AccordionProps {
  id?: string
  className?: string
  style?: React.CSSProperties
  sekai?: ColorsSekaiKey
  themeMode?: PaletteMode
  ref?: React.Ref<HTMLDivElement>
  summary: string
  summaryStyles?: string
  defaultOpen?: boolean
  details: string | string[] | React.ReactNode
}

export const Accordion = ({
  sekai,
  themeMode,
  summary,
  summaryStyles,
  defaultOpen = false,
  details,
  ...rest
}: AccordionProps) => {
  const { sekaiColor, modeTheme, isLight } = useOptionalSekai({ sekai, mode: themeMode })

  const sekaiColorHover = convertHexToRgba(sekaiColor, isLight ? 0.1 : 0.3)
  const optionStyle = {
    '--sekai-color': sekaiColor,
    '--sekai-color-hover': sekaiColorHover,
  }

  const [openAccordion, setOpenAccordion] = useState(defaultOpen)
  const handleOpenClose = () => setOpenAccordion((pre) => !pre)

  return (
    <div
      {...rest}
      ref={rest.ref}
      className={clsx(styles['sekai-accordion-container'], rest.className)}
      style={{ ...(optionStyle as React.CSSProperties), ...rest.style }}>
      <button
        className={clsx(
          styles['sekai-accordion-summary'],
          globalStyles[`sekai-text-${modeTheme}`],
          summaryStyles,
        )}
        onClick={handleOpenClose}
        id="accordion-summary"
        aria-expanded={openAccordion}
        aria-controls="details-contents">
        <p className={styles['sekai-accordion-summary-text']}>{summary}</p>
        <ChevronSvg
          className={clsx(
            styles[`sekai-accordion-summary-icon`],
            openAccordion ? styles['sekai-icon-open'] : styles['sekai-icon-close'],
          )}
          sekai={sekai}
          themeMode={themeMode}
          vector="up"
        />
      </button>
      <hr className={styles['sekai-web-horizon']} />
      <AccordionDetailsContents open={openAccordion} details={details} />
    </div>
  )
}

type AccordionDetailsContentsProps = {
  open: boolean
} & Pick<AccordionProps, 'details'>

const AccordionDetailsContents = ({ open, details }: AccordionDetailsContentsProps) => {
  const refDetails = useRef<HTMLDivElement | null>(null)
  const [heightDetails, setHeightDetails] = useState(0)

  useEffect(() => {
    if (!refDetails.current) return

    if (open) {
      requestAnimationFrame(() => {
        if (refDetails.current) {
          setHeightDetails(refDetails.current.scrollHeight)
        }
      })
    }
  }, [open])

  const animationDetailsStyles = {
    maxHeight: open ? (heightDetails ? `${heightDetails}px` : 'none') : '0px',
    opacity: open ? 1 : 0,
    ...(open && { margin: '10px 0' }),
    transition: 'max-height 0.3s ease-out, opacity 0.3s ease-out, margin 0.3s ease-out',
  }

  const renderDetails = (details: string | string[] | React.ReactNode) => {
    if (isString(details)) return <DetailText text={details} />
    if (isStringArray(details)) {
      return details.map((el) => <DetailText key={el} text={el} />)
    }
    return details
  }

  return (
    <div
      ref={refDetails}
      id="details-contents"
      role="region"
      aria-labelledby="accordion-summary"
      className={styles['sekai-accordion-details']}
      style={animationDetailsStyles}>
      {renderDetails(details)}
    </div>
  )
}

const isString = (el: string | string[] | React.ReactNode) => typeof el === 'string'

const isStringArray = (el: string | string[] | React.ReactNode) => {
  return Array.isArray(el) && el.every(isString)
}

const DetailText = ({ text }: { text: string }) => (
  <p className={styles['sekai-detail-text']}>{text}</p>
)
