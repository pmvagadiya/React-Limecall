import axios from 'axios'

const instance = axios.create({ baseURL: `${process.env.REACT_APP_BASE_APP_URL}/` })

export const setAuthToken = token => {
  if (token) {
    //applying token
    instance.defaults.headers.common['Authorization'] = token
  } else {
    //deleting the token from header
    delete instance.defaults.headers.common['Authorization']
  }
}
