/**
 * @description Convert hex color to rgb color
 * @param {string} hex - Hex color string (e.g., #RRGGBB)
 * @returns {string} RGB color string (e.g., rgb(255, 0, 0))
 */
export const convertHexToRgb = (hex: string) => {
  if (!/^#([0-9A-Fa-f]{6})$/.test(hex)) {
    throw new Error('Invalid hex color format. Use #RRGGBB')
  }

  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return `rgb(${r}, ${g}, ${b})`
}

/**
 * @description Convert hex color to rgba color
 * @param {string} hex - Hex color string (e.g., #RRGGBB)
 * @param {number} alpha - Alpha value (0 to 1)
 * @returns {string | undefined} RGBA color string (e.g., rgba(255, 0, 0, 0.5))
 */
export const convertHexToRgba = (hex: string, alpha = 1) => {
  if (!/^#([0-9A-Fa-f]{6})$/.test(hex)) {
    throw new Error('Invalid hex color format. Use #RRGGBB')
  }
  if (alpha < 0 || alpha > 1) {
    throw new Error('Alpha must be between 0 and 1')
  }
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}

/**
 * @description Convert hex color to rgba color mixed with black or white
 * @param {string} hex - Hex color string (e.g., #RRGGBB)
 * @param {number} mixRatio - Ratio to mix with black or white (0 to 1)
 * @param {boolean} mixWhite - true to mix with white, false to mix with black
 * @param {number | undefined} alpha - Alpha value (0 to 1), default is 1
 * @returns {string} RGBA color string (e.g., rgba(255, 0, 0, 0.5))
 */
export const convertHexToRgbaMixWithBlackOrWhite = (
  hex: string,
  mixRatio: number,
  mixWhite: boolean,
  alpha: number = 1,
) => {
  if (!/^#([0-9A-Fa-f]{6})$/.test(hex)) {
    throw new Error('Invalid hex color format. Use #RRGGBB')
  }
  if (mixRatio < 0 || mixRatio > 1) {
    throw new Error('mixRatio must be between 0 and 1')
  }
  if (alpha < 0 || alpha > 1) {
    throw new Error('alpha must be between 0 and 1')
  }
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  const mixColor = mixWhite ? 255 : 0
  const mixR = Math.round(r * mixRatio + mixColor * (1 - mixRatio))
  const mixG = Math.round(g * mixRatio + mixColor * (1 - mixRatio))
  const mixB = Math.round(b * mixRatio + mixColor * (1 - mixRatio))
  return `rgb(${mixR}, ${mixG}, ${mixB}, ${alpha})`
}
