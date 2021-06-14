import React, { useState } from 'react'

import axios from 'axios'
import { Dimmer, Loader } from 'semantic-ui-react'
import { useHistory } from 'react-router-dom'

import { CommonNotify } from '../common/CommonNotify'
import CommonInput from '../common/CommonInput'
import CommonButtons from '../common/CommonButtons'
import Heading from '../components/loginregister/Heading'
import LoginFooter from '../components/loginregister/LoginFooter'
import { setLoginLocalStorage } from '../helpers/common'

const ResetPasswordToken = props => {
  const history = useHistory()

  const [passwordFields, setPasswordFields] = useState({
    password: '',
    confirmPassword: ''
  })
  const [errorPasswordFields, setErrorPasswordFields] = useState({})
  const [confirmText, setConfirmText] = useState(false)

  const handleInput = e => {
    const { name, value } = e.target
    if (name === 'password' && value === '') {
      setErrorPasswordFields({
        ...errorPasswordFields,
        [name]: 'Password is required'
      })
    } else if (
      name === 'confirmPassword' &&
      value !== passwordFields.password
    ) {
      setErrorPasswordFields({
        ...errorPasswordFields,
        [name]: 'Confirm password is not match'
      })
    } else {
      setErrorPasswordFields({})
    }
    setPasswordFields({
      ...passwordFields,
      [name]: value
    })
  }

  const [isLoading, setIsLoading] = useState(false)

  const changePassword = e => {
    e.preventDefault()
    const regex = /^(?=.*[A-Za-z])(?=.*\d)[a-zA-Z0-9!@#$%^&*()~¥=_+}{":;'?/>.<,`\-\|\[\]]{6,50}$/
    if (!regex.test(passwordFields.password)) {
      CommonNotify(
        'Password should include at least 1 small, 1 capital , 1 special character and min 6 characters',
        'warning'
      )
      return
    }
    setIsLoading(true)
    const { location } = props
    const { search } = location
    const decodeToken = decodeURIComponent(search.split('=')[1])
    const url = `${process.env.REACT_APP_BASE_APP_URL}/api/update-forgotten-password-api`
    const data = {
      token: decodeToken,
      password: passwordFields.password,
      password_confirmation: passwordFields.confirmPassword
    }
    axios
      .post(url, data)
      .then(res => {
        setLoginLocalStorage(res)
        setConfirmText(true)
        localStorage.setItem('phone_numbers', JSON.stringify(res.data.data.phone_numbers))
        localStorage.setItem('api_key', res.data.data.api_key)
        localStorage.setItem('access_token', res.data.data.access_token)
        localStorage.setItem('quick_setup', res.data.data.onboarding_step)
        localStorage.setItem('first_name', res.data.data.first_name)
        localStorage.setItem(
          'full_name',
          res.data.data.first_name + res.data.data.last_name
        )
        localStorage.setItem('last_name', res.data.data.last_name)
        localStorage.setItem('email', res.data.data.email)
        localStorage.setItem('id', res.data.data.id)
        localStorage.setItem(
          'admin_verification_status',
          res.data.data.admin_verification_status
        )
        setIsLoading(false)
        window.location.href = '/home'
      })
      .catch(err => {
        const errors = { ...err }
        if (errors.response.data.errors) {
          CommonNotify(errors.response.data.errors[0] === `Your account is Not Verified, Please contact system admin for further details. <a href=\"${process.env.REACT_APP_BASE_APP_URL}/api/resend-verification-email?email=sumit%2B543%40betacloud.ai\">Click Here to Resend Verification Email</a>` ? "Your account is Not Verified, Please contact system admin for further details." : errors.response.data.errors[0])
          setIsLoading(false)
        } else {
          CommonNotify('Something went wrong!', 'error')
          setIsLoading(false)
        }
      })
  }
  return (
    <>
      <Dimmer active={isLoading}>
        <Loader />
      </Dimmer>
      <div className="login resetPassword">
        <div className="login-box">
          <form className="resetPasswordForm">
            <Heading title="Enter your new password" />
            <div className="login-content ChangePasswordButton">
              <CommonInput
                onChange={handleInput}
                name="password"
                title="Password"
                type="password"
                error={errorPasswordFields.password}
                passwordData={passwordFields.password}
                passwordBar={true}
                required={true}
              />
              <CommonInput
                onChange={handleInput}
                name="confirmPassword"
                title="Confirm Password"
                type="password"
                error={errorPasswordFields.confirmPassword}
                required="required"
              />
              {!confirmText ? (
                <CommonButtons
                  type="submit"
                  onClick={changePassword}
                  disabled={
                    (passwordFields.confirmPassword === '' &&
                      passwordFields.password === '') ||
                    passwordFields.confirmPassword === '' ||
                    passwordFields.password === ''
                  }
                  content="Reset Password and Login"
                />
              ) : null}
              {confirmText ? (
                <div className="confirmText">
                  <span>Your password has been changed successfully.</span>
                </div>
              ) : null}
            </div>{' '}
            <div className="resetPasswordFooter">
              <LoginFooter />
            </div>
          </form>{' '}
        </div>{' '}
      </div>{' '}
    </>
  )
}

export default ResetPasswordToken
