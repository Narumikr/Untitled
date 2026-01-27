# Test Specification Document

> **Project:** @naru/untitled-ui-library
> **Version:** 1.0.0
> **Last Updated:** 2025-12-28

---

## 1. Overview

This document defines the testing standards, patterns, and requirements for the untitled-ui-library project. All tests should follow these specifications to ensure consistency and achieve 100% code coverage.

---

## 2. Testing Framework & Tools

### 2.1 Core Dependencies

| Tool | Version | Purpose |
|------|---------|---------|
| Jest | ^30.2.0 | Test runner |
| ts-jest | ^29.4.6 | TypeScript support |
| @testing-library/react | ^16.3.0 | React component testing |
| @testing-library/jest-dom | ^6.9.1 | DOM matchers |
| @testing-library/user-event | ^14.6.1 | User interaction simulation |
| identity-obj-proxy | ^3.0.0 | CSS Module mocking |

### 2.2 Test Environment

- **Environment:** jsdom
- **TypeScript Config:** jsx: react, esModuleInterop: true

---

## 3. Test File Structure

### 3.1 Directory Structure

```
test/
├── __mocks__/                    # Global mocks
│   └── svgMock.js               # SVG file mock
├── components/                   # Component tests
│   ├── accordion/
│   │   └── accordion.test.tsx
│   ├── backdrop/
│   │   └── backdrop.test.tsx
│   └── [component-folder]/
│       └── [component-name].test.tsx
├── hooks/                        # Hook tests
│   └── [hook-name].test.ts
├── utils/                        # Utility tests
│   └── [util-name].test.ts
├── setupTests.ts                 # Global test setup
├── TEST_SPECIFICATION.md         # This document
└── TEST_DESIGN.md               # Test design patterns
```

### 3.2 Naming Conventions

| Type | File Pattern | Example |
|------|--------------|---------|
| Component Test | `{component-name}.test.tsx` | `accordion.test.tsx` |
| Hook Test | `{hook-name}.test.ts` | `useLocalStorage.test.ts` |
| Utility Test | `{util-name}.test.ts` | `converter.test.ts` |

---

## 4. Coverage Requirements

### 4.1 Coverage Targets

| Metric | Target | Minimum |
|--------|--------|---------|
| Statements | 100% | 90% |
| Branches | 100% | 85% |
| Functions | 100% | 95% |
| Lines | 100% | 90% |

### 4.2 Coverage Collection

```javascript
// jest.config.js
collectCoverageFrom: [
  'src/**/*.{ts,tsx}',
  '!src/**/*.d.ts',
  '!src/index.ts',
  '!src/**/index.ts',
]
```

### 4.3 Excluded Files

- Type definition files (`*.d.ts`)
- Index barrel files (`index.ts`)
- Files in `/node_modules/`
- Files in `/dist/`

---

## 5. Test Categories

### 5.1 Component Tests

Every component test MUST include the following describe blocks:

#### Required Test Categories

| Category | Description | Priority |
|----------|-------------|----------|
| **Rendering** | Basic render, props, children | Required |
| **Props** | Each prop behavior | Required |
| **State** | Internal state changes | Required |
| **Events** | Click, keyboard, focus events | Required |
| **Theme Integration** | sekai color, themeMode | Required |
| **Accessibility** | ARIA, keyboard navigation | Required |
| **Edge Cases** | Null, undefined, empty | Required |
| **Integration** | Re-renders, state persistence | Required |
| **CSS Classes** | Class application logic | Recommended |
| **CSS Variables** | Custom property injection | Recommended |

#### Component Test Template

```typescript
describe('ComponentName Component', () => {
  describe('Rendering', () => {
    it('should render without crashing', () => {})
    it('should render with custom id', () => {})
    it('should render with custom className', () => {})
    it('should render with custom styles', () => {})
    it('should render children content', () => {})
  })

  describe('Props - [PropName]', () => {
    it('should apply [prop] when provided', () => {})
    it('should use default value when [prop] not provided', () => {})
  })

  describe('State Management', () => {
    it('should initialize with correct state', () => {})
    it('should update state on interaction', () => {})
  })

  describe('Event Handlers', () => {
    it('should call onClick when clicked', () => {})
    it('should handle keyboard events', () => {})
  })

  describe('Theme Integration', () => {
    it('should apply sekai color CSS variables', () => {})
    it('should apply theme mode class', () => {})
    it('should call useOptionalSekai with correct params', () => {})
  })

  describe('Accessibility', () => {
    it('should have proper ARIA attributes', () => {})
    it('should be keyboard accessible', () => {})
    it('should support screen readers', () => {})
  })

  describe('Edge Cases', () => {
    it('should handle null values', () => {})
    it('should handle undefined values', () => {})
    it('should handle empty strings', () => {})
    it('should handle extreme values', () => {})
  })

  describe('Integration Tests', () => {
    it('should maintain state across re-renders', () => {})
    it('should update correctly when props change', () => {})
  })
})
```

### 5.2 Hook Tests

#### Required Test Categories

