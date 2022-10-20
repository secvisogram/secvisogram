import React from 'react'

/**
 * Defines the content of the side bar displaying comments for a selected path
 *
 * @param {{
 *   selectedPath: string
 * }} props
 */
export default function CommentPanel({ selectedPath }) {
  // TODO: get comments for selectedPath on document

  return (
    <>
      <div>comments for {selectedPath}</div>
    </>
  )
}
