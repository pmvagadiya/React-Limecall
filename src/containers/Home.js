import React, { Component } from 'react'

import Title from '../common/Title'
import HomeBanner from '../components/home/HomeBanner'
import HomeTrial from '../components/home/HomeTrial'
import HomeContent from '../components/home/HomeContent'
import ScheduleTable from '../components/home/ScheduleTable'
import ActivityChart from '../components/home/ActivityChart'
import HomeBottomSupport from '../components/home/HomeBottomSupport';
import CommonSubscriptionModal from '../common/CommonSubscriptionModal';
import ActivityBox from '../components/home/ActivityBox'
import CallChart from '../components/home/CallChart'
import DatePicker from 'react-date-picker'
import getWidget from '../config/getWidget'
import moment from 'moment'
import axios from 'axios'
import CommonDateRangePicker from '../components/daterangepicker/CommonDateRangePicker'
import { getSubscription } from '../config/subscription'

import { Dimmer, Icon, Loader, Dropdown } from 'semantic-ui-react'
import { functions } from 'lodash-es'
import { logOut } from  '../common/ProfileModal';

const options = [
  { key: 1, text: 'Today', value: 'Today' },
  { key: 2, text: 'Yesterday', value: 'Yesterday' },
  { key: 3, text: 'This week', value: 'This week' },
  { key: 4, text: 'Last week', value: 'Last week' },
  { key: 5, text: 'This month', value: 'This month' },
  { key: 6, text: 'Last month', value: 'Last month' },
  { key: 7, text: 'Custom range', value: 'Select custom' }
]

