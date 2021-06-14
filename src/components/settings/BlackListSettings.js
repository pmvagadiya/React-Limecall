import React, { useState, useRef, useEffect, useCallback } from 'react'

import CommonInput from '../../common/CommonInput'
import CommonButtons from '../../common/CommonButtons'
import CommonTable from '../../common/CommonTable'
import CommonSelect2 from '../../common/CommonSelect2'
import CommonSelect from '../../common/CommonSelect'
import ReactPhoneInput from 'react-phone-input-2'

import { CommonNotify } from '../../common/CommonNotify'

import parsePhoneNumber from 'libphonenumber-js'

import { useAlert } from 'react-alert'
import axios from 'axios'

const apiToken = localStorage.getItem('access_token')

const table = {
  phoneNumber: {
    type: '6',
    header: [
      { headerTitle: 'Phone Number' },
      { headerTitle: 'Reason' },
      { headerTitle: 'Date' },
      { headerTitle: 'Action' }
    ],
    tableContentData: []
  },
  ipAddress: {
    type: '6',
    header: [
      { headerTitle: 'IP Address' },
      { headerTitle: 'Reason' },
      { headerTitle: 'Date' },
      { headerTitle: 'Action' }
    ],
    tableContentData: []
  },
  emailAddress: {
    type: '6',
    header: [
      { headerTitle: 'Email Address' },
      { headerTitle: 'Reason' },
      { headerTitle: 'Date' },
      { headerTitle: 'Action' }
    ],
    tableContentData: []
  },
  users: {
    type: '7',
    header: [
      { headerTitle: 'ID' },
      { headerTitle: 'Reason' },
      { headerTitle: 'Date' },
      { headerTitle: 'Action' }
    ],
    tableContentData: []
  }
}

