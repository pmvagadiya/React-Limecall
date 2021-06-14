import axios from 'axios'

const getScript = async info => {
  const URL = `${process.env.REACT_APP_BASE_APP_URL}/api/v1/widget/widgets`
  const accessToken = localStorage.getItem('access_token')

  const settings = {
    url: URL,
    method: 'GET',
    timeout: 0,
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${accessToken}`
    }
  }

  return await axios(settings)
    .then(res => {
      return res
    })
    .catch(err => {
     
    })
}

export default getScript
