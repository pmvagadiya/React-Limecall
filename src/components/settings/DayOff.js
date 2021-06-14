import moment from 'moment'
import React, { Component } from 'react'
import { DateInput } from 'semantic-ui-calendar-react'
import { Dropdown, Input, Table } from 'semantic-ui-react'
import {
  deleteMemberDayOff,
  getMemberDayOff,
  setMemberDaysOff
} from '../../api/dayOffAPI'
import deleteIcon from '../../assets/images/delete-icon.png'
import CommonButtons from '../../common/CommonButtons'
import { CommonNotify } from '../../common/CommonNotify'

// const repeatOption = [
//   {
//     key: 1,
//     text: 'Repeat',
//     value: 1
//   },
//   {
//     key: 0,
//     text: 'No Repeat',
//     value: 0
//   }
// ]

class DayOff extends Component {
  state = {
    dayOff_from: '',
    dayOff_to: '',
    isDayOff: false,
    dayOffData: [],
    isLoading: false,
    existDayOffDates: [],
    dayOffDates: [],
    isToggleOpen: false,
    notesValue : ''
  }

  componentDidMount() {
    this._fetchMemberDayOff()
  }

  isLoading = bool => {
    this.setState({
      ...this.state,
      isLoading: bool
    })
  }

  _fetchMemberDayOff = () => {
    this.props.loading(true)
    getMemberDayOff()
      .then(res => {
        this.props.loading(false)
        this.alreadyAddedDayOffDates(res.data)
        this.setState({
          dayOffData: res.data
        })
      })
      .catch(err => {
        this.props.loading(false)    
      })
  }

  onDateChangeHandler = (e, date, dateType) => {
    this.setState({
      ...this.state,
      [dateType]: date.value
    })
  }

  onToggleChange = async value => {
    this.props.loading(true)
    const { dayOff_from, dayOff_to } = this.state
    this.setState({
      ...this.state,
      isDayOff: true,
      isToggleOpen: true
    })
    if (!dayOff_from && !dayOff_to) {
      this.setState({
        ...this.state,
        isToggleOpen: false
      })
      this.props.loading(false)
      return CommonNotify('Please select Start and End date')
    }
    if (!dayOff_from) {
      this.setState({
        ...this.state,
        isToggleOpen: false
      })
      this.props.loading(false)
      return CommonNotify('Please select Start date')
    }
    if (!dayOff_to) {
      this.setState({
        ...this.state,
        isToggleOpen: false
      })
      this.props.loading(false)
      return CommonNotify('Please select End date')
      // return this.postDayOff([dayOff_from])
    }

    this.getAllDates().then(res => {
      if (res.length) this.postDayOff(res)
      else {
        CommonNotify('Please select Valid Dates')
        this.props.loading(false)
      }
    })
  }

  postDayOff = data => {
    const {notesValue} = this.state
    const body = {
      days_off: data,
      note : notesValue
    }
    setMemberDaysOff(body)
      .then(res => {
        this.setState({
          dayOff_to: null,
          dayOff_from: null,
          notesValue: '',
          dayOffDates: [],
          isDayOff: false,
          isToggleOpen: false
        })
        this._fetchMemberDayOff()
        CommonNotify('Day Off Added Successfully', 'success')
      })
      .catch(err => {
        this.props.loading(false)       
        CommonNotify('Not Able to Add Day off')
      })
  }

  onDeleteDayOff = id => {
    this.props.loading(true)
    deleteMemberDayOff(id)
      .then(res => {
        this._fetchMemberDayOff()
        CommonNotify('Day Off Delete Successfully', 'success')
      })
      .catch(err => {       
        this.props.loading(false)
        CommonNotify('Not able to Delete Day Off')
      })
  }

  alreadyAddedDayOffDates = dates => {
    const exitsDate = []
    dates.map(date => {
      return exitsDate.push(date?.day_off)
    })
    this.setState({
      ...this.state,
      existDayOffDates: exitsDate
    })
  }

  getDaysArray = (s, e) => {
    for (var a = [], d = new Date(s); d <= e; d.setDate(d.getDate() + 1)) {
      a.push(moment(new Date(d)).format('YYYY-MM-DD'))
    }
    return a
  }

