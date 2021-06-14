import React, { useEffect, useState } from 'react'

import CommonCheckbox from '../../common/CommonCheckbox'
// import CommonButton from '../../common/CommonButtons'

import CommonButtons from '../../common/CommonButtons'

import axios from 'axios'
import iconStyle from '../../assets/images/Dashboard 2-03.png'
import getWidget from '../../config/getWidget'

import { CommonNotify } from '../../common/CommonNotify'

import { useAlert } from 'react-alert'

const apiToken = localStorage.getItem('access_token')

export const WidgetTeamsTitle = () => (
  <div className="accordion-widget-holder">
    <div className="accordion-image-holder">
      <img src={iconStyle} alt="logo" />
    </div>{' '}
    <div className="accordion-title-holder">
      <h2 className="accordion-title"> Teams </h2>{' '}
      <p className="accordion-description">
        Select teams to be assigned on this widget{' '}
      </p>{' '}
    </div>{' '}
  </div>
)

export const WidgetTeamsContent = ({ widget, loading }) => {
  const [allTeams, setAllTeams] = useState([])
  const [widgetTeams, setWidgetTeams] = useState([])
  const [teams, setTeams] = useState([])
  const [defaultTeams, setDefaultTeams] = useState([])
  const [selectedTeam, setSelectedTeam] = useState([])
  const [isStatusChange, setIsStatusChange] = useState(false)
  
  const alert = useAlert()

  useEffect(() => {
    fetchAllTeams()
  }, [])

  useEffect(() => {
    if (!widget.id) return
    fetchWidgetTeams()
  }, [widget, allTeams])

  useEffect(() => {
    if (!widgetTeams.length) return
    if (!teams.length) setTeam()
  }, [teams.length, widgetTeams])

  const fetchAllTeams = () => {
    loading(true)
    let head = {
      headers: {
        Authorization: 'Bearer ' + apiToken
      }
    }
    const url = `${process.env.REACT_APP_BASE_APP_URL}/api/v1/team/teams`

    axios
      .get(url, head)
      .then(res => {
        loading(false)
        if (res.data.data) {
          setAllTeams(res.data.data)
        }
      })
      .catch(error => {
        loading(false)
        CommonNotify('Team Value Not Fetched', 'error')
      })
  }

  const setTeam = () => {
    let temp_teams = []
    let selected_teams = []

    allTeams.map((item, index) => {    
      let obj = {
        id: 0,
        name: '',
        active: 0
      }
      obj.id = item.id
      obj.name = item.name
      if (ExistwidgetTeam(item.id)) {
        obj.active = 1
        selected_teams.push(item.id)
      }
      temp_teams.push(obj)
    })
    setTeams(temp_teams)
    setDefaultTeams(temp_teams)
    setSelectedTeam(selected_teams)
  }

  const ExistwidgetTeam = team => {
    var flag = false
    widgetTeams.map(function(el) {
      if (el.id === team) {
        flag = true
      }
    })
    return flag
  }

  const fetchWidgetTeams = () => {
    loading(true)
    let head = {
      headers: {
        Authorization: 'Bearer ' + apiToken
      }
    }
    const url = `${process.env.REACT_APP_BASE_APP_URL}/api/v1/widget/${widget.id}/teams`

    axios
      .get(url, head)
      .then(res => {
        loading(false)
        if (res.data.data) {
          setWidgetTeams(res.data.data)
        }
      })
      .catch(error => {
        loading(false)
        CommonNotify('Team Value Not Fetched', 'error')
        if (error.response) {
          
        } else if (error.request) {
          // The request was made but no response was received
         
        } else {
          // Something happened in setting up the request that triggered an Error
          
        }
      })
  }

  const saveTeam = (sel_team) => {
    loading(true)
    let head = {
      headers: {
        Authorization: 'Bearer ' + apiToken
      }
    }
    const url = `${process.env.REACT_APP_BASE_APP_URL}/api/v1/widget/update-teams`

    let data = {
      widget_id: widget.id,
      teams: sel_team
    }

    axios
      .post(url, data, head)
      .then(res => {
        loading(false)
        if (res.data.message == 'Successfully') {
          fetchAllTeams()
          setIsStatusChange(false)
          CommonNotify('Team Updated Successfully', 'success')
        } else {
          CommonNotify('Team Value Not Updated', 'error')
        }
      })
      .catch(error => {
        loading(false)
        CommonNotify('Team Value Not Updated', 'error')
        if (error.response) {
          alert.show(error.response.data.errors[0], {
            type: 'error'
          })
        } else if (error.request) {
          // The request was made but no response was received
          
        } else {
          // Something happened in setting up the request that triggered an Error
          
        }
      })
  }

  const handleCheck = (value, key, status) => {
    status = !status
    if (status || key) {
      setIsStatusChange(true)
    }
    let temp_team = [...teams]
    let sel_team = [...selectedTeam]
    temp_team[key].active = status
    if (status) {
      sel_team.push(temp_team[key].id)
    } else {
      var index = sel_team.indexOf(temp_team[key].id)
      sel_team.splice(index, 1)
    }
    saveTeam(sel_team)
    setSelectedTeam(sel_team)
    setTeams(temp_team)
  }

  const handleCancelButton = () => {
    setTeam(defaultTeams)
    setIsStatusChange(false)
  }

  return (
    <div className="style-widget-wrapper style-widget-team">
      <div
        className="teams-wrapper"
        style={{
          display: 'block !important'
        }}
      >
        {' '}
        {teams.map((item, key) => (
          <div
            style={{
              display: 'block',
              marginTop: '15px'
            }}
          >
            <CommonCheckbox
              text={item.name}
              checkboxStyle="modal-checkbox"
              name="checkbox"
              checked={item.active}
              key={key}
              index={key}
              onChange={e => handleCheck(item.name, key, item.active)}
            />{' '}
          </div>
        ))}{' '}
        {/* <CommonButton
                                            content="upload"
                                            background="blue"
                                            btnClass="btn-upload"
                                        /> */}{' '}
      </div>{' '}
      {/* {isStatusChange && (
        <div className="save-cancel">
          <CommonButtons
            style={{ marginTop: '40px' }}
            onClick={saveTeam}
            type="button"
            content="Save"
            background="blue"
          />
          <CommonButtons
            onClick={handleCancelButton}
            type="reset"
            content="Cancel"
            background="grey"
          />
        </div>
      )} */}
    </div>
  )
}
