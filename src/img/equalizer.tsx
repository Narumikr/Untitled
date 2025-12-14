import React from 'react'

import { useOptionalSekai } from '@/internal/useOptionalSekai'

import type { PaletteMode } from '@/hooks/useThemeMode'
import type { ColorsSekaiKey } from '@/styles/sekai-colors'

export interface EqualizerIconIconProps {
  className?: string
  sekai?: ColorsSekaiKey
  themeMode?: PaletteMode
}

export const EqualizerIcon = ({ className = '', sekai, themeMode }: EqualizerIconIconProps) => {
  const { sekaiColor, isLight } = useOptionalSekai({ sekai: sekai, mode: themeMode })
  const color = isLight ? '#121212' : '#ffffff'

  const barConfigs = [
    { delay: '0s', from: { height: '15px', y: '70px' }, to: { height: '50px', y: '35px' } },
    { delay: '0.2s', from: { height: '30px', y: '55px' }, to: { height: '70px', y: '15px' } },
    { delay: '0.4s', from: { height: '25px', y: '60px' }, to: { height: '65px', y: '20px' } },
    { delay: '0.1s', from: { height: '35px', y: '50px' }, to: { height: '60px', y: '25px' } },
    { delay: '0.3s', from: { height: '20px', y: '65px' }, to: { height: '45px', y: '40px' } },
  ]

  return (
    <>
      <EqualizerStyled />
      <svg
        className={className}
        viewBox="0 0 100 100"
        width="24"
        height="24"
        xmlns="http://www.w3.org/2000/svg"
        style={
          {
            '--sekai-color': sekaiColor,
            '--theme-color': color,
          } as React.CSSProperties
        }>
        {barConfigs.map((config, index) => (
          <rect
            key={index}
            className="bar"
            x={6 + index * 20}
            y={parseInt(config.from.y)}
            width="8"
            height={parseInt(config.from.height)}
            style={
              {
                'animationDelay': config.delay,
                '--from-height': config.from.height,
                '--from-y': config.from.y,
                '--to-height': config.to.height,
                '--to-y': config.to.y,
              } as React.CSSProperties
            }
          />
        ))}
      </svg>
    </>
  )
}

const EqualizerStyled = () => {
  return (
    <style>
      {`
      .bar {
        fill: var(--sekai-color);
        stroke: var(--theme-color);
        stroke-width: 1;
        animation-duration: 1s;
        animation-iteration-count: infinite;
        animation-direction: alternate;
        animation-timing-function: ease-in-out;
        animation-name: bar-animation;
      }
      
      @keyframes bar-animation {
        0% { 
          height: var(--from-height); 
          y: var(--from-y); 
        }
        100% { 
          height: var(--to-height); 
          y: var(--to-y); 
        }
      }
    `}
    </style>
  )
}
