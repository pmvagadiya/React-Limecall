import React, { Component, Fragment } from 'react'

import CallForwardingToogle from '../../common/CallFowardingToggle'
import CommonGroupButton from '../../common/CommonGroupButton'
import { CommonNotify } from '../../common/CommonNotify'
import CommonButton from '../../common/CommonButtons'
import plus from '../../assets/images/plus.png'
import {Dimmer, Loader} from 'semantic-ui-react'

import axios from 'axios'

import InvertedModal from '../../common/VerifyModal2'
import { Button } from 'semantic-ui-react'


const webAppData = {
  forwardingTitle: ['Verify Number', 'Timeout', ' Enabled'],
  callId: 'webAppToggle',
  forwardRef: 'webApp',
  phoneValue: 'web',
  enabled: true,
  timeoutRef: 'webAppTime',
  active: false
}

const mobileAppData = {
  callId: 'mobileAppToggle',
  forwardRef: 'mobileApp',
  phoneValue: 'mobile',
  enabled: true,
  timeoutRef: 'mobileappTime'
}

const numberData = {
  type: 'select',
  callId: 'numberToggle',
  forwardRef: 'numberApp',
  enabled: false,
  timeoutRef: 'numberAppTime'
}

const sipData = {
  callId: 'sipToggle',
  forwardRef: 'sip',
  phoneValue: 'SIP',
  number: '91 7003 002 965',
  enabled: false,
  timeoutRef: 'sipAppTime'
}

// const CallForwarding = () > {

// }

class CallForwarding extends Component {
  constructor(props) {
    super(props)
    const apiToken = localStorage.getItem('access_token')
    const userId = localStorage.getItem('id')
    this.state = {
      numberApp: false,
      addForwardNumber: '',
      mobileAppTime: '',
      webAppTime: '',
      numberAppTime: '',
      isLoading: false,
      sipAppTime: '',
      verifyCode: false,
      verifyCodeDigit: '',
      verifyNum: '',
      verifyObj: null,
      webApp: webAppData,
      mobileApp: mobileAppData,
      forwardNo: [],
      webLoaded: false,
      isTextButton: false,
      openAddNumber: false,
      openDeleteNumber: false,
      apiToken,
      userId,
      modalLoadingButton: false
    }
  }

  handleDataRef = (DataRef, DataState) => {
    this.setState({ [DataRef]: DataState })
  }

  onChangeCountry = (value, object) => {
    this.setState({ verifyNum: value, verifyObj: object })
  }

  handleGroupBtnData = (toggleBtn, id) => {
    this.setState({ [id]: toggleBtn })
  }

  handleModalClose = () => {
    this.setState({
      verifyCode: false,
      openDeleteNumber: false,
      openAddNumber: false
    })
    this.setState({isLoading: false})
  }

  componentDidMount = () => {
    this.fetchSettings()
  }

  setWeb = data => {
    let webApp = { ...this.state.webApp }
    webApp.active = data
    this.setState({ webApp, webLoaded: true })   
  }

  fetchSettings = async () => {
    this.setState({isLoading: true})
    let head = {
      headers: {
        Authorization: 'Bearer ' + this.state.apiToken
      }
    }

    const w_id = await localStorage.getItem('widget_id');
    const url = `${process.env.REACT_APP_BASE_APP_URL}/api/v1/widget/get-widget-call-settings?widget_id=${w_id}`

    axios
      .get(url, head)
      .then(res => {
        this.setState({isLoading: false})
        if (res.data.data) {
          this.setNumbers(res.data.data.available_forward_no)
          this.setWeb(res.data.data.receive_call_browser)
        }
      })
      .catch(error => {
        this.setState({isLoading: false})
        const errors = { ...error }
        if (errors) {
          if (errors.response.data.errors) {
            CommonNotify(errors.response.data.errors[0])
          } else {
            CommonNotify('Some Thing went wrong')
          }
        }
      })
  }

