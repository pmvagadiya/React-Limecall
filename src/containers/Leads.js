import React, { Component } from 'react'
import moment from 'moment'
import {
  Label,
  Menu,
  Tab,
  Icon,
  Dropdown,
  Dimmer,
  Loader,
  Input,
  Button,
  Segment,
  Sidebar,
  Rating,
  Ref,
  Image,
  Modal,
  Pagination,
} from 'semantic-ui-react'
import PropTypes from 'prop-types'
// import DatePicker from 'react-datepicker'
import axios from 'axios'
import SemanticDatepicker from 'react-semantic-ui-datepickers'
import 'react-semantic-ui-datepickers/dist/react-semantic-ui-datepickers.css'
import CommonDateRangePicker from '../components/daterangepicker/CommonDateRangePicker'
import LeadTable from '../components/leads/leadTable/LeadTable'
import RightPane from '../components/leads/leadRightPane/rightPopUp'
import LeadBanner from '../components/leads/LeadBanner'

import Title from '../common/Title'
// import Chart from '../common/Chart'
import { CommonNotify } from '../common/CommonNotify'
import CommonButton from '../common/CommonButtons'
import CommonSelect from '../common/CommonSelect'

import CallApi from '../helpers/CallApi'
import CallApiGet from '../helpers/CallApiGet'

import leadLogo from '../assets/images/lead-logo.svg'
import exportIcon from '../assets/images/export.svg'
import {
  dayData,
  dayLabels,
  weekLabels,
  weekData,
  monthLabels,
  monthData
} from '../lib/LeadChartData'
import deleteIcon from '../assets/images/delete-icon.png'
import ReactExport from 'react-export-excel'

import { CSVLink } from 'react-csv'
import { getLeadOwner } from '../config/leadAPI'
import getWidget from '../config/getWidget'
import LeadIcon from '../assets/images/settingIcon.png'
import { logOut } from  '../common/ProfileModal';
import { Grid } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import {ExportToExcel} from '../components/leads/exportExcel'


const apiToken = localStorage.getItem('access_token')

const ExcelFile = ReactExport.ExcelFile
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn

const headers = [
  { label: 'id', key: 'id' },
  { label: 'time', key: 'time' },
  { label: 'contact', key: 'contact' },
  { label: 'status', key: 'status' },
  { label: 'agent', key: 'agent' },
  { label: 'score', key: 'score' },
  { label: 'source', key: 'source' }
]

const options = [
  { key: 1, text: 'All Time', value: 'All Time' },
  { key: 1, text: 'Today', value: 'Today' },
  { key: 2, text: 'Yesterday', value: 'Yesterday' },
  { key: 3, text: 'This week', value: 'This week' },
  { key: 4, text: 'Last week', value: 'Last week' },
  { key: 5, text: 'This month', value: 'This month' },
  { key: 6, text: 'Last month', value: 'Last month' },
  { key: 7, text: 'Custom range', value: 'Select custom' }
]

const sortOptions = [
  {key : 1, text : "Newest First", value : 'Newest First'},
  {key : 2, text : "Oldest First", value : 'Oldest First'}
  // {key : 2, text : "Awaiting Review", value : 'Awaiting Review'},
]

class Leads extends Component {
  state = {
    //data for chart
    membrs : [],
    allOwners : [],
    dataLoaded:false,
    sortMain : '-id',
    rightPane: false,
    nextLeadId: 0,
    prevLeadId:0,
    leadData: [],
    leadScore: [],
    selectedPickerOption: 'All Time',
    sortPickerOption : 'Newest First',
    filterTable: {
      startDateFilter: moment(),
      endDateFilter: moment()
    },
    activePage: 15,
    isLoading: false,
    activeIndex: 0,
    setOfficeHour2: {
      addOfficeHour2: '',
      link: 'Link',
      officeHourFrom: '',
      officeHourTo: ''
    },
    addOfficeHour2: [1],
    selectCheckboxData: [],
    callLog: {
      title: '',
      legend: false,
      stepSize: '10',
      yAxes: true,
      padding: {
        top: '20',
        right: '20',
        bottom: '0',
        left: '0'
      },
      fontSize: 14,
      fontStyle: '600',
      gridLines: true,
      labels: [
        '',
        '23/03/29',
        '23/04/2019',
        '23/05/2019',
        '23/06/2019',
        '23/07/2019',
        '23/08/2019',
        '23/10/2019'
      ],
      datasets: [
        {
          label: 'call logs',
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
          pointRadius: 8,
          pointHitRadius: 10,
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
      ],
      isDayActive: false,
      isWeekActive: true,
      isMonthActive: false
    },
    tableData: {
      messages: [],
      call: [],
      schedules: [],
      isCall: true,
      isMessages: false,
      isSchedules: false
    },

    tableDataContent: [],
    leadStage: [],
    leadOwner: [],
    widget_id: null,

    //for tanble pagination
    tableDataTotalItem: 0,
    pageNumber: 1,
    totalPages: null,
    startItemCount: 0,
    endItemCount: 0,

    //edit fields checkbox state
    nodeCheckBoxFields: [],

    //filter fields state
    filterTable: {
      type: null,
      startDateFilter: [],
      endDateFilter: new Date(),
      status: null,
      search: null,
      score: null,
      agent: null
    },

    query: null,
    //check if all marked
    isMarkAllCheckbox: false,
    countItem: 0,
    showExport: false,
    isChecked: false,

    //modal state
    open: false,
    showDatePicker: false,
    animation: 'overlay',
    direction: 'left',
    directionMobile: 'top',
    visible: false,
    sortField: 'id',
    sortValue: 'DESC',
    exportData: null,
    dropDownData: [],
    filterCondition: 'is',
    filterDropDownOption: {
      score: null,
      type: null,
      owner: null,
      agent: null,
      final_status: null,
      status: [{key: 'Awaiting Review', value: 1}, {key: 'Reviewed', value: 2},{key: 'Disqualifed', value: 3},{key: 'Qualified', value: 4}]
    }
  }

  getArrayIndex = (list, find) => {   
    for (const [i, v] of list.entries()) {
      if(v.id == find){
        return i
      }     
    }
    return -1;
  }


  getNextPrevLead = id => {
   
    let leads = [];
    if(this.state.tableData.isCall){
      leads = this.state.tableData.call
    }else if(this.state.tableData.isMessages){
      leads = this.state.tableData.messages
    }else{
      leads = this.state.tableData.schedules
    }

    // find the lead id  
    const currIndex = this.getArrayIndex(leads, '#' + id);

    let nextIndex = 0;
    let prevIndex = 0;

    if(currIndex == 0){
      nextIndex = 1;
      prevIndex = leads.length - 1;
    }else if(currIndex == leads.length - 1){
      nextIndex = 0;
      prevIndex =  currIndex - 1;
    }else{
      nextIndex = currIndex + 1;
      prevIndex = currIndex - 1;
    }


   this.setState({prevLeadId: parseInt(leads[prevIndex].id.substring(1)), nextLeadId: parseInt(leads[nextIndex].id.substring(1))})    

    

  }

  handleRightPaneOpen = id => {

    this.setState({ dataLoaded: false })   

    this.getNextPrevLead(id)

    this.setState({ rightPane: true })
    this.setState({ isLoading: true })
    let head = {
      headers: {
        Authorization: 'Bearer ' + apiToken
      }
    }
    let url = `${process.env.REACT_APP_BASE_APP_URL}/api/v1/leads/lead/${id}`
    axios
      .get(url, head)
      .then(res => {
        this.setState({ isLoading: false })
        this.setState({ leadData: res?.data })
        this.setState({ dataLoaded: true })        
      })
      .catch(err => {
        if (err.response?.data?.errors?.length) {
          this.setState({ rightPane: false })
          this.setState({ isLoading: false })
          CommonNotify('Id is not available')
        }
      })
  }
  handleRightClose = () => {
    this.setState({ dataLoaded: false })       
    this.setState({ rightPane: false })
  }
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

  resetPage = () => {
    let { tableData, tableDataContent, pageNumber } = this.state

    tableData.messages = []
    tableData.schedules = []
    tableData.call = []

    tableDataContent = []

    this.setState({
      sortField: 'id',
      sortValue: 'DESC',
      tableDataContent,
      isMarkAllCheckbox: false,
      pageNumber,
      tableData
    })
  }

  handleSortData = (e, { value }) => {
    if(value === 'Newest First')
    {
      this.setState({sortMain : '-id', sortPickerOption : value}, () => { this.fetchData() })
    }else if(value === 'Oldest First'){
      this.setState({sortMain : 'id', sortPickerOption : value}, () => { this.fetchData() })
    }else if(value === 'Awaiting Review'){
      this.setState({sortMain : '-id', sortPickerOption : value}, () => { this.fetchData() })
    }else{
      this.setState({sortMain : 'id', sortPickerOption : value}, () => { this.fetchData() })
    }
  }


  handleChangeDate = (e, { value }) => {
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
      case 'All Time':
        this.fetchData()
        break
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
        this.fetchData()
    }
  }

