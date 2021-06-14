import axios from 'axios'
import { CommonNotify } from '../common/CommonNotify'

const billinginfo = async info => {
 
  const token = localStorage.getItem('access_token')
  const URL = `${process.env.REACT_APP_BASE_APP_URL}/api/v1/user/update-customer-billing-info`

  const form = new FormData()
  form.append('first_name', info.firstName)
  form.append('last_name', info.lastName)
  form.append('email', info.email)
  form.append('company_name', info.companyName)
  form.append('line1', info.address1)
  form.append('country', info.country)
  form.append('city', info.city)
  form.append('state', info.state)
  form.append('zip', info.Zip)
  form.append('line2', info.address2)

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

  return await axios(settings)
    .then(res => {
          return res
    })
    .catch(err => {
      return false     
    })
}

const getbillinginfo = async info => { 
  const token = localStorage.getItem('access_token')
  const URL = `${process.env.REACT_APP_BASE_APP_URL}/api/v1/get-customer-billing-info`

  const settings = {
    url: URL,
    method: 'GET',
    timeout: 0,
    headers: {
      Accept: 'application/json',
      Authorization: 'Bearer ' + token
    },
    processData: false,
    mimeType: 'multipart/form-data',
    contentType: false
  }

  return await axios(settings)
    .then(res => {    
      return res
    })
    .catch(err => {     
    })
}

export { getbillinginfo, billinginfo }
