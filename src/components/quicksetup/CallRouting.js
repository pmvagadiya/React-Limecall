import React, { useState } from 'react'
import ReactPhoneInput from 'react-phone-input-2'
import { Dimmer, Loader } from 'semantic-ui-react'
import axios from 'axios'

import CommonButtons from '../../common/CommonButtons'
import ContentFooter from './ContentFooter'
import { CommonNotify } from '../../common/CommonNotify'
import VerifiedNumberModal from './modal/VerifiedNumberModal'

const CallRouting = ({ onClick, increaseSteps }) => {
  const [verifyNumber, SetVerifyNumber] = useState({
    full_number: '',
    phone_country: '',
    phone_number: ''
  })
  const [onConfirmCode, setOnConfirmCode] = useState(false)
  const [isDisabled, setIsDisabled] = useState(true)
  const [open, setOpen] = useState(false)

  const isModalOpen = () => {
    setOpen(true)
  }
  const isModalClose = () => {
    setOpen(false)
  }
  const [otp, setOtp] = useState('')
  const [isLading, setIsLoading] = useState(false)
  const apiToken = localStorage.getItem('access_token')
  const onChangeCountry = (e, phone) => {
    const numberData = {
      full_number: e,
      phone_country: phone.countryCode,
      phone_number: e
    }
    SetVerifyNumber(numberData)
  }
  const onVerifyNumber = () => {
    setOnConfirmCode(true)
    setIsLoading(true)
    const Url = `${process.env.REACT_APP_BASE_APP_URL}/api/v1/user/send-verify-phone-number`
    const head = {
      headers: {
        Authorization: 'Bearer ' + apiToken
      }
    }
    const data = verifyNumber
    axios
      .post(Url, data, head)
      .then(res => {
        setIsLoading(false)
        CommonNotify('Successful', 'success')
        setOnConfirmCode(false)
        isModalOpen()
      })
      .catch(error => {
        const errorMessage = { ...error }
        setIsLoading(false)
        if (errorMessage.response.data.errors) {
          CommonNotify(errorMessage.response.data.errors[0])
          setOnConfirmCode(false)
        } else {
          CommonNotify('Some thing went wronged')
          setOnConfirmCode(false)
        }
      })
  }
  const onChangeInput = e => {
    const name = e.target.value
    setOtp(name)
  }
  const onOtpVerification = () => {
    setOnConfirmCode(true)
    setIsLoading(true)
    const Url = `${process.env.REACT_APP_BASE_APP_URL}/api/v1/user/verify-phone-number`
    const head = {
      headers: {
        Authorization: 'Bearer ' + apiToken
      }
    }
    const data = {
      verification_code: otp,
      full_number: verifyNumber.full_number
    }
    axios
      .post(Url, data, head)
      .then(res => {
        setIsLoading(false)
        setOnConfirmCode(false)
        CommonNotify('Successful', 'success')
        onClick()
        // increaseSteps()
        setIsDisabled(false)
      })
      .catch(error => {
        const errorMessage = { ...error }
        setOnConfirmCode(false)
        setIsLoading(false)
        CommonNotify(errorMessage.response.data.errors[0])
      })
  }

  const onVerifyByCall = () => {
    setIsLoading(true)
    setIsLoading(true)
    const Url = `${process.env.REACT_APP_BASE_APP_URL}/api/v1/user/send-verify-phone-number`
    const head = {
      headers: {
        Authorization: 'Bearer ' + apiToken
      }
    }
    const data = verifyNumber
    axios
      .post(Url, data, head)
      .then(res => {
        setIsLoading(false)
        CommonNotify('Successful', 'success')
        isModalOpen()
      })
      .catch(error => {
        const errorMessage = { ...error }
        setIsLoading(false)
        if (errorMessage.response.data.errors) {
          CommonNotify(errorMessage.response.data.errors[0])
        } else {
          CommonNotify('Some thing went wronged')
        }
      })
  }

  return (
    <div className="call-routing">
      <Dimmer active={isLading}>
        <Loader />
      </Dimmer>
      <div className="call-title-holder">
        <p className="title-text">Set up your calling wizard</p>
      </div>
      <div className="call-routing-content">
        <h3 className="call-routing-text">Verify your number</h3>
        <p className="call-routing-description">
          to start receiving calls from your leads
        </p>
        <div className="phone-number-holder">
          <ReactPhoneInput
            inputExtraProps={{
              name: 'phone',
              required: true,
              autoFocus: true
            }}
            onChange={(e, phone) => onChangeCountry(e, phone)}
            country={'us'}
          />
          <CommonButtons
            content="Verify"
            background="blue"
            btnClass="btn-verify"
            onClick={onVerifyNumber}
          />
          <VerifiedNumberModal
            open={open}
            isModalOpen={onVerifyNumber}
            isModalClose={isModalClose}
            Title="Please Enter the code"
            onChangeInput={e => onChangeInput(e)}
            onOtpVerification={onOtpVerification}
            loading={onConfirmCode}
          />
        </div>
        <span className="requiredText">* required</span>
        <div className="code-holder">
          <CommonButtons content="Resend Code" onClick={onVerifyNumber} />
          <CommonButtons
            content="Verify via call instead"
            onClick={onVerifyByCall}
          />
        </div>
      </div>
      {/* <ContentFooter disabled={isDisabled} onClick={increaseSteps} /> */}
    </div>
  )
}

export default CallRouting
