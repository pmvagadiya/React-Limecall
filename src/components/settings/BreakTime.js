import moment from 'moment'
import React, { Component } from 'react'
import TimePicker from 'rc-time-picker'
import { Checkbox, Dropdown, Label, Table } from 'semantic-ui-react'

import deleteIcon from '../../assets/images/delete-icon.png'
import CommonButtons from '../../common/CommonButtons'
import { CommonNotify } from '../../common/CommonNotify'
import {
  _deleteBreakTime,
  _getBreakHour,
  _postBreakTime
} from '../../api/breakHourAPI'

const weekDays = [
  {
    key: 1,
    text: 'Monday',
    value: 15,
    from: '01:00 pm',
    to: '02:00 pm',
    disableHours: [],
    child: []
  },
  {
    key: 2,
    text: 'Tuesday',
    value: 16,
    from: '01:00 pm',
    to: '02:00 pm',
    child: []
  },
  {
    key: 3,
    text: 'Wednesday',
    value: 17,
    from: '01:00 pm',
    to: '02:00 pm',
    child: []
  },
  {
    key: 4,
    text: 'Thursday',
    value: 18,
    from: '01:00 pm',
    to: '02:00 pm',
    child: []
  },
  {
    key: 5,
    text: 'Friday',
    value: 19,
    from: '0:00 pm',
    to: '02:00 pm',
    child: []
  },
  {
    key: 6,
    text: 'Saturday',
    value: 20,
    from: '01:00 pm',
    to: '02:00 pm',
    child: []
  },
  {
    key: 7,
    text: 'Sunday',
    value: 21,
    from: '01:00 pm',
    to: '02:00 pm',
    child: []
  }
]

class BreakTime extends Component {
  state = {
    weekDays: weekDays,
    breakHourData: [],
    break_to: moment('12:00 PM', 'h:mm a'),
    break_from: moment('01:00 PM', 'h:mm a')
  }

  componentDidMount() {
    this.fetchBreakHours()
  }

  fetchBreakHours = () => {
    const { weekDays } = this.state
    this.props.loading(true)
    _getBreakHour()
      .then(res => {
        this.props.loading(false)
        this.beforePostData(res.data, 'name')
      })
      .catch(err => {
        //console.log(err.message)
      })
  }
  groupBy(arr, prop) {
    const map = new Map(Array.from(arr, obj => [obj[prop], []]))
    arr.forEach(obj => map.get(obj[prop]).push(obj))
    const groupd = Array.from(map.values())
    return groupd.map(res => {
      return { key: res[0][prop], children: res }
    })
  }

  onDeleteBreakTime = id => {
    this.props.loading(true)
    _deleteBreakTime(id)
      .then(res => {
        this.fetchBreakHours()
        CommonNotify('Break Time Deleted Successfully', 'success')
      })
      .catch(err => {       
        CommonNotify('Not able to Delete Break Time')
      })
  }

  onChangeTimePicker = (time, type, day, index, weekIndex, value) => {
    const { weekDays } = this.state
    day.child[index][type] = time.format('hh:mm a')
    weekDays[weekIndex] = day
    this.setState({
      ...this.state,
      weekDays
    })
    const break_from = day.child[index].break_from
    const break_to = day.child[index].break_to

    const body = {
      day_ids: [value],
      from: break_from,
      to: break_to
    }

    _postBreakTime(body)
      .then(res => {
        console.log(res)
      })
      .catch(err => {
        console.log(err)
      })
  }

  onPostBreakTime = (day, weekIndex) => {
    this.props.loading(true)
    const { weekDays } = this.state

    const from = weekDays[weekIndex].from
    const to = weekDays[weekIndex].to

    const body = {
      day_ids: [day.value],
      from: from,
      to: to
    }
    _postBreakTime(body)
      .then(res => {
        this.props.loading(false)
        const { message } = res

        if (message?.error?.length) {
          return CommonNotify(message?.error[0])
        }
        this.beforePostData(res.data, 'day_name')
      })
      .catch(err => {
        this.props.loading(false)

        const { errors } = err.response.data
        CommonNotify(errors?.[0])
      })
  }