  setNumbers = data => {
    // let forwardNo = [...this.state.forwardNo]
    let updateForwardNo = []
    updateForwardNo = data.map((row, index) => {
      // if (row.primary) {
      return {
        phone_number: row.phone_number,
        id: row.id,
        active: row.active,
        forwardRef: 'sip_' + row.id,
        callId: 'sip_' + row.id,
        primary: true
      }
        // forwardNo.push(temp)
      // }
    })
    this.setState({ forwardNo: updateForwardNo })
  }

  addNumforVerify = () => {
    if (!this.state.verifyObj) {
      CommonNotify('Please Add Number for Forwarding')
      return
    }

    this.setState({isLoading: true})
    let head = {
      headers: {
        Authorization: 'Bearer ' + this.state.apiToken
      }
    }
    const url = `${process.env.REACT_APP_BASE_APP_URL}/api/v1/user/send-verification-phone-number`

    var data = {
      user_id: this.state.userId,
      phone_country: this.state.verifyObj.countryCode,
      full_number: this.state.verifyNum,
      phone_number: this.state.verifyNum
    }

    axios
      .post(url, data, head)
      .then(res => {
        this.setState({isLoading: false})
        if (res.data.message == 'Successfully') {
          this.setState({ openAddNumber: true })
          CommonNotify('Verification code sent to Phone', 'success')
        } else {
          CommonNotify('Can`t Send Verification Code', 'error')
        }
      })
      .catch(er => {
        const errors = { ...er }
        if (errors) {
          if (errors.response.data.errors) {
            CommonNotify(errors.response.data.errors[0])
            this.setState({isLoading: false})
          } else {
            CommonNotify('Some thing went wrong')
            this.setState({isLoading: false})
          }
        }
      })
  }

  verifyNumber = () => {
    this.setState({ openAddNumber: true, modalLoadingButton: true })
    if (!this.state.verifyCodeDigit) {
      CommonNotify('Please Enter Verification Code', 'warning')
      this.setState({ modalLoadingButton: false })
      return
    }

    this.setState({isLoading: true})
    let head = {
      headers: {
        Authorization: 'Bearer ' + this.state.apiToken
      }
    }
    const url = `${process.env.REACT_APP_BASE_APP_URL}/api/v1/user/verify-user-phone-number`

    var data = {
      verification_code: this.state.verifyCodeDigit
    }

    axios
      .post(url, data, head)
      .then(res => {
        this.setState({isLoading: false})
        this.setState({ verifyCode: false })
        if (res.data.message == 'Successfully') {
          CommonNotify('Phone Number Added', 'success')
          this.setState({
            verifyCodeDigit: '',
            verifyCode: false,
            verifyNum: '',
            openAddNumber: false,
            modalLoadingButton: false,
            isTextButton: false
          })
          this.fetchSettings()
        } else {
          CommonNotify('Cant Add Phone Number')
          this.setState({ modalLoadingButton: false })
        }
      })
      .catch(er => {
        const errors = { ...er }
        if (errors) {
          if (errors.response.data.errors) {
            CommonNotify(errors.response.data.errors[0])
            this.setState({ modalLoadingButton: false })
            this.setState({isLoading: false})
          } else {
            CommonNotify('Some thing went wrong')
            this.setState({ modalLoadingButton: false })
            this.setState({isLoading: false})
          }
        }
      })
  }

  saveSetting = (val, index, number) => {
    //this.setState({ webLoaded: 2 })
    if (index == 'webApp') {
      this.toggleWeb(val)
      return
    }
    this.togglePhone(val, number)
  }

