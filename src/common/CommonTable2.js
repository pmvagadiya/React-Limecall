import React, { Fragment } from 'react'
import { Table } from 'semantic-ui-react'
import { Dimmer, Loader, Image, Segment, Confirm } from 'semantic-ui-react'

import InvertedModal from '../common/InvertedModal'
import EditModal from '../common/EditModal'

import time from '../assets/images/mini-clock.png'
import deleteIcon from '../assets/images/delete-icon.png'
import greenCheck from '../assets/images/Dashboard 2-10.png'

import CommonButtons from './CommonButtons'

import axios from 'axios'

import { useAlert } from 'react-alert'

const apiToken = localStorage.getItem('access_token')

const CommonTable = props => {
  const alert = useAlert()
  const { deleteTeam, loadTeam } = props

  const handleUpdatedData = data => {
    return props.handleUpdatedInfo(data)
  }

  const downloadInvoice = id => {
    let head = {
      headers: {
        Authorization: 'Bearer ' + apiToken
      }
    }
    const url = `${process.env.REACT_APP_BASE_APP_URL}/api/v1/download-invoice/${id}`

    axios
      .get(url, head)
      .then(res => {
        if (res.data.data) {         
          window.open(res.data.data)
        }
      })
      .catch(function(error) {
        // if (error.response) {
        //   // Request made and server responded
        //   // console.log(error.response.data)
        //   // console.log(error.response.status)
        //   // console.log(error.response.headers)
        // } else if (error.request) {
        //   // The request was made but no response was received
        //   // console.log(error.request)
        // } else {
        //   // Something happened in setting up the request that triggered an Error
        //   // console.log('Error', error.message)
        // }
      })
  }

  return (
    <div className="common-table-wrapper">
      <Dimmer active={props.tableLoading}>
        <Loader />
      </Dimmer>
      <Table singleLine>
        <Table.Header className="top-table-header">
          <Table.Row>
            {props.dataTable.header.map((data, i) => {
              return (
                <Table.HeaderCell
                  key={i}
                  className="default-text header-modal-style"
                  style={{ fontSize: '16px', fontWeight: 600 }}
                >
                  {data.headerTitle}
                </Table.HeaderCell>
              )
            })}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <Fragment>
            {props.dataTable.tableContentData.map((data, i) => {
              return (
                <Table.Row key={i} className="table-content-row">
                  {data.id && <Table.Cell>{data.id}</Table.Cell>}
                  <Table.Cell>{data.name}</Table.Cell>
                  <Table.Cell>
                    {data.default.toLowerCase() === 'no'
                      ? 'Seconday'
                      : 'Primary'}
                  </Table.Cell>
                  <Table.Cell>
                    <Fragment>
                      <EditModal
                        id={data.id}
                        teamName={data.name}
                        loadTeam={loadTeam}
                        // teamType={data.default}
                        handleUpdatedData={handleUpdatedData}
                      />
                    </Fragment>
                    <Fragment>
                      <div
                        style={{ marginLeft: '10px', display: 'inline-block' }}
                        className="delete-icon"
                      >
                        <img
                          onClick={e => deleteTeam(data.id, data.name)}
                          src={deleteIcon}
                          alt="delete"
                        />
                      </div>
                    </Fragment>
                  </Table.Cell>
                </Table.Row>
              )
            })}
          </Fragment>
        </Table.Body>
      </Table>
    </div>
  )
}

export default CommonTable
