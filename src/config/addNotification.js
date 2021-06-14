import axios from 'axios'
import _ from 'lodash'

const addNotification = async (data, notification ) => {
  const manipulateData = data.map(item => {
    let data = {}
    data[item.key] = item.checked ? 1 : 0
    data['notification'] = notification
    return data
  })
//   const updatedData = manipulateData.map(item => item)
  let singleObject = _.extend.apply({}, manipulateData)
  const token = localStorage.getItem('access_token')
  const URL = `${process.env.REACT_APP_BASE_APP_URL}/api/v1/user/notifications`
  const head = {
    headers: {
      Authorization: 'Bearer ' + token
    }
  }
  return await axios.put(URL, singleObject, head)
}

export default addNotification
