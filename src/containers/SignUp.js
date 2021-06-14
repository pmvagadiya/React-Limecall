import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router'
import Recaptcha from 'react-recaptcha'
import axios from 'axios'

import CommonButton from '../common/CommonButtons'
import CommonInput from '../common/CommonInput'

import { validateEmail } from '../helpers/signup/Validation'
import Heading from '../components/loginregister/Heading'
import GoogleButton from '../components/loginregister/GoogleButton'
import MicrosoftButton from '../components/loginregister/MicrosoftButton'
import LoginFooter from '../components/loginregister/LoginFooter'
import ValidateRegApi from '../helpers/signup/ValidateRegApi'

import PostRegister from '../helpers/signup/PostRegister'
import { CommonNotify } from '../common/CommonNotify'
import Axios from 'axios'
import { Dimmer, Loader } from 'semantic-ui-react'

const SignUp = props => {
  const [credentials, setCredentials] = useState({
    email: '',
    firstname: '',
    lastname: '',
    recaptcha: '',
    errors: {}
  })
  // const [credentials, setCredentials] = useState
  const [validate, setValidate] = useState(false)
  const [validEmail1, setValidEmail1] = useState(false)
  const [validEmail2, setValidEmail2] = useState(false)
  const [validPass, setValidPass] = useState(false)
  const [recaptcha, setRecaptcha] = useState('')
  const [register, setRegister] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  // const validateEmail = email => {
  //   const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  //   return re.test(email)
  // }

  const handleInput = e => {
    const value = e.target.value
    const name = e.target.name
    setCredentials({
      ...credentials,
      [name]: value,
      errors: {
        [name]: ''
      }
    })
  }
  useEffect(() => {
    if (
      validPass === true &&
      validEmail1 === true &&
      validEmail2 === true &&
      validate === true
    ) {
      setValidate(false)

      PostRegister(credentials).then(res => {
        if (res.message.length) {
          setRegister(
            'Successfully account created please check the email for next step'
          )
        }
      })
    }
  }, [credentials, validEmail1, validEmail2, validPass, validate])

  useEffect(() => {
    setCredentials({
      ...credentials,
      recaptcha: recaptcha
    })
  }, [recaptcha])

  useEffect(() => {
    if (
      credentials.email !== '' &&
      credentials.firstname !== '' &&
      credentials.lastname !== '' &&
      credentials.recaptcha !== ''
    ) {
      setValidate(true)
      resetValidate()
    } else {
      setValidate(false)
    }
  }, [credentials])

  const resetValidate = () => {
    setValidEmail1(false)
    setValidEmail2(false)
    setValidPass(false)
  }

  const sendEmailVarification = () => {
    Axios.get('')
  }
  const handleSubmit = async (creds) => {
    setIsLoading(true)
    try {
      await ValidateRegApi(
        'email',
        credentials.email,
        'api/check-if-spam-email?email=' + credentials.email,
        'get'
      )
      setValidEmail1(true)

      const ValidateRegApiEmail = await ValidateRegApi('email', credentials.email, 'api/email-validation')
      if (ValidateRegApiEmail.errors.length) {
        setValidEmail1(true)
        setValidate(false)
        setValidEmail2(ValidateRegApiEmail.errors[0])
        CommonNotify(ValidateRegApiEmail.errors[0])
      } else {
        setValidEmail2(true)
      }
      const signUpApi =await signUP()
      setIsLoading(false)
      CommonNotify(
        'Successfully created account! Please check your email we sent a verification link.',
        'success'
      )
      localStorage.setItem('phone_numbers',JSON.stringify(signUpApi.data.data.phone_numbers))
      localStorage.setItem('access_token', signUpApi.data.data.access_token)
      localStorage.setItem('quick_setup', signUpApi.data.data.onboarding_step)
      localStorage.setItem('access_token', signUpApi.data.data.access_token)
      localStorage.setItem('first_name', signUpApi.data.data.first_name)
      localStorage.setItem('full_name', signUpApi.data.data.first_name)
      localStorage.setItem('last_name', signUpApi.data.data.last_name)
      localStorage.setItem('email', signUpApi.data.data.email)
      localStorage.setItem('id', signUpApi.data.data.id)
      localStorage.setItem(
        'admin_verification_status',
        signUpApi.data.data.admin_verification_status
      )
      props.history.push('/QuickSetup')
    } catch (error) {
      setIsLoading(false)
      const errors = { ...error }
      if (errors.response.data.errors) {
        CommonNotify(errors.response.data.errors[0])
      } else {
        CommonNotify('Some thing went wrong')
      }
    }
  }

  const signUP = () => {
    const url = `${process.env.REACT_APP_BASE_APP_URL}/api/register-api`
    const fullName = credentials.firstname + ' ' + credentials.lastname
    const data = {
      email: credentials.email,
      full_name: fullName,
      client_id: process.env.REACT_APP_CLIENT_ID,
      client_secret: process.env.REACT_APP_CLIENT_SECRET,
      'g-recaptcha-response': credentials.recaptcha
    }
    return axios.post(url, data)
  }
  const handleInputValidation = e => {
    const value = e.target.value
    const name = e.target.name

    // Email valadation
    if (name === 'email') {
      const isError = !validateEmail(value)
      setCredentials({
        ...credentials,
        errors: {
          [name]: isError ? 'Please enter valid email' : null
        }
      })
    }
  }

  const recaptchaLoaded = () => {}
  const verifyCallback = response => {
    setRecaptcha(response)
  }

  return (
    <>
      <Dimmer active={isLoading}>
        <Loader />
      </Dimmer>
      <div className="login">
        <div className="login-box">
          <Heading title="Start your 14 day Trial now" />
          <div className="login-content">
            <div className="login-btn-wrapper">
              <GoogleButton
                content="Sign up with Google"
                loading={setIsLoading}
                login={false}
              />
              {/* <MicrosoftButton content="Sign up with Microsoft" /> */}
            </div>
            <div className="or">
              <p className="or-text">or</p>
            </div>
            <CommonInput
              onChange={handleInput}
              name="email"
              title="Email"
              type="email"
              onBlur={e => handleInputValidation(e)}
            />

            {credentials.errors.email && (
              <div className="error__message email">
                <p style={{ color: '#fe4502' }}>{credentials.errors.email} </p>{' '}
              </div>
            )}

            {/* {validEmail2 && (
            <div className="email">
              <p style={{ color: '#fe4502' }}> {validEmail2} </p>{' '}
            </div>
          )} */}

            <CommonInput
              onChange={handleInput}
              name="firstname"
              title="First Name"
            />
            <CommonInput
              onChange={handleInput}
              name="lastname"
              title="Last Name"
            />
            <Recaptcha
              sitekey="6Lep-rgUAAAAAJM2pqeGqVpitmSh6RfMfJ8I9_cu"
              onloadCallback={recaptchaLoaded}
              verifyCallback={verifyCallback}
            />
            <br />

            <CommonButton
              onClick={() => {
                handleSubmit(credentials)
              }}
              btnClass={validate ? 'btn-login enable' : 'btn-login'}
              content={!isLoading ? 'Create Account' : 'Loading...'}
            />

            {/* <CommonButton
              onClick={() => {
                handleSubmit(credentials)
              }}
              btnClass={validate ? 'btn-login enable' : 'btn-login'}
              content="Create Account"
            /> */}

            {register && (
              <div>
                <p style={{ color: '#15fe02' }}> {register} </p>{' '}
              </div>
            )}

            <p className="login-to-register">
              Already have an account?<Link to="/login">Log in</Link>
            </p>
          </div>

          <LoginFooter />
        </div>
      </div>
    </>
  )
}

const SignUpWithRouter = withRouter(SignUp)

export default SignUpWithRouter
