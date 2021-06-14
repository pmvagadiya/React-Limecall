import React, { Component } from 'react'

import CommonInput from '../../common/CommonInput'
import CommonTable from '../../common/CommonTable3'
import Modal from '../../common/CommonNodeModal2'

import { CommonNotify } from '../../common/CommonNotify'

import { useAlert } from 'react-alert'

import axios from 'axios'
import { apiGet } from '../../api'
import { API_URL } from '../../api/constant'
import { Confirm } from 'semantic-ui-react'
import { updateMemberAvailability } from '../../api/manageTeamMates'
const apiToken = localStorage.getItem('access_token')

const modalDefaultData = [
  {
    headerTitle: 'Add Team Member',
    type: 'input',
    modalContent: [
      {
        placeholder: 'Full Name',
        input: 'full_name'
      },
      {
        placeholder: 'Email',
        input: 'email'
      }
    ]
  },
  {
    headerTitle: 'Member Teams',
    type: 'checkbox',
    modalContent: [
      {
        checkbox: 'Item 1'
      },
      {
        checkbox: 'Item 2'
      },
      {
        checkbox: 'Item 3'
      },
      {
        checkbox: 'Item 4'
      },
      {
        checkbox: 'Item 5'
      }
    ]
  },
  {
    headerTitle: 'Member Role',
    type: 'dropdown',
    name: 'role',
    modalContent: ''
  }
  // {
  //   headerTitle: 'Skill',
  //   type: 'dropdown',
  //   name: 'skills',
  //   modalContent: ['Sales', 'Marketing', 'Customer Support', 'Product']
  // }
]

const modalWrapper = {
  wrapper: 'modal2-wrapper',
  btnText: 'Add Team Member',
  inputStyle: 'modal-input-style'
}

class ManageTeamMates extends Component {
  //alert = useAlert()

  state = {
    dataTable: {
      type: '8',
      header: [
        {
          headerTitle: 'ID'
        },
        // {
        //   headerTitle: 'Phone No'
        // },
        {
          headerTitle: 'Name'
        },
        {
          headerTitle: 'Email'
        },
        {
          headerTitle: 'Role'
        },
        {
          headerTitle: 'Account Status'
        },
        // {
        //   headerTitle: 'Phone Number Status'
        // },
        {
          headerTitle: 'Availability'
        },
        {
          headerTitle: 'Action'
        }
      ],
      tableContentData: [],
      tableActualData: [],
      deleteHandle: this.deleteHandle
    },
    members: {
      total: 0,
      active: 0,
      away: 0,
      notAvailable: 0,
      availabile: 0
    },
    open: false,
    dataId: null,
    roleData: [],
    apiLoaded: false,
    modalData: modalDefaultData,
    isModalOpen: false,
    closeModal:false,
    dataName: null
  }

  componentWillMount = () => {
    this.fetchData()
    this.fetchTeam()
    this.getRoleData()
  }

  searchHandle = term => {
    let { dataTable } = this.state

    if (term === '') {
      dataTable.tableContentData = dataTable.tableActualData
      this.setState({ dataTable })
      return
    }

    let items = []

    dataTable.tableActualData.map((row, index) => {
      if (
        row.name.toLowerCase().includes(term.toLowerCase()) ||
        row.email.toLowerCase().includes(term.toLowerCase()) ||
        row.phone.toLowerCase().includes(term.toLowerCase())
      ) {
        items.push(row)
      }
    })
    dataTable.tableContentData = items
    this.setState({ dataTable })
  }

  changeInput = () => {}

  fetchTeam = () => {
    const { widget, loading } = this.props

    loading(true)

    let head = {
      headers: {
        Authorization: 'Bearer ' + apiToken
      }
    }
    const url = `${process.env.REACT_APP_BASE_APP_URL}/api/v1/team/teams`

    axios
      .get(url, head)
      .then(res => {
        loading(false)
        if (res.data.data) {
          let modalData = { ...this.state.modalData }
          modalData[1].modalContent = res.data.data
          this.setState({ apiLoaded: true })
        }
      })
      .catch(error => {
        loading(false)
      })
  }

  getLength(arr) {
    return Object.keys(arr).length
  }

  fetchData = () => {
    const { widget, loading } = this.props
    loading(true)

    let head = {
      headers: {
        Authorization: 'Bearer ' + apiToken
      }
    }
    const url = `${process.env.REACT_APP_BASE_APP_URL}/api/v1/team/members`

    axios
      .get(url, head)
      .then(res => {
        loading(false)
        if (res.data.data) {
          const data = res.data.data.members
          this.getLength(data)
          this.setMembers(res.data.data)
        }
      })
      .catch(error => {
        const { response = {} } = error || {}
        const { data = {} } = response
        const { message = '' } = data
        CommonNotify(message, 'error')
        loading(false)
      })
  }

