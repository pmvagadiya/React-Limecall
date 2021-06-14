import { apiPost } from '.'
import { API_URL } from './constant'

export const updateMemberAvailability = (id, type) =>
  apiPost(`${API_URL}/team/update-member-availability/${id}/${type}`)

export const updateMemberData = body => {
  apiPost(`${API_URL}/team/update-member`, body)
}
