import React, { Component } from 'react'
import Toggle from '../../common/CommonToggleClass'
import CommonWorkingHour from '../../common/CommonWorkingHour'
import BusinessCommonWorkingHour from '../../common/BusinessCommonWorkingHour'
import NodeToggle from '../../common/NodeToggle';
import TimezonePicker from 'react-timezone'
import {Dimmer, Loader} from 'semantic-ui-react'
import updateHourStatus from '../../config/togglehoursStatus'
import { CommonNotify } from '../../common/CommonNotify'
import BreakTime from './BreakTime'
import axios from 'axios'
import DayOff from './DayOff'

const weekDays = [
  {
    key: 1,
    text: 'Monday',
    value: 15,
    from: '01:00 pm',
    to: '02:00 pm',
    isDayOff: false,
    isApplyToAll: true
  },
  {
    key: 2,
    text: 'Tuesday',
    value: 16,
    from: '01:00 pm',
    to: '02:00 pm',
    isDayOff: false,
    isApplyToAll: false
  },
  {
    key: 3,
    text: 'Wednesday',
    value: 17,
    from: '01:00 pm',
    to: '02:00 pm',
    isDayOff: false,
    isApplyToAll: false
  },
  {
    key: 4,
    text: 'Thursday',
    value: 18,
    from: '01:00 pm',
    to: '02:00 pm',
    isDayOff: false,
    isApplyToAll: false
  },
  {
    key: 5,
    text: 'Friday',
    value: 19,
    from: '0:00 pm',
    to: '02:00 pm',
    isDayOff: false,
    isApplyToAll: false
  },
  {
    key: 6,
    text: 'Saturday',
    value: 20,
    from: '01:00 pm',
    to: '02:00 pm',
    isDayOff: false,
    isApplyToAll: false
  },
  {
    key: 7,
    text: 'Sunday',
    value: 21,
    from: '01:00 pm',
    to: '02:00 pm',
    isDayOff: false,
    isApplyToAll: false
  }
]

class BusinessWorkingHours extends Component {
  constructor(props) {
    super(props)
    this.state = {
      smsConfig : 0,
      activeToggle: false,
      selectedTimeZone: null,
      working_from: '',
      working_to: '',
      day_name: '',
      day_id: '',
      time_zone: '',
      isLoading: false,
      javaScriptSnippet: false,
      business_hours_status: 0,
      statusLoaded: false,
      days: weekDays,
      data: [],
      widget: null,
      selectedDay: 0,
      dayList: [],
      daysSelected: [],
      isReminderButtonDisplay: false,
      isChecked: false,
      isCheckedBoxData: false,
      branding: false,
      isBranding: false,
      weekDaysValues: [],
      firstRun: true,
      savedSettings: {}
    }
  }

  componentDidMount() {
this.fetchWidget();
// this.getTimeZone();
  }

  getTimeZone = () => {
  const apiToken = localStorage.getItem('access_token')
  const head = {
  headers: {
    Authorization: 'Bearer ' + apiToken
      }
   }
    const url = `${process.env.REACT_APP_BASE_APP_URL}/api/v1/widget/widgets`
    axios
      .get(url, head)
      .then(res => {
        if (res.data && res.data.data && res.data.data[0] && res.data.data[0].time_zone) {
          this.setState({
            selectedTimeZone: res.data.data[0].time_zone,
            savedSettings: res.data.data[0]
          })
        }
      })
      .catch(er => {        
        CommonNotify('Cant Fetch Saved Setting', 'error')
      })
  }

  selectTimeZone = e => {
const apiToken = localStorage.getItem('access_token')
const head = {
  headers: {
    Authorization: 'Bearer ' + apiToken
  }
}
    if (e) {
      this.setState({
        selectedTimeZone: e
      })
      let widgetSetting = this.state.savedSettings;
      widgetSetting['time_zone'] = e
      const url = `${process.env.REACT_APP_BASE_APP_URL}/api/v1/widget/general-settings`
      axios
        .post(url, widgetSetting, head)
        .then(res => {
          if (res.data.message == 'Successfully') {
            CommonNotify('TimeZone successfully updated...', 'success')
          } else {
            CommonNotify('TimeZone cannot saved, System error occurred...')
          }
        })
        .catch(error => {
         
        })
    } else {
      
    }
  }

