import React, { useState } from 'react'
import { Button, Modal } from 'semantic-ui-react'

import CommonButtons from './CommonButtons'
import CommonInput from './CommonInput'
import CommonSelect from './CommonSelect'

const CommonModal = ({ handleData }) => {
  const [open, setOpen] = useState(false)
  const [data, setData] = useState({
    id: '#456768',
    columnOne: null,
    columnTwo: null,
    columnThree: null,
    action: 'edit'
  })
  const [isErrorMessage, setIsErrorMessage] = useState(false)
  const onChangeInput = e => {
    const { name, value } = e.target
    setIsErrorMessage(false)
    if (name === 'name') {
      data.columnOne = value
    } else if (name === 'type') {
      data.columnTwo = value
    }

    setData(data)
  }

  const onSave = () => {
    if (!data.columnOne) {
      setIsErrorMessage(true)
      return
    }
    handleData(data)
    setOpen(false)
    setData(null)
    setIsErrorMessage(false)
  }

  const handleModalOpen = () => {
    setOpen(true)
    setData({
      ...data,
      name: ''
    })
  }

  const handleModalClose = () => {
    setOpen(false)
    setIsErrorMessage(false)
  }

  const onChangeSelectFilter = ({ name, value }) => {
    if (name === 'teamMembers') {
      data.columnThree = value
    }
  }

  return (
    <Modal
      className="modal-wrapper create-new-team-popup"
      trigger={
        <Button className="btn-style btn-blue" onClick={handleModalOpen}>
          Create Team
        </Button>
      }
      basic
      size="mini"
      open={open}
      onClose={handleModalClose}
      closeIcon
    >
      <Modal.Header className="modal-header">Create New Team</Modal.Header>
      <Modal.Content>
        <div className="modal-input-wrapper">
          <p className="modal-input-text default-text">Name</p>
          <CommonInput
            onChange={onChangeInput}
            inputStyle="modal-input"
            name="name"
          />
        </div>
        {isErrorMessage ? <span> Name field is required</span> : null}

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
          onClick={handleModalClose}
          content="Close"
          background="gray"
          btnClass="btn-modal-style"
        />
        <CommonButtons
          onClick={onSave}
          content="Save"
          background="blue"
          btnClass="btn-modal-style"
        />
      </Modal.Actions>
    </Modal>
  )
}

export default CommonModal
