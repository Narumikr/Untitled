/**
 * Hook Test Template
 *
 * Use this template for testing custom React hooks.
 *
 * Usage:
 * 1. Copy this file to test/hooks/{hook-name}.test.ts
 * 2. Replace all occurrences of:
 *    - useHookName -> Your hook name
 * 3. Add hook-specific tests
 * 4. Remove this header comment
 */

import { renderHook, act, waitFor } from '@testing-library/react'

import { useHookName } from '@/hooks/useHookName'

// === MOCKS ===

// Mock localStorage if needed
const localStorageMock = (() => {
  let store: Record<string, string> = {}
  return {
    getItem: jest.fn((key: string) => store[key] ?? null),
    setItem: jest.fn((key: string, value: string) => {
      store[key] = value
    }),
    removeItem: jest.fn((key: string) => {
      delete store[key]
    }),
    clear: jest.fn(() => {
      store = {}
    }),
  }
})()

// Mock sessionStorage if needed
const sessionStorageMock = (() => {
  let store: Record<string, string> = {}
  return {
    getItem: jest.fn((key: string) => store[key] ?? null),
    setItem: jest.fn((key: string, value: string) => {
      store[key] = value
    }),
    removeItem: jest.fn((key: string) => {
      delete store[key]
    }),
    clear: jest.fn(() => {
      store = {}
    }),
  }
})()

// === TEST SUITE ===

