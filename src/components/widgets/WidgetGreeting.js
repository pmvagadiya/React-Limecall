import React, { useState, useEffect, useCallback } from 'react'
import _ from 'lodash'
import Dropzone from 'react-dropzone-uploader'

import NodeToggle from '../../common/NodeToggle'
import CommonGroupButton from '../../common/CommonGroupButton2'
import CustomizeGroupButton from '../../common/CustomizeGroupButton2'
import CommonColor from '../../common/CommonColor'
import CommonInput from '../../common/CommonInput'
import CommonButton from '../../common/CommonButtons'

import iconStyle from '../../assets/images/Dashboard 2-07.png'
import widgetBubble from '../../assets/images/phone.svg'
import axios from 'axios'
import { CommonNotify } from '../../common/CommonNotify'
import CommonButtons from '../../common/CommonButtons'
import CommonTextArea from '../../common/CommonTextArea'
import CommonSelect from '../../common/CommonSelect'
import { Icon } from 'semantic-ui-react'

const widgetDefaultSetting = {
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

export const GreetingStyleTitle = () => (
  <div className="accordion-widget-holder">
    <div className="accordion-image-holder">
      <img src={iconStyle} alt="logo" />
    </div>
    <div className="accordion-title-holder">
      <h2 className="accordion-title">Greetings</h2>
      <p className="accordion-description">
      Customize your default greetings that your visitors will see on your widget
      </p>
    </div>
  </div>
)

export const WidgetGreetingStyleContent = ({
  widget,
  showShadowWidgetToggle,
  widgetShadow,
  widgetShape,
  loading,
  onClick
}) => {
  const [widgetBubbleColor, setWidgetBubbleColor] = useState('#2b2b2c')
  const [widgetAllSetting, setWidgetALlSetting] = useState(null)
  const [widgetSetting, setWidgetSetting] = useState(widgetDefaultSetting)
  const [bubbleSetting, setBubbleSetting] = useState(bubbleDefaultSetting)
  const [bubbleSettingData, setBubbleSettingData] = useState({})
  const [bubbleApiSettingData, setBubbleApiSettingData] = useState({})
  const [apiLoaded, setApiLoaded] = useState(false)
  const [isInputChange, setIsInputChange] = useState(false)
  const [logo, setLogo] = useState(null)
  const [getLogoApi, setGetLogoApi] = useState(null)

  const fetchSetting = useCallback(() => {
    loading(true)
    let head = {
      headers: {
        Authorization: 'Bearer ' + apiToken
      }
    }
    // var url = `${process.env.REACT_APP_BASE_APP_URL}/api/v1/widget/widgets`
    var url = `${process.env.REACT_APP_BASE_APP_URL}/api/v1/widget/${widget.id}`

    axios
      .get(url, head)
      .then(res => {
        loading(false)
        if (res.data.data) {

          
          // setWidgetALlSetting(res.data.data[0])
          // setWidget(res.data.data[0])
          // setBubble(res.data.data[0])
          let widget = res.data.data[0];
          const curl = `${process.env.REACT_APP_BASE_APP_URL}/api/v1/widget/${widget.id}`
          axios
            .get(curl, head)
            .then(res => {
              if(res.data.data.length > 0){
                let tmpData = res.data.data[0];
                if(tmpData.bubble_position === "top_right"){
                  tmpData.bubble_position  = 'btnTopRight';
                }else if(tmpData.bubble_position === "top_left"){
                  tmpData.bubble_position  = 'btnTopLeft';
                }else if(tmpData.bubble_position === "bottom_right"){
                  tmpData.bubble_position  = 'btnBottomRight';
                }else if(tmpData.bubble_position === "bottom_left"){
                  tmpData.bubble_position  = 'btnBottomLeft';
                }
                setBubbleSettingData(tmpData);
              }
              // setBubbleSettingData(res.data.data[0])
             
              setBubbleApiSettingData(res.data.data[0])
              setApiLoaded(true)
            })
            .catch(er => {              
              // console.info(er)
            })
        }
      })
      .catch(er => {
        loading(false)
        const errors = { ...er }       
        if (errors.response.data.errors) {
          CommonNotify(errors.response.data.errors[0])
        }
        CommonNotify('Some thing went wrong', 'error')
      })
  }, [loading])
  const getCompany = () => {
    const apiToken = localStorage.getItem('access_token')
    loading(true)
    let head = {
      headers: {
        Authorization: 'Bearer ' + apiToken
      }
    }
    const url = `${process.env.REACT_APP_BASE_APP_URL}/api/v1/user/profile`

    axios
      .get(url, head)
      .then(res => {
        if (res.data.data) {
          setLogo(res.data.data.company.company_logo)
          setGetLogoApi(res.data.data.company.company_logo)
        }
      })
      .catch(er => {})
  }
  useEffect(() => {
    fetchSetting()
    // getCompany()
    setApiLoaded(true)
  }, [fetchSetting])

  // useEffect(() => {
  //   if (bubbleSetting.position == '') return
  //   setApiLoaded(true)
  // }, [bubbleSetting.position])

  // eslint-disable-next-line react-hooks/exhaustive-deps

  const updateBubbleSettingGroup = (val, key, name) => {
    // let bubbleSetting = { ...bubbleSetting }
    updateBubbleSetting(key, name)
  }

  const saveBubbleSetting = () => {
    let data = { ...bubbleSettingData }
    // data.circle_color = bubbleSetting.color
    // data.bubble_template = bubbleSetting.shadow == true ? '2' : '1'
    // data.bubble_text = bubbleSetting.textOnline
    // data.bubble_offline_text = bubbleSetting.textOffline
    // data.shape = bubbleSetting.shape
    // data.bubble_position = bubbleSetting.position

    if (data.bubble_position === 'btnBottomRight') {
      data.bubble_position = 'bottom_right'
    } else if (data.bubble_position === 'btnBottomLeft') {
      data.bubble_position = 'bottom_left'
    } else if (data.bubble_position === 'btnTopLeft') {
      data.bubble_position = 'top_left'
    } else {
      data.bubble_position = 'top_right'
    }

    if (data.shape==='btnRight') {
      data.shape = 'square'
    } else if(data.shape==='btnLeft'){
      data.shape = 'default'
    }

    postSetting(data)
  }

  const postSetting = data => {
    loading(true)
    let head = {
      headers: {
        Authorization: 'Bearer ' + apiToken
      }
    }
    const url = `${process.env.REACT_APP_BASE_APP_URL}/api/v1/widget/set-customizations`
    axios
      .post(url, data, head)
      .then(res => {
        loading(false)
        if (res.data.message[0] == 'Successfully') {
          CommonNotify('Updated Widget Setting', 'success')
          setIsInputChange(false)
          if (logo) {
            onUploadLogo(logo)
          }
        }
      })
      .catch(error => {
        loading(false)
        CommonNotify('Cant Updated Widget Setting', 'error')
      })
  }

  const setWidget = data => {
    let widgetSettings = { ...widgetSetting }
    widgetSettings.template = 'Modern'
    if (data.template_type == 2) {
      widgetSettings.template = 'Smart'
    } else if (data.template_type == 1) {
      widgetSettings.template = 'Classic'
    }

    widgetSettings.classicType =
      data.classic_template_design_type == 1 ? false : true
    widgetSettings.font = data.font

    widgetSettings.timerColor = data.popup_timer_color
    widgetSettings.callColor = data.submit_request_call_color

    widgetSettings.socialProof = data.social_proof
    widgetSettings.legalNote = data.terms_and_conditions
    widgetSettings.legalType = data.terms_type
    widgetSettings.legalStatus = data.terms_and_conditions_status
    widgetSettings.privateStatus = data.privacy_note_status
    widgetSettings.privatePolicy = data.privacy_note

    if (widgetSettings.legalType == 0) {
      widgetSettings.legalType = 'Text'
    } else if (widgetSettings.legalType == 1) {
      widgetSettings.legalType = 'URL'
    } else {
      widgetSettings.legalType = 'HTML'
    }

    widgetSettings.webCall = data.digital_call
    widgetSettings.callLeter = data.call_me_later
    widgetSettings.callBack = data.call_now
    widgetSettings.leaveMessage = data.leave_message

    widgetSettings.webCallHeader = data.digital_call_tab_text
    widgetSettings.webCallButton = data.digital_call_button_text
    widgetSettings.webCallName = data.full_name_in_digital_calls_tab
    widgetSettings.webCallEmail = data.email_in_digital_calls_tab
    widgetSettings.webCallTeam = data.team_in_digital_calls_tab

    widgetSettings.callLeterHeader = data.schedule_call_tab_text
    widgetSettings.callLeterButton = data.offline_schedule_call_message
    widgetSettings.callLeterName = data.full_name_in_call_later_tab

    widgetSettings.callLeterEmail = data.email_in_call_later_tab
    widgetSettings.callLeterTeam = data.team_in_call_later_tab

    widgetSettings.callBackHeader = data.widget_text
    widgetSettings.callBackButton = data.submit_request_call_text
    widgetSettings.callBackName = data.full_name_in_call_now_tab
    widgetSettings.callBackEmail = data.email_in_call_now_tab
    widgetSettings.callBackTeam = data.team_in_call_now_tab

    widgetSettings.leaveMessageHeader = data.leave_message_tab_text
    widgetSettings.leaveMessageName = data.full_name_in_leave_message_tab
    widgetSettings.leaveMessageEmail = data.email_in_leave_message_tab
    widgetSettings.leaveMessageTeam = data.team_in_leave_message

    setWidgetSetting(widgetSettings)
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

    if (data.shape === 'square' || data.shape==='btnRight') {
      data.shape = 'square'
    } else if(data.shape === 'default' || data.shape==='btnLeft'){
      data.shape = 'default'
    }

    bubbleSetting1.position = data.bubble_position
    bubbleSetting1.shape = data.shape
    setBubbleSetting(bubbleSetting1)
  }

  const updateBubbleSetting = (index, val) => {
  
    let bSetting = {
      ...bubbleSetting
    }
    let bSettingData = {
      ...bubbleSettingData
    }
    bSettingData[index] = val
    bSetting[index] = val
    setBubbleSettingData(bSettingData)
    setBubbleSetting(bSetting)


    // bSetting[index] = val
    const check = _.isEqual(bSettingData, bubbleSettingData)
    if (check === false) {
      setIsInputChange(true)
    }
    // if (val) {
    //   setIsInputChange(true)
    // }
  }

  const onUploadLogo = file => {
    if (getLogoApi === logo) {
      return
    }
    loading(true)
    const head = {
      headers: {
        Authorization: 'Bearer ' + apiToken
      }
    }
    var url = `${process.env.REACT_APP_BASE_APP_URL}/api/v1/widget/upload-widget-icon`
    const form = new FormData()
    form.append('widget_image', file)
    form.append('widget_id', widget.id)
    axios
      .post(url, form, head)
      .then(res => {
        CommonNotify('Upload successfully', 'success')
        loading(false)
      })
      .catch(err => {
        const errors = { ...err }
        if (errors.response.data.errors) {
          CommonNotify(errors.response.data.errors[0])
          loading(false)
        } else {
          CommonNotify('Some thing went wrong')
          loading(false)
        }
      })
  }

  const onUpload = ({ meta, file }, status) => {
    setIsInputChange(true)
    setLogo(file)
  }
  const onCancel = () => {
    setBubbleSettingData(bubbleApiSettingData)
    setIsInputChange(false)
  }
  return (
    <>
      {apiLoaded && (
        <>
          <div className="style-widget-wrapper accordion-widget greetings_wrapper">
            <CommonColor
              widgetColor={bubbleSettingData.circle_color}
              widgetName="Button Colour"
              onChange={color => updateBubbleSetting('circle_color', color)}
            />      


            <div className="widget-bubble-wrapper">
              <p className="style-widget-title widget-sub-heading">Greetings</p>
              <div className="call-tab-text">
                <div className="input">
                  <span className="sec-color" style={{color: "#c1c1c1"}}>Online Greetings</span>
                  <CommonTextArea
                    placeholder="Hello ! Would you like us to call you now?"
                    name="call-me-now"
                    type="text"
                    value={bubbleSettingData.bubble_text}
                    onChange={event =>
                      updateBubbleSetting('bubble_text', event.target.value)
                    }
                    style={{ width: '200%' }}
                  />
                </div>
              </div>
              <div className="call-tab-text">
                <div className="input">
                  <span className="sec-color" style={{color: "#c1c1c1"}}>Offline Greetings</span>
                  <CommonTextArea
                    placeholder="Sorry, we are unavailable now ! Leave a message"
                    name="call-me-now"
                    type="text"
                    value={bubbleSettingData.bubble_offline_text}
                    onChange={event =>
                      updateBubbleSetting(
                        'bubble_offline_text',
                        event.target.value
                      )
                    }
                  />
                </div>
              </div>

              <div className="customize-grp-btn-wrap">
                <CustomizeGroupButton
                  title="Position On Page"
                  identity="bubble_position"
                  active={bubbleSettingData.bubble_position}
                  topLeftBtn="Top Left"
                  topRightBtn="Top Right"
                  bottomLeftBtn="Bottom Left"
                  bottomRightBtn="Bottom Right"
                  handleGroupBtnData={updateBubbleSettingGroup}
                />
              </div>
              {/* <CommonColor
                widgetName="Greetings Label Color"
                onChange={color => setWidgetBubbleColor(color)}
                widgetColor={widgetBubbleColor}
              /> */}             
              {(bubbleSettingData.shape)?
              <div className="button-shape">
                <CommonGroupButton
                  title="Button Shape"
                  identity="shape"
                  active={bubbleSettingData.shape}
                  leftBtn="Default(Round)"
                  rightBtn="Square"
                  handleGroupBtnData={updateBubbleSettingGroup}
                />
              </div>
              :null}
              
              <div className="template-Select">
                <p className='widget-sub-heading'>Bubble template</p>
                <CommonSelect
                  name="popupFont"
                  className="popup-font-select"
                  placeholder="Select Template"
                  options={['Template 1', 'Template 2']}
                  value={
                    bubbleSettingData.bubble_template === parseInt(1)
                      ? 'Template 1'
                      : 'Template 2'
                  }
                  onChange={(event, data) =>
                    updateBubbleSetting(
                      'bubble_template',
                      data.value === 'Template 1' ? 1 : 2
                    )
                  }
                />
              </div>

              


              {/* <div className="upload-custom-icon">
                <p>Upload custom icon</p>
                <Dropzone
                  canCancel={true}
                  canRemove={true}
                  canRestart={true}
                  // inputContent={<img src={`${this.state.data.companyLogo}`} />}
                  inputContent={
                    logo ? (
                      <img
                        className="companyLogoImage"
                        src={`${process.env.REACT_APP_BASE_APP_URL}/storage${logo}`}
                        alt=""
                      />
                    ) : (
                      <Icon name="upload" />
                    )
                  }
                  onChangeStatus={e=> onUpload(e)}
                  accept="image/*"
                />
              </div> */}
              {isInputChange ? (
                <div className="saveCancelButton">
                  <CommonButton
                    onClick={saveBubbleSetting}
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
            <div className="widget-bubble1 widget-bubble-wrapper">
              
              <div className="greetings_side_popup" style={{position:"relative"}}>
              
              { bubbleSettingData.bubble_template === parseInt(1) ? ( <div
                    className={`widget-bubble ${bubbleSettingData.bubble_position}`}
                  >
                    <div
                      className={`bubble-sec ${bubbleSettingData.shape}`}
                      style={{
                        backgroundColor: bubbleSettingData.circle_color,
                        // borderRadius: widgetShape === 'Square' && '4%',
                        boxShadow:
                          bubbleSetting.shadow &&
                          '0px 0px 8px 0px rgba(0,0,0,0.50)'
                      }}
                    >
                      <img src={widgetBubble} alt="" />
                    </div>
                    <div
                      className="bubble-text"
                      style={{ backgroundColor: widgetBubbleColor }}
                    >
                      {bubbleSettingData.bubble_text}
                    </div>
                  </div>)
                  :( <div style={ (bubbleSettingData.bubble_position === 'btnBottomRight' || bubbleSettingData.bubble_position === 'btnTopRight') ? {backgroundColor: bubbleSettingData.circle_color} : {left: "-190px", backgroundColor: bubbleSettingData.circle_color}} className={'template-2-button-container'  + ((bubbleSettingData.bubble_position === 'btnTopRight' || bubbleSettingData.bubble_position === 'btnBottomRight') ? ' template-2-button-right-side-container': '')}>
                    {bubbleSettingData.bubble_text}
                  </div>)
                  }           
               
              
              </div>

              {/* <div className="widget-bubble">
                  <div
                    className="bubble-sec"
                    style={{
                      backgroundColor: bubbleSetting.color,
                      borderRadius: widgetShape === 'Square' && '4%',
                      boxShadow:
                        bubbleSetting.shadow &&
                        '0px 0px 8px 0px rgba(0,0,0,0.50)'
                    }}
                  >
                    <img src={widgetBubble} alt="" />
                  </div>
                </div> */}
              {/* <div>
                <div className="greetings-text">
                  <div className="greetings_detail">
                    <span className="img-container">img</span>
                    <span>Sathish</span>
                  </div>
                  <p
                    style={{
                      margin: '10px 0px 10px 20px',
                      textAlign: 'left'
                    }}
                  >
                    How Can We help you?
                  </p>
                  <CommonTextArea
                    placeholder="How Can I help you?"
                    name="call-me-now"
                    type="text"
                    value={bubbleSetting.textOnline}
                    onChange={event =>
                      updateBubbleSetting('textOnline', event.target.value)
                    }
                    rows={2}
                  />
                </div>
                <div className="greetings-text">
                  <div className="greetings_detail">
                    <span className="img-container">img</span>
                    <span>Sathish</span>
                  </div>
                  <p
                    style={{
                      margin: '10px 0px 10px 20px',
                      textAlign: 'left'
                    }}
                  >
                    How Can We help you?
                  </p>
                  <CommonTextArea
                    placeholder="How Can I help you?"
                    name="call-me-now"
                    type="text"
                    value={bubbleSetting.textOffline}
                    onChange={event =>
                      updateBubbleSetting('textOffline', event.target.value)
                    }
                    rows={2}
                  />
                </div>
              </div> */}
            </div>
          </div>
        </>
      )}
    </>
  )
}
