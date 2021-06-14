/* eslint-disable no-fallthrough */
import React, { useEffect, useState } from 'react'
import { TextArea } from 'semantic-ui-react'

import NodeToggle from '../../common/NodeToggle'
import CommonInput from '../../common/CommonInput'
// import CommonButton from '../../common/CommonButtons';
import CommonSelect from '../../common/CommonSelect'

import CommonButtons from '../../common/CommonButtons'

import { CommonNotify } from '../../common/CommonNotify'

import axios from 'axios'
import iconStyle from '../../assets/images/Dashboard 2-08.png'
import { useAlert } from 'react-alert'
import SmsSettings from '../../components/settings/SmsSettings';

const apiToken = localStorage.getItem('access_token')

export const WidgetFollowUpTitle = () => (
  <div className="accordion-widget-holder">
    <div className="accordion-image-holder">
      <img src={iconStyle} alt="logo" />
    </div>{' '}
    <div className="accordion-title-holder">
      <h2 className="accordion-title"> Instant Response </h2>{' '}
      <p className="accordion-description">
        {' '}
        Send automatic text responses to anyone who contacts you.{' '}
      </p>{' '}
    </div>{' '}
  </div>
)

export const WidgetFollowUpContent = ({
  widget,
  handleDataRef,
  showFollowUpBrandName,
  thankYouToggle,
  missedCallToggle,
  scheduleCallMessageToggle,
  scheduleCallReminderMessageToggle,
  brandNameSMSToggle,
  onChangeFollowUpMessage,
  thankYouMessageText,
  missedCallMessageText,
  loading
}) => {
  const [brand, setBrand] = useState(false)
  const [brandDefault, setBrandDefault] = useState(false)
  const [brandMsg, setBrandMsg] = useState('')
  const [thankYou, setThankYou] = useState(false)
  const [thankYouDefault, setThankYouDefault] = useState(false)
  const [thankYouMsg, setThankYouMsg] = useState('')
  const [missedCall, setMissedCall] = useState(false)
  const [missedCallDefault, setMissedCallDefault] = useState(false)
  const [missedCallMsg, setMissedCallMsg] = useState('')
  const [scheduleCallR, setScheduleCallR] = useState('')
  const [scheduleCallRDefault, setScheduleCallRDefault] = useState('')
  const [scheduleCallRMsg, setScheduleCallRMsg] = useState(false)
  const [scheduleCall, setScheduleCall] = useState('')
  const [scheduleCallDefault, setScheduleCallDefault] = useState('')
  const [scheduleCallMsg, setScheduleCallMsg] = useState(false)
  const [dataLoaded, setDataLoaded] = useState(false)
  const alert = useAlert()
  const [isBrandMessage, setIsBrandMessage] = useState(false)
  const [isThankYouMsg, setIsThankYouMsg] = useState(false)
  const [isMissedCallMsg, setIsMissedCallMsg] = useState(false)
  const [isScheduleCallRMsg, setIsScheduleCallRMsg] = useState(false)
  const [isScheduleCallMsg, setIsScheduleCallMsg] = useState(false)
  const [wholeData, setWholeData] = useState(null)
  const [wholeApiData, setWholeApiData] = useState({})
  const [isSaveCancel, setIsSaveCancel] = useState(false)
  const [smsPlaceHolder, setSmsPlaceHolder] = useState([])
  const [activeTextBoxIndex, setActiveTextBoxIndex] = useState(null)
  const smsPlaceHolderData = () => {
    let head = {
      headers: {
        Authorization: 'Bearer ' + apiToken
      }
    }
    const url = `${process.env.REACT_APP_BASE_APP_URL}/api/v1/widget/sms/placeholders`
    axios
      .get(url, head)
      .then(res => {
        if (res.data.data) {
          setSmsPlaceHolder(res.data.data)
        }
      })
      .catch(error => {})
  }

  useEffect(() => {

   

    if (widget.id == '') return
    fetchData()
    smsPlaceHolderData()
  }, [widget])

  useEffect(() => {
    if (!dataLoaded) return

    // if (!brand) {
    //   setBrandMsg('')
    // }
    // if (!thankYou) {
    //   setThankYouMsg('')
    // }
    // if (!missedCall) {
    //   setThankYouMsg('')
    // }
    // if (!scheduleCall) {
    //   setScheduleCallMsg('')
    // }
    // if (!scheduleCallR) {
    //   setScheduleCallRMsg('')
    // }
  }, [brand, thankYou, missedCall, scheduleCall, scheduleCallR, dataLoaded])

  const updateFollowUp = e => {
    e.stopPropagation()
    loading(true)
    let head = {
      headers: {
        Authorization: 'Bearer ' + apiToken
      }
    }
    const url = `${process.env.REACT_APP_BASE_APP_URL}/api/v1/widget/update-messages`
    var data = { ...wholeData }
    // {
    //   id: widget.id,
    //   send_from_status: brand,
    //   messages_sent_from: brandMsg,
    //   missed_call_message_status: missedCall,
    //   missed_call_message: missedCallMsg,
    //   widget_thanks_message_status: thankYou,
    //   after_call_message: thankYouMsg,
    //   before_call_message_status: scheduleCallR,
    //   before_call_message: scheduleCallRMsg,
    //   start_call_message_status: scheduleCall,
    //   start_call_message: scheduleCallMsg
    // }

    axios
      .post(url, data, head)
      .then(res => {
        loading(false)
        if (res.data.message == 'Successfully') {
          CommonNotify('Setting Updated', 'success')
          setIsSaveCancel(false)
          fetchData()
        } else {
          CommonNotify('Cant Update Setting', 'error')
        }
      })
      .catch(er => {
        loading(false)
        CommonNotify('Cant Update Setting', 'error')      
      })
  }

  const setData = data => {
    const require = [
      'send_from_status',
      'messages_sent_from',
      'missed_call_message_status',
      'missed_call_message',
      'widget_thanks_message_status',
      'after_call_message',
      'before_call_message_status',
      'before_call_message',
      'start_call_message_status',
      'start_call_message'
    ]
    setThankYouDefault(data.thank_you_message_status ? true : false)
    let entries = Object.entries(data)
    entries.map((val, index) => {
      if (require.includes(val[0])) {
        switch (val[0]) {
          case 'send_from_status':
            setBrandDefault(val[1])
            break
          case 'messages_sent_from':
            setBrandMsg(val[1])
            break
          case 'missed_call_message_status':
            setMissedCallDefault(val[1])
            break
          case 'missed_call_message':
            setMissedCallMsg(val[1])
            break
          case 'widget_thanks_message_status':
            setThankYouDefault(val[1])
            break
          case 'after_call_message':
            setThankYouMsg(val[1])
            break
          case 'before_call_message_status':
            setScheduleCallRDefault(val[1])
            break
          case 'before_call_message':
            setScheduleCallRMsg(val[1])
            break
          case 'start_call_message_status':
            setScheduleCallDefault(val[1])
            break
          case 'start_call_message':
            setScheduleCallMsg(val[1])
            break
          default:
            break
        }
      }
    })

    setDataLoaded(true)
  }

  const fetchData = () => {
    loading(true)
    let head = {
      headers: {
        Authorization: 'Bearer ' + apiToken
      }
    }
    var url = `${process.env.REACT_APP_BASE_APP_URL}/api/v1/widget/${widget.id}`

    axios
      .get(url, head)
      .then(res => {
        loading(false)
        if (res.data.data) {
          setWholeData(res.data.data[0])
          setWholeApiData(res.data.data[0])
          setData(res.data.data[0])       
        }
      })
      .catch(er => {
        loading(false)
        CommonNotify('Cant Fetch Setting', 'error')        
      })
  }

  const handleToggleData = (val, key) => {
    const data = { ...wholeData }
    const localData = { ...wholeData }
    localData[key] = val
    data[key] = val ? 1 : 0
    setWholeData(localData)
    loading(true)
    let head = {
      headers: {
        Authorization: 'Bearer ' + apiToken
      }
    }
    const url = `${process.env.REACT_APP_BASE_APP_URL}/api/v1/widget/update-messages`
    axios
      .post(url, data, head)
      .then(res => {
        loading(false)
        if (res.data.message == 'Successfully') {
          CommonNotify('Setting Updated', 'success')
          fetchData()
        } else {
          CommonNotify('Cant Update Setting', 'error')
        }
      })
      .catch(er => {
        loading(false)
        CommonNotify('Cant Update Setting', 'error')     
      })
  }


  const onChangeInput = (val, index) => {

    //CommonNotify(`${index} length already reached 160 charecter`, 'warning')
      
   
    if(val.length > 160){
      CommonNotify(`${index} length already reached 160 charecter`, 'warning')
      return;
    }

    const data = { ...wholeData }
    // if (index === 'scroll_trigger_status') {
    //   data.behaviour[index] = val
    // } else {
    data[index] = val
    // }
    // data[index] = val   

    setWholeData(data)
    setIsSaveCancel(true)
    if (val) {
      setIsThankYouMsg(true)
    } else {
      setIsThankYouMsg(false)
    }
  }


  const onCancel = () => {
    setWholeData(wholeApiData)
    setIsSaveCancel(false)
  }
  const onClickTextArea = taxAreIndex => {
    setActiveTextBoxIndex(taxAreIndex)
  }
  const textChange = data => {

   

    if (activeTextBoxIndex || activeTextBoxIndex === 0) {
      let selectedTextBoxEle = document.querySelector(
        `.calls-text-area-${activeTextBoxIndex}`
      )
      let selectedTextBoxElementLen = selectedTextBoxEle.value.length
      selectedTextBoxEle.focus()
      if (typeof document.selection != 'undefined') {
        document.selection.createRange().text = data
      } else {
        selectedTextBoxEle.value =
          selectedTextBoxEle.value.substr(
            0,
            selectedTextBoxEle.selectionStart
          ) +
          `{${data}}` +
          selectedTextBoxEle.value.substring(
            selectedTextBoxEle.selectionStart,
            selectedTextBoxElementLen
          )
      }
      const wholeDataUpdate = { ...wholeData }
      let dataIndex = updateWidgetDataIndex(activeTextBoxIndex)
      wholeDataUpdate[dataIndex] = selectedTextBoxEle.value
      setWholeData(wholeDataUpdate)
    }
  }

  const updateWidgetDataIndex = data => {
    switch (data) {
      case 1:
        return 'after_call_message'
      // eslint-disable-next-line no-fallthrough
      case 2:
        return 'missed_call_message'
      case 3:
        return 'start_call_message'
      case 4:
        return 'cancel_call_text'
      case 5:
        return 'before_call_message'
      case 6:
        return 'before_call_message_agent'
      default:
        return null
    }
  }

  return (
  <>
    <div className='instant-widget-container-main'>
      <SmsSettings
        widget={widget}
        loading={loading}
      />
    </div>
      
    <div className="style-widget-wrapper"
      style={{display: 'none'}}>
      {/* <p className="style-widget-title"> Follow up SMS </p>{' '} */}
      <div className="follow-up follow-up-text">
        <div>
          <h3> Brand Name on the SMS </h3>{' '}
        </div>{' '}
        <NodeToggle
          handleDataRef={e => handleToggleData(e, 'send_from_status')}
          dataToggle={showFollowUpBrandName[0]}
          activeDefault={wholeData && wholeData.send_from_status ? true : false}
        />{' '}
      </div>{' '}
      {wholeData && wholeData.send_from_status ? (
        <div className="follow-up">
          <h3>Sender ID </h3>{' '}
          <CommonInput
            placeholder="Ex: Lime Caller"
            name="limeCaller"
            type="text"
            value={wholeData && wholeData.messages_sent_from}
            onChange={e =>  {              

              //onChangeInput(e.target.value, 'messages_sent_from')
              //setBrandMsg(e.target.value)
              if (e.target.value) {
                setIsBrandMessage(true)
              } else {
                setIsBrandMessage(false)
              }
            }}
          />{' '}
        </div>
      ) : null}
      <div className="follow-up">
        <div>
          <h3> Successful Calls </h3>{' '}
          <p>
            {' '}
            How do you want to thank the lead after the call is completed ?{' '}
          </p>{' '}
        </div>{' '}
        <NodeToggle
          handleDataRef={e =>
            handleToggleData(e, 'widget_thanks_message_status')
          }
          dataToggle={showFollowUpBrandName[2]}
          activeDefault={
            wholeData && wholeData.widget_thanks_message_status ? true : false
          }
        />{' '}
      </div>{' '}
      {wholeData && wholeData.widget_thanks_message_status ? (
        <div className="thank-you-toggle">
          <TextArea
            className={`calls-text-area-${1}`}
            onClick={() => onClickTextArea(1, 'after_call_message')}
            placeholder="Thanks for contacting us"
            value={wholeData && wholeData.after_call_message}
            onChange={e => {
              onChangeInput(e.target.value, 'after_call_message')
              // setThankYouMsg(e.target.value)
            }}
            maxLength="160"
          />{' '}
          {/* <CommonSelect
                      name="thankYouMessageText"
                      className="popup-font-select"
                      placeholder="Thanks for contacting us"
                      options={[
                        'Thanks for contacting us',
                        'Thanks for contacting us1',
                        'Thanks for contacting us2'
                      ]}
                      onChange={(e, result) => onChangeFollowUpMessage(result)}
                    /> */}{' '}
        </div>
      ) : null}
      <div className="follow-up">
        <div>
          <h3> Missed Call </h3>{' '}
          <p>
            if the lead missed your call, what message you want to send in the
            SMS ?
          </p>{' '}
        </div>{' '}
        <NodeToggle
          handleDataRef={e => handleToggleData(e, 'missed_call_message_status')}
          dataToggle={showFollowUpBrandName[3]}
          activeDefault={
            wholeData && wholeData.missed_call_message_status ? true : false
          }
        />{' '}
      </div>{' '}
      {wholeData && wholeData.missed_call_message_status ? (
        <div className="thank-you-toggle">
          <TextArea
            className={`calls-text-area-${2}`}
            onClick={() => onClickTextArea(2, 'missed_call_message')}
            placeholder="Missed call Message"
            value={wholeData && wholeData.missed_call_message}
            onChange={e => {
              onChangeInput(e.target.value, 'missed_call_message', 2)
              if (e.target.value) {
                setIsMissedCallMsg(true)
              } else {
                setIsMissedCallMsg(false)
              }
            }}
          />{' '}
          {/* <CommonSelect
                      name="missedCallMessageText"
                      className="popup-font-select"
                      placeholder="Missed call Message"
                      options={[
                        'Missed call Message',
                        'Missed call Message1',
                        'Missed call Message2',
                        'Missed call Message3'
                      ]}
                      onChange={(e, result) => onChangeFollowUpMessage(result)}
                    /> */}{' '}
        </div>
      ) : null}
      <div className="follow-up">
        <div>
          <h3> Scheduled Appointments </h3>{' '}
          <p> SMS to be sent before 15 Minutes a lead scheduled a call. </p>{' '}
        </div>{' '}
        <NodeToggle
          handleDataRef={e => handleToggleData(e, 'start_call_message_status')}
          dataToggle={showFollowUpBrandName[4]}
          activeDefault={
            wholeData && wholeData.start_call_message_status ? true : false
          }
        />{' '}
      </div>{' '}
      {wholeData && wholeData.start_call_message_status ? (
        <div className="thank-you-toggle">
          <TextArea
            className={`calls-text-area-${3}`}
            onClick={() => onClickTextArea(3, 'start_call_message')}
            placeholder="Schedule Call Reminder Message"
            onChange={e => {
              onChangeInput(e.target.value, 'start_call_message', 3)
              // setScheduleCallMsg(e.target.value)
              if (e.target.value) {
                setIsScheduleCallRMsg(true)
              } else {
                setIsScheduleCallRMsg(false)
              }
            }}
            value={wholeData && wholeData.start_call_message}
          />{' '}
          <div> </div>{' '}
          {/* <CommonInput
                      placeholder="Schedule Call Reminder Message"
                      name="scheduleCallReminderMessage"
                      type="text"
                    /> */}{' '}
        </div>
      ) : null}{' '}
      <div className="follow-up">
        <div>
          <h3>Cancelled Appointments 12 </h3>{' '}
          <p>
            if the lead cancelled your appointments, what message you want to
            send in the SMS ?
          </p>{' '}
        </div>{' '}
        <NodeToggle
          handleDataRef={e => handleToggleData(e, 'cancel_call_text_status')}
          dataToggle={showFollowUpBrandName[3]}
          activeDefault={
            wholeData && wholeData.cancel_call_text_status ? true : false
          }
        />{' '}
      </div>{' '}
      {wholeData && wholeData.cancel_call_text_status ? (
        <div className="thank-you-toggle">
          <TextArea
            className={`calls-text-area-${4}`}
            onClick={() => onClickTextArea(4, 'cancel_call_text')}
            placeholder="Schedule Call Reminder Message"
            onChange={e => {
              onChangeInput(e.target.value, 'cancel_call_text', 3)
              // setScheduleCallMsg(e.target.value)
              if (e.target.value) {
                setIsScheduleCallRMsg(true)
              } else {
                setIsScheduleCallRMsg(false)
              }
            }}
            value={wholeData && wholeData.cancel_call_text}
          />{' '}
          <div> </div>{' '}
          {/* <CommonInput
                      placeholder="Schedule Call Reminder Message"
                      name="scheduleCallReminderMessage"
                      type="text"
                    /> */}{' '}
        </div>
      ) : null}{' '}
      <div className="follow-up">
        <div>
          <h3> Call Reminder (Customer) </h3>{' '}
          <p> SMS to be sent after a lead has scheduled a call. </p>{' '}
        </div>{' '}
        <NodeToggle
          handleDataRef={e => handleToggleData(e, 'before_call_message_status')}
          dataToggle={showFollowUpBrandName[5]}
          activeDefault={
            wholeData && wholeData.before_call_message_status ? true : false
          }
        />{' '}
      </div>{' '}
      {wholeData && wholeData.before_call_message_status ? (
        <div className="thank-you-toggle">
          <TextArea
            className={`calls-text-area-${5}`}
            onClick={() => onClickTextArea(5, 'before_call_message')}
            placeholder="Schedule Call Message"
            onChange={e => {
              onChangeInput(e.target.value, 'before_call_message')
              // setScheduleCallRMsg(e.target.value)
              if (e.target.value) {
                setIsScheduleCallMsg(true)
              } else {
                setIsScheduleCallMsg(false)
              }
            }}
            value={wholeData && wholeData.before_call_message}
          />{' '}
          <div> </div>{' '}
        </div>
      ) : null}{' '}
      <div className="follow-up">
        <div>
          <h3>Call Reminder (Agent)</h3>{' '}
          <p> SMS to be sent after a lead has scheduled a call. </p>{' '}
        </div>{' '}
        <NodeToggle
          handleDataRef={e => handleToggleData(e, 'before_call_message_status')}
          dataToggle={showFollowUpBrandName[5]}
          activeDefault={
            wholeData && wholeData.before_call_message_agent_status
              ? true
              : false
          }
        />{' '}
      </div>{' '}
      {wholeData && wholeData.before_call_message_agent_status ? (
        <div className="thank-you-toggle">
          <TextArea
            className={`calls-text-area-${6}`}
            onClick={() => onClickTextArea(6, 'before_call_message_agent')}
            placeholder="Schedule Call Message"
            onChange={e => {
              onChangeInput(e.target.value, 'before_call_message_agent')
              // setScheduleCallRMsg(e.target.value)
              if (e.target.value) {
                setIsScheduleCallMsg(true)
              } else {
                setIsScheduleCallMsg(false)
              }
            }}
            value={wholeData && wholeData.before_call_message_agent}
          />{' '}
          <div> </div>{' '}
        </div>
      ) : null}{' '}
      <p className="subtext default-text">
        - Click to insert placeholders for your call rep's details -
      </p>
      <br/>
      <div className="btn-group sms-button-followUp">
        {/* {smsPlaceHolder.map(item => (
          <CommonButtons
            btnClass="btn-sms"
            type="submit"
            content={item}
            onClick={() => textChange(item)}
            background="blue"
          />
        ))} */}
      </div>
      {/* <NodeToggle handleDataRef={handleDataRef} dataToggle={showFollowUpBrandName[1]} /> */}{' '}
      {/* <CommonButton
              content="Record"
              btnClass="btn-blue"
            />
            <CommonButton
              content="Stop"
              btnClass="btn-blue"
            />
            <CommonButton
              content="Save"
              btnClass="btn-blue"
            /> */}{' '}
      { wholeData !== wholeApiData && (
        <>
          <CommonButtons
            style={{
              marginTop: '30px'
            }}
            onClick={e => updateFollowUp(e)}
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
        </>
      )}
    </div>
  
  </>
  )
}
