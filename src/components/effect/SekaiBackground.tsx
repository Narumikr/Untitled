import React, { useEffect, useRef } from 'react'

import clsx from 'clsx'
import { createPortal } from 'react-dom'

import { usePortalContainer } from '@/internal/usePortalContainer'

import styles from './SekaiBackground.module.scss'

const PINK = `rgba(255, 186, 241, `
const YELLOW = `rgba(255, 247, 148, `
const AQUA = `rgba(149, 253, 255, `

class PieceOfSekai {
  x = 0
  y = 0
  size = 0
  speedX = 0
  speedY = 0
  rotation = 0
  rotationSpeed = 0
  opacity = 0
  age = 0
  vertex1Y = 0
  vertex2X = 0
  vertex3X = 0

  fadeInDuration = 2500
  fullOpacityDuration = 2000 * (2 + Math.random() * 4)
  fadeOutDuration = 2500
  lifetime = this.fadeInDuration + this.fullOpacityDuration + this.fadeOutDuration

  color = ''

  constructor(
    private canvas: HTMLCanvasElement,
    private ctx: CanvasRenderingContext2D,
  ) {
    this.reset()
  }

  reset() {
    this.x = Math.random() * this.canvas.width
    this.y = Math.random() * this.canvas.height
    this.size = 20 + Math.random() * 60
    this.speedX = (Math.random() - 0.5) * 0.5
    this.speedY = (Math.random() - 0.5) * 0.5
    this.rotation = Math.random() * Math.PI * 2
    this.rotationSpeed = (Math.random() - 0.5) * 0.02
    this.opacity = 0
    this.age = 0
    this.color = getColor()

    this.vertex1Y = -(this.size / 6 + Math.random() * this.size * 0.7)
    this.vertex2X = -(this.size / 3 + Math.random() * this.size * 0.9)
    this.vertex3X = this.size / 8 + Math.random() * this.size * 0.5
  }

  update(deltaTime: number) {
    this.x += this.speedX
    this.y += this.speedY
    this.rotation += this.rotationSpeed
    this.age += deltaTime

    if (this.age < this.fadeInDuration) {
      this.opacity = this.age / this.fadeInDuration
    } else if (this.age < this.fadeInDuration + this.fullOpacityDuration) {
      this.opacity = 1
    } else if (this.age < this.lifetime) {
      const progress =
        (this.age - this.fadeInDuration - this.fullOpacityDuration) / this.fadeOutDuration
      this.opacity = 1 - progress
    }

    if (this.age >= this.lifetime) {
      this.reset()
    }
  }

  draw() {
    this.ctx.save()
    this.ctx.translate(this.x, this.y)
    this.ctx.rotate(this.rotation)
    this.ctx.globalAlpha = this.opacity

    this.ctx.beginPath()
    this.ctx.moveTo(0, this.vertex1Y)
    this.ctx.lineTo(this.vertex2X, this.size / 2)
    this.ctx.lineTo(this.vertex3X, this.size / 2)
    this.ctx.closePath()

    this.ctx.fillStyle = this.color + this.opacity + ')'
    this.ctx.fill()

    this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)'
    this.ctx.lineWidth = 2
    this.ctx.stroke()

    this.ctx.restore()
  }
}

const getColor = () => {
  const colorIndex = Math.floor(Math.random() * 3)
  switch (colorIndex) {
    case 0:
      return PINK
    case 1:
      return YELLOW
    case 2:
    default:
      return AQUA
  }
}

export interface SekaiBackgroundProps {
  id?: string
  className?: string
  style?: React.CSSProperties
  containerComponent?: HTMLElement
  bgOpacity?: number
}

export const SekaiBackground = ({
  containerComponent,
  bgOpacity,
  ...rest
}: SekaiBackgroundProps) => {
  const portalContainer = usePortalContainer(containerComponent)

  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return

    const resize = () => {
      if (!portalContainer) return
      canvas.width = portalContainer.offsetWidth
      canvas.height = portalContainer.offsetHeight
    }

    resize()
    window.addEventListener('resize', resize)

    const pieces: PieceOfSekai[] = []
    const pieceCount = 39
    for (let i = 0; i < pieceCount; i++) {
      const t = new PieceOfSekai(canvas, ctx)
      t.age = Math.random() ** 2 * t.lifetime
      pieces.push(t)
    }

    let lastTime = 0

    const animate = (time: number) => {
      const delta = time - lastTime
      lastTime = time

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      pieces.forEach((tri) => {
        tri.update(delta)
        tri.draw()
      })

      requestAnimationFrame(animate)
    }

    animate(0)

    return () => {
      window.removeEventListener('resize', resize)
    }
  }, [portalContainer])

  const optionStyle = {
    '--bg-opacity': bgOpacity !== undefined ? bgOpacity : 0.25,
    ...(containerComponent && { position: 'absolute' }),
  }

  if (!portalContainer) return null

  return createPortal(
    <div
      {...rest}
      className={clsx(styles['sekai-background-wrap'], rest.className)}
      style={{ ...(optionStyle as React.CSSProperties), ...rest.style }}>
      <canvas ref={canvasRef} className={clsx(styles['sekai-background'])} />
    </div>,
    portalContainer,
  )
}
