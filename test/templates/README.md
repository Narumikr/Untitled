# Test Templates

This folder contains template files for writing consistent, comprehensive tests for the untitled-ui-library project.

## Available Templates

| Template | Use For | File Pattern |
|----------|---------|--------------|
| `component.template.tsx` | Standard UI components | `{name}.test.tsx` |
| `portal-component.template.tsx` | Portal-based components (Dialog, Drawer, etc.) | `{name}.test.tsx` |
| `hook.template.ts` | Custom React hooks | `{hook-name}.test.ts` |
| `utility.template.ts` | Utility functions | `{util-name}.test.ts` |

## How to Use

### 1. Copy the Template

```bash
# For a component
cp test/templates/component.template.tsx test/components/{folder}/{component}.test.tsx

# For a portal component
cp test/templates/portal-component.template.tsx test/components/{folder}/{component}.test.tsx

# For a hook
cp test/templates/hook.template.ts test/hooks/{hook-name}.test.ts

# For a utility
cp test/templates/utility.template.ts test/utils/{util-name}.test.ts
```

### 2. Replace Placeholders

Search and replace the following in your copied file:

| Placeholder | Replace With | Example |
|-------------|--------------|---------|
| `ComponentName` | Your component name (PascalCase) | `BasicButton` |
| `component-folder` | Component folder name (kebab-case) | `button` |
| `useHookName` | Your hook name | `useLocalStorage` |
| `utilityName` | Your function name | `convertHexToRgb` |
| `utility-file` | Utility file name | `converter` |

### 3. Update Imports

Update the import statements to match your actual file paths:

```typescript
// Before
import { ComponentName } from '@/components/component-folder/ComponentName'

// After
import { BasicButton } from '@/components/button/BasicButton'
```

### 4. Configure Props

Update `defaultProps` with the required props for your component:

```typescript
const defaultProps: BasicButtonProps = {
  children: 'Click me',
  onClick: jest.fn(),
}
```

### 5. Add Component-Specific Tests

Add tests specific to your component's functionality. The template provides the structure; you fill in the assertions.

### 6. Run Tests

```bash
# Run all tests
npm test

# Run specific test file
npm test -- button.test.tsx

# Run with coverage
npm test -- --coverage
```

## Template Structure

Each template follows this structure:

1. **Mocks** - Required mock definitions at the top
2. **Test Suite** - Main describe block
3. **Rendering** - Basic render tests
4. **Props** - Tests for each prop
5. **State** - State management tests
6. **Events** - Event handler tests
7. **Theme** - Theme integration tests
8. **Accessibility** - A11y tests
9. **Edge Cases** - Null, undefined, empty handling
10. **Integration** - Re-render and state persistence tests
11. **CSS** - Class and variable tests

## Coverage Target

All tests should aim for **100% coverage**:

- Statements: 100%
- Branches: 100%
- Functions: 100%
- Lines: 100%

## Best Practices

1. **Use semantic queries** - Prefer `getByRole`, `getByLabelText` over `getByTestId`
2. **Test behavior, not implementation** - Focus on what users see and do
3. **Keep tests independent** - Each test should work in isolation
4. **Clear mocks between tests** - Use `beforeEach` to reset state
5. **Use userEvent over fireEvent** - Better simulates real user interactions
6. **Test accessibility** - Include ARIA and keyboard tests

## Quick Reference

### Mock Patterns

```typescript
// useOptionalSekai
jest.mock('@/internal/useOptionalSekai', () => ({
  useOptionalSekai: jest.fn(() => ({
    sekaiColor: '#33ccba',
    modeTheme: 'light',
    isLight: true,
  })),
}))

// Portal
jest.mock('react-dom', () => ({
  ...jest.requireActual('react-dom'),
  createPortal: jest.fn((el) => el),
}))

// SVG
jest.mock('@/img/chevron', () => ({
  ChevronSvg: (props) => <svg data-testid="chevron" {...props} />,
}))
```

### Common Assertions

```typescript
// Element presence
expect(element).toBeInTheDocument()

// Attributes
expect(element).toHaveAttribute('aria-expanded', 'true')
expect(element).toHaveClass('active')
expect(element).toHaveStyle({ color: 'red' })

// Events
await user.click(button)
expect(handler).toHaveBeenCalledTimes(1)

// Keyboard
await user.tab()
expect(element).toHaveFocus()
await user.keyboard('{Enter}')
```

## Need Help?

- See `TEST_SPECIFICATION.md` for full testing standards
- See `TEST_DESIGN.md` for detailed patterns and examples
- Check existing tests in `test/components/` for real examples
