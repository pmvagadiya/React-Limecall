import axios from 'axios'
import { resolveConfig } from 'prettier'

const CallApi  = async info => { 
  const token= localStorage.getItem('access_token');
  const URL = `${process.env.REACT_APP_BASE_APP_URL}/api/v1/team/create-team`

  const form = new FormData();
  form.append('name', info.name)


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
    data:form
  }

  return await axios(settings)
    .then(res => {      
      return res
    })
    .catch(err => {
     
    })
}

export default CallApi
