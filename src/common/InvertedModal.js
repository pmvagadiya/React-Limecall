import React, { useState } from 'react'
import { Modal } from 'semantic-ui-react'
import Reaptcha from 'reaptcha'

import CommonButton from './CommonButtons'
import VerificationModal from './VerificationCodeModal'

const InvertedModal = () => {
  // const [verified, setVerified] = useState(false)
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)

  const onVerify = () => {
    return false
  }

  return (
    <Modal
      dimmer="inverted"
      trigger={<p className="verify">Verify</p>}
      onClose={close}
      open={open}
      className="modal-inverted"
    >
      <div className="modal-inverterd-wrapper">
        <h2 className="modal-inverted-title">
          You will receive a SMS with verification code from us. You will be
          asked to input a validation code and submit it using below form:
        </h2>
        <div className="recaptcha">
          <form>
            <Reaptcha
              size="500"
              sitekey="6Lf0bKcUAAAAAOPRucUr4RLTZE-PdgKDOwlx4Bg-"
              onVerify={onVerify}
            />
            {/* <button type="submit" disabled={!this.state.verified}>
            Submit
          </button> */}
          </form>
          <div className="inverted-modal-btn-wrapper">
            <VerificationModal />
            <CommonButton
              content="Call me"
              background="alt-blue"
              btnClass="btn-call-me"
            />
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default InvertedModal
