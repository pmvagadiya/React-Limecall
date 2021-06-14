import React, { useState, useEffect } from 'react'
import { Checkbox, Dimmer, Loader } from 'semantic-ui-react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'

import Title from '../common/Title'
import Navbar from '../components/navbar/Navbar'
import icon from '../assets/images/settingIcon.png'
import { CommonNotify } from '../common/CommonNotify'

function HubSpotRedirection(props) {
  const history = useHistory()
  const titleContent = {
    type: 'image',
    titleOne: icon,
    titleTwo: 'Manage Hubspot'
  }

  const [events, setEvents] = useState({
    events: null,
    sync_option: null
  })
  const [isLoading, setIsLoading] = useState(false)
  const [checkboxData, setCheckboxData] = useState({
    id: null,
    incoming_call: 0,
    successful_call: 0,
    failed_call: 0,
    new_message: 0,
    new_schedule_call: 0,
    limecall_to_hubspot: 0,
    hubspot_to_limecall: 0
  })

  useEffect(() => {
    getHubSpotEvents()
    connectHubSpot()
    fetchUserIntegrations()
  }, [])

  const connectHubSpot = () => {
    const apiToken = localStorage.getItem('access_token')
    let head = {
      headers: {
        Authorization: 'Bearer ' + apiToken
      }
    }
    const url = `${process.env.REACT_APP_BASE_APP_URL}/api/v1/integration/hubspot`

    const query = props.location.search
    const data = {
      code: query.split('code=')[1]
    }

    axios
      .post(url, data, head)
      .then(res => {
        setCheckboxData({
          ...checkboxData,
          id: res.data.data.id
        })
        CommonNotify('HubSport Connected Successfully', 'success')
      })
      .catch(err => {     
        CommonNotify("Couldn't connect to HubSport")
      })
  }

  const getHubSpotEvents = () => {
    setIsLoading(true)
    const apiToken = localStorage.getItem('access_token')
    let head = {
      headers: {
        Authorization: 'Bearer ' + apiToken
      }
    }
    const url = `${process.env.REACT_APP_BASE_APP_URL}/api/v1/integration/hubspot/events`

    axios
      .get(url, head)
      .then(res => {
        setIsLoading(false)
        if (res.data.data) {
          setEvents({
            ...events,
            events: res.data.data.events,
            sync_option: res.data.data.sync_option
          })
        }
      })
      .catch(err => {
        setIsLoading(false)      
      })
  }

  const setHubSpotStg = data => {
    
  }

  const onCheckboxClickHandler = (e, check) => {
    const { checked, name } = check
    var value = checked
    if (value) {
      value = 1
    } else {
      value = 0
    }
    setCheckboxData({
      ...checkboxData,
      [name]: value
    })
  }

  const fetchUserIntegrations = () => {
    const apiToken = localStorage.getItem('access_token')
    let head = {
      headers: {
        Authorization: 'Bearer ' + apiToken
      }
    }
    const url = `${process.env.REACT_APP_BASE_APP_URL}/api/v1/integration/user-integrations`

    axios
      .get(url, head)
      .then(res => {
        if (res.data.data) {
          setHubSpotStg(res.data.data)
          res.data.data.find(obj => {
            obj.integration === 'HubSpot' &&
              setCheckboxData({ ...checkboxData, id: obj.id })
          })
        }
      })
      .catch(err => {
        
      })
  }

  const onUpdateHubSpotStg = () => {
    const apiToken = localStorage.getItem('access_token')
    let head = {
      headers: {
        Authorization: 'Bearer ' + apiToken
      }
    }
    const url = `${process.env.REACT_APP_BASE_APP_URL}/api/v1/integration/update-hubspot-settings`
    axios
      .post(url, checkboxData, head)
      .then(res => {
        history.push('/settings')
        CommonNotify('HubSpot Setting Updated Succefully', 'success')
      })
      .catch(err => {               
        CommonNotify('hubSpot Setting not Updated')
      })
  }

  return (
    <>
      <Dimmer active={isLoading}>
        <Loader />
      </Dimmer>
      {!isLoading && (
        <div className="hubspot_main_wrapper">
          <Title data={titleContent} />
          <Navbar />
          <div className="hubspot_content">
            <div id="manageHubspotSettings " class="modal-body p-lg shadow">
              <div class="box p-4">
                <div class="pb-4 b-b _600">Manage Hubspot</div>
                <div class="box-body">
                  <div class="tab-content">
                    <div class="col-md-5">
                      <form onsubmit="return false">
                        <div class="p-4 box w-100-md box-shadow">
                          <span>Please select your target events</span>
                          <table class="table">
                            <tbody>
                              {events.events &&
                                Object.keys(events.events).map(key => {
                                  return (
                                    <tr>
                                      <td>
                                        Incoming call
                                        <br />
                                        <span>{events.events[key]}</span>
                                      </td>
                                      <td>
                                        <label class="md-check">
                                          <Checkbox
                                            onChange={onCheckboxClickHandler}
                                            checkboxStyle="modal-checkbox"
                                            name={key}
                                          />
                                        </label>
                                      </td>
                                    </tr>
                                  )
                                })}
                            </tbody>
                          </table>
                        </div>
                        {events?.sync_option && (
                          <div class="p-4 box-shadow w-100-md">
                            <span>Sync options</span>
                            <table class="table">
                              <tbody>
                                {events.sync_option &&
                                  Object.keys(events.sync_option).map(key => {
                                    return (
                                      <tr>
                                        <td>
                                          Incoming call
                                          <br />
                                          <span>{events.sync_option[key]}</span>
                                        </td>
                                        <td>
                                          <label class="md-check">
                                            <Checkbox
                                              onChange={onCheckboxClickHandler}
                                              checkboxStyle="modal-checkbox"
                                              name={key}
                                            />
                                          </label>
                                        </td>
                                      </tr>
                                    )
                                  })}
                              </tbody>
                            </table>
                          </div>
                        )}

                        <button
                          type="button"
                          class="btn btn-primary text-white hubspot-btn"
                          onClick={onUpdateHubSpotStg}
                        >
                          Update
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default HubSpotRedirection
