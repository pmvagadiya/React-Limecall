import React, { Fragment, useState, useEffect } from 'react'
import { Table } from 'semantic-ui-react'
import moment from 'moment'

import axios from 'axios'

const apiToken = localStorage.getItem('access_token')

const ScheduleTable = props => {
  const [tableData, setTableData] = useState([])
  useEffect(() => {
    if (props.date) {
      fetchScheduleDate()
    }
  }, [props.date])

  const getCurrentDate = () => {
    var today = new Date()
    var dd = String(today.getDate()).padStart(2, '0')
    var mm = String(today.getMonth() + 1).padStart(2, '0') //January is 0!
    var yyyy = today.getFullYear()

    return dd + '/' + mm + '/' + yyyy
  }

  const fetchScheduleDate = () => {
    let start_date = new Date(props.date.startDateFilter)
    let end_date = new Date(props.date.endDateFilter)

    start_date = moment(start_date)
    end_date = moment(end_date)
    start_date = start_date.format('DD/MM/YYYY')
    end_date = end_date.format('DD/MM/YYYY')

    props.loading(true)
    let head = {
      headers: {
        Authorization: 'Bearer ' + apiToken
      }
    }
    const today = getCurrentDate()
    const url = `${process.env.REACT_APP_BASE_APP_URL}/api/v1/leads/get-leads-in-specific-period?end_date=${end_date}&start_date=${start_date}`

    axios
      .get(url, head)
      .then(res => {
        if (res.data.data.leads) {
          props.loading(false)
          setTableData(res.data.data.leads)

          /*
        callData.totalCallToday = res.data.data.today_calls
        callData.totalMsgToday = res.data.data.today_messages
        callData.totalScheduleCall = res.data.data.today_upcoming_calls

        cardboxData[1].cardNum = callData.totalMsgToday
        cardboxData[2].cardNum = callData.totalCallToday
        cardboxData[3].cardNum = callData.totalScheduleCall
        this.setState({ cardboxState: cardboxData })
        */
        }
      })
      .catch(err => {
        props.loading(false)       
      })
  }

  return (
    <div className="common-table-wrapper">
      <Table singleLine>
        <Table.Header className="top-table-header">
          <Table.Row>
            {' '}
            {props.dataTable.header.map((data, i) => {
              return (
                <Table.HeaderCell
                  key={i}
                  className="default-text header-modal-style"
                >
                  {data.headerTitle}{' '}
                </Table.HeaderCell>
              )
            })}{' '}
          </Table.Row>{' '}
        </Table.Header>{' '}
        <Table.Body>
          {tableData && tableData.length ? (
            <Fragment>
              {tableData.map((data, i) => {
                return (
                  <Table.Row key={i} className="table-content-row">
                    <Table.Cell> {data.id} </Table.Cell>{' '}
                    <Table.Cell> {data.customer_name} </Table.Cell>{' '}
                    <Table.Cell> {data.request_call_time} </Table.Cell>{' '}
                  </Table.Row>
                )
              })}
            </Fragment>
          ) : (
            <Table.Row className="table-content-bottom">
              <Table.Cell></Table.Cell>
              <Table.Cell className="table-bottom">
                <div className="schedule_calls" style={{ textAlign: 'center' }}>
                  <p style={{ textAlign: 'center' }}>
                    No scheduled calls yet !
                  </p>
                </div>
              </Table.Cell>
              <Table.Cell> </Table.Cell>
            </Table.Row>
          )}
        </Table.Body>
      </Table>{' '}
    </div>
  )
}

export default ScheduleTable
