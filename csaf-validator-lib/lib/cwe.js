import cwe from './shared/cwec.js'

export const weaknesses = cwe.weaknesses

export const getWeaknessById = (/** @type {string} */ id) => {
  return weaknesses.find(x => x.id === id)
}
