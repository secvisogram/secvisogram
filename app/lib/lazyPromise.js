/**
 * Creates a lazy promise that is cached while pending or fulfilled, but
 * discarded after rejection so a later call can retry.
 *
 * @template T
 * @param {() => Promise<T>} load
 * @returns {() => Promise<T>}
 */
export function createLazyPromise(load) {
  /** @type {Promise<T> | undefined} */
  let promise

  return () => {
    promise ??= Promise.resolve()
      .then(load)
      .catch((error) => {
        promise = undefined
        throw error
      })
    return promise
  }
}