  toggleWeb = val => {
    //if (this.state.webLoaded !== 2) return

    this.setState({isLoading: true})
    let head = {
      headers: {
        Authorization: 'Bearer ' + this.state.apiToken
      }
    }

    const data = val == true ? 1 : 0

    const url = `${process.env.REACT_APP_BASE_APP_URL}/api/v1/user/update-browser-availability/${this.state.userId}/${data}`
    axios
      .get(url, head)
      .then(res => {
        this.setState({isLoading: false})
        if (res.data.message.success) {
          //CommonNotify('Setting Saved', 'success')
        } else {
          CommonNotify(res.data.message.error[0])
        }
      })
      .catch(error => {
        const errors = { ...error }
        if (errors) {
          if (errors.response.data.errors) {
            CommonNotify(errors.response.data.errors[0])
            this.setState({isLoading: false})
          } else {
            CommonNotify('Some thing went wrong')
            this.setState({isLoading: false})
          }
        }
      })
  }

  togglePhone = (val, number) => {
    this.setState({isLoading: true})
    let head = {
      headers: {
        Authorization: 'Bearer ' + this.state.apiToken
      }
    }

    const data = {
      phone_number: number,
      status: val == true ? 1 : 0
    }

    const url = `${process.env.REACT_APP_BASE_APP_URL}/api/v1/user/change-number-status`
    axios
      .post(url, data, head)
      .then(res => {
        this.setState({isLoading: false})
        if (res.data.message.success) {
          //CommonNotify(res.data.message.success[0], 'success')

        } else {
          CommonNotify(res.data.message.error[0])
        }
      })
      .catch(error => {
        const errors = { ...error }
        if (errors) {
          if (errors.response.data.errors) {
            CommonNotify(errors.response.data.errors[0])
            this.setState({isLoading: false})
          } else {
            CommonNotify('Some thing went wrong')
            this.setState({isLoading: false})
          }
        }
      })
  }

  addTextButton = () => {
    this.setState({ isTextButton: true })
  }

  deleteContactNumber = rowData => {
    this.setState({isLoading: true})
    let head = {
      headers: {
        Authorization: 'Bearer ' + this.state.apiToken
      }
    }
    const url = `${process.env.REACT_APP_BASE_APP_URL}/api/v1/user/delete-phone-number`
    const data = {
      phone_number: rowData.phone_number,
    }
    axios
      .post(url, data, head)
      .then(res => {
        this.setState(
          {
            verifyCodeDigit: '',
            verifyCode: false,
            verifyNum: '',
            openDeleteNumber: false,
            isTextButton: false,
            modalLoadingButton: false
          },
          () => this.fetchSettings()
        )
      })
      .catch(err => {
        const errors = { ...err }
        if (errors) {
          if (errors.response.data.errors) {
            CommonNotify(errors.response.data.errors[0])
            this.setState({isLoading: false})
          } else {
            CommonNotify('Some thing went wrong')
            this.setState({isLoading: false})
          }
        }
      })
  }

  submitDeleteHandle = () => {
    this.setState({ modalLoadingButton: true })
    if (!this.state.verifyCodeDigit) {
      CommonNotify('Please Enter Verification Code')
      this.setState({ modalLoadingButton: false })
      return
    }

    this.setState({isLoading: true})
    let head = {
      headers: {
        Authorization: 'Bearer ' + this.state.apiToken
      }
    }
    const url = `${process.env.REACT_APP_BASE_APP_URL}/api/v1/user/delete-phone-number`

    var data = {
      confirmation_code: this.state.verifyCodeDigit,
      phone_number: this.state.verifyNum
    }

    axios
      .post(url, data, head)
      .then(res => {
        this.setState({isLoading: false})
        // this.setState({ verifyCode: false })
        if (res.data.message == 'Successfully') {
          CommonNotify('Phone number deleted successfully', 'success')
          this.setState(
            {
              verifyCodeDigit: '',
              verifyCode: false,
              verifyNum: '',
              openDeleteNumber: false,
              isTextButton: false,
              modalLoadingButton: false
            },
            () => this.fetchSettings()
          )
        } else {
          CommonNotify('Cant Add Phone Number')
          this.setState({ modalLoadingButton: false })
        }
      })
      .catch(er => {
        const errors = { ...er }
        if (errors) {
          if (errors.response.data.errors) {
            CommonNotify(errors.response.data.errors[0])
            this.setState({ modalLoadingButton: false })
            this.setState({isLoading: false})
          } else {
            CommonNotify('Some thing went wrong')
            this.setState({ modalLoadingButton: false })
            this.setState({isLoading: false})
          }
        }
      })
  }

