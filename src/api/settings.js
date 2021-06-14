import axios from 'axios'
import { API_URL, apiToken } from './constant'

export const callerIdOptionApi = payload => {
  const headers = {
    'Content-type': 'application/json',
    Authorization: `Bearer ${apiToken}`
  }
  return axios.post(`${API_URL}/widget/caller-id-option`, payload, { headers })
}
