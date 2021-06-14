import React, { useState, useEffect } from 'react'
import { Dropdown } from 'semantic-ui-react'
import axios from 'axios'
import { useHistory, useLocation } from 'react-router-dom'

import { CommonNotify } from '../common/CommonNotify'
import Title from '../common/Title'
import icon from '../assets/images/settingIcon.png'
import Navbar from '../components/navbar/Navbar'

const apiToken = localStorage.getItem('access_token')
let head = {
  headers: {
    Authorization: 'Bearer ' + apiToken
  }
}

function SlackRedirection(props) {
  const history = useHistory()

  const [channle, setChannle] = useState(null)
  const [savedChannle, setSavedChannle] = useState({})
  const [selectChannle, setSelectChannle] = useState(null)

  const titleContent = {
    type: 'image',
    titleOne: icon,
    titleTwo: 'Slack Redirection'
  }
  useEffect(() => {
    integrateSlack()
  }, [])

  const integrateSlack = () => {
    const url = `${process.env.REACT_APP_BASE_APP_URL}/api/v1/integration/connect-slack`

    const query = props.location.search
    const code = query.split('code=')[1].split('&')[0]
    const data = {
      code: code
    }
    axios
      .post(url, data, head)
      .then(res => {
        const data = []
        res.data.result.map(res => {
          return data.push({ key: res[0], value: res[0], text: res[1] })
        })
        setChannle(data)
        setSavedChannle(res.data.saved)
      })
      .catch(error => {
        
      })
  }

  const updateDropDownValues = (ele, data) => {
    const { name, value } = data
    setSelectChannle(value)    
  }

  const onSaveChannleHandler = () => {
    const url = `${process.env.REACT_APP_BASE_APP_URL}/api/v1/integration/save-channels`
    axios
      .post(url, { channle: selectChannle }, head)
      .then(res => {
        CommonNotify(res.data.message[0], 'success')
        history.push('/settings')
      })
      .catch(error => {
       
      })
  }
  return (
    <div className="slack_wpapper">
      <Title data={titleContent} />
      <Navbar />
      <div className="channle_dropdwon">
        <div className="row">
          <div className="col-md-3">
            <p>Channels:</p>
          </div>
          <div className="col-md-7">
            <div className="slack_channle_dropdwon">
              <Dropdown
                placeholder="Select Channel"
                fluid
                multiple
                selection
                search
                onChange={updateDropDownValues}
                defaultValue={savedChannle && savedChannle}
                options={channle}
              />
            </div>
          </div>
          <div className="col-md-2">
            <button
              type="submit"
              class="btn btn-primary"
              onClick={onSaveChannleHandler}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SlackRedirection