class Home extends Component {
  state = {
    subscriptionData: {
      tableContentData: [
        { ends: 0, max_calls: 0, calls_used: 0, max_sms: 0, sms_used: 0 }
      ]
    },
    phoneNumbers: null,
    showSubscriptionModal : false,
    pleaseUpgrade: '',
    plan_name : null,
    subscriptionModalVisibility: false,
    titleLine: '',
    upgradeLine: '',
    isTrial: false,
    trialDays: 0,
    isLoading: false,
    chartData: {},
    titleContent: {
      titleOne: 'Welcome Back, ' + localStorage.getItem('first_name')
    },
    visitor: {
      title: 'calls',
      legend: false,
      stepSize: '5',
      yAxes: false,
      padding: {
        top: '20',
        right: '80',
        bottom: '20',
        left: '50'
      },
      gridLines: false,
      fontSize: 16,
      fontStyle: '400',
      labels: [
        '3rd April',
        '6th April',
        '7th April',
        '8th April',
        '9th April',
        '10th April',
        '11th April'
      ],
      datasets: [
        {
          label: 'All Calls',
          fill: false,
          backgroundColor: 'rgba(249,166,9,1)',
          borderColor: 'rgba(249,166,9,1)',
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: 'rgba(249,166,9,1)',
          pointBackgroundColor: '#fff',
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: 'rgba(249,166,9,1)',
          pointHoverBorderColor: 'rgba(249,166,9,1)',
          pointHoverBorderWidth: 1,
          pointRadius: 0,
          pointHitRadius: 0,
          data: [3, 4, 5, 6, 7, 8, 15],
          options: {
            legend: {
              diplay: false
            },
            tooltips: {
              enabled: false
            }
          }
        }
      ]
    },

    data: {
      title: 'all activities',
      legend: true,
      stepSize: '10',
      yAxes: true,
      padding: {
        top: '0',
        right: '0',
        bottom: '0',
        left: '0'
      },
      fontSize: 14,
      fontStyle: '600',
      gridLines: true,
      labels: [
        '',
        '23/03/2019',
        '23/04/2019',
        '23/05/2019',
        '23/06/2019',
        '23/07/2019',
        '23/08/2019',
        '23/10/2019'
      ],
      datasets: [
        {
          label: 'All Calls',
          fill: false,
          backgroundColor: 'rgba(31,133,254,1)',
          borderColor: 'rgba(31,133,254,1)',
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: 'rgba(31,133,254,1)',
          pointBackgroundColor: '#fff',
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: 'rgba(31,133,254,1)',
          pointHoverBorderColor: 'rgba(31,133,254,1)',
          pointHoverBorderWidth: 1,
          pointRadius: 0,
          pointHitRadius: 0,
          data: [0, 2, 4, 5, 2, 1],
          options: {
            tooltips: {
              mode: 'point'
            }
          }
        },
        {
          label: 'Successful calls',
          fill: false,
          backgroundColor: 'rgba(41,128,2,1)',
          borderColor: 'rgba(41,128,2,1)',
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: 'rgba(41,128,2,1)',
          pointBackgroundColor: '#fff',
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: 'rgba(41,128,2,1)',
          pointHoverBorderColor: 'rgba(41,128,2,1)',
          pointHoverBorderWidth: 2,
          pointRadius: 0,
          pointHitRadius: 0,
          data: [0, 2, 5, 7, 5, 4, 8, 4]
        },
        {
          label: 'Unsuccessful call',
          fill: false,
          backgroundColor: 'rgba(102,102,102,1)',
          borderColor: 'rgba(102,102,102,1)',
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: 'rgba(102,102,102,1)',
          pointBackgroundColor: '#fff',
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: 'rgba(102,102,102,1)',
          pointHoverBorderColor: 'rgba(102,102,102,1)',
          pointHoverBorderWidth: 2,
          pointRadius: 0,
          pointHitRadius: 0,
          data: [0, 4, 5, 6, 7, 8]
        },
        {
          label: 'Calls from website',
          fill: false,
          backgroundColor: 'rgba(59,89,153,1)',
          borderColor: 'rgba(59,89,153,1)',
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: 'rgba(59,89,153,1)',
          pointBackgroundColor: '#fff',
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: 'rgba(59,89,153,1)',
          pointHoverBorderColor: 'rgba(59,89,153,1)',
          pointHoverBorderWidth: 2,
          pointRadius: 0,
          pointHitRadius: 0,
          data: [0, 1, 2, 3]
        },
        {
          label: 'Lorem Ipsum',
          fill: false,
          backgroundColor: 'rgba(249,166,9,1)',
          borderColor: 'rgba(249,166,9,1)',
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: 'rgba(249,166,9,1)',
          pointBackgroundColor: '#fff',
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: 'rgba(249,166,9,1)',
          pointHoverBorderColor: 'rgba(249,166,9,1)',
          pointHoverBorderWidth: 2,
          pointRadius: 0,
          pointHitRadius: 0,
          data: [0, 10, 3, 9, 4, 5, 8, 2],
          options: {
            bezierCurve: true,
            title: {
              fontSize: 25
            },
            tooltips: {
              mode: 'point',
              enabled: true
            },
            layout: {
              padding: {
                left: 50,
                right: 0,
                top: 0,
                bottom: 0
              }
            }
          }
        }
      ]
    },
    toplead: {
      type: 'topLead',
      title: 'Top Lead Generating Pages'
    },
    cardboxData: [
      {
        type: 'flatRate',
        title: 'Avg. Lead Response Time',
        callLog: '00',
        callSup: 's'
      },
      {
        type: 'flatRate',
        title: 'AGENT ANSWERRATE',
        callLog: '00%'
      },
      {
        type: 'flatRate',
        title: 'CUSTOMER ANSWER RATE',
        callLog: '00%'
      },
      {
        type: 'flatRate',
        title: 'Avg Call Duration',
        callLog: '00',
        callSup: 's'
      }
    ],
    usage: {
      type: 'usage',
      title: 'Usage',
      usageLog: '0/0'
      //usageDescription: 'in this subscription period'
    },
    currentCall: {
      type: 'currentCalls',
      title: 'Current Calls'
    },
    dataTable: {
      type: '3',
      header: [
        {
          headerTitle: 'ID'
        },
        {
          headerTitle: 'Customer'
        },
        {
          headerTitle: 'Scheduled time'
        }
      ],
      tableContentData: [
        {
          id: '#456765',
          name: 'Alpha Team',
          type: 'Primary'
        }
      ]
    },
    filterTable: {
      startDateFilter: moment(),
      endDateFilter: moment()
    },
    activityBoxData: null,
    selectedPickerOption: 'Today'
  }

