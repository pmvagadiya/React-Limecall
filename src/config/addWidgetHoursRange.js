import axios from 'axios'

const addWidgetHoursRange = async info => {
  const token = localStorage.getItem('access_token')
  const URL = `${process.env.REACT_APP_BASE_APP_URL}/api/v1/widget/${info.widget_id}/working-hours`

  // const form = new FormData()
  // form.append('day_ids', info.day_id)
  // form.append('from', info.working_from)
  // form.append('to', info.working_to)
  const body = {
    day_ids: info.day_ids,
    from: info.from,
    to: info.to,
    time_zone: info.time_zone
  }
  const settings = {
    url: URL,
    method: 'POST',
    headers: {
      Accept: 'application/json',
      Authorization: 'Bearer ' + token
    },
    data: body
  }
  var result
  return await axios(settings)
    .then(res => {
      result = res     
      return result
    })
    .catch(err => {
      result = err.response     
      return result
    })
}

export default addWidgetHoursRange
