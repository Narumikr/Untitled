# Test Design Document

> **Project:** @naru/untitled-ui-library
> **Version:** 1.0.0
> **Last Updated:** 2025-12-28

---

## 1. Introduction

This document provides detailed test design patterns, templates, and implementation guidelines for achieving 100% test coverage in the untitled-ui-library project.

---

## 2. Component Classification

### 2.1 Component Types & Test Strategies

| Type | Components | Special Considerations |
|------|------------|----------------------|
| **Basic UI** | BasicButton, StrongButton, StylishButton, Divider | Event handlers, disabled state |
| **Form** | TextField, TextArea, Checkbox, Chip | Value changes, validation |
| **Portal** | Dialog, Tooltip, Dropdown, Drawer, Toast | Portal rendering, z-index |
| **Animation** | MarqueeText, TypewriterText, Loading | Timing, RAF mocking |
| **Effect** | SekaiBackground, IntoTheSekai, DoReMeetEffect | Canvas, animation frames |
| **Navigation** | Breadcrumb, Pagination, SideMenu | State, keyboard nav |
| **Layout** | Card, List, Accordion | Children rendering |
| **Provider** | YourSekaiProvider | Context, localStorage |

---

## 3. Test Design Patterns

### 3.1 Pattern: Standard Component Test

```typescript
/* eslint-disable max-lines-per-function */
import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { ComponentName } from '@/components/folder/ComponentName'
import type { ComponentNameProps } from '@/components/folder/ComponentName'

// === MOCKS ===
jest.mock('@/internal/useOptionalSekai', () => ({
  useOptionalSekai: jest.fn(() => ({
    sekaiColor: '#33ccba',
    modeTheme: 'light',
    isLight: true,
  })),
}))

jest.mock('@/utils/converter', () => ({
  convertHexToRgba: jest.fn((color: string, alpha: number) =>
    `rgba(51, 204, 186, ${alpha})`
  ),
}))

// === TEST SUITE ===
describe('ComponentName Component', () => {
  // Default props for most tests
  const defaultProps: ComponentNameProps = {
    // Required props here
  }

  // Reset mocks between tests
  beforeEach(() => {
    jest.clearAllMocks()
  })

  // === RENDERING ===
  describe('Rendering', () => {
    it('should render without crashing', () => {
      render(<ComponentName {...defaultProps} />)
      // Assert presence
    })

    it('should render with custom id', () => {
      render(<ComponentName {...defaultProps} id="custom-id" />)
      const element = screen.getByRole('...')  // or container.querySelector
      expect(element).toHaveAttribute('id', 'custom-id')
    })

    it('should render with custom className', () => {
      const { container } = render(
        <ComponentName {...defaultProps} className="custom-class" />
      )
      expect(container.querySelector('.custom-class')).toBeInTheDocument()
    })

    it('should render with custom styles', () => {
      const { container } = render(
        <ComponentName {...defaultProps} style={{ backgroundColor: 'red' }} />
      )
      const element = container.firstChild as HTMLElement
      expect(element).toHaveStyle('background-color: rgb(255, 0, 0)')
    })
  })

  // === PROPS ===
  describe('Props', () => {
    // Test each prop individually
    describe('propName', () => {
      it('should apply propName when provided', () => {})
      it('should use default when propName not provided', () => {})
    })
  })

  // === EVENTS ===
  describe('Event Handlers', () => {
    it('should call onClick when clicked', async () => {
      const handleClick = jest.fn()
      const user = userEvent.setup()

      render(<ComponentName {...defaultProps} onClick={handleClick} />)

      await user.click(screen.getByRole('button'))
      expect(handleClick).toHaveBeenCalledTimes(1)
    })
  })

  // === THEME ===
  describe('Theme Integration', () => {
    it('should apply sekai color CSS variables', () => {
      const { container } = render(
        <ComponentName {...defaultProps} sekai="Miku" />
      )
      const element = container.firstChild as HTMLElement
      expect(element).toHaveStyle({ '--sekai-color': '#33ccba' })
    })

    it('should apply theme mode class', () => {
      const { container } = render(
        <ComponentName {...defaultProps} themeMode="light" />
      )
      expect(container.querySelector('[class*="light"]')).toBeTruthy()
    })
  })

  // === ACCESSIBILITY ===
  describe('Accessibility', () => {
    it('should have proper ARIA attributes', () => {})
    it('should be keyboard accessible', async () => {
      const user = userEvent.setup()
      render(<ComponentName {...defaultProps} />)

      await user.tab()
      expect(screen.getByRole('button')).toHaveFocus()
    })
  })

  // === EDGE CASES ===
  describe('Edge Cases', () => {
    it('should handle null value', () => {})
    it('should handle undefined value', () => {})
    it('should handle empty string', () => {})
  })

  // === INTEGRATION ===
  describe('Integration Tests', () => {
    it('should maintain state across re-renders', () => {
      const { rerender } = render(<ComponentName {...defaultProps} />)
      // Assert initial state
      rerender(<ComponentName {...defaultProps} />)
      // Assert state preserved
    })
  })
})
```

