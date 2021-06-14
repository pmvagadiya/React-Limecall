import axios from 'axios'

const deleteWidgetHour = async (info, widget) => {


  const token = localStorage.getItem('access_token')
  const widget_id = localStorage.getItem('widget_id')
  const URL = `${process.env.REACT_APP_BASE_APP_URL}/api/v1/user/working-hours/${info}`


  const settings = {
    url: URL,
    method: '',
    timeout: 0,
    headers: {
      Accept: 'application/json',
      Authorization: 'Bearer ' + token
    },
    processData: false,
    mimeType: 'multipart/form-data',
    contentType: false
  }
  const head = {
    headers: {
      Authorization: 'Bearer ' + token
    }
  }

  return await axios
    .delete(URL, head)
    .then(res => {    
      return res
    })
    .catch(err => {
   
    })
}

export default deleteWidgetHour
