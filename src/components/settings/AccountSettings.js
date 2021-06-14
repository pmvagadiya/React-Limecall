import React, { Component } from 'react'
import { Accordion, Button, Input, TextArea } from 'semantic-ui-react'
import classnames from 'classnames'
import axios from 'axios'
import CommonInput from '../../common/CommonInput'
import CommonButtons from '../../common/CommonButtons'
import InputValidator from '../../common/validator'
import updateProfile from '../../config/updateProfile'
import {Dimmer, Loader} from 'semantic-ui-react'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import CommonTextArea from '../../common/CommonTextArea'
import Dropzone from 'react-dropzone-uploader'
import EmailValidationModal from '../../common/EmailValidationModal'
import { CommonNotify } from '../../common/CommonNotify'

toast.configure()

class AccountSettings extends Component {
  constructor(props) {
    super(props)
    this.state = {
      activeIndexs: [0, 1, 2, 3],
      isLoading : false,
      data: {
        companyName: '',
        timeZone: '',
        fullName: '',
        bio: '',
        email: '',
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
        selectedFile: null,
        personalUrl: '',
        lastName: ''
      },
      companyName: 'The knight company',
      errors: {},
      isConfirmed: false,
      isProfileData: false,
      isPasswordData: false,
      isAccountData: false,
      isPersonalLink: false,
      open: false,
      constEmail: '',
      passwordUpdateLoading: false,
      verificationCode: '',
      isWaitRes: false
    }
    this.updateCompanyData = this.updateCompanyData.bind(this)
    this.updateUserData = this.updateUserData.bind(this)
    this.onUpdate = this.onUpdate.bind(this)
    this.handleCompnayValidation = this.handleCompnayValidation.bind(this)
    this.handleProfileValidation = this.handleProfileValidation.bind(this)
    this.handleValidation = this.handleValidation.bind(this)
  }

  componentDidMount() {
    this.setState({isLoading: true})
    updateProfile()
      .then(async res => {
        let d = {
          companyName: res.data.data.company_name,
          email: res.data.data.email,
          bio: res.data.data.bio,
          timeZone: res.data.data.time_zone,
          fullName: res.data.data.first_name,
          lastName: res.data.data.last_name,
          bio: res.data.data.bio
        }
        const setLocalValue = await localStorage.setItem('user_working_hours',res.data.data.working_hours_status)
        this.setState({
          data: d,
          constEmail: d.email
        })
        this.setState({isLoading: false})       
      })
      .catch(err => {
        this.setState({isLoading: false})      
      })
  }

  /*--------------------- Handle Company Validation And API -----------------*/

  handleCompnayValidation = () => {
    let fields = this.state.data
    let errors = {}
    let formIsValid = true

    let checkIfNotEmptyArr = ['companyName']

    checkIfNotEmptyArr.forEach(item => {
      if (!InputValidator.checkIfNotEmpty(fields[item])) {
        formIsValid = false
        errors[item] = 'This is a required field'
      }
    })

    this.setState({ errors: errors })
    return formIsValid
  }

  updateCompanyData(e) {
    if (this.handleCompnayValidation()) {
      this.setState({isLoading: true})
      e.preventDefault()
      const token = localStorage.getItem('access_token')
      const URL = `${process.env.REACT_APP_BASE_APP_URL}/api/v1/user/update-company-profile`

      const form = new FormData()
      form.append('company_name', this.state.data.companyName)

      const settings = {
        url: URL,
        method: 'POST',
        timeout: 0,
        headers: {
          Accept: 'application/json',
          Authorization: 'Bearer ' + token
        },
        processData: false,
        mimeType: 'multipart/form-data',
        contentType: false,
        data: form
      }

      return axios(settings)
        .then(res => {
          this.setState({isLoading: false})
          toast.success('successful updated')
          return res
        })
        .catch(err => {
          this.setState({isLoading: false})
          toast.error('some error occured!')
        })
    }
  }

  /*----------------------------- Handle Profile Data ---------------------------*/

