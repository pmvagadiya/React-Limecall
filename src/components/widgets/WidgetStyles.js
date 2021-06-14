import React, { useState, useEffect } from 'react'
import { TextArea } from 'semantic-ui-react'
import _ from 'lodash'

import NodeToggle from '../../common/NodeToggle'
import CommonColor from '../../common/CommonColor'
import CommonSelect3 from '../../common/CommonSelect3'
import CommonSelect from '../../common/CommonSelect'
import CommonInput from '../../common/CommonInput'
import { Accordion, Rail, Ref, Sticky } from 'semantic-ui-react'
import CommonButton from '../../common/CommonButtons'

import iconStyle from '../../assets/images/Dashboard 2-07.png'
import callMeBack from '../../assets/images/phone-black.svg'
import callMeBackRound from '../../assets/images/call-back.png'
import callMeLetter from '../../assets/images/mini-clock.png'
import leaveMessage from '../../assets/images/message.png'

import deleteIcon from '../../assets/images/delete-icon.png'
import plusIcon from '../../assets/images/plus.png'

import axios from 'axios'
import { CommonNotify } from '../../common/CommonNotify'

import {
  lstCustomFieldTypeOptions,
  widgetCustomFieldDisplayOnCallNow
} from '../../lib/WidgetData'
import CommonButtons from '../../common/CommonButtons'

let widgetDefaultSetting = {
  template: 'Classic'
}

const apiToken = localStorage.getItem('access_token')

const bubbleDefaultSetting = {
  color: '#0080FF',
  shadow: false,
  textOnline: 'Would you like us to call you now ?',
  textOffline: 'Hey there! We are offline now ?',
  position: '',
  labelColor: '#2B2B2C',
  shape: 'default'
}

export const WidgetStyleTitle = () => (
  <div className="accordion-widget-holder">
    <div className="accordion-image-holder">
      <img src={iconStyle} alt="logo" />
    </div>
    <div className="accordion-title-holder">
      <h2 className="accordion-title">Style your widget</h2>
      <p className="accordion-description">
        Customize your widget's design, appearance, positioning and more.
      </p>
    </div>
  </div>
)