### 3.2 Pattern: Portal Component Test

```typescript
/* eslint-disable max-lines-per-function */
import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { createPortal } from 'react-dom'

import { Dialog } from '@/components/dialog/Dialog'
import type { DialogProps } from '@/components/dialog/Dialog'

// === MOCKS ===
jest.mock('react-dom', () => {
  const actual = jest.requireActual('react-dom')
  return {
    ...actual,
    createPortal: jest.fn((element) => element),
  }
})

jest.mock('@/internal/useOptionalSekai', () => ({
  useOptionalSekai: jest.fn(() => ({
    sekaiColor: '#33ccba',
    modeTheme: 'light',
    isLight: true,
  })),
}))

jest.mock('@/internal/usePortalContainer', () => ({
  usePortalContainer: jest.fn(() => document.body),
}))

describe('Dialog Component', () => {
  const defaultProps: DialogProps = {
    open: true,
    children: <div data-testid="dialog-content">Content</div>,
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('Portal Rendering', () => {
    it('should use createPortal to render', () => {
      const portalMock = createPortal as jest.Mock
      render(<Dialog {...defaultProps} />)
      expect(portalMock).toHaveBeenCalled()
    })

    it('should render in portal container', () => {
      const mockContainer = document.createElement('div')
      const usePortalContainer = require('@/internal/usePortalContainer')
        .usePortalContainer
      usePortalContainer.mockReturnValue(mockContainer)

      const portalMock = createPortal as jest.Mock
      render(<Dialog {...defaultProps} />)

      expect(portalMock).toHaveBeenCalledWith(expect.anything(), mockContainer)
    })

    it('should not render when portal container is null', () => {
      const usePortalContainer = require('@/internal/usePortalContainer')
        .usePortalContainer
      usePortalContainer.mockReturnValue(null)

      const { container } = render(<Dialog {...defaultProps} />)
      expect(container.firstChild).toBeNull()
    })
  })

  describe('Open/Close State', () => {
    it('should render when open is true', () => {
      render(<Dialog {...defaultProps} open={true} />)
      expect(screen.getByTestId('dialog-content')).toBeInTheDocument()
    })

    it('should not render when open is false', () => {
      render(<Dialog {...defaultProps} open={false} />)
      expect(screen.queryByTestId('dialog-content')).not.toBeInTheDocument()
    })
  })

  describe('onClose Handler', () => {
    it('should call onClose when backdrop is clicked', async () => {
      const handleClose = jest.fn()
      const user = userEvent.setup()

      render(<Dialog {...defaultProps} onClose={handleClose} />)

      // Click backdrop
      await user.click(screen.getByRole('dialog').parentElement!)
      expect(handleClose).toHaveBeenCalled()
    })

    it('should call onClose when Escape key is pressed', async () => {
      const handleClose = jest.fn()
      const user = userEvent.setup()

      render(<Dialog {...defaultProps} onClose={handleClose} />)

      await user.keyboard('{Escape}')
      expect(handleClose).toHaveBeenCalled()
    })
  })

  describe('Accessibility', () => {
    it('should have role="dialog"', () => {
      render(<Dialog {...defaultProps} />)
      expect(screen.getByRole('dialog')).toBeInTheDocument()
    })

    it('should have aria-modal="true"', () => {
      render(<Dialog {...defaultProps} />)
      expect(screen.getByRole('dialog')).toHaveAttribute('aria-modal', 'true')
    })

    it('should trap focus within dialog', async () => {
      const user = userEvent.setup()
      render(
        <Dialog {...defaultProps}>
          <button>First</button>
          <button>Second</button>
        </Dialog>
      )

      await user.tab()
      expect(screen.getByText('First')).toHaveFocus()

      await user.tab()
      expect(screen.getByText('Second')).toHaveFocus()
    })
  })
})
```

### 3.3 Pattern: Form Component Test

