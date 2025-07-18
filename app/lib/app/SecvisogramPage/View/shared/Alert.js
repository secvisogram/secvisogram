import { Button } from '@mui/material'
import { Dialog } from '@mui/material'
import { DialogActions } from '@mui/material'
import { DialogContent } from '@mui/material'
import { DialogContentText } from '@mui/material'
import { DialogTitle } from '@mui/material'
import { t } from 'i18next'
import React, { useState, useCallback } from 'react'

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
  const [open, setOpen] = React.useState(true)

  const handleClose = () => {
    setOpen(false)
  }

  const defaultButtonRef = useCallback((inputElement) => {
    if (inputElement) {
      inputElement.focus()
    }
  }, [])

  return (
    <React.Fragment>
      <Dialog
        className="alert-dialog"
        maxWidth={false}
        disableRestoreFocus
        open={open}
        onClose={(event, reason) => {
          console.log(event, reason)
          if (reason === 'backdropClick') {
            console.log('here')
            handleClose()
          }
        }}
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