| Category | Description |
|----------|-------------|
| **Initial State** | Default return values |
| **State Updates** | Value changes |
| **Side Effects** | DOM/storage effects |
| **Cleanup** | Unmount behavior |
| **Edge Cases** | Error handling |

#### Hook Test Template

```typescript
import { renderHook, act } from '@testing-library/react'

describe('useHookName', () => {
  describe('Initial State', () => {
    it('should return correct initial value', () => {})
  })

  describe('State Updates', () => {
    it('should update value when setter is called', () => {})
  })

  describe('Side Effects', () => {
    it('should sync with storage', () => {})
  })

  describe('Cleanup', () => {
    it('should cleanup on unmount', () => {})
  })
})
```

### 5.3 Utility Tests

#### Required Test Categories

| Category | Description |
|----------|-------------|
| **Normal Cases** | Expected inputs |
| **Edge Cases** | Boundary values |
| **Error Cases** | Invalid inputs |
| **Type Safety** | Type coercion |

#### Utility Test Template

```typescript
describe('utilityFunction', () => {
  describe('Normal Cases', () => {
    it('should return expected output for valid input', () => {})
  })

  describe('Edge Cases', () => {
    it('should handle empty input', () => {})
    it('should handle boundary values', () => {})
  })

  describe('Error Cases', () => {
    it('should handle invalid input gracefully', () => {})
  })
})
```

---

## 6. Testing Patterns

### 6.1 Required Mocks

All component tests MUST mock the following:

```typescript
// Mock useOptionalSekai hook
jest.mock('@/internal/useOptionalSekai', () => ({
  useOptionalSekai: jest.fn(() => ({
    sekaiColor: '#33ccba',
    modeTheme: 'light',
    isLight: true,
  })),
}))

// Mock converter utilities
jest.mock('@/utils/converter', () => ({
  convertHexToRgba: jest.fn((color: string, alpha: number) =>
    `rgba(51, 204, 186, ${alpha})`
  ),
  convertHexToRgbaMixWithBlackOrWhite: jest.fn(() =>
    'rgba(51, 204, 186, 0.8)'
  ),
}))
```

### 6.2 Portal Component Mocks

For components using portals (Dialog, Dropdown, Tooltip, etc.):

```typescript
// Mock react-dom createPortal
jest.mock('react-dom', () => {
  const actual = jest.requireActual('react-dom')
  return {
    ...actual,
    createPortal: jest.fn((element) => element),
  }
})

// Mock usePortalContainer hook
jest.mock('@/internal/usePortalContainer', () => ({
  usePortalContainer: jest.fn(() => document.body),
}))
```

### 6.3 SVG Component Mocks

```typescript
jest.mock('@/img/chevron', () => ({
  ChevronSvg: ({ className, vector }: { className?: string; vector?: string }) => (
    <svg data-testid="chevron-icon" className={className} data-vector={vector} />
  ),
}))
```

### 6.4 Animation Mocks

Already configured in `setupTests.ts`:

```typescript
global.requestAnimationFrame = (cb) => { cb(0); return 0 }
global.cancelAnimationFrame = () => {}
```

---

## 7. Test Assertions

### 7.1 DOM Assertions

```typescript
// Element presence
expect(element).toBeInTheDocument()
expect(element).not.toBeInTheDocument()

// Visibility
expect(element).toBeVisible()
expect(element).not.toBeVisible()

// Attributes
expect(element).toHaveAttribute('id', 'expected-id')
expect(element).toHaveClass('expected-class')
expect(element).toHaveStyle({ color: 'red' })

// Content
expect(element).toHaveTextContent('expected text')
expect(element).toHaveValue('expected value')

// State
expect(element).toBeDisabled()
expect(element).toBeEnabled()
expect(element).toHaveFocus()
```

### 7.2 Event Assertions

```typescript
const user = userEvent.setup()

// Click events
await user.click(button)
expect(mockHandler).toHaveBeenCalled()
expect(mockHandler).toHaveBeenCalledWith(expect.any(Object))

// Keyboard events
await user.keyboard('{Enter}')
await user.keyboard(' ')  // Space
await user.tab()

// Focus
expect(element).toHaveFocus()
```

### 7.3 Mock Assertions

```typescript
// Function calls
expect(mockFn).toHaveBeenCalled()
expect(mockFn).toHaveBeenCalledTimes(2)
expect(mockFn).toHaveBeenCalledWith('arg1', 'arg2')

// Return values
mockFn.mockReturnValue('value')
mockFn.mockReturnValueOnce('value')
```

---

## 8. Accessibility Testing

### 8.1 Required ARIA Checks

| Component Type | Required Attributes |
|----------------|---------------------|
| Button | `aria-pressed`, `aria-expanded` (if applicable) |
| Dialog | `role="dialog"`, `aria-modal`, `aria-labelledby` |
| Accordion | `aria-expanded`, `aria-controls`, `aria-labelledby` |
| Dropdown | `aria-haspopup`, `aria-expanded` |
| Tooltip | `role="tooltip"`, `aria-describedby` |
| Navigation | `aria-label`, `role="navigation"` |