```typescript
/* eslint-disable max-lines-per-function */
import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { TextField } from '@/components/textfield/TextField'
import type { TextFieldProps } from '@/components/textfield/TextField'

jest.mock('@/internal/useOptionalSekai', () => ({
  useOptionalSekai: jest.fn(() => ({
    sekaiColor: '#33ccba',
    modeTheme: 'light',
    isLight: true,
  })),
}))

describe('TextField Component', () => {
  const defaultProps: TextFieldProps = {
    label: 'Test Label',
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('Rendering', () => {
    it('should render input element', () => {
      render(<TextField {...defaultProps} />)
      expect(screen.getByRole('textbox')).toBeInTheDocument()
    })

    it('should render label', () => {
      render(<TextField {...defaultProps} label="Username" />)
      expect(screen.getByLabelText('Username')).toBeInTheDocument()
    })

    it('should render placeholder', () => {
      render(<TextField {...defaultProps} placeholder="Enter text" />)
      expect(screen.getByPlaceholderText('Enter text')).toBeInTheDocument()
    })
  })

  describe('Value & onChange', () => {
    it('should display initial value', () => {
      render(<TextField {...defaultProps} value="initial" onChange={() => {}} />)
      expect(screen.getByRole('textbox')).toHaveValue('initial')
    })

    it('should call onChange when typing', async () => {
      const handleChange = jest.fn()
      const user = userEvent.setup()

      render(<TextField {...defaultProps} onChange={handleChange} />)

      await user.type(screen.getByRole('textbox'), 'hello')
      expect(handleChange).toHaveBeenCalled()
    })

    it('should update value when typing (uncontrolled)', async () => {
      const user = userEvent.setup()
      render(<TextField {...defaultProps} />)

      const input = screen.getByRole('textbox')
      await user.type(input, 'test value')

      expect(input).toHaveValue('test value')
    })
  })

  describe('Disabled State', () => {
    it('should be disabled when disabled prop is true', () => {
      render(<TextField {...defaultProps} disabled />)
      expect(screen.getByRole('textbox')).toBeDisabled()
    })

    it('should not call onChange when disabled', async () => {
      const handleChange = jest.fn()
      const user = userEvent.setup()

      render(<TextField {...defaultProps} disabled onChange={handleChange} />)

      await user.type(screen.getByRole('textbox'), 'test')
      expect(handleChange).not.toHaveBeenCalled()
    })
  })

  describe('Error State', () => {
    it('should display error message', () => {
      render(<TextField {...defaultProps} error="This field is required" />)
      expect(screen.getByText('This field is required')).toBeInTheDocument()
    })

    it('should apply error styling', () => {
      const { container } = render(<TextField {...defaultProps} error="Error" />)
      expect(container.querySelector('[class*="error"]')).toBeTruthy()
    })

    it('should have aria-invalid when error', () => {
      render(<TextField {...defaultProps} error="Error" />)
      expect(screen.getByRole('textbox')).toHaveAttribute('aria-invalid', 'true')
    })
  })

  describe('forwardRef', () => {
    it('should forward ref to input element', () => {
      const ref = React.createRef<HTMLInputElement>()
      render(<TextField {...defaultProps} ref={ref} />)

      expect(ref.current).toBeInstanceOf(HTMLInputElement)
    })

    it('should allow programmatic focus', () => {
      const ref = React.createRef<HTMLInputElement>()
      render(<TextField {...defaultProps} ref={ref} />)

      ref.current?.focus()
      expect(screen.getByRole('textbox')).toHaveFocus()
    })
  })

  describe('Accessibility', () => {
    it('should associate label with input', () => {
      render(<TextField {...defaultProps} label="Email" />)
      expect(screen.getByLabelText('Email')).toBeInTheDocument()
    })

    it('should have aria-describedby for error', () => {
      render(<TextField {...defaultProps} error="Required" id="email" />)
      expect(screen.getByRole('textbox')).toHaveAttribute('aria-describedby')
    })
  })
})
```

### 3.4 Pattern: Hook Test

