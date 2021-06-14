import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Modal, Radio, Dimmer, Loader, Dropdown } from 'semantic-ui-react'

import CommonButtons from './CommonButtons'
import CommonInput from './CommonInput'
import CommonSelect3 from './CommonSelect3'
import { CommonNotify } from './CommonNotify'

const apiToken = localStorage.getItem('access_token')

const modalContent = [
  {
    text: 'Manager',
    value: 17
  },
  {
    text: 'Widget Manager',
    value: 18
  },
  {
    text: 'Team Leader',
    value: 19
  },
  {
    text: 'Team Member',
    value: 20
  },
  {
    text: 'Operation Manager',
    value: 21
  },
  {
    value: 16
  }
]
const ManageTeamModal = prop => {
  const [open, setOpen] = useState(false)
  const [data, setData] = useState({
    id: prop.data.id,
    phone: prop.data.phone,
    name: prop.data.name,
    email: prop.data.email,
    role: { text: prop.data.role.text, value: prop.data.role.value },
    accountStatus: prop.data.accountStatus
  })

  const [loading, setLoading] = useState(false)

  const onChangeInput = e => {
    const { name, value } = e.target
    let data1 = { ...data }
    data1.name = value
    setData(data1)
  }

  const handleModalOpen = () => {
    setOpen(true)
  }

  const handleModalClose = () => {
    setOpen(false)
  }
  const memberRoleUpdateNameUpdate = data => {
    switch (data) {
      case 16:
        return 'Client'
      case 17:
        return ' Manager'
      case 18:
        return 'Widget Manager'
      case 19:
        return 'Team Leader'
      case 20:
        return 'Team Member'
      case 21:
        return 'Operation Manager'
      default:
        return ''
    }
  }
  const onChangeSelectFilter = (e, element) => {
    let { name, value } = element
    let data1 = { ...data }
    //const roleName = memberRoleUpdateNameUpdate(value)
    data1.role = {
      name: memberRoleUpdateNameUpdate(value),
      value: value
    }
    // roleName === '' ? data.role : roleName
    setData(data1)
  }
  const handleRadioChange = (e, { value }) => {
    setData({ ...data, accountStatus: value })
  }

  const memberRoleUpdate = data => {
    switch (data) {
      case 'Manager':
        return 17
      case 'Team Leader':
        return 19
      case 'Team Member':
        return 20
      case 'Client':
        return 30
      default:
        return ''
    }
  }

  const onSave = () => {
    setLoading(true)

    //const memberRoleData = memberRoleUpdate(data.role)
    let bodyData = {
      user_id: data.id,
      full_name: data.name,
      role: data.role.value
      // email: data.email
    }
    let head = {
      headers: {
        Authorization: 'Bearer ' + apiToken
      }
    }
    const url = `${process.env.REACT_APP_BASE_APP_URL}/api/v1/team/update-member`
    axios
      .post(url, bodyData, head)
      .then(res => {
        setOpen(false)
        CommonNotify(res.data.message[0], 'success')
        prop.fetchData()
        setLoading(false)
      })
      .catch(error => {       
        CommonNotify(
          error?.response?.data?.errors?.[0]
            ? error.response.data.errors[0]
            : 'Not able to Delete the Teammates'
        )
        setLoading(false)
      })    
  }
  return (
    <>
      <Modal
        className="modal-wrapper manageTeamModal"
        trigger={<i className="fa fa-edit" onClick={handleModalOpen} />}
        basic
        size="small"
        open={open}
        onClose={handleModalClose}
      >
        <Modal.Header className="modal-header">Edit Team Member</Modal.Header>
        <Modal.Content>
          {/* <div className="modal-input-wrapper">
            <p className="modal-input-text default-text">Phone Number:</p>
            <CommonInput
              defaultValue={data['phone']}
              onChange={e => onChangeInput(e)}
              inputStyle="modal-input"
              name="phone"
              className="manageteam"
            />
          </div> */}
          <div className="modal-input-wrapper">
            <p className="modal-input-text default-text">Name:</p>
            <CommonInput
              defaultValue={data['name']}
              onChange={e => onChangeInput(e)}
              inputStyle="modal-input"
              name="name"
              className="manageteam"
            />
          </div>
          <div className="modal-input-wrapper">
            <p className="modal-input-text default-text">Email:</p>
            <CommonInput
              defaultValue={data['email']}
              onChange={e => onChangeInput(e)}
              inputStyle="modal-input"
              name="email"
              disabled={true}
              className="manageteam"
            />
          </div>

          {prop.data.role.text !== 'Client' ? (
            <div className="modal-input-wrapper dropdown">
              <p className="modal-input-text default-text">Role:</p>
              {/* <CommonSelect3
              name="role"
              placeholder={data.role}
              options={roleData}
              onChange={onChangeSelectFilter}
            /> */}
              <Dropdown
                placeholder={prop.data.role.text}
                name="role"
                selection
                // disabled={prop.data.role.text === 'Client' ? true : false}
                options={prop.roleData}
                onChange={onChangeSelectFilter}
                className="manageteam"
              />
            </div>
          ) : null}
          {/* <div className="modal-input-wrapper">
            <p className="modal-input-text default-text">Account Status:</p>
            <div className="radio_button_fixed">
              <Radio
                label="Active"
                name="radioGroup"
                value={'Active'}
                checked={data.accountStatus === 'Active'}
                onChange={handleRadioChange}
              />
              <Radio
                label="Deactivate"
                name="radioGroup"
                value={'Not Active'}
                checked={data.accountStatus === 'Not Active'}
                onChange={handleRadioChange}
              />
            </div>
          </div> */}
        </Modal.Content>
        <Modal.Actions className="modal-button-wrapper">
          <CommonButtons
            onClick={onSave}
            content={
              loading ? (
                <Dimmer active={loading}>
                  <Loader />
                </Dimmer>
              ) : (
                'Save'
              )
            }
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
    </>
  )
}
export default ManageTeamModal