  componentDidMount = async () => {
    const  n = await JSON.parse(localStorage.getItem('phone_numbers'));
    await this.setState({phoneNumbers : n});    
    this.fetchData()
    this.fetchChartData()
    this.GetSubscribeData()
  }

  GetSubscribeData = async () => {
    getSubscription().then(res => {
      if(res && res.data)
       {
      var upgradeStatus = false;
      var titleLine = '';
      var upgradeLine = ''
      const data = res.data.data
      let trialEndDate = moment(data.trial_end)
      let planEndDate = moment(
        data.current_term_end ? data.current_term_end : null
      )
      let today = moment(new Date())
      var trialDays = trialEndDate.diff(today, 'days')
      var plan_expired = planEndDate.diff(today, 'days')     
      var max_calls = data.max_calls
      var used_calls = data.calls_used
      var pleaseUpgrade = ''

      var customPlan  =  data.plan_name.charAt(0).toUpperCase() + data.plan_name.slice(1).toLowerCase()

     const tableData = {
        tableContentData : [{plan_name: data.plan_name, ends: 0, max_calls: data.max_calls, calls_used: data.calls_used, max_sms: data.max_sms, sms_used: data.sms_used}]
      }

      //------------------- Trial Plan -------------------//
      if(data.status === 'in_trial')
      {
        if(trialDays > 0 && max_calls > used_calls)
        {
          upgradeStatus = true;
          pleaseUpgrade = 'Upgrade now';
          titleLine = 'Your trial expires in '+ trialDays + ' days on ' + moment(data.trial_end).format('LL') ;
          upgradeLine = ' .'
        }else if(trialDays > 0 && max_calls <= used_calls){
          upgradeStatus = true;
          pleaseUpgrade = 'Please Upgrade ';
          titleLine = `You have reached the limits of your trial plan.`;
          upgradeLine = '  or contact us for add-ons to'
        } else if (trialDays <= 0) {
          upgradeStatus = true
          pleaseUpgrade = 'Upgrade now'
          titleLine =
            'Your trial plan has expired on ' +
            moment(data.trial_end).format('LL') +
            '. To continue accessing all the features'
          upgradeLine = ' .'
        } else {
          titleLine = ''
        }
      }
      else if(data.status === 'Active')
      {
        // if(plan_expired > 0 && max_calls > used_calls)
        // {
        //   upgradeStatus = true;
        //   titleLine = 'You are subscribed to ' +  customPlan + ', Your plan renews on ' + moment(data.current_term_end).format('LL') + ' .';
        // }else if(plan_expired > 0 && max_calls <= used_calls){
        //   upgradeStatus = true;
        //   pleaseUpgrade = 'Please Upgrade ';
        //   titleLine = 'You have reached the limits of your current plan ' + customPlan + '.';
        //   upgradeLine = ' or contact us for add-ons to'
        // }else if(plan_expired <= 0)
        // {
        //   upgradeStatus = true;
        //   pleaseUpgrade = 'Please Upgrade ';
        //   titleLine = 'Your current plan ' + customPlan + ' has expired on '+ moment(data.current_term_end).format('LL') + '.';
        //   upgradeLine= ' .'
        // }else{
        //   titleLine = '';
        // }
      }else if(data.status === "Cancelled"){
        upgradeStatus = true;
        pleaseUpgrade = 'Please Upgrade ';
        titleLine = 'Your current plan has expired on '+ moment(data.trial_end).format('LL') + '.';
        upgradeLine= ' .'
      }else{
        titleLine = '';
      }
    
      localStorage.setItem('plan_name', res.data.data.plan_name)

        this.setState({plan_name : data.status === 'Cancelled' || data.status === 'in_trial' ? '' : res.data.data.plan_name, pleaseUpgrade: pleaseUpgrade, isTrial: upgradeStatus, trialDays : trialDays, titleLine: titleLine, subscriptionData : tableData, upgradeLine: upgradeLine})
    }
      })
  }