  beforePostData = (postData, feild) => {
    const { weekDays } = this.state
    const data = this.groupBy(postData, feild)
    const finalData = weekDays.map(week => {
      const aa = data.filter(obj => {
        return week.text === obj.key
      })

      const hour = aa[0]?.children.forEach(child => {
        const from = moment(child.break_from, 'hh:mm').format('hh')
        const to = moment(child.break_to, 'hh:mm').format('hh')

        // const fromIndex = week.disableHours.findIndex(from)

        // const toIndex = week.disableHours.findIndex(to)

        // if (fromIndex) {
        //   week.disableHours.push(from)
        // }
        // if (toIndex) {
        //   week.disableHours.push(to)
        // }
        return week
      })

      week.child = aa[0]?.children ? aa[0].children : []
      return week
    })
    this.setState({
      ...this.state,
      breakHourData: postData,
      weekDays: finalData
    })
  }

  onWeekDayTimePicker = (time, type, day, weekIndex) => {
    const { weekDays } = this.state

    weekDays[weekIndex][type] = time.format('hh:mm a')

    this.setState({
      ...this.state,
      weekDays
    })
  }

  render() {
    const { weekDays } = this.state
    return (
      <>
        <div className="business_hours_main ">
          <div className="working-hours-wrapper availability-block break-section">
            <p className="availability-title">When you on break?</p>
            <p>Decide when you want to take a break everyday?</p>

            <div className="break-time-wrapper">
              {weekDays.map((day, weekIndex) => {
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
                      <Label
                        className={`${
                          day.value === 21
                            ? 'lable_disable'
                            : day.value === 20
                            ? 'lable_disable'
                            : ''
                        }`}
                      >
                        {day.text}
                      </Label>
                    </div>

                    <div className="right-side-break">
                      {day.value === 21 ? (
                        <div className="non_working_day">Non working Day</div>
                      ) : day.value === 20 ? (
                        <div className="non_working_day">Non working Day</div>
                      ) : (
                        <div className="time-zone">
                          <TimePicker
                            showSecond={false}
                            className="xxx"
                            minuteStep={5}
                            onChange={e =>
                              this.onWeekDayTimePicker(
                                e,
                                'from',
                                day,
                                weekIndex
                              )
                            }
                            value={moment(`${day.from}`, 'hh:mm a')}
                            inputReadOnly
                          />

                          <span className="break-time-span">To</span>
                          <TimePicker
                            showSecond={false}
                            className="xxx"
                            minuteStep={5}
                            value={moment(`${day.to}`, 'hh:mm a')}
                            onChange={e =>
                              this.onWeekDayTimePicker(e, 'to', day, weekIndex)
                            }
                            inputReadOnly
                          />

                          <p
                            className="add-Break-text"
                            onClick={e => this.onPostBreakTime(day, weekIndex)}
                          >
                            +Break
                          </p>
                        </div>
                      )}
                      <div className="Break-point">
                        {day?.child?.map((data, index) => {
                          return (
                            <div className="add-breck-main">
                              <TimePicker
                                showSecond={false}
                                value={moment(`${data.break_from}`, 'hh:mm a')}
                                className="xxx"
                                onChange={this.onChange}
                                minuteStep={5}
                                onChange={e =>
                                  this.onChangeTimePicker(
                                    e,
                                    'break_from',
                                    day,
                                    index,
                                    weekIndex,
                                    day.value
                                  )
                                }
                                inputReadOnly
                                disabled={true}
                              />

                              <span className="break-time-span">To</span>
                              <TimePicker
                                showSecond={false}
                                value={moment(`${data.break_to}`, 'hh:mm a')}
                                className="xxx"
                                onChange={this.onChange}
                                minuteStep={5}
                                onChange={e =>
                                  this.onChangeTimePicker(
                                    e,
                                    'break_to',
                                    day,
                                    index,
                                    weekIndex
                                  )
                                }
                                inputReadOnly
                                disabled={true}
                              />
                              <CommonButtons
                                btnClass="btn-delete"
                                image={deleteIcon}
                                onClick={e => this.onDeleteBreakTime(data.id)}
                              />
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default BreakTime
