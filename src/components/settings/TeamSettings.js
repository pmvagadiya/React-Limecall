import React, { Component, useEffect, useState } from 'react'

import CommonTable2 from '../../common/CommonTable2'
import Modal from '../../common/CommonModal'
import { CallApiGet, updateTeam, CallApi } from '../../helpers/CallApiGet'
import { useAuth } from '../authentication/auth'
import axios from 'axios'

import {
  Dimmer,
  Loader,
  Image,
  Segment,
  Confirm,
  Item
} from 'semantic-ui-react'
import { CommonNotify } from '../../common/CommonNotify'

const apiToken = localStorage.getItem('access_token')

class TeamSettings extends Component {
  state = {
    isLoading: true,
    tableLoading: false,
    dataTable: {
      type: '4',
      header: [
        {
          headerTitle: 'ID'
        },
        {
          headerTitle: 'Name'
        },
        {
          headerTitle: 'Type'
        },
        {
          headerTitle: 'Action'
        }
      ],
      tableContentData: []
    },
    open: false,
    dataId: null,
    isError: '',
    dataName: null
  }

  componentDidMount() {
    this.loadTeam()
  }

  loadTeam = () => {
    const data = []
    let head = {
      headers: {
        Authorization: 'Bearer ' + apiToken
      }
    }
    const url = `${process.env.REACT_APP_BASE_APP_URL}/api/v1/team/teams?limit=20000&offset=0`

    let table = { ...this.state.dataTable }

    axios
      .get(url, head)
      .then(res => {
        if (res.data.data) {
          table.tableContentData = res.data.data
          this.setState({
            dataTable: table,
            isLoading: false,
            tableLoading: false
          })
        }
      })
      .catch(err => {      
        this.setState({
          tableLoading: false
        })
      })
  }

  handleData = data => {
    if (data.columnOne !== null) {
      const { dataTable } = this.state
      const tableContentData = dataTable.tableContentData
      // const duplicate = tableContentData.find(
      //   contentData => contentData.id === data.id
      // )
      const apiData = {
        name: data.columnOne,
        type: data.columnTwo
      }

      CallApi(apiData)
        .then(res => {
          this.loadTeam()
        })
        .catch(err => {
          CommonNotify(err.message, 'error')
        })
    } else {
      CommonNotify('Name field is required', 'error')
    }
  }

  handleUpdatedInfo = data => {
    updateTeam(data).then(res => {
      this.loadTeam()
    })
  }

  openConfirm = (id, name) => {
    this.setState({ open: true, dataId: id, dataName: name })
  }

  close = () => this.setState({ open: false })

  deleteTeam = () => {
    this.setState({ tableLoading: true })
    // let table = { ...this.state.dataTable }

    // let datas = table.tableContentData

    // let newDataTable = datas.filter(data => {
    //   return data.id !== this.state.dataId
    // })

    // table.tableContentData = newDataTable
    // this.setState({ dataTable: table, isLoading: false })

    let head = {
      headers: {
        Authorization: 'Bearer ' + apiToken
      }
    }
    this.setState({ open: false })
    const url = `${process.env.REACT_APP_BASE_APP_URL}/api/v1/team/delete-team/${this.state.dataId}`
    axios
      .delete(url, head)
      .then(res => {
        if ((res.data.message[0] = 'Successfully')) {
          this.loadTeam()
          CommonNotify('Team deleted successfully', 'success')
        }
      })

      .catch(error => {
        CommonNotify(error.response.data.errors[0], 'error')
        this.setState({
          tableLoading: false
        })
      })
  }

  render() {
    const { dataTable } = this.state
    const len = dataTable.tableContentData
    return (
      <>
        <Dimmer active={this.state.isLoading} style={{ position: 'fixed' }}>
          <Loader />
        </Dimmer>
        <div className="teamsetting-wrapper team_settings">
          <div className="create-button-holder">
            <p className="create-button-title"> Total Teams {len.length}</p>{' '}
            <Modal handleData={this.handleData} />{' '}
          </div>{' '}
          <CommonTable2
            loadTeam={this.loadTeam}
            handleUpdatedInfo={this.handleUpdatedInfo}
            dataTable={this.state.dataTable}
            deleteTeam={this.openConfirm}
            tableLoading={this.state.tableLoading}
            type={4}
          />{' '}
          <Confirm
            className="confirmBox-wrapper"
            open={this.state.open}
            header="Delete Team!"
            content={`Do you want to delete Team -  ${this.state.dataName} ?`}
            onCancel={this.close}
            onConfirm={this.deleteTeam}
          />
        </div>
      </>
    )
  }
}

export default TeamSettings
