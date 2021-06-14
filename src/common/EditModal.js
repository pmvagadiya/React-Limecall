import React, { useState } from 'react'
import { Modal, Radio, Header } from 'semantic-ui-react'

import CommonButtons from './CommonButtons'
import CommonInput from './CommonInput'

const CommonModal = ({ id, teamName, teamType, handleUpdatedData, loadTeam }) => {
  const [open, setOpen] = useState(false)
  const [radioValue, setRadioValue] = useState(null)
  const [data, setData] = useState({
    idModal: id,
    columnOne: teamName,
    columnTwo: teamType
  })

  const onChangeInput = e => {
    const { name, value } = e.target
    let data1 = { ...data }
    data1.columnOne = value
    setData(data1)
  }

  const onSave = () => {
    setOpen(false)
    return handleUpdatedData(data)
  }

  const handleModalOpen = () => {
    setOpen(true)
  }

  const handleModalClose = () => {
    setOpen(false)
    let data1 = { ...data }
    data1.columnOne = teamName
    setData(data1)
  }

  // const handleRadioChange = (e, { value }) => {
  //   const { name } = e.target
  //   let data1 = { ...data }
  //   data1.columnTwo = value
  //   setData(data1)
  //   setRadioValue(value)
  // }

  return (
    <Modal
      className="modal-wrapper edit-team-info"
      trigger={<i className="fa fa-edit" onClick={handleModalOpen} />}
      basic
      size="small"
      open={open}
      onClose={handleModalClose}
    >
      <Header content="Edit Team Info" />
      <Modal.Content>
        <div className="modal-input-wrapper">
          <p className="modal-input-text default-text">Name:</p>
          <CommonInput
            value={data['columnOne']}
            onChange={e => onChangeInput(e)}
            checked={radioValue === 'this'}
            inputStyle="modal-input"
            name="name"
          />
        </div>
        {/* <div className="modal-radio-wrapper">
          <div className="heading-wrapper">
            <p className="modal-input-text default-text">Default Type:</p>
            <div className="button-wrapper">
              <Radio
                label="Yes"
                name="radioGroup"
                checked={radioValue === 'yes'}
                value="yes"
                onChange={(e, { value }) => handleRadioChange(e, { value })}
                checked={data['columnTwo'] === 'yes'}
              />
              <Radio
                label="No"
                name="radioGroup"
                checked={radioValue === 'no'}
                value="no"
                onChange={(e, { value }) => handleRadioChange(e, { value })}
                checked={data['columnTwo'] === 'no'}
              />
            </div>
          </div>
        </div> */}
        {/* <div className="modal-input-wrapper">
          <p className="modal-input-text default-text">Type</p>
          <CommonInput
            value={data['columnTwo']}
            onChange={onChangeInput}
            inputStyle="modal-input"
            name="type"
          />
        </div> */}
      </Modal.Content>
      <Modal.Actions className="modal-button-wrapper">
        <CommonButtons
          onClick={onSave}
          content="Save"
          background="blue"
          btnClass="btn-modal-style"
        />
        <CommonButtons
          onClick={handleModalClose}
          type="reset"
          content="Close"
          background="grey"
        />
      </Modal.Actions>
    </Modal>
  )
}
export default CommonModal
