import React, { Component, Fragment } from 'react'
import axios from 'axios'
import ReactPhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import 'react-phone-number-input/style.css'
import CommonButton from '../../common/CommonButtons'
import CommonInput from '../../common/CommonInput'
import { CommonNotify } from '../../common/CommonNotify'
import CommonSelect from '../../common/CommonSelect'
import CommonTable from '../../common/CommonTable'
import InvertedModal from '../../common/VerifyModal'
import VerifyNewNumberModal from '../../common/CallerIdSetting/VerifyNewNumberModal'
import { callerIdOptionApi } from '../../api/settings'

const apiToken = localStorage.getItem('access_token')

class CallerIdSettings extends Component {
  state = {
    open: false,
    verifyNo: false,
    verified: false,
    verifyCode: '',
    verifyNumber: '',
    verifyCountryCode: '',
    type: '',
    name: '',
    allTableData: [],
    callRepValue: 'Limecall Number (default)',
    callCustomerValue: 'Limecall Number (default)',
    verifyModal: false,
    loading: false,
    callingYouModal: false,
    dropDownOption: ['New number', 'Limecall Number (default)']
  }
  componentDidMount = () => {
    this.tableData()
    this.fetchNumbers()
  }
  fetchNumbers = () => {
    this.props.loading(true)
    let head = {
      headers: {
        Authorization: 'Bearer ' + apiToken
      }
    }
    const url = `${process.env.REACT_APP_BASE_APP_URL}/api/v1/widget/get-widget-call-settings?widget_id=${this.props.widget.id}`

    axios
      .get(url, head)
      .then(res => {
        this.setState({
          callRepValue: res.data.data.caller_id.agent_caller_id_option.number,
          callCustomerValue: res.data.data.caller_id.caller_id.number
        })
        this.props.loading(false)
      })
      .catch(err => {
        const errors = { ...err }
        if (errors) {
          CommonNotify(errors.response.data.errors[0])
          this.props.loading(false)
          return
        } else {
          CommonNotify('Some thing went wrong')
          this.props.loading(false)
        }
      })
  }
  tableData = () => {
    const url = `${process.env.REACT_APP_BASE_APP_URL}/api/v1/user/caller-id`
    let head = {
      headers: {
        Authorization: 'Bearer ' + apiToken
      }
    }
    axios
      .get(url, head)
      .then(res => {
        let updateDropdownData = [
          ...this.state.dropDownOption,
          ...res.data.data
        ]
        const convertUpdateDropdownData = updateDropdownData.flat(1)
        updateDropdownData = res.data.data.map(item => item)
        this.setState({
          allTableData: res.data.data,
          dropDownOption: convertUpdateDropdownData
        })
      })
      .catch(err => {})
  }
  onChangeCountry = (value, country) => {
    this.setState({
      verifyNumber: value,
      verifyCountryCode: country.countryCode
    })
  }

  handleModalOpen = () => {
    let data = { ...this.state }
    data.open = true
    this.setState(data)
  }

  handleModalClose = () => {
    let data = { ...this.state }
    data.verifyNo = false
    data.verifyCode = ''
    this.setState(data)
  }

  startVerify = () => {
    if (this.state.verifyNumber === '') {
      CommonNotify('Please Enter Number First', 'warning')
      return
    }

    let head = {
      headers: {
        Authorization: 'Bearer ' + apiToken,
        'Content-Type': 'multipart/form-data'
      }
    }

    const bodyFormData = new FormData()
    bodyFormData.append('widget_id', this.props.widget.id)
    bodyFormData.append('phoneNumber', this.state.verifyNumber)
    bodyFormData.append('phone_country', this.state.verifyCountryCode)

    const url = `${process.env.REACT_APP_BASE_APP_URL}/api/v1/widget/${this.props.widget.id}/verify-caller-ids`

    this.setState({ loading: true })

    axios
      .post(url, bodyFormData, head)
      .then(res => {
        if (res.data.data) {
          CommonNotify('Successfully created id', 'success')
          let { verifyCode, verifyNo } = this.state
          verifyCode = res.data.data.validationCode
          verifyNo = true
          this.setState({
            verifyCode,
            verifyNo,
            loading: false,
            verifyModal: false,
            callingYouModal: true
          })
        }
      })
      .catch(error => {
        this.setState({ loading: false })
        if (error.response) {
          CommonNotify(error.response.data.errors[0], 'error')
        } else if (error.request) {
          // The request was made but no response was received
          
        } else {
          // Something happened in setting up the request that triggered an Error
         
        }
      })
  }

