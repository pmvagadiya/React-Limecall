import React, { useState, Fragment, useEffect } from 'react'
import { Button, Modal, Form, Radio, Checkbox } from 'semantic-ui-react'
import CommonButtons from './CommonButtons'
import CommonInput from './CommonInput'
import CommonCheckbox from './CommonCheckbox'
import CommonSelect3 from './CommonSelect3'
import CommonSelect from './CommonSelect'
import { useAlert } from 'react-alert'

const memberDefault = {
  full_name: '',
  email: '',
  teams: [],
  role: 0
}
const italicText = undefined
const CommonNodeModal = ({
  modalData,
  modalWrapper,
  handleData,
  modalOpen,
  isModalOpen
}) => {
  const alert = useAlert()
  const [open, setOpen] = useState(false)
  const [member, setMember] = useState(memberDefault)
  const [dataModal, setDataModal] = useState({
    checkbox: [],
    radio: '',
    dropdown: ''
  })

  useEffect(() => {
    if(!modalOpen){
      handleModalClose();
    }
  }, [modalOpen])

  const onChangeInput = e => {
    const key = e.target.name
    const value = e.target.value
    let member = memberDefault
    member[key] = value
    setMember(member)
    //currentDataModal[key] = value
    //setDataModal(currentDataModal)
  }
  const onChangeSelect = (e, value) => {
    //const value = e.target.innerText
    //const checkbox = dataModal.checkbox
    //const index = checkbox.indexOf(value)
    let teams = member
    const index = teams.teams.indexOf(value)
    if (index !== -1) {
      teams.teams.splice(index, 1)
    } else {
      teams.teams.push(value.value)
    }
    setMember(teams)
  }

  const onSave = () => {
    //setOpen(false)
    let tempMember = member
    setMember({ ...memberDefault })
    //isModalOpen(false)
    return handleData(tempMember)
  }

  const handleModalOpen = () => {
    setOpen(true)
    isModalOpen(true)
  }

  const handleModalClose = () => {
    setOpen(false)
    isModalOpen(false)
  }

  const onChangeRadio = e => {
    const key = e.target.parentNode.parentNode.getAttribute('name')
    const value = e.target.textContent
    let currentDataModal = dataModal

    currentDataModal[key] = value
    setDataModal(currentDataModal)
  }

  const onChangeSelectFilter = (e, element) => {
    let { name, value } = element
    let mDefault = { ...memberDefault }
    if (name == 'skills') {
      mDefault[name].push(value)
    } else {
      mDefault[name] = value
    }

    setMember(mDefault)
  }
  return (
    <Modal
      className={[modalWrapper.wrapper, 'add_team_member'].join(' ')}
      trigger={
        <Button className="btn-style btn-blue" onClick={handleModalOpen}>
          <i className="fas fa-plus"></i>
          {modalWrapper.btnText}
        </Button>
      }
      basic
      size="small"
      open={open}
      onClose={handleModalClose}
      closeIcon
    >
      <Fragment>
        {modalData.map((item, i) => {
          if (item.type === 'input') {
            return (
              <Fragment key={i}>
                <Modal.Header className="modal-header">
                  {item.headerTitle}
                </Modal.Header>
                <Modal.Content>
                  {item.modalContent.map((item2, j) => {
                    return (
                      <Fragment key={j}>
                        <div className="modal-input-wrapper add-team-modal">
                          <CommonInput
                            onChange={onChangeInput}
                            inputStyle={modalWrapper.inputStyle}
                            placeholder={item2.placeholder}
                            name={item2.input}
                            background="gray"
                          />
                        </div>
                      </Fragment>
                    )
                  })}
                </Modal.Content>
              </Fragment>
            )
          } else if (item.type === 'checkbox') {
            return (
              <Fragment key={i}>
                <Modal.Header className="modal-header">
                  {item.headerTitle}
                </Modal.Header>
                <Modal.Content>
                  <div className="modal-checkbox-wrapper">
                    {item.modalContent.map((item2, j) => {
                      return (
                        <Fragment key={j}>
                          <Checkbox
                            onChange={(e, value) => onChangeSelect(e, value)}
                            label={
                              <label>
                                {' '}
                                {item2.name}{' '}
                                {italicText === undefined ? (
                                  ''
                                ) : (
                                  <span className="text-italic">
                                    {' '}
                                    {`(${italicText})`}{' '}
                                  </span>
                                )}{' '}
                              </label>
                            }
                            value={item2.id}
                            checkboxStyle="modal-checkbox"
                            name="checkbox"
                          />
                          {/* <CommonCheckbox
                            onChange={(e,value) => onChangeSelect(e,value)}
                            text={item2.name}
                            value={item2.id}
                            checkboxStyle="modal-checkbox"
                            name="checkbox"
                          /> */}
                        </Fragment>
                      )
                    })}
                  </div>
                </Modal.Content>
              </Fragment>
            )
          } else if (item.type === 'radio') {
            return (
              <Fragment key={i}>
                <Modal.Header className="modal-header">
                  {item.headerTitle}
                </Modal.Header>
                <Modal.Content>
                  <div className="modal-checkbox-wrapper">
                    <Form>
                      {item.modalContent.map((itemRadio, index) => {
                        return (
                          <Fragment key={index}>
                            <Form.Field name="radio" key={index}>
                              <Radio
                                label={itemRadio.radio}
                                value={itemRadio.radio}
                                checked={dataModal.radio === itemRadio.radio}
                                onChange={onChangeRadio}
                              />
                            </Form.Field>
                          </Fragment>
                        )
                      })}
                    </Form>
                  </div>
                </Modal.Content>
              </Fragment>
            )
          } else if (item.type === 'dropdown') {
            return (
              <Fragment key={i}>
                <Modal.Header className="modal-header">
                  {item.headerTitle}
                </Modal.Header>
                <Modal.Content>
                  <div className="modal-checkbox-wrapper">
                    <Form>
                      <Fragment>
                        <Form.Field name="dropdown">
                          {item.modalContent[0] ? (
                            <CommonSelect3
                              name={item.name}
                              placeholder="Select Role"
                              options={item.modalContent}
                              onChange={onChangeSelectFilter}
                              defaultValue="hell"
                              disabled={false}
                            />
                          ) : (
                            <CommonSelect
                              name={item.name}
                              placeholder={item.modalContent[0]}
                              options={item.modalContent}
                              onChange={onChangeSelectFilter}
                            />
                          )}
                        </Form.Field>
                      </Fragment>
                    </Form>
                  </div>
                </Modal.Content>
              </Fragment>
            )
          } else {
            return null
          }
        })}
      </Fragment>
      <Modal.Actions className="modal-button-wrapper">
        <CommonButtons
          onClick={handleModalClose}
          content="Close"
          background="gray"
          btnClass="btn-modal-style"
        />
        <CommonButtons
          onClick={onSave}
          content="Add"
          background="blue"
          btnClass="btn-modal-style"
        />
      </Modal.Actions>
    </Modal>
  )  
}
export default CommonNodeModal