  handleStartDate = date => {
    const { filterTable } = this.state
    this.setState(
      {
        filterTable: {
          startDateFilter: date,
          endDateFilter: filterTable.endDateFilter
        }
      },
      () => {
        this.fetchData()
      }
    )
  }

  handleEndDate = date => {
    const { filterTable } = this.state

    this.setState(
      {
        filterTable: {
          startDateFilter: filterTable.startDateFilter,
          endDateFilter: date
        }
      },
      () => {
        this.fetchData()
      }
    )
  }

  changeLoadingState = state => {
    this.setState({ isLoading: state })
  }
  formatData = date => {
    var arr = date.split('/')
    return arr[2] + '-' + arr[1] + '-' + arr[0]
  }

  fetchData = () => {
    const apiToken = localStorage.getItem('access_token')
    let start_date = new Date(this.state.filterTable.startDateFilter)
    let end_date = new Date(this.state.filterTable.endDateFilter)
    start_date = moment(start_date)
    end_date = moment(end_date)
    start_date = start_date.format('DD/MM/YYYY')
    end_date = end_date.format('DD/MM/YYYY')

    start_date = this.formatData(start_date)
    end_date = this.formatData(end_date)
    
    this.setState({
      isLoading: true
    })

    let head = {
      headers: {
        Authorization: 'Bearer ' + apiToken
      }
    }
    var url = `${process.env.REACT_APP_BASE_APP_URL}/api/v1/leads/get-leads-in-custom-period/${start_date}/${end_date}`
    //alert(url)
    // return

    axios
      .get(url, head)
      .then(res => {
        if (res.data.data) {       
          this.setState({
            isLoading: false,
            activityBoxData: res.data.data
          })
        }
      })
      .catch(err => {
        this.setState({
          isLoading: false
        })
        if(err.response.status === 401){
          logOut();
        }
      })
  }

  fetchChartData = async () => {
    const apiToken = localStorage.getItem('access_token')
    let start_date = new Date(this.state.filterTable.startDateFilter)
    let end_date = new Date(this.state.filterTable.endDateFilter)
    var start_datee = moment(start_date)
    var end_datee = moment(end_date)
    start_date = start_datee.format('DD/MM/YYYY')
    end_date = end_datee.format('DD/MM/YYYY')

    var days_difference = end_datee.diff(start_datee, 'days')

  

    var apiEndPoint = days_difference > 30 ? 'month' : 'day'
   

    start_date = this.formatData(start_date)
    end_date = this.formatData(end_date)   

    this.setState({
      isLoading: true
    })

    let head = {
      headers: {
        Authorization: 'Bearer ' + apiToken
      }
    }
    var url = `${process.env.REACT_APP_BASE_APP_URL}/api/v1/leads/chart/data/${start_date}/${end_date}/${apiEndPoint}`
    //alert(url)
    // return

    axios
      .get(url, head)
      .then(async res => {
      
        if (res.data.data) {
         
          const d = res.data.data
          const month = [
            'null',
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'Decemer'
          ]
          const labelArray = ['']
          const allEvents = [0]
          const allCalls = [0]
          const allMessage = [0]
          const ScheduleCall = [0]
          const successfullCalls = [0]
          const failedCalls = [0]

          if (d.length !== 0) {
            await d.map(function(item, index) {
              apiEndPoint === 'month'
                ? labelArray.push(month[item.label])
                : labelArray.push(moment(item.label).format('DD MMM'))
              allEvents.push(item.all_leads)
              allCalls.push(
                item.live_call + item.schedule_call + item.digital_calls
              )
              allMessage.push(item.leave_message)
              ScheduleCall.push(item.schedule_call)
              successfullCalls.push(item.success_call)
              failedCalls.push(item.failed_call)
            })
          }
          const data = {
            labelArray: labelArray,
            allEvents: allEvents,
            allCalls: allCalls,
            allMessage: allMessage,
            ScheduleCall: ScheduleCall,
            successfullCalls: successfullCalls,
            failedCalls: failedCalls
          }
          await this.setState({
            isLoading: false,
            chartData: data
            // activityBoxData: res.data.data
          })
        }
      })
      .catch(err => {
        this.setState({
          isLoading: false
        })       
      })
  }