  updateUserData(e) {
    e.preventDefault()
    if (this.state.data.email !== this.state.constEmail) {
      const regExp = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      const testEmail = regExp.test(this.state.data.email)
      if (testEmail) {
        e.preventDefault()
        const token = localStorage.getItem('access_token')
        const URL = `${process.env.REACT_APP_BASE_APP_URL}/api/v1/user/update-email`
        const head = {
          headers: {
            Authorization: 'Bearer ' + token
          }
        }
        const data = {
          email: this.state.data.email
        }
        axios
          .post(URL, data, head)
          .then(res => {
            CommonNotify(
              'Please check your email we sent verification code',
              'success'
            )
            this.setState({ open: true })
            this.saveName()
              .then(res => {
                this.setState({isLoading: false})
                return res
              })
              .catch(err => {
                const errors = { ...err }
                if (errors.response.data.errors) {
                  CommonNotify(errors.response.data.errors[0])
                } else {
                  CommonNotify('Some thing went wrong')
                }
                this.setState({isLoading: false})
              })
          })
          .catch(err => {
            const errors = { ...err }
            if (errors.response.data.errors) {
              CommonNotify(errors.response.data.errors[0])
            } else {
              CommonNotify('Some thing went wrong')
            }
          })
      }
    } else {
      if (this.handleProfileValidation()) {
        this.saveName()
          .then(res => {
            toast.success('successful updated')
            this.setState({ isAccountData: false })
            this.setState({isLoading: false})
            return res
          })
          .catch(err => {
            const errors = { ...err }
            if (errors.response.data.errors) {
              CommonNotify(errors.response.data.errors[0])
            } else {
              CommonNotify('Some thing went wrong')
            }
            this.setState({isLoading: false})
          })
        // this.setState({isLoading: true})
        // const token = sessionStorage.getItem('access_token')
        // const URL = `${process.env.REACT_APP_BASE_APP_URL}/api/v1/user/update-profile-api`
        // const form = new FormData()
        // const full_name =
        //   this.state.data.fullName + ' ' + this.state.data.lastName
        // form.append('full_name', full_name)
        // form.append('time_zone', this.state.timeZone)
        // form.append('bio', this.state.data.bio)
        // const settings = {
        //   url: URL,
        //   method: 'POST',
        //   timeout: 0,
        //   headers: {
        //     Accept: 'application/json',
        //     Authorization: 'Bearer ' + token
        //   },
        //   processData: false,
        //   mimeType: 'multipart/form-data',
        //   contentType: false,
        //   data: form
        // }

        // return axios(settings)
        //   .then(res => {
        //     toast.success('successful updated')
        //     this.setState({ isAccountData: false })
        //     this.setState({isLoading: false})
        //     return res
        //   })
        //   .catch(err => {
        //     const errors = { ...err }
        //     if (errors.response.data.errors) {
        //       CommonNotify(errors.response.data.errors[0])
        //     } else {
        //       CommonNotify('Some thing went wrong')
        //     }
        //     this.setState({isLoading: false})
        //   })
      }
    }
  }

  saveName = () => {
    this.setState({isLoading: true})
    const token = localStorage.getItem('access_token')
    const URL = `${process.env.REACT_APP_BASE_APP_URL}/api/v1/user/update-profile-api`
    const form = new FormData()
    const full_name = this.state.data.fullName + ' ' + this.state.data.lastName
    form.append('full_name', full_name)
    form.append('time_zone', this.state.timeZone)
    form.append('bio', this.state.data.bio)
    const settings = {
      url: URL,
      method: 'POST',
      timeout: 0,
      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer ' + token
      },
      processData: false,
      mimeType: 'multipart/form-data',
      contentType: false,
      data: form
    }

