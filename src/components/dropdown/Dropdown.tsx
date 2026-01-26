import React, {
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'

import clsx from 'clsx'

import { ChevronSvg } from '@/img/chevron'
import { useOptionalSekai } from '@/internal/useOptionalSekai'
import { convertHexToRgba, convertHexToRgbaMixWithBlackOrWhite } from '@/utils/converter'

import globalStyles from '@/styles/global.module.scss'

import styles from './Dropdown.module.scss'

import type { PaletteMode } from '@/hooks/useThemeMode'
import type { ColorsSekaiKey } from '@/styles/sekai-colors'

const MAX_OPTION_LENGTH = 5
const OPTION_ITEM_HEIGHT = 40
const BUTTON_BORDER_WIDTH = 2

export interface DropdownOption {
  label: string
  value: string
}

export interface DropdownProps {
  id?: string
  className?: string
  style?: React.CSSProperties
  sekai?: ColorsSekaiKey
  themeMode?: PaletteMode
  ref?: React.Ref<HTMLDivElement>
  options: DropdownOption[]
  defaultValue?: string
  onSelect: (value: string) => void
  placeholder?: string
}

export const Dropdown = (props: DropdownProps) => {
  const displayText = props.placeholder || props.defaultValue || ''
  return (
    <DropdownProvider displayText={displayText}>
      <DropdownContent {...props} />
    </DropdownProvider>
  )
}

interface DropdownContextProps {
  openOptions: boolean
  setOpenOptions: (open: boolean) => void
  selectedValue: string
  setSelectedValue: (value: string) => void
}

const DropdownContext = createContext<DropdownContextProps | null>(null)

interface DropdownProviderProps {
  children: React.ReactNode
  displayText?: string
}

const DropdownProvider = ({ children, displayText }: DropdownProviderProps) => {
  const [openOptions, setOpenOptions] = useState(false)
  const [selectedValue, setSelectedValue] = useState(displayText || '')

  return (
    <DropdownContext.Provider
      value={{ openOptions, setOpenOptions, selectedValue, setSelectedValue }}>
      {children}
    </DropdownContext.Provider>
  )
}

export const DropdownContent = ({
  sekai,
  themeMode,
  options,
  onSelect,
  placeholder,
  ref,
  ...rest
}: DropdownProps) => {
  const { sekaiColor, modeTheme } = useOptionalSekai({ sekai, mode: themeMode })
  const wrapDropdownRef = useRef<HTMLDivElement>(null)
  const triggerButtonRef = useRef<HTMLButtonElement>(null)
  const { openOptions, setOpenOptions } = useContext(DropdownContext) || {}

  // Merge internal ref and forwarded ref
  const setRefs = useCallback(
    (element: HTMLDivElement | null) => {
      wrapDropdownRef.current = element

      if (typeof ref === 'function') {
        ref(element)
      } else if (ref) {
        ;(ref as React.RefObject<HTMLDivElement | null>).current = element
      }
    },
    [ref],
  )

  const [dropdownPosStyle, setDropdownPosStyle] = useState<React.CSSProperties>()
  useEffect(() => {
    const refTriggerButton = triggerButtonRef.current
    if (openOptions && refTriggerButton) {
      const triggerButtonRect = refTriggerButton.getBoundingClientRect()
      const optionLength =
        options.length > MAX_OPTION_LENGTH ? MAX_OPTION_LENGTH : options.length
      const optionsHeight = OPTION_ITEM_HEIGHT * optionLength
      const dropdownBottom = triggerButtonRect.bottom + optionsHeight
      const overflow = dropdownBottom - window.innerHeight
      const offSetY = overflow > 0 ? overflow + 20 : -1 * BUTTON_BORDER_WIDTH

      setDropdownPosStyle({
        top: `calc(${OPTION_ITEM_HEIGHT}px - ${offSetY}px)`,
      })
    }
  }, [openOptions, options.length])

  // Close the dropdown when clicking outside of it
  useEffect(() => {
    const clickOutside = (event: MouseEvent | TouchEvent) => {
      const refWrapDropdown = wrapDropdownRef.current
      if (refWrapDropdown && !refWrapDropdown.contains(event.target as Node)) {
        setOpenOptions?.(false)
      }
    }

    document.addEventListener('mousedown', clickOutside)
    document.addEventListener('touchstart', clickOutside)

    return () => {
      document.removeEventListener('mousedown', clickOutside)
      document.removeEventListener('touchstart', clickOutside)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Set the width of the trigger button to match the options list
  const [triggerWidth, setTriggerWidth] = useState(0)
  useEffect(() => {
    const button = triggerButtonRef.current
    if (!button) return

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const contentWidth = entry.contentRect.width
        const contentPosX = entry.contentRect.x
        setTriggerWidth(contentWidth + contentPosX * 2 + BUTTON_BORDER_WIDTH * 2)
      }
    })

    observer.observe(button)

    return () => observer.disconnect()
  }, [])

  const optionStyle = useMemo(
    () => ({
      width: `${triggerWidth}px`,
    }),
    [triggerWidth],
  )

  return (
    <div
      {...rest}
      ref={setRefs}
      className={clsx(styles[`sekai-dropdown-${modeTheme}`], rest.className)}
      style={{ '--sekai-color': sekaiColor, ...(rest.style || {}) } as React.CSSProperties}>
      <DropdownTriggerButton
        ref={triggerButtonRef}
        sekai={sekai}
        themeMode={themeMode}
        options={options}
        placeholder={placeholder}
      />
      <DropdownOptions
        style={{ ...(optionStyle as React.CSSProperties), ...dropdownPosStyle }}
        sekai={sekai}
        themeMode={themeMode}
        options={options}
        onSelect={onSelect}
      />
    </div>
  )
}

type DropdownTriggerButtonProps = Pick<
  DropdownProps,
  'sekai' | 'themeMode' | 'options' | 'placeholder'
> & {
  ref?: React.Ref<HTMLButtonElement>
}

const DropdownTriggerButton = forwardRef<HTMLButtonElement, DropdownTriggerButtonProps>(
  ({ sekai, themeMode, options, placeholder }, ref) => {
    const { sekaiColor, modeTheme } = useOptionalSekai({ sekai, mode: themeMode })
    const { selectedValue, openOptions, setOpenOptions } = useContext(DropdownContext) || {}

    const optionStyle = {
      '--sekai-color': sekaiColor,
    }

    const displayText = useMemo(() => {
      const selectedOption = options.find((option) => option.value === selectedValue)
      return selectedOption ? selectedOption.label : placeholder
    }, [options, selectedValue, placeholder])

    const isDispPlaceholder = useMemo(
      () => placeholder === displayText,
      [placeholder, displayText],
    )

    const handleClick = () => {
      setOpenOptions?.(!openOptions)
    }

    return (
      <button
        ref={ref}
        type="button"
        className={styles[`sekai-dropdown-trigger-${modeTheme}`]}
        onClick={handleClick}
        style={optionStyle as React.CSSProperties}>
        <span className={clsx({ [styles['sekai-placeholder']]: isDispPlaceholder })}>
          {displayText}
        </span>
        <ChevronSvg
          className={clsx(styles['sekai-dropdown-icon'], {
            [styles['sekai-dropdown-icon-open']]: openOptions,
            [styles[`sekai-dropdown-icon-close`]]: !openOptions,
          })}
          sekai={sekai}
          themeMode={themeMode}
          vector="down"
        />
      </button>
    )
  },
)
DropdownTriggerButton.displayName = 'DropdownTriggerButton'

type DropdownOptionsProps = Pick<
  DropdownProps,
  'style' | 'sekai' | 'themeMode' | 'options' | 'onSelect'
>

const DropdownOptions = ({
  style,
  sekai,
  themeMode,
  options,
  onSelect,
}: DropdownOptionsProps) => {
  const { sekaiColor, modeTheme, isLight } = useOptionalSekai({ sekai, mode: themeMode })
  const { setSelectedValue, openOptions, setOpenOptions } = useContext(DropdownContext) || {}

  const sekaiColorShadow = convertHexToRgbaMixWithBlackOrWhite(sekaiColor, 0.5, isLight)
  const sekaiColorHover = convertHexToRgba(sekaiColor, isLight ? 0.1 : 0.3)
  const optionStyle = {
    '--sekai-color': sekaiColor,
    '--sekai-color-shadow': sekaiColorShadow,
    '--sekai-color-hover': sekaiColorHover,
  }

  const [isVisible, setIsVisible] = useState(false)
  const [isRendered, setIsRendered] = useState(false)
  const open = () => {
    setIsRendered(true)
    setTimeout(() => setIsVisible(true), 10)
  }
  const close = () => {
    setIsVisible(false)
    setTimeout(() => setIsRendered(false), 200)
  }
  useEffect(() => {
    if (openOptions) {
      open()
    } else {
      close()
    }
  }, [openOptions])

  const handleSelect = (value: string) => {
    onSelect(value)
    setSelectedValue?.(value)
    setOpenOptions?.(false)
  }

  return isRendered ? (
    <ul
      className={clsx(
        styles['sekai-dropdown-options-list'],
        {
          [styles['sekai-dropdown-options-open']]: isVisible,
          [styles['sekai-dropdown-options-close']]: !isVisible,
        },
        globalStyles[`sekai-color-${modeTheme}`],
      )}
      style={{ ...(optionStyle as React.CSSProperties), ...style }}>
      {options.map((option) => (
        <li key={option.value} className={clsx(styles['sekai-dropdown-option-item'])}>
          <button
            className={clsx(globalStyles[`sekai-color-${modeTheme}`])}
            onClick={() => handleSelect(option.value)}>
            {option.label}
          </button>
        </li>
      ))}
    </ul>
  ) : null
}
