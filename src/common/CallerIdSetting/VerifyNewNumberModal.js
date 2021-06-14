import React from 'react'
import { Modal } from 'semantic-ui-react'

function VerifyNewNumberModal({ open, onClose, onOpen, children, className }) {
  return (
    <Modal
      onClose={onClose}
      onOpen={onOpen}
      open={open}
      dimmer="inverted"
      className={className}
    >
      <Modal.Header>Verify New Number</Modal.Header>
      <Modal.Content>
        <Modal.Description>{children}</Modal.Description>
      </Modal.Content>
    </Modal>
  )
}

export default VerifyNewNumberModal