  fetchChartDataCutom = async (start_date, end_date) => {
    const apiToken = localStorage.getItem('access_token')
   
    var s_date = moment(start_date)
    var e_date = moment(end_date)

    var days_difference = e_date.diff(s_date, 'days')   
    var apiEndPoint = days_difference > 30 ? 'month' : 'day'    

    this.setState({
      isLoading: true
    })

    let head = {
      headers: {
        Authorization: 'Bearer ' + apiToken
      }
    }
    var url = `${process.env.REACT_APP_BASE_APP_URL}/api/v1/leads/chart/data/${start_date}/${end_date}/${apiEndPoint}`
    //alert(url)
    // return

    axios
      .get(url, head)
      .then(async res => {        
        if (res.data.data) {          

          const d = res.data.data
          const month = [
            'null',
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'Decemer'
          ]
          const labelArray = ['']
          const allEvents = [0]
          const allCalls = [0]
          const allMessage = [0]
          const ScheduleCall = [0]
          const successfullCalls = [0]
          const failedCalls = [0]

          if (d.length !== 0) {
            await d.map(function(item, index) {
              apiEndPoint === 'month'
                ? labelArray.push(month[item.label])
                : labelArray.push(item.label)
              allEvents.push(item.all_leads)
              allCalls.push(
                item.live_call + item.schedule_call + item.digital_calls
              )
              allMessage.push(item.leave_message)
              ScheduleCall.push(item.schedule_call)
              successfullCalls.push(item.success_call)
              failedCalls.push(item.failed_call)
            })
          }
          const data = {
            labelArray: labelArray,
            allEvents: allEvents,
            allCalls: allCalls,
            allMessage: allMessage,
            ScheduleCall: ScheduleCall,
            successfullCalls: successfullCalls,
            failedCalls: failedCalls
          }
          await this.setState({
            isLoading: false,
            chartData: data
            // activityBoxData: res.data.data
          })
        }
      })
      .catch(err => {
        this.setState({
          isLoading: false
        })       
      })
  }

  fetchDataCustom = (customStartDate, customEndDate) => {
    const apiToken = localStorage.getItem('access_token')
    let start_date = customStartDate
    let end_date = customEndDate
    // start_date = moment(start_date)
    // end_date = moment(end_date)
    // start_date = start_date.format('DD/MM/YYYY')
    // end_date = end_date.format('DD/MM/YYYY')

    start_date = this.formatData(start_date)
    end_date = this.formatData(end_date)

    this.setState({
      isLoading: true
    })

    let head = {
      headers: {
        Authorization: 'Bearer ' + apiToken
      }
    }
    const url = `${process.env.REACT_APP_BASE_APP_URL}/api/v1/leads/get-leads-in-custom-period/${start_date}/${end_date}`
    //alert(url)
    // return
    axios
      .get(url, head)
      .then(res => {        
        if (res.data.data) {          
          this.setState({
            isLoading: false,
            activityBoxData: res.data.data
          })
        }
      })
      .catch(err => {
        this.setState({
          isLoading: false
        })        
      })
  }

