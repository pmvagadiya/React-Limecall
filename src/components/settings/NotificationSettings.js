import React, { Component } from 'react'
// import { Link } from 'react-router-dom'
// import { Accordion, Image } from 'semantic-ui-react'

import CommonButton from '../../common/CommonButtons'
// import CommonCheckbox from '../../common/CommonCheckbox'
// import CommonSelect from '../../common/CommonSelect'
// import CommonInput from '../../common/CommonInput'
import NodeCheckbox from '../../common/NodeCheckbox'
import { CommonNotify } from '../../common/CommonNotify'
import {Dimmer, Loader} from 'semantic-ui-react'
import axios from 'axios'
import CommonButtons from '../../common/CommonButtons'
import addNotification from '../../config/addNotification'

const apiToken = localStorage.getItem('access_token')

// import Warning from '../../assets/images/warning.svg'

class NotificationSettings extends Component {
  state = {
    activeIndexes: [0],
    isLoading: false,
    //Notification Data
    widget: 0,
    data: {
      checkboxForMobile: false,
      checkboxCallNotif: false,
      selectConvoType: '',
      selectConvoSound: '',
      inputBillingEmail: '',
      checkboxBrowserDeiplayNotif: false,
      checkboxDesktopNotifOnScreen: false,
      selectAdvanceSound: '',
      checkboxNotifRepeat: false,
      selectEmailNotif: '',
      nodeCheckboxEmail: [],
      nodeCheckboxDesktop: [],
      nodeCheckboxMobile: []
    },
    nodeCheckboxEmail: {
      check_box_1: true,
      check_box_2: false,
      check_box_3: false,
      check_box_4: true
    },
    settingsData: null,

    checkboxesSms: [
      {
        name: 'sms_notification_schedule_call',
        key: 'schedule_call_added_notify_sms',
        label: 'Added To Schedule Calls',
        checked: 0
      },
      {
        name: 'sms_leave_message',
        key: 'lead_missed_notify_sms',
        label: 'Lead Missed',
        checked: 0
      },
      {
        name: 'sms_incoming_sms',
        key: 'lead_assigned_notify_sms',
        label: 'Lead Assigned',
        checked: 0
      },
      {
        name: 'sms_incoming_call_summary',
        key: 'mention_notify_sms',
        label: 'Mentioned In Lead',
        checked: 0
      }
    ],

    checkboxesEmail: [
      {
        name: 'mail_schedule_call',
        key: 'schedule_call_added_notify',
        label: 'Schedule Calls',
        checked: 0
      },
      {
        name: 'mail_leave_message',
        key: 'lead_missed_notify',
        label: 'Missed Call',
        checked: 0
      },
      {
        name: 'mail_incoming_sms',
        key: 'lead_assigned_notify',
        label: 'New Call received (Lead Assigned)',
        checked: 0
      },
      {
        name: 'mail_incoming_call_summary',
        key: 'mention_notify',
        label: 'Share Access In Lead',
        checked: 0
      },
      {
        name: 'mail_unsupported_country_call',
        key: 'new_task_assigned_mail_notify',
        label: 'New task Assigned',
        checked: 0
      }
    ],

    checkboxesWebNotification: [
      {
        name: 'web_leave_message',
        key: 'desktop_mention_notify',
        label: 'Share Access In Lead',
        checked: 0
      },
      {
        name: 'web_sms_message',
        key: 'assign_to_lead_browser_notify',
        label: 'Lead Assigned',
        checked: 0
      }
    ]
  }

  onChangeInput = e => {
    const { name, value } = e.target
    const { data } = this.state
    data[name] = value

    this.setState({ data })
  }

  onChangeCheckbox = e => {
    const { name } = e.target.parentNode.querySelector('.hidden')
    const { data } = this.state
    data[name] = !data[name]

    this.setState(data)
  }

  componentDidMount = () => {
    this.fetchWidget()
  }

