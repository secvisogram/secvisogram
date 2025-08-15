import { Button } from '@mui/material'
import { Dialog } from '@mui/material'
import { DialogActions } from '@mui/material'
import { DialogContent } from '@mui/material'
import { DialogContentText } from '@mui/material'
import { DialogTitle } from '@mui/material'
import { t } from 'i18next'
import React, { useState, useRef, useEffect } from 'react'

/**
 * @param {{
 *  label?: string
 *  description: string
 *  confirmLabel: string
 *  cancelLabel: string
 *  confirm(): void
 * }} params
 */
export const useAlert = ({
  label = t('alert.pleaseConfirm'),
  description,
  confirmLabel,
  cancelLabel,
  confirm,
}) => {
  const [isVisible, setIsVisible] = useState(false)

  const show = () => setIsVisible(true)
  const hide = () => setIsVisible(false)

  return {
    show,
    hide,
    Alert: () => (
      <>
        {isVisible && (
          <Alert
            label={label}
            description={description}
            cancelLabel={cancelLabel}
            confirmLabel={confirmLabel}
            onCancel={hide}
            onConfirm={confirm}
          />
        )}
      </>
    ),
  }
}

/**
 * @param {{
 *  label?: string
 *  description: string
 *  confirmLabel: string
 *  cancelLabel: string
 *  onConfirm(): void
 *  onCancel(): void
 * }} params
 */
const Alert = ({
  label = t('alert.pleaseConfirm'),
  description,
  confirmLabel,
  cancelLabel,
  onCancel,
  onConfirm,
}) => {
  const [open] = React.useState(true)

  /** @type {React.MutableRefObject<HTMLButtonElement | null>} */
  const defaultButtonRef = useRef(null)
  useEffect(() => {
    if (open) {
      setTimeout(() => {
        defaultButtonRef.current?.focus()
      }, 100)
    }
  }, [open])

  return (
    <React.Fragment>
      <Dialog
        className="alert-dialog"
        maxWidth={false}
        disableRestoreFocus
        open={open}
        onClose={onCancel}
      >
        <DialogTitle>{label}</DialogTitle>
        <DialogContent data-testid="alert">
          <DialogContentText
            className="alert-dialog-description"
            id="alert-dialog-description"
          >
            {description}
          </DialogContentText>
        </DialogContent>
        <DialogActions className="alert-buttons">
          <Button
            data-testid="alert-confirm_button"
            className="confirm-button"
            onClick={onConfirm}
          >
            {confirmLabel}
          </Button>
          <Button
            data-testid="alert-refute_button"
            className="refuse-button"
            onClick={onCancel}
            ref={defaultButtonRef}
          >
            {cancelLabel}
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  )
}

export default Alert
