import React, { useEffect, useState } from 'react'
import { Link, Redirect, useLocation } from 'react-router-dom'
import queryString from 'query-string'
import axios from 'axios'
import { useHistory } from 'react-router-dom'

import CommonButton from '../common/CommonButtons'
import CommonInput from '../common/CommonInput'

import { CommonNotify } from '../common/CommonNotify'

import Heading from '../components/loginregister/Heading'
import GoogleButton from '../components/loginregister/GoogleButton'
// import MicrosoftButton from '../components/loginregister/MicrosoftButton'
import LoginFooter from '../components/loginregister/LoginFooter'
import { Dimmer, Loader, Image, Segment } from 'semantic-ui-react'
import postLogin from '../config/postLogin.js'

import { useAlert } from 'react-alert'
import { setLoginLocalStorage } from '../helpers/common'

const Login = props => {
  const alert = useAlert()
  const history = useHistory()

  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  })

  const [error, setError] = useState({})

  const existingTokens = localStorage.getItem('access_token')

  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [validate, setValidate] = useState(true)
  const [isLoading, setLoading] = useState(false)

  const handleInput = e => {
    const { name, value } = e.target
    if (name === 'email' && value === '') {
      setError({ ...error, [name]: 'Please Enter Valid Email' })
    } else if (name === 'password' && value === '') {
      setError({ ...error, [name]: 'Please Enter Valid Password' })
    } else {
      setError({
        email: '',
        password: ''
      })
    }
    setCredentials({
      ...credentials,
      [name]: value
    })
  }

  const handleLogin = async event => {
    setLoading(true)
    event.preventDefault()

    const URL = `${process.env.REACT_APP_BASE_APP_URL}/api/v1/oauth/token`

    const form = new FormData()
    form.append('client_id', `${process.env.REACT_APP_CLIENT_ID}`)
    form.append('client_secret', `${process.env.REACT_APP_CLIENT_SECRET}`)
    form.append('grant_type', 'password')
    form.append('email', credentials.email)
    form.append('password', credentials.password)
  
    const settings = {
      url: URL,
      method: 'POST',
      timeout: 0,
      headers: {
        Accept: 'application/json'
      },
      processData: false,
      mimeType: 'multipart/form-data',
      contentType: false,
      data: form
    }
  
    return await axios(settings)
      .then(res => {
      
        setLoading(false)

        setLoginLocalStorage(res)
        localStorage.setItem('phone_numbers',JSON.stringify(res.data.data.phone_numbers))
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
        setIsLoggedIn(true)
        if (res.data.data.onboarding_step >= 3) {
          window.location.href = '/home'
          // window.location.reload()
        } else {
          history.push('/QuickSetup')
        }
      })
      .catch(err => {
        const errors = { ...err }

        if(!errors.response){
          CommonNotify('Wrong Credentials', 'error')
          setLoading(false)
          return;
        }

        if (errors.response.data.errors) {
          CommonNotify(errors.response.data.errors[0] === `Your account is Not Verified, Please contact system admin for further details. <a href=\"${process.env.REACT_APP_BASE_APP_URL}/api/resend-verification-email?email=sumit%2B543%40betacloud.ai\">Click Here to Resend Verification Email</a>` ? "Your account is Not Verified, Please contact system admin for further details." : errors.response.data.errors[0])
          setLoading(false)
        } else {
          CommonNotify('Wrong Credentials', 'error')
          setLoading(false)
        }
      })

  }

  if (existingTokens != null) {
    window.location.href = '/home'
    return <Redirect to="/home" />
  }

  return (
    <>
      <Dimmer active={isLoading} style={{ position: 'fixed' }}>
        <Loader />
      </Dimmer>
      <div className="login">
        <div className="login-box">
          <form onSubmit={handleLogin}>
            <Heading title="" />
            <div className="login-content">
              <div className="login-btn-wrapper">
                <GoogleButton
                  loading={setLoading}
                  content="Sign in with Google"
                />{' '}
                {/* <MicrosoftButton content="Login with Microsoft" /> */}{' '}
              </div>{' '}
              <div className="or">
                <p className="or-text"> or </p>{' '}
              </div>{' '}
              <CommonInput
                onChange={handleInput}
                name="email"
                title="Email"
                type="email"
                error={error.email}
                pattern="^[A-Za-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{1,4}$"
              />
              <CommonInput
                onChange={handleInput}
                name="password"
                title="Password"
                type="password"               
                error={error.password}
              />
              <CommonButton
                type="submit"
                // disabled={
                //   (credentials.email === '' && credentials.password === '') ||
                //   credentials.email === '' || credentials.password === ''
                  // Object.values(error).length === 0 ||
                  // Object.values(error).length === ' ' ||
                  // error.email !== '' ||
                  // error.password !== ''
                // }
                style={{}}
                btnClass={validate ? 'btn-login enable' : 'btn-login'}
                content="Sign In"
              />
              <p className="login-to-register">
                Forgot Password ?{' '}
                <Link to="/forgot-password"> Reset Password </Link>{' '}
              </p>{' '}
              
              <CommonButton
                type="button"               
                btnClass='btn-login-register enable'
                content="Sign Up"
                onClick={ () => history.push("/signup")  }
              />

              
            </div>{' '}
            <LoginFooter validate={validate} />{' '}
          </form>{' '}
        </div>{' '}
      </div>{' '}
    </>
  )
}

export default Login