  fetchWidget = () => {
    this.setState({isLoading: true})
    let head = {
      headers: {
        Authorization: 'Bearer ' + apiToken
      }
    }
    const url = `${process.env.REACT_APP_BASE_APP_URL}/api/v1/user/notifications`

    axios
      .get(url, head)
      .then(res => {
        if (res.data.data) {
          this.setsettingData(res.data.data)
          this.setState({isLoading: false})

          // {
          //   this.setState({ settingsData: res.data.data[0] }, () =>
          //     this.setsettingData()
          //   )
          // }
          // this.fetchNotiSetting(res.data.data[0].id)
          // this.setState({ widget: res.data.data[0].id })
        }
      })
      .catch(er => {
        this.setState({isLoading: false})
        CommonNotify('Cant Fetch Widget Setting')
      })
  }

  fetchNotiSetting = async () => {
    this.setState({isLoading: true})
    let head = {
      headers: {
        Authorization: 'Bearer ' + apiToken
      }
    }
    const w_id = await localStorage.getItem('widget_id');
    const url = `${process.env.REACT_APP_BASE_APP_URL}/api/v1/widget/get-widget-notification?widget_id=${w_id}`

    axios
      .get(url, head)
      .then(res => {
        this.setState({isLoading: false})
        if (res.data.data) {
          this.setState({ settingsData: res.data.data[0] }, () => {
            this.setsettingData()
          })
        }
      })
      .catch(er => {
        this.setState({isLoading: false})
        CommonNotify('Cant Fetch Widget Notifications')
      })
  }

  smsSettings = data => {
    let checkSms = [...this.state.checkboxesSms]
    const getKeys = Object.keys(data)
    checkSms.map((row, index, rows) => {
      if (getKeys.map(item => item === row.key) && data[row.key] === 1) {
        checkSms[index].checked = 1
        return
      }
    })
    this.setState({ checkboxesSms: checkSms })
  }

  webSettings = data => {
    let checkWebNotification = [...this.state.checkboxesWebNotification]
    // checkWebNotification.map((row, index, rows) => {
    //   const getKeys = Object.keys(data)
    //   const getValue = Object.values(data)
    //   if (row.key == data[0] && data[1] == 1) {
    //     checkWebNotification[index].checked = 1
    //     return
    //   }
    // })
    const getKeys = Object.keys(data)
    checkWebNotification.map((row, index, rows) => {
      if (getKeys.map(item => item === row.key) && data[row.key] === 1) {
        checkWebNotification[index].checked = 1
        return
      }
    })
    this.setState({ checkboxesWebNotification: checkWebNotification })
  }

  mailSettings = data => {
    let checkEmail = [...this.state.checkboxesEmail]
    const getKeys = Object.keys(data)
    checkEmail.map((row, index, rows) => {
      if (getKeys.map(item => item === row.key) && data[row.key] === 1) {
        checkEmail[index].checked = 1
        return
      }
    })
    this.setState({ checkboxesEmail: checkEmail })
  }

  setsettingData = data => {
    // Object.entries(this.state.settingsData).map(row => {
    // if (data.email) {
    this.mailSettings(data.email)
    // } else if (data.sms) {
    this.smsSettings(data.sms)
    // } else {
    this.webSettings(data.desk)
    // }
    // })
  }

  onChangeNodeCheckbox = value => {
    // const name = e.target.parentNode.parentNode.parentNode.getAttribute('name')
    // const val = e.target.name
    // const { data } = this.state
    // const index = data["nodeCheckboxEmail"].indexOf(val)
    // if (index === -1) {
    //   data["nodeCheckboxEmail"].push(val)
    // } else {
    //   data["nodeCheckboxEmail"].splice(index, 1)
    // }
    // this.setState(data)
  }

