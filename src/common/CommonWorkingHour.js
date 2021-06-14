import React, { Component } from 'react'
import moment from 'moment'
import TimePicker from 'rc-time-picker'
import { Label, Radio } from 'semantic-ui-react'

import {
  _getAvailabilityHour,
  _deleteAvailabilityTime,
  _postAvailabilityTime
} from '../api/availabilityHourAPI'
import CommonButtons from './CommonButtons'
import { CommonNotify } from './CommonNotify'
import updateHourStatus from '../config/togglehoursStatus'

const weekDays = [
  {
    key: 1,
    text: 'Monday',
    value: 15,
    from: '01:00 pm',
    to: '02:00 pm',
    isDayOff: false,
    isApplyToAll: true,
    fromOpen: false,
    toOpen: false
  },
  {
    key: 2,
    text: 'Tuesday',
    value: 16,
    from: '01:00 pm',
    to: '02:00 pm',
    isDayOff: false,
    isApplyToAll: false,
    fromOpen: false,
    toOpen: false
  },
  {
    key: 3,
    text: 'Wednesday',
    value: 17,
    from: '01:00 pm',
    to: '02:00 pm',
    isDayOff: false,
    isApplyToAll: false,
    fromOpen: false,
    toOpen: false
  },
  {
    key: 4,
    text: 'Thursday',
    value: 18,
    from: '01:00 pm',
    to: '02:00 pm',
    isDayOff: false,
    isApplyToAll: false,
    fromOpen: false,
    toOpen: false
  },
  {
    key: 5,
    text: 'Friday',
    value: 19,
    from: '01:00 pm',
    to: '02:00 pm',
    isDayOff: false,
    isApplyToAll: false,
    fromOpen: false,
    toOpen: false
  },
  {
    key: 6,
    text: 'Saturday',
    value: 20,
    from: '01:00 pm',
    to: '02:00 pm',
    isDayOff: false,
    isApplyToAll: false,
    fromOpen: false,
    toOpen: false
  },
  {
    key: 7,
    text: 'Sunday',
    value: 21,
    from: '01:00 pm',
    to: '02:00 pm',
    isDayOff: false,
    isApplyToAll: false,
    fromOpen: false,
    toOpen: false
  }
]

