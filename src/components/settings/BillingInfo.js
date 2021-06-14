import React, { useState, useEffect, useCallback } from 'react'
import classnames from 'classnames'

import Input from '../../common/CommonInput'
import leadLogo from '../../assets/images/call-feedback.png'
import Button from '../../common/CommonButtons'
import InputValidator from '../../common/validator'
import Title from '../../common/Title'
import { CommonNotify } from '../../common/CommonNotify'
import { billinginfo, getbillinginfo } from '../../config/billinginfo'
import { useAlert } from 'react-alert'
import CommonButtons from '../../common/CommonButtons'
import CommonSelect from '../../common/CommonSelect'
import { Dropdown } from 'semantic-ui-react'
import { billingCountryList } from '../../helpers/billingCountryList'

const BillingInfo = ({ loading }) => {
  const [data, setData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    companyName: '',
    address1: '',
    address2: '',
    country: '',
    city: '',
    state: '',
    Zip: ''
  })
  const [errors, setErrors] = useState({
    firstName: false,
    lastName: false,
    email: false,
    companyName: false,
    address1: false,
    address2: false,
    country: false,
    city: false,
    state: false,
    Zip: false
  })
  const alert = useAlert()

  const handleValidation = () => {
    let fields = data
    let errors = {}
    let formIsValid = true

    let checkIfNotEmptyArr = [
      'firstName',
      'lastName',
      'companyName',
      'address1',
      'address2',
      'country',
      'city',
      'state',
      'Zip'
    ]

    checkIfNotEmptyArr.forEach(item => {
      if (!InputValidator.checkIfNotEmpty(fields[item])) {
        formIsValid = false
        errors[item] = 'This is a required field'
      }
    })

    // if (!InputValidator.checkIfEmailFormat(fields['email'])) {
    //   formIsValid = false
    //   if (!errors['email'])
    //     errors['email'] = 'Please enter a valid email address'
    // }

    // setErrors(errors)

    return formIsValid
  }
  const getInfo = useCallback(() => {    
    loading(true)
    const name = 'dd'
    getbillinginfo(name)
      .then(res => {
        loading(false)
        const d = res.data.data
        const data = {}
        data.firstName = d.first_name
        data.lastName = d.last_name
        data.email = d.email
        data.companyName = d.company_name
        data.address1 = d.line1
        data.address2 = d.line2
        data.country = d.country
        data.city = d.city
        data.state = d.state
        data.Zip = d.zip
        setData(data)
      })
      .catch(err => {
        loading(false)
        CommonNotify('Cant Fetch Billing Info')        
      })
  }, [loading])
  useEffect(() => {
    // ;(async () => {
    getInfo()
    // })()
  }, [getInfo])

  const onChangeInput = e => {
    if (e.target.value === '') {
      const key = e.target.name
      errors[key] = true
      setErrors({ ...errors })
    } else {
      const key = e.target.name
      errors[key] = false
      setErrors({ ...errors })
    }
    if (e.target.name === 'email') {
      const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      const check = re.test(e.target.value)
      if (check) {
        const key = e.target.name
        errors[key] = false
        setErrors({ ...errors })
      } else {
        const key = e.target.name
        errors[key] = true
        setErrors({ ...errors })
      }
    }
    const key = e.target.name
    const value = e.target.value
    data[key] = value
    setData({ ...data })
  }

  const onClickUpdate = () => {
    if (handleValidation()) {
      loading(true)
      billinginfo(data)
        .then(res => {
          loading(false)
          if (!res) {
            CommonNotify('Cant Save Billing Info')
            return
          }
          CommonNotify('Billing Info Saved', 'success')
          getInfo()
        })
        .catch(err => {
          loading(false)
          CommonNotify('Cant Save Billing Info')          
        })
    } else {
      CommonNotify('All Fields are required', 'warning')
    }
  }

  const onChangeDropdown = (e, value) => {
    const key = value.name
    const Data = value.valueß
    data[key] = Data
    setData({ ...data })
  }

  const title = {
    type: 'image',
    titleOne: leadLogo,
    titleTwo: 'Billing'
  }
  return (
    <>
      <div className="billing-info-wrapper billing_info_main">
        <Title data={title} />
        <div className="billing-title-holder">
          <h2 className="billinginfo-title bold-text">
            Your Billing Information
          </h2>
          <h6 className='billinginfo-title'>
            Enter your billing information
          </h6>
        </div>
        <div className="billinginfo-content">
          <form>
            <div className="billinginfo-input-holder">
              <div
                className={classnames('input-invi-wrapper', {
                  'on-error': errors.firstName
                })}
              >
                <Input
                  onChange={e => onChangeInput(e)}
                  type="text"
                  name="firstName"
                  title="First Name"
                  required={true}
                  value={data.firstName}
                />
              </div>
              <div
                className={classnames('input-invi-wrapper', {
                  'on-error': errors.lastName
                })}
              >
                <Input
                  onChange={e => onChangeInput(e)}
                  type="text"
                  name="lastName"
                  title="Last Name"
                  required={true}
                  value={data.lastName}
                />
              </div>
            </div>
            <div className="billinginfo-input-holder">
              <div
                className={classnames('input-invi-wrapper', {
                  'on-error': errors.email
                })}
              >
                <Input
                  onChange={e => onChangeInput(e)}
                  type="email"
                  name="email"
                  title="Email"
                  required={true}
                  value={data.email}
                />
              </div>
              <div
                className={classnames('input-invi-wrapper', {
                  'on-error': errors.companyName
                })}
              >
                <Input
                  onChange={e => onChangeInput(e)}
                  type="text"
                  name="companyName"
                  title="Company Name"
                  required={true}
                  value={data.companyName}
                />
              </div>
            </div>
            <div className="billinginfo-input-holder">
              <div
                className={classnames('input-invi-wrapper', {
                  'on-error': errors.address1
                })}
              >
                <Input
                  onChange={e => onChangeInput(e)}
                  type="text"
                  name="address1"
                  title="Address Line 1."
                  required={true}
                  value={data.address1}
                />
              </div>
              <div
                className={classnames('input-invi-wrapper', {
                  'on-error': errors.address2
                })}
              >
                <Input
                  onChange={e => onChangeInput(e)}
                  type="text"
                  name="address2"
                  title="Address Line 2."
                  required={true}
                  value={data.address2}
                />
              </div>
            </div>
            <div className="billinginfo-input-holder dropdown">
              <div
                className={classnames('input-invi-wrapper', {
                  'on-error': errors.country
                })}
              >
                <div className="input-invi-dropDown">
                  <label>Country</label>
                  <Dropdown
                    onChange={(e, data) => onChangeDropdown(e, data)}
                    selection
                    search
                    name="country"
                    title="Country"
                    required={true}
                    options={billingCountryList}
                    value={data.country}
                  />
                </div>
              </div>
              <div
                className={classnames('input-invi-wrapper', {
                  'on-error': errors.city
                })}
              >
                <Input
                  onChange={e => onChangeInput(e)}
                  type="text"
                  name="city"
                  title="City"
                  required={true}
                  value={data.city}
                />
              </div>
            </div>
            <div className="billinginfo-input-holder">
              <div
                className={classnames('input-invi-wrapper', {
                  'on-error': errors.state
                })}
              >
                <Input
                  onChange={e => onChangeInput(e)}
                  type="text"
                  name="state"
                  title="State"
                  required={true}
                  value={data.state}
                />
              </div>

              <div
                className={classnames('input-invi-wrapper', {
                  'on-error': errors.state
                })}
              >
                <Input
                  onChange={e => onChangeInput(e)}
                  type="text"
                  name="Zip"
                  title="Zip"
                  required={true}
                  value={data.Zip}
                />
              </div>
            </div>
            <Button
              onClick={onClickUpdate}
              content="Save"
              type="button"
              background="blue"
              btnClass="btn-billing"
            />
            <CommonButtons
              // onClick={}
              type="reset"
              content="Cancel"
              background="grey"
            />
          </form>
        </div>
      </div>
    </>
  )
}

export default BillingInfo
