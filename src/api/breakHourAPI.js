import { apiDelete, apiGet, apiPost } from '.'
import { API_URL } from './constant'

export const _getBreakHour = () => apiGet(`${API_URL}/break-hours`)

export const _postBreakTime = body => apiPost(`${API_URL}/break-hours`, body)

export const _deleteBreakTime = id => apiDelete(`${API_URL}/break-hours/${id}`)
