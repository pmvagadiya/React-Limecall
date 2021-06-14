import React, { Component } from 'react'
import axios from 'axios'
import { Dimmer, Loader, Image, Segment } from 'semantic-ui-react'

// import CommonTable from '../../common/CommonTable'

class Usage extends Component {
  state = {
    dataTable: {
      type: '3',
      header: [
        {
          headerTitle: 'Call Made To'
        },
        {
          headerTitle: 'Time'
        },
        {
          headerTitle: 'Credits Used'
        }
      ],
      tableContentData: [
        {
          columnOne: '+71-5676545443',
          columnTwo: '22-05-2019 22:45',
          columnThree: '$0.87'
        }
      ]
    },
    max_call: null,
    used_call: null,
    max_message: null,
    used_message: null,
    percent_message: null,
    percent_call: null,
    isLoading: true
  }

  componentDidMount() {
    const token = localStorage.getItem('access_token')
    const URL = `${process.env.REACT_APP_BASE_APP_URL}/api/v1/subscription/get-customer-usage`

    const settings = {
      url: URL,
      method: 'GET',
      timeout: 0,
      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer ' + token
      },
      processData: false,
      mimeType: 'multipart/form-data',
      contentType: false
    }

    return axios(settings)
      .then(res => {
        const d = res.data.data
        const p_call = (d.used_calls / d.max_calls) * 100
        const p_msg = (d.used_sms / d.max_sms) * 100
        this.setState({
          max_call: d.max_calls,
          used_call: d.used_calls,
          max_message: d.max_sms,
          used_message: d.used_sms,
          percent_call: p_call,
          percent_message: p_msg,
          isLoading: false
        })      
      })
      .catch(err => {
        console.error(err)
      })
  }

  render() {
    return (
      <>
        <Dimmer active={this.state.isLoading} style={{ position: 'fixed' }}>
          <Loader />
        </Dimmer>
        <div className="usage-wrapper">
          {/* <h2 className="default-text">Total Usage</h2>
        <CommonTable dataTable={this.state.dataTable} /> */}
          <h4>Usage</h4>
          <div className="usage-details-wrapper">
            <div className="usage-details">
              <div>
                <p>Billing Period</p>
              </div>
              <div>
                <p>2019/11/20 - Current</p>
              </div>
            </div>
            <div className="usage-details">
              <div>
                <p>Calls</p>
              </div>
              <div>
                <div className="progressbar">
                  <div
                    className="progressbar-inner"
                    style={{ width: `${this.state.percent_call}%` }}
                  ></div>
                </div>
                <label>Total: {this.state.max_call} </label>
                <span>Used: {this.state.used_call}</span>
              </div>
            </div>
            <div className="usage-details">
              <div>
                <p>Messages</p>
              </div>
              <div>
                <div class="progressbar">
                  <div
                    class="progressbar-inner"
                    style={{ width: `${this.state.percent_message}%` }}
                  ></div>
                </div>
                <label>Total: {this.state.max_message}</label>
                <span>Used: {this.state.used_message}</span>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default Usage
