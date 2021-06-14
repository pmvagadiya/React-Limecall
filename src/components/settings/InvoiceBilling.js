import React, { Component } from 'react'
import axios from 'axios'
import CommonTable from '../../common/CommonTable'
import { Dimmer, Loader, Image, Segment } from 'semantic-ui-react'

class Invoice extends Component {
  state = {
    dataTable: {
      type: '5',
      header: [
        {
          headerTitle: 'ID'
        },
        {
          headerTitle: 'Price'
        },
        {
          headerTitle: 'Date'
        },
        {
          headerTitle: 'Status'
        },
        {
          headerTitle: 'Currency'
        },
        {
          headerTitle: 'Download'
        }
      ],
      tableContentData: []
    },
    isLoading: true
  }
  componentDidMount() {
    const token = localStorage.getItem('access_token')
    const URL = `${process.env.REACT_APP_BASE_APP_URL}/api/v1/get-customer-invoices`

    let head = {
      headers: {
        Authorization: 'Bearer ' + token
      }
    }

    axios
      .get(URL, head)
      .then(res => {
        const d = res.data.data       

        const { dataTable } = this.state
        let allData = dataTable.tableContentData

        for (let index = 0; index < d.length; index++) {
          const result = {
            columnOne: d[index].id,
            columnTwo: d[index].amount,
            columnThree: d[index].date,
            columnFour: d[index].status,
            columnFive: d[index].currency,

            action: 'edit'
          }
          allData.push(result)
        }

        this.setState({ tableContentData: allData, isLoading: false })      
      })
      .catch(err => {       
        this.setState({ isLoading: false })
      })
  }

  render() {
    return (
      <>
        <Dimmer active={this.state.isLoading} style={{ position: 'fixed' }}>
          <Loader />
        </Dimmer>
        <div className="billing-invoice-margin invoices">
          <CommonTable dataTable={this.state.dataTable} type="5" />
        </div>
      </>
    )
  }
}

export default Invoice
