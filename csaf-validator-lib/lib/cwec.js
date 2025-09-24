/**
 * @typedef {object} CweWeakness
 * @property {string} id
 * @property {string} name
 * @property {string} status
 * @property {string} [usage]
 */

/**
 * @typedef {object} CweCatalogue
 * @property {string} [date]
 * @property {CweWeakness[]} weaknesses
 */

/** @type {Map<string, () => Promise<{ default: CweCatalogue }>>} */
export const cwecMap = new Map([
  ['4.17', () => import('./cwec/4.17.js')],
  ['4.16', () => import('./cwec/4.16.js')],
  ['4.15', () => import('./cwec/4.15.js')],
  ['4.14', () => import('./cwec/4.14.js')],
  ['4.13', () => import('./cwec/4.13.js')],
  ['4.12', () => import('./cwec/4.12.js')],
  ['4.11', () => import('./cwec/4.11.js')],
  ['4.10', () => import('./cwec/4.10.js')],
  ['4.9', () => import('./cwec/4.9.js')],
  ['4.8', () => import('./cwec/4.8.js')],
  ['4.7', () => import('./cwec/4.7.js')],
  ['4.6', () => import('./cwec/4.6.js')],
  ['4.5', () => import('./cwec/4.5.js')],
  ['4.4', () => import('./cwec/4.4.js')],
  ['4.3', () => import('./cwec/4.3.js')],
  ['4.2', () => import('./cwec/4.2.js')],
  ['4.1', () => import('./cwec/4.1.js')],
  ['4.0', () => import('./cwec/4.0.js')],
  ['3.4.1', () => import('./cwec/3.4.1.js')],
  ['3.4', () => import('./cwec/3.4.js')],
  ['3.3', () => import('./cwec/3.3.js')],
  ['3.2', () => import('./cwec/3.2.js')],
  ['3.1', () => import('./cwec/3.1.js')],
  ['3.0', () => import('./cwec/3.0.js')],
  ['2.12', () => import('./cwec/2.12.js')],
  ['2.11', () => import('./cwec/2.11.js')],
  ['2.10', () => import('./cwec/2.10.js')],
  ['2.9', () => import('./cwec/2.9.js')],
  ['2.8', () => import('./cwec/2.8.js')],
  ['2.7', () => import('./cwec/2.7.js')],
  ['2.6', () => import('./cwec/2.6.js')],
  ['2.5', () => import('./cwec/2.5.js')],
  ['2.4', () => import('./cwec/2.4.js')],
  ['2.3', () => import('./cwec/2.3.js')],
  ['2.2', () => import('./cwec/2.2.js')],
  ['2.1', () => import('./cwec/2.1.js')],
  ['2.0', () => import('./cwec/2.0.js')],
  ['1.13', () => import('./cwec/1.13.js')],
  ['1.12', () => import('./cwec/1.12.js')],
  ['1.11', () => import('./cwec/1.11.js')],
  ['1.10', () => import('./cwec/1.10.js')],
  ['1.9', () => import('./cwec/1.9.js')],
  ['1.8.1', () => import('./cwec/1.8.1.js')],
  ['1.8', () => import('./cwec/1.8.js')],
  ['1.7', () => import('./cwec/1.7.js')],
  ['1.6', () => import('./cwec/1.6.js')],
  ['1.5', () => import('./cwec/1.5.js')],
  ['1.4', () => import('./cwec/1.4.js')],
  ['1.3', () => import('./cwec/1.3.js')],
  ['1.2', () => import('./cwec/1.2.js')],
  ['1.1', () => import('./cwec/1.1.js')],
  ['1.0.1', () => import('./cwec/1.0.1.js')],
  ['1.0', () => import('./cwec/1.0.js')],
])