  handleApply = (event, picker) => {
    this.setState(
      {
        filterTable: {
          startDateFilter: moment(picker.startDate).format('DD/MM/YYYY'),
          endDateFilter: moment(picker.endDate).format('DD/MM/YYYY')
        }
      },
      () => {        
        this.fetchChartDataCutom(
          moment(picker.startDate).format('YYYY-MM-DD'),
          moment(picker.endDate).format('YYYY-MM-DD')
        )
      }
    )
    this.fetchDataCustom(
      moment(picker.startDate).format('DD/MM/YYYY'),
      moment(picker.endDate).format('DD/MM/YYYY')
    )
  }

  today = () => {
    this.setState({
      filterTable: {
        startDateFilter: moment().format('DD/MM/YYYY'),
        endDateFilter: moment().format('DD/MM/YYYY')
      },
      selectedPickerOption: 'Today'
    })
    this.fetchDataCustom(
      moment().format('DD/MM/YYYY'),
      moment().format('DD/MM/YYYY')
    )
    this.fetchChartData()
  }

  yesterday = async () => {
    this.setState(
      {
        filterTable: {
          startDateFilter: moment()
            .subtract(1, 'days')
            .format(),
          endDateFilter: moment()
            .subtract(1, 'days')
            .format()
        }
      },
      () => {
        this.fetchData()
        this.fetchChartData()
      }
    )
  }

  lastWeek = () => {
    this.setState(
      {
        filterTable: {
          startDateFilter: moment()
            .subtract(1, 'weeks')
            .startOf('isoWeek'),
          endDateFilter: moment()
            .subtract(1, 'weeks')
            .endOf('isoWeek')
        }
      },
      () => {
        this.fetchData()
        this.fetchChartData()
      }
    )
  }

  thisWeek = () => {
    const startOfWeek = moment().startOf('isoWeek')
    const endOfWeek = moment().endOf('isoWeek')
    this.setState(
      {
        filterTable: {
          startDateFilter: startOfWeek,
          endDateFilter: endOfWeek
        }
      },
      () => {
        this.fetchData()
        this.fetchChartData()
      }
    )
  }

  thisMonth = () => {
    const startOfMonth = moment()
      .clone()
      .startOf('month')
    const endOfMonth = moment()
      .clone()
      .endOf('month')
    this.setState(
      {
        filterTable: {
          startDateFilter: startOfMonth,
          endDateFilter: endOfMonth
        }
      },
      () => {
        this.fetchData()
        this.fetchChartData()
      }
    )
  }

  lastMonth = () => {
    const prevMonthFirstDay = moment()
      .subtract(1, 'months')
      .startOf('month')
    const prevMonthLastDay = moment()
      .subtract(1, 'months')
      .endOf('month')
      .clone()
      .endOf('month')
    this.setState(
      {
        filterTable: {
          startDateFilter: prevMonthFirstDay,
          endDateFilter: prevMonthLastDay
        }
      },
      () => {
        this.fetchData()
        this.fetchChartData()
      }
    )
  }

  handleChange = (e, { value }) => {
    if (value === 'Select custom') {
      this.setState({
        selectedPickerOption: value,
        filterTable: {
          startDateFilter: moment(),
          endDateFilter: moment()
        }
      })
      return
    }
    this.setState({ selectedPickerOption: value })
    switch (value) {
      case 'Today':
        this.today()
        break
      case 'Yesterday':
        this.yesterday()
        break
      case 'This week':
        this.thisWeek()
        break
      case 'Last week':
        this.lastWeek()
        break
      case 'This month':
        this.thisMonth()
        break
      case 'Last month':
        this.lastMonth()
        break
      default:
        this.today()
    }
  }

  handleCancel = () => {
    this.today()
  }

