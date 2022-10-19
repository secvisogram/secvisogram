import React from 'react'
import NewDocumentDialog from '../../../../lib/app/SecvisogramPage/View/NewDocumentDialog.js'

export const title = 'SecvisogramPage-NewDocumentDialog'

const props = {
  onSubmit() {},
  data: {
    templates: [{ templateId: '1234', templateDescription: 'Test template' }],
  },
  onClose() {},
}

export const tests = [
  {
    title: 'simple',
    render: () => <Wrapper {...props} />,
  },
  {
    title: 'from filesystem',
    render: () => <Wrapper {...props} defaultSource="FILESYSTEM" />,
  },
]

/**
 * @param {React.ComponentProps<typeof NewDocumentDialog>} props
 */
function Wrapper(props) {
  /** @type {React.MutableRefObject<any>} */
  const ref = React.useRef()

  React.useEffect(() => {
    ref.current?.showModal()
  }, [])

  return <NewDocumentDialog {...props} ref={ref} />
}
