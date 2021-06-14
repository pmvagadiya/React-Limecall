import React, { useState, useEffect } from 'react'
import { Link, Redirect } from 'react-router-dom'

import CommonButton from '../common/CommonButtons'
import CommonInput from '../common/CommonInput'

import Heading from '../components/loginregister/Heading'
import GoogleButton from '../components/loginregister/GoogleButton'
// import MicrosoftButton from '../components/loginregister/MicrosoftButton'
import LoginFooter from '../components/loginregister/LoginFooter'
import { Dimmer, Loader, Image, Segment } from 'semantic-ui-react'
import postLogin from '../config/postLogin.js'

import queryString from 'query-string'

import axios from 'axios'

import { useAlert } from 'react-alert'

const defaultPassword = {
  token: '',
  password: '',
  password_confirmation: ''
}

const PasswordUpdate = props => {
  const alert = useAlert()

  const [password, setPassword] = useState(defaultPassword)
  const [isLoading, setLoading] = useState(false)

  useEffect(() => {
    if (password.token != '') return
    setToken()
  }, [password])

  const getToken = () => {
    let url = window.location
    let hash = url.hash
    let param = hash.split('?token=')
    if (param[1]) return param[1]
    return ''
  }

  const setToken = () => {
    let tempPass = { ...password }
    tempPass.token = getToken()
    setPassword(tempPass)
  }

  const updatePassword = (index, val) => {
    let tempPass = { ...password }
    tempPass[index] = val
    setPassword(tempPass)
  }

  const handleRequest = event => {
    if (password.password != password.password_confirmation) {
      alert.show('Password Not Matched', {
        type: 'error'
      })
      return
    }

    var url = `${process.env.REACT_APP_BASE_APP_URL}/api/update-forgotten-password-api`
    axios
      .post(url, password)
      .then(res => {       
        if (res.data.message == 'Successfully') {
          alert.show('Password successfully updated...', {
            type: 'success'
          })
        } else {
          alert.show('Data cannot saved System error occured...', {
            type: 'error'
          })
        }
      })
      .catch(error => {
        if (error.response) {
          alert.show(error.response.data.errors[0], {
            type: 'error'
          })
        } else if (error.request) {
          // The request was made but no response was received
                
        } else {
          // Something happened in setting up the request that triggered an Error
                  
        }
      })
  }

  const [validate, setValidate] = useState(true)

  return (
    <>
      <Dimmer active={isLoading} style={{position:'fixed'}}>
        <Loader />
      </Dimmer>
      <div className="login">
        <div className="login-box">
          <form>
            <Heading title="Reset Password" />
            <div className="login-content">
              <CommonInput
                type="password"
                onChange={e => updatePassword('password', e.target.value)}
                name="email"
                title="New Password"
                required="required"
              />
              <CommonInput
                type="password"
                onChange={e =>
                  updatePassword('password_confirmation', e.target.value)
                }
                name="email"
                title="Confirm Password"
                required="required"
              />
              <CommonButton
                onClick={handleRequest}
                type="button"
                btnClass={validate ? 'btn-login enable' : 'btn-login'}
                content="Reset Password"
              />
              <p className="login-to-register">
                Login From account <Link to="/login"> Sign in </Link>{' '}
              </p>{' '}
            </div>{' '}
            <LoginFooter validate={validate} />{' '}
          </form>{' '}
        </div>{' '}
      </div>{' '}
    </>
  )
}

export default PasswordUpdate
