import React, { Component } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

import moment from 'moment'
import CardBox from '../../common/CardBox'

import message from '../../assets/images/message.png'
import phone from '../../assets/images/Dashboard-11.png'
import clock from '../../assets/images/Dashboard-13.png'
import LeadSVG from '../../assets/images/lead-home.png';
import MissedSVG from '../../assets/images/missed-home.png';

import axios from 'axios'
import { getSubscription } from '../../config/subscription'

let callData = {
  totalCall: 0,
  maxCall: 10,
  maxSms: 10,
  callUsed: 0,
  smsUsed: 0,
  totalCallToday: 0,
  totalMsgToday: 0,
  totalScheduleCall: 0,
  startDate: '',
  all_calls: 0,
  schedule_calls: 20
}

let cardboxData = [
  {
    type: 'monthlyUsage',
    cardImage: phone,
    title: 'INBOUND CALLS',
    cardNum: 0,
    callDate: `${callData.startDate}`
  },
  {
    type: 'sms_usages',
    cardImage: clock,
    cardNum: 0,
    cardDescription: 'SCHEDULED MEETINGS'
  },
  {
    type: 'contenttext',
    cardImage: LeadSVG,
    cardNum: 0,
    cardDescription: 'UNASSIGNED LEADS'
  },
  {
    type: 'contenttext',
    cardImage: MissedSVG,
    cardNum: 0,
    cardDescription: 'MISSED CALLS'
  }
]

export default class HomeContent extends Component {
  state = {
    filterTable: {
      type: null,
      newData : cardboxData,
      startDateFilter: new Date().toLocaleDateString(),
      endDateFilter: new Date().toLocaleDateString(),
      status: null,
      id: null,
      search: null
    },
    cardboxState: cardboxData
  }

  componentWillReceiveProps = nextProps => {
    let { cardboxState } = this.state;
    cardboxState[0].cardNum = nextProps.callData && nextProps.callData.all_calls
    cardboxState[1].cardNum = nextProps.callData && nextProps.callData.schedule_calls
    cardboxState[2].cardNum = nextProps.callData && nextProps.callData.unassigned_leads
    cardboxState[3].cardNum = nextProps.callData && nextProps.callData.missed_calls


    this.setState({
      ...this.state,
      cardboxState
    })
  }
  
  fetchCallToday = () => {
    const apiToken = localStorage.getItem('access_token')
    this.props.loading(true)
    let head = {
      headers: {
        Authorization: 'Bearer ' + apiToken
      }
    }
    const url = `${process.env.REACT_APP_BASE_APP_URL}/api/v1/leads/get-today-status`

    axios
      .get(url, head)
      .then(res => {
        if (res.data.data) {
          this.props.loading(false)
          callData.totalScheduleCall = res.data.data.today_upcoming_calls

          cardboxData[3].cardNum = callData.totalScheduleCall
          this.setState({ cardboxState: cardboxData })
        }
      })
      .catch(err => {
        this.props.loading(false)       
      })
  }

  componentDidMount = () => {
    this.fetchCallToday()
    this.getCurrentSubcsription()
  }

  getCurrentSubcsription = () => {
    var today = new Date()
    var dd = String(today.getDate()).padStart(2, '0')
    var mm = String(today.getMonth() + 1).padStart(2, '0') //January is 0!
    var yyyy = today.getFullYear()

    today = dd + '/' + mm + '/' + yyyy
    var thisMonth = '01' + '/' + mm + '/' + yyyy
    cardboxData[0].callDate = `${thisMonth} - ${today}`
    this.setState({ cardboxState: cardboxData })
  }

  handleStartDate = date => {
    const { filterTable } = this.state

    this.setState({
      filterTable: {
        startDateFilter: date,
        endDateFilter: filterTable.endDateFilter
      }
    })
  }

  handleEndDate = date => {
    const { filterTable } = this.state

    this.setState({
      filterTable: {
        startDateFilter: filterTable.startDateFilter,
        endDateFilter: date
      }
    })
  }

  render() {
    const { date } = this.props
    const { filterTable } = this.state
    return (
      <div className="cardbox-wrapper deatil_box">
        {this.state.cardboxState.map((item, i) => {
          return (
            <CardBox
              key={i}
              cardContent={item}
              filterTable={filterTable}
              date={date}
            />
          )
        })}
      </div>
    )
  }
}
