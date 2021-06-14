import React, { useState } from 'react'
import { Modal } from 'semantic-ui-react'
import Reaptcha from 'reaptcha'

import CommonButton from './CommonButtons'
import VerificationModal from './VerificationCodeModal'

const VerifyModal = ({ VerifyCode, Number, closeHandle }) => {
  // const [verified, setVerified] = useState(false)
  const [open, setOpen] = useState(true)
  const close = () => setOpen(false)

  const onVerify = () => {
    return false
  }

  const onClose = () => {}

  return (
    <Modal
      dimmer="inverted"
      onClose={close}
      open={open}
      className="modal-inverted"
    >
      <div className="modal-inverterd-wrapper">
        <h2 className="modal-inverted-title">
          We are trying to reach you on {Number}.
        </h2>
        <h2 className="modal-inverted-title">
          Please answer the call and enter this code for verification.
        </h2>
        <h2 className="modal-inverted-title">Thanks.</h2>
        <div className="recaptcha">
          <h1 style={{ fontSize: '4rem', color: '#d2d2d2' }}>{VerifyCode}</h1>
          <div className="inverted-modal-btn-wrapper">
            <CommonButton
              content="Close"
              background="alt-blue"
              btnClass="btn-call-me"
              onClick={closeHandle}
            />
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default VerifyModal