  today = () => {
    this.setState(
      {
        filterTable: {
          startDateFilter: moment().format('YYYY-MM-DD'),
          endDateFilter: moment().format('YYYY-MM-DD')
        },
        selectedPickerOption: 'Today'
      },
      () => {
        this.fetchDataWithDate()       
      }
    )
    // this.handleStartDate(
    //   moment().format('DD/MM/YYYY'),
    //   moment().format('DD/MM/YYYY')
    // )
    // this.fetchData()
  }

  yesterday = async () => {
    this.setState(
      {
        filterTable: {
          startDateFilter: moment()
            .subtract(1, 'days')
            .format('YYYY-MM-DD'),
          endDateFilter: moment()
            .subtract(1, 'days')
            .format('YYYY-MM-DD')
        }
      },
      () => {       
        this.fetchDataWithDate();
        // this.handleStartDate(
        //   moment().format('DD/MM/YYYY'),
        //   moment().format('DD/MM/YYYY')
        // )
      }
    )
  }

  lastWeek = () => {
    this.setState(
      {
        filterTable: {
          startDateFilter: moment()
            .subtract(1, 'weeks')
            .startOf('isoWeek')
            .format('YYYY-MM-DD'),
          endDateFilter: moment()
            .subtract(1, 'weeks')
            .endOf('isoWeek')
            .format('YYYY-MM-DD')
        }
      },
      () => {       
        this.fetchDataWithDate();
        // this.handleStartDate(
        //   moment().format('DD/MM/YYYY'),
        //   moment().format('DD/MM/YYYY')
        // )
      }
    )
  }

  thisWeek = () => {
    const startOfWeek = moment()
      .startOf('isoWeek')
      .format('YYYY-MM-DD')
    const endOfWeek = moment()
      .endOf('isoWeek')
      .format('YYYY-MM-DD')
    this.setState(
      {
        filterTable: {
          startDateFilter: startOfWeek,
          endDateFilter: endOfWeek
        }
      },
      () => {       
        this.fetchDataWithDate();
        // this.handleStartDate(
        //   moment().format('DD/MM/YYYY'),
        //   moment().format('DD/MM/YYYY')
        // )
      }
    )
  }

  thisMonth = () => {
    const startOfMonth = moment()
      .clone()
      .startOf('month')
      .format('YYYY-MM-DD')
    const endOfMonth = moment()
      .clone()
      .endOf('month')
      .format('YYYY-MM-DD')
    this.setState(
      {
        filterTable: {
          startDateFilter: startOfMonth,
          endDateFilter: endOfMonth
        }
      },
      () => {       
        this.fetchDataWithDate();
        // this.handleStartDate(
        //   moment().format('DD/MM/YYYY'),
        //   moment().format('DD/MM/YYYY')
        // )
      }
    )
  }

  lastMonth = () => {
    const prevMonthFirstDay = moment()
      .subtract(1, 'months')
      .startOf('month')
      .format('YYYY-MM-DD')
    const prevMonthLastDay = moment()
      .subtract(1, 'months')
      .endOf('month')
      .clone()
      .endOf('month')
      .format('YYYY-MM-DD')
    this.setState(
      {
        filterTable: {
          startDateFilter: prevMonthFirstDay,
          endDateFilter: prevMonthLastDay
        }
      },
      () => {      
        this.fetchDataWithDate();
      }
    )
  }

  handleApply = (event, picker) => {
    this.setState(
      {
        filterTable: {
          startDateFilter: moment(picker.startDate).format('YYYY-MM-DD'),
          endDateFilter: moment(picker.endDate).format('YYYY-MM-DD')
        }
      },
      () => {      
        this.fetchDataWithDate();
        // this.fetchChartDataCutom(
        //   moment(picker.startDate).format('YYYY-MM-DD'),
        //   moment(picker.endDate).format('YYYY-MM-DD')
        // )
      }
    )
  }

  handlePageChange(pageNumber) {
    this.setState({ activePage: pageNumber })
  }

  setSortField = field => {
    let { sortField, sortValue } = this.state
    if (sortField == field) {
      sortValue = this.flipSortType(sortValue)
      this.setState(
        {
          sortValue: sortValue
        },
        () => {
          this.fetchData()
        }
      )
      return
    }
    sortValue = 'DESC'
    this.setState(
      {
        sortField: field,
        sortValue: 'DESC'
      },
      () => {
        this.fetchData()
      }
    )
  }

