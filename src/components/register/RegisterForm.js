import React from 'react'
import { Link } from 'react-router-dom'
import classnames from 'classnames'
import PasswordStrengthBar from 'react-password-strength-bar'

import CommonButton from '../../common/CommonButtons'
import CommonCheckbox from '../../common/CommonCheckbox'
import CommonInput from '../../common/CommonInput'

import dashboardBeta from '../../assets/images/Dashboard-01.png'

export const RegisterForm = ({
  data,
  errors,
  onChangeInput,
  onChangeCheckbox,
  onSave
}) => {
  return (
    <div className="register-form">
      <div className="limecall-beta-holder">
        <img src={dashboardBeta} alt="beta" />
      </div>{' '}
      <div className="register-form-wrapper">
        <h2 className="register-title">
          Start your free, unlimited 14 day trial.{' '}
        </h2>{' '}
        <p className="default-text register-title-description">
          Start turning visitors into customers today.{' '}
        </p>{' '}
        <div className="resigter-form-holder">
          <form method="" action="">
            <div
              className={classnames('input-invi-wrapper', {
                'on-error': errors.fullName
              })}
            >
              <CommonInput
                onChange={onChangeInput}
                type="text"
                name="fullName"
                title="First and Last name *"
                required={true}
              />{' '}
            </div>{' '}
            <div
              className={classnames('input-invi-wrapper', {
                'on-error': errors.workEmail
              })}
            >
              <CommonInput
                onChange={onChangeInput}
                type="email"
                name="workEmail"
                title="Work Email *"
                required={true}
              />{' '}
            </div>{' '}
            <div
              className={classnames('input-invi-wrapper', {
                'on-error': errors.password
              })}
            >
              <CommonInput
                onChange={onChangeInput}
                type="password"
                id="password"
                name="password"
                title="password *"
                required={true}
              />{' '}
              <PasswordStrengthBar password={data['password']} />{' '}
            </div>{' '}
            <CommonInput
              onChange={onChangeInput}
              type="text"
              name="hearAbout"
              title="How did you hear about us"
            />
            <div className="checkbox-register-holder">
              <CommonCheckbox
                onChange={onChangeCheckbox}
                name="productUpdates"
                checked={data.productUpdates}
                text="Receive Product updates from Limecall"
              />
            </div>{' '}
            <p className="terms register-description-link">
              by clicking '<Link to="#">Start your free account</Link>' you
              agree to our <Link to="#"> Terms of Use and Spam Policy </Link>{' '}
            </p>{' '}
            <CommonButton
              type="submit"
              content="Start your free Account"
              btnClass="btn-account"
              onClick={onSave}
            />{' '}
          </form>{' '}
          <p className="register-description-link">
            Already have an account, <Link to="#"> Sign in </Link> hear{' '}
          </p>{' '}
        </div>{' '}
      </div>{' '}
    </div>
  )
}

export default RegisterForm
