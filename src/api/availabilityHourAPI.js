import { apiDelete, apiGet, apiPost } from '.'
import { API_URL } from './constant'

export const _getAvailabilityHour = getUrl => apiGet(`${API_URL}/${getUrl}`)

export const _getWidgetAvailabilityHour = getUrl => apiGet(`${process.env.REACT_APP_BASE_APP_URL}/${getUrl}`)

export const _postAvailabilityTime = (postUrl, body) =>
  apiPost(`${API_URL}/${postUrl}`, body)   

  export const _postWidgetAvailabilityTime  = (postUrl, body) =>
  apiPost(`${process.env.REACT_APP_BASE_APP_URL}/${postUrl}`, body)
 
export const _deleteAvailabilityTime = (deleteUrl, id) =>            
  apiDelete(`${API_URL}/${deleteUrl}/${id}`)

  export const _deleteWidgetAvailabilityTime = (deleteUrl) =>
  apiDelete(`${process.env.REACT_APP_BASE_APP_URL}/${deleteUrl}`)