const BlackListSettings = ({ widget, loading }) => {
  const [tables, setTables] = useState(table)

  const [inputs, setInputs] = useState({
    id: '',
    reason: '',
    date: '',
    type_name: ''
  })
  const [blockType, setBlockType] = useState('')
  const [blockData, setBlockData] = useState({
    email: '',
    reason: '',
    phone: '',
    country: ''
  })
  const [getDataToCheck ,setGetDataToCheck] = useState([])
  useEffect(() => {
    if (!widget.id) return
    fetchBlockUsers()
  }, [widget])

  const setType = (val, data) => {
    setBlockType(data.value)
    setBlockData({ ...blockData, email: '' })
  }

  const addBlockList = () => {
    if (getDataToCheck.map(item => item.email).includes(blockData.email)) {
      CommonNotify('You have already added this email.', 'warning')
      return
    }    
    if (
      getDataToCheck.map(item => item.phone_number).includes(`+${blockData.phone}`)
    ) {
      CommonNotify('You have already added this Phone Number.', 'warning')
      return
    }
    if (getDataToCheck.map(item => item.ip).includes(blockData.email)) {
      CommonNotify('You have already added this IP.', 'warning')
      return
    }
    if (blockType === '') {
      CommonNotify('Please Select Block By Option', 'warning')
      return
    }

    if (blockData.email === '') {
      CommonNotify('Please Enter Data First', 'warning')
      return
    }

    loading(true)

    let head = {
      headers: {
        Authorization: 'Bearer ' + apiToken
      }
    }

    const data = {
      block_reason: blockData.reason,
      widget_id: widget.id
    }

    if (blockType == 'Email Address') {
      data.email = blockData.email
    } else if (blockType == 'Phone Number') {
      data.phone_number = blockData.phone
      data.phone_country = blockData.country.countryCode
      data.block_reason = blockData.reason
    } else {
      data.ip = blockData.email
    }

    const url = `${process.env.REACT_APP_BASE_APP_URL}/api/v1/widget/blacklist-user`
    axios
      .post(url, data, head)
      .then(res => {
        loading(false)
        if (res.data.message[0] == 'Successfully') {
          onResetHandler()
          CommonNotify('User Added to BlockList', 'success')
          fetchBlockUsers()
          setBlockData({ country: '' })
        }
      })
      .catch(error => {
        loading(false)
        CommonNotify(error.response.data.errors[0], 'warning')
      })
  }

  const setBlockUsers = data => {
    let emails = []
    let phones = []
    let ips = []
    let users = data
    data.map((row, index, rows) => {
      if (row.email != null) {
        row.value = row.email
        emails.push(row)
      }
      if (row.phone_number != null) {
        row.value = row.phone_number
        phones.push(row)
      }
      if (row.ip != null) {
        row.value = row.ip
        ips.push(row)
      }
    })

    let temp_table = { ...tables }
    temp_table.phoneNumber.tableContentData = phones
    temp_table.emailAddress.tableContentData = emails
    temp_table.ipAddress.tableContentData = ips
    temp_table.users.tableContentData = users

    setTables(temp_table)
  }

  const unBlockUser = userId => {
    loading(true)
    let head = {
      headers: {
        Authorization: 'Bearer ' + apiToken
      }
    }
    const url = `${process.env.REACT_APP_BASE_APP_URL}/api/v1/widget/remove-user-from-black-list?id=${userId}&widget_id=${widget.id}`
    axios
      .delete(url, head)
      .then(res => {
        loading(false)
        if (res.data.message[0] == 'Successfully') {
          CommonNotify('User Unblocked Successfully', 'success')
          fetchBlockUsers()
        }
      })
      .catch(error => {
        loading(false)
        CommonNotify('Cant Unblock User')
      })
  }

  const fetchBlockUsers = useCallback(() => {
    loading(true)
    let head = {
      headers: {
        Authorization: 'Bearer ' + apiToken
      }
    }
    const url = `${process.env.REACT_APP_BASE_APP_URL}/api/v1/widget/get-widget-call-settings?widget_id=${widget.id}`

    axios
      .get(url, head)
      .then(res => {
        loading(false)
        if (res.data.data.black_list) {
          setBlockUsers(res.data.data.black_list)
          setGetDataToCheck(res.data.data.black_list)
        }
      })
      .catch(error => {
        loading(false)
        CommonNotify('Cant Fetch Block Users')
      })
  })

  const languageRef = useRef('')
  const languagesOptions = ['Email Address', 'Phone Number', 'IP Address']

  const [items] = React.useState([
    { label: 'email', value: 'email' },
    { label: 'Ip', value: 'ip' },
    { label: 'Phone', value: 'Phone' }
  ])

  const selectLanguage = e => {
    //console.info(languageRef.value)
  }
  const onChange = e => {
    const { name, value } = e.target

    setBlockData({ ...blockData, [e.target.name]: e.target.value })
    // setBlockData({ value: value, reason: name === 'reason' ? value : null })

    //Init new date variable
    const dateObj = new Date()
    const month = dateObj.getUTCMonth() + 1 //months from 1-12
    const day = dateObj.getUTCDate()
    const year = dateObj.getUTCFullYear()
    const newdate = day + '/' + month + '/' + year

    inputs[name] = value
    inputs.date = newdate

    setInputs(inputs)
  }

  const onSave = () => {
    //regex for mac addresses
    // const isMac = /^(([A-Fa-f0-9]{2}[:]){5}[A-Fa-f0-9]{2}[,]?)+$/i
    //regex for ip addresses
    const isIpAdd = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/
    //regex for ph phone number
    const isPhoneNumber = /^(09|\+639)\d{9}$/

    const dataContent = {
      columnOne: inputs.id,
      columnTwo: inputs.reason,
      columnThree: inputs.date
    }

    if (isIpAdd.test(inputs.id)) {
      let data = tables.ipAddress.tableContentData
      let existingData = []

      data.forEach(item => {
        existingData.push(item.columnOne)
      })

      if (existingData.indexOf(dataContent.columnOne) === -1) {
        tables.ipAddress.tableContentData = [
          ...tables.ipAddress.tableContentData,
          dataContent
        ]
      } else {
        alert(`${inputs.id} has a duplicate!`)
      }
      setTables(tables)
    } else if (isPhoneNumber.test(inputs.id)) {
      let data = tables.phoneNumber.tableContentData
      let existingData = []

      data.forEach(item => {
        existingData.push(item.columnOne)
      })

      if (existingData.indexOf(dataContent.columnOne) === -1) {
        tables.phoneNumber.tableContentData = [
          ...tables.phoneNumber.tableContentData,
          dataContent
        ]
      } else {
        alert(`${inputs.id} has a duplicate!`)
      }

      setTables(tables)
    } else {
      let data = tables.users.tableContentData
      let existingData = []

      data.forEach(item => {
        existingData.push(item.columnOne)
      })

      if (existingData.indexOf(dataContent.columnOne) === -1) {
        tables.users.tableContentData = [
          ...tables.users.tableContentData,
          dataContent
        ]
      } else {
        alert(`${inputs.id} has a duplicate!`)
      }
      setTables(tables)
    }
  }

  // reset the input box value after the submit
  const onResetHandler = () => {
    setBlockData({ email: '', reason: '', phone: '' })
  }

  return (
    <div className="blacklist-settings">
      <h1 className="bold-text page-title">Block User</h1>
      <p className="subtext">
        Block unwanted contacts and IP's (e.g. +22 607 123 4567, 192.0.2.7, or
        68c1:da10:9008:4ab2:88ee:f68e:33c1:1154)
      </p>
      <div className="holder-input hold_input">
        <p className="block_user_title">
          Select Phone Number / IP Address / Email Address
        </p>
        <CommonSelect
          isGray
          ref={languageRef}
          onChange={setType}
          name="widgetLanguage"
          options={languagesOptions}
          placeholder="Select Option"
        />
        {blockType == 'Phone Number' ? (
          <ReactPhoneInput
            className="phone"
            name="phone"
            country={'us'}
            value={blockData.phone}
            onChange={(phone, country) => {
              setBlockData({ phone: phone, country: country })
            }}
            required={true}
            background="gray block__email"
          />
        ) : (
          <CommonInput
            onChange={onChange}
            name="email"
            type="text"
            value={blockData.email}
            placeholder={'Enter ' + blockType}
            background="gray block__email"
          />
        )}
      </div>
      <div className="holder-input">
        <CommonInput
          onChange={onChange}
          name="reason"
          type="text"
          value={blockData.reason}
          title="Reason for Blocking ( Optional )"
          background="gray"
        />
        <CommonButtons
          onClick={e => addBlockList()}
          type="submit"
          content="Block"
          background="blue"
        />
      </div>

      <div className="holder-table">
        <h2 className="table-title">Blocked Phone Numbers</h2>
        <CommonTable dataTable={tables.phoneNumber} unBlockUser={unBlockUser} />
      </div>
      <div className="holder-table">
        <h2 className="table-title">Blocked IP Address</h2>
        <CommonTable dataTable={tables.ipAddress} unBlockUser={unBlockUser} />
      </div>
      <div className="holder-table blocked_email">
        <h2 className="table-title">Blocked Email Address</h2>
        <CommonTable
          dataTable={tables.emailAddress}
          unBlockUser={unBlockUser}
        />
      </div>
      <div className="holder-table">
        <h2 className="table-title">Blocked Users</h2>
        <CommonTable dataTable={tables.users} unBlockUser={unBlockUser} />
      </div>
    </div>
  )
}

export default BlackListSettings
