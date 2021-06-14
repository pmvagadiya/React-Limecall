import React, { Component } from 'react'
import { Radio } from 'semantic-ui-react'
import {
  _deleteAvailabilityTime,
  _getAvailabilityHour,
  _postAvailabilityTime
} from '../../api/availabilityHourAPI'
import iconSet from '../../assets/images/Dashboard 2-05.png'
import Toggle from '../../common/CommonToggleClass'
import CommonWorkingHour from '../../common/CommonWorkingHour'
import BusinessCommonWorkingHour from '../../common/BusinessCommonWorkingHour'
import updateHourStatus from '../../config/togglehoursStatus'
import TimezonePicker from 'react-timezone'
import axios from 'axios'
import { CommonNotify } from '../../common/CommonNotify'

const apiToken = localStorage.getItem('access_token')
const head = {
  headers: {
    Authorization: 'Bearer ' + apiToken
  }
}
export const WidgetAvailabilityTitle = () => (
  <div className="accordion-widget-holder">
    <div className="accordion-image-holder">
      <img src={iconSet} alt="logo" />
    </div>{' '}
    <div className="accordion-title-holder">
      <h2 className="accordion-title"> Set Your Business Hours </h2>{' '}
      <p className="accordion-description"> Set team office and reply times </p>{' '}
    </div>{' '}
  </div>
)

export class WidgetAvailabilityContent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      business_hours_status: 1,
      firstRun: true,
      activeToggle: false,
      selectedTimeZone: null,
      savedSettings: {}
    }
  }

  componentDidMount(){
    this.getTimeZone()
  }

  componentWillReceiveProps(nextProps) {
    const { business_hours_status, firstRun } = this.state
    if (
      nextProps.widget.business_hours_status !== business_hours_status &&
      firstRun
    ) {     
      this.setState(
        {
          ...this.state,
          business_hours_status: nextProps.widget.business_hours_status
        },
        () =>
          console.log(           
            this.state.business_hours_status
          )
      )
    }
  }

  handleToggleData = (e, val) => {
    const url = 'widget/update-widget-business-hours-status'
    this.setState({
      ...this.state,
      business_hours_status: val.checked,
      firstRun: false
    })
    updateHourStatus(val.checked, this.props.widget.id, url)
      .then(res => {})
      .catch(err => console.error(err))
  }

  selectTimeZone = e => {
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
          if (error) {
            console.error(error)
          }
        })
    } else {
      console.log('Please select a Timezone... ')
    }
  }

  getTimeZone = () => {
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

  render() {
    const { business_hours_status } = this.state
    const widget_id = localStorage.getItem('widget_id')
    const URL = {
      get: `widget/${widget_id}/working-hours`,
      post: `widget/${widget_id}/working-hours`,
      delete: `widget/${widget_id}/working-hours`
    }
    const content = {
      header:<span className='widget-sub-heading'>Set office hours</span>,
      p:
        <div className="subtitle">If a prospect tries to contact you outside of your office hours, the widget will show them a scheduled callback option instead.</div>
    }
    return (
      <>
        <div style={{ display: 'flex', alignContent: 'center', marginLeft: '100px', marginBottom: '10px'}} className='time-zone-block-container'>
            <p  style={{marginRight:'20px', fontWeight:'700', color: '#6b5e5e', fontSize:'16px', display: 'flex'}}> Timezone </p>{' '}
          <div className="timezone-picker">
            <TimezonePicker
              value={this.state.selectedTimeZone}
              onChange={this.selectTimeZone}
              inputProps={{
                placeholder: 'Select Timezone...',
                name: 'timezone'
              }}
            />{' '}
          </div>{' '}
        </div>{' '}
        <div className="availability-toggle">
          <Radio
            toggle
            checked={business_hours_status}
            onChange={this.handleToggleData}
          />
          <p>
            Set your company's business hours to let your customers know about your availability.
          </p>
        </div>
        {business_hours_status ? (
          <div className="widget-availability-main">
            <BusinessCommonWorkingHour
              content={content}
              loading={this.props.loading}
              isWidgets={false}
              URL={URL}
            />
          </div>
        ) : null}
      </>
    )
  }
}
