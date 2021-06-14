import React, { Component } from 'react'

import Input from '../../common/CommonInput'
import SingleTable from '../../common/CommonSingleTable'
import CommonButtons from '../../common/CommonButtons'
import { CommonNotify } from '../../common/CommonNotify'
import NodeToggle from '../../common/NodeToggle'

import axios from 'axios'
import { widgetBehaviour } from '../../lib/WidgetData'

const apiToken = localStorage.getItem('access_token')
class SmsSettings extends Component {
  state = {
    from: '',
    tableData: [
      {
        success: 'Successful Calls',
        from: '',
        toggleData: {
          callTitle: '',
          callDesc: '',
          callId: 'widget_thanks_message_status',
          callRef: 'widget_thanks_message_status',
          toggleName: 'widget_thanks_message_status'
        }
      },
      {
        success: 'Missed Call',
        from: '',
        toggleData: {
          callTitle: '',
          callDesc: '',
          callId: 'missed_call_message_status',
          callRef: 'missed_call_message_status',
          toggleName: 'missed_call_message_status'
        }
      },
      {
        success: 'Scheduled Appointments',
        from: '',
        toggleData: {
          callTitle: '',
          callDesc: '',
          callId: 'start_call_message_status',
          callRef: 'start_call_message_status',
          toggleName: 'start_call_message_status'
        }
      },
      {
        success: 'Cancelled Appointments',
        from: '',
        toggleData: {
          callTitle: '',
          callDesc: '',
          callId: 'cancel_call_text_status',
          callRef: 'cancel_call_text_status',
          toggleName: 'cancel_call_text_status'
        }
      },
      {
        success: 'Call Reminder (Customer)',
        from: '',
        toggleData: {
          callTitle: '',
          callDesc: '',
          callId: 'before_call_message_status',
          callRef: 'before_call_message_status',
          toggleName: 'before_call_message_status'
        }
      },
      {
        success: 'Call Reminder (Agent)',
        from: '',
        toggleData: {
          callTitle: '',
          callDesc: '',
          callId: 'before_call_message_agent_status',
          callRef: 'before_call_message_agent_status',
          toggleName: 'before_call_message_agent_status'
        }
      }
      // {
      //   success: 'Missed Meeting',
      //   from: '',
      //   toggleData: {
      //     callTitle: '',
      //     callDesc: '',
      //     callId: 'missedMeeting',
      //     callRef: 'missedMeeting',
      //     toggleName: 'missed_call_message_status'
      //   }
      // }
    ],
    smsPlaceHolder: [],
    smsConfig: false,
    buttonData: '',
    widgetPayload: null,
    activeTextBoxIndex: null,
    toggleData: {},
    isChangeText: false,
    prevTable: []
  }

  toggleConfig = async val => {


    this.setState({ smsConfig: val })
    let head = {
      headers: {
        Authorization: 'Bearer ' + apiToken
      }
    }
    const data = { ...this.state.widgetPayload }
    data['send_from_status'] = val
    const url = `${process.env.REACT_APP_BASE_APP_URL}/api/v1/widget/update-messages`
    axios
      .post(url, data, head)
      .then(res => {
        CommonNotify('Success', 'success')
        
      })
      .catch(error => {
        //console.log({...error})
      })
    // if (!val) {
    //   this.updateFollowUp(val)
    // }
  }

  componentDidMount = () => {
    this.fetchData()
    this.smsPlaceHolderData()
    // this.togglerInitialState()
  }