  sendCallerIdOption = async type => {
    try {
      const payload = {
        widget_id: this.props.widget.id,
        option: 'limecall_number',
        type: type
      }
      this.props.loading(true)
      await callerIdOptionApi(payload)
      CommonNotify('Caller Id Changed successfully', 'success')
      this.props.loading(false)
    } catch (error) {
      this.props.loading(false)
      CommonNotify('Something went wrong!', 'error')
    }
  }

  onChangeCallerId = (event, data, key) => {
    this.setState({ [key]: data.value })
    let type = 'agent_caller_id_option'
    if (key === 'callCustomerValue') {
      type = 'caller_id_option'
    }
    if (data.value === 'Limecall Number (default)') {
      this.sendCallerIdOption(type)
    } else if (data.value === 'New number') {
      this.setState({ verifyModal: true })
    } else {
      this.addCallerIdOption(data.value, type)
    }
  }

  addCallerIdOption = (data, type) => {
    this.setState({ loading: true })
    this.props.loading(true)
    let head = {
      headers: {
        Authorization: 'Bearer ' + apiToken,
        'Content-Type': 'multipart/form-data'
      }
    }
    const url = `${process.env.REACT_APP_BASE_APP_URL}/api/v1/widget/caller-id-option`
    const bodyFormData = new FormData()
    bodyFormData.append('widget_id', this.props.widget.id)
    bodyFormData.append('option', data)
    bodyFormData.append('type', type)

    axios
      .post(url, bodyFormData, head)
      .then(res => {
        CommonNotify('Successfully Aded', 'success')
        this.setState({ loading: false })
        this.props.loading(false)
      })
      .catch(err => {
        this.setState({ loading: false })
        this.props.loading(false)
      })
  }

  render() {
    const {
      callRepValue,
      callCustomerValue,
      verifyModal,
      callingYouModal,
      loading
    } = this.state
    return (
      <div className="callerID-settings-wrapper caller_section">
        <div className="caller-id-container">
          <div className="row-1">
            <div className="text">Number displayed to call rep:</div>{' '}
            <CommonSelect
              name="type"
              options={this.state.dropDownOption}
              value={callRepValue}
              onChange={(event, data) =>
                this.onChangeCallerId(event, data, 'callRepValue')
              }
            />{' '}
          </div>
          <div className="row-1">
            <div className="text">Number displayed to customer:</div>{' '}
            <CommonSelect
              name="type"
              options={this.state.dropDownOption}
              value={callCustomerValue}
              onChange={(event, data) =>
                this.onChangeCallerId(event, data, 'callCustomerValue')
              }
            />{' '}
          </div>
        </div>
        <div
          className="caller_id caller_is_main"
          style={{ display: 'flex', marginBottom: '50px' }}
        >
          <Fragment>
            <VerifyNewNumberModal
              open={callingYouModal}
              onClose={() => this.setState({ callingYouModal: false })}
              onOpen={() => this.setState({ callingYouModal: true })}
              className="calling-modal"
            >
              <div>
                <div className="verify-number-container">
                  We are trying to reach you on{' '}
                  <span className="verify-number">
                    {this.state.verifyNumber}
                  </span>
                </div>
                <div>
                  Please answer the call and enter this code for verification.
                </div>
                <div className="recaptcha">
                  <p>{this.state.verifyCode}</p>
                  <div className="btn-container">
                    <CommonButton
                      content="Close"
                      background="alt-blue"
                      btnClass="btn-call-me"
                      onClick={() => this.setState({ callingYouModal: false })}
                    />
                  </div>
                </div>
              </div>
            </VerifyNewNumberModal>
          </Fragment>
        </div>
        <div className="callerId-table-wrapper">
          {/* {this.state.verified ? (
            <p className="callerID-title">Your Mobile No already Verified</p>
          ) : (
            <p className="callerID-title">
              Verify your phone numbers to use them as Caller ID
            </p>
          )} */}
          {/* <CommonTable dataTable={data} /> */}
        </div>
        <VerifyNewNumberModal
          open={verifyModal}
          onClose={() => this.setState({ verifyModal: false })}
          onOpen={() => this.setState({ verifyModal: true })}
          className="verify-modal"
        >
          <div className="verify-modal-content">
            <ReactPhoneInput
              inputProps={{
                name: 'phone',
                required: true,
                autoFocus: true
              }}
              onChange={this.onChangeCountry}
              country={'us'}
              defaultCountry={'us'}
              value={this.state.verifyNumber}
            />
            <CommonButton
              onClick={() => this.startVerify()}
              type="button"
              content={loading ? 'Sending...' : 'Send'}
              background="Send"
            />
          </div>
        </VerifyNewNumberModal>
      </div>
    )
  }
}

export default CallerIdSettings
