import React, { Fragment } from 'react'
import { Table } from 'semantic-ui-react'

import InvertedModal from '../common/InvertedModal'
import EditModal from '../common/EditModal'

import time from '../assets/images/mini-clock.png'
import deleteIcon from '../assets/images/delete-icon.png'
import greenCheck from '../assets/images/Dashboard 2-10.png'

import CommonButtons from './CommonButtons'

import axios from 'axios'

import { useAlert } from 'react-alert'

const apiToken = localStorage.getItem('access_token')

const CommonTable2 = props => {
  const alert = useAlert()

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
        // } else if (error.request) {
        //   // The request was made but no response was received
        //   console.log(error.request)
        // } else {
        //   // Something happened in setting up the request that triggered an Error
        //   console.log('Error', error.message)
        // }
      })
  }

  return (
    <div className="common-table-wrapper">
      <Table singleLine>
        <Table.Header className="top-table-header">
          <Table.Row>
            {props.dataTable.header.map((data, i) => {
              return (
                <Table.HeaderCell
                  key={i}
                  className="default-text header-modal-style"
                  style={{ fontSize: '16px', fontWeight: 400 }}
                >
                  {data.headerTitle}
                </Table.HeaderCell>
              )
            })}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {props.dataTable.type === '4' ? (
            <Fragment>
              {props.dataTable.tableContentData.map((data, i) => {
                return (
                  <Table.Row
                    key={i}
                    className="table-content-row"
                    style={{ fontSize: '14px' }}
                  >
                    {data.id && <Table.Cell>{data.id}</Table.Cell>}
                    <Table.Cell>
                      {data.columnOne}
                      {data.verify === true ? (
                        <Fragment>
                          <img
                            src={greenCheck}
                            className="verify"
                            alt="green check"
                            style={{ marginLeft: '10px' }}
                          />
                        </Fragment>
                      ) : data.verify === false ? (
                        <Fragment>
                          <InvertedModal />
                        </Fragment>
                      ) : null}
                    </Table.Cell>
                    <Table.Cell>
                      {data.verify === true ? (
                        <img src={time} className="mini-clock" alt="time" />
                      ) : (
                        ''
                      )}
                      {data.columnTwo}
                    </Table.Cell>
                    <Table.Cell>
                      {data.action === 'edit' ? (
                        <Fragment>
                          <EditModal
                            id={data.id}
                            teamName={data.columnOne}
                            teamType={data.columnTwo}
                            handleUpdatedData={handleUpdatedData}
                          />
                        </Fragment>
                      ) : data.verify === true ? (
                        <Fragment>
                          <img
                            src={deleteIcon}
                            className="delete-icon"
                            alt="delete"
                          />
                        </Fragment>
                      ) : (
                        data.action
                      )}
                    </Table.Cell>
                  </Table.Row>
                )
              })}
            </Fragment>
          ) : props.dataTable.type === '3' ? (
            <Fragment>
              {props.dataTable.tableContentData.map((data, i) => {
                return (
                  <Table.Row key={i} className="table-content-row">
                    <Table.Cell>{data.id}</Table.Cell>
                    <Table.Cell>{data.name}</Table.Cell>
                    <Table.Cell>{data.type}</Table.Cell>
                  </Table.Row>
                )
              })}
            </Fragment>
          ) : props.dataTable.type === '6' ? (
            <Fragment>
              {props.dataTable.tableContentData.map((data, i) => {
                return (
                  <Table.Row key={i} className="table-content-row">
                    <Table.Cell>{data.value}</Table.Cell>
                    <Table.Cell>{data.block_reason}</Table.Cell>
                    <Table.Cell>{data.created_at}</Table.Cell>
                    <Table.Cell>
                      {' '}
                      <CommonButtons
                        onClick={e => props.unBlockUser(data.id)}
                        content="Unblock"
                        type="button"
                        btnClass="btn-cancel"
                      />
                    </Table.Cell>
                  </Table.Row>
                )
              })}
            </Fragment>
          ) : props.dataTable.type === '7' ? (
            <Fragment>
              {props.dataTable.tableContentData.map((data, i) => {
                return (
                  <Table.Row key={i} className="table-content-row">
                    <Table.Cell>{data.id}</Table.Cell>
                    <Table.Cell>{data.block_reason}</Table.Cell>
                    <Table.Cell>{data.created_at}</Table.Cell>
                    <Table.Cell>
                      <CommonButtons
                        onClick={e => props.unBlockUser(data.id)}
                        content="Unblock"
                        type="button"
                        btnClass="btn-cancel"
                      />
                    </Table.Cell>
                  </Table.Row>
                )
              })}
            </Fragment>
          ) : props.dataTable.type === '5' ? (
            <Fragment>
              {props.dataTable.tableContentData.map((data, i) => {
                return (
                  <Table.Row key={i} className="table-content-row">
                    <Table.Cell>{data.columnOne}</Table.Cell>
                    <Table.Cell>{data.columnTwo}</Table.Cell>
                    <Table.Cell>{data.columnThree}</Table.Cell>
                    <Table.Cell>{data.columnFour}</Table.Cell>
                    <Table.Cell>{data.columnFive}</Table.Cell>
                    <Table.Cell>
                      {' '}
                      <CommonButtons
                        onClick={e => downloadInvoice(data.columnOne)}
                        content="Invoice"
                        type="button"
                        btnClass="btn-cancel"
                      />
                    </Table.Cell>
                  </Table.Row>
                )
              })}
            </Fragment>
          ) : null}
        </Table.Body>
      </Table>
    </div>
  )
}

export default CommonTable2