### 8.2 Keyboard Navigation

```typescript
describe('Keyboard Navigation', () => {
  it('should be focusable with Tab', async () => {
    const user = userEvent.setup()
    await user.tab()
    expect(element).toHaveFocus()
  })

  it('should activate with Enter key', async () => {
    const user = userEvent.setup()
    await user.tab()
    await user.keyboard('{Enter}')
    expect(action).toHaveOccurred()
  })

  it('should activate with Space key', async () => {
    const user = userEvent.setup()
    await user.tab()
    await user.keyboard(' ')
    expect(action).toHaveOccurred()
  })

  it('should close with Escape key', async () => {
    const user = userEvent.setup()
    await user.keyboard('{Escape}')
    expect(element).not.toBeVisible()
  })
})
```

---

## 9. Test Data

### 9.1 Standard Test Props

```typescript
// Theme props
const themeProps = {
  sekai: 'Miku' as const,
  themeMode: 'light' as const,
}

// Standard HTML props
const htmlProps = {
  id: 'test-id',
  className: 'custom-class',
  style: { backgroundColor: 'red' },
}

// Event handlers
const eventProps = {
  onClick: jest.fn(),
  onKeyDown: jest.fn(),
  onChange: jest.fn(),
}
```

### 9.2 Mock Data

```typescript
// Sekai colors
const mockSekaiColor = '#33ccba'
const mockModeTheme = 'light'
const mockIsLight = true

// Converted colors
const mockRgba = 'rgba(51, 204, 186, 0.5)'
```

---

## 10. Running Tests

### 10.1 Commands

```bash
# Run all tests
npm test

# Run with coverage
npm test -- --coverage

# Run specific test file
npm test -- accordion.test.tsx

# Run tests in watch mode
npm test -- --watch

# Run tests matching pattern
npm test -- --testNamePattern="Rendering"
```

### 10.2 Coverage Report

```bash
# Generate coverage report
npm test -- --coverage --coverageReporters="text" --coverageReporters="html"

# Coverage output location
# coverage/lcov-report/index.html
```

---

## 11. Test Checklist

Before submitting tests, verify:

- [ ] All describe blocks follow the required structure
- [ ] All required test categories are covered
- [ ] Mocks are properly set up and cleared
- [ ] No console.log or debug statements
- [ ] Tests are independent and can run in isolation
- [ ] Edge cases are covered (null, undefined, empty)
- [ ] Accessibility tests are included
- [ ] Keyboard navigation is tested
- [ ] Theme integration is tested
- [ ] Coverage meets 100% target
- [ ] Tests pass in CI environment

---

## 12. Component Test Coverage Matrix

| Component | Status | Coverage |
|-----------|--------|----------|
| Accordion | Done | 100% |
| Backdrop | Done | 100% |
| Breadcrumb | Done | 100% |
| BasicButton | Pending | - |
| Card | Pending | - |
| Checkbox | Pending | - |
| Chip | Pending | - |
| Dialog | Pending | - |
| Divider | Pending | - |
| Drawer | Pending | - |
| Dropdown | Pending | - |
| HamburgerButton | Pending | - |
| IntoTheSekai | Pending | - |
| List | Pending | - |
| ListItemButton | Pending | - |
| ListItemText | Pending | - |
| Loading | Pending | - |
| MarqueeText | Pending | - |
| MusicBannerCard | Pending | - |
| NamePlate | Pending | - |
| OutlineText | Pending | - |
| Pagination | Pending | - |
| PictureViewer | Pending | - |
| PrskLinkCard | Pending | - |
| ScrollTopButton | Pending | - |
| SekaiBackground | Pending | - |
| SideMenu | Pending | - |
| StickyNote | Pending | - |
| StrongButton | Pending | - |
| StylishButton | Pending | - |
| TextArea | Pending | - |
| TextField | Pending | - |
| TextLink | Pending | - |
| Toast | Pending | - |
| Tooltip | Pending | - |
| TypewriterText | Pending | - |
| UtilText | Pending | - |
| WindowDialog | Pending | - |
| XoMikuDialog | Pending | - |
| XxMikuDialog | Pending | - |
| YourSekaiProvider | Pending | - |
| DoReMeetEffect | Pending | - |

---

## 13. Hook Test Coverage Matrix

| Hook | Status | Coverage |
|------|--------|----------|
| useCreateSekai | Pending | - |
| useCurrectTime | Pending | - |
| useLocalStorage | Pending | - |
| useSessionStorage | Pending | - |
| useThemeMode | Pending | - |
| useWindowSize | Pending | - |

---

## 14. Utility Test Coverage Matrix

| Utility | Status | Coverage |
|---------|--------|----------|
| connectSekai | Pending | - |
| converter | Pending | - |
| createSekai | Pending | - |
| operation | Pending | - |
| serialization | Pending | - |
| timer | Pending | - |
| type | Pending | - |

---

**End of Test Specification Document**
