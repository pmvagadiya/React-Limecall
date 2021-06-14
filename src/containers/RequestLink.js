import React from 'react'
import Heading from '../components/loginregister/Heading'
import LoginFooter from '../components/loginregister/LoginFooter'

const RequestLink = () => {
  return (
    <>
      <div className="login requestLink">
        <div className="login-box">
          <form className="requestLink-form">
            <Heading title="Check your email" />
            <div className="request-link-text">
              <p>An email has been sent to you with instructions on how</p>
              <p>to reset your password!</p>
            </div>
            <div className="login-content ChangePasswordButton"></div>{' '}
            <div className="requestLink-footer">
              <LoginFooter />
            </div>
          </form>{' '}
        </div>{' '}
      </div>{' '}
    </>
  )
}
export default RequestLink
