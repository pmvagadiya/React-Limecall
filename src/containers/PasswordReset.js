import React, { useState, useEffect } from 'react'
import { Link, Redirect, useHistory } from 'react-router-dom'

import CommonButton from '../common/CommonButtons'
import CommonInput from '../common/CommonInput'

import Heading from '../components/loginregister/Heading'
import GoogleButton from '../components/loginregister/GoogleButton'
// import MicrosoftButton from '../components/loginregister/MicrosoftButton'
import LoginFooter from '../components/loginregister/LoginFooter'
import { Dimmer, Loader, Image, Segment } from 'semantic-ui-react'
import postLogin from '../config/postLogin.js'

import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import axios from 'axios'

import { useAlert } from 'react-alert'

toast.configure()

const PasswordReset = () => {
  const alert = useAlert()

  const existingTokens = localStorage.getItem('access_token')
  const [email, setEmail] = useState('')
  const [isLoading, setLoading] = useState(false)
  const [validate, setValidate] = useState(true)
  const history = useHistory()

  const handleRequest = event => {
    var url = `${process.env.REACT_APP_BASE_APP_URL}/api/send-forget-password-token`
    setLoading(true)
    const data = {
      email: email
    }

    axios
      .post(url, data)
      .then(res => {
        setLoading(false)
        if (res.data.message == 'Successfully') {
          setLoading(false)
          // toast.success(`Password reset link send to ${email}`, {
          //   type: 'success'
          // })
          history.push('/request-link')
        } else {
          setLoading(false)
          toast.error('The selected email is invalid.', {
            type: 'error'
          })
        }
      })
      .catch(err => {
        setLoading(false)     
        toast.error('The selected email is invalid.', {
          type: 'error'
        })
      })
  }

  if (existingTokens != null) {
    return <Redirect to="/home" />
  }

  return (
    <>
      <Dimmer active={isLoading} style={{ position: 'fixed' }}>
        <Loader />
      </Dimmer>
      <div className="login passwordReset">
        <div className="login-box passwordResetBox">
          <form>
            <Heading title="Request Reset Password Link" />
            <div className="login-content">
              <CommonInput
                onChange={e => setEmail(e.target.value)}
                name="email"
                title="Email"
                required="required"
              />
              <CommonButton
                onClick={handleRequest}
                type="button"
                btnClass={validate ? 'btn-login enable' : 'btn-login'}
                content="Request Link"
              />
              <p className="login-to-register">
                Login From account <Link to="/login"> Sign in </Link>{' '}
              </p>{' '}
            </div>{' '}
            <div className="passwordResetFooter">
              <LoginFooter validate={validate} />{' '}
            </div>
          </form>{' '}
        </div>{' '}
      </div>{' '}
    </>
  )
}

export default PasswordReset
