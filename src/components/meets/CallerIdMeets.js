import React, { useState, Component } from 'react'
import 'react-phone-number-input/style.css'
import ReactPhoneInput from 'react-phone-input-2'
import Axios from 'axios'

const apiToken = localStorage.getItem('access_token')
class CallerIdMeets extends Component {

  state = {
    phoneNumber: '',
  }

  componentDidMount() {
    let head = {
      headers: {
        Authorization: 'Bearer ' + apiToken
      }
    }
    const url = `${process.env.REACT_APP_BASE_APP_URL}/api/v1/widget/get-widget-call-settings?widget_id=291`

    Axios
      .get(url, head)
      .then(res => {
        if (res.data.data) {         
          this.setState({ phoneNumber: res.data.data.caller_id.caller_id.number })
        }
      })
      .catch(er => {
        console.error(er)
      })
  }

  render() {
    const {dataNumber, onChange, defaultCountry} = this.props
    
    return (
      <div className="callerID-settings-wrapper callerID-meets-wrapper">
        <ReactPhoneInput
          onChange={onChange}
          defaultCountry={defaultCountry}
          value={dataNumber}
        />
        <p className="callerID-meets-placeholder">Limecall will first call you, then the recipient using {this.state.phoneNumber}</p>
      </div>
    )
  }
}

export default CallerIdMeets

