import axios from 'axios'
import {
  resolveConfig
} from 'prettier'

const PostRegister = async info => {
  const URL = `${process.env.REACT_APP_BASE_APP_URL}/api/register-api`

  let data = false

  const form = new FormData()
  form.append('full_name', info.firstname + ' ' + info.lastname)
  form.append('password', info.password)
  form.append('password_confirmation', info.confirmpassword)
  form.append('email', info.email)
  form.append('g-recaptcha-response', info.recaptcha)
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
      data = res.data
    })
    .catch(err => {
      data = true
    })

  var promise = new Promise((resolve, reject) => {
    if (data) {
      resolve(data)
    }
  })

  return promise
}

export default PostRegister