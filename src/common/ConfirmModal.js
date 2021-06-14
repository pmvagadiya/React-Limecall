import React, { useState, useEffect } from 'react'
import { Button, Modal } from 'semantic-ui-react'

import CommonButtons from './CommonButtons'
import CommonInput from './CommonInput'
import CommonSelect from './CommonSelect'

const ConfirmModal = ({ handleOpen, heading = '', resId = 0 }) => {
  const [open, setOpen] = useState(true)
  const [data, setData] = useState({
    id: '#456768',
    columnOne: null,
    columnTwo: null,
    columnThree: null,
    action: 'edit'
  })

  const onChangeInput = e => {
    const { name, value } = e.target
    if (name === 'name') {
      data.columnOne = value
    } else if (name === 'type') {
      data.columnTwo = value
    }
    setData(data)
  }

  const onSave = () => {
    setOpen(false)
    handleOpen(resId, true)
  }

  const handleModalOpen = () => {
    setOpen(true)
  }

  const handleModalClose = () => {
    setOpen(false)
    handleOpen(resId, false)
  }

  const onChangeSelectFilter = ({ name, value }) => {
    if (name === 'teamMembers') {
      data.columnThree = value
    }
  }

  return (
    <Modal
      className="modal-wrapper"
      basic
      size="mini"
      open={open}
      onClose={handleModalClose}
      closeIcon
    >
      <Modal.Header className="modal-header" style={{ marginTop: '30px' }}>
        You Want To Delete No {heading}
      </Modal.Header>
      <Modal.Content>
        {/* <div className="modal-input-wrapper">
          <p className="modal-input-text default-text">Type</p>
          <CommonInput
            onChange={onChangeInput}
            inputStyle="modal-input"
            name="type"
          />
        </div> */}

        {/* <div className="modal-input-wrapper">
          <p className="modal-input-text default-text">Add Team Members</p>
          <CommonSelect
            name="teamMembers"
            placeholder="Add Team Members"
            options={['Sachin Hegde', 'Satish G']}
            onChange={(e, result) => onChangeSelectFilter(result)}
          />
        </div> */}
      </Modal.Content>
      <Modal.Actions className="modal-button-wrapper">
        <CommonButtons
          onClick={onSave}
          content="Yes"
          background="blue"
          btnClass="btn-modal-style"
        />

        <CommonButtons
          onClick={handleModalClose}
          content="No"
          background="blue"
          btnClass="btn-modal-style"
        />
      </Modal.Actions>
    </Modal>
  )
}

export default ConfirmModal