  closeSubscriptionModal = async () => {   
    await this.setState({showSubscriptionModal : false});
  }

  openSubscriptionModal = async () => {    
    await this.setState({showSubscriptionModal : true});
  }


  render() {
    return (
      <>
        <Dimmer active={this.state.isLoading} style={{ position: 'fixed' }}>
          <Loader />
        </Dimmer>
        <div className="fullwidth-container home_page">
        <Title openSubscriptionModal={this.openSubscriptionModal} closeSubscriptionModal={this.closeSubscriptionModal} showSubscriptionModal={this.state.showSubscriptionModal} plan_name={this.state.plan_name} subscriptionData={this.state.subscriptionData} data={this.state.titleContent} />
          {/* <HomeBanner loading={this.changeLoadingState} /> */}
          <div className="homecontent-wrapper">
            {!localStorage.getItem('admin_verification_status') && (
              <div className="number-title massage_box">
                Admin Verification for Phone is Pending !
              </div>
            )}
            <HomeTrial
              pleaseUpgrade={this.state.pleaseUpgrade}
              upgradeLine={this.state.upgradeLine}
              subscriptionData={this.state.subscriptionData}
              titleLine={this.state.titleLine}
              phoneNumbers={this.state.phoneNumbers}
              isTrial={this.state.isTrial}
              trialDays={this.state.trialDays}
            />
            <p className="default-text help-title heading-container-main"
              style = {{margin: "10px 0 -20px" }}> Today's Trends </p>
            {this.state.activityBoxData && (
              <HomeContent
                loading={this.changeLoadingState}
                date={this.state.filterTable}
                callData={this.state.activityBoxData}
              />
            )}
          </div>
          <div className="chart-wrapper all_activites">
            <div className="filter-wrapper">
              <div className="date-range-parent custom-range-parent">
                <Dropdown
                  onChange={this.handleChange}
                  options={options}
                  selection
                  value={this.state.selectedPickerOption}
                />
                {this.state.selectedPickerOption === 'Select custom' ? (
                  <CommonDateRangePicker
                    handleApply={this.handleApply}
                    handleCancel={this.handleCancel}
                    initialSettings={{
                      startDate: this.state.filterTable.startDateFilter,
                      endDate: this.state.filterTable.endDateFilter,
                      maxDate: moment()
                    }}
                  />
                ) : null}
              </div>
            </div>
            <p className="default-text help-title "> Call Report </p>
            <ActivityChart
              loading={this.changeLoadingState}
              apiData={this.state.chartData}
              date={this.state.filterTable}
            />{' '}
          </div>{' '}
          <div className="homecontent-wrapper our_services">
            <p className="default-text help-title  heading-container-main"
              style = {{ margin: "10px 0 -20px"}}> Performance Report </p>
            <ActivityBox
              loading={this.changeLoadingState}
              date={this.state.activityBoxData}
            />

<HomeBottomSupport></HomeBottomSupport>
<CommonSubscriptionModal
            open={this.state.showSubscriptionModal}
            onClose={this.closeSubscriptionModal}
            currentPlan={this.state.plan_name}
            dataTable={this.state.subscriptionData}
          />

            {/* <div className="cardbox-container flex-schedule schedule_calls ">
              <div className="upcomming-scheduled-wrapper">
                <h2 className="scheduled-text"> Upcoming scheduled calls </h2>{' '}
                <ScheduleTable
                  loading={this.changeLoadingState}
                  dataTable={this.state.dataTable}
                  date={this.state.filterTable}
                />{' '}
              </div>{' '}
              <div className="visitor-graph-wrapper">
                <div className="visitor-graph-holder">
                  <CallChart
                    loading={this.changeLoadingState}
                    data={this.state.visitor}
                    apiData={this.state.activityBoxData}
                  />{' '}
                </div>{' '}
              </div>{' '}
            </div>{' '} */}
          </div>{' '}
        </div>
      </>
    )
  }
}

export default Home
