import React from 'react'

/**
 * A group of toggle buttons that behaves like native radio buttons: one tab
 * stop per group, arrow keys move and select.
 *
 * @param {{
 *  labelledBy?: string
 *  className?: string
 *  value: string | undefined
 *  options: {
 *    key: string
 *    testId: string
 *    className?: string
 *    content: React.ReactNode
 *  }[]
 *  onChange: (key: string) => void
 * }} props
 */
export default function RadioGroup({
  labelledBy,
  className,
  value,
  options,
  onChange,
}) {
  /** @type {React.MutableRefObject<(HTMLButtonElement | null)[]>} */
  const buttonsRef = React.useRef([])
  const checkedIndex = options.findIndex((o) => o.key === value)
  const tabbableIndex = checkedIndex >= 0 ? checkedIndex : 0

  /** @param {number} index */
  const select = (index) => {
    const target = (index + options.length) % options.length
    onChange(options[target].key)
    buttonsRef.current[target]?.focus()
  }

  return (
    <div role="radiogroup" aria-labelledby={labelledBy} className={className}>
      {options.map((option, index) => (
        <button
          key={option.key}
          ref={(el) => {
            buttonsRef.current[index] = el
          }}
          type="button"
          role="radio"
          aria-checked={option.key === value}
          tabIndex={index === tabbableIndex ? 0 : -1}
          data-testid={option.testId}
          className={option.className}
          onClick={() => onChange(option.key)}
          onKeyDown={(event) => {
            switch (event.key) {
              case 'ArrowRight':
              case 'ArrowDown':
                event.preventDefault()
                select(index + 1)
                break
              case 'ArrowLeft':
              case 'ArrowUp':
                event.preventDefault()
                select(index - 1)
                break
            }
          }}
        >
          {option.content}
        </button>
      ))}
    </div>
  )
}
