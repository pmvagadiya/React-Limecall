import axios from 'axios'

const getWidgetHours = async info => {
  const token= localStorage.getItem('access_token');
  const user_id = localStorage.getItem('id')
  const URL = `${process.env.REACT_APP_BASE_APP_URL}/api/v1/user/get-business-hours`

  const form = new FormData()
  form.append('user_id', user_id)

  const settings = {
    url: URL,
    method: 'POST',
    timeout: 0,
    headers: {
      Accept: 'application/json',
      'Authorization': 'Bearer '+ token
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

export default getWidgetHours