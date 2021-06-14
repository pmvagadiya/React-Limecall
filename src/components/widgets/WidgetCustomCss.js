import React, { useState, useEffect } from 'react'
import { TextArea, Button } from 'semantic-ui-react'
import { useAlert } from 'react-alert'

import { CommonNotify } from '../../common/CommonNotify'

import CommonButtons from '../../common/CommonButtons'
import iconStyle from '../../assets/images/Dashboard 2-07.png'

import axios from 'axios'

const apiToken = localStorage.getItem('access_token')

const defaulSetting = {
  custom_css: '',
  custom_js: ''
}

export const WidgetCustomCssTitle = () => (
  <div className="accordion-widget-holder">
    <div className="accordion-image-holder">
      <img src={iconStyle} alt="logo" />
    </div>{' '}
    <div className="accordion-title-holder">
      <h2 className="accordion-title"> Custom CSS and JS </h2>{' '}
      <p className="accordion-description">
        Style your widget by using custom CSS and JS{' '}
      </p>{' '}
    </div>{' '}
  </div>
)

export const WidgetCustomCssContent = ({ widget, loading }) => {
  const alert = useAlert()
  const [setting, setSetting] = useState(defaulSetting)
  const [settingApi, setSettingApi] = useState(null)
  const [Loadsetting, setLoadSetting] = useState(true)
  const [isSettingChange, setIsSettingChange] = useState(false)
  useEffect(() => {
    if (widget.script == '') return
    fetchScript()
  }, [widget])

  useEffect(() => {
    let set = { ...setting }
    set.id = widget.id
    set.font = 'arial'
    setSetting(set)
  }, [Loadsetting, widget.id])

  const fetchScript = () => {
    loading(true)
    let head = {
      headers: {
        Authorization: 'Bearer ' + apiToken
      }
    }
    const url = `${process.env.REACT_APP_BASE_APP_URL}/api/v1/widget/install?widget_id=${widget.id}`

    axios
      .get(url, head)
      .then(res => {
        loading(false)
        if (res.data.data) {
          if (res.data.data.custom_js == null) {
            res.data.data.custom_js = ''
          }
          if (res.data.data.custom_css == null) {
            res.data.data.custom_css = ''
          }
          setSetting(res.data.data)
          setSettingApi(res.data.data)
          setLoadSetting(false)
        }
      })
      .catch(error => {
        loading(false)
        CommonNotify('Cant Fetch Custom CSS', 'error')      
      })
  }

  const changeSetting = (val, index) => {
    if (val) {
      setIsSettingChange(true)
    } else {
      setIsSettingChange(false)
    }
    let set = { ...setting }
    set[index] = val
    setSetting(set)
  }

  const updateScript = () => {
    if (widget.id == '') return
    loading(true)
    let head = {
      headers: {
        Authorization: 'Bearer ' + apiToken
      }
    }
    const url = `${process.env.REACT_APP_BASE_APP_URL}/api/v1/widget/set-customizations`

    axios
      .post(url, setting, head)
      .then(res => {
        loading(false)
        if (res.data.message == 'Successfully') {
          CommonNotify('Settings updated!', 'success')
          setIsSettingChange(false)
        } else {
          CommonNotify('Unable to update settings', 'error')
        }
      })
      .catch(error => {
        loading(false)
        CommonNotify('Unable to update settings', 'error')      
      })
  }
  const onCancel = () => {
    setSetting(settingApi)
    setIsSettingChange(false)
  }
  return (
    <div className="style-widget-wrapper">
      <div className="custom-styles-scripting">
        <div className="custom-files">
          <h3 className="call-title widget-sub-heading"> Custom CSS </h3>{' '}
          <TextArea
            onChange={e => changeSetting(e.target.value, 'custom_css')}
            value={setting.custom_css}
            placeholder="Place your custom CSS code here."
          />{' '}
          {/* <CommonInput name="customCss" type="text" /> */}{' '}
          {/* <CommonButton
                  content="upload"
                  background="blue"
                  btnClass="btn-upload"
                /> */}{' '}
        </div>{' '}
        <div className="custom-files">
          <h3 className="call-title widget-sub-heading"> Custom JS </h3>{' '}
          <TextArea
            onChange={e => changeSetting(e.target.value, 'custom_js')}
            value={setting.custom_js}
            placeholder="Place your custom JavaScript code here."
          />{' '}
          {/* <CommonInput name="customJs" type="text" /> */}{' '}
          {/* <CommonButton
                  content="upload"
                  background="blue"
                  btnClass="btn-upload"
                /> */}{' '}
        </div>{' '}
        {isSettingChange && (
          <div className="save-cancel">
            <CommonButtons
              onClick={updateScript}
              type="button"
              content="Save"
              background="blue"
            />
            <CommonButtons
              onClick={onCancel}
              type="reset"
              content="Cancel"
              background="grey"
            />
          </div>
        )}
      </div>{' '}
    </div>
  )
}