  flipSortType = type => {
    if (type == 'DESC') return 'ASC'
    return 'DESC'
  }
  fetchDataWithDate = () => {
    const {
      selectedValue,
      query,
      filterCondition,
      sortField,
      sortValue,
      pageNumber,
      filterTable
    } = this.state

    this.setState({ isLoading: true, exportData : [], countItem: 0 })
    const header = {
      Authorization: 'Bearer ' + apiToken
    }

    const leadType = this.getLeadType()
    var url

   
        var params = {
          [`filter[created_at][between]`] : `${filterTable.startDateFilter},${filterTable.endDateFilter}`,
          limit: 10,
          page: pageNumber,
          sort_field: sortField,
          sort_value: sortValue
        }

    if (leadType !== 'call') {
      params['filter[type][is]'] = leadType
    }
    url = `${process.env.REACT_APP_BASE_APP_URL}/api/v1/leads`
    axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${apiToken}`,
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        params: params
      })
      .then(res => {
        this.setState({ isLoading: false })
        // dthis.setFilterDropDownOption(res.data.data.data)
        this.resetPage()
        this.storeTableData(res.data.data)
      })
      .catch(err => {
        this.setState({ isLoading: false })       
      })
  }

  fetchData = data => {
    const {
      selectedValue,
      query,
      filterCondition,
      sortField,
      sortValue,
      pageNumber,
      sortMain
    } = this.state

    this.setState({ isLoading: true })
    const header = {
      Authorization: 'Bearer ' + apiToken
    }

    const leadType = this.getLeadType()
    var url

    var params = {
      limit: 10,
      page: pageNumber,
      sort_field: sortField,
      sort_value: sortValue,
      sort : sortMain
    }
   
    if (query ) {
          if(selectedValue === 'Date'){      
            var cond = 'like'
            filterCondition === '!is' ? (cond = '!like') : (cond = 'like')
            params = {
              [`filter[created_at][${cond}]`]: query,
              limit: 10,
              page: pageNumber,
              sort_field: sortField,
              sort_value: sortValue
            }
          }else{
          params = {
            [`filter[${selectedValue}][${filterCondition}]`] : query ,
            limit: 10,
            page: pageNumber,
            sort_field: sortField,
            sort_value: sortValue,
            sort : sortMain
          }
        }
    }
    if (leadType !== 'call') {
      params['filter[type][is]'] = leadType
    }

    url = `${process.env.REACT_APP_BASE_APP_URL}/api/v1/leads`

    axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${apiToken}`,
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        params: params
      })
      .then(res => {
        this.setState({ isLoading: false, exportData : [], countItem: 0 })
        data && this.setFilterDropDownOption(res.data.data.data)
        this.resetPage()
        this.storeTableData(res.data.data)
      })
      .catch(err => {
        this.setState({ isLoading: false })       
        if(err.response.status === 401){
          logOut();
        }
      })    
  }

  fetchDataAfterDelete = data => {
    const {
      selectedValue,
      query,
      filterCondition,
      sortField,
      sortValue,
      pageNumber
    } = this.state

    // this.setState({ isLoading: true })
    const header = {
      Authorization: 'Bearer ' + apiToken
    }

    const leadType = this.getLeadType()
    var url

    var params = {
      // [`filter[${selectedValue}][is]`]: query,
      limit: 10,
      page: pageNumber,
      sort_field: sortField,
      sort_value: sortValue
    }

   
    if (leadType !== 'call') {
      params['filter[type][is]'] = leadType
    }

    url = `${process.env.REACT_APP_BASE_APP_URL}/api/v1/leads`

    axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${apiToken}`,
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        params: params
      })
      .then(res => {
        this.setState({ isLoading: false })
        data && this.setFilterDropDownOption(res.data.data.data)
        this.resetPage()
        this.storeTableData(res.data.data)
      })
      .catch(err => {
        this.setState({ isLoading: false })      
      })
  }

  uniquesArray = (datas, type) => {
    return Object.values(
      datas.reduce((a, c) => {
        a[c[type]] = c
        return a
      }, {})
    )
      .map(res => {
        var value
        if (type === 'owner') {
          value = res['owner']
        } else {
          value = res[type]
        }
        return {
          key: res[type],
          text: res[type],
          value: value
        }
      })
      .filter(data => {
        return data.key !== null
      })
  }

  setFilterDropDownOption = datas => {
    const final_status = this.uniquesArray(datas, 'final_status')
    const agent = this.uniquesArray(datas, 'agent')
    const score = this.uniquesArray(datas, 'score')
    const owner = this.state.allOwners
    const type = this.uniquesArray(datas, 'type')
    const status= [
      {key: 'Awaiting Review',text: 'Awaiting Review', value: 1},
     {key: 'Reviewed',text: 'Reviewed', value: 2},
     {key: 'Disqualifed',text: 'Disqualifed', value: 3},
     {key: 'Qualified',text: 'Qualified', value: 4}
  ]
    score.push(
      {
        key: 'Not Scored',
        text: 'Not Scored',
        value: 'null'
      },
      {
        key: 'All',
        text: 'All'
      }
    )
    final_status.push({
      key: 'All',
      text: 'All'
    })
    this.setState({
      ...this.state,
      filterDropDownOption: {
        score,
        type,
        agent,
        final_status,
        owner,
        status
      }
    })
  }

  componentDidMount =  async () => {
    await this.getWidget()
    // this.fetchData(true)
    this.getUserId()
    this.getOwner()    
  }

  getWidget = async () => {
    let head = {
      headers: {
        Authorization: 'Bearer ' + apiToken
      }
    }
    const url = `${process.env.REACT_APP_BASE_APP_URL}/api/v1/widget/widgets`

    axios
      .get(url, head)
      .then(res => {
        const updateLeadScore = res.data.data[0].scores.map((item, index) => {
          return {
            key: index,
            text: item,
            value: item
          }
        })

        

        this.setState({
          leadScore: [...updateLeadScore]
        })
      })
      .catch(err => {
        
      })
  }

  getOwner = async () => {
    const owner = []
     const allMembers = []
    await getLeadOwner()
      .then(async res => {
        const admin = res.data.data.admin
        await owner.push({
          key: admin.id,
          text: admin.first_name + ' ' + admin.last_name,
          value: admin.id
        })

        await allMembers.push({
          key: admin.id,
          text: admin.first_name + ' ' + admin.last_name,
          value: admin.first_name + ' ' + admin.last_name
        })

        await res.data.data.members.map(team => {
          owner.push({
            key: team.id,
            text: team.first_name + ' ' + team.last_name,
            value: team.id
          })
          allMembers.push({
            key: team.id,
            text: team.first_name + ' ' + team.last_name,
            value: team.first_name + ' ' + team.last_name
          })
        })
        this.setState({
          ...this.state,
          leadOwner: owner,
          allOwners: allMembers
        }, () => {
          this.fetchData(true)
        })
        console.log('Ownerr :::: ',this.state.leadOwner)
      })
      .catch(err => {
       
      })
  }

  getUserId() {
    const apiToken = localStorage.getItem('access_token')
    let head = {
      headers: {
        Authorization: 'Bearer ' + apiToken
      }
    }
    const url = `${process.env.REACT_APP_BASE_APP_URL}/api/v1/user/caller-id`

    axios
      .get(url, head)
      .then(res => {
        const data = []
        res.data.data.map(number => {
          data.push({
            key: number[0],
            value: number[0],
            text: `LimeCall Number (${number[0]})`
          })
        })

        this.setState({
          ...this.state,
          dropDownData: data
        })
      })
      .catch(err => {
        CommonNotify('Call Not Requested')        
      })
  }

  storeTableData = data => {
    const dataA = data.data
    let { pageNumber, totalPages } = this.state
    totalPages = data.last_page
    let newData = []

    dataA.map(val => {
      if (val.score == null || val.score <= 1) {
        val.score = 1
      }
      if (val.source == null) {
        val.source = 'Unknown'
      }

      // if (val.tags == null) val.tags = []

      // val.tags = val.tags.join(', ')

      if (val.member == null || val.member == '') {
        val.member = ''
      } else {
        val.member = val.member.first_name
      }

      let item = {
        id: '#' + val.id,
        schedule_call_status: val.schedule_call_status,
        owner_id: val.owner_id,
        defaultStage: val.status,
        time: val.created_at,
        contact: val.phone_number,
        phone_number: val.phone_number,
        email: val.email,
        source: val.first_source,
        interseted: val.interseted,
        status: val.final_status,
        agent: val.agent,
        score: val.score,
        // tag: val.tags,
        customerName: val.customer_name,
        contactName: val.contact,
        type: val.type,
        isHoverDisplay: false
      }

      if (item.customerName !== null && item.customerName !== 'null') {
        item.contact = item.customerName
        item.isHoverDisplay =
          item.email === null && val.phone_number === null ? true : false
      } else if (item.contact !== null) {
        item.contact = item.contact
      } else if (item.email !== null) {
        item.contact = item.email
      } else if (
        item.contact === null &&
        item.contactName === null &&
        item.email === null &&
        item.customerName === null
      ) {
        item.contact = 'Unknown'
      }

      newData.push(item)
    })

  //   newData.sort(function(a, b){
  //     return new Date(b.time) - new Date(a.time);
  // });

    const leadType = this.getLeadType()
    let call = false
    let message = false
    let schedule = false

    if (leadType == 'call') {
      call = true
    } else if (leadType == 'message') {
      message = true
    } else {
      schedule = true
    }

    this.setState({
      tableData: {
        messages: newData,
        call: newData,
        schedules: newData,
        isCall: call,
        isMessages: message,
        isSchedules: schedule
      }
    })

    //pageNumber = 1

    this.setState({
      tableDataContent: newData,
      isMarkAllCheckbox: false,
      pageNumber,
      totalPages
    })
  }

  componentWillUnmount() {
    if (this.interval) {
      clearTimeout(this.interval)
      this.interval = 0
    }
  }

  updateData = () => {
    const category = document
      .querySelectorAll('.filter .active')[1]
      .innerHTML.toLocaleLowerCase()
    this.filterDataPerPage(category)
  }

  fetchDataOld = () => {
    // const baseURL = 'http://dev.limecall.com'
    // var form = new FormData()
    // form.append('email', 'mohamed@madridblues.com')
    // form.append('name', 'Mohamed Mamdouh')
    // form.append('password', 'Mm')
    // form.append('password_confirmation', 'Mm')
    // var settings = {
    //   url: `${process.env.REACT_APP_BASE_APP_URL}/api/v1/register-api`,
    //   // method: 'POST',
    //   mode: 'no-cors',
    //   headers: {
    //     'Access-Control-Allow-Origin': '*',
    //     'Content-Type': 'application/json'
    //   },
    //   useCredentails: true,
    //   processData: false,
    //   mimeType: 'multipart/form-data',
    //   contentType: false,
    //   data: form
    // }
    // const { url, data, ...rest } = settings
    // axios
    //   .post(url, data, rest)
    //   .then(response => console.log(response))
    //   .catch(err => console.log(err))
    // let { tableData } = this.state
    // const baseURL = 'http://dev.limecall.com'
    // var form = new FormData()
    // form.append('email', 'mohamed@madridblues.com')
    // form.append('name', 'Mohamed Mamdouh')
    // form.append('password', 'Mm')
    // form.append('password_confirmation', 'Mm')
    // var settings = {
    //   url: `${baseURL}/api/v1/register-api`,
    //   method: 'POST',
    //   timeout: 0,
    //   headers: {
    //     Accept: 'application/json'
    //   },
    //   processData: false,
    //   mimeType: 'multipart/form-data',
    //   contentType: false,
    //   data: form
    // }
    // const { url, data, ...rest } = settings
    // axios
    //   .post(url, data, rest)
    //   .then(response => console.log(response))
    //   .catch(err => console.log(err))
    // axios.get(`${process.env.REACT_APP_BASE_APP_URL}/api/v1/leads/get-call-by-id?id=117`).then(res => {
    //   const data = res.data
    //   console.log(data)
    //   // tableData.messages = data.messages
    //   // tableData.call = data.call
    //   // tableData.schedules = data.schedules
    //   // this.setState({ ...tableData })
    // })
    // .catch(error => console.log(error))
  }

  filterDataPerPage = cat => {
    this.interval = setTimeout(() => {
      const { tableData } = this.state
      const category = cat.toLowerCase()
      let { tableDataTotalItem, pageNumber } = this.state
      tableDataTotalItem = tableData[category].length
      const limit = 10
      // let totalPages = Math.ceil(tableDataTotalItem / limit)
      let offset = (pageNumber - 1) * limit
      let start = offset + 1
      let lastItemCount = offset + limit
      let end = Math.min(lastItemCount, tableDataTotalItem)

      let temporaryContainer = []

      tableData[category].forEach((value, index) => {
        if (index + 1 >= start && index + 1 <= end) {
          temporaryContainer.push(value)
        } else {
          temporaryContainer.splice(index, 1)
        }
      })

      this.setState({
        startItemCount: start,
        lastItemCount: end,
        tableDataTotalItem,
        tableDataContent: temporaryContainer
      })
    }, 200)
  }

  handleStartDate = (event, date) => {
    // const { filterTable } = this.state
    // var d = moment.utc(date.value).local().format('YYYY-MM-DD')
    // console.log('New Date ------------>',d)
    // this.fetchDataWithDate(d)
  }

  handleEndDate = date => {
    const { filterTable } = this.state

    filterTable.endDateFilter = date
    this.setState({ ...filterTable })
  }

  onClickIncrementPage = () => {
    let { pageNumber, tableDataTotalItem } = this.state
    const limit = 10
    let totalPages = Math.ceil(tableDataTotalItem / limit)

    // if (pageNumber < totalPages) {

    // }
    if (pageNumber <= 1) {
      pageNumber = pageNumber + 1
      this.setState({ pageNumber }, () => {
        this.fetchData()
      })
    } else if (pageNumber > 1) {
      if (pageNumber > 1) {
        pageNumber = pageNumber - 1
        this.setState({ pageNumber }, () => {
          this.fetchData()
        })
      }
    }
  }

  onClickDecrementPage = () => {
    let { pageNumber } = this.state

    if (pageNumber > 1) {
      pageNumber = pageNumber - 1
      this.setState({ pageNumber }, () => {
        this.fetchData()
      })
    }
  }

  // onChangeNodeCheckbox = e => {
  //   const value = e.target.innerText
  //   const { nodeCheckBoxFields } = this.state
  //   const index = nodeCheckBoxFields.indexOf(value)

  //   if (index === -1) {
  //     nodeCheckBoxFields.push(value)
  //   } else {
  //     nodeCheckBoxFields.splice(index, 1)
  //   }
  //   this.setState({ nodeCheckBoxFields })
  // }
  onClickMarkCheckbox = e => {
    let { isMarkAllCheckbox, tableDataContent } = this.state
    let index = e.target.parentNode.parentNode.parentNode.getAttribute(
      'data-key'
    )
    if (index) {
      // if (
      //   tableDataContent[index] &&
      //   tableDataContent[index].isChecked === undefined
      // ) {
      //   return false
      // } else {
      tableDataContent[index].isChecked = !tableDataContent[index].isChecked

      this.setState({ ...tableDataContent })
      this.setState({ isMarkAllCheckbox: false })
      const show = tableDataContent.some(item => item.isChecked === true)

      if (show) {
        this.setState({ showExport: true })
      } else {
        this.setState({ showExport: false })
      }
      const dataFilter = tableDataContent.filter(
        item => item.isChecked === true
      )
      this.setState({ countItem: dataFilter.length, exportData: dataFilter })
      
      
    }
  }

  onClickMarkAllCheckbox = () => {
    let { isMarkAllCheckbox, tableDataContent } = this.state

    isMarkAllCheckbox = !isMarkAllCheckbox

    if (isMarkAllCheckbox) {
      tableDataContent.map(data => {
        return (data.isChecked = true)
      })

      this.setState({ isMarkAllCheckbox, ...tableDataContent })
    } else {
      tableDataContent.map(data => {
        return (data.isChecked = false)
      })

      this.setState({ isMarkAllCheckbox, ...tableDataContent })
    }

    const show = tableDataContent.some(item => item.isChecked === true)
    if (show) {
      this.setState({ showExport: true })
    } else {
      this.setState({ showExport: false })
    }

    const dataFilter = tableDataContent.filter(item => item.isChecked === true)

    this.setState({ countItem: dataFilter.length, exportData: dataFilter })
  }

  onChangeSelectFilter = e => {
    let { filterTable } = this.state
    const type = e.target.innerHTML
    const name = e.target.parentNode.parentNode.parentNode.getAttribute('name')

    filterTable[name] = type
    this.setState({ ...filterTable })

    const datePicker = document.querySelector('.holder-date')

    if (filterTable.dateRange === 'Custom Date') {
      // datePicker.classList.add('show')
      this.setState({ showDatePicker: true })
    } else {
      this.setState({ showDatePicker: false })
      // datePicker.classList.remove('show')
    }
  }

  onChangeInputFilter = (e, data) => {
    const { filterCondition } = this.state
    this.setState({
      ...this.state,
      filterCondition: data.value
    })

    // let { filterTable } = this.state
    // const value = e.target.value
    // const name = e.target.name

    // filterTable[name] = value
    // this.setState({ ...filterTable })
  }

  onClickMark = () => {
    let { isMarkOpen } = this.state
    const body = document.querySelector('body')

    isMarkOpen = !isMarkOpen
    body.classList.add('overflow-hide')

    this.setState({ isMarkOpen })
  }

  onClickDay = () => {
    let { callLog } = this.state

    const day = dayLabels
    const data = dayData

    callLog.labels = day
    callLog.datasets[0].data = data
    callLog.isDayActive = true
    callLog.isWeekActive = false
    callLog.isMonthActive = false

    this.setState({ callLog })
  }

  onClickWeek = () => {
    let { callLog } = this.state

    const week = weekLabels
    const data = weekData

    callLog.labels = week
    callLog.datasets[0].data = data
    callLog.isDayActive = false
    callLog.isWeekActive = true
    callLog.isMonthActive = false

    this.setState({ callLog })
  }



  onClickMonth = () => {
    let { callLog } = this.state

    const month = monthLabels
    const data = monthData

    callLog.labels = month
    callLog.datasets[0].data = data
    callLog.isDayActive = false
    callLog.isWeekActive = false
    callLog.isMonthActive = true

    this.setState({ callLog })
  }

  getLeadType = () => {
    let { tableData } = this.state
    if (tableData.isCall) return 'call'
    if (tableData.isMessages) return 'message'
    if (tableData.isSchedules) return 'SCHEDULE_CALL'
  }

  onClickTableCategory = e => {
    let { tableData, tableDataContent, pageNumber } = this.state
    var target = e.target.innerHTML

    if (target === 'Call') {
      tableData.isCall = true
      tableData.isMessages = false
      tableData.isSchedules = false
    } else if (target === 'Messages') {
      tableData.isCall = false
      tableData.isMessages = true
      tableData.isSchedules = false
    } else {
      target = 'schedules'
      tableData.isCall = false
      tableData.isMessages = false
      tableData.isSchedules = true
    }

    pageNumber = 1
    this.filterDataPerPage(target)
    this.setState(
      {
        tableDataContent,
        isMarkAllCheckbox: false,
        pageNumber,
        sortField: 'id',
        sortValue: 'DESC'
      },
      () => {
        this.fetchData()
      }
    )
  }

  handleScore = e => {
    let { tableDataContent } = this.state
    const dataId = e.target.parentNode.parentNode.parentNode.querySelectorAll(
      'td'
    )[1].innerText

    const score = e.target.getAttribute('data-score')

    //alert(dataId)

    tableDataContent.forEach(value => {
      if (value.id === dataId) {
        value.score = score
      }
    })

    this.setState({ tableDataContent })
  }

  toggleTags = e => {
    const dropdown = e.target.querySelector('.holder-dropdown')
    const allDropdown = document.querySelectorAll('.holder-dropdown')

    if (dropdown) {
      allDropdown.forEach(value => {
        value.classList.remove('holder-dropdown-active')
      })
      dropdown.classList.add('holder-dropdown-active')
    } else {
      return
    }
  }

  handleTagsData = e => {
    let { tableDataContent } = this.state
    const tag = e.target.innerText
    const dataId = e.target.parentNode.parentNode.parentNode.querySelectorAll(
      'td'
    )[1].innerText

    tableDataContent.forEach(value => {
      if (value.id === dataId) {
        const index = value.tag.indexOf(tag)

        if (index === -1) {
          value.tag.push(tag)
        } else {
          value.tag.splice(index, 1)
        }
      }
    })

    this.setState({ tableDataContent })
  }

  show = size => () => this.setState({ size, open: true })
  close = () => this.setState({ open: false })

  closeDropdown = e => {
    const { isMarkOpen } = this.state
    const target = e.target.className
    const body = document.querySelector('body')
    const allDropdown = document.querySelectorAll('.holder-dropdown')
    const dropDown = document.querySelector('.holder-export-options')

    if (
      e.target.classList[0] !== 'btn-export' &&
      this.state.showExport === true
    ) {
      dropDown.classList.remove('show')
    }

    if (e.target.classList[0] !== 'tags') {
      allDropdown.forEach(value => {
        value.classList.remove('holder-dropdown-active')
      })
    }

    if (isMarkOpen) {
      if (target !== 'checkbox-item' || target !== 'mark active') {
        body.classList.remove('overflow-hide')
        this.setState({ isMarkOpen: false })
      }
    }
  }

  openExportFile = e => {
    const dropDown = document.querySelector('.holder-export-options')
    dropDown.classList.toggle('show')
  }

  handleChange = (event, data) => {
    this.setState({ selectedValue: data.value })
  }

  handleClick = (e, titleProps) => {
    const { index } = titleProps
    const { activeIndex } = this.state
    const newIndex = activeIndex === index ? -1 : index

    this.setState({ activeIndex: newIndex })
  }

  handleAnimationChange = animation  =>
    this.setState(prevState => ({ animation, visible: !prevState.visible }))

  //Used for to delete the selected LEAD
  onDeleteLeadHandler = () => {
    const { exportData } = this.state   
    if(exportData.length === 0) {
      CommonNotify('Select lead first.')
    } else {
      const token = localStorage.getItem('access_token')
      const URL = `${process.env.REACT_APP_BASE_APP_URL}/api/v1/leads/delete-leads`
      const head = {
        headers: {
          Authorization: 'Bearer ' + token
        }
      }
      var postId = []
      exportData.map(data => {
        postId.push(data.id.replace('#', ''))
      })

    const postData = {
      ids: postId
    }
    
    axios
      .post(URL, postData, head)
      .then(res => {
        this.setState({exportData : [], countItem: 0})
          this.fetchDataAfterDelete()
        // CommonNotify('Lead Deleted Successfully', 'success')
      })
      .catch(err => {
        CommonNotify('Not able to Delete Lead')      
      })
    }
  }

  onPageChange = (e, a) => {
    this.setState(
      {
        ...this.state,
        pageNumber: a.activePage
      },
      () => {
        this.fetchData()
      }
    )
  }

  handleCancel = () => {
    // this.today()
  }

  render() {
    const {
      // callLog,
      tableDataContent,
      tableData,
      isMarkOpen,
      // filterTable,
      isChecked,
      isMarkAllCheckbox,
      tableDataTotalItem,
      startItemCount,
      lastItemCount,
      pageNumber,
      open,
      data,
      activeIndex,
      animation,
      vertical,
      direction,
      directionMobile,
      visible,
      size
    } = this.state

    const title = {
      type: 'image',
      titleOne: leadLogo,
      titleTwo: 'Leads'
    }

    const tagOptions = [
      {
        key: 'ID',
        text: 'ID',
        value: 'id'
      },
      // {
      //   key: 'Date',
      //   text: 'Date',
      //   value: 'Date'
      // },
      {
        key: 'phone_number',
        text: 'Phone Number',
        value: 'phone_number'
      },
      {
        key: 'Type',
        text: 'Type',
        value: 'type'
      },
      // {
      //   key: 'Source',
      //   text: 'Source',
      //   value: 'first_source'
      // },
      {
        key: 'Call Status',
        text: 'Call Status',
        value: 'final_status'
      },
      {
        key: 'status',
        text: 'status',
        value: 'status'
      },
      {
        key: 'Agent',
        text: 'Agent',
        value: 'agent'
      },
      {
        key: 'Score',
        text: 'Score',
        value: 'score'
      },
      {
        key: 'Owner',
        text: 'Owner',
        value: 'owner'
      }
    ]

    const conditionOptions = [
      {
        key: 'equals',
        text: 'equals',
        value: 'is'
      },
      {
        key: 'not equal to',
        text: 'not equal to',
        value: '!is'
      },
      {
        key: 'starts with',
        text: 'starts with',
        value: 'begin'
      }
    ]

    const filter = {
      type: ['Type', 'Existing', 'Meeting', 'Opportunity'],
      status: ['Civil Status', 'Online', 'Offline'],
      score: ['Score', 'All', 'Qualified', 'Bad Fit'],
      owner: ['Owner', 'All', 'Developer AIPXPERTS'],
      agent: ['Agent', 'All', 'Developer AIPXPI'],
      dateRange: ['Date', 'Today', 'Last 7 Days', 'Last 30 Days', 'Custom Date']
    }

    const isMobile = window.innerWidth < 992

    const panes = [
      {
        menuItem: (
          <Menu.Item>
            <Dropdown
              item
              text="Leads"
              open={activeIndex === 0}
              index={0}
              onClick={this.handleClick}
            >
              <Dropdown.Menu>
                <Dropdown.Item>
                  You <Label>0</Label>
                </Dropdown.Item>
                <Dropdown.Item>
                  Mentions <Label>2</Label>
                </Dropdown.Item>
                <Dropdown.Item>
                  All <Label>4</Label>
                </Dropdown.Item>
                <Dropdown.Item>
                  Support <Label>4</Label>
                </Dropdown.Item>
                <Dropdown.Item>
                  Sales <Label>4</Label>
                </Dropdown.Item>
                <Dropdown.Item>
                  Billing <Label>4</Label>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Menu.Item>
        )
      },
      {
        menuItem: (
          <Menu.Item>
            <Dropdown
              item
              text="Basic"
              open={activeIndex === 1}
              index={1}
              onClick={this.handleClick}
            >
              <Dropdown.Menu>
                <Dropdown.Item>
                  New Leads <Label>0</Label>
                </Dropdown.Item>
                <Dropdown.Item>
                  Top Leads <Label>2</Label>
                </Dropdown.Item>
                <Dropdown.Item>
                  Qualified Leads <Label>4</Label>
                </Dropdown.Item>
                <Dropdown.Item>
                  Connected to CRM <Label>4</Label>
                </Dropdown.Item>
                <Dropdown.Item>
                  Found in CRM <Label>4</Label>
                </Dropdown.Item>
                <Dropdown.Item>
                  My open deals <Label>4</Label>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Menu.Item>
        )
      },
      {
        menuItem: (
          <Menu.Item>
            <Dropdown
              item
              text="Status"
              open={activeIndex === 2}
              index={2}
              onClick={this.handleClick}
            >
              <Dropdown.Menu>
                <Dropdown.Item>
                  All users <Label>0</Label>
                </Dropdown.Item>
                <Dropdown.Item>
                  All leads <Label>2</Label>
                </Dropdown.Item>
                <Dropdown.Item>
                  Active <Label>4</Label>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Menu.Item>
        )
      }
    ]

    return (
      <>
        <Dimmer active={this.state.isLoading} style={{ position: 'fixed' }}>
          <Loader />
        </Dimmer>
        <div className="lead-container">
          <Title data={title} />
          <div className="widget-banner-container">
            <LeadBanner />
            <div className="lead-content-holder">
              {this.state.rightPane && this.state.dataLoaded ? (
                <RightPane
                  rightPane={this.state.rightPane}
                  handleRightClose={this.handleRightClose}
                  leadData={this.state.leadData}
                  nextLeadId={this.state.nextLeadId}
                  prevLeadId={this.state.prevLeadId}
                  leadOwner={this.state.leadOwner}
                  leadScore={this.state.leadScore}
                  handleRightPaneOpen={this.handleRightPaneOpen}
                />
              ) : (
                ''
              )}
              <Sidebar.Pushable as={Segment}>
                {isMobile ? (
                  <Sidebar
                    as={Menu}
                    animation={animation}
                    direction={directionMobile}                   
                    icon="labeled"
                    inverted
                    vertical
                    visible={visible}
                    width="thin"
                    disabled={vertical}
                    onClick={this.handleAnimationChange('uncover')}
                  >
                    {/* {isMobile ? (
                    <h2 className="segment-text">
                      Segment
                      <Icon
                        name="chevron circle down"
                        disabled={vertical}
                        onClick={this.handleAnimationChange('uncover')}
                      />
                    </h2>
                  ) : (
                    <h2 className="segment-text">Segment</h2>
                  )} */}
                    <Tab
                      menu={{ fluid: true, vertical: true, tabular: true }}
                      panes={panes}
                      className="leads-tab"
                    />
                  </Sidebar>
                ) : (
                  <Sidebar
                    as={Menu}
                    animation={animation}
                    direction={direction}
                    icon="labeled"
                    inverted
                    vertical
                    visible={visible}
                    width="thin"
                  >
                    <h2 className="segment-text">Segment</h2>
                    <Tab
                      menu={{ fluid: true, vertical: true, tabular: true }}
                      panes={panes}
                      className="leads-tab"
                    />
                  </Sidebar>
                )}

                <Sidebar.Pusher>
                  <Segment basic>
                    <div
                      onClick={this.closeDropdown}
                      className={
                        isMarkOpen
                          ? 'holder-content mark-open'
                          : 'holder-content leads_main'
                      }
                    >
                      {/* <div className = 'leads-description-container'>
                        <div className='lead-icon'>
                          <img src = { LeadIcon } alt = 'lead icon'/>
                        </div>
                        <div className='lead-description-text'>
                          {' Assign, track & follow up with your potential customers faste '}
                        </div>
                      </div> */}
                      <div className="holder-table">
                        <div
                          className="lead-header"
                          style={{
                            width: '100%',
                            display: 'flex',
                            justifyContent: 'space-between'
                          }}
                        >
                          <div className="filter-wrapper">
                            <div className="date-range-parent custom-range-parent">
                              <Dropdown
                                onChange={this.handleChangeDate}
                                options={options}
                                selection
                                style={{ marginRight: 40 }}
                                value={this.state.selectedPickerOption}
                              />
                              {this.state.selectedPickerOption ===
                              'Select custom' ? (
                                <CommonDateRangePicker
                                  handleApply={this.handleApply}
                                  handleCancel={this.handleCancel}
                                  initialSettings={{
                                    startDate: this.state.filterTable
                                      .startDateFilter,
                                    endDate: this.state.filterTable
                                      .endDateFilter,
                                    maxDate: moment()
                                  }}
                                />
                              ) : null}
                            </div>
                          </div>
                          <div className="filter-sort">
                            <span
                              onClick={this.onClickTableCategory}
                              className={tableData.isCall ? 'active' : null}
                            >
                              Call
                            </span>

                            <span
                              onClick={this.onClickTableCategory}
                              className={tableData.isMessages ? 'active' : null}
                            >
                              Messages
                            </span>
                            <span
                              onClick={this.onClickTableCategory}
                              className={
                                tableData.isSchedules ? 'active' : null
                              }
                            >
                              Meetings
                            </span>
                          </div>
                        </div>

                        <div className="holder-filter-leads">
                          {/* {isMobile ? (
                          <Icon
                            name="chevron circle up"
                            disabled={vertical}
                            onClick={this.handleAnimationChange('uncover')}
                          />
                        ) : (
                          <Icon
                            name="chevron circle left"
                            disabled={vertical}
                            onClick={this.handleAnimationChange('uncover')}
                          />
                        )} */}
                          <div className="filter-lead">
                            {this.state.addOfficeHour2.map((data, index) => {
                              return (
                                <div key={index} className="filter-tab">
                                  <div className="filter-holder">
                                    <Dropdown
                                      icon="plus"
                                      floating
                                      labeled
                                      button
                                      className="icon add-filter"
                                      options={tagOptions}
                                      value={this.state.selectedValue}
                                      onChange={this.handleChange}
                                      placeholder="Add filter"
                                    />

                                    <div className="filter-condition">
                                      {!this.state.filterDropDownOption[
                                        this.state.selectedValue
                                      ] && (
                                        <Dropdown
                                          icon="filter"
                                          floating
                                          labeled
                                          button
                                          className="icon condition-select"
                                          options={conditionOptions}
                                          placeholder="Select Condition"
                                          onChange={this.onChangeInputFilter}
                                        />
                                      )}

                                      {this.state.filterDropDownOption[
                                        this.state.selectedValue
                                      ] ? (
                                        <Dropdown
                                          icon="filter"
                                          floating
                                          labeled
                                          button
                                          className="icon condition-select"
                                          options={
                                            this.state.filterDropDownOption[
                                              this.state.selectedValue
                                            ]
                                          }
                                          placeholder="Select Condition"
                                          onChange={(e, data) =>
                                            this.setState({
                                              ...this.state,
                                              query: data.value,
                                              pageNumber : 1
                                            })
                                          }
                                        />
                                      ) : (
                                        <Input
                                          placeholder="Query"
                                          value={this.state.query}
                                          onChange={e =>
                                            this.setState({
                                              ...this.state,
                                              query: e.target.value
                                            })
                                          }
                                        />
                                      )}
                                      {/* <Input
                                          placeholder="Query"
                                          onChange={e =>
                                            this.setState({
                                              ...this.state,
                                              query: e.target.value
                                            })
                                          }
                                        /> */}
                                    </div>
                                  </div>
                                  {index == 0 ? (
                                    <CommonButton
                                      onClick={e => this.fetchData()}
                                      btnClass="btn-delete"
                                      icon="search"
                                    />
                                  ) : null}
                                </div>
                              )
                            })}
                          </div>
                          <div >
                <Dropdown
                  onChange={this.handleSortData}
                  options={sortOptions}
                  style={{marginRight: 40}}
                  selection
                  value={this.state.sortPickerOption}
                />
  
                          </div>
                          {/* <div className="filter-add">
                          <CommonButton
                            onClick={this.onClickAddOfficeHour2}
                            btnClass="btn-hours"
                            icon="search"
                          />
                        </div> */}
                        </div>
                        <div className="holder-table-main">
                          <div className="holder-filter">
                            {/* <span className="filter-title">Filter By</span> */}
                            <div className="holder-date-range">
                              <CommonSelect
                                onChange={e => this.onChangeSelectFilter(e)}
                                name="dateRange"
                                placeholder="Date"
                                options={filter.dateRange}
                              />
                            </div>
                            <div className="holder-status">
                              <CommonSelect
                                onChange={this.onChangeSelectFilter}
                                name="status"
                                placeholder="Call Status"
                                options={filter.status}
                              />
                            </div>
                            {/* <div className="holder-type">
                    <CommonSelect
                      onChange={this.onChangeSelectFilter}
                      name="type"
                      placeholder="Type"
                      options={filter.type}
                    />
                  </div> */}
                            <div className="holder-agent">
                              <CommonSelect
                                onChange={this.onChangeSelectFilter}
                                name="agent"
                                placeholder="Agent"
                                options={filter.agent}
                              />
                            </div>
                            <div className="holder-score">
                              <CommonSelect
                                onChange={this.onChangeSelectFilter}
                                name="score"
                                placeholder="Score"
                                options={filter.score}
                              />
                            </div>
                            <div className="holder-score">
                              <CommonSelect
                                onChange={this.onChangeSelectFilter}
                                name="owner"
                                placeholder="Owner"
                                options={filter.owner}
                              />
                            </div>
                            {/* <div className="holder-other-search">
                    <input
                      onChange={this.onChangeInputFilter}
                      name="otherSearch"
                      type="text"
                      placeholder="Mail, Phone, Name"
                    />
                  </div> */}
                            {this.state.showDatePicker && (
                              <div className="holder-date show">
                                {/* <span className="title">Start</span> */}
                                <div className="holder-datepicker">
                                  {/* <DatePicker
                        selected={filterTable.startDateFilter}
                        onChange={this.handleStartDate}
                        dateFormat="MM/dd/yy"
                      /> */}
                                  {/* <SemanticDatepicker
                                    onChange={this.handleStartDate}
                                    type="range"
                                    format="MM/DD/YYYY"
                                    keepOpenOnClear={true}
                                  /> */}
                                </div>
                                {/* <span className="dash">End</span>
                    <div className="holder-datepicker">
                      <DatePicker
                        selected={filterTable.endDateFilter}
                        onChange={this.handleEndDate}
                        dateFormat="MM/dd/yy"
                      />
                    </div> */}
                              </div>
                            )}
                            {/* <div className="holder-add-filter">
                      <button>Add filter</button>
                    </div> */}
                          </div>
                          <div className="holder-search">
                            <input
                              onChange={this.onChangeInputFilter}
                              name="search"
                              type="text"
                              placeholder="Mail, Phone, Name"
                            />
                          </div>
                        </div>
                        <div className="table lead_table">
                          <div className="table-content">
                            {this.state.countItem ? (
                              <div
                                className="holder-pagination"
                                style={{
                                  justifyContent: 'left',
                                  padding: '33px'
                                }}
                              >
                                <div className="pagination">
                                  {/* <span>Page</span>
                                <div className="page-number">
                                  <span className="page">{pageNumber}</span>
                                  <button
                                    onClick={this.onClickIncrementPage}
                                    className="increment"
                                  >
                                    <i className="fas fa-chevron-up"></i>
                                  </button>
                                  <button
                                    onClick={this.onClickDecrementPage}
                                    className="decrement"
                                  >
                                    <i className="fas fa-chevron-down"></i>
                                  </button>
                                </div> */}
                                  {/* <p>
                          {startItemCount} to {lastItemCount} records of total{' '}
                          {tableDataTotalItem}
                        </p> */}

                                  <div className="chart-filter">
                                    <div className="heading">
                                      <div className="holder-btn-export">
                                        <div className="btn-export-data">
                                          {this.state.countItem ? (
                                            <button
                                              className="btn-export"
                                              type="button"
                                              onClick={this.openExportFile}
                                            >
                                              <Image src={exportIcon} />
                                              Export
                                            </button>
                                          ) : null}
                                        </div>

                                        {/* {isMarkAllCheckbox ? (
                                        <button
                                          className="btn-export"
                                          type="button"
                                          onClick={this.openExportFile}
                                        >
                                          <Image src={exportIcon} />
                                          Export
                                        </button>
                                      ) : null} */}
                                        <div className="holder-export-options">
                                        <ExportToExcel apiData={this.state.exportData} fileName="Excel" />
                                          {this.state.exportData && (
                                            <CSVLink
                                              target="_blank"
                                              style={{
                                                color: 'white',
                                                textDecoration: 'none'
                                              }}
                                              data={
                                                this.state.exportData &&
                                                this.state.exportData
                                              }
                                              headers={headers}
                                            >
                                              CSV
                                            </CSVLink>
                                          )}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  {this.state.countItem ? (
                                    <div className="table-delete leas_delete_box">
                                      <p>
                                        {this.state.countItem} of{' '}
                                        {this.state.tableDataContent.length}{' '}
                                        records selected
                                      </p>

                                      <CommonButton
                                        btnClass="btn-delete"
                                        image={deleteIcon}
                                        onClick={this.onDeleteLeadHandler}
                                      />
                                      <Button
                                        onClick={this.onDeleteLeadHandler}
                                        className="btn-clear"
                                      >
                                        Clear selection
                                      </Button>
                                    </div>
                                  ) : null}
                                </div>
                                <div className="holder-edit-fields"></div>
                              </div>
                            ) : null}
                            <div className="lead-table-holder">
                              <LeadTable



                                leadScore={this.state.leadScore}
                                tableDataContent={this.state.tableDataContent}
                                isMarkAllCheckbox={isMarkAllCheckbox}
                                isMarkOpen={isMarkOpen}
                                leadStage={this.state.leadStage}
                                leadOwner={this.state.leadOwner}
                                onClickMarkAllCheckbox={
                                  this.onClickMarkAllCheckbox
                                }
                                leadType={this.getLeadType()}
                                onClickMark={this.onClickMark}
                                onClickMarkCheckbox={this.onClickMarkCheckbox}
                                handleScore={this.handleScore}
                                onHoverScore={this.onHoverScore}
                                toggleTags={this.toggleTags}
                                handleTagsData={this.handleTagsData}
                                setSortField={this.setSortField}
                                dropDownData={this.state.dropDownData}
                                rightPane={this.state.rightPane}
                                handleRightPaneOpen={this.handleRightPaneOpen}

                              />
                            </div>
                            <div
                              className="holder-pagination"
                              style={{
                                padding: '0px 0px 33px 0px',
                                float: 'center'
                              }}
                            >
                              <div className="pagination">
                                <Pagination
                                  defaultActivePage={1}
                                  totalPages={this.state.totalPages}
                                  onPageChange={this.onPageChange}
                                  // onClick={this.onClickIncrementPage}
                                />
                                {/* <span>Page</span>
                                <div className="page-number">
                                  <span className="page">{pageNumber}</span>
                                  <button
                                    onClick={this.onClickIncrementPage}
                                    className="increment"
                                  >
                                    <i className="fas fa-chevron-up"></i>
                                  </button>
                                  <button
                                    onClick={this.onClickDecrementPage}
                                    className="decrement"
                                  >
                                    <i className="fas fa-chevron-down"></i>
                                  </button>
                                </div> */}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Segment>
                </Sidebar.Pusher>
              </Sidebar.Pushable>
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default Leads

// {process.env.REACT_APP_BASE_APP_URL}}/api/v1/leads?page=1&limit=10&sort=-id&filter[agent][is]=Arjun kan&filter[phone_number][begin]=+01102852202&filter[type][is]=LIVE_CALL&filter[owner][is]=Arjun kan
