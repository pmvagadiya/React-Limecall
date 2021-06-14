import axios from 'axios'
import {
  resolveConfig
} from 'prettier'

const postRegister = async info => {
  const URL = `${process.env.REACT_APP_BASE_APP_URL}/api/register-api`

  const form = new FormData()
  form.append('first_name', info.firstname)
  form.append('last_name', info.lastname)
  form.append('password', info.password)
  form.append('password_confirmation', info.confirmpassword)
  form.append('username', info.email)
  form.append('client_id', process.env.REACT_APP_CLIENT_ID)
  form.append('client_secret', process.env.REACT_APP_CLIENT_SECRET)
  form.append('grant_type', 'password')

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

  await axios(settings)
    .then(res => {
     
    })
    .catch(err => {
      
    })


}

export default postRegister