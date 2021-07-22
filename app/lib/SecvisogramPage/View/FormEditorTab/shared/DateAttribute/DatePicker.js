import React from 'react'

const DatePicker = (
  /**
   * @type {Omit<React.HTMLProps<HTMLInputElement>, 'value' | 'onChange'> & {
   *   value: string | null
   *   onChange(str: string | null): void
   * }}
   */
  { onChange, value, ...props }
) => {
  const [dateString, timeString] = React.useMemo(() => {
    if (!value) return ['', '']
    const date = new Date(value)
    if (Number.isNaN(date.getTime())) return ['', '']
    return [
      formatDate(date),
      date.getHours().toString().padStart(2, '0') +
        ':' +
        date.getMinutes().toString().padStart(2, '0'),
    ]
  }, [value])

  return (
    <div className="flex items-center">
      <input
        {...props}
        className="border border-gray-400 py-1 px-2 w-full shadow-inner rounded-l"
        type="date"
        value={dateString}
        onChange={(e) => {
          onChange(
            e.target.value
              ? new Date(
                  `${e.target.value}T${timeString || '12:00'}`
                ).toISOString()
              : ''
          )
        }}
      />
      <input
        {...props}
        className="border border-gray-400 py-1 px-2 w-full shadow-inner rounded-r"
        type="time"
        value={timeString}
        onChange={(e) => {
          onChange(
            new Date(
              `${dateString || formatDate(new Date())}T${
                e.target.value || '00:00'
              }`
            ).toISOString()
          )
        }}
      />
    </div>
  )
}

export default DatePicker

/**
 * @param {Date} date
 */
function formatDate(date) {
  return (
    date.getFullYear().toString().padStart(4, '0') +
    '-' +
    (date.getMonth() + 1).toString().padStart(2, '0') +
    '-' +
    date.getDate().toString().padStart(2, '0')
  )
}