  getAllDates = () => {
    return new Promise((resolve, reject) => {
      const { dayOff_to, dayOff_from } = this.state
      const allDates = this.getDaysArray(
        new Date(dayOff_from),
        new Date(dayOff_to)
      )
      this.setState({
        ...this.state,
        dayOffDates: allDates
      })
      resolve(allDates)
    })
  }

  disableTodayDate = () => {
    var startDate = new Date()
    var day = 60 * 60 * 24 * 1000
    var endDate = new Date(startDate.getTime() + day)
    return endDate
  }

  getNoteValue = async (e) => {
    const {value} = e.target;
    this.setState({notesValue : value})
  }

  render() {
    const {
      dayOff_from,
      dayOff_to,
      isToggleOpen,
      dayOffData,
      existDayOffDates
    } = this.state
    return (
      <>
        <div className="business_hours_main">
          <div className="working-hours-wrapper availability-block">
            <p className="availability-title">
              When you will take the day off?
            </p>
            <p>
              Decide when guests can book time on your calendar and how far in advance
            </p>

            <div className="hour_set_table table-responsive">
              <Table className="table-availability repeat-section">
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>Start</Table.HeaderCell>
                    <Table.HeaderCell>End</Table.HeaderCell>
                    {/* <Table.HeaderCell>Repeat</Table.HeaderCell> */}
                    <Table.HeaderCell>Notes</Table.HeaderCell>
                    <Table.HeaderCell>Action</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  <Table.Row>
                    <Table.Cell>
                      <DateInput
                        className="time-picker"
                        closable={true}
                        animation="fade"
                        placeholder="Start Date From"
                        minDate={this.disableTodayDate()}
                        disable={existDayOffDates}
                        dateFormat="YYYY-MM-DD"
                        clearable={true}
                        value={dayOff_from}
                        onChange={(e, date) =>
                          this.onDateChangeHandler(e, date, 'dayOff_from')
                        }
                      />
                    </Table.Cell>
                    <Table.Cell>
                      <DateInput
                        closable={true}
                        clearable={true}
                        animation="fade"
                        placeholder="End Date from"
                        minDate={dayOff_from || this.disableTodayDate()}
                        disable={existDayOffDates}
                        dateFormat="YYYY-MM-DD"
                        value={dayOff_to}
                        onChange={(e, date) =>
                          this.onDateChangeHandler(e, date, 'dayOff_to')
                        }
                      />
                    </Table.Cell>
                    {/* <Table.Cell className="repeat-section">
                      <Dropdown
                        options={repeatOption}
                        placeholder="Repeat"
                        fluid
                        search
                        selection
                      />
                    </Table.Cell> */}
                    <Table.Cell>
                      <Input value={this.state.notesValue} placeholder="Notes" onChange={this.getNoteValue} />
                    </Table.Cell>
                    <Table.Cell className="add_Hours">
                      <CommonButtons
                        content="Add"
                        background="blue"
                        onClick={this.onToggleChange.bind(this)}
                      />
                    </Table.Cell>
                  </Table.Row>
                </Table.Body>
              </Table>
            </div>
            <div className="day_set_table">
              <Table style={{ fontSize: '14px' }}>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>Day</Table.HeaderCell>
                    {/* <Table.HeaderCell>Repeat</Table.HeaderCell> */}
                    <Table.HeaderCell>Notes</Table.HeaderCell>
                    <Table.HeaderCell>Action</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {dayOffData?.map((data, index) => {
                    return (
                      <Table.Row key={index}>
                        <Table.Cell>{data?.day_off}</Table.Cell>
                        {/* <Table.Cell>No Repeat</Table.Cell> */}
                        <Table.Cell>{data.note}</Table.Cell>
                        <Table.Cell>
                          <CommonButtons
                            btnClass="btn-delete"
                            image={deleteIcon}
                            onClick={e => this.onDeleteDayOff(data.id)}
                          />
                        </Table.Cell>
                      </Table.Row>
                    )
                  })}
                </Table.Body>
              </Table>
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default DayOff
