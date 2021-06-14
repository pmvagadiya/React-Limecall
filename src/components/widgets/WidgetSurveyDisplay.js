import React, { Fragment, useState, useEffect } from 'react'
// import { Link } from 'react-router-dom'
import { TextArea } from 'semantic-ui-react'
import TimezonePicker from 'react-timezone'
import NodeToggle from '../../common/NodeToggle'
import CommonInput from '../../common/CommonInput'
import CommonCheckbox from '../../common/CommonCheckbox'
import CommonRadio from '../../common/CommonRadio'

// import CommonInput from '../../common/CommonInput'
import CommonSelect from '../../common/CommonSelect'
import CommonButtons from '../../common/CommonButtons'

import { CommonNotify } from '../../common/CommonNotify'

import iconSet from '../../assets/images/Dashboard 2-05.png'
import circlePlus from '../../assets/images/cicle-plus.png'
import deleteIcon from '../../assets/images/delete-icon.png'

import axios from 'axios'


import { useAlert } from 'react-alert'

const apiToken = localStorage.getItem('access_token')

export const WidgetSurveyDisplayTitle = () => (
  <div className="accordion-widget-holder">
    <div className="accordion-image-holder">
      <img src={iconSet} alt="logo" />
    </div>{' '}
    <div className="accordion-title-holder">
      <h2 className="accordion-title">
        How often should this widget be displayed ?
      </h2>{' '}
      <p className="accordion-description"> Set team office and reply times </p>{' '}
    </div>{' '}
  </div>
)

export const WidgetSurveyDisplayContent = ({
  callAlgorithm,
  handleRadio,
  respondText,
  state,
  loading
}) => {
  const lstCallAlgorithm = [
    'Show the widget again, but during the next visit to the website',
    'Continue showing the widget until the user responds or closes it',
    'Never show the widget again'
  ]

  const respondSurvey = [
    'Never show the widget again',
    'Let the user take the widget multiple times on a recurring basis'
  ]

  const [userNotRespond, setUserNotRespond] = useState(
    'Show the widget again, but during the next visit to the website'
  )

  const [userClosed, setUserClosed] = useState('Never show the widget again')
  const [isUserClosed, setIsUserClosed] = useState(false)
  const [isCallAlgo, setIsCallAlgo] = useState(false)

  const [widget, setWidget] = useState('')

  const alert = useAlert()

  useEffect(() => {
    if (widget.id) {
      //fetchWidgetSurvay()
      // getSettings()
    }
  }, [widget.id])

  const fetchWidgetSurvay = () => {
    loading(true)
    let head = {
      headers: {
        Authorization: 'Bearer ' + apiToken
      }
    }
    const url = `${process.env.REACT_APP_BASE_APP_URL}/api/v1/widget/${widget.id}/widget-servey`

    axios
      .get(url, head)
      .then(res => {
        loading(false)
        if (res.data.data) {
          setUserClosed(res.data.data.user_closed_info)
          setUserNotRespond(res.data.data.user_not_respond_info)
        }
      })
      .catch(er => {
        loading(false)
        CommonNotify('Cant Fetch Widget Survey Data', 'error')       
      })
  }

  const updateSurvey = () => {
    alert.show('API Endpoint Missing...', {
      type: 'info'
    })

    return

    loading(true)

    let head = {
      headers: {
        Authorization: 'Bearer ' + apiToken
      }
    }
    const url = `${process.env.REACT_APP_BASE_APP_URL}/api/v1/widget/update-servey`

    const data = {
      widget_id: widget.id,
      user_closed_info: userClosed,
      user_not_respond_info: userNotRespond
    }

    axios
      .post(url, data, head)
      .then(res => {
        loading(false)
        if (res.data.message == 'Successfully') {
          CommonNotify('Widget Survey Data Updated', 'success')
        } else {
          CommonNotify('Cant Update Widget Survey Data', 'error')
        }
      })
      .catch(er => {
        loading(false)
        CommonNotify('Cant Update Widget Survey Data', 'error')       
      })
  }

  return (
    <div className="survey-appear survey-displayed">
      <p className="style-widget-title"> If the user hasn’ t responded: </p>{' '}
      <div className="call-bottom-wrapper call-algorithm">
        <CommonRadio
          radioList={lstCallAlgorithm}
          onChange={(e, { value }) => {
            setIsCallAlgo(true)
            setUserNotRespond(value)
          }}
          defaultValue={userNotRespond}
          name={'callAlgorithm'}
        ></CommonRadio>{' '}
      </div>{' '}
      <p className="style-widget-title">
        If the user has responded or closed the widget:
      </p>{' '}
      <div className="call-bottom-wrapper call-algorithm">
        <CommonRadio
          radioList={respondSurvey}
          onChange={(e, { value }) => {
            setIsUserClosed(true)
            setUserClosed(value)
          }}
          defaultValue={userClosed}
          name={'respondText'}
        ></CommonRadio>{' '}
      </div>{' '}
      {(isUserClosed || isCallAlgo) && (
        <div className="save-cancel">
          <CommonButtons
            onClick={updateSurvey}
            type="button"
            content="Save"
            background="blue"
          />
          <CommonButtons
            //onClick={}
            type="reset"
            content="Cancel"
            background="grey"
          />
        </div>
      )}
    </div>
  )
}