  smsPlaceHolderData = () => {
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
          this.setState({ smsPlaceHolder: res.data.data })
        }
      })
      .catch(error => {})
  }
  // togglerInitialState = () => {
  //   let head = {
  //     headers: {
  //       Authorization: 'Bearer ' + apiToken
  //     }
  //   }
  //   const url = `${process.env.REACT_APP_BASE_APP_URL}/api/v1/widget/${this.props.widget.id}/messages`
  //   axios
  //     .get(url, head)
  //     .then(res => {
  //       if (res.data.data) {
  //         console.log(res.data.data,'smsConfig')
  //         this.setState({
  //           smsConfig: res.data.data.send_from_id_status ? true : false
  //         })
  //       }
  //     })
  //     .catch(error => {})
  // }
  fetchData = () => {
    this.props.loading(true)
    let head = {
      headers: {
        Authorization: 'Bearer ' + apiToken
      }
    }
    var url = `${process.env.REACT_APP_BASE_APP_URL}/api/v1/widget/widgets`

    axios
      .get(url, head)
      .then(res => {
        this.props.loading(false)
        if (res.data.data) {
          let tableData = [...this.state.tableData]
          tableData[0].from = !res.data.data[0].after_call_message
            ? ''
            : res.data.data[0].after_call_message
          tableData[1].from = !res.data.data[0].missed_call_message
            ? ''
            : res.data.data[0].missed_call_message

          tableData[2].from = !res.data.data[0].start_call_message
            ? ''
            : res.data.data[0].start_call_message
          tableData[3].from = !res.data.data[0].cancel_call_text
            ? ''
            : res.data.data[0].cancel_call_text
          tableData[4].from = !res.data.data[0].before_call_message
            ? ''
            : res.data.data[0].before_call_message
          tableData[5].from = !res.data.data[0].before_call_message_agent
            ? ''
            : res.data.data[0].before_call_message_agent
          // tableData[6].from = !res.data.data[0].missed_call_message
          //   ? ''
          //   : res.data.data[0].missed_call_message
          this.setState({
            tableData: tableData,
            prevTable: JSON.parse(JSON.stringify(tableData)),
            from: res.data.data[0].messages_sent_from,
            prevFrom: res.data.data[0].messages_sent_from,
            smsConfig: res.data.data[0].send_from_status,
            prevSmsConfig: res.data.data[0].send_from_status,
            widgetPayload: res.data.data[0],
            prevWidgetPayload: res.data.data[0],
            toggleData: res.data.data[0],
            prevToggleData: res.data.data[0],
            isChangeText : false
          })
        }
      })
      .catch(er => {
        this.props.loading(false)
        CommonNotify('Cant Fetch Setting', 'error')
      })
  }

  changeTable = (val, i) => {

    if(val.length > 160){
      return CommonNotify(`Textbox length Exceed 160 charater limit`);
    }

    this.setState({ isChangeText: true })
    let tableData = [...this.state.tableData]
    tableData[i].from = val
    this.setState({ tableData })
  }

  updateFollowUp = val => {
    if (!this.state.from) {
      return CommonNotify('Sender id is required')
    }
    if (this.state.from.length < 4 || this.state.from.length > 11) {
      return CommonNotify(
        'Sender Id should be in between 4 - 11 characters only.',
        'error'
      )
    }
    if (this.state.tableData[0].from.length > 160) {
      return CommonNotify(
        'Successful call message should not be more than 160 characters.',
        'error'
      )
    }
    if (this.state.tableData[1].from.length > 160) {
      return CommonNotify(
        'Unsuccessful call message should not be more than 180 characters.',
        'error'
      )
    }
    this.props.loading(true)
    let head = {
      headers: {
        Authorization: 'Bearer ' + apiToken
      }
    }
    const url = `${process.env.REACT_APP_BASE_APP_URL}/api/v1/widget/${this.props.widget.id}/messages`

    const changeValue = val ? 1 : 0
    var data = {
      messages_sent_from: this.state.from,
      after_call_message: this.state.tableData[0].from,
      missed_call_message: this.state.tableData[1].from,
      before_call_message: this.state.tableData[4].from,
      start_call_message: this.state.tableData[2].from,
      send_from_status: this.state.toggleData.send_from_status,
      widget_thanks_message_status: this.state.toggleData
        .widget_thanks_message_status,
      before_call_message_status: this.state.toggleData
        .before_call_message_status,
      start_call_message_status: this.state.toggleData
        .start_call_message_status,
      missed_call_message_status: this.state.toggleData
        .missed_call_message_status,
      cancel_call_text: this.state.tableData[3].from,
      before_call_message_agent: this.state.tableData[5].from
    }

    axios
      .post(url, data, head)
      .then(res => {
        this.props.loading(false)
        if (res.data.message == 'Successfully') {
          CommonNotify('Setting Updated', 'success')                   
          this.fetchData()
        

          
        }
      })
      .catch(er => {
        this.props.loading(false)
        CommonNotify('Cant Update Setting', 'error')        
      })
  }
  textChange = data => {
    this.setState({ isChangeText: true })
    const { activeTextBoxIndex } = this.state
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
      const tableData = this.state.tableData.map((item, index) => {
        // if (item.from.includes('{')) {
        //   item.from = item.from.replace(/{.*}/, `{${data}}`)
        // } else {
        if (index === this.state.activeTextBoxIndex) {
          item.from = selectedTextBoxEle.value
        }
        // }
      })
      // const update = data
      // this.setState({ buttonData: update })
    }
  }
  updateFormData = (event, data, index) => {
    this.setState({ activeTextBoxIndex: index })
    // if (data.from === '') {
    //   return
    // } else {
    //   let tableData = [...this.state.tableData]
    //   const val = data.from.replace(/{.*}/, '')
    //   tableData[index].from = val
    //   this.setState({ tableData })
    // }
  }

  onChangeToggledData = (e, data) => {
    const toggleDataUpdate = { ...this.state.toggleData }
    toggleDataUpdate[data] = e
    this.setState({ toggleData: toggleDataUpdate })
    this.updateSmsTemplate(toggleDataUpdate)
  }

  updateSmsTemplate = data => {
    this.props.loading(true)
    let head = {
      headers: {
        Authorization: 'Bearer ' + apiToken
      }
    }
    const url = `${process.env.REACT_APP_BASE_APP_URL}/api/v1/widget/${this.props.widget.id}/messages`

    axios
      .post(url, data, head)
      .then(res => {
        this.props.loading(false)
        if (res.data.message == 'Successfully') {
          CommonNotify('Setting Updated', 'success')
          if(!this.state.isChangeText){
            this.fetchData()
          }           
        }
      })
      .catch(er => {
        this.props.loading(false)
        CommonNotify('Cant Update Setting', 'error')        
      })
  }

  onClickCancel = () => {
    const {
      prevFrom,
      prevSmsConfig,
      prevTable,
      prevToggleData,
      prevWidgetPayload
    } = this.state
    this.setState({
      from: prevFrom,
      smsConfig: prevSmsConfig,
      tableData: JSON.parse(JSON.stringify(prevTable)),
      toggleData: prevToggleData,
      widgetPayload: prevWidgetPayload,
      isChangeText: false
    })
  }
 
  render() {
    return (
      <div className="sms-settings-wrapper">
        <div className="sms-header-holder">
          <div className="sms-title-wrapper">
            <div>
              <h2 className="sms-title bold-text">Instant Responses</h2>
              <p className="sms-description default-text subtext">
                Send automatic text responses to anyone who contacts you
              </p>
            </div>
            <NodeToggle
              handleDataRef={this.toggleConfig}
              activeDefault={this.state.smsConfig}
              dataToggle={{
                callTitle: '',
                callDesc: '',
                callId: 'toggleSMSShowBtn',
                callRef: 'ShowSMSButton'
              }}
            />
          </div>
          {this.state.smsConfig ? (
            <div className="sms-subject-holder">
              <p className="sms-text semibold-text">Sender ID</p>
              <div className="sms-info">
                <Input
                  type="text"
                  value={this.state.from}
                  onChange={e => this.setState({ from: e.target.value, isChangeText: true })}
                />
                <p className="text-length default-text subtext">
                  Length 4 - 11 Character
                </p>
              </div>
            </div>
          ) : null}
        </div>
        {this.state.smsConfig ? (
          <div>
            {this.state.tableData.map((item, i) => {
              return (
                <SingleTable
                  key={i}
                  onChange={e => this.changeTable(e.target.value, i)}
                  tableData={item}
                  onClick={event => this.updateFormData(event, item, i)}
                  className={`calls-text-area-${i}`}
                  toggleData={item.toggleData}
                  toggleConfig={e =>
                    this.onChangeToggledData(e, item.toggleData.toggleName)
                  }
                  activeDefault={
                    this.state.toggleData[item.toggleData.toggleName]
                  }
                />
              )
            })}
            <div className="sms-button-wrapper">
              <p className="subtext default-text">
                - Click to insert placeholders for your call rep's details -
              </p>
              <div className="btn-group">
                {this.state.smsPlaceHolder.map(item => (
                  <CommonButtons
                    btnClass="btn-sms"
                    type="submit"
                    content={item}
                    onClick={() => this.textChange(item)}
                    background="blue"
                  />
                ))}

                {/* <CommonButtons
                  btnClass="btn-sms"
                  type="submit"
                  content="Call Rep Number"
                  onClick={() => this.textChange('Call_Rep_Number')}
                  background="blue"
                />
                <CommonButtons
                  btnClass="btn-sms"
                  type="submit"
                  content="Company"
                  onClick={() => this.textChange('COMPANY_NAME')}
                  background="blue"
                /> */}
              </div>
              {this.state.isChangeText ? (
                <div>
                  <CommonButtons
                    type="button"
                    onClick={() => this.updateFollowUp(this.state.smsConfig)}
                    content="Save"
                    background="blue"
                  />
                  <CommonButtons
                    onClick={() => this.componentDidMount()}
                    type="reset"
                    content="Cancel"
                    background="grey"
                  />
                </div>
              ) : null}
            </div>
          </div>
        ) : null}
      </div>
    )
  }
}

export default SmsSettings
