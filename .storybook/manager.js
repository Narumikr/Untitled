import { addons } from 'storybook/manager-api'

import untitledTheme from './untitledTheme'
import './storybook.css'

addons.setConfig({
  theme: untitledTheme,
  sidebar: {
    showRoots: true,
  },
  // initialPath: 'docs',
})

// Delete existing favicon
document.querySelectorAll("link[rel*='icon']").forEach((el) => el.remove())

// Add new favicon
const link = document.createElement('link')
link.rel = 'icon'
link.type = 'image/png'
link.href = '/untitled.png'
document.head.appendChild(link)
