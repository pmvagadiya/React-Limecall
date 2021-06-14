import React, { Fragment, useState, useEffect } from 'react'
import GoogleLogin from 'react-google-login'
import CommonButton from '../../common/CommonButtons'
import GoogleAuth from '../../helpers/signup/GoogleAuth'
import { useHistory } from 'react-router-dom'

import { CommonNotify } from '../../common/CommonNotify'

import axios from 'axios'

const GoogleButton = (props, login = true) => {
  const { content } = props
  const { profile, setProfile } = useState(null)
  const { loginSuccess, setLoginSuccess } = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const history = useHistory()

  useEffect(() => {
    if (loginSuccess) {
      if (!login) {
        registerUser()
      } else {
        loginUser()
      }
    }
  }, [profile])

  const registerUser = () => {}

  const loginUser = () => {}

  const googleLogin = response => {
    const apiToken = localStorage.getItem('access_token')
    props.loading(true)

    let head = {
      headers: {
        Authorization: 'Bearer ' + apiToken
      }
    }

    const url = `${process.env.REACT_APP_BASE_APP_URL}/api/social-login`

    const data = {
      email: response.profileObj.email,
      name: response.profileObj.givenName + '' + response.profileObj.familyName,
      provider_return_id: response.tokenId,
      social_type: 1
    }

    axios
      .post(url, data, head)
      .then(res => {
        props.loading(false)
        if (res.data.data.access_token) {
          localStorage.setItem('phone_numbers',JSON.stringify(res.data.data.phone_numbers))
          localStorage.setItem('access_token', res.data.data.access_token)
          localStorage.setItem('quick_setup', res.data.data.onboarding_step)
          localStorage.setItem('access_token', res.data.data.access_token)
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

          if (res.data.data.onboarding_step >= 3) {
            window.location.hash = '/home'
            // window.location.reload()
          } else {
            history.push('/QuickSetup')
          }

          // props.history.push('/QuickSetup')
          // window.location.reload()
          return
        }
      })
      .catch(async error => {
        props.loading(false)
        const errors = await { ...error }
        if (errors.response.data.errors) {
          CommonNotify(errors.response.data.errors[0])
        } else {
          CommonNotify('Some thing went wrong')
        }
      })
  }

  const googleLoginFailed = response => {}

  return (
    <GoogleLogin
      clientId={process.env.REACT_APP_GLOGIN_CLIENT_ID}
      render={renderProps => (
        <CommonButton
          onClick={renderProps.onClick}
          disabled={renderProps.disabled}
          btnClass="login-with login-google"
          content={content}
        />
      )}
      onSuccess={googleLogin}
      onFailure={googleLoginFailed}
      cookiePolicy={'single_host_origin'}
    />
  )
}

export default GoogleButton