  render() {
    return (
      <>
      <Dimmer active={this.state.isLoading}>
        <Loader></Loader>
      </Dimmer>
      <div className="call-forwarding-wrapper call_rorwarding_main">
                  <p className="title-label" 
            style ={{ fontSize: '16px', marginTop: 52}}>
            Divert incoming calls to your mobile phone once office hours are over
          </p>
        <div className="call-forwarding-holder call_rorwarding">

          {this.state.webLoaded && (
            <CallForwardingToogle
              handleDataRef={this.saveSetting}
              dataToggle={this.state.webApp}
              active={this.state.webApp.active === 1 ? true : false}
            />
          )}

          {this.state.forwardNo.map(row => (
            <div className="call_forwarding_toogle">
              <CallForwardingToogle
                handleDataRef={this.saveSetting}
                dataToggle={row}
                number={row.phone_number}
                active={row.active === 1 ? true : false}
              />
              <i
                class="fas fa-trash-alt delete_icon"
                onClick={() => this.deleteContactNumber(row)}
              ></i>
            </div>
          ))}
          {this.state.isTextButton ? (
            <CallForwardingToogle
              dataToggle={numberData}
              noToggle
              isButton={true}
              onChangeCountry={this.onChangeCountry}
              dataNumber={this.state.verifyNum}
              addNumforVerify={this.addNumforVerify}
            />
          ) : (
            <div className="add-forwarding-wrapper">
              <Button
                className="add-number"
                onClick={this.addTextButton}
              >
                + Add Number
              </Button>
            </div>
          )}
        </div>
        {/* <div className="add-forwarding-wrapper">
          <div
            className="add-number"
            style={{ display: 'inline' }}
            onClick={this.addNumforVerify}
          >
            <Button>+ Add Forwarding number</Button>
          </div>
        </div> */}

        <Fragment>
          {/* {this.state.verifyCode && ( */}
          <InvertedModal
            closeHandle={this.handleModalClose}
            submitHandle={this.verifyNumber}
            changeHandle={e =>
              this.setState({ verifyCodeDigit: e.target.value })
            }
            Number={this.state.verifyNum}
            VerifyCode={this.state.verifyCode}
            open={this.state.openAddNumber}
            contentData="addNumber"
            modalLoadingButton={this.state.modalLoadingButton}
          />
          <InvertedModal
            closeHandle={this.handleModalClose}
            changeHandle={e =>
              this.setState({ verifyCodeDigit: e.target.value })
            }
            Number={this.state.verifyNum}
            VerifyCode={this.state.verifyCode}
            open={this.state.openDeleteNumber}
            contentData="deleteNumber"
            submitDeleteHandle={this.submitDeleteHandle}
            modalLoadingButton={this.state.modalLoadingButton}
          />
          {/* )} */}
        </Fragment>

        {/* <div className="ring-number-wrapper">
          <CommonGroupButton
            title="Ring the numbers"
            identity="addForwardNumber"
            leftBtn="Sequeantially"
            rightBtn="Simultaneously"
            groupStyle="displaynumber-btn"
            handleGroupBtnData={this.handleGroupBtnData}
          />
        </div> */}

        {/* <div className="callfowarding-btn-wrapper">
          <CommonButton
            content="Save changes"
            background="blue"
            btnClass="btn-save"
          />
          <CommonButton
            content="Cancel"
            background="blue"
            btnClass="btn-cancel"
          />
        </div> */}
      </div>
      </>
    )
  }
}

export default CallForwarding
