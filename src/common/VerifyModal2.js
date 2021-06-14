import React, { useState } from 'react'
import { Modal } from 'semantic-ui-react'
import Reaptcha from 'reaptcha'
import CommonInput from './CommonInput'

import CommonButton from './CommonButtons'
import VerificationModal from './VerificationCodeModal'

const maxLengthCheck = (object) => {
  if (object.target.value.length > object.target.maxLength) {
    object.target.value = object.target.value.slice(0, object.target.maxLength)
  }
}

const VerifyModal2 = ({
  Number,
  closeHandle,
  submitHandle,
  changeHandle,
  open,
  contentData,
  submitDeleteHandle,
  modalLoadingButton
}) => {
  const numberWithSTDCode = Number && String(Number)[0] == '+' ? Number : '+' + String(Number)
  // const [verified, setVerified] = useState(false)
  return (
    <Modal
      dimmer="inverted"
      onClose={closeHandle}
      open={open}
      className="modal-inverted"
    >
      <div className="modal-inverterd-wrapper" style={{ textAlign: 'center' }}>
        <h2 className="modal-inverted-title">
          We have sent verification code to {numberWithSTDCode} <br />
          Enter your verification code
        </h2>

        <CommonInput
          onChange={(e) => {maxLengthCheck(e); changeHandle(e)}}          
          style={{ margin: '0 auto' }}
          name="apiKey"
          type = "number" 
          maxLength = "6" 
          placeholder="Enter Code"
          background="gray"
          defaultValue={''}
        />

        <div className="recaptcha">
          <div className="inverted-modal-btn-wrapper">
            {contentData === 'addNumber' ? (
              <CommonButton
                content="Submit"
                background="blue"
                btnClass="btn-call-me"
                onClick={submitHandle}
                loading={modalLoadingButton}
              />
            ) : (
              <CommonButton
                content="Submit"
                background="blue"
                btnClass="btn-call-me"
                onClick={submitDeleteHandle}
                loading={modalLoadingButton}
              />
            )}

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

export default VerifyModal2
