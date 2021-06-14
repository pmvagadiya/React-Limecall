import { apiDelete, apiGet, apiPost } from '.'
import { API_URL } from './constant'

export const setMemberDaysOff = body => {
  return apiPost(`${API_URL}/team/member-days-off`, body)
}

export const updateMemberAvailability = (id, type) =>
  apiPost(`${API_URL}/team/update-member-availability/${id}/${type}`)

export const getMemberDayOff = () => {
  return apiGet(`${API_URL}/team/member-days-off`)
}

export const deleteMemberDayOff = id => {
  return apiDelete(`${API_URL}/team/member-days-off/${id}`)
}
