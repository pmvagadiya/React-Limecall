import axios from 'axios'
import { resolveConfig } from 'prettier'
import { CommonNotify } from '../common/CommonNotify'

const CallApiGet = async info => {
  const token = localStorage.getItem('access_token')
  const URL = `${process.env.REACT_APP_BASE_APP_URL}/api/v1/team/teams?limit=2000&offset=0`

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

const updateTeam = async info => {
  const token = localStorage.getItem('access_token')
  const URL = `${process.env.REACT_APP_BASE_APP_URL}/api/v1/team/update-team/` + info.idModal
  let is_default = 0

  if (info.columnTwo === 'yes') {
    is_default = 1
  } else {
    is_default = 0
  }

  const form = new FormData()
  form.append('name', info.columnOne)
  form.append('is_default', is_default)

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
      CommonNotify('Team Created Successfully', 'success')
      return res
    })
    .catch(err => {
      if(!err.response){
        CommonNotify("500 server error", 'error')        
      }else{
        CommonNotify(err.response.data.errors[0], 'error')
      }     
    })
}

const CallApi = async info => {
  // console.log('Entered in axios file')
  const token = localStorage.getItem('access_token')
  const URL = `${process.env.REACT_APP_BASE_APP_URL}/api/v1/team/create-team`

  const form = new FormData()
  form.append('name', info.name)
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
      console.log('result in axios file', res)
      return res
    })
    .catch(err => {
      console.log(err)
    })
}

export { CallApiGet, updateTeam, CallApi }
