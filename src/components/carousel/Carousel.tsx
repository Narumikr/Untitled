import React from 'react'

import clsx from 'clsx'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import { Autoplay, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import { useOptionalSekai } from '@/internal/useOptionalSekai'
import { convertHexToRgbaMixWithBlackOrWhite } from '@/utils/converter'

import styles from './Carousel.module.scss'

import type { PaletteMode } from '@/hooks/useThemeMode'
import type { ColorsSekaiKey } from '@/styles/sekai-colors'
import type { SwiperRef } from 'swiper/react'
import type { SwiperModule } from 'swiper/types'

export type CarouselSize = 'wide' | 'normal' | 'single'

export interface CarouselProps {
  id?: string
  className?: string
  style?: React.CSSProperties
  sekai?: ColorsSekaiKey
  themeMode?: PaletteMode
  ref?: React.Ref<SwiperRef>
  children: React.ReactNode
  size?: CarouselSize
  autoPlay?: boolean
  loopInfinite?: boolean
  pagination?: boolean
}

export const Carousel = ({
  sekai,
  themeMode,
  children,
  size = 'normal',
  autoPlay = true,
  loopInfinite = true,
  pagination = false,
  ...rest
}: CarouselProps) => {
  const { sekaiColor, isLight } = useOptionalSekai({ sekai, mode: themeMode })
  const sekaiBulletColor = convertHexToRgbaMixWithBlackOrWhite(sekaiColor, 0.2, isLight)

  const optionStyle = {
    '--sekai-color': sekaiColor,
    '--sekai-bullet-color': sekaiBulletColor,
  }

  const swiperModules = [
    pagination ? Pagination : undefined,
    autoPlay ? Autoplay : undefined,
  ].filter(Boolean) as SwiperModule[]

  const renderChildrenWithSwiperSlide = React.Children.map(children, (child, idx) => {
    if (React.isValidElement(child)) {
      return <SwiperSlide key={`carousel-slide-${idx}`}>{child}</SwiperSlide>
    }
    return child
  })

  return (
    <Swiper
      {...rest}
      ref={rest.ref}
      className={clsx(styles['sekai-carousel'], rest.className)}
      style={{ ...(optionStyle as React.CSSProperties), ...rest.style }}
      modules={swiperModules}
      spaceBetween={25}
      slidesPerView={getSlidesPerView(size)}
      centeredSlides={true}
      loop={loopInfinite}
      speed={1500}
      autoplay={autoPlaySettings(autoPlay)}
      pagination={paginationSettings(pagination)}>
      {renderChildrenWithSwiperSlide}
    </Swiper>
  )
}

// Helper function to determine slides per view based on size
const getSlidesPerView = (size: CarouselSize): number => {
  switch (size) {
    case 'single':
      return 1
    case 'wide':
      return 4
    case 'normal':
    default:
      return 2
  }
}

// Helper function to configure autoplay settings
const autoPlaySettings = (autoPlay: boolean) => {
  if (autoPlay) {
    return {
      delay: 5000,
      pauseOnMouseEnter: true,
      disableOnInteraction: false,
    }
  }
  return undefined
}

// Helper function to configure pagination settings
const paginationSettings = (pagination: boolean) => {
  if (pagination) {
    return {
      clickable: true,
      renderBullet: (_: number, className: string) => `<span class="${className}"></span>`,
    }
  }
  return undefined
}
