import axios from 'axios'
import { CommonNotify } from '../common/CommonNotify'

export const onCallRequest = id => {
  const apiToken = localStorage.getItem('access_token')

  let head = {
    headers: {
      Authorization: 'Bearer ' + apiToken
    }
  }
  const leadID = id.replace('#', '')
  const url = `${process.env.REACT_APP_BASE_APP_URL}/api/v1/request-call-from-dashboard?lead_id=${leadID}`

  axios
    .get(url, head)
    .then(res => {
      CommonNotify('Call Requested', 'success')
    })
    .catch(err => {
      CommonNotify(
        err.response.data.errors
          ? err.response.data.errors[0]
          : 'Some error occured.'
      )
    })
}

export const sendMessage = (sendMsgData, setSendMsgData) => {
  if (!sendMsgData.message) {
    return CommonNotify('The Message filed is required')
  }
  const apiToken = localStorage.getItem('access_token')
  let head = {
    headers: {
      Authorization: 'Bearer ' + apiToken
    }
  }
  const url = `${process.env.REACT_APP_BASE_APP_URL}/api/v1/leads/send-message`

  axios
    .post(url, sendMsgData, head)
    .then(res => {
      setSendMsgData({
        ...sendMsgData,
        message: ''
      })
      CommonNotify('Message Send Successfullu', 'success')
    })
    .catch(err => {
      CommonNotify('Not able to send message')
     
    })
}

export const onChangeInterseted = (e, data, lead_id) => {
  const apiToken = localStorage.getItem('access_token')

  let head = {
    headers: {
      Authorization: 'Bearer ' + apiToken
    }
  }
  const url = `${process.env.REACT_APP_BASE_APP_URL}/api/v1/leads/change-interested`
  const postData = {
    lead_id: lead_id.slice(1),
    interested: data.value
  }

  axios
    .post(url, postData, head)
    .then(res => {
      // CommonNotify('Done successfully', 'success')
    })
    .catch(err => {  
      CommonNotify('Not able to update  Good Fit')
    })
}

export const onStatusChangeHandler = (e, data, lead_Id) => {
  const apiToken = localStorage.getItem('access_token')

  let head = {
    headers: {
      Authorization: 'Bearer ' + apiToken
    }
  }
  const url = `${process.env.REACT_APP_BASE_APP_URL}/api/v1/leads/change-status`
  const postData = {
    lead_id: lead_Id,
    status: data.value
  }

  axios
    .post(url, postData, head)
    .then(res => {
      // CommonNotify('Done successfully', 'success')
    })
    .catch(err => {     
      CommonNotify('Not able to update  Good Fit')
    })
}

export const _onTagsSaveHandler = postData => {
  return new Promise((resolve, reject) => {
    const apiToken = localStorage.getItem('access_token')
    let head = {
      headers: {
        Authorization: 'Bearer ' + apiToken
      }
    }
    const url = `${process.env.REACT_APP_BASE_APP_URL}/api/v1/leads/add-tags`

    axios
      .post(url, postData, head)
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        reject(err)
      })
  })
}

export const _getLeadNotes = callId => {
  return new Promise((resolve, reject) => {
    const apiToken = localStorage.getItem('access_token')
    let head = {
      headers: {
        Authorization: 'Bearer ' + apiToken
      }
    }
    const geturl = `${process.env.REACT_APP_BASE_APP_URL}/api/v1/leads/${callId}/note`
    axios
      .get(geturl, head)
      .then(res => {
        resolve(res.data.data)
      })
      .catch(err => {
        reject(err)
      })
  })
}

export const onLeadScoreHandler = (e, data, lead_id) => {
  const apiToken = localStorage.getItem('access_token') 
  let head = {
    headers: {
      Authorization: 'Bearer ' + apiToken
    }
  }
  const leadId = lead_id

  const url = `${process.env.REACT_APP_BASE_APP_URL}/api/v1/leads/${leadId}/scores`
  const postData = {
    score: data.value
  }

  axios
    .post(url, postData, head)
    .then(res => {
      CommonNotify('Done successfully', 'success')
    })
    .catch(err => {    
      CommonNotify('Not able to update  Score')
    })
}


export const onLeadScore = (data, lead_id) => {
  const apiToken = localStorage.getItem('access_token') 
  let head = {
    headers: {
      Authorization: 'Bearer ' + apiToken
    }
  }
  const leadId = lead_id

  const url = `${process.env.REACT_APP_BASE_APP_URL}/api/v1/leads/${leadId}/scores`
  const postData = {
    score: data
  }

  axios
    .post(url, postData, head)
    .then(res => {
      CommonNotify('Done successfully', 'success')
    })
    .catch(err => {    
      CommonNotify('Not able to update  Score')
    })
}

export const onChangeOwner = (e, data, lead_id) => {
  const apiToken = localStorage.getItem('access_token')
  let head = {
    headers: {
      Authorization: 'Bearer ' + apiToken
    }
  }
  const leadId = lead_id

  const url = `${process.env.REACT_APP_BASE_APP_URL}/api/v1/leads/set-owner`
  const postData = {
    user_id: data.value,
    lead_id: leadId
  }

  axios
    .post(url, postData, head)
    .then(res => {
      // CommonNotify('Done successfully', 'success')
    })
    .catch(err => {     
      CommonNotify('Not able to update  Owner')
    })
}

export const getLeadStages = widget_id => {
  return new Promise((reslove, reject) => {
    const apiToken = localStorage.getItem('access_token')
    let head = {
      headers: {
        Authorization: 'Bearer ' + apiToken
      }
    }

    const url = `${process.env.REACT_APP_BASE_APP_URL}/api/v1/widget/${widget_id}/stages`

    axios
      .get(url, head)
      .then(res => {
        reslove(res)
      })
      .catch(err => {       
        reject(err)
      })
  })
}

export const setLeadStage = (widget_id, stages, setLoading) => {
  console.log(stages)
  const apiToken = localStorage.getItem('access_token')
  let head = {
    headers: {
      Authorization: 'Bearer ' + apiToken
    }
  }

  const url = `${process.env.REACT_APP_BASE_APP_URL}/api/v1/widget/update-stages`
  const postData = {
    widget_id: widget_id,
    stages: stages
  }

  axios
    .post(url, postData, head)
    .then(res => {
      setLoading(false)
    })
    .catch(err => {     
      setLoading(false)
    })
}

export const getLeadOwner = () => {
  return new Promise((reslove, reject) => {
    const apiToken = localStorage.getItem('access_token')
    let head = {
      headers: {
        Authorization: 'Bearer ' + apiToken
      }
    }

    const url = `${process.env.REACT_APP_BASE_APP_URL}/api/v1/team/members`

    axios
      .get(url, head)
      .then(res => {
        reslove(res)
      })
      .catch(err => {
        reject(err)
      })
  })
}

export const _getLeadActivities = lead_id => {
  return new Promise((resolve, reject) => {
    const apiToken = localStorage.getItem('access_token')
    let head = {
      headers: {
        Authorization: 'Bearer ' + apiToken
      }
    }
    const url = `${process.env.REACT_APP_BASE_APP_URL}/api/v1/leads/logs/${lead_id}`

    axios
      .get(url, head)
      .then(res => {
        resolve(res.data.data)
      })
      .catch(err => {
        reject(err)
      })
  })
}
