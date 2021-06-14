import axios from 'axios'

const getSubscription = async info => {
  const token = localStorage.getItem('access_token')
  const URL = `${process.env.REACT_APP_BASE_APP_URL}/api/v1/subscription`

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

const applyChangeSubscription = async () => {
  const token = localStorage.getItem('access_token')
  const URL = `${process.env.REACT_APP_BASE_APP_URL}/api/v1/subscription/apply-subscription-changes-now`
  const head = {
    headers: {
      Authorization: 'Bearer ' + token
    }
  }
  const data = {}
  return await axios.post(URL, data, head)
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

const cancelSubscription = async info => {
  const token = localStorage.getItem('access_token')
  const URL = `${process.env.REACT_APP_BASE_APP_URL}/api/v1/subscription/deactivate-subscription`

  const settings = {
    url: URL,
    method: 'POST',
    timeout: 0,
    data: { cancellation_reason: info },
    headers: {
      Accept: 'application/json',
      Authorization: 'Bearer ' + token
    },
    processData: false,
    mimeType: 'multipart/form-data',
    contentType: false
  }

  return await axios(settings)
}

export {
  getbillinginfo,
  getSubscription,
  cancelSubscription,
  applyChangeSubscription
}
