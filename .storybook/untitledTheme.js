import { create } from 'storybook/theming/create'
import untitledImage from './public/untitled.png'

export default create({
  base: 'light',

  brandTitle: 'Untitled library',
  brandUrl: './',
  brandImage: untitledImage,
  brandTarget: '_self',

  colorPrimary: '#33ccba',
  colorSecondary: '#33aaee',

  appBg: '#33aaee1a',
  appContentBg: '#f5f5f7',
  appPreviewBg: '#f5f5f7',
  appBorderColor: '#33aaee1a',
  appBorderRadius: 4,

  textColor: '#333333',
  textInverseColor: '#FFFFFF',
  textMutedColor: '#666666',

  barTextColor: '#999999',
  barSelectedColor: '#33aaee',
  barHoverColor: '#ffc800',
  barBg: '#33aaee1a',

  inputBg: '#FFFFFF',
  inputBorder: '#33aaee',
  inputTextColor: '#333333',
  inputBorderRadius: 4,

  buttonBg: '#33aaee1a',
  buttonBorder: '#33aaee2a',

  booleanBg: '#33aaee1a',
  booleanSelectedBg: '#33aaee2a',
})
