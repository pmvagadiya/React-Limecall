import axios from 'axios'

const ValidateRegApi = async (field, value, endpoint, request = 'POST') => {
  const URL = `${process.env.REACT_APP_BASE_APP_URL}/${endpoint}`

  let data = false

  const form = new FormData()
  form.append(field, value)

  const settings = {
    url: URL,
    method: request,
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
      data = {
        data: [],
        message: '',
        errors: ['Please Enter Valid ' + field]
      }
    })

  var promise = new Promise((resolve, reject) => {
    if (data) {
      resolve(data)
    }
  })

  return promise
}

export default ValidateRegApi
