import axios from 'axios'

const postLogin = async info => {
  const URL = `${process.env.REACT_APP_BASE_APP_URL}/api/v1/oauth/token`

  const form = new FormData()
  form.append('client_id', `${process.env.REACT_APP_CLIENT_ID}`)
  form.append('client_secret', `${process.env.REACT_APP_CLIENT_SECRET}`)
  form.append('grant_type', 'password')
  form.append('email', info.email)
  form.append('password', info.password)

  const settings = {
    url: URL,
    method: 'POST',
    timeout: 0,
    headers: {
      Accept: 'application/json'
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
      
    })
}

export default postLogin