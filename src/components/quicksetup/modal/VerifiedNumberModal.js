import React from 'react'
import { Button, Header, Image, Label, Modal } from 'semantic-ui-react'
import CommonButtons from '../../../common/CommonButtons'


const VerifiedNumberModal = ({
  open,
  isModalOpen,
  isModalClose,
  Title,
  onChangeInput,
  onOtpVerification,
  onConfirmCode
}) => {
  return (
    <div>
      <Modal onClose={() => isModalOpen()} open={open} size="mini">
        <Modal.Header>{Title}</Modal.Header>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '20px 18px'
          }}
        >
          <label>Enter Your OTP:</label>
          <input
            type="text"
            name="Otp"
            onChange={e => onChangeInput(e)}
            disabled={onConfirmCode}
          />
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            margin: '11px 0'
          }}
        >
          <CommonButtons
            content="Save"
            background="blue"
            btnClass="btn-verify"
            onClick={() => onOtpVerification()}
            loading={onConfirmCode}
          />
          {/* <Button onClick={() => onOtpVerification()} primary>Save</Button> */}
          <Button onClick={() => isModalClose()}>Cancel</Button>
        </div>
      </Modal>
    </div>
  )
}
export default VerifiedNumberModal
