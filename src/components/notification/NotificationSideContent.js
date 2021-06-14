import React, { Component } from 'react'
import axios from 'axios'

import NodeCheckbox from '../../common/NodeCheckbox'
import { CommonNotify } from '../../common/CommonNotify'

const apiToken = localStorage.getItem('access_token')

class NotificationSideContent extends Component {
  state = {
    activeIndexes: [0],
    //Notification Data
    widget: 0,
    isSlackIntegrated: false,
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
        key: 'sms_notification_schedule_call',
        label: 'Schedule Call',
        checked: 0
      },
      {
        name: 'sms_leave_message',
        key: 'sms_leave_message',
        label: 'Offline Message',
        checked: 0
      },
      {
        name: 'sms_incoming_sms',
        key: 'sms_incoming_sms',
        label: 'SMS Received',
        checked: 0
      },
      {
        name: 'sms_incoming_call_summary',
        key: 'sms_incoming_call_summary',
        label: 'Call Summary',
        checked: 0
      },
      {
        name: 'sms_incoming_call_missed',
        key: 'sms_incoming_call_missed',
        label: 'Call Missed',
        checked: 0
      },
      {
        name: 'sms_cancel_schedule_call',
        key: 'sms_cancel_schedule_call',
        label: 'Schedule Call Cancelled',
        checked: 0
      },
      {
        name: 'sms_reschedule_schedule_call',
        key: 'sms_reschedule_schedule_call',
        label: 'Schedule Call Rescheduled',
        checked: 0
      },
      {
        name: 'sms_daily_report',
        key: 'sms_daily_report',
        label: 'Upcoming Calls Summary',
        checked: 0
      },
      {
        name: 'leave_your_feedback_message',
        key: 'leave_your_feedback_message',
        label: 'Leave your feedback message ',
        checked: 0
      },
      {
        name: 'sms_missed_call',
        key: 'sms_missed_call',
        label: "Couldn't Reach you message if if couldn't reach user",
        checked: 0
      }
    ],
    checkboxesSlack: [
      {
        name: 'mail_schedule_call',
        key: 'mail_schedule_call',
        label: 'Schedule Calls',
        checked: 0
      }
    ],
    checkboxesEmail: [
      {
        name: 'mail_schedule_call',
        key: 'mail_schedule_call',
        label: 'Schedule Calls',
        checked: 0
      },
      {
        name: 'mail_leave_message',
        key: 'mail_leave_message',
        label: 'Offline Message',
        checked: 0
      },
      {
        name: 'mail_incoming_sms',
        key: 'mail_incoming_sms',
        label: 'SMS Received',
        checked: 0
      },
      {
        name: 'mail_incoming_call_summary',
        key: 'mail_incoming_call_summary',
        label: 'Call summary',
        checked: 0
      },
      {
        name: 'mail_unsupported_country_call',
        key: 'mail_unsupported_country_call',
        label: 'Unsupported Countries Calls',
        checked: 0
      },
      {
        name: 'mail_call_missed',
        key: 'mail_call_missed',
        label: 'Call Missed',
        checked: 0
      },
      {
        name: 'schedule_call_canceled_mail_notify',
        key: 'schedule_call_canceled_mail_notify',
        label: 'Schedule Call Cancelled',
        checked: 0
      },
      {
        name: 'mail_reschedule_call',
        key: 'mail_reschedule_call',
        label: 'Schedule Call Rescheduled',
        checked: 0
      },
      {
        name: 'mail_daily_report',
        key: 'mail_daily_report',
        label: 'Upcoming Calls Summary',
        checked: 0
      }
    ],

    checkboxesWebNotification: [
      {
        name: 'web_leave_message',
        key: 'web_leave_message',
        label: 'Offline Message',
        checked: 0
      },
      {
        name: 'web_sms_message',
        key: 'web_sms_message',
        label: 'SMS Received',
        checked: 0
      },
      {
        name: 'web_call_missed',
        key: 'web_call_missed',
        label: 'Call Missed',
        checked: 0
      },
      {
        name: 'web_schedule_cancelled',
        key: 'web_schedule_cancelled',
        label: 'Schedule Call Cancelled',
        checked: 0
      },
      {
        name: 'web_reschedule_call',
        key: 'web_reschedule_call',
        label: 'Schedule Call Rescheduled',
        checked: 0
      },
      {
        name: 'web_call_summary',
        key: 'web_call_summary',
        label: 'Upcoming Calls Summary',
        checked: 0
      }
    ],
    checkboxesSlackNotification: [
      // {
      //   name: 'slack_assigned_call',
      //   key: 'slack_assigned_call',
      //   label: 'Assign Call',
      //   checked: 0
      // },
      {
        name: 'slack_cancel_schedule_call',
        key: 'slack_cancel_schedule_call',
        label: 'Cancel Schedule Call',
        checked: 0
      },
      // {
      //   name: 'slack_create_call',
      //   key: 'slack_create_call',
      //   label: 'Create Call',
      //   checked: 0
      // },
      {
        name: 'slack_daily_report',
        key: 'slack_daily_report',
        label: 'Daily Report  ',
        checked: 0
      },
      {
        name: 'slack_incoming_call',
        key: 'slack_incoming_call',
        label: 'Incomming Call',
        checked: 0
      },
      {
        name: 'slack_incoming_call_missed',
        key: 'slack_incoming_call_missed',
        label: 'Incomming Call Missed',
        checked: 0
      },
      {
        name: 'slack_incoming_call_summary',
        key: 'slack_incoming_call_summary',
        label: 'Incomming Call Summary',
        checked: 0
      },
      {
        name: 'slack_incoming_sms',
        key: 'slack_incoming_sms',
        label: 'Incomming SMS',
        checked: 0
      },
      {
        name: 'slack_leave_message',
        key: 'slack_leave_message',
        label: 'Leave Message',
        checked: 0
      },
      {
        name: 'slack_reschedule_schedule_call',
        key: 'slack_reschedule_schedule_call',
        label: 'Reschedule Call',
        checked: 0
      },
      {
        name: 'slack_schedule_call',
        key: 'slack_schedule_call',
        label: 'Schedule Call',
        checked: 0
      }
      // {
      //   name: 'slack_share_access_call',
      //   key: 'slack_share_access_call',
      //   label: 'Share Access Call',
      //   checked: 0
      // },
      // {
      //   name: 'slack_status_call',
      //   key: 'slack_status_call',
      //   label: 'Status Call',
      //   checked: 0
      // },
      // {
      //   name: 'slack_widget_not_available',
      //   key: 'slack_widget_not_available',
      //   label: 'Widget Not Available',
      //   checked: 0
      // }
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
    this.fetchUserIntegrations()
  }

  fetchUserIntegrations = () => {
    this.props.loading(true)
    let head = {
      headers: {
        Authorization: 'Bearer ' + apiToken
      }
    }
    const url = `${process.env.REACT_APP_BASE_APP_URL}/api/v1/integration/user-integrations`

    axios
      .get(url, head)
      .then(res => {
        this.props.loading(false)
        if (res.data.data) {
          this.props.loading(false)
          res.data.data.find(obj => {
            obj.integration === 'slack' &&
              this.setState({
                ...this.state,
                isSlackIntegrated: true
              })
          })
        }
      })
      .catch(er => {
        this.props.loading(false)
        CommonNotify('Cant Fetch Widget Setting')
      })
  }

  fetchWidget = () => {
    this.props.loading(true)
    let head = {
      headers: {
        Authorization: 'Bearer ' + apiToken
      }
    }
    const url = `${process.env.REACT_APP_BASE_APP_URL}/api/v1/widget/widgets`

    axios
      .get(url, head)
      .then(res => {
        this.props.loading(false)
        if (res.data.data[0]) {
          this.fetchNotiSetting(res.data.data[0].id)
          this.setState({ widget: res.data.data[0].id })
        }
      })
      .catch(er => {
        this.props.loading(false)
        CommonNotify('Cant Fetch Widget Setting')
      })
  }

  fetchNotiSetting = widget => {
    this.props.loading(true)
    let head = {
      headers: {
        Authorization: 'Bearer ' + apiToken
      }
    }
    const url = `${process.env.REACT_APP_BASE_APP_URL}/api/v1/widget/get-widget-notification?widget_id=${widget}`

    axios
      .get(url, head)
      .then(res => {
        this.props.loading(false)
        if (res.data.data) {
          this.setState({ settingsData: res.data.data[0] }, () => {
            this.setsettingData()
          })
        }
      })
      .catch(er => {
        this.props.loading(false)
        CommonNotify('Cant Fetch Widget Notifications')
      })
  }

  smsSettings = data => {
    let checkSms = [...this.state.checkboxesSms]

    checkSms.map((row, index, rows) => {
      if (row.key == data[0] && data[1] == 1) {
        checkSms[index].checked = 1
        this.setState({ checkboxesSms: checkSms })
        return
      }
    })
  }

  webSettings = data => {
    let checkWebNotification = [...this.state.checkboxesWebNotification]
    checkWebNotification.map((row, index, rows) => {
      if (row.key == data[0] && data[1] == 1) {
        checkWebNotification[index].checked = 1
        this.setState({ checkboxesWebNotification: checkWebNotification })
        return
      }
    })
  }

  mailSettings = data => {
    let checkEmail = [...this.state.checkboxesEmail]
    checkEmail.map((row, index, rows) => {
      if (row.key == data[0] && data[1] == 1) {
        checkEmail[index].checked = 1
        this.setState({ checkboxesEmail: checkEmail })
        return
      }
    })
  }

  slackSettings = data => {
    let checkSlack = [...this.state.checkboxesSlackNotification]
    checkSlack.map((row, index, rows) => {
      if (row.key === data[0] && data[1] == 1) {
        checkSlack[index].checked = 1
        this.setState({ checkboxesSlackNotification: checkSlack })
        return
      }
    })
  }

  setsettingData = () => {
    Object.entries(this.state.settingsData).map(row => {
      if (row[0].includes('mail_')) {
        this.mailSettings(row)
      } else if (row[0].includes('web_')) {
        this.webSettings(row)
      } else if (row[0].includes('slack_')) {
        this.slackSettings(row)
      } else {
        this.smsSettings(row)
      }
    })
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

  onChangeSelect = (e, key, ch) => {
    // const name = e.target.parentNode.parentNode.parentNode.getAttribute('name')
    const data = e.target.parentNode.childNodes[0].value
    // return
    var res = data

    if (res.includes('mail_')) {
      let temp_mail = [...this.state.checkboxesEmail]
      temp_mail[key].checked = !ch
      this.setState({ checkboxesEmail: temp_mail })
    } else if (res.includes('web_')) {
      let temp_web = [...this.state.checkboxesWebNotification]
      temp_web[key].checked = !ch
      this.setState({ checkboxesWebNotification: temp_web })
    } else if (res.includes('sms_')) {
      let temp_sms = [...this.state.checkboxesSms]
      temp_sms[key].checked = !ch
      this.setState({ checkboxesSms: temp_sms })
    } else if (res.includes('slack_')) {
      let temp_slack = [...this.state.checkboxesSlackNotification]
      temp_slack[key].checked = !ch
      this.setState({ checkboxesSlackNotification: temp_slack })
    } else {
      if (data == 'leave_your_feedback_message') {
        let temp_sms = [...this.state.checkboxesSms]
        temp_sms[key].checked = !ch
        this.setState({ checkboxesSms: temp_sms })
      }
    }
    this.onSave()
  }

  onSave = () => {
    this.props.loading(true)
    let head = {
      headers: {
        Authorization: 'Bearer ' + apiToken
      }
    }
    const url = `${process.env.REACT_APP_BASE_APP_URL}/api/v1/widget/set-customer-notifications`

    let data = {}

    let dataList = [
      ...this.state.checkboxesEmail,
      ...this.state.checkboxesSms,
      ...this.state.checkboxesWebNotification,
      ...this.state.checkboxesSlackNotification
    ]

    dataList.map((row, index) => {
      data[row.key] = row.checked
    })

    data.widget_id = this.state.widget

    axios
      .post(url, data, head)
      .then(res => {
        this.props.loading(false)
        if (res.data.message == 'Successfully') {
          CommonNotify('Data successfully updated', 'success')
        } else {
          CommonNotify('Cant updated Notification Setting', 'error')
        }
      })
      .catch(error => {
        this.props.loading(false)
        CommonNotify(error.response.data.errors[0], 'error')
      })
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
      <div className="account-settings notification-sidebar">
        <div className="holder-notification">
          <form method="" action="">
            <div className="holder-checkboxes notification_detail">
              <p className="title-label">
                Select the notifications you would like to receive
              </p>
              <NodeCheckbox
                onChange={this.onChangeSelect.bind(this)}
                name="nodeCheckboxEmail"
                title="SMS"
                checkboxlist={this.state.checkboxesSms}
              />
              <NodeCheckbox
                onChange={this.onChangeSelect.bind(this)}
                name="nodeCheckboxDesktop"
                title="Email"
                checkboxlist={this.state.checkboxesEmail}
              />
              <NodeCheckbox
                onChange={this.onChangeSelect.bind(this)}
                name="nodeCheckboxMobile"
                title="Web Notifications"
                checkboxlist={this.state.checkboxesWebNotification}
              />
              {this.state.isSlackIntegrated && (
                <NodeCheckbox
                  onChange={this.onChangeSelect.bind(this)}
                  name="nodeCheckboxSlack"
                  title="Slack"
                  checkboxlist={this.state.checkboxesSlackNotification}
                />
              )}
              {/* <div className="custom-button">
                <h2>Slack</h2>
                <div className="notification-slack">
                  <img src={slack} alt="Logo" />
                  <IntegrateWIthSlackModal />
                </div>
              </div> */}
            </div>
          </form>
        </div>
        {/* <div className="holder-notification">
            <h1 className="bold-text">Notification Settings</h1>
            <p className="subtext">Send me desktop notifications about...</p>
            <div className="holder-enable-notification">
              <p className="notification-title">
                <Image src={Warning} />
                Desktop Notifications are not enabled
              </p>
              <p className="notification-desc">
                It looks like you don't have desktop notification enabled for
                Drift! We highly recommend enabling them so you don't miss any
                important conversations in Limecall!
              </p>
              <CommonButtons
                content="Enable Desktop Notifications"
                background="green"
              />
            </div>
            <div className="checkbox-formobile">
              <CommonCheckbox
                onChange={this.onChangeCheckbox}
                name="checkboxForMobile"
                checked={data.checkboxForMobile}
                text="Use different settings for my mobile devices"
                italicText="will use some settings as desktop if not selected"
              />
            </div>
            <div className="holder-select">
              <CommonSelect
                onChange={this.onChangeSelect}
                name="selectConvoType"
                isGray
                placeholder="Select Conversation Type"
                options={[
                  'Select Conversation Type',
                  "All Conversation's",
                  "Conversation's I'm in and empty conversation's",
                  "Only conversations I'm in",
                  "Don't send me any push notifications"
                ]}
              />
              <CommonSelect
                onChange={this.onChangeSelect}
                name="selectConvoSound"
                isGray
                placeholder="Select"
                options={['Select', 'With Sounds', 'Without Sound']}
              />
              <CommonButtons
                content="Send Test"
                icon="mobile alternate"
                background="alt-blue"
              />
            </div>
            <span className="warning-text">
              You must have the Limecall app on iOS or Android to receive push
              notifications on your mobile devices
            </span>
            <div className="schedule-call-notif">
              <h2 className="title-label">Scheduled Call Notifications</h2>
              <CommonCheckbox
                onChange={this.onChangeCheckbox}
                name="checkboxCallNotif"
                checked={data.checkboxCallNotif}
                text="Send an SMS notifying thee customer about a schedule call"
              />
            </div>
            <div className="billing-notif">
              <h2 className="title-label">Billing notifications</h2>
              <CommonInput
                onChange={this.onChangeInput}
                name="inputBillingEmail"
                background="gray"
                type="text"
                title="Send invoices to this email address"
              />
            </div>
            <CommonButtons
              onClick={this.onSave}
              type="submit"
              content="Save"
              background="blue"
            />
            <Accordion>
              <div className="accordion-holder advance-settings">
                <Accordion.Title
                  active={activeIndexes.includes(0)}
                  index={0}
                  onClick={this.handleClick}
                >
                  <p className="bold-text accordion-title">Advance settings</p>
                  <p className="subtext accordion-desc">
                    Customize advance notification settings
                  </p>
                </Accordion.Title>
                <Accordion.Content active={activeIndexes.includes(0)}>
                  <div className="desktop-notification">
                    <h2 className="title-label">Desktop Notification</h2>
                    <CommonCheckbox
                      onChange={this.onChangeCheckbox}
                      name="checkboxBrowserDeiplayNotif"
                      checked={data.checkboxBrowserDeiplayNotif}
                      text="Display desktop notification even when Limecall is not open in a browser."
                    />
                    <CommonCheckbox
                      onChange={this.onChangeCheckbox}
                      name="checkboxDesktopNotifOnScreen"
                      checked={data.checkboxDesktopNotifOnScreen}
                      text="Keep desktop notification on-screen until I interact with them"
                    />
                    <p className="subtext">with this sound</p>
                    <div className="holder-sound-select">
                      <CommonSelect
                        onChange={this.onChangeSelect}
                        name="selectAdvanceSound"
                        isGray
                        placeholder="Select"
                        options={['Select', 'No sound', 'With sound']}
                      />
                      <CommonButtons
                        content="Send Test"
                        icon="mobile alternate"
                        background="alt-blue"
                      />
                    </div>
                  </div>
                  <div className="email-notification">
                    <h2 className="title-label">Email Notifications</h2>
                    <CommonCheckbox
                      onChange={this.onChangeCheckbox}
                      name="checkboxNotifRepeat"
                      checked={data.checkboxNotifRepeat}
                      text="Send me email notification once every 15 minute for"
                    />
                    <CommonSelect
                      onChange={this.onChangeSelect}
                      name="selectEmailNotif"
                      isGray
                      placeholder="Select"
                      options={[
                        'Select',
                        "Only conversations I'm in",
                        'Option 2'
                      ]}
                    />
                    <CommonButtons
                      content="Send Test"
                      icon="mobile alternate"
                      background="alt-blue"
                    />
                    <p className="subtext">
                      You wil recieve these at <Link to="">alpha@gama.com</Link>
                    </p>
                  </div>
                  <div className="holder-checkboxes">
                    <p className="title-label">
                      Set notifications which you would like to recieve
                    </p>
                    <NodeCheckbox
                      onChange={this.onChangeNodeCheckbox}
                      name="nodeCheckboxEmail"
                      title="Email"
                      checkboxlist={[
                        'Missed call',
                        'New call',
                        'New schedule call',
                        "Widget's weekly reports",
                        'Scheduld call failed',
                        'Custom fields completed by visitors',
                        'New message'
                      ]}
                    />
                    <NodeCheckbox
                      onChange={this.onChangeNodeCheckbox}
                      name="nodeCheckboxDesktop"
                      title="Desktop"
                      checkboxlist={[
                        'New call',
                        'Call completed',
                        'Visitor left additions data',
                        'New scheduled call',
                        'Updated from Callpage',
                        'New widget installed',
                        'New message'
                      ]}
                    />
                    <NodeCheckbox
                      onChange={this.onChangeNodeCheckbox}
                      name="nodeCheckboxMobile"
                      title="Mobile"
                      checkboxlist={[
                        'New call',
                        'Scheduled call',
                        'Call ringing',
                        'New message',
                        'Manager availablity status has been changed'
                      ]}
                    />
                  </div>
                </Accordion.Content>
              </div>
            </Accordion>
          </div> */}
        {/* </form> */}

        {/* <CommonButton
          onClick={e => this.onSave()}
          type="button"
          content="Save"
          background="blue"
        />
        <CommonButtons
          //onClick={}
          type="reset"
          content="Cancel"
          background="grey"
        /> */}
      </div>
    )
  }
}

export default NotificationSideContent
