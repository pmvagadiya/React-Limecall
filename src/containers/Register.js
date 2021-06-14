import React, { Component } from 'react';

import { RegisterForm } from '../components/register/RegisterForm';
import { RegisterDescription } from '../components/register/RegisterDescription';

import InputValidator from '../common/validator';

class Register extends Component {
  state = {
    data: {
      fullName: '',
      workEmail: '',
      password: '0',
      hearAbout: '',
      productUpdates: false
    },
    errors: {}
  }

  handleValidation() {
    let fields = this.state.data
    let errors = {}
    let formIsValid = true

    let checkIfNotEmptyArr = ['workEmail', 'password', 'fullName']

    checkIfNotEmptyArr.forEach(item => {
      if (!InputValidator.checkIfNotEmpty(fields[item])) {
        formIsValid = false
        errors[item] = 'This is a required field'
      }
    })

    if (!InputValidator.checkIfEmailFormat(fields['workEmail'])) {
      formIsValid = false
      if (!errors['workEmail'])
        errors['workEmail'] = 'Please enter a valid email address'
    }

    this.setState({ errors: errors })
    return formIsValid
  }

  onChangeInput = e => {
    const { name, value } = e.target
    const { data } = this.state

    data[name] = value

    this.setState({ data })
  }

  onChangeCheckbox = e => {
    const { name } = e.target.parentNode.querySelector('.hidden')
    const { data } = this.state
    data[name] = !data[name]

    this.setState(data)
  }

  onSave = e => {

    const { data } = this.state

    if (this.handleValidation()) {
      alert('Login success')
    }    
  }

  render() {
    const { data, errors } = this.state

    return (
      <div className="register-wrapper">
        <RegisterForm
          data={data}
          errors={errors}
          onChangeInput={this.onChangeInput}
          onChangeCheckbox={this.onChangeCheckbox}
          onSave={this.onSave}
        />
        <div className="register-decription-holder">
          <RegisterDescription />
        </div>
      </div>
    )
  }
}

export default Register