```typescript
import { renderHook, act } from '@testing-library/react'
import { useLocalStorage } from '@/hooks/useLocalStorage'

describe('useLocalStorage', () => {
  const key = 'test-key'

  beforeEach(() => {
    localStorage.clear()
    jest.clearAllMocks()
  })

  describe('Initial State', () => {
    it('should return default value when storage is empty', () => {
      const { result } = renderHook(() => useLocalStorage(key, 'default'))
      expect(result.current[0]).toBe('default')
    })

    it('should return stored value when available', () => {
      localStorage.setItem(key, JSON.stringify('stored'))
      const { result } = renderHook(() => useLocalStorage(key, 'default'))
      expect(result.current[0]).toBe('stored')
    })
  })

  describe('Value Updates', () => {
    it('should update state when setter is called', () => {
      const { result } = renderHook(() => useLocalStorage(key, 'initial'))

      act(() => {
        result.current[1]('updated')
      })

      expect(result.current[0]).toBe('updated')
    })

    it('should persist value to localStorage', () => {
      const { result } = renderHook(() => useLocalStorage(key, 'initial'))

      act(() => {
        result.current[1]('persisted')
      })

      expect(localStorage.getItem(key)).toBe(JSON.stringify('persisted'))
    })

    it('should support function updater', () => {
      const { result } = renderHook(() => useLocalStorage(key, 0))

      act(() => {
        result.current[1]((prev) => prev + 1)
      })

      expect(result.current[0]).toBe(1)
    })
  })

  describe('Type Handling', () => {
    it('should handle object values', () => {
      const { result } = renderHook(() =>
        useLocalStorage(key, { name: 'test' })
      )

      act(() => {
        result.current[1]({ name: 'updated' })
      })

      expect(result.current[0]).toEqual({ name: 'updated' })
    })

    it('should handle array values', () => {
      const { result } = renderHook(() => useLocalStorage(key, [1, 2, 3]))

      act(() => {
        result.current[1]([4, 5, 6])
      })

      expect(result.current[0]).toEqual([4, 5, 6])
    })

    it('should handle null values', () => {
      const { result } = renderHook(() =>
        useLocalStorage<string | null>(key, 'initial')
      )

      act(() => {
        result.current[1](null)
      })

      expect(result.current[0]).toBeNull()
    })
  })

  describe('Storage Sync', () => {
    it('should sync across tabs on storage event', () => {
      const { result } = renderHook(() => useLocalStorage(key, 'initial'))

      act(() => {
        // Simulate storage event from another tab
        const event = new StorageEvent('storage', {
          key,
          newValue: JSON.stringify('from-other-tab'),
        })
        window.dispatchEvent(event)
      })

      expect(result.current[0]).toBe('from-other-tab')
    })
  })

  describe('Error Handling', () => {
    it('should handle invalid JSON in storage', () => {
      localStorage.setItem(key, 'invalid-json')
      const { result } = renderHook(() => useLocalStorage(key, 'default'))
      expect(result.current[0]).toBe('default')
    })

    it('should handle storage errors gracefully', () => {
      const mockSetItem = jest.spyOn(Storage.prototype, 'setItem')
      mockSetItem.mockImplementation(() => {
        throw new Error('Storage full')
      })

      const { result } = renderHook(() => useLocalStorage(key, 'initial'))

      // Should not throw
      act(() => {
        result.current[1]('new-value')
      })

      expect(result.current[0]).toBe('new-value')
      mockSetItem.mockRestore()
    })
  })
})
```

### 3.5 Pattern: Utility Function Test

```typescript
import {
  convertHexToRgb,
  convertHexToRgba,
  convertHexToRgbaMixWithBlackOrWhite,
} from '@/utils/converter'

describe('converter utilities', () => {
  describe('convertHexToRgb', () => {
    describe('Normal Cases', () => {
      it('should convert 6-digit hex to rgb', () => {
        expect(convertHexToRgb('#33ccba')).toBe('rgb(51, 204, 186)')
      })

      it('should convert 3-digit hex to rgb', () => {
        expect(convertHexToRgb('#3cb')).toBe('rgb(51, 204, 187)')
      })

      it('should handle lowercase', () => {
        expect(convertHexToRgb('#aabbcc')).toBe('rgb(170, 187, 204)')
      })

      it('should handle uppercase', () => {
        expect(convertHexToRgb('#AABBCC')).toBe('rgb(170, 187, 204)')
      })
    })

    describe('Edge Cases', () => {
      it('should handle black (#000000)', () => {
        expect(convertHexToRgb('#000000')).toBe('rgb(0, 0, 0)')
      })

      it('should handle white (#ffffff)', () => {
        expect(convertHexToRgb('#ffffff')).toBe('rgb(255, 255, 255)')
      })

      it('should handle hex without hash', () => {
        expect(convertHexToRgb('33ccba')).toBe('rgb(51, 204, 186)')
      })
    })

    describe('Error Cases', () => {
      it('should handle invalid hex gracefully', () => {
        // Depending on implementation
        expect(() => convertHexToRgb('invalid')).not.toThrow()
      })
    })
  })

  describe('convertHexToRgba', () => {
    it('should convert hex to rgba with alpha', () => {
      expect(convertHexToRgba('#33ccba', 0.5)).toBe('rgba(51, 204, 186, 0.5)')
    })

    it('should handle alpha = 0', () => {
      expect(convertHexToRgba('#33ccba', 0)).toBe('rgba(51, 204, 186, 0)')
    })

    it('should handle alpha = 1', () => {
      expect(convertHexToRgba('#33ccba', 1)).toBe('rgba(51, 204, 186, 1)')
    })
  })

  describe('convertHexToRgbaMixWithBlackOrWhite', () => {
    it('should mix with white for light mode', () => {
      const result = convertHexToRgbaMixWithBlackOrWhite(
        '#33ccba',
        0.1,
        true,
        0.8
      )
      expect(result).toContain('rgba')
    })

    it('should mix with black for dark mode', () => {
      const result = convertHexToRgbaMixWithBlackOrWhite(
        '#33ccba',
        0.1,
        false,
        0.8
      )
      expect(result).toContain('rgba')
    })
  })
})
```