  onChangeSelect = (e, val, key, ch) => {
    //const name = e.target.parentNode.parentNode.parentNode.getAttribute('name')
    var res = ch.name.substring(0, 5)

    if (res.includes('mail_')) {
      this.setState({isLoading: true})
      let temp_mail = [...this.state.checkboxesEmail]
      temp_mail[val].checked = !key
      this.setState({ checkboxesEmail: temp_mail })
      const data = temp_mail
      addNotification(data, 'email')
        .then(res => {
          if (res) {
            this.setState({isLoading: false})
            CommonNotify('update successfully', 'success')
            this.fetchWidget()
          }
        })
        .catch(err => {
          const errors = { ...err }
          if (errors.response.data.errors.length) {
            this.setState({isLoading: false})
            CommonNotify(errors.response.data.errors[0])
            this.fetchWidget()
          }
        })
    } else if (res.includes('sms_')) {
      this.setState({isLoading: true})
      let temp_sms = [...this.state.checkboxesSms]
      temp_sms[val].checked = !key
      this.setState({ checkboxesSms: temp_sms })
      const data = temp_sms
      addNotification(data, 'sms')
        .then(res => {
          if (res) {
            this.setState({isLoading: false})
            CommonNotify('update successfully', 'success')
            this.fetchWidget()
          }
        })
        .catch(err => {
          const errors = { ...err }
          if (errors.response.data.errors.length) {
            this.setState({isLoading: false})
            CommonNotify(errors.response.data.errors[0])
            this.fetchWidget()
          }
        })
    } else if (res.includes('web_')) {
      this.setState({isLoading: true})
      let temp_web = [...this.state.checkboxesWebNotification]
      temp_web[val].checked = !key
      this.setState({ checkboxesWebNotification: temp_web })
      const data = temp_web
      addNotification(data, 'desktop')
        .then(res => {
          if (res) {
            this.setState({isLoading: false})
            CommonNotify('update successfully', 'success')
            this.fetchWidget()
          }
        })
        .catch(err => {
          const errors = { ...err }
          if (errors.response.data.errors.length) {
            this.setState({isLoading: false})
            CommonNotify(errors.response.data.errors[0])
            this.fetchWidget()
          }
        })
    } else {
      if (val == 'leave_your_feedback_message') {
        let temp_sms = [...this.state.checkboxesSms]
        temp_sms[val].checked = !key
        this.setState({ checkboxesSms: temp_sms })
      }
    }
  }


  // handleClick = (e, titleProps) => {
  //   const { index } = titleProps
  //   const { activeIndexes } = this.state
  //   const newIndex = activeIndexes

  //   const currentIndexPosition = activeIndexes.indexOf(index)
  //   if (currentIndexPosition > -1) {
  //     newIndex.splice(currentIndexPosition, 1)
  //   } else {
  //     newIndex.push(index)
  //   }

  //   this.setState({ activeIndexes: newIndex })
  // }

  render() {
    // const { activeIndexes, data } = this.state

    return (
      <>
      <Dimmer active={this.state.isLoading}>
        <Loader></Loader>
      </Dimmer>
      <div className="account-settings">
        <div className="holder-notification">
          <form method="" action="">
            <div className="holder-checkboxes notification_detail">
              <p className="title-label">
                Set notifications which you would like to recieve
              </p>
              <NodeCheckbox
                onChange={(e, val, key, ch) =>
                  this.onChangeSelect(e, val, key, ch)
                }
                name="nodeCheckboxEmail"
                title="SMS"
                checkboxlist={this.state.checkboxesSms}
              />
              <NodeCheckbox
                onChange={(e, val, key, ch) =>
                  this.onChangeSelect(e, val, key, ch)
                }
                name="nodeCheckboxDesktop"
                title="Email"
                checkboxlist={this.state.checkboxesEmail}
              />
              <NodeCheckbox
                onChange={(e, val, key, ch) =>
                  this.onChangeSelect(e, val, key, ch)
                }
                name="nodeCheckboxMobile"
                title="Web Notifications"
                checkboxlist={this.state.checkboxesWebNotification}
              />
            </div>
          </form>
        </div>
      </div>
      </>
    )
  }
}

export default NotificationSettings
