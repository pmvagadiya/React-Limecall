import axios from 'axios'

const updateHourStatus = async (info, widget, url) => {
  const token = localStorage.getItem('access_token')
  const URL = `${process.env.REACT_APP_BASE_APP_URL}/api/v1/${url}`

  const form = new FormData()
  form.append('widget_id', widget)
  form.append('business_hours_status', info * 1)

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
     
    })
}

export default updateHourStatus
