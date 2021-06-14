import axios from 'axios'

const updateProfile = async info => {
  const token = localStorage.getItem('access_token')
  const URL = `${process.env.REACT_APP_BASE_APP_URL}/api/v1/user/profile`

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

export default updateProfile
