import React, { Component } from 'react'
import { Tab, Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { Dimmer, Loader } from 'semantic-ui-react'

import Title from '../common/Title'
import leadLogo from '../assets/images/lead-logo.svg'
import CallerIdMeets from '../components/meets/CallerIdMeets'
import CallerIdMeetsYours from '../components/meets/CallerIdMeetsYours'

import CommonSelect from '../common/CommonSelect'
import CommonInput from '../common/CommonInput'
import CommonButton from '../common/CommonButtons'

import iconSet from '../assets/images/Dashboard 2-05.png'
import circlePlus from '../assets/images/cicle-plus.png'
import deleteIcon from '../assets/images/delete-icon.png'
import { TimeInput } from 'semantic-ui-calendar-react'
import axios from 'axios'
import { CommonNotify } from '../common/CommonNotify'
import DatePicker from 'react-date-picker'
import moment from 'moment'

const apiToken = localStorage.getItem('access_token')

const DropDown = ({ selectedValue, disabled, options, onChange }) => {
  return (
    <select onChange={onChange} disabled={disabled}>
      {options.map(o => (
        <option value={o} selected={o == selectedValue}>
          {o}
        </option>
      ))}
    </select>
  )
}

class Meets extends Component {
  constructor(props) {
    super(props)
    this.state = {
      numbers: [
        'Now',
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday'
      ], // 3 should disable the second dropdown
      names: ['john', 'jane', 'eric'],
      selectedNumber: 'Now',
      selectedName: '',
      fromTime: '',
      setOfficeHour2: {
        addOfficeHour2: '',
        link: 'Link',
        officeHourFrom: '',
        officeHourTo: ''
      },
      addOfficeHour2: [1],
      activeIndex: 0,
      countryInfo: {},
      date: new Date(),
      currentDate: new Date(),
      nameOfCaller: '',
      isLoading: false
    }

    // this.onNumbersChange = this.onNumbersChange.bind(this)
    // this.onNamesChange = this.onNamesChange.bind(this)
  }

  onNumbersChange(e) {
    this.setState({ selectedNumber: e.target.value })
  }

  onNamesChange(e) {
    this.setState({ selectedName: e.target.value })
  }

  onChangeCountry = (value, country) => {
    this.setState({ numberAppNumber: value, countryInfo: country })
  }

  handleRangeChange = e => this.setState({ activeIndex: e.target.value })
  handleTabChange = (e, { activeIndex }) => this.setState({ activeIndex })

  cloneSetHoursWrapper2 = () => {
    const currentDiv2 = this.state.addOfficeHour2
    currentDiv2.push(1)
    this.setState({ addOfficeHour2: currentDiv2 })
  }

  onClickAddOfficeHour2 = () => {
    const { setOfficeHour2 } = this.state
    const link = this.state.setOfficeHour2.link
    const officeHourFrom = this.state.setOfficeHour2.officeHourFrom
    const officeHourTo = this.state.setOfficeHour2.officeHourTo
    const addOfficeHour2 = 'addOfficeHour2'
    const addOfficeHourItem2 = link + ' ' + officeHourFrom + ' ' + officeHourTo

    setOfficeHour2[addOfficeHour2] = addOfficeHourItem2

    this.setState({ setOfficeHour2 })

    this.cloneSetHoursWrapper2()
  }

  onClickRemoveOfficeHours2 = () => {
    const currentDiv2 = this.state.addOfficeHour2
    currentDiv2.pop()
    this.setState({ addOfficeHour2: currentDiv2 })
  }

  handleChange = (event, { name, value }) => {
    if (this.state.hasOwnProperty(name)) {
      this.setState({ [name]: value })
    }
  }

  onChangeInput = e => {
    this.setState({ nameOfCaller: e.target.value })
  }
  setDate = (date, e) => {
    this.setState({
      date: date
    })
  }
  startCall = () => {
    let head = {
      headers: {
        Authorization: 'Bearer ' + apiToken
      }
    }
    const data = {
      phone: this.state.numberAppNumber,
      date: moment(this.state.date).format('YYYY-MM-DD'),
      time: this.state.fromTime,
      country_code: this.state.countryInfo.dialCode
    }
    this.setState({ isLoading: true })
    const url = `${process.env.REACT_APP_BASE_APP_URL}/api/v1/leads/dial-customer`
    axios
      .post(url, data, head)
      .then(res => {
        if (res.data.message == 'Successfully') {
          this.setState({ isLoading: false })
          CommonNotify('Successfully', 'success')
        }
      })
      .catch(error => {
        const errors = { ...error }.response.data.errors[0]
        CommonNotify(errors, 'error')
        this.setState({ isLoading: false })
      })
  }

  tabSetting = () => {
    const { activeIndex, numbers, selectedNumber } = this.state
    const panes = [
      {
        menuItem: {
          key: 'phone',
          icon: 'phone',
          content: 'Phone'
        },
        render: () => (
          <Tab.Pane attached={false}>
            <div className="meet-holder-item">
              {/* <h2 className="default-text">No Phone Number Connected</h2> */}
              <p className="meet-head-title">
                You need to setup your phone number before you can make calls.
              </p>
              {/* <Link to="settings">Setup your phone number</Link> */}
              <p className="callerID-title">Recipient number</p>
              <CallerIdMeets
                onChange={(value, country) =>
                  this.onChangeCountry(value, country)
                }
                value={this.state.numberAppNumber}
                defaultCountry={'us'}
              />
              <div className="meet-time-holder">
                <div className="meet-time-title">
                  <p>Time of Call</p>
                </div>
                <div className="meet-time">
                  <div className="meet-dropdown-select">
                    <DatePicker
                      onChange={(date, e) => this.setDate(date, e)}
                      value={this.state.date}
                      format="y-MM-dd"
                      minDate={new Date()}
                    />
                    {/* <DropDown
                      className="selection"
                      options={numbers}
                      selectedValue={selectedNumber}
                      onChange={this.onNumbersChange}
                    />
                    <Icon name="dropdown" /> */}
                  </div>
                </div>
                <div className="meet-time">
                  <TimeInput
                    name="fromTime"
                    placeholder="00:00"
                    inlineLabel={true}
                    value={this.state.fromTime}
                    icon={false}
                    onChange={this.handleChange}
                    disabled={
                      this.state.date === this.state.currentDate ? true : false
                    }
                  />
                </div>
                <div className="meet-name">
                  <CommonInput
                    onChange={this.onChangeInput}
                    name="widgetName"
                    type="text"
                    placeholder="Name of Call"
                  />
                </div>
                <div className="meet-btn">
                  <button className="btn-save" onClick={() => this.startCall()}>
                    Start Call
                  </button>
                </div>
              </div>
            </div>
          </Tab.Pane>
        )
      }
      //   {
      //   menuItem: {
      //     key: 'linkify',
      //     icon: 'linkify',
      //     content: 'Conference'
      //   },
      //   render: () => (
      //     <Tab.Pane attached={false}>
      //       <div className="meet-holder-item">
      //         <p className="meet-head-title">
      //           Two easy ways to next meeting to your conference calls
      //         </p>
      //         {/* <div className="meet-conference-holder">
      //         <div className="meet-conference-item">
      //           <h2 className="default-text">Connect your calendar</h2>
      //           <p>Your calendar is connected. View your upcoming meetings and switch Notiv on for the meetings you want recorded.</p>
      //         </div>
      //         <div className="meet-conference-item">
      //           <h2 className="default-text">Next meeting as an attendee</h2>
      //           <p>Add meet@notiv.com as an attendee when setting up your event. Notiv will join and record your call when it starts.</p>
      //         </div>
      //       </div> */}
      //         <p className="callerID-title">Recipient number</p>
      //         {this.state.addOfficeHour2.map((data, index) => {
      //           return (
      //             <div key={index} className="meet-tab">
      //               <CallerIdMeets
      //                 onChange={(value, country) =>
      //                   this.onChangeCountry(value, country)
      //                 }
      //                 value={this.state.numberAppNumber}
      //                 defaultCountry={'us'}
      //               />
      //               {index !== 0 ? (
      //                 <CommonButton
      //                   onClick={this.onClickRemoveOfficeHours2}
      //                   disabled={index === 0 ? 'disabled' : ''}
      //                   btnClass="btn-delete"
      //                   image={deleteIcon}
      //                 />
      //               ) : null}
      //             </div>
      //           )
      //         })}
      //         <CommonButton
      //           onClick={this.onClickAddOfficeHour2}
      //           content="add recipient"
      //           btnClass="btn-hours"
      //           image={circlePlus}
      //         />
      //         <div className="meet-time-holder">
      //           <div className="meet-time-title">
      //             <p>Time of Call</p>
      //           </div>
      //           <div className="meet-time">
      //             <div className="meet-dropdown-select">
      //               <DropDown
      //                 className="selection"
      //                 options={numbers}
      //                 selectedValue={selectedNumber}
      //                 onChange={this.onNumbersChange}
      //               />
      //               <Icon name="dropdown" />
      //             </div>
      //           </div>
      //           <div className="meet-time">
      //             <TimeInput
      //               name="fromTime"
      //               placeholder="00:00"
      //               inlineLabel={true}
      //               value={this.state.fromTime}
      //               icon={false}
      //               onChange={this.handleChange}
      //               disabled={selectedNumber === 'Now'}
      //             />
      //           </div>
      //           <div className="meet-name">
      //             <CommonInput
      //               onChange={this.onChangeInput}
      //               name="widgetName"
      //               type="text"
      //               placeholder="Name of Call"
      //             />
      //           </div>
      //           <div className="meet-btn">
      //             <button className="btn-save">Start Call</button>
      //           </div>
      //         </div>
      //       </div>
      //     </Tab.Pane>
      //   )
      // }
    ]
    return panes
  }
  tabExampleSecondary = () => {
    return (
      <Tab
        menu={{ secondary: true }}
        panes={this.tabSetting()}
        activeIndex={this.state.activeIndex}
        onTabChange={this.handleTabChange}
      />
    )
  }

  render() {
    const title = {
      type: 'image',
      titleOne: leadLogo,
      titleTwo: 'Meets'
    }
    const { activeIndex, numbers, selectedNumber } = this.state
    return (
      <div className="meet-container">
        <Dimmer active={this.state.isLoading} style={{ position: 'fixed' }}>
          <Loader />
        </Dimmer>
        <Title data={title} />
        <div className="meet-holder">
          <div className="meet-title-holder">
            <p>Start your meeting instantly</p>
            <p>Meeting type</p>
          </div>
        </div>
        {this.tabExampleSecondary()}
      </div>
    )
  }
}

export default Meets