---

## 4. Mock Strategies

### 4.1 Internal Module Mocks

```typescript
// useOptionalSekai - Always mock for themed components
jest.mock('@/internal/useOptionalSekai', () => ({
  useOptionalSekai: jest.fn(() => ({
    sekaiColor: '#33ccba',
    modeTheme: 'light',
    isLight: true,
  })),
}))

// Dynamic mock update within test
it('should handle dark mode', () => {
  const useOptionalSekai = require('@/internal/useOptionalSekai').useOptionalSekai
  useOptionalSekai.mockReturnValue({
    sekaiColor: '#33ccba',
    modeTheme: 'dark',
    isLight: false,
  })
  // Test dark mode behavior
})
```

### 4.2 SVG Component Mocks

```typescript
// Generic SVG mock
jest.mock('@/img/chevron', () => ({
  ChevronSvg: (props: React.SVGProps<SVGSVGElement> & { vector?: string }) => (
    <svg data-testid="chevron-icon" {...props} />
  ),
}))

// Icon with specific attributes
jest.mock('@/img/close', () => ({
  CloseSvg: ({ onClick }: { onClick?: () => void }) => (
    <svg data-testid="close-icon" onClick={onClick} />
  ),
}))
```

### 4.3 Animation Mocks

```typescript
// In setupTests.ts (already configured)
global.requestAnimationFrame = (cb) => { cb(0); return 0 }
global.cancelAnimationFrame = () => {}

// For setInterval/setTimeout based animations
jest.useFakeTimers()

it('should animate over time', () => {
  render(<AnimatedComponent />)

  act(() => {
    jest.advanceTimersByTime(1000)
  })

  // Assert animation state
})
```

### 4.4 Window/Document Mocks

```typescript
// Window size
Object.defineProperty(window, 'innerWidth', { value: 1024 })
Object.defineProperty(window, 'innerHeight', { value: 768 })

// Scroll position
Object.defineProperty(window, 'scrollY', { value: 500 })

// MediaQueryList
Object.defineProperty(window, 'matchMedia', {
  value: jest.fn().mockImplementation((query) => ({
    matches: query.includes('dark'),
    media: query,
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
  })),
})
```

---

## 5. Coverage Optimization

### 5.1 Branch Coverage

```typescript
// Test all conditional branches
describe('Branch Coverage', () => {
  // if/else
  it('should handle truthy condition', () => {})
  it('should handle falsy condition', () => {})

  // Ternary
  it('should return A when condition true', () => {})
  it('should return B when condition false', () => {})

  // Optional chaining
  it('should handle when object exists', () => {})
  it('should handle when object is undefined', () => {})

  // Short-circuit
  it('should handle when left side is truthy', () => {})
  it('should handle when left side is falsy', () => {})
})
```

### 5.2 Function Coverage

```typescript
// Test all exported functions
describe('Function Coverage', () => {
  // Event handlers
  it('should call onClick handler', () => {})
  it('should call onKeyDown handler', () => {})
  it('should call onChange handler', () => {})

  // Callbacks
  it('should call onClose callback', () => {})
  it('should call onOpen callback', () => {})

  // Utility functions within component
  it('should call helper function', () => {})
})
```

