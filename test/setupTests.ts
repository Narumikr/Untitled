import '@testing-library/jest-dom'

// Mock requestAnimationFrame to run synchronously
global.requestAnimationFrame = (cb) => {
  cb(0)
  return 0
}

global.cancelAnimationFrame = (id: number): void => {
  // No-op for synchronous RAF
}

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
})

// Mock scrollHeight for all HTMLElements
Object.defineProperty(HTMLElement.prototype, 'scrollHeight', {
  configurable: true,
  get: function () {
    return this._scrollHeight || 100
  },
  set: function (val) {
    this._scrollHeight = val
  },
})

// Mock scrollWidth
Object.defineProperty(HTMLElement.prototype, 'scrollWidth', {
  configurable: true,
  get: function () {
    return this._scrollWidth || 100
  },
  set: function (val) {
    this._scrollWidth = val
  },
})