class CommonWorkingHour extends Component {
  state = {
    activeToggle: false,
    working_from: '',
    working_to: '',
    day_name: '',
    day_id: '',
    time_zone: '',
    isLoading: false,
    javaScriptSnippet: false,
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
    saveBtnDisable: [],
    saveBtnLoading: false,
    isApplyToAll: false
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
  handleToggleData = toggleData => {
    updateHourStatus(toggleData, this.props.widget.id)
      .then(res => {
        if (res.data.data.length) {
          this.setState({
            javaScriptSnippet: toggleData
          })
        }
      })
      .catch(err => console.error('error-msg', err))
  }
  handleToggleDataBranding = toggleData => {
    if (toggleData) {
      this.setState({
        isBranding: true
      })
    }
  }

  componentDidMount() {
    this.fetchAvailabilityHour()
  }

  // Used for fetch all the availablity hours
  fetchAvailabilityHour = () => {
    this.props.loading(true)
    _getAvailabilityHour(this.props.URL.get)
      .then(res => {
        this.beforeFetch(res.data)
        this.props.loading(false)
      })
      .catch(err => {
        this.props.loading(false)       
      })
  }

  beforeFetch = data => {
    const { days } = this.state
    var first = true
    data.map(obj => {
      days.map(day => {
        if (day.text !== obj.day_name) {
          delete day.id
        }
        return day
      })
    })
    data.map(obj => {
      days.map((day, index) => {
        if (day.text === obj.day_name) {
          days[index].isDayOff = true
          day.from = obj.working_from
          day.to = obj.working_to
          day.id = obj.id
          return first
            ? ((day.isApplyToAll = true), (first = false))
            : (day.isApplyToAll = false)
        }
        return day
      })
    })

    this.setState({
      ...this.state,
      days: days
    })
  }

  onIsDayOffChange = (e, val, day, index) => {
    const days = [...this.state.days]
    const { saveBtnDisable } = this.state
    days[index].isDayOff = val.checked

    if (days.some(day => day.isDayOff)) {
      days
        .filter(day => {
          return day.isDayOff === true
        })
        .map(obj => {
          obj.isApplyToAll = false
          return obj
        })
        .find(data => {
          return data.isDayOff === true
        }).isApplyToAll = true
    }

    if (day?.id && !day.isDayOff) this.onDeleteAvailabilityTime(day?.id)

    if (val.checked) {
      saveBtnDisable.push(index)
    } else {
      const index = saveBtnDisable.indexOf(5)
      saveBtnDisable.splice(index, 1)
    }
    this.setState({
      ...this.state,
      days,
      saveBtnDisable
    })
  }

  onDeleteAvailabilityTime = id => {
    this.props.loading(true)
    _deleteAvailabilityTime(this.props.URL.delete, id)
      .then(() => {
        this.fetchAvailabilityHour()
        CommonNotify('Working hour Deleted', 'success')
      })
      .catch(err => {
        this.props.loading(false)
        // CommonNotify('Not able to delete working hour')
      })
  }

  onAvailabilityTimeHandler = (time, type, openType, weekIndex) => {
    const { days } = this.state

    if(time)
    {
    const timeDifference = Math.abs(
      time.diff(moment(days[weekIndex][type], 'HH:mm'))
    )

    if (
      timeDifference < moment.duration(1, 'hour') &&
      timeDifference >= moment.duration(1, 'minute')
    ) {
      days[weekIndex][openType] = false
      this.setOpen({ ...this.state, days }) // close the dropdown
    }
  }
    if (time) {
      weekDays[weekIndex][type] = time?.format('HH:mm')

      this.setState({
        ...this.state,
        weekDays,
        saveBtnDisable: [],
        isApplyToAll: true
      })
    } else {
      if (type === 'from') weekDays[weekIndex][type] = '00:00'
      else weekDays[weekIndex][type] = '23:59'

      this.setState({
        ...this.state,
        weekDays,
        saveBtnDisable: [],
        isApplyToAll: true
      })
    }
  }

  //Invoke when click on 'Apply to all' btn
  applyToAllHandler = data => {
    const { days } = this.state

    days.map(day => {
      return (day.from = data.from), (day.to = data.to)
    })
    this.setState({
      ...this.state,
      days,
      isApplyToAll: true
    })
  }

  onSaveBtnLoader(value) {
    const { saveBtnLoading } = this.state
    this.setState({
      ...this.state,
      saveBtnLoading: value
    })
  }
  // Used for to post workig hour
  onPostWorkingHours = () => {
    const { days } = this.state
    this.onSaveBtnLoader(true)
    const fordata = new FormData()
    var isCallAPI = true

    for (let index = 0; index < days.length; index++) {
      if (days[index].from > days[index].to) {
        isCallAPI = false
        CommonNotify('End time should be greater than Start time.')
        this.onSaveBtnLoader(false)
        break
      }

      days[index].isDayOff &&
        fordata.append(
          `day_ids[${days[index].value}]`,
          `${days[index].from}-${days[index].to}`
        )
        fordata.append('time_zone',this.props.timeZone)
    }

    if (isCallAPI) {
      _postAvailabilityTime(this.props.URL.post, fordata)
        .then(res => {
          this.onSaveBtnLoader(false)
          this.beforeFetch(res.data)
          CommonNotify('Working Hour Saved Successfully', 'success')
        })
        .catch(err => {
          this.onSaveBtnLoader(false)         
        })
    }
  }

  setOpen = (a, b, type, index) => {
    const { days } = this.state
    if (a?.open) {
      days[index][type] = true
      this.setState({
        ...this.state,
        days
      })
    }
  }

  render() {
    const { days, saveBtnDisable, saveBtnLoading, isApplyToAll } = this.state

    return (
      <>
        <div>
          <div className="business_hours_main">
            <div className="working-hours-wrapper availability-block break-section">
              <p className="availability-title">{this.props.content.header}</p>
              <p>{this.props.content.p}</p>

              <div className="break-time-wrapper">
                {days.map((day, weekIndex) => {
                  return (
                    <div
                      key={weekIndex}
                      className={`break-time-content ${
                        day.value === 21
                          ? 'disable_content'
                          : day.value === 20
                          ? 'disable_content'
                          : ''
                      }`}
                    >
                      <div className="lable_wrapper">
                        <Label content={day.text} />
                      </div>

                      <div className="right-side-break">
                        <div className="time-zone">
                          <Radio
                            toggle
                            checked={day.isDayOff}
                            defaultChecked={day.isDayOff}
                            onChange={(e, val) =>
                              this.onIsDayOffChange(e, val, day, weekIndex)
                            }
                          />
                          {day.isDayOff ? (
                            <>
                              <TimePicker
                                // open={day.fromOpen}
                                onOpen={e =>
                                  this.setOpen(e, day, 'fromOpen', weekIndex)
                                }
                                // closeOnSelect
                                showSecond={false}
                                className="xxx"
                                minuteStep={5}
                                inputReadOnly
                                onChange={e =>
                                  this.onAvailabilityTimeHandler(
                                    e,
                                    'from',
                                    'fromOpen',
                                    weekIndex
                                  )
                                }
                                value={moment(`${day.from}`, 'HH:mm')}
                              />
                              <span className="time-frame-span">To</span>
                              <TimePicker
                                // open={day.toOpen}
                                onOpen={e =>
                                  this.setOpen(e, day, 'toOpen', weekIndex)
                                }
                                showSecond={false}
                                className="xxx"
                                minuteStep={5}
                                value={moment(`${day.to}`, 'HH:mm')}
                                inputReadOnly
                                onChange={e =>
                                  this.onAvailabilityTimeHandler(
                                    e,
                                    'to',
                                    'toOpen',
                                    weekIndex
                                  )
                                }
                              />
                              {day.isApplyToAll && (
                                <p
                                  className="add-Break-text"
                                  onClick={e => this.applyToAllHandler(day)}
                                >
                                  Apply to all
                                </p>
                              )}
                            </>
                          ) : (
                            <p className="day-off">Day Off</p>
                          )}
                        </div>
                      </div>
                    </div>
                  )
                })}
                <div className="availability-action-btn">
                  <CommonButtons
                    content="Save"
                    // disabled={!saveBtnDisable.length && !isApplyToAll}
                    background="blue"
                    loading={saveBtnLoading}
                    onClick={this.onPostWorkingHours}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default CommonWorkingHour
