import DropdownAttribute from '../DropdownAttribute.js'
import React from 'react'

const firstCharCapital = (/** @type {string} */ s) =>
  s.charAt(0).toUpperCase() + s.substring(1)

/**
 *
 * @param {string[]} instancePath
 * @param {string} child
 * @param {string} value
 * @param {string[]} options
 * @param {import('../../../../shared/types').Property} property
 * @param {boolean} disabled
 * @param {boolean} disableClearable
 */
function cvssDropdown(
  instancePath,
  child,
  value,
  options,
  property,
  disabled,
  disableClearable = true,
) {
  return (
    <DropdownAttribute
      label={firstCharCapital(child)}
      description=""
      options={options}
      isEnum={true}
      instancePath={[...instancePath, child]}
      value={value}
      property={property}
      disabled={disabled}
      disableClearable={disableClearable}
    />
  )
}

function getSeverityColors(/** @type {number} */ score) {
  if (score >= 0.0 && score <= 0.1) {
    return 'bg-[#53aa33]'
  } else if (score >= 0.1 && score <= 3.9) {
    return 'bg-[#ffcb0d]'
  } else if (score >= 4.0 && score <= 6.9) {
    return 'bg-[#f9a009]'
  } else if (score >= 7.0 && score <= 8.9) {
    return 'bg-[#df3d03]'
  } else if (score >= 9.0) {
    return 'bg-[#cc0500]'
  } else {
    return ''
  }
}

export { cvssDropdown, getSeverityColors }