describe('useHookName', () => {
  // Setup and teardown
  beforeEach(() => {
    jest.clearAllMocks()
    // Clear storage mocks if using them
    // Object.defineProperty(window, 'localStorage', { value: localStorageMock })
    // localStorageMock.clear()
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  // ============================================
  // INITIAL STATE TESTS
  // ============================================

  describe('Initial State', () => {
    it('should return correct initial value', () => {
      const { result } = renderHook(() => useHookName(/* params */))

      // Assert initial return value
      // expect(result.current).toBe(expectedInitialValue)
      // or for tuple: expect(result.current[0]).toBe(expectedValue)
    })

    it('should return default value when no initial value provided', () => {
      const { result } = renderHook(() => useHookName())

      // Assert default behavior
    })

    it('should use stored value when available', () => {
      // Setup storage with pre-existing value
      // localStorageMock.setItem('key', JSON.stringify('stored'))

      const { result } = renderHook(() => useHookName(/* params */))

      // expect(result.current[0]).toBe('stored')
    })
  })

  // ============================================
  // STATE UPDATE TESTS
  // ============================================

  describe('State Updates', () => {
    it('should update state when setter is called', () => {
      const { result } = renderHook(() => useHookName(/* params */))

      act(() => {
        // Call setter function
        // result.current[1]('new value')
        // or result.current.setValue('new value')
      })

      // expect(result.current[0]).toBe('new value')
    })

    it('should support function updater', () => {
      const { result } = renderHook(() => useHookName(0))

      act(() => {
        // result.current[1]((prev) => prev + 1)
      })

      // expect(result.current[0]).toBe(1)
    })

    it('should trigger re-render on state change', () => {
      let renderCount = 0
      const { result } = renderHook(() => {
        renderCount++
        return useHookName(/* params */)
      })

      const initialRenderCount = renderCount

      act(() => {
        // result.current[1]('new value')
      })

      expect(renderCount).toBeGreaterThan(initialRenderCount)
    })
  })

  // ============================================
  // SIDE EFFECT TESTS
  // ============================================

  describe('Side Effects', () => {
    it('should persist value to storage', () => {
      const { result } = renderHook(() => useHookName(/* params */))

      act(() => {
        // result.current[1]('persisted')
      })

      // expect(localStorageMock.setItem).toHaveBeenCalledWith(
      //   'key',
      //   JSON.stringify('persisted')
      // )
    })

    it('should add event listener on mount', () => {
      const addEventListenerSpy = jest.spyOn(window, 'addEventListener')

      renderHook(() => useHookName(/* params */))

      // expect(addEventListenerSpy).toHaveBeenCalledWith('eventName', expect.any(Function))

      addEventListenerSpy.mockRestore()
    })

    it('should update document/window on change', () => {
      const { result } = renderHook(() => useHookName(/* params */))

      act(() => {
        // Trigger update
      })

      // Assert document/window was updated
    })
  })

  // ============================================
  // CLEANUP TESTS
  // ============================================

  describe('Cleanup', () => {
    it('should cleanup on unmount', () => {
      const removeEventListenerSpy = jest.spyOn(window, 'removeEventListener')

      const { unmount } = renderHook(() => useHookName(/* params */))

      unmount()

      // expect(removeEventListenerSpy).toHaveBeenCalledWith('eventName', expect.any(Function))

      removeEventListenerSpy.mockRestore()
    })

    it('should cleanup previous effect on dependency change', () => {
      const cleanupFn = jest.fn()

      const { rerender } = renderHook(({ value }) => useHookName(value), {
        initialProps: { value: 'initial' },
      })

      rerender({ value: 'updated' })

      // Assert cleanup was called
    })
  })

  // ============================================
  // TYPE HANDLING TESTS
  // ============================================

  describe('Type Handling', () => {
    it('should handle string values', () => {
      const { result } = renderHook(() => useHookName('string'))
      expect(typeof result.current[0]).toBe('string')
    })

    it('should handle number values', () => {
      const { result } = renderHook(() => useHookName(42))
      expect(typeof result.current[0]).toBe('number')
    })

    it('should handle object values', () => {
      const { result } = renderHook(() => useHookName({ name: 'test' }))

      act(() => {
        // result.current[1]({ name: 'updated' })
      })

      // expect(result.current[0]).toEqual({ name: 'updated' })
    })

    it('should handle array values', () => {
      const { result } = renderHook(() => useHookName([1, 2, 3]))

      act(() => {
        // result.current[1]([4, 5, 6])
      })

      // expect(result.current[0]).toEqual([4, 5, 6])
    })

    it('should handle boolean values', () => {
      const { result } = renderHook(() => useHookName(true))

      act(() => {
        // result.current[1](false)
      })

      // expect(result.current[0]).toBe(false)
    })

    it('should handle null values', () => {
      const { result } = renderHook(() => useHookName<string | null>('initial'))

      act(() => {
        // result.current[1](null)
      })

      // expect(result.current[0]).toBeNull()
    })

    it('should handle undefined values', () => {
      const { result } = renderHook(() => useHookName<string | undefined>(undefined))
      // expect(result.current[0]).toBeUndefined()
    })
  })

  // ============================================
  // SYNCHRONIZATION TESTS
  // ============================================

  describe('Synchronization', () => {
    it('should sync across tabs on storage event', () => {
      const { result } = renderHook(() => useHookName(/* params */))

      act(() => {
        // Simulate storage event from another tab
        const event = new StorageEvent('storage', {
          key: 'key',
          newValue: JSON.stringify('from-other-tab'),
        })
        window.dispatchEvent(event)
      })

      // expect(result.current[0]).toBe('from-other-tab')
    })

    it('should ignore unrelated storage events', () => {
      const { result } = renderHook(() => useHookName(/* params */))
      const initialValue = result.current[0]

      act(() => {
        const event = new StorageEvent('storage', {
          key: 'other-key',
          newValue: JSON.stringify('value'),
        })
        window.dispatchEvent(event)
      })

      expect(result.current[0]).toBe(initialValue)
    })
  })

  // ============================================
  // ERROR HANDLING TESTS
  // ============================================

  describe('Error Handling', () => {
    it('should handle invalid JSON in storage', () => {
      // localStorageMock.getItem.mockReturnValueOnce('invalid-json')

      const { result } = renderHook(() => useHookName(/* params */))

      // Should fallback to default value
      // expect(result.current[0]).toBe(defaultValue)
    })

    it('should handle storage errors gracefully', () => {
      const mockSetItem = jest.spyOn(Storage.prototype, 'setItem')
      mockSetItem.mockImplementation(() => {
        throw new Error('Storage full')
      })

      const { result } = renderHook(() => useHookName(/* params */))

      // Should not throw
      act(() => {
        // result.current[1]('new-value')
      })

      // State should still update even if storage fails
      // expect(result.current[0]).toBe('new-value')

      mockSetItem.mockRestore()
    })

    it('should handle quota exceeded error', () => {
      const mockSetItem = jest.spyOn(Storage.prototype, 'setItem')
      mockSetItem.mockImplementation(() => {
        throw new DOMException('QuotaExceededError')
      })

      const { result } = renderHook(() => useHookName(/* params */))

      // Should not throw
      expect(() => {
        act(() => {
          // result.current[1]('large-value')
        })
      }).not.toThrow()

      mockSetItem.mockRestore()
    })
  })

  // ============================================
  // DEPENDENCY TESTS
  // ============================================

  describe('Dependencies', () => {
    it('should re-run effect when dependencies change', () => {
      const { result, rerender } = renderHook(
        ({ value }) => useHookName(value),
        { initialProps: { value: 'initial' } },
      )

      rerender({ value: 'updated' })

      // Assert effect re-ran
    })

    it('should not re-run effect when dependencies are same', () => {
      const effectFn = jest.fn()

      const { rerender } = renderHook(
        ({ value }) => {
          // Track effect calls
          return useHookName(value)
        },
        { initialProps: { value: 'same' } },
      )

      rerender({ value: 'same' })

      // Assert effect did not re-run
    })
  })

  // ============================================
  // ASYNC BEHAVIOR TESTS
  // ============================================

  describe('Async Behavior', () => {
    it('should handle async operations', async () => {
      const { result } = renderHook(() => useHookName(/* params */))

      // Trigger async operation
      act(() => {
        // result.current.fetchData()
      })

      // Wait for async operation to complete
      await waitFor(() => {
        // expect(result.current.data).toBeDefined()
      })
    })

    it('should handle loading state', async () => {
      const { result } = renderHook(() => useHookName(/* params */))

      // Assert initial loading state
      // expect(result.current.isLoading).toBe(false)

      act(() => {
        // result.current.fetchData()
      })

      // expect(result.current.isLoading).toBe(true)

      await waitFor(() => {
        // expect(result.current.isLoading).toBe(false)
      })
    })

    it('should handle error state', async () => {
      // Mock failed request
      // jest.spyOn(global, 'fetch').mockRejectedValueOnce(new Error('Failed'))

      const { result } = renderHook(() => useHookName(/* params */))

      act(() => {
        // result.current.fetchData()
      })

      await waitFor(() => {
        // expect(result.current.error).toBeDefined()
      })
    })
  })

  // ============================================
  // EDGE CASE TESTS
  // ============================================

  describe('Edge Cases', () => {
    it('should handle rapid updates', () => {
      const { result } = renderHook(() => useHookName(0))

      act(() => {
        for (let i = 0; i < 100; i++) {
          // result.current[1]((prev) => prev + 1)
        }
      })

      // expect(result.current[0]).toBe(100)
    })

    it('should handle empty initial value', () => {
      const { result } = renderHook(() => useHookName(''))
      expect(result.current[0]).toBe('')
    })

    it('should handle very long strings', () => {
      const longString = 'a'.repeat(10000)
      const { result } = renderHook(() => useHookName(longString))

      expect(result.current[0]).toBe(longString)
    })

    it('should handle special characters', () => {
      const specialChars = '!@#$%^&*()_+-=[]{}|;:,.<>?'
      const { result } = renderHook(() => useHookName(specialChars))

      expect(result.current[0]).toBe(specialChars)
    })

    it('should handle Unicode characters', () => {
      const unicode = 'Hello, World!'
      const { result } = renderHook(() => useHookName(unicode))

      expect(result.current[0]).toBe(unicode)
    })
  })

  // ============================================
  // INTEGRATION TESTS
  // ============================================

  describe('Integration', () => {
    it('should work with multiple hook instances', () => {
      const { result: result1 } = renderHook(() => useHookName('key1'))
      const { result: result2 } = renderHook(() => useHookName('key2'))

      // Assert independent behavior
      act(() => {
        // result1.current[1]('value1')
      })

      // expect(result1.current[0]).toBe('value1')
      // expect(result2.current[0]).not.toBe('value1')
    })

    it('should handle component re-mounting', () => {
      const { result, unmount } = renderHook(() => useHookName(/* params */))

      act(() => {
        // result.current[1]('persisted')
      })

      unmount()

      // Re-mount hook
      const { result: newResult } = renderHook(() => useHookName(/* params */))

      // Check if value was persisted
      // expect(newResult.current[0]).toBe('persisted')
    })
  })
})