    return axios(settings)
  }

  handleProfileValidation = () => {
    let fields = this.state.data
    let errors = {}
    let formIsValid = true
    let checkIfNotEmptyArr = ['email', 'fullName']
    checkIfNotEmptyArr.forEach(item => {
      if (!InputValidator.checkIfNotEmpty(fields[item])) {
        formIsValid = false
        errors[item] = 'This is a required field'
      }
    })

    this.setState({ errors: errors })
    return formIsValid
  }

  /*-----------------------Password & Validation & API Calling  --------------------*/

  handleValidation = () => {
    let fields = this.state.data
    let errors = {}
    let formIsValid = true

    let checkIfNotEmptyArr = [
      'confirmPassword',
      'newPassword',
      'currentPassword'
    ]

    if (
      !InputValidator.checkIfEqual(
        fields['newPassword'],
        fields['confirmPassword']
      )
    ) {
      this.setState({ isConfirmed: true })
      formIsValid = false
    } else {
      this.setState({ isConfirmed: false })
    }

    checkIfNotEmptyArr.forEach(item => {
      if (!InputValidator.checkIfNotEmpty(fields[item])) {
        formIsValid = false
        errors[item] = 'This is a required field'
      }
    })

    this.setState({ errors: errors })
    return formIsValid
  }

  onChangeAccountData = e => {
    const { name, value } = e.target
    this.setState({ isEmailValidation: false })
    if (value) {
      this.setState({ isAccountData: true })
    }
    const { data } = this.state

    data[name] = value

    this.setState({ data })
  }

  onChangeProfileData = e => {
    const { name, value } = e.target
    if (!value) {
      this.setState({ isProfileData: false })
    } else {
      this.setState({ isProfileData: true })
    }
    const { data } = this.state

    data[name] = value

    this.setState({ data })
  }

  onChangePasswordData = e => {
    const { name, value } = e.target

    if (value && value !== '') {
      this.setState({ isPasswordData: true })
    }
    const { data } = this.state

    data[name] = value

    this.setState({ data })
  }

  onChangePersonalData = e => {
    const { name, value } = e.target
    if (!e.target.value) {
      this.setState({ isPersonalLink: false })
    } else {
      this.setState({ isPersonalLink: true })
    }
  }
  onUpdate(e) {
    e.preventDefault()
    this.setState({ passwordUpdateLoading: true })
    if (this.state.data.newPassword !== this.state.data.confirmPassword) {
      CommonNotify('Password does not match', 'warning')
      this.setState({ passwordUpdateLoading: false })
    }
    if (this.handleValidation()) {
      this.setState({ passwordUpdateLoading: true })
      e.preventDefault()
      const token = localStorage.getItem('access_token')
      const URL = `${process.env.REACT_APP_BASE_APP_URL}/api/v1/user/update-password`

      const form = new FormData()
      form.append('current_password', this.state.data.currentPassword)
      form.append('password', this.state.data.newPassword)
      form.append('password_confirmation', this.state.data.confirmPassword)

      const settings = {
        url: URL,
        method: 'POST',
        timeout: 0,
        headers: {
          Accept: 'application/json',
          Authorization: 'Bearer ' + token
        },
        processData: false,
        mimeType: 'multipart/form-data',
        contentType: false,
        data: form
      }

      return axios(settings)
        .then(res => {
          toast.success('successful updated')
          this.setState({ passwordUpdateLoading: false })
          return res
        })
        .catch(err => {
          const errorMessage = { ...err }
          if (errorMessage.response.data.errors) {
            this.setState({ passwordUpdateLoading: false })
            CommonNotify(errorMessage.response.data.errors[0])
          } else {
            this.setState({ passwordUpdateLoading: false })
            CommonNotify('Some thing went wronged')
          }
        })
    }
  }

  fileChangedHandler = event => {
    this.setState({ selectedFile: event.target.files[0] })
  }

  cancelButton = () => {
    this.setState({ isAccountData: false })
  }
  cancelPasswordButton = () => {
    this.setState({ isPasswordData: false })
  }

  handleClick = (e, titleProps) => {
    const { index } = titleProps
    const { activeIndexs } = this.state
    const newIndex = activeIndexs
    const currentIndexPosition = activeIndexs.indexOf(index)
    if (currentIndexPosition > -1) {
      newIndex.splice(currentIndexPosition, 1)
    } else {
      newIndex.push(index)
    }

    this.setState({ activeIndexs: newIndex })
  }
  handleModalClose = () => {
    this.setState({ open: false })
  }

  updateEmail = () => {
    this.setState({ isWaitRes: true })
    const token = localStorage.getItem('access_token')
    const URL = `${process.env.REACT_APP_BASE_APP_URL}/api/v1/user/verify-new-email`
    const head = {
      headers: {
        Authorization: 'Bearer ' + token
      }
    }
    const data = {
      activation_token: this.state.verificationCode
    }
    axios
      .post(URL, data, head)
      .then(res => {
        this.setState({ isWaitRes: false })
        CommonNotify('Update successfully', 'success')
        this.setState({ open: false })
      })
      .catch(err => {
        const errors = { ...err }
        if (errors.response.data.errors) {
          this.setState({ isWaitRes: false })
          CommonNotify(errors.response.data.errors[0])
        } else {
          this.setState({ isWaitRes: false })
          CommonNotify('Some thing went wrong')
        }
      })
  }

  onChangeVerifyCode = e => {
    this.setState({ verificationCode: e.target.value })
  }

  render() {
    const { activeIndexs, data } = this.state
    return (
      <>
      <Dimmer active={this.state.isLoading}>
        <Loader></Loader>
      </Dimmer>
        <div className="account-settings">
          <Accordion className="holder-account">
            <div className="accordion-holder account-information account_main">
              <Accordion.Title
                active={activeIndexs.includes(1)}
                index={1}
                onClick={this.handleClick}
                style={{ padding: '15px' }}
              >
                <p className="bold-text accordion-title">Account Information</p>
                <p className="subtext accordion-desc">
                  Manage your personal infomation
                </p>
              </Accordion.Title>
              <Accordion.Content active={activeIndexs.includes(1)}>
                <form method="" action="">
                  <div className="holder">
                    <div className="input-styles">
                      <CommonInput
                        onChange={this.onChangeAccountData}
                        name="fullName"
                        type="text"
                        title="First Name"
                        background="gray"
                        required={true}
                        value={data.fullName}
                      />
                      <CommonInput
                        onChange={this.onChangeAccountData}
                        name="lastName"
                        type="text"
                        title="Last Name"
                        background="gray"
                        required={true}
                        value={data.lastName}
                      />
                      <CommonInput
                        name="email"
                        type="email"
                        title="Email Address"
                        background="gray"
                        required={this.state.isEmailValidation ? true : false}
                        value={data.email}
                        onChange={this.onChangeAccountData}
                        // required={true}
                        defaultValue={this.state.data.email}
                      />
                    </div>
                    <EmailValidationModal
                      open={this.state.open}
                      handleModalClose={this.handleModalClose}
                      updateEmail={this.updateEmail}
                      onChangeVerifyCode={this.onChangeVerifyCode}
                      isWaitRes={this.state.isWaitRes}
                    />
                    <div className="holder-input">
                      {/* <CommonInput
                   onChange={this.fileChangedHandler}
                    name="profileImage"
                    title="Profile Image"
                    type="file"
                  /> */}
                      {/* <div className="profile-image">
                    <img src={profileImage} alt="" />
                  </div> */}
                    </div>
                  </div>
                  {this.state.isAccountData && (
                    <>
                      <CommonButtons
                        onClick={this.updateUserData}
                        type="submit"
                        content="Save"
                        background="blue"
                      />
                      <CommonButtons
                        onClick={this.cancelButton}
                        type="reset"
                        content="Cancel"
                        background="grey"
                      />
                    </>
                  )}
                </form>
              </Accordion.Content>
            </div>
            <div className="accordion-holder change-password change_password">
              <Accordion.Title
                active={activeIndexs.includes(2)}
                index={2}
                onClick={this.handleClick}
                style={{ padding: '15px' }}
              >
                <p className="bold-text accordion-title">Change Password</p>
                <p className="subtext accordion-desc">
                  Update your secret combination of letters, numbers and symbols
                </p>
              </Accordion.Title>
              <Accordion.Content active={activeIndexs.includes(2)}>
                <form method="" action="">
                  <div className="holder-change-password">
                    <div
                      className={classnames('input-invi-wrapper', {
                        'on-error': this.state.errors.currentPassword
                      })}
                    >
                      <CommonInput
                        onChange={this.onChangePasswordData}
                        name="currentPassword"
                        type="password"
                        title="Current Password"
                        background="gray"
                        required={true}
                      />
                    </div>
                    <div
                      className={classnames('input-invi-wrapper', {
                        'on-error': this.state.errors.newPassword
                      })}
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between'
                      }}
                    >
                      <CommonInput
                        onChange={this.onChangePasswordData}
                        name="newPassword"
                        type="password"
                        title="New Password"
                        background="gray"
                        required={true}
                        passwordBar={true}
                        passwordData={data['newPassword']}
                      />
                      <CommonInput
                        onChange={this.onChangePasswordData}
                        onKeyUp={() => this.handleValidation()}
                        //onBlur={() => this.handleValidation()}
                        name="confirmPassword"
                        type="password"
                        title="Confirm Password"
                        background="gray"
                      />
                      {this.state.isConfirmed && (
                        <span className="password-confirmation-text">
                          Password is not confirmed yet!
                        </span>
                      )}
                    </div>
                  </div>
                  {this.state.isPasswordData && (
                    <>
                      <CommonButtons
                        onClick={this.onUpdate}
                        type="submit"
                        content="Save"
                        background="blue"
                        loading={this.state.passwordUpdateLoading}
                      />
                      <CommonButtons
                        onClick={this.cancelPasswordButton}
                        type="reset"
                        content="Cancel"
                        background="grey"
                      />
                    </>
                  )}
                </form>
              </Accordion.Content>
            </div>
            {/* <div className="accordion-holder change-personal">
              <Accordion.Title
                active={activeIndexs.includes(3)}
                index={3}
                onClick={this.handleClick}
                style={{ padding: '15px' }}
              >
                <p className="bold-text accordion-title">My Personal URL</p>
                <p className="subtext accordion-desc">
                  Update the username used in your scheduling links.
                </p>
              </Accordion.Title>
              <Accordion.Content active={activeIndexs.includes(3)}>
                <form method="" action="">
                  <div className="holder-change-personal">
                    <Input
                      label="html.com"
                      onChange={this.onChangePersonalData}
                      placeholder="XYZ"
                      name="personalUrl"
                    />
                  </div>
                  {this.state.isPersonalLink && (
                    <>
                      <CommonButtons
                        onClick={this.onUpdate}
                        type="submit"
                        content="Save"
                        background="blue"
                      />
                      <CommonButtons
                        //onClick={}
                        type="reset"
                        content="Cancel"
                        background="grey"
                      />
                    </>
                  )}
                </form>
              </Accordion.Content>
            </div> */}
          </Accordion>
        </div>
      </>
    )
  }
}

export default AccountSettings