### 5.3 Statement Coverage

```typescript
// Ensure all statements execute
describe('Statement Coverage', () => {
  // Early returns
  it('should return early when condition met', () => {})

  // Loop bodies
  it('should iterate over all items', () => {})

  // Try/catch
  it('should execute try block', () => {})
  it('should execute catch block on error', () => {})
})
```

---

## 6. Testing Best Practices

### 6.1 Do's

- Use `data-testid` for elements without accessible names
- Use semantic queries (`getByRole`, `getByLabelText`) when possible
- Test user behavior, not implementation details
- Keep tests independent and isolated
- Clear mocks between tests
- Use descriptive test names
- Test accessibility in every component
- Cover edge cases (null, undefined, empty)

### 6.2 Don'ts

- Don't test implementation details (internal state names)
- Don't test library code (React, clsx, etc.)
- Don't use snapshot tests for styling
- Don't skip accessibility tests
- Don't leave console.log in tests
- Don't use arbitrary waits (`waitFor` without condition)
- Don't mock more than necessary
- Don't couple tests to CSS class names (use data-testid)

### 6.3 Performance Tips

```typescript
// Share setup between tests
const setup = (props: Partial<Props> = {}) => {
  const defaultProps = { /* ... */ }
  const user = userEvent.setup()
  const result = render(<Component {...defaultProps} {...props} />)
  return { user, ...result }
}

// Use beforeAll for expensive setup
beforeAll(() => {
  // One-time setup
})

// Cleanup in afterEach
afterEach(() => {
  jest.clearAllMocks()
  cleanup() // Usually automatic with RTL
})
```

---

## 7. Test File Checklist

Before submitting a test file:

### Structure
- [ ] File follows naming convention: `{component-name}.test.tsx`
- [ ] Imports organized: React, testing-library, component, types
- [ ] Mocks defined at top of file
- [ ] Default props defined
- [ ] beforeEach clears mocks

### Coverage
- [ ] Rendering tests
- [ ] Props tests (all props covered)
- [ ] Event handler tests
- [ ] Theme integration tests
- [ ] Accessibility tests
- [ ] Edge case tests
- [ ] Integration tests

### Quality
- [ ] No console.log or debug statements
- [ ] No commented-out tests
- [ ] All assertions meaningful
- [ ] No flaky tests
- [ ] Tests run in isolation

---

## 8. Component-Specific Guidelines

### 8.1 Button Components

```typescript
describe('Button Tests', () => {
  // Must test
  it('should handle click events', () => {})
  it('should handle keyboard activation', () => {})
  it('should respect disabled state', () => {})
  it('should have correct button type', () => {})
  it('should apply loading state', () => {})
})
```

### 8.2 Input Components

```typescript
describe('Input Tests', () => {
  // Must test
  it('should handle controlled value', () => {})
  it('should handle uncontrolled value', () => {})
  it('should call onChange', () => {})
  it('should handle focus/blur', () => {})
  it('should display error state', () => {})
  it('should forward ref', () => {})
})
```

### 8.3 Modal/Dialog Components

```typescript
describe('Modal Tests', () => {
  // Must test
  it('should render in portal', () => {})
  it('should handle open/close', () => {})
  it('should call onClose on backdrop click', () => {})
  it('should call onClose on Escape key', () => {})
  it('should trap focus', () => {})
  it('should have proper ARIA', () => {})
})
```

### 8.4 Animation Components

```typescript
describe('Animation Tests', () => {
  // Must test
  it('should render initial state', () => {})
  it('should animate on trigger', () => {})
  it('should respect duration prop', () => {})
  it('should handle animation completion', () => {})
  it('should cleanup on unmount', () => {})
})
```

---

## 9. Troubleshooting

### Common Issues

| Issue | Solution |
|-------|----------|
| Element not found | Check if element is in portal or delayed |
| Mock not working | Ensure mock path matches import |
| Async test fails | Use `waitFor` or `findBy*` |
| State not updating | Wrap updates in `act()` |
| Focus test fails | Ensure element is focusable |
| Portal test fails | Mock `createPortal` properly |

### Debug Techniques

```typescript
// Print DOM tree
screen.debug()

// Print specific element
screen.debug(screen.getByRole('button'))

// Log testing-playground URL
screen.logTestingPlaygroundURL()

// Print pretty DOM
import { prettyDOM } from '@testing-library/react'
console.log(prettyDOM(container))
```

---

**End of Test Design Document**
