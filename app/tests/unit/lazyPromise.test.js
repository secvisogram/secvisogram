import { describe, expect, it, vi } from 'vitest'
import { createLazyPromise } from '../../lib/lazyPromise.js'

describe('createLazyPromise', () => {
  it('shares an in-flight load between concurrent callers', async () => {
    const load = vi.fn(async () => 'loaded')
    const getValue = createLazyPromise(load)

    const first = getValue()
    const second = getValue()

    expect(second).toBe(first)
    await expect(first).resolves.toBe('loaded')
    expect(load).toHaveBeenCalledTimes(1)
  })

  it('retries after a failed load', async () => {
    const error = new Error('temporary load failure')
    const load = vi
      .fn()
      .mockRejectedValueOnce(error)
      .mockResolvedValueOnce('loaded')
    const getValue = createLazyPromise(load)

    await expect(getValue()).rejects.toBe(error)
    await expect(getValue()).resolves.toBe('loaded')
    expect(load).toHaveBeenCalledTimes(2)
  })

  it('reuses a fulfilled load', async () => {
    const load = vi.fn(async () => 'loaded')
    const getValue = createLazyPromise(load)

    const first = getValue()
    const second = getValue()

    expect(second).toBe(first)
    await expect(first).resolves.toBe('loaded')
    expect(getValue()).toBe(first)
    expect(load).toHaveBeenCalledTimes(1)
  })
})
