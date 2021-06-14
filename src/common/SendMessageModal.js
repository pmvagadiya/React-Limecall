import React, { useState } from 'react'

import {
  Button,
  Dropdown,
  Header,
  Modal,
  Input,
  TextArea
} from 'semantic-ui-react'

import { sendMessage } from '../config/leadAPI'
import CommonButtons from './CommonButtons'

const SendMessageModal = ({ open, isModalClose, dropDownData, leadData }) => {
  const [sendMsgData, setSendMsgData] = useState({
    from: null,
    lead_id: leadData.id.toString().replace('#', ''),
    message: null,
    to: leadData?.phone_number
  })

  return (
    <Modal
      className="send-message-modal"
      onClose={isModalClose}
      closeIcon
      open={open}
      size="tiny"
    >
      <Header content="Send New Text Message" />
      <Modal.Content>
        <div className="send-message__dropdown">
          <label>From *</label>
          <Dropdown
            name="from"
            placeholder="Select Number"
            selection
            options={dropDownData}
            onChange={(e, data) =>
              setSendMsgData({ ...sendMsgData, from: data.value })
            }
          />
        </div>
        <div className="send-message__input">
          <label>To </label>
          <Input name="to" value={sendMsgData.to} disabled title="To" />
        </div>
        <div className="send-message__textarea">
          <label>Message * </label>
          <TextArea
            name="message"
            value={sendMsgData.message}
            onChange={e =>
              setSendMsgData({ ...sendMsgData, message: e.target.value })
            }
            rows={2}
            title="Message *"
          />
        </div>
      </Modal.Content>
      <Modal.Actions className="send-message__btn">
        <Button onClick={isModalClose} className="send-message__btn-grey">
          close
        </Button>
        <CommonButtons
          content="send"
          btnClass="send-message__btn-blue"
          background="#007bff"
          style={{ color: 'white' }}
          onClick={e => sendMessage(sendMsgData, setSendMsgData)}
        />
      </Modal.Actions>
    </Modal>
  )
}
export default SendMessageModal