export const WidgetStyleContent = ({
  widget,
  styleRef,
  closeWidgetStyle,
  handleDataRef,
  handleToggleData,
  clickToCallName,
  clickToCallNameToggle,
  clickToCallEmail,
  clickToCallEmailToggle,
  clickToCallTeam,
  clickToCallTeamToggle,
  clickToCallCustomFields,
  clickToCallCustomFieldsToggle,
  lstCustomFields,
  onUpdateCustomeFields,
  handleQualification,
  onAddRemoveCustomeFields,
  onSubmitCustomFields,
  callMeBackName,
  callMeBackEmail,
  callMeBackTeam,
  callMeBackCustomFields,
  callMeBackCustomFieldsToggle,
  callMeLaterName,
  callMeLaterNameToggle,
  callMeLaterEmail,
  callMeLaterEmailToggle,
  callMeLaterTeam,
  callMeLaterTeamToggle,
  callMeLaterCustomFields,
  callMeLaterCustomFieldsToggle,
  leaveMessageName,
  leaveMessageEmail,
  leaveMessageTeam,
  leaveMessageCustomFields,
  leaveMessageCustomFieldsToggle,
  classicSmart,
  contextRef,
  legalWidget,
  legalToggle,
  socialWidget,
  privacyWidget,
  privacyToggle,
  onClickTableCategory,
  widgetStyleTabs,
  activeIndexWidget,
  handleClickWidget,
  allowedTabs,
  webCallDisplay,
  callMeBackDisplay,
  callMeLaterDisplay,
  leaveMessageDisplay,
  loading,
  fullNameToggle,
  emailToggle
}) => {
  const [buttonColor, setButtonColor] = useState('#662D91')
  const [isInputChange, setIsInputChange] = useState(false)

  const [clickToCallTabText, setClickToCallTabText] = useState(
    'Click to connect to agent!'
  )
  const [clickToCallButtonText, setClickToCallButtonText] = useState(
    'Start Call'
  )

  const [callMeLaterTabText, setCallMeLaterTabText] = useState(
    'Would you like us to call you later ?'
  )
  const [callMeLaterButtonText, setCallMeLaterButtonText] = useState('Schedule')

  const [leaveMessageButtonText, setLeaveMessageButtonText] = useState(
    'Send Message'
  )
  const [widgetApiData, setWidgetApiData] = useState(widgetDefaultSetting)

  const [legalText, setLegalText] = useState('Terms')

  const [widgetAllSetting, setWidgetALlSetting] = useState(null)
  const [widgetSetting, setWidgetSetting] = useState(widgetDefaultSetting)
  const [bubbleSetting, setBubbleSetting] = useState(bubbleDefaultSetting)
  const [widgetStyleData, setWidgetStyleData] = useState({})
  const [apiLoaded, setApiLoaded] = useState(false)
  const [widgetApiResData, setWidgetApiResData] = useState({})
  useEffect(() => {
    if (!widget.id) return
    fetchSetting()
  }, [widget])

  useEffect(() => {
    if (bubbleSetting.position == '') return
    setApiLoaded(true)
  }, [bubbleSetting.position])

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const fetchSetting = () => {
    loading(true)
    let head = {
      headers: {
        Authorization: 'Bearer ' + apiToken
      }
    }
    var url = `${process.env.REACT_APP_BASE_APP_URL}/api/v1/widget/widgets`

    axios
      .get(url, head)
      .then(res => {
        loading(false)
        if (res.data.data) {
          setWidgetALlSetting(res.data.data)
          setWidgetApiData(res.data.data)
          setWidget(res.data.data[0])
          setBubble(res.data.data)
          let widgetData = res.data.data[0]
          widgetData['full_name_display_on_call_now'] = 'on_call_now_screen'
          widgetData['full_name_display_on_digital_calls'] = 'before_call'

          widgetData['full_name_display_on_call_later'] = 'before_schedule'
          widgetData['email_display_on_call_now'] = 'on_call_now_screen'
          widgetData['email_display_on_digital_calls'] = 'before_call'
          widgetData['email_display_on'] = 'before_schedule'
          widgetData['email_display_on_call_later'] = 'before_call'
          setWidgetStyleData(widgetData)
          setWidgetApiResData(widgetData)
        }
      })
      .catch(er => {
        loading(false)
        CommonNotify('Cant Fetch Saved Setting', 'error')
      })
  }

  const postSetting = data => {
    loading(true)
    let head = {
      headers: {
        Authorization: 'Bearer ' + apiToken
      }
    }
    const url = `${process.env.REACT_APP_BASE_APP_URL}/api/v1/widget/set-customizations`
    return axios.post(url, data, head)
    // .then(res => {
    //   loading(false)
    //   if (res.data.message[0] === 'Successfully') {
    //     CommonNotify('Updated Widget Setting', 'success')
    //   }
    // })
    // .catch(error => {
    //   loading(false)
    //   CommonNotify('Cant Updated Widget Setting', 'error')
    // })
  }

  const setWidget = data => {
    let widgetSettingData = { ...widgetSetting }
    const dataTemplateType = parseInt(data.template_type)
    if (dataTemplateType == 2) {
      widgetSettingData.template = 'Smart'
    } else if (dataTemplateType == 1) {
      widgetSettingData.template = 'Classic'
    } else if (dataTemplateType == 3) {
      widgetSettingData.template = 'Modern'
    }

    widgetSettingData.classicType =
      data.classic_template_design_type == 1 ? false : true
    widgetSettingData.font = data.font

    widgetSettingData.timerColor = data.popup_timer_color
    widgetSettingData.callColor = data.submit_request_call_color

    widgetSettingData.socialProof = data.social_proof
    widgetSettingData.legalNote = data.terms_and_conditions
    widgetSettingData.legalType = data.terms_type
    widgetSettingData.legalStatus = data.terms_and_conditions_status
    widgetSettingData.privateStatus = data.privacy_note_status
    widgetSettingData.privatePolicy = data.privacy_note

    if (widgetSettingData.legalType == 0) {
      widgetSettingData.legalType = 'Text'
    } else if (widgetSettingData.legalType == 1) {
      widgetSettingData.legalType = 'URL'
    } else {
      widgetSettingData.legalType = 'HTML'
    }

    widgetSettingData.webCall = data.digital_call
    widgetSettingData.callLeter = data.call_me_later
    widgetSettingData.callBack = data.call_now
    widgetSettingData.leaveMessage = data.leave_message

    widgetSettingData.webCallHeader = data.digital_call_tab_text
    widgetSettingData.webCallButton = data.digital_call_button_text
    widgetSettingData.webCallName = data.full_name_in_digital_calls_tab
    widgetSettingData.webCallEmail = data.email_in_digital_calls_tab
    widgetSettingData.webCallTeam = data.team_in_digital_calls_tab

    widgetSettingData.callLeterHeader = data.schedule_call_tab_text
    widgetSettingData.callLeterButton = data.offline_schedule_call_message
    widgetSettingData.callLeterName = data.full_name_in_call_later_tab

    widgetSettingData.callLeterEmail = data.email_in_call_later_tab
    widgetSettingData.callLeterTeam = data.team_in_call_later_tab

    widgetSettingData.callBackHeader = data.widget_text
    widgetSettingData.callBackButton = data.submit_request_call_text
    widgetSettingData.callBackName = data.full_name_in_call_now_tab
    widgetSettingData.callBackEmail = data.email_in_call_now_tab
    widgetSettingData.callBackTeam = data.team_in_call_now_tab

    widgetSettingData.leaveMessageHeader = data.leave_message_tab_text
    widgetSettingData.leaveMessageName = data.full_name_in_leave_message_tab
    widgetSettingData.leaveMessageEmail = data.email_in_leave_message_tab
    widgetSettingData.leaveMessageTeam = data.team_in_leave_message

    setWidgetSetting(widgetSettingData)
    setWidgetApiData(widgetSettingData)
  }

  const submitWidget = () => {
    const data = widgetStyleData
    postSetting(data)
      .then(res => {
        loading(false)
        if (res.data.message[0] === 'Successfully') {
          CommonNotify('Updated Widget Setting', 'success')
          setIsInputChange(false)
        }
      })
      .catch(error => {
        loading(false)
        CommonNotify('Cant Updated Widget Setting', 'error')
      })
  }

  const resetWidget = data => {
    let widgetSetting = { ...widgetAllSetting }
    widgetSetting.template_type = 3
    if (data.template == 'Smart') {
      widgetSetting.template_type = 2
    } else if (data.template == 'Classic') {
      widgetSetting.template_type = 1
    }

    widgetSetting.classic_template_design_type =
      data.classicType == true ? 1 : 0

    widgetSetting.font = data.font
    widgetSetting.popup_timer_color = data.timerColor
    widgetSetting.submit_request_call_color = data.callColor

    widgetSetting.social_proof = data.socialProof
    widgetSetting.terms_and_conditions = data.legalNote
    widgetSetting.terms_type = data.legalType
    widgetSetting.terms_and_conditions_status = data.legalStatus
    widgetSetting.privacy_note_status = data.privateStatus
    widgetSetting.privacy_note = data.privatePolicy

    if (widgetSetting.terms_type == 'Text') {
      widgetSetting.terms_type = 0
    } else if (widgetSetting.terms_type == 'URL') {
      widgetSetting.terms_type = 1
    } else {
      widgetSetting.terms_type = 2
    }

    widgetSetting.digital_call = data.webCall
    widgetSetting.call_me_later = data.callLeter
    widgetSetting.call_now = data.callBack
    widgetSetting.leave_message = data.leaveMessage

    widgetSetting.digital_call_tab_text = data.webCallHeader
    widgetSetting.digital_call_button_text = data.webCallButton
    widgetSetting.full_name_in_digital_calls_tab = data.webCallName
    widgetSetting.email_in_digital_calls_tab = data.webCallEmail
    widgetSetting.team_in_digital_calls_tab = data.webCallTeam

    widgetSetting.schedule_call_tab_text = data.callLeterHeader
    widgetSetting.offline_schedule_call_message = data.callLeterButton
    widgetSetting.full_name_in_call_later_tab = data.callLeterName

    widgetSetting.email_in_call_later_tab = data.callLeterEmail
    widgetSetting.team_in_call_later_tab = data.callLeterTeam

    widgetSetting.widget_text = data.callBackHeader
    widgetSetting.submit_request_call_text = data.callBackButton
    widgetSetting.full_name_in_call_now_tab = data.callBackName
    widgetSetting.email_in_call_now_tab = data.callBackEmail
    widgetSetting.team_in_call_now_tab = data.callBackTeam

    widgetSetting.leave_message_tab_text = data.leaveMessageHeader
    widgetSetting.full_name_in_leave_message_tab = data.leaveMessageName
    widgetSetting.email_in_leave_message_tab = data.leaveMessageEmail
    widgetSetting.team_in_leave_message = data.leaveMessageTeam
    setWidgetALlSetting(widgetSetting)
    return widgetSetting
  }

  const changeWidget = (index, value) => {
    let widgetSettingNew = { ...widgetSetting }
    let widgetStyleDataNew = { ...widgetStyleData }
    if (value === true) {
      value = 1
    }
    if (value === false) {
      value = 0
    }
    widgetSettingNew[index] = value
    widgetStyleDataNew[index] = value
    if (index == 'template_type') {
      widgetSettingNew['template_type'] = String(value)
      widgetStyleDataNew['template_type'] = String(value)
      if (value == 1) widgetSettingNew['template'] = 'Classic'
      else if (value == 2) widgetSettingNew['template'] = 'Smart'
      else if (value == 3) widgetSettingNew['template'] = 'Modern'
    }
    setWidgetSetting({ ...widgetSettingNew })
    setWidgetStyleData({ ...widgetStyleDataNew })
    const check = _.isEqual(widgetSettingNew, widgetApiData)
    if (check === false) {
      setIsInputChange(true)
    } else {
      setIsInputChange(false)
    }
  }

  const changeWidgetToggle = (index, value) => {
    let widgetStyleDataNew = { ...widgetStyleData }
    // if (value === true) {
    //   value = 1
    // }
    // if (value === false) {
    //   value = 0
    // }
    if (
      index == 'privacy_note_status' ||
      index == 'call_me_later' ||
      index == 'call_now' ||
      index == 'digital_call'
    ) {
      widgetStyleDataNew[index] = value
    } else {
      widgetStyleDataNew[index] = value ? 1 : 0
    }
    setWidgetStyleData({ ...widgetStyleDataNew })
    postSetting(widgetStyleDataNew)
      .then(res => {
        loading(false)
        if (res.data.message[0] === 'Successfully') {
          CommonNotify('Updated Widget Setting', 'success')
        }
      })
      .catch(error => {
        loading(false)
        CommonNotify('Cant Updated Widget Setting', 'error')
        widgetStyleDataNew[index] = 0
        setWidgetStyleData({ ...widgetStyleDataNew })
      })
  }

  const setBubble = data => {
    let bubbleSetting1 = { ...bubbleSetting }

    bubbleSetting1.shadow = data.bubble_template == 2 ? true : false
    bubbleSetting1.color = data.circle_color
    bubbleSetting1.textOffline = data.bubble_offline_text
    bubbleSetting1.textOnline = data.bubble_text

    if (data.bubble_position == 'bottom_right') {
      data.bubble_position = 'btnBottomRight'
    } else if (data.bubble_position == 'bottom_left') {
      data.bubble_position = 'btnBottomLeft'
    } else if (data.bubble_position == 'top_right') {
      data.bubble_position = 'btnTopRight'
    } else {
      data.bubble_position = 'btnTopLeft'
    }

    if (data.shape == 'square') {
      data.shape = 'btnRight'
    } else {
      data.shape = 'btnLeft'
    }

    bubbleSetting1.position = data.bubble_position
    bubbleSetting1.shape = data.shape

    setBubbleSetting(bubbleSetting1)
  }
  const Options = ['Classic', 'Smart', 'Modern']
  const termOption = ['Text', 'URL', 'HTML']
  const popup_font = [
    'Serif',
    'Sans-Serif',
    'Arial',
    'Tahoma',
    'Lucida Sans Unicode',
    'Roboto',
    'Times New Roman',
    'Times',
    'Courier New',
    'Courier',
    'Verdana',
    'Georgia',
    'Palatino',
    'Garamond',
    'Bookman',
    'Comic Sans MS',
    'Candara',
    'Arial Black',
    'Impact'
  ]
  const onCancel = () => {
    setWidgetStyleData(widgetApiResData)
    setIsInputChange(false)
  }

  return (
    <div className="style-widget-wrapper accordion-widget">
      <div className="popup-font theme-selector">
        <h3 className="call-title widget-sub-heading">Theme</h3>

        <CommonSelect
          name="popupFont"
          className="popup-font-select"
          placeholder="Select Template"
          options={Options}
          value={
            parseInt(widgetStyleData.template_type) === parseInt(1)
              ? 'Classic'
              : parseInt(widgetStyleData.template_type) === parseInt(2)
              ? 'Smart'
              : 'Modern'
          }
          onChange={(p1, p2, p3) => {
            changeWidget(
              'template_type',
              p2.value == 'Classic' ? 1 : p2.value === 'Smart' ? 2 : 3
            )
          }}
        />
      </div>
      <div className="popup-font theme-selector">
        {parseInt(widgetStyleData.template_type) === parseInt(1) && (
          <>
            <h3 className="call-title widget-sub-heading">
              Widget Design Type
            </h3>

            <CommonSelect
              name="popupFont"
              className="popup-font-select"
              placeholder="Select Template"
              options={['Popup / modal style', 'Slide extension style']}
              value={
                widgetStyleData.classic_template_design_type === 0
                  ? 'Popup / modal style'
                  : 'Slide extension style'
              }
              onChange={(p1, p2, p3) =>
                changeWidget(
                  'classic_template_design_type',
                  p2.value === 'Popup / modal style' ? 0 : 1
                )
              }
            />
          </>
        )}
      </div>

      {/* <div className="display-content">
        <p className="style-widget-title style-switch">Popup Style</p>
        <NodeToggle
          handleDataRef={e => changeWidget('classicType', e)}
          dataToggle={classicSmart[0]}
          activeDefault={widgetSetting.classicType}
        />
      </div> */}
      <div className="display-content">
        <p className="style-widget-title style-switch widget-sub-heading">
          Web Call
        </p>
        <NodeToggle
          handleDataRef={e => changeWidgetToggle('digital_call', e)}
          dataToggle={webCallDisplay[0]}
          activeDefault={widgetStyleData.digital_call ? true : false}
        />
      </div>

      {widgetStyleData.digital_call ? (
        <Accordion className="holder-widget">
          <div className="accordion-content-wrapper">
            <Accordion.Title
              active={activeIndexWidget === 0}
              index={0}
              onClick={e => {
                handleClickWidget(e, 0)
              }}
              id="clickToCall"
            >
              <div className="widget-sub-heading">Web Call</div>
            </Accordion.Title>
            <Accordion.Content active={activeIndexWidget === 0}>
              {widgetStyleData.template_type !== parseInt(1) ? (
                <div></div>
              ) : (
                <div>
                  {widgetStyleData.digital_call && (
                    <div className="call-tab-text">
                      <h3 className="call-title widget-sub-heading">
                        Header text
                      </h3>
                      <CommonInput
                        placeholder="Do you want us to call you in 28 seconds?"
                        name="call-me-now"
                        type="text"
                        // defaultValue={widgetSetting.webCallHeader}
                        value={widgetStyleData.digital_call_tab_text}
                        onChange={event =>
                          changeWidget(
                            'digital_call_tab_text',
                            event.target.value
                          )
                        }
                      />
                    </div>
                  )}
                </div>
              )}
              {widgetStyleData.template_type !== parseInt(1) ? (
                <div></div>
              ) : (
                <div>
                  {widgetSetting.webCall && (
                    <div className="call-tab-text">
                      <h3 className="call-title widget-sub-heading">
                        Button text
                      </h3>
                      <CommonInput
                        placeholder="Connect"
                        name="click-to-call"
                        type="text"
                        // defaultValue={widgetSetting.webCallButton}
                        value={
                          widgetStyleData.digital_call_button_text
                            ? widgetStyleData.digital_call_button_text
                            : null
                        }
                        onChange={event =>
                          changeWidget(
                            'digital_call_button_text',
                            event.target.value
                          )
                        }
                      />
                    </div>
                  )}
                </div>
              )}
              <div className="display-content">
                <p className="style-widget-title widget-sub-heading">Name</p>
                <NodeToggle
                  handleDataRef={e =>
                    changeWidgetToggle('full_name_in_digital_calls_tab', e)
                  }
                  dataToggle={clickToCallName[0]}
                  activeDefault={widgetStyleData.full_name_in_digital_calls_tab}
                  fullNameToggle={fullNameToggle}
                />
              </div>
              <div className="display-content">
                <p className="style-widget-title widget-sub-heading">Email</p>
                <NodeToggle
                  handleDataRef={e =>
                    changeWidgetToggle('email_in_digital_calls_tab', e)
                  }
                  dataToggle={clickToCallEmail[0]}
                  activeDefault={widgetStyleData.email_in_digital_calls_tab}
                  dataToggleActive={widgetStyleData.email_in_digital_calls_tab}
                  emailToggle={emailToggle}
                />
              </div>
              <div className="display-content">
                <p className="style-widget-title widget-sub-heading">Team</p>
                <NodeToggle
                  handleDataRef={e =>
                    changeWidgetToggle('team_in_digital_calls_tab', e)
                  }
                  dataToggle={clickToCallTeam[0]}
                  activeDefault={widgetStyleData.team_in_digital_calls_tab}
                  dataToggleActive={widgetStyleData.team_in_digital_calls_tab}
                />
              </div>
              {/* <div className="display-content">
                <p className="style-widget-title">Custom Fields</p>
                <NodeToggle
                  handleDataRef={e =>
                    handleDataRef('clickToCallCustomFieldsToggle', e)
                  }
                  dataToggle={clickToCallCustomFields[0]}
                />
              </div> */}
              {clickToCallCustomFieldsToggle && (
                <div className="custom-fields-wrapper">
                  {lstCustomFields.map((item, index) => {
                    return (
                      <div className="custom-fields-head" key={index}>
                        <CommonSelect
                          isGray
                          name="fieldType"
                          options={lstCustomFieldTypeOptions}
                          defaultValue={
                            item.fieldType || lstCustomFieldTypeOptions[1]
                          }
                          onChange={(e, result) =>
                            onUpdateCustomeFields(index, result)
                          }
                        />
                        <CommonInput
                          placeholder="Label"
                          name="label"
                          type="text"
                          onChange={(e, result) =>
                            onUpdateCustomeFields(index, result)
                          }
                        />
                        <CommonInput
                          placeholder="values comma separated"
                          name="value"
                          type="text"
                          onChange={(e, result) =>
                            onUpdateCustomeFields(index, result)
                          }
                        />
                        <NodeToggle
                          handleDataRef={value => {
                            handleQualification(
                              index,
                              'showQualificationButton',
                              value
                            )
                          }}
                          dataToggle={{
                            callTitle: 'Enabled',
                            callId: `eQualification${index}`,
                            callRef: `showEQualificationButton${index}`
                          }}
                        />
                        <NodeToggle
                          handleDataRef={value => {
                            handleQualification(
                              index,
                              'showRequiredQualificationButton',
                              value
                            )
                          }}
                          dataToggle={{
                            callTitle: 'Required',
                            callId: `rQualification${index}`,
                            callRef: `showRQualificationButton${index}`
                          }}
                        />
                        <CommonSelect
                          isGray
                          name="displayOnCallMeNowWidget"
                          options={widgetCustomFieldDisplayOnCallNow}
                          defaultValue={
                            item.displayOnCallMeNowWidget ||
                            lstCustomFieldTypeOptions[0]
                          }
                          onChange={(e, result) =>
                            onUpdateCustomeFields(index, result)
                          }
                        />
                        <div>
                          {index === 0 ? (
                            <img
                              src={plusIcon}
                              height="15"
                              alt="logo"
                              onClick={() => onAddRemoveCustomeFields({ item })}
                            />
                          ) : null}
                          <img
                            src={deleteIcon}
                            height="15"
                            alt="logo"
                            onClick={() => onAddRemoveCustomeFields({ index })}
                          />
                        </div>
                      </div>
                    )
                  })}
                  <div className="save-cancel">
                    <CommonButton
                      content="Save"
                      btnClass="btn-blue"
                      onClick={() => onSubmitCustomFields()}
                    />
                    <CommonButtons
                      onClick={onCancel}
                      type="reset"
                      content="Cancel"
                      background="grey"
                    />
                  </div>
                </div>
              )}
            </Accordion.Content>
          </div>
        </Accordion>
      ) : null}

      {parseInt(widgetStyleData.template_type) === parseInt(2) ? (
        <div></div>
      ) : (
        <div className="display-content">
          <p className="style-widget-title style-switch widget-sub-heading">
            Call me Back
          </p>
          <NodeToggle
            handleDataRef={e => changeWidgetToggle('call_now', e)}
            dataToggle={callMeBackDisplay[0]}
            activeDefault={widgetStyleData.call_now}
          />
        </div>
      )}

      {parseInt(widgetStyleData.template_type) === parseInt(2) ? (
        <div></div>
      ) : (
        <div className="callMeBack">
          {widgetStyleData.call_now ? (
            <Accordion className="holder-widget">
              <div className="accordion-content-wrapper">
                <Accordion.Title
                  active={activeIndexWidget === 1}
                  index={1}
                  onClick={e => handleClickWidget(e, 1)}
                  id="callMeBack"
                >
                  <div className="widget-sub-heading">Call me Back</div>
                </Accordion.Title>
                <Accordion.Content active={activeIndexWidget === 1}>
                  {allowedTabs.callMeBack && (
                    <div className="call-tab-text">
                      <h3 className="call-title widget-sub-heading">
                        Header text
                      </h3>
                      <CommonInput
                        placeholder="Do you want us to call you in 28 seconds?"
                        name="call-me-back"
                        type="text"
                        // defaultValue={widgetStyleData.submit_request_call_text}
                        value={
                          widgetStyleData.widget_text
                            ? widgetStyleData.widget_text
                            : null
                        }
                        onChange={event =>
                          changeWidget('widget_text', event.target.value)
                        }
                      />
                    </div>
                  )}
                  {allowedTabs.callMeBack && (
                    <div className="call-tab-text">
                      <h3 className="call-title widget-sub-heading">
                        Button text
                      </h3>
                      <CommonInput
                        placeholder="Call Me Now"
                        name="call-me-now"
                        type="text"
                        value={
                          widgetStyleData.submit_request_call_text
                            ? widgetStyleData.submit_request_call_text
                            : null
                        }
                        onChange={event =>
                          changeWidget(
                            'submit_request_call_text',
                            event.target.value
                          )
                        }
                      />
                    </div>
                  )}
                  <div className="display-content">
                    <p className="style-widget-title widget-sub-heading">
                      Name
                    </p>
                    <NodeToggle
                      handleDataRef={e =>
                        changeWidgetToggle('full_name_in_call_now_tab', e)
                      }
                      dataToggle={callMeBackName[0]}
                      activeDefault={widgetStyleData.full_name_in_call_now_tab}
                    />
                  </div>
                  <div className="display-content">
                    <p className="style-widget-title widget-sub-heading">
                      Email
                    </p>
                    <NodeToggle
                      handleDataRef={e =>
                        changeWidgetToggle('email_in_call_now_tab', e)
                      }
                      dataToggle={callMeBackEmail[0]}
                      activeDefault={widgetStyleData.email_in_call_now_tab}
                    />
                  </div>
                  <div className="display-content">
                    <p className="style-widget-title widget-sub-heading">
                      Team
                    </p>
                    <NodeToggle
                      handleDataRef={e =>
                        changeWidgetToggle('team_in_call_now_tab', e)
                      }
                      dataToggle={callMeBackTeam[0]}
                      activeDefault={widgetStyleData.team_in_call_now_tab}
                    />
                  </div>
                  {/* <div className="display-content">
                    <p className="style-widget-title">Custom Fields</p>
                    <NodeToggle
                      handleDataRef={e =>
                        handleDataRef('callMeBackCustomFieldsToggle', e)
                      }
                      dataToggle={callMeBackCustomFields[0]}
                    />
                  </div> */}
                  {callMeBackCustomFieldsToggle && (
                    <div className="custom-fields-wrapper">
                      {lstCustomFields.map((item, index) => {
                        return (
                          <div className="custom-fields-head" key={index}>
                            <CommonSelect
                              isGray
                              name="fieldType"
                              options={lstCustomFieldTypeOptions}
                              defaultValue={
                                item.fieldType || lstCustomFieldTypeOptions[1]
                              }
                              onChange={(e, result) =>
                                onUpdateCustomeFields(index, result)
                              }
                            />
                            <CommonInput
                              placeholder="Label"
                              name="label"
                              type="text"
                              onChange={(e, result) =>
                                onUpdateCustomeFields(index, result)
                              }
                            />
                            <CommonInput
                              placeholder="values comma separated"
                              name="value"
                              type="text"
                              onChange={(e, result) =>
                                onUpdateCustomeFields(index, result)
                              }
                            />
                            <NodeToggle
                              handleDataRef={value => {
                                handleQualification(
                                  index,
                                  'showQualificationButton',
                                  value
                                )
                              }}
                              dataToggle={{
                                callTitle: 'Enabled',
                                callId: `eQualification${index}`,
                                callRef: `showEQualificationButton${index}`
                              }}
                            />
                            <NodeToggle
                              handleDataRef={value => {
                                handleQualification(
                                  index,
                                  'showRequiredQualificationButton',
                                  value
                                )
                              }}
                              dataToggle={{
                                callTitle: 'Required',
                                callId: `rQualification${index}`,
                                callRef: `showRQualificationButton${index}`
                              }}
                            />
                            <CommonSelect
                              isGray
                              name="displayOnCallMeNowWidget"
                              options={widgetCustomFieldDisplayOnCallNow}
                              defaultValue={
                                item.displayOnCallMeNowWidget ||
                                lstCustomFieldTypeOptions[0]
                              }
                              onChange={(e, result) =>
                                onUpdateCustomeFields(index, result)
                              }
                            />
                            <div>
                              {index === 0 ? (
                                <img
                                  src={plusIcon}
                                  height="15"
                                  alt="logo"
                                  onClick={() =>
                                    onAddRemoveCustomeFields({ item })
                                  }
                                />
                              ) : null}
                              <img
                                src={deleteIcon}
                                height="15"
                                alt="logo"
                                onClick={() =>
                                  onAddRemoveCustomeFields({ index })
                                }
                              />
                            </div>
                          </div>
                        )
                      })}
                      <div className="save-cancel">
                        <CommonButton
                          content="Save"
                          btnClass="btn-blue"
                          onClick={() => onSubmitCustomFields()}
                        />
                        <CommonButtons
                          onClick={onCancel}
                          type="reset"
                          content="Cancel"
                          background="grey"
                        />
                      </div>
                    </div>
                  )}
                </Accordion.Content>
              </div>
            </Accordion>
          ) : null}
        </div>
      )}

      <div className="display-content">
        <p className="style-widget-title style-switch widget-sub-heading">
          Call me Later
        </p>
        <NodeToggle
          handleDataRef={e => changeWidgetToggle('call_me_later', e)}
          dataToggle={callMeLaterDisplay[0]}
          activeDefault={widgetStyleData.call_me_later}
        />
      </div>
      {widgetStyleData.call_me_later ? (
        <Accordion className="holder-widget">
          <div className="accordion-content-wrapper">
            <Accordion.Title
              active={activeIndexWidget === 2}
              index={2}
              onClick={e => handleClickWidget(e, 2)}
              id="callMeLater"
            >
              <div className="widget-sub-heading">Call me Later</div>
            </Accordion.Title>
            <Accordion.Content active={activeIndexWidget === 2}>
              {widgetStyleData.template_type !== parseInt(1) ? (
                <div></div>
              ) : (
                <div>
                  <div className="call-tab-text">
                    <h3 className="call-title widget-sub-heading">
                      Header text
                    </h3>
                    <CommonInput
                      placeholder="Would you like us to call you later ?"
                      name="call-me-now"
                      type="text"
                      defaultValue={widgetSetting.offline_schedule_call_message}
                      value={
                        widgetStyleData.schedule_call_tab_text
                          ? widgetStyleData.schedule_call_tab_text
                          : null
                      }
                      onChange={event =>
                        changeWidget(
                          'schedule_call_tab_text',
                          event.target.value
                        )
                      }
                    />
                  </div>
                </div>
              )}
              {widgetStyleData.template_type === parseInt(1) ? (
                <div></div>
              ) : (
                <div>
                  <div className="call-tab-text">
                    <h3 className="call-title widget-sub-heading">
                      Button text
                    </h3>
                    <CommonInput
                      placeholder="Call Me Now"
                      name="call-me-now"
                      type="text"
                      // defaultValue={widgetStyleData.offline_schedule_call_message}
                      value={
                        widgetStyleData.offline_schedule_call_message
                          ? widgetStyleData.offline_schedule_call_message
                          : null
                      }
                      onChange={event =>
                        changeWidget(
                          'offline_schedule_call_message',
                          event.target.value
                        )
                      }
                    />
                  </div>
                </div>
              )}

              <>
                <div className="display-content">
                  <p className="style-widget-title widget-sub-heading">Name</p>
                  <NodeToggle
                    handleDataRef={e =>
                      changeWidgetToggle('full_name_in_call_later_tab', e)
                    }
                    dataToggle={callMeLaterName[0]}
                    activeDefault={true}
                  />
                </div>
                <div className="display-content">
                  <p className="style-widget-title widget-sub-heading">Email</p>
                  <NodeToggle
                    handleDataRef={e =>
                      changeWidgetToggle('email_in_call_later_tab', e)
                    }
                    dataToggle={callMeLaterEmail[0]}
                    activeDefault={widgetStyleData.email_in_call_later_tab}
                  />
                </div>
                <div className="display-content">
                  <p className="style-widget-title widget-sub-heading">Team</p>
                  <NodeToggle
                    handleDataRef={e =>
                      changeWidgetToggle('team_in_call_later_tab', e)
                    }
                    dataToggle={callMeLaterTeam[0]}
                    activeDefault={widgetStyleData.team_in_call_later_tab}
                  />
                </div>
              </>

              {/* <div className="display-content">
                <p className="style-widget-title">Custom Fields</p>
                <NodeToggle
                  handleDataRef={e =>
                    handleDataRef('callMeLaterCustomFieldsToggle', e)
                  }
                  dataToggle={callMeLaterCustomFields[0]}
                />
              </div> */}
              {callMeLaterCustomFieldsToggle && (
                <div className="custom-fields-wrapper">
                  {lstCustomFields.map((item, index) => {
                    return (
                      <div className="custom-fields-head" key={index}>
                        <CommonSelect
                          isGray
                          name="fieldType"
                          options={lstCustomFieldTypeOptions}
                          defaultValue={
                            item.fieldType || lstCustomFieldTypeOptions[1]
                          }
                          onChange={(e, result) =>
                            onUpdateCustomeFields(index, result)
                          }
                        />
                        <CommonInput
                          placeholder="Label"
                          name="label"
                          type="text"
                          onChange={(e, result) =>
                            onUpdateCustomeFields(index, result)
                          }
                        />
                        <CommonInput
                          placeholder="values comma separated"
                          name="value"
                          type="text"
                          onChange={(e, result) =>
                            onUpdateCustomeFields(index, result)
                          }
                        />
                        <NodeToggle
                          handleDataRef={value => {
                            handleQualification(
                              index,
                              'showQualificationButton',
                              value
                            )
                          }}
                          dataToggle={{
                            callTitle: 'Enabled',
                            callId: `eQualification${index}`,
                            callRef: `showEQualificationButton${index}`
                          }}
                        />
                        <NodeToggle
                          handleDataRef={value => {
                            handleQualification(
                              index,
                              'showRequiredQualificationButton',
                              value
                            )
                          }}
                          dataToggle={{
                            callTitle: 'Required',
                            callId: `rQualification${index}`,
                            callRef: `showRQualificationButton${index}`
                          }}
                        />
                        <CommonSelect
                          isGray
                          name="displayOnCallMeNowWidget"
                          options={widgetCustomFieldDisplayOnCallNow}
                          defaultValue={
                            item.displayOnCallMeNowWidget ||
                            lstCustomFieldTypeOptions[0]
                          }
                          onChange={(e, result) =>
                            onUpdateCustomeFields(index, result)
                          }
                        />
                        <div>
                          {index === 0 ? (
                            <img
                              src={plusIcon}
                              height="15"
                              alt="logo"
                              onClick={() => onAddRemoveCustomeFields({ item })}
                            />
                          ) : null}
                          <img
                            src={deleteIcon}
                            height="15"
                            alt="logo"
                            onClick={() => onAddRemoveCustomeFields({ index })}
                          />
                        </div>
                      </div>
                    )
                  })}
                  <div className="save-cancel">
                    <CommonButton
                      content="Save"
                      btnClass="btn-blue"
                      onClick={() => onSubmitCustomFields()}
                    />
                    <CommonButtons
                      onClick={onCancel}
                      type="reset"
                      content="Cancel"
                      background="grey"
                    />
                  </div>
                </div>
              )}
            </Accordion.Content>
          </div>
        </Accordion>
      ) : null}
      {parseInt(widgetStyleData.template_type) !== parseInt(1) ? (
        <div></div>
      ) : (
        <div className="display-content">
          <p className="style-widget-title style-switch widget-sub-heading">
            Leave Message
          </p>
          <NodeToggle
            handleDataRef={e => changeWidgetToggle('leave_message', e)}
            dataToggle={leaveMessageDisplay[0]}
            activeDefault={widgetStyleData.leave_message}
          />
        </div>
      )}

      {parseInt(widgetStyleData.template_type) !== parseInt(1) ? (
        <div></div>
      ) : (
        <div>
          {widgetStyleData.leave_message ? (
            <Accordion className="holder-widget">
              <div className="accordion-content-wrapper">
                <Accordion.Title
                  active={activeIndexWidget === 3}
                  index={3}
                  onClick={e => handleClickWidget(e, 3)}
                  id="leaveMessage"
                >
                  <div className="widget-sub-heading">Leave me a Message</div>
                </Accordion.Title>
                <Accordion.Content active={activeIndexWidget === 3}>
                  {allowedTabs.leaveMessage && (
                    <div className="call-tab-text">
                      <h3 className="call-title widget-sub-heading">
                        Header text
                      </h3>
                      <CommonInput
                        placeholder="Leave your Message"
                        name="call-me-now"
                        type="text"
                        // defaultValue={widgetSetting.leave_message_tab_text}
                        value={
                          widgetStyleData.leave_message_tab_text
                            ? widgetStyleData.leave_message_tab_text
                            : null
                        }
                        onChange={e =>
                          changeWidget('leave_message_tab_text', e.target.value)
                        }
                      />
                    </div>
                  )}
                  <div className="display-content">
                    <p className="style-widget-title widget-sub-heading">
                      Name
                    </p>
                    <NodeToggle
                      handleDataRef={e =>
                        changeWidgetToggle('full_name_in_leave_message_tab', e)
                      }
                      dataToggle={leaveMessageName[0]}
                      activeDefault={
                        widgetStyleData.full_name_in_leave_message_tab
                      }
                    />
                  </div>
                  <div className="display-content">
                    <p className="style-widget-title widget-sub-heading">
                      Email
                    </p>
                    <NodeToggle
                      handleDataRef={e =>
                        changeWidgetToggle('email_in_leave_message_tab', e)
                      }
                      dataToggle={leaveMessageEmail[0]}
                      activeDefault={widgetStyleData.email_in_leave_message_tab}
                    />
                  </div>
                  <div className="display-content">
                    <p className="style-widget-title widget-sub-heading">
                      Team
                    </p>
                    <NodeToggle
                      handleDataRef={e =>
                        changeWidgetToggle('team_in_leave_message', e)
                      }
                      dataToggle={leaveMessageTeam[0]}
                      activeDefault={widgetStyleData.team_in_leave_message}
                    />
                  </div>
                  {/* <div className="display-content">
                    <p className="style-widget-title">Custom Fields</p>
                    <NodeToggle
                      handleDataRef={e =>
                        handleDataRef('leaveMessageCustomFieldsToggle', e)
                      }
                      dataToggle={leaveMessageCustomFields[0]}
                    />
                  </div> */}
                  {leaveMessageCustomFieldsToggle && (
                    <div className="custom-fields-wrapper">
                      {lstCustomFields.map((item, index) => {
                        return (
                          <div className="custom-fields-head" key={index}>
                            <CommonSelect
                              isGray
                              name="fieldType"
                              options={lstCustomFieldTypeOptions}
                              defaultValue={
                                item.fieldType || lstCustomFieldTypeOptions[1]
                              }
                              onChange={(e, result) =>
                                onUpdateCustomeFields(index, result)
                              }
                            />
                            <CommonInput
                              placeholder="Label"
                              name="label"
                              type="text"
                              onChange={(e, result) =>
                                onUpdateCustomeFields(index, result)
                              }
                            />
                            <CommonInput
                              placeholder="values comma separated"
                              name="value"
                              type="text"
                              onChange={(e, result) =>
                                onUpdateCustomeFields(index, result)
                              }
                            />
                            <NodeToggle
                              handleDataRef={value => {
                                handleQualification(
                                  index,
                                  'showQualificationButton',
                                  value
                                )
                              }}
                              dataToggle={{
                                callTitle: 'Enabled',
                                callId: `eQualification${index}`,
                                callRef: `showEQualificationButton${index}`
                              }}
                            />
                            <NodeToggle
                              handleDataRef={value => {
                                handleQualification(
                                  index,
                                  'showRequiredQualificationButton',
                                  value
                                )
                              }}
                              dataToggle={{
                                callTitle: 'Required',
                                callId: `rQualification${index}`,
                                callRef: `showRQualificationButton${index}`
                              }}
                            />
                            <CommonSelect
                              isGray
                              name="displayOnCallMeNowWidget"
                              options={widgetCustomFieldDisplayOnCallNow}
                              defaultValue={
                                item.displayOnCallMeNowWidget ||
                                lstCustomFieldTypeOptions[0]
                              }
                              onChange={(e, result) =>
                                onUpdateCustomeFields(index, result)
                              }
                            />
                            <div>
                              {index === 0 ? (
                                <img
                                  src={plusIcon}
                                  height="15"
                                  alt="logo"
                                  onClick={() =>
                                    onAddRemoveCustomeFields({ item })
                                  }
                                />
                              ) : null}
                              <img
                                src={deleteIcon}
                                height="15"
                                alt="logo"
                                onClick={() =>
                                  onAddRemoveCustomeFields({ index })
                                }
                              />
                            </div>
                          </div>
                        )
                      })}
                      <div className="save-cancel">
                        <CommonButton
                          content="Save"
                          btnClass="btn-blue"
                          onClick={() => onSubmitCustomFields()}
                        />
                        <CommonButtons
                          onClick={onCancel}
                          type="reset"
                          content="Cancel"
                          background="grey"
                        />
                      </div>
                    </div>
                  )}
                </Accordion.Content>
              </div>
            </Accordion>
          ) : null}
        </div>
      )}
      <div className="allowed-tabs">
        {/* <h3 className="call-title">Allowed Tabs</h3> */}
        <div className="allowed-tabs-checkboxs">
          {/* <CommonCheckbox
            id="clickToCall"
            text="Click to Call"
            checkboxStyle="modal-checkbox"
            name="checkbox"
            onChange={onClickAllowedTabs}
            checked={allowedTabs.clickToCall}
          />
          <CommonCheckbox
            id="callMeBack"
            text="Call Me Back"
            checkboxStyle="modal-checkbox"
            name="checkbox"
            onChange={onClickAllowedTabs}
            checked={allowedTabs.callMeBack}
          />
          <CommonCheckbox
            id="callMeLater"
            text="Call Me Later"
            checkboxStyle="modal-checkbox"
            name="checkbox"
            onChange={onClickAllowedTabs}
            checked={allowedTabs.callMeLater}
          />
          <CommonCheckbox
            id="leaveMessage"
            text="Leave Message"
            checkboxStyle="modal-checkbox"
            name="checkbox"
            onChange={onClickAllowedTabs}
            checked={allowedTabs.leaveMessage}
          /> */}
        </div>
      </div>
      <div className="popup-font popup-select">
        <h3 className="call-title widget-sub-heading">Popup Font</h3>

        <CommonSelect
          name="popupFont"
          className="popup-font-select"
          placeholder="Arial"
          options={popup_font}
          value={widgetStyleData.font}
          onChange={(e, data) => changeWidget('font', data.value)}
        />
      </div>
      <CommonColor
        widgetColor={widgetStyleData.submit_request_call_color}
        widgetName="Popup Button Color"
        onChange={color => changeWidget('submit_request_call_color', color)}
      />
      <CommonColor
        widgetColor={widgetStyleData.popup_timer_color}
        widgetName="Popup Timer Color"
        onChange={color => changeWidget('timerColor', color)}
      />

      <div className="legal-wrapper">
        <div className="legal-head">
          <div style={{ maxWidth: '45%' }}>
            <p className="style-widget-title widget-sub-heading">
              Social Proof
            </p>
            <p className="general-content-desc">
              Get real-time stats on how many call requests have been made
              today.{' '}
            </p>
          </div>
          <NodeToggle
            handleDataRef={e => changeWidgetToggle('social_proof', e)}
            dataToggle={socialWidget[0]}
            activeDefault={widgetStyleData.social_proof}
          />
        </div>

        <div className="legal-head">
          <p className="style-widget-title widget-sub-heading">Legal</p>
          <NodeToggle
            handleDataRef={e =>
              changeWidgetToggle('terms_and_conditions_status', e)
            }
            dataToggle={legalWidget[0]}
            activeDefault={widgetStyleData.terms_and_conditions_status}
          />
        </div>
        {widgetStyleData.terms_and_conditions_status ? (
          <div className="legal-content legal-dropdown">
            <div className="legal-col">
              <label> Configure Your Terms &amp; Conditions</label>
              <CommonSelect
                name="config"
                className="popup-font-select"
                placeholder="Text"
                value={
                  widgetStyleData.terms_type == '0'
                    ? 'Text'
                    : widgetStyleData.terms_type == '1'
                    ? 'URL'
                    : 'HTML'
                }
                options={termOption}
                onChange={(e, data) =>
                  changeWidget(
                    'terms_type',
                    `${
                      data.value === 'Text'
                        ? '0'
                        : data.value === 'URL'
                        ? '1'
                        : '2'
                    }`
                  )
                }
              />
              {/* <CommonSelect
          name="popupFont"
          className="popup-font-select"
          placeholder="Select Template"
          options={Options}
          value={
            widgetStyleData.template_type === parseInt(1)
              ? 'Classic'
              : widgetStyleData.template_type === parseInt(2)
              ? 'Smart'
              : 'Modern'
          }
          onChange={(p1, p2, p3) =>
            changeWidget(
              'template_type',
              p2.value === 'Classic' ? 1 : p2.value === 'Smart' ? 2 : 3
            )
          }
        /> */}
            </div>
            <div className="legal-col">
              <TextArea
                // defaultValue={widgetSetting.legalNote}
                value={widgetStyleData.terms_and_conditions}
                onChange={event =>
                  changeWidget('terms_and_conditions', event.target.value)
                }
              />
            </div>
          </div>
        ) : null}
        <div className="legal-head">
          <div style={{ maxWidth: '45%' }}>
            <p className="style-widget-title widget-sub-heading">
              Privacy Note
            </p>
            <p className="general-content-desc">
              Embed your privacy note on the widgety.{' '}
            </p>
          </div>

          <NodeToggle
            handleDataRef={e => {
              changeWidgetToggle('privacy_note_status', e)
            }}
            dataToggle={privacyWidget[0]}
            activeDefault={widgetStyleData.privacy_note_status}
          />
        </div>
        <label className="widget-sub-heading">
          Embed your privacy note on the widget
        </label>
        {widgetStyleData.privacy_note_status ? (
          <div className="legal-content private-text-area">
            <div className="legal-col">
              <TextArea
                placeholder="Your number will not be used for marketing purposes"
                // defaultValue={widgetSetting.privatePolicy}
                value={widgetStyleData.privacy_note}
                onChange={event =>
                  changeWidget('privacy_note', event.target.value)
                }
                // onChange={event =>
                //   changeWidget(widgetSetting.privatePolicy, event.target.value)
                // }
              />
            </div>
          </div>
        ) : null}
        {isInputChange ? (
          <div className="isInputChange">
            <CommonButton
              onClick={submitWidget}
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
        ) : null}
      </div>

      <Ref className="widget-style-mobile" innerRef={contextRef}>
        <Rail position="right" style={{ minHeight: '2000px' }}>
          <Sticky context={contextRef}>
            {parseInt(widgetStyleData.template_type) !== parseInt(1) ? (
              parseInt(widgetStyleData.template_type) === parseInt(3) ? (
                <div className="custom-widget-wrapper custom-widget-wrapper-smart modern-widget-container-main">
                  <div className="hor-row ">
                    <div className="modern-widget-container">
                      <div className="hor-row lime-modern-componey-logo-container">
                        <img src="https://app.limecall.com/storage/company_logo/605a6f3c0e7d9/z4FKg65lUgEr4DXda28YGVqFBiXc7A4MtrbUXBzA.png" />
                      </div>
                      <h3 style={{ fontFamily: widgetStyleData.font }}>
                        Hey 👋
                      </h3>
                      <div
                        className="hor-row lime-modern-greeting-body"
                        style={{ fontFamily: widgetStyleData.font }}
                      >
                        Need help? We're here!
                      </div>
                    </div>
                    {widgetStyleData.digital_call ? (
                      <div
                        className="hor-row lime-modern-selector-button"
                        style={{ fontFamily: widgetStyleData.font }}
                      >
                        <i
                          className="material-icons"
                          style={{
                            color: '#25ae88',
                            verticalAlign: 'middle',
                            paddingRight: '2px'
                          }}
                        >
                          phone_in_talk
                        </i>
                        Talk to us now
                      </div>
                    ) : null}
                    {widgetStyleData.call_now ||
                    widgetStyleData.call_me_later ? (
                      <div
                        style={{ fontFamily: widgetStyleData.font }}
                        className="hor-row lime-modern-selector-button"
                      >
                        <img
                          src={callMeBackRound}
                          style={{ width: '28px', marginRight: '5px' }}
                        />
                        Call me back
                      </div>
                    ) : null}

                    <div className="hor-row lime-modern-powered-section">
                      <div>
                        {widgetStyleData.social_proof ? (
                          <label
                            style={{
                              marginBottom: '.5rem;',
                              display: 'block',
                              fontFamily: widgetStyleData.font,
                              fontSize: '14px',
                              color: '#828181'
                            }}
                          >
                            You are already the 1st person who has requested a
                            call
                          </label>
                        ) : null}
                        {widgetStyleData.terms_and_conditions_status ? (
                          <label
                            style={{
                              marginBottom: '.5rem;',
                              display: 'block',
                              fontFamily: widgetStyleData.font,
                              fontSize: '14px',
                              color: '#828181'
                            }}
                          >
                            {widgetStyleData.terms_and_conditions}
                          </label>
                        ) : null}
                        {widgetStyleData.privacy_note_status ? (
                          <label
                            style={{
                              marginBottom: '.5rem;',
                              display: 'block',
                              fontFamily: widgetStyleData.font,
                              fontSize: '14px',
                              color: '#828181'
                            }}
                          >
                            {widgetStyleData.privacy_note}
                          </label>
                        ) : null}
                      </div>
                      We run on
                      <img
                        src="https://limecall.com/wp-content/uploads/2019/12/logo_blue.png"
                        style={{ marginLeft: '2px', height: '10px' }}
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="custom-widget-wrapper custom-widget-wrapper-smart">
                  {/* {widgetStyleTabs.clickToCall && allowedTabs.clickToCall && (
                    <div className="custom-widget-body">
                      <h4 style={{ color: widgetSetting.timerColor }}>
                        {clickToCallTabText}
                      </h4>
                      <div className="custom-widget-content">
                        {clickToCallNameToggle ? (
                          <div className="widget-input">Joe Doe</div>
                        ) : null}
                        {clickToCallEmailToggle ? (
                          <div className="widget-input">jon@email.com</div>
                        ) : null}
                        {clickToCallTeamToggle ? (
                          <div className="custom-widget-content">
                            <label>Select a team to connect with:</label>
                            <CommonSelect
                              name="config"
                              className="popup-font-select"
                              placeholder="Sales"
                              options={['Sales', 'Support']}
                            />
                          </div>
                        ) : null}
                        <div
                          className="call-me-btn"
                          style={{ backgroundColor: buttonColor }}
                        >
                          {clickToCallButtonText}
                        </div>
                      </div>
                    </div>
                  )} */}

                  {widgetStyleData.team_in_call_later_tab ||
                  widgetStyleData.email_in_call_later_tab ||
                  widgetStyleData.full_name_in_call_later_tab ? (
                    <div className="smart-widget-container-main">
                      {widgetStyleData.email_in_call_later_tab ||
                      widgetStyleData.full_name_in_call_later_tab ? (
                        <div className="hor-row info-text">
                          Let us know a few details about you
                        </div>
                      ) : null}
                      {widgetStyleData.email_in_call_later_tab ? (
                        <div className="hor-row input-container-main">
                          <input type="text" placeholder="Email*" />
                        </div>
                      ) : null}
                      {widgetStyleData.full_name_in_call_later_tab ? (
                        <div className="hor-row input-container-main">
                          <input type="text" placeholder="Name*" />
                        </div>
                      ) : null}
                      {widgetStyleData.email_in_call_later_tab ||
                      widgetStyleData.full_name_in_call_later_tab ? (
                        <div className="hor-row input-container-main">
                          <div className="submit-button">Start Call</div>
                        </div>
                      ) : null}
                      {widgetStyleData.team_in_call_later_tab ? (
                        <div className="hor-row team-container-main">
                          <div className="hor-row team-text-main">
                            I want to speak to:
                          </div>
                          <div className="team-button-container">Tech</div>
                          <div className="team-button-container">Default</div>
                        </div>
                      ) : null}

                      <div className="hor-row smart-widget-footer">
                        <a
                          href="http://limecall.com/pages/?utm_source=https://app.limecall.com"
                          target="_blank"
                          rel="noopener noreferrer"
                          class="poweredby-section"
                        >
                          <img
                            src="https://limecall.com/wp-content/uploads/2020/01/favicon.png"
                            alt=""
                            class="poweredby-icon"
                          />
                          We run on LimeCall
                        </a>
                      </div>
                    </div>
                  ) : null}
                  <div className="smart-widget-button-container">
                    <div className="button-connecting">
                      Connecting
                      <i class="material-icons smart-call-cut animated infinite pulse">
                        call_end
                      </i>
                    </div>
                  </div>

                  {/* {widgetStyleTabs.callMeLater && allowedTabs.callMeLater && (
                    <div className="custom-widget-body">
                      <h4 style={{ color: widgetSetting.timerColor }}>
                        {callMeLaterTabText}
                      </h4>
                      <div className="call-me-latter">
                        <CommonSelect
                          name="config"
                          className="popup-font-select"
                          placeholder="Text"
                          options={['Text']}
                        />
                        <CommonSelect
                          name="config"
                          className="popup-font-select"
                          placeholder="Text"
                          options={['Text']}
                        />
                      </div>
                      <div className="custom-widget-content">
                        <div className="widget-drop">
                          <div className="widget-drop-inner">
                            <img src={callMeBack} alt="" />
                            <span>+91</span>
                          </div>
                          <p>81234 58963</p>
                        </div>
                        {callMeLaterNameToggle ? (
                          <div className="widget-input">Joe Doe</div>
                        ) : null}
                        {callMeLaterEmailToggle ? (
                          <div className="widget-input">jon@email.com</div>
                        ) : null}
                        {callMeLaterTeamToggle ? (
                          <div className="custom-widget-content">
                            <label>Select a team to connect with:</label>
                            <CommonSelect
                              name="config"
                              className="popup-font-select"
                              placeholder="Sales"
                              options={['Sales', 'Support']}
                            />
                          </div>
                        ) : null}
                      </div>
                      <div
                        className="call-me-btn"
                        style={{ backgroundColor: widgetSetting.callColor }}
                      >
                        {callMeLaterButtonText}
                      </div>
                    </div>
                  )}

                  <div className="custom-widget-footer">
                    {widgetSetting.socialProof ? (
                      <label>
                        You are already the 1st person who has requested a  testing call
                      </label>
                    ) : null}
                    {legalToggle ? <label>{legalText}</label> : null}
                    {widgetSetting.privateStatus ? (
                      <label>{widgetSetting.privatePolicy}</label>
                    ) : null}
                  </div>
                 */}
                </div>
              )
            ) : (
              <div className="classic-widget-outer-container-main">
                <div>
                  <h1 className="classic-text" style={{ marginBottom: '30px' }}>
                    Classic Widget
                  </h1>
                </div>
                <div className="classic-widget-container-main">
                  <div className="custom-widget-wrapper hor-row">
                    <div className="custom-widget-header">
                      {widgetStyleData.digital_call ? (
                        <div
                          id="clickToCall"
                          onClick={e => onClickTableCategory(e)}
                          //style={{ display: 'block' }}
                        >
                          <p
                            id="clickToCall"
                            onClick={e => onClickTableCategory(e)}
                          >
                            <i
                              class="material-icons"
                              style={{ fontSize: '12px', paddingRight: '3px' }}
                            >
                              headset_mic
                            </i>
                            Web Call
                          </p>
                          <div className="close" id="clickToCall"></div>
                        </div>
                      ) : null}
                      {widgetStyleData.call_now ? (
                        <div>
                          <div
                            id="callMeBack"
                            onClick={e => onClickTableCategory(e)}
                          >
                            <img
                              src={callMeBack}
                              alt=""
                              id="callMeBack"
                              onClick={e => onClickTableCategory(e)}
                            />
                            <p
                              id="callMeBack"
                              onClick={e => onClickTableCategory(e)}
                            >
                              Call Me Back
                            </p>
                            <div className="close" id="callMeBack"></div>
                          </div>
                        </div>
                      ) : null}
                      {widgetStyleData.call_me_later ? (
                        <div>
                          {allowedTabs.callMeLater && (
                            <div
                              id="callMeLater"
                              onClick={e => onClickTableCategory(e)}
                            >
                              <img
                                src={callMeLetter}
                                alt=""
                                id="callMeLater"
                                onClick={e => onClickTableCategory(e)}
                              />
                              <p
                                id="callMeLater"
                                onClick={e => onClickTableCategory(e)}
                              >
                                Call Me Later
                              </p>
                              <div className="close" id="callMeLater"></div>
                            </div>
                          )}
                        </div>
                      ) : null}
                      {widgetStyleData.leave_message ? (
                        <div>
                          <div
                            id="leaveMessage"
                            // onClick={e => onClickTableCategory(e, widgetSetting)}
                          >
                            <p
                              id="leaveMessage"
                              onClick={e =>
                                onClickTableCategory(e, widgetSetting)
                              }
                            >
                              <i
                                class="material-icons"
                                style={{
                                  fontSize: '12px',
                                  paddingRight: '3px'
                                }}
                              >
                                message
                              </i>
                              Leave Message
                            </p>
                            <div
                              className="close"
                              id="leaveMessage"
                              onClick={() => styleRef.current.link}
                            >
                              {' '}
                            </div>
                          </div>
                        </div>
                      ) : null}
                    </div>
                  </div>
                  <div className="custom-widget-wrapper custom-widget-wrapper-head hor-row">
                    <div className="custom-widget-wrapper">
                      {widgetStyleTabs.clickToCall && allowedTabs.clickToCall && (
                        <>
                          <div className="custom-widget-body">
                            <h4
                              className="custom-widget-body-h1"
                              style={{ fontFamily: widgetStyleData.font }}
                            >
                              {widgetStyleData.digital_call_tab_text}
                            </h4>
                            <div className="custom-widget-content">
                              {widgetStyleData.email_in_digital_calls_tab ? (
                                <div className="widget-input">
                                  <i class="material-icons icon-class">email</i>
                                  Email
                                </div>
                              ) : null}
                              {widgetStyleData.full_name_in_digital_calls_tab ? (
                                <div className="widget-input">
                                  <i class="material-icons icon-class">
                                    account_circle
                                  </i>
                                  Name*
                                </div>
                              ) : null}
                              {widgetStyleData.team_in_digital_calls_tab ? (
                                <div
                                  className="custom-widget-content"
                                  style={{ marginTop: '10px' }}
                                >
                                  <CommonSelect
                                    name="config"
                                    className="popup-font-select"
                                    placeholder="I want to talk to"
                                    options={['Sales', 'Support']}
                                  />
                                </div>
                              ) : null}
                              <div
                                className="call-me-btn"
                                style={{
                                  backgroundColor:
                                    widgetStyleData.submit_request_call_color,
                                  borderRadius: '5px'
                                }}
                              >
                                {widgetStyleData.digital_call_button_text}
                              </div>
                            </div>
                          </div>
                          <div className="custom-widget-footer">
                            {widgetStyleData.social_proof ? (
                              <label>
                                You are already the 1st person who has requested
                                a call
                              </label>
                            ) : null}
                            {widgetStyleData.terms_and_conditions_status ? (
                              <label>
                                {widgetStyleData.terms_and_conditions}
                              </label>
                            ) : null}
                            {widgetStyleData.privacy_note_status ? (
                              <label>{widgetStyleData.privacy_note}</label>
                            ) : null}
                            <p className="lime-call-footer-text-container">
                              <a
                                href="http://limecall.com/pages/?utm_source=https://app.limecall.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                class="poweredby-section"
                              >
                                <img
                                  src="https://limecall.com/wp-content/uploads/2020/01/favicon.png"
                                  alt=""
                                  class="poweredby-icon"
                                />
                                We run on LimeCall
                              </a>
                            </p>
                          </div>
                        </>
                      )}
                    </div>
                    {widgetSetting.callBack ? (
                      <div className="custom-widget-wrapper custom-widget-wrapper-option">
                        {widgetStyleTabs.callMeBack && allowedTabs.callMeBack && (
                          <>
                            <div className="custom-widget-body">
                              <h4
                                className="custom-widget-body-h1"
                                style={{ fontFamily: widgetStyleData.font }}
                              >
                                {widgetStyleData.widget_text}
                              </h4>
                              <div className="custom-widget-content">
                                <div className="widget-drop">
                                  <div className="widget-drop-inner">
                                    <img src={callMeBack} alt="" />
                                    <span>+91</span>
                                  </div>
                                  <p>81234 58963</p>
                                </div>
                                {widgetStyleData.full_name_in_call_now_tab ? (
                                  <div className="widget-input">Joe Doe</div>
                                ) : null}
                                {widgetStyleData.email_in_call_now_tab ? (
                                  <div className="widget-input">
                                    jon@email.com
                                  </div>
                                ) : null}
                                {widgetStyleData.team_in_call_now_tab ? (
                                  <div
                                    className="custom-widget-content"
                                    style={{ marginTop: '10px' }}
                                  >
                                    <CommonSelect
                                      name="config"
                                      className="popup-font-select"
                                      placeholder="I want to talk to"
                                      options={['Sales', 'Support']}
                                    />
                                  </div>
                                ) : null}
                              </div>
                              <div
                                className="call-me-btn"
                                style={{
                                  backgroundColor:
                                    widgetStyleData.submit_request_call_color,
                                  borderRadius: '5px'
                                }}
                              >
                                {/* {widgetSetting.callBackButton
                                  ? widgetSetting.callBackButton
                                  : null} */}
                                {widgetStyleData.submit_request_call_text
                                  ? widgetStyleData.submit_request_call_text
                                  : null}
                              </div>
                            </div>
                            <div className="custom-widget-footer">
                              {widgetStyleData.social_proof ? (
                                <label>
                                  You are already the 1st person who has
                                  requested a call
                                </label>
                              ) : null}
                              {widgetStyleData.terms_and_conditions_status ? (
                                <label>
                                  {widgetStyleData.terms_and_conditions}
                                </label>
                              ) : null}
                              {widgetStyleData.privacy_note_status ? (
                                <label>{widgetStyleData.privacy_note}</label>
                              ) : null}
                            </div>
                          </>
                        )}
                      </div>
                    ) : null}
                    {widgetSetting.callLeter ? (
                      <div className="custom-widget-wrapper custom-widget-wrapper-option not">
                        {widgetStyleTabs.callMeLater &&
                          allowedTabs.callMeLater && (
                            <>
                              <div className="custom-widget-body">
                                <h4
                                  className="custom-widget-body-h1"
                                  style={{ fontFamily: widgetStyleData.font }}
                                >
                                  {widgetStyleData.schedule_call_tab_text}
                                </h4>
                                <div className="call-me-latter">
                                  <CommonSelect
                                    name="config"
                                    className="popup-font-select"
                                    placeholder="Date"
                                    options={['Date']}
                                  />
                                  <CommonSelect
                                    name="config"
                                    className="popup-font-select"
                                    placeholder="Time"
                                    options={['Time']}
                                  />
                                </div>
                                <div className="custom-widget-content">
                                  <div className="widget-drop">
                                    <div className="widget-drop-inner">
                                      <img src={callMeBack} alt="" />
                                      <span>+91</span>
                                    </div>
                                    <p>81234 58963</p>
                                  </div>
                                  {widgetStyleData.full_name_in_call_later_tab ? (
                                    <div className="widget-input">Joe Doe</div>
                                  ) : null}
                                  {widgetStyleData.email_in_call_later_tab ? (
                                    <div className="widget-input">
                                      jon@email.com
                                    </div>
                                  ) : null}
                                  {widgetStyleData.team_in_call_later_tab ? (
                                    <div
                                      className="custom-widget-content"
                                      style={{ marginTop: '10px' }}
                                    >
                                      <CommonSelect
                                        name="config"
                                        className="popup-font-select"
                                        placeholder="I want to talk to"
                                        options={['Sales', 'Support']}
                                      />
                                    </div>
                                  ) : null}
                                </div>
                                <div
                                  className="call-me-btn"
                                  style={{
                                    backgroundColor:
                                      widgetStyleData.submit_request_call_color,
                                    borderRadius: '5px'
                                  }}
                                >
                                  {widgetSetting.callLeterButton
                                    ? widgetSetting.callLeterButton
                                    : null}
                                </div>
                              </div>
                              <div className="custom-widget-footer">
                                {widgetStyleData.social_proof ? (
                                  <label>
                                    You are already the 1st person who has
                                    requested a call
                                  </label>
                                ) : null}
                                {widgetStyleData.terms_and_conditions_status ? (
                                  <label>
                                    {widgetStyleData.terms_and_conditions}
                                  </label>
                                ) : null}
                                {widgetStyleData.privacy_note_status ? (
                                  <label>{widgetStyleData.privacy_note}</label>
                                ) : null}
                              </div>
                            </>
                          )}
                      </div>
                    ) : null}
                    {/* {widgetSetting.leaveMessage ? ( */}
                    {true ? (
                      <div className="custom-widget-wrapper custom-widget-wrapper-option someting">
                        {widgetStyleTabs.leaveMessage &&
                          allowedTabs.leaveMessage && (
                            <>
                              <div className="custom-widget-body">
                                <h4
                                  className="custom-widget-body-h1"
                                  style={{ fontFamily: widgetStyleData.font }}
                                >
                                  {widgetStyleData.leave_message_tab_text}
                                </h4>
                                <div className="custom-widget-content">
                                  {<TextArea placeholder="Your message" />}

                                  {widgetStyleData.full_name_in_leave_message_tab ? (
                                    <div className="widget-input">Joe Doe</div>
                                  ) : null}
                                  {widgetStyleData.email_in_leave_message_tab ? (
                                    <div className="widget-input">
                                      jon@email.com
                                    </div>
                                  ) : null}
                                  {widgetStyleData.team_in_leave_message ? (
                                    <div
                                      className="custom-widget-content"
                                      style={{ marginTop: '10px' }}
                                    >
                                      <CommonSelect
                                        name="config"
                                        className="popup-font-select"
                                        placeholder="I want to talk to"
                                        options={['Sales', 'Support']}
                                      />
                                    </div>
                                  ) : null}
                                </div>
                                <div
                                  className="call-me-btn"
                                  style={{
                                    backgroundColor:
                                      widgetStyleData.submit_request_call_color,
                                    borderRadius: '5px'
                                  }}
                                >
                                  {leaveMessageButtonText
                                    ? leaveMessageButtonText
                                    : null}
                                </div>
                              </div>
                              <div className="custom-widget-footer">
                                {widgetStyleData.social_proof ? (
                                  <label>
                                    You are already the 1st person who has
                                    requested a call
                                  </label>
                                ) : null}
                                {widgetStyleData.terms_and_conditions_status ? (
                                  <label>
                                    {widgetStyleData.terms_and_conditions}
                                  </label>
                                ) : null}
                                {widgetStyleData.privacy_note_status ? (
                                  <label>{widgetStyleData.privacy_note}</label>
                                ) : null}
                              </div>
                            </>
                          )}
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
            )}
          </Sticky>
        </Rail>
      </Ref>
    </div>
  )
}
