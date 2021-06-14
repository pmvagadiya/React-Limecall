import React, { useState } from 'react'
import { Modal } from 'semantic-ui-react'

import CommonButtons from './CommonButtons'
import CommonInput from './CommonInput'

const EmailValidationModal = props => {
  return (
    <Modal
      className="modal-wrapper modal-email-validation"
      basic
      size="mini"
      open={props.open}
      onClose={props.handleModalClose}
      closeIcon
    >
      <Modal.Header className="modal-header">Email Conformation</Modal.Header>
      <Modal.Content>
        <div className="modal-input-wrapper">
          <p className="modal-input-text default-text">Verification Code</p>
          <CommonInput
            onChange={e => props.onChangeVerifyCode(e)}
            inputStyle="modal-input"
            name="name"
            disabled={props.isWaitRes}
          />
        </div>
        <Modal.Actions className="modal-button-wrapper">
          <CommonButtons
            onClick={props.handleModalClose}
            content="Close"
            background="light"
            btnClass="btn-modal-style"
          />
          <CommonButtons
            onClick={props.updateEmail}
            content="Save"
            background="blue"
            btnClass="btn-modal-style"
            loading={props.isWaitRes}
          />
        </Modal.Actions>
      </Modal.Content>
    </Modal>
  )
}
export default EmailValidationModal