  fetchWidget = () => {
    this.setState({isLoading : true})
    // const apiToken = sessionStorage.getItem('access_token')
    const apiToken = localStorage.getItem('access_token')
    let head = {
      headers: {
        Authorization: 'Bearer ' + apiToken
      }
    }
    const url = `${process.env.REACT_APP_BASE_APP_URL}/api/v1/widget/widgets`
    axios
      .get(url, head)
      .then(res => {
        this.setState({isLoading : false})
        if (res.data.data[0]) {
          this.setState({
              business_hours_status: res.data.data[0].business_hours_status,
              smsConfig : res.data.data[0].business_hours_status
             })
        }
        if (res.data && res.data.data && res.data.data[0] && res.data.data[0].time_zone) {
          this.setState({
            selectedTimeZone: res.data.data[0].time_zone,
            savedSettings: res.data.data[0]
          })
        }
      })
      .catch(error => {
        this.setState({isLoading : false})
      })
  }

  componentWillReceiveProps(nextProps) {
    const { business_hours_status, firstRun } = this.state

  }

  callToggle = {
    callTitle: 'JavaScript Snippet',
    callDesc:
      'When turned on, our system is permitted to make automated calls to your customers when requited',
    callId: 'toogleJavaScriptSnippet',
    callref: 'javaScriptSnippet'
  }
  brandingData = {
    callTitle: 'branding',
    callDesc:
      'When turned on, our system is permitted to make automated calls to your customers when requited',
    callId: 'branding',
    callref: 'branding'
  }
  handleToggleDataBusiness = async toggleData => {
    console.log('Toggle Data', toggleData, this.state.business_hours_status)
    const val = toggleData ? 1 : 0
    console.log('Toggle Value ----->',this.state.business_hours_status, ' Vals ------------>',val)
    if(val === this.state.business_hours_status)
    {
      console.log('Not Authorized')
  }else{
    console.log('Authorized')
    const url = 'widget/update-widget-business-hours-status'
    const w_id = await localStorage.getItem('widget_id');
    this.setState({
      ...this.state,
      business_hours_status: toggleData ? 1 : 0,
      firstRun: false
    })
    updateHourStatus(toggleData, w_id, url)
      .then(res => {})
      .catch(err => console.log(err))
  }
  }

  handleToggleDataBranding = toggleData => {
    if (toggleData) {
      this.setState({
        isBranding: true
      })
    }
  }

  toggleConfig = async val => {
    this.setState({ business_hours_status: val })
    const url = 'widget/update-widget-business-hours-status'
    const w_id = await localStorage.getItem('widget_id');
    this.setState({ smsConfig: val })
    updateHourStatus(val, w_id, url)
      .then(res => {})
      .catch(err => console.log(err))
  }

  render() {
    const { business_hours_status } = this.state
    const URL = {
      get: 'user/working-hours',
      post: 'user/working-hours',
      delete: 'user/working-hours'
    }

    const content = {
      header: 'When are you available for meetings?',
      p:
        'Decide when guests can book time on your calendar and how far in advance.'
    }

    return (
      <>
        <Dimmer active={this.state.isLoading} style={{ position: 'fixed' }}>
          <Loader />
        </Dimmer>
        <div className="business_hours_main">
          <div className="working-hours-wrapper availability-block">
            <p className="availability-title">
              When are you available for meetings?
            </p>
            <p>
              Set your company's business hours to let your customers know about your availability
            </p>
            <div style={{ display: 'flex', alignContent: 'center', marginTop: 30}}>
            <p  style={{marginRight:'20px', fontWeight:'700', color: '#6b5e5e', fontSize:'16px', display: 'flex', marginTop: 5}}> Timezone </p>{' '}
          <div className="timezone-picker" style={{width: '60%'}}>
            <TimezonePicker
              value={this.state.selectedTimeZone}
              onChange={this.selectTimeZone}
              inputProps={{
                placeholder: 'Select Timezone...',
                name: 'timezone'
              }}
            />{' '}
          </div>{' '}
        </div>
            <div className="availability-toggle">
              <div style={{width: 100}}>
            <NodeToggle
              handleDataRef={this.toggleConfig}
              activeDefault={this.state.business_hours_status}
              dataToggle={{
                callTitle: '',
                callDesc: '',
                callId: 'toggleSMSShowBtn',
                callRef: 'ShowSMSButton'
              }}
            />
            </div>
            <p className="title-label-working">
              Set your office hours
              </p>
            </div>
            {business_hours_status ? (
              <BusinessCommonWorkingHour
                content={content}
                loading={this.props.loading}
                isWidgets={true}
                URL={URL}
              />
            ) : null}
          </div>
        </div>
        {this.props.activeTab !== 'Business Hours' && (
          <>
            <DayOff loading={this.props.loading} />
            <BreakTime loading={this.props.loading} />
          </>
        )}
      </>
    )
  }
}

export default BusinessWorkingHours
