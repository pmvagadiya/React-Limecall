import React, { Component } from 'react'
import { setDefaultLocale } from 'react-datepicker'
import Toggle from '../../common/CommonToggleClass'
import NodeToggle from '../../common/NodeToggle'
import CommonWorkingHour from '../../common/CommonWorkingHour'
import updateHourStatus from '../../config/togglehoursStatus'
import TimezonePicker from 'react-timezone'
import updateProfile from '../../config/updateProfile';
import {Dimmer, Loader} from 'semantic-ui-react'
import BreakTime from './BreakTime'
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

class WorkingHours extends Component {
  constructor(props) {
    super(props)
    this.state = {
      activeToggle: false,
      selectedTimeZone: 'UTC',
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
      firstRun: true
    }
  }

  componentDidMount() {
   this.getProfileData()
  }

  getProfileData = async () => {
    // this.props.loading(true)
    this.setState({isLoading: true})
    updateProfile()
      .then(async res => {
        const setLocalValue = await res.data.data.working_hours_status      
        this.setState({
          business_hours_status : setLocalValue,
          selectedTimeZone: res.data.data.time_zone,
          isLoading: false
        })
      })
      .catch(err => {
        console.log(err)
        this.setState({isLoading: false})
      })
  }

  async componentWillReceiveProps(nextProps) {   
    const { business_hours_status, firstRun } = this.state
    // if (
    //   nextProps.widget.user_working_hours !== business_hours_status &&
    //   firstRun
    // ) {
    //   this.setState({
    //     ...this.state,
    //     business_hours_status: nextProps.widget.user_working_hours
    //   })
    // }
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
  handleToggleData = async toggleData => {
    const w_id = await localStorage.getItem('widget_id')
    console.log('Authorized')
    const url = 'user/working-hours/status'
    this.setState({
      business_hours_status: toggleData,
    })
    updateHourStatus(toggleData, w_id, url)
      .then(async res => {
        console.log('Storage after set')
      await localStorage.setItem('user_working_hours',toggleData ? '1' : '0')
      })
      .catch(err => console.log(err))
  

  }

  handleToggleDataBranding = toggleData => {
    if (toggleData) {
      this.setState({
        isBranding: true
      })
    }
  }

  selectTimeZone = e => {
          this.setState({
            selectedTimeZone: e
          })
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
      `Set your company's business hours to let your customers know about your availability`
    }

    return (
      <>
      <Dimmer active={this.state.isLoading}>
        <Loader></Loader>
      </Dimmer>
        <div className="business_hours_main">
          <div className="working-hours-wrapper availability-block">
            <p className="availability-title">
              When are you available for meetings?
            </p>
            <p>
            Decide when you can be available to take calls from your prospects
            </p>
            <div className="availability-toggle">
            <div style={{width: 100}}>
            <NodeToggle
              handleDataRef={this.handleToggleData}
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
              Set your working hours
              </p>
            </div>
            {business_hours_status ? (
            <div>
            <div style={{ display: 'flex', alignContent: 'center', marginTop: 10}}>
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
              <CommonWorkingHour
                timeZone={this.state.selectedTimeZone}
                content={content}
                loading={this.props.loading}
                isWidgets={true}
                URL={URL}
              />
            </div>
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

export default WorkingHours
