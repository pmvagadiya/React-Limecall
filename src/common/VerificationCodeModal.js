import React from 'react'
import { Modal } from 'semantic-ui-react'

import CommonInput from '../common/CommonInput'
import CommonButton from './CommonButtons'

const VerificationCodeModal = props => {
  return (
    <Modal
      dimmer="inverted"
      trigger={
        <CommonButton
          content="Send Code"
          background="blue"
          btnClass="btn-sendcode"
        />
      }
      onClose={props.close}
      className="modal-inverted-verification"
    >
      <div className="modal-verification-wrapper">
        <h2 className="verification-code-title">
          Please type recieved verification code:
        </h2>
        <CommonInput name="verificationCode" type="text" />
      </div>
      <div className="btn-verification-wrapper">
        <CommonButton
          content="Verify"
          background="blue"
          btnClass="btn-verifycode"
        />
        <p className="try-verify-text">Try to send the SMS or call again</p>
      </div>
    </Modal>
  )
}

export default VerificationCodeModal