  setMembers = data => {
    let { members, dataTable } = this.state
    let user = []
    let admin = data.admin
    let users = data.members

    users.unshift(admin)
    members.total = data.available_members
    members.active = data.active_members
    const notAvailableCount = data.members.filter(item => item.status === 0)
      .length
    const availableCount = data.members.filter(item => item.status === 1).length
    members.availabile = availableCount
    members.notAvailable = notAvailableCount
    members.away = data.active_members
    const tempobj = {
      id: 0,
      status: '',
      name: '',
      email: '',
      role: {},
      accountStatus: 0,
      phoneNumberStatus: '',
      phone: '',
      availability: 0,
      state: 0
    }

    users.map((row, index) => {
      let obj = { ...tempobj }

      obj.id = row.id
      obj.state = 'Not Active'
      if (row.state == 1) {
        obj.state = 'Active'
      }

      obj.name = row.first_name + ' ' + row.last_name
      obj.email = row.email
      obj.role = { value: row.role.id, text: row.role.name }
      obj.accountStatus = obj.state
      obj.availability = row.status

      if (row.user_phone_numbers.length) {
        obj.phone = row.user_phone_numbers[0].phone_number
      }

      obj.phoneNumberStatus = 'Not Verified'
      if (row.mobile_verification_status == 1) {
        obj.phoneNumberStatus = 'Verified'
      }

      user.push(obj)
    })

    dataTable.tableContentData = user
    dataTable.tableActualData = user
    this.setState({ members, dataTable })
  }
  handleData = data => {
    if (
      !data.role ||
      data.full_name == '' ||
      data.email == '' ||
      !data.teams.length
    ) {
      CommonNotify('Please select all fields', 'warning')
      return
    }

    const { widget, loading } = this.props

    loading(true)

    let head = {
      headers: {
        Authorization: 'Bearer ' + apiToken
      }
    }

    const url = `${process.env.REACT_APP_BASE_APP_URL}/api/v1/team/members`
    const body = {
      full_name: data.full_name,
      email: data.email,
      role: data.role
    }
    axios
      .post(url, body, head)
      .then(res => {
        loading(false)
        if (res.data.message[0] == 'Successfully') {
          this.setState({isModalOpen: false})
          CommonNotify('Team Member Added', 'success')
          this.handleDataRef()
          this.fetchData()
        }
      })
      .catch(error => {
        loading(false)
        if({ ...error }.response) CommonNotify({ ...error }.response.data.errors[0])
        CommonNotify("500 error occured")        
      })
  }

  getRoleData = () => {
    const url = `${process.env.REACT_APP_BASE_APP_URL}/api/v1/team/member-roles`
    let head = {
      headers: {
        Authorization: 'Bearer ' + apiToken
      }
    }
    axios
      .get(url, head)
      .then(res => {
        let modalData = { ...this.state.modalData }

        // this.setState({ roleData: res.data.data })
        const localData = res.data.data.map(item => {
          return { text: item.name, value: item.id }
        })
        modalData[2].modalContent = localData
        this.setState({ roleData: localData })      
        // setRoleData(localData)
      })
      .catch(err => {})
  }

  openConfirm = (id, full_name) => {
    this.setState({ open: true, dataId: id, dataName: full_name })
  }

  close = () => this.setState({ open: false })

  deleteTeam = id => {
    const { widget, loading } = this.props
    loading(true)
    let head = {
      headers: {
        Authorization: 'Bearer ' + apiToken
      }
    }
    const url = `${process.env.REACT_APP_BASE_APP_URL}/api/v1/team/delete-member/${this.state.dataId}`

    axios
      .delete(url, head)
      .then(res => {
        loading(false)
        if (res.data.data) {
          CommonNotify('Team Member Removed', 'success')
          this.fetchData()
          this.setState({ open: false })
        }
      })
      .catch(error => {
        loading(false)
        CommonNotify('Cant Remove Team Member')
      })
  }
  isModalOpenHandler = data => {
    this.setState({
      isModalOpen: data
    })
  }
  handleDataRef = (DataState, key, value) => {   
    const { loading } = this.props
    let data = 0
    if (DataState) {
      data = 1
    }
    loading(true)
    updateMemberAvailability(key, data)
      .then(res => {
        loading(false)
        if (res) {
          this.fetchData()
        }
      })
      .catch(error => {
        loading(false)
      })
  }

  render() {
    return (
      <div className="manage-teammates-wrapper manage_teammates_main">
        {/* <h3 className="bold-text">Team Settings</h3>
        <p className="subtext default-text sub-description">
          Search for, manage or add new teammates on Limecall
        </p> */}
        {/* <div className="textarea-wrapper">
          <p className="subtext default-text textarea-subtext">
            Press <span>enter</span> or <span>,</span> to add a tag. Press{' '}
            <span>Backspace</span> to edit previous tag
          </p>
        </div> */}
        <div className="input-search-wrapper">
          <p className="sub-text default-text input-description">
            <span>
              {this.state.members.availabile} Active /
              {this.state.members.notAvailable} Away
            </span>
            <span>
              Your plan has {this.state.members.active} seats available
            </span>
          </p>
          <div className="input-search-holder">
            <div className="input-search-box">
              <CommonInput
                onChange={e => this.searchHandle(e.target.value)}
                icon="search"
                disabled={this.state.isModalOpen}
                iconPosition="left"
                placeholder="Search Name or Email"
                background="gray"
              />
            </div>
            {this.state.apiLoaded && (
              <Modal
                modalWrapper={modalWrapper}
                handleData={this.handleData}
                modalData={this.state.modalData}
                isModalOpen={this.isModalOpenHandler}
                modalOpen={this.state.isModalOpen}                          
              />
            )}
          </div>
        </div>
        <div className="manage-teammates-table">
          <CommonTable
            dataTable={this.state.dataTable}
            deleteHandle={this.openConfirm}
            handleDataRef={this.handleDataRef}
            roleData={this.state.roleData}
            fetchData={this.fetchData}
          />
          <Confirm
            className="confirmBox-wrapper confirmBox_wrapper"
            open={this.state.open}
            header="Delete ManageTeam!"
            content={`Do you want to delete Manage Team -  ${this.state.dataName} ?`}
            onCancel={this.close}
            onConfirm={this.deleteTeam}
          />
        </div>
      </div>
    )
  }
}

export default ManageTeamMates
