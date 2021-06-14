import React, { Component, createRef } from 'react'
import { Accordion, Dimmer, Loader } from 'semantic-ui-react'

import Title from '../common/Title'
import Collapse from '../common/Accordion'
import WidgetBanner from '../components/widgets/WidgetBanner'
import {
  showWidget,
  widgetShadow,
  widgetBehaviour,
  legalWidget,
  socialWidget,
  socialWidgetActive,
  privacyWidget,
  classicSmart,
  webCallDisplay,
  callMeBackDisplay,
  leaveMessageDisplay,
  callMeLaterDisplay,
  clickToCallCustomFields,
  callMeBackCustomFields,
  callMeLaterCustomFields,
  leaveMessageCustomFields,
  leaveMessageName,
  leaveMessageEmail,
  leaveMessageTeam,
  callMeLaterName,
  callMeLaterEmail,
  callMeLaterTeam,
  clickToCallName,
  clickToCallEmail,
  clickToCallTeam,
  callMeBackName,
  callMeBackEmail,
  callMeBackTeam,
  callMeBackTelNumber,
  callMeLaterTelNumber,
  callMeLaterEmailText,
  callMeLaterNameText,
  chosenPage,
  pageLoad,
  pageExit,
  pagePercent,
  pageSeconds,
  visitorUsing,
  knownIdentity,
  customAttribute,
  addUrl,
  userPage,
  haveCookie,
  dontHaveCookie,
  specificUrl,
  includeTagged,
  excludeTagged,
  lstSpecificPageOptions,
  lstFieldTypeOptions,
  showFollowUpBrandName,
  showQualification,
  lstCustomFieldTypeOptions,
  lstCustomFieldDisplay,
  lstCustomFieldDisplayOnCallNow,
  widgetCustomFieldDisplayOnCallNow,
  lstCustomFieldDisplayOnCallLater
} from '../lib/WidgetData'

import icon from '../assets/images/settingIcon.png'

import moment from 'moment'

import { WidgetInstallTitle } from '../components/widgets/WidgetInstall'
// import {
//   SayHelloTitle,
//   SayHelloContent
// } from '../components/widgets/WidgetSayHello'
// import {
//   WidgetCallerIDTitle,
//   WidgetCallerIDContent
// } from '../components/widgets/WidgetCallerSettings'
import {
  WidgetAvailabilityTitle,
  WidgetAvailabilityContent
} from '../components/widgets/WidgetAvailability'
import {
  WidgetBehaviourTitle,
  WidgetBehaviourContent
} from '../components/widgets/WidgetBehaviours'
import {
  WidgetStyleTitle,
  WidgetStyleContent
} from '../components/widgets/WidgetStyles'
import {
  WidgetTeamsTitle,
  WidgetTeamsContent
} from '../components/widgets/WidgetTeams'
import {
  WidgetAvailableDomainsTitle,
  WidgetAvailableDomainsContent
} from '../components/widgets/WidgetAvailableDomains'
// import {
//   WidgetNotificationTitle,
//   WidgetNotificationContent
// } from '../components/widgets/WidgetNotification'
import {
  WidgetGeneralTitle,
  WidgetGeneralContent
} from '../components/widgets/WidgetGeneral'
import {
  WidgetFollowUpTitle,
  WidgetFollowUpContent
} from '../components/widgets/WidgetFollowUp'
// import {
//   WidgetIncomingNumberTitle,
//   WidgetIncomingNumberContent
// } from '../components/widgets/WidgetIncomingNumber';
// import {
//   WidgetQualificationTitle,
//   WidgetQualificationContent
// } from '../components/widgets/WidgetQualification'

import {
  WidgetWhereAppearTitle,
  WidgetWhereAppearContent
} from '../components/widgets/WidgetWhereAppear'

// import {
//   WidgetShouldAppearTitle,
//   WidgetShouldAppearContent
// } from '../components/widgets/WidgetShouldAppear'

// import {
//   WidgetSurveyDisplayTitle,
//   WidgetSurveyDisplayContent
// } from '../components/widgets/WidgetSurveyDisplay'

// import {
//   WidgetSeeSurveyTitle,
//   WidgetSeeSurveyContent
// } from '../components/widgets/WidgetSeeSurvey'

import {
  WidgetCustomCssTitle,
  WidgetCustomCssContent
} from '../components/widgets/WidgetCustomCss'

import squareActive from '../assets/images/square.svg'
import squareActiveBlack from '../assets/images/cicle-plus.png'

import axios from 'axios'
import {
  GreetingStyleTitle,
  WidgetGreetingStyleContent
} from '../components/widgets/WidgetGreeting'
import { CommonNotify } from '../common/CommonNotify'

import { logOut } from  '../common/ProfileModal';

const apiToken = localStorage.getItem('access_token')


const titleContent = {
  type: 'image',
  titleOne: icon,
  titleTwo: 'Widgets'
}

const initLstCustomFields = {
  fieldType: lstCustomFieldTypeOptions[1],
  label: '',
  value: '',
  showQualificationButton: false,
  showRequiredQualificationButton: false,
  displayTabs: lstCustomFieldDisplay[0],
  displayOnCallMeNow: lstCustomFieldDisplayOnCallNow[0],
  displayOnCallMeNowWidget: widgetCustomFieldDisplayOnCallNow[0],
  displayOnCallMeLater: lstCustomFieldDisplayOnCallLater[0]
}

class Widgets extends Component {
  state = {
    isLoading: false,
    activeIndex: false,
    triggerOnce: false,
    cssClick: false,
    timeTriggerSeconds: false,
    ExitIntentTrigger: false,
    scrollTrigger: false,
    widgetShadow: false,
    filterLanguage: '',
    languageList: ['English', 'Nihonggo'],
    englishTextArea: '',
    englishInput: '',
    positionBtn: '',
    widgetShape: 'Default(Round)',
    displayName: '',
    setOfficeHour: {
      addOfficeHour: '',
      weekdays: 'Weekdays',
      officeHourFrom: '',
      officeHourTo: ''
    },
    setOfficeHour2: {
      addOfficeHour2: '',
      link: 'Link',
      officeHourFrom: '',
      officeHourTo: ''
    },
    setAddMoreUrl: {
      addMoreUrl: ''
    },
    widgetName: '',
    widgetEmail: '',
    dataProtectionMessage: '',
    widgetLanguage: '',
    timezone: 'Asia/Kolkata',
    dataTable: {
      type: '4',
      header: [
        {
          headerTitle: 'ID'
        },
        {
          headerTitle: 'Phone Number'
        },
        {
          headerTitle: 'Verified Timestamp'
        },
        {}
      ],
      tableContentData: [
        {
          id: '#123432',
          columnOne: '+91-7795795694',
          columnTwo: '2019-05-18 17:23',
          verify: true
        },
        {
          id: '#123432',
          columnOne: '+91-7795795695',
          columnTwo: '',
          verify: false
        }
      ]
    },
    addOfficeHour: [1],
    addOfficeHour2: [1],
    addMoreUrl: [1],
    lstSpecificPage: [
      {
        type: lstFieldTypeOptions[1],
        key: 'url',
        operator: lstSpecificPageOptions[1],
        value: '',
        option: 'AND'
      }
    ],
    lstCustomFields: [
      {
        ...initLstCustomFields
      }
    ],
    thankYouToggle: false,
    missedCallToggle: false,
    scheduleCallMessageToggle: false,
    customTargetToggle: false,
    showWidgetToggle: false,
    showShadowWidgetToggle: false,
    lstUrls: [],
    lstFinalCustomFields: [],
    domains: [],
    isCustomeCancelModalOpen: false,
    widgetStyleTabs: {
      clickToCall: true,
      callMeBack: false,
      callMeLater: false,
      leaveMessage: false
    },
    allowedTabs: {
      clickToCall: true,
      callMeBack: true,
      callMeLater: true,
      leaveMessage: true
    },
    socialToggle: false,
    legalToggle: false,
    privacyToggle: false,
    toggleCustomAttribute: false,
    useWebsiteAttribute: false,
    visitedAtLeast: false,
    knownIdentityAttribute: false,
    brandNameSMSToggle: false,
    scheduleCallReminderMessageToggle: false,
    thankYouMessageText: 'Thanks for contacting us',
    missedCallMessageText: 'Missed call Message',
    fullNameToggle: false,
    emailToggle: false,
    teamToggle: false,
    customFieldsToggle: false,
    callAlgorithm:
      'Show the widget again, but during the next visit to the website',
    respondText: 'Never show the widget again',
    isModalOpen: false,
    cardSummary: false,
    data: {
      nodeCheckboxEmail: []
    },
    activeIndexSurvey: false,
    activeIndexWidget: false,
    visitorType: 'All',
    cameSiteItem: 'It doesnt matter (all traffic sources)',
    startTime: moment(),
    endTime: moment(),
    widget: {
      id: '',
      script: '',
      business_hours_status: null
    },
    isValue: false,
    widgetBehaviourToggleData: widgetBehaviour,
    widgetDataAPi: null,
    widgetDataAPiSaveCancel: false,
    widgetObject: {}
  }

  returnFunctionStart = event => {
    this.setState({
      ...this.state,
      startTime: event.startTime
    })
  }

  returnFunctionEnd = event => {
    this.setState({
      ...this.state,
      endTime: event.endTime
    })
  }

  handleClickSurvey = (e, titleProps) => {
    const { index } = titleProps
    const { activeIndexSurvey } = this.state
    const newIndex = activeIndexSurvey === index ? -1 : index

    this.setState({
      ...this.state,
      activeIndexSurvey: newIndex
    })
  }

  handleClickWidget = (e, titleProps) => {
    const index  = titleProps
    const { activeIndexWidget } = this.state
    const newIndex = activeIndexWidget === index ? -1 : index    
    this.setState({
      activeIndexWidget: newIndex
    })

    const target = e.target.id
    let newTableData = {
      clickToCall: false,
      callMeBack: false,
      callMeLater: false,
      leaveMessage: false
    }
    if (target === 'clickToCall') {
      newTableData.clickToCall = true
      newTableData.callMeBack = false
      newTableData.callMeLater = false
      newTableData.leaveMessage = false
    } else if (target === 'callMeBack') {
      newTableData.clickToCall = false
      newTableData.callMeBack = true
      newTableData.callMeLater = false
      newTableData.leaveMessage = false
    } else if (target === 'callMeLater') {
      newTableData.clickToCall = false
      newTableData.callMeBack = false
      newTableData.callMeLater = true
      newTableData.leaveMessage = false
    } else if (target === 'leaveMessage') {
      newTableData.clickToCall = false
      newTableData.callMeBack = false
      newTableData.callMeLater = false
      newTableData.leaveMessage = true
    }

    this.setState({ widgetStyleTabs: newTableData })
  }

  handleRadio = (state, value) => {
    this.setState({
      ...this.state,
      [state]: value
    })
  }

  handleRadioSurvey = (state, value) => {
    this.setState({
      ...this.state,
      [state]: value
    })
  }

  handleModal = () => {
    let { isModalOpen, cardSummary } = this.state

    isModalOpen = !isModalOpen
    cardSummary = false
    this.setState({
      ...this.state,
      isModalOpen,
      cardSummary
    })
  }

  onChangeNodeCheckbox = e => {
    const name = e.target.parentNode.parentNode.parentNode.getAttribute('name')
    const value = e.target.innerText
    const { data } = this.state

    const index = data[name].indexOf(value)
    if (index === -1) {
      data[name].push(value)
    } else {
      data[name].splice(index, 1)
    }

    this.setState({
      ...this.state,
      data
    })
  }

  handleCloseModal = () =>
    this.setState({
      ...this.state,
      isModalOpen: false
    })

  onChangeInput = e => {
    const ref = e.target.name
    const value = e.target.value
    if (value) {
      this.setState({ ...this.state, isValue: true })
    } else {
      this.setState({ ...this.state, isValue: false })
    }

    this.setState({
      ...this.state,
      [ref]: value
    })
  }

  handleClick = (e, titleProps) => {
    const { index } = titleProps
    const { activeIndex } = this.state
    const newIndex = activeIndex === index ? -1 : index

    this.setState({
      ...this.state,
      activeIndex: newIndex
    })
  }

  handleCloseClick = () => {
    const { activeIndex } = this.state
    this.setState({
      ...this.state,
      activeIndex: !activeIndex
    })
  }

  onChangeSelect = e => {
    const name = e.target.parentNode.parentNode.parentNode.getAttribute('name')
    const value = e.target.innerText
    if (value) {
      this.setState({ ...this.state, isValue: true })
    } else {
      this.setState({ ...this.state, isValue: false })
    }
    this.setState({
      ...this.state,
      [name]: value
    })
  }

  onChangeSelectOfficeHour = e => {
    const { setOfficeHour } = this.state
    const name = e.target.parentNode.parentNode.parentNode.getAttribute('name')
    const value = e.target.innerText

    setOfficeHour[name] = value

    this.setState({
      ...this.state,
      setOfficeHour
    })
  }

  cloneSetHoursWrapper = () => {
    const currentDiv = this.state.addOfficeHour
    currentDiv.push(1)
    this.setState({
      ...this.state,
      addOfficeHour: currentDiv
    })
  }

  cloneSetHoursWrapper2 = () => {
    const currentDiv2 = this.state.addOfficeHour2
    currentDiv2.push(1)
    this.setState({
      ...this.state,
      addOfficeHour2: currentDiv2
    })
  }

  cloneAddMoreUrl = () => {
    const currentDivUrl = this.state.addMoreUrl
    currentDivUrl.push(1)
    this.setState({
      ...this.state,
      addMoreUrl: currentDivUrl
    })
  }

  onClickRemoveOfficeHours = () => {
    const currentDiv = this.state.addOfficeHour
    currentDiv.pop()
    this.setState({
      ...this.state,
      addOfficeHour: currentDiv
    })
  }

  onClickRemoveOfficeHours2 = () => {
    const currentDiv2 = this.state.addOfficeHour2
    currentDiv2.pop()
    this.setState({
      ...this.state,
      addOfficeHour2: currentDiv2
    })
  }

  onClickRemoveAddMore = () => {
    const currentDivUrl = this.state.addMoreUrl
    currentDivUrl.pop()
    this.setState({
      ...this.state,
      addMoreUrl: currentDivUrl
    })
  }

  onClickAddOfficeHour = () => {
    const { setOfficeHour } = this.state
    const weekdays = this.state.setOfficeHour.weekdays
    const officeHourFrom = this.state.setOfficeHour.officeHourFrom
    const officeHourTo = this.state.setOfficeHour.officeHourTo
    const addOfficeHour = 'addOfficeHour'
    const addOfficeHourItem =
      weekdays + ' ' + officeHourFrom + ' ' + officeHourTo

    setOfficeHour[addOfficeHour] = addOfficeHourItem

    this.setState({
      ...this.state,
      setOfficeHour
    })

    this.cloneSetHoursWrapper()
  }

  onClickAddOfficeHour2 = () => {
    const { setOfficeHour2 } = this.state
    const link = this.state.setOfficeHour2.link
    const officeHourFrom = this.state.setOfficeHour2.officeHourFrom
    const officeHourTo = this.state.setOfficeHour2.officeHourTo
    const addOfficeHour2 = 'addOfficeHour2'
    const addOfficeHourItem2 = link + ' ' + officeHourFrom + ' ' + officeHourTo

    setOfficeHour2[addOfficeHour2] = addOfficeHourItem2

    this.setState({
      ...this.state,
      setOfficeHour2
    })

    this.cloneSetHoursWrapper2()
  }

  onClickAddMore = () => {
    const { setAddMoreUrl } = this.state
    const addMoreUrl = 'addMoreUrl'
    const addMoreUrlItem = (setAddMoreUrl[addMoreUrl] = addMoreUrlItem)

    this.setState({
      ...this.state,
      setAddMoreUrl
    })

    this.cloneAddMoreUrl()
  }

  handleQualification = (index, DataRef, Value) => {
    const lstCustomFields = this.state.lstCustomFields
    lstCustomFields[index][DataRef] = Value
    this.setState({
      ...this.state,
      lstCustomFields
    })
  }

  handleDataRef = (DataRef, DataState, index) => {

   


    // const { widgetBehaviourToggleData } = this.state    
    // const widgetBehaviour = [...widgetBehaviourToggleData]
    // widgetBehaviour[index].active = DataState
    this.setState({
      ...this.state,
      [DataRef]: DataState
    })
    if (DataRef === 'customTargetToggle') {
      const widgetObjectUpdate = { ...this.state.widgetObject }
      widgetObjectUpdate['custom_triggers_status'] = DataState ? 1 : 0
      this.setState({
        widgetObject: widgetObjectUpdate
      })
      this.onChangeTargetStatus(DataState)
    }
  }
  onChangeTargetStatus = DataRef => {
    this.setState({  isLoading: true })

    // const apiToken = sessionStorage.getItem('access_token')
    const apiToken = localStorage.getItem('access_token')
    this.setState({ isLoading: true })

    let head = {
      headers: {
        Authorization: 'Bearer ' + apiToken
      }
    }
    const data = DataRef ? 1 : 0
    const url = `${process.env.REACT_APP_BASE_APP_URL}/api/v1/widget/${this.state.widget.id}/targets-status/${data}`

    axios
      .post(url, {}, head)
      .then(res => {
        this.setState({ isLoading: false })
        CommonNotify(res.data.message[0], 'success')
      })
      .catch(err => {
        this.setState({ ...this.state, isLoading: false })
        CommonNotify('Some thing went Wrong')
      })
  }
  handleGroupBtnData = (toggleBtn, id) => {
    this.setState({
      ...this.state,
      [id]: toggleBtn
    })
  }

  onVerify = () => {
    this.setState({
      ...this.state,
      verified: true
    })
  }

  

  onAddRemoveCustomeFields = ({ index, item } = {}) => {
    let lstCustomFields = [...this.state.lstCustomFields]
    if (index) {
      lstCustomFields.splice(index, 1)
    } else if (item) {
      lstCustomFields.push({
        ...initLstCustomFields
      })
    }
    this.setState({
      ...this.state,
      lstCustomFields
    })
  }

  onAddRemoveSpecificPage = ({ index, item } = {}) => {
    let lstSpecificPage = [...this.state.lstSpecificPage]
    if (index) {
      lstSpecificPage.splice(index, 1)
    } else if (item) {
      const newRecord = {
        fieldType: lstFieldTypeOptions[1],
        weekdays: lstSpecificPageOptions[1],
        link: lstSpecificPageOptions[1],
        text: '',
        officeHourFrom: lstSpecificPage[0].officeHourFrom
      }
      lstSpecificPage.push(newRecord)
    }
    this.setState({
      ...this.state,
      lstSpecificPage
    })
  }

  onUpdateCustomeFields = (index, { name, value }) => {
    if (index > -1) {
      let { lstCustomFields } = this.state
      lstCustomFields[index][name] = value
      this.setState({
        ...this.state,
        lstCustomFields
      })
    }
  }

  onUpdateSpecificRecord = (index, { name, value }) => {
    if (index > -1) {
      let { lstSpecificPage } = this.state
      if (name === 'officeHourFrom') {
        lstSpecificPage = lstSpecificPage.map(x => {
          x[name] = value
          return x
        })
      } else {
        lstSpecificPage[index][name] = value
      }
      this.setState({
        ...this.state,
        lstSpecificPage
      })
    }
  }

  onSubmitCustomFields = () => {
    const lstFinalCustomFields = this.state.lstCustomFields
    this.setState({
      ...this.state,
      lstFinalCustomFields: [...lstFinalCustomFields]
    })
    this.setState({
      ...this.state,
      lstCustomFields: [
        {
          ...initLstCustomFields
        }
      ]
    })
  }

  onSubmitSpecificRecords = () => {
    const { lstSpecificPage, lstUrls } = this.state
    if (lstSpecificPage[0].value === '') {
      CommonNotify('Please fill Input felid', 'warning')
      return
    }
    const lstAllUrls = [...lstSpecificPage]
    this.setState({
      ...this.state,
      lstUrls: lstAllUrls
    })
    this.setState({
      ...this.state,
      lstSpecificPage: [
        {
          type: lstSpecificPage.type,
          key: lstSpecificPage.key,
          operator: lstSpecificPage.operator,
          value: lstSpecificPage.value,
          option: lstSpecificPage.option
        }
      ]
    })
  }

  handleCustomFieldModal = ({ index }) => {
    let { isCustomeCancelModalOpen } = this.state
    this.setState({
      ...this.state,
      isCustomeCancelModalOpen: !isCustomeCancelModalOpen
    })
  }

  handleCloseCancelModal = () =>
    this.setState({
      ...this.state,
      isCustomeCancelModalOpen: false
    })

  onDeleteCustomFields = ({ index }) => {
    const { lstFinalCustomFields } = this.state
    lstFinalCustomFields.splice(index, 1)
    this.setState({
      ...this.state,
      lstFinalCustomFields
    })
  }

  onChangeState = domains => {
    this.setState({
      ...this.state,
      domains
    })
  }
  onChangeInputBehaviour = (DataState, DataRef, updatedData) => {
    const widgetDataAPiUpdate = { ...this.state.widgetDataAPi }
    widgetDataAPiUpdate[DataRef] = updatedData ? updatedData :  DataState;




    // this.onUpdateBehaviourToggle(widgetDataAPiUpdate)
    this.setState({ widgetDataAPi: widgetDataAPiUpdate })
  }

  updateDataRef = (DataState, DataRef, index, type) => {        

    let tmpDataState = DataState;
    const { widgetBehaviourToggleData } = this.state
    const widgetBehaviour = [...widgetBehaviourToggleData]

    if (type === 'input') {
      this.setState({ widgetDataAPiSaveCancel: true })
      if(!DataState && parseInt(DataState) !== parseInt(0)){
        tmpDataState = 0;
      }

      this.onChangeInputBehaviour(tmpDataState, DataRef, parseInt(tmpDataState))
      // const widgetDataAPiUpdate = { ...this.state.widgetDataAPi }
      // widgetDataAPiUpdate[DataRef.inputName] = DataState
      return
    } else {
      let widgetDataAPiUpdate = { ...this.state.widgetDataAPi }
      widgetBehaviourToggleData[index].active = DataState ? 1 : 0

      


      this.setState({ widgetDataAPi: widgetDataAPiUpdate })
      widgetBehaviourToggleData.forEach((widget)=>{
        widgetDataAPiUpdate[widget.callId] = widget.active ? 1 : 0;
      })
      this.onUpdateBehaviourToggle(widgetDataAPiUpdate)
    }

    widgetBehaviour[index].active = tmpDataState
    this.setState({ widgetBehaviourToggleData: widgetBehaviour });
  }

  onUpdateBehaviourToggle = data => {
    this.setState({ isLoading: true })
    const url = `${process.env.REACT_APP_BASE_APP_URL}/api/v1/widget/`+this.state.widget.id+`/behaviour`;
    // const url = `${process.env.REACT_APP_BASE_APP_URL}/api/v1/widget/update-behavior`
    const head = {
      headers: {
        Authorization: 'Bearer ' + apiToken
      }
    }
    
    const bodyData = { ...data, widget_id: this.state.widget.id }   


    axios
      .post(url, bodyData, head)
      .then(res => {
        this.fetchWidgetBehavior(this.state.widget.id)
        this.setState({ isLoading: false })
      })
      .catch(err => {
        const errors = { ...err }
        this.setState({ isLoading: false })
        if (errors.response.data.error) {
          CommonNotify(errors.response.data.error[0])
          this.fetchWidgetBehavior(this.state.widget.id)
        } else {
          CommonNotify('Some thing went wrong')
        }
      })
  }

  // updateDataRef = (DataState, DataRef, index) => {
  //   const { widgetBehaviourToggleData } = this.state
  //   const widgetBehaviour = [...widgetBehaviourToggleData]
  //   widgetBehaviour[index].active = DataState
  //   this.setState({ widgetBehaviourToggleData: widgetBehaviour })
  // }

  onChangeTimeZone = timezone => {
    this.setState({
      ...this.state,
      timezone: timezone
    })
  }

  onClickTableCategory = (e, extraData = null) => {   
    const target = e.target.id
    let newTableData = {
      clickToCall: false,
      callMeBack: false,
      callMeLater: false,
      leaveMessage: false
    }
    if (newTableData.clickToCall === false) {
    }
    if (target === 'clickToCall') {
      newTableData.clickToCall = true
      newTableData.callMeBack = false
      newTableData.callMeLater = false
      newTableData.leaveMessage = false
    } else if (target === 'callMeBack') {
      newTableData.clickToCall = false
      newTableData.callMeBack = true
      newTableData.callMeLater = false
      newTableData.leaveMessage = false
    } else if (target === 'callMeLater') {
      newTableData.clickToCall = false
      newTableData.callMeBack = false
      newTableData.callMeLater = true
      newTableData.leaveMessage = false
    } else if (target === 'leaveMessage') {
      newTableData.clickToCall = false
      newTableData.callMeBack = false
      newTableData.callMeLater = false
      newTableData.leaveMessage = true
    }
   

    this.setState({
      // ...this.state,
      widgetStyleTabs: newTableData
    })
  }

  onClickAllowedTabs = e => {
    let newAllowedTabs = this.state.allowedTabs
    let widgetStyleTabs = this.state.widgetStyleTabs
    if (e.target.id === 'clickToCall') {
      newAllowedTabs.clickToCall = !newAllowedTabs.clickToCall
    } else if (e.target.id === 'callMeBack') {
      newAllowedTabs.callMeBack = !newAllowedTabs.callMeBack
    } else if (e.target.id === 'callMeLater') {
      newAllowedTabs.callMeLater = !newAllowedTabs.callMeLater
    } else if (e.target.id === 'leaveMessage') {
      newAllowedTabs.leaveMessage = !newAllowedTabs.leaveMessage
    }
    if (widgetStyleTabs[e.target.id]) {
      widgetStyleTabs[e.target.id] = false
      if (newAllowedTabs.clickToCall) {
        widgetStyleTabs.clickToCall = true
      } else if (newAllowedTabs.callMeBack) {
        widgetStyleTabs.callMeBack = true
      } else if (newAllowedTabs.callMeLater) {
        widgetStyleTabs.callMeLater = true
      } else if (newAllowedTabs.leaveMessage) {
        widgetStyleTabs.leaveMessage = true
      }
    }
    this.setState({
      ...this.state,
      allowedTabs: newAllowedTabs,
      widgetStyleTabs
    })
  }

  onChangeFollowUpMessage = ({ name, value }) => {
    this.setState({
      ...this.state,
      [name]: value
    })
  }

  fetchWidgetBehavior = (widget) => {
    this.setState({ isLoading: true })
    let head = {
      headers: {
        Authorization: 'Bearer ' + apiToken
      }
    }
    // const url = `${process.env.REACT_APP_BASE_APP_URL}/api/v1/widget/widget-behavior/${widget}`
    const url = `${process.env.REACT_APP_BASE_APP_URL}/api/v1/widget/`+widget+`/behaviour`

    axios
      .get(url, head)
      .then(res => {
        if (res) {
          this.setState({
            widgetDataAPi: res.data.data,
            isLoading: false,
            widgetDataAPiCancel: res.data.data
          })
          this.updatewidgetBehaviourToggleData(res.data.data);
        }
      })
      .catch(err => {
        this.setState({ isLoading: false })
      })
  }

  fetchWidget = () => {
    this.setState({ ...this.state, isLoading: true })

    let head = {
      headers: {
        Authorization: 'Bearer ' + apiToken
      }
    }
    const url = `${process.env.REACT_APP_BASE_APP_URL}/api/v1/widget/widgets`
    
    axios
      .get(url, head)
      .then(res => {       
        if (res.data.data[0]) {
          // setWidget(res.data.data[0].id)
          let items = { ...this.state.widget }
          this.setState({ ...this.state, isLoading: false })
          let tempObject = {
            id: res.data.data[0].id,
            script: res.data.data[0].script_id,
            business_hours_status: res.data.data[0].business_hours_status
          }
          items = tempObject

          this.setState({
            widget: items,
            widgetObject: res.data.data[0]
          })
          this.fetchWidgetBehavior(res.data.data[0].id)
        }
      })
      .catch(error => {
        this.setState({ ...this.state, isLoading: false })
        logOut();
        // if(error.response.status === 401){
          
        // }
      })
  }

  componentDidMount = () => {
    
    this.fetchWidget()
  }

  

  handleLoading = state => {
    this.setState({ ...this.state, isLoading: state })
  }
  onCancelBehaviour = () => {
    this.setState({
      widgetDataAPi: this.state.widgetDataAPiCancel,
      widgetDataAPiSaveCancel: false
    })
  }

  updatewidgetBehaviourToggleData = (widgetDataAPi) => {
    const { widgetBehaviourToggleData } = this.state;
    widgetBehaviourToggleData.forEach((widget)=>{
      widget['active'] = widgetDataAPi[widget.callId];
      if(widget.inputData){
        widget.inputData.defaultValue = widgetDataAPi[widget.inputName];
      }
    })
    this.setState({widgetBehaviourToggleData: widgetBehaviourToggleData})
  }

  render() {
    const { activeIndex } = this.state
    const { activeIndexSurvey } = this.state
    const { activeIndexWidget } = this.state
    const contextRef = createRef()
    return (
      <>
        <Dimmer active={this.state.isLoading} style={{ position: 'fixed' }}>
          <Loader />
        </Dimmer>
        <div className="widget-container">
          <Title data={titleContent} />{' '}
          <div className="widget-banner-container">
            <WidgetBanner widget={this.state.widget} />{' '}
            {/* <div className="holder-assign">
                        <div className="holder-assign-wrapper">
                          <h2>Widget</h2>

                          <div className="assign-holder">
                            <table>
                              <tbody>
                                <tr>
                                  <td>Assigned to</td>
                                  <td>0</td>
                                </tr>
                                <tr>
                                  <td>Source</td>
                                  <td>2</td>
                                </tr>
                                <tr>
                                  <td>Status</td>
                                  <td>4</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div> */}{' '}
            <div className="widget-content-wrapper widget_accordion">
              <div className="holder-main-widget">
                <Accordion className="holder-widget accordion_holder_widget">
                  <div className="accordion-content-wrapper">
                    <Accordion.Title
                      active={activeIndex === 0}
                      index={0}
                      onClick={this.handleClick}
                    >
                      <WidgetInstallTitle />
                    </Accordion.Title>
                    <Accordion.Content active={activeIndex === 0}>
                      <Collapse
                        loading={this.handleLoading}
                        handleDataRef={this.handleDataRef}
                      />
                      <div className="content-footer">
                        <button
                          className="btn-close"
                          onClick={this.handleCloseClick}
                        >
                          close
                        </button>
                      </div>
                    </Accordion.Content>
                  </div>
                  <div className="accordion-content-wrapper">
                    <Accordion.Title
                      active={activeIndex === 1}
                      index={1}
                      onClick={this.handleClick}
                    >
                      <WidgetGeneralTitle />
                    </Accordion.Title>
                    <Accordion.Content active={activeIndex === 1}>
                      <WidgetGeneralContent
                        loading={this.handleLoading}
                        onChangeSelect={this.onChangeSelect}
                        handleGroupBtnData={this.handleGroupBtnData}
                        onChangeInput={this.onChangeInput}
                        onChangeTimeZone={this.onChangeTimeZone}
                        state={this.state}
                        widget={this.state.widget}
                      />
                      <div className="content-footer">
                        <button
                          className="btn-close"
                          onClick={this.handleCloseClick}
                        >
                          close
                        </button>
                      </div>
                    </Accordion.Content>
                  </div>
                  {/* <div className="accordion-content-wrapper">
                <Accordion.Title
                  active={activeIndex === 2}
                  index={2}
                  onClick={this.handleClick}
                >
                  <SayHelloTitle />
                </Accordion.Title>
                <Accordion.Content active={activeIndex === 2}>
                  <SayHelloContent
                    languageList={languageList}
                    onChangeSelect={this.onChangeSelect}
                    onChangeInput={this.onChangeInput}
                  />
                </Accordion.Content>
              </div> */}
                  {/* <div className="accordion-content-wrapper">
                <Accordion.Title
                  active={activeIndex === 3}
                  index={3}
                  onClick={this.handleClick}
                >
                  <WidgetCallerIDTitle />
                </Accordion.Title>
                <Accordion.Content active={activeIndex === 3}>
                  <WidgetCallerIDContent dataTable={dataTable} />
                  <div className="content-footer">
                    <button
                      className="btn-close"
                      onClick={this.handleCloseClick}
                    >
                      close
                    </button>
                  </div>
                </Accordion.Content>
              </div> */}
                  <div className="accordion-content-wrapper">
                    <Accordion.Title
                      active={activeIndex === 3}
                      index={3}
                      onClick={this.handleClick}
                    >
                      <WidgetAvailabilityTitle />
                    </Accordion.Title>
                    <Accordion.Content active={activeIndex === 3}>
                      <WidgetAvailabilityContent
                        loading={this.handleLoading}
                        widget={this.state.widget}
                        onClickAddOfficeHour={this.onClickAddOfficeHour}
                        onClickRemoveOfficeHours={this.onClickRemoveOfficeHours}
                        onChangeSelectOfficeHour={this.onChangeSelectOfficeHour}
                        onChangeTimeZone={this.onChangeTimeZone}
                        returnFunctionStart={this.returnFunctionStart}
                        returnFunctionEnd={this.returnFunctionEnd}
                        startTime={this.state.startTime}
                        endTime={this.state.endTime}
                        returnFunction={this.returnFunction}
                        state={this.state}
                      />
                      <div className="content-footer">
                        <button
                          className="btn-close"
                          onClick={this.handleCloseClick}
                        >
                          close
                        </button>
                      </div>
                    </Accordion.Content>
                  </div>
                  <div className="accordion-content-wrapper style-widget">
                    <Accordion.Title
                      active={activeIndex === 4}
                      index={4}
                      onClick={this.handleClick}
                    >
                      <WidgetStyleTitle />
                    </Accordion.Title>
                    <Accordion.Content active={activeIndex === 4}>
                      <WidgetStyleContent 
                       
                                          
                        loading={this.handleLoading}
                        widget={this.state.widget}
                        activeIndexWidget={activeIndexWidget}
                        handleClickWidget={this.handleClickWidget}
                        showWidget={showWidget}
                        handleDataRef={this.handleDataRef}
                        handleGroupBtnData={this.handleGroupBtnData}
                        legalWidget={legalWidget}
                        legalToggle={this.state.legalToggle}
                        socialWidget={socialWidget}
                        socialToggle={this.state.socialToggle}
                        privacyWidget={privacyWidget}
                        webCallDisplay={webCallDisplay}
                        webCallToggle={this.state.webCallToggle}
                        callMeBackDisplay={callMeBackDisplay}
                        callMeBackToggle={this.state.callMeBackToggle}
                        callMeLaterDisplay={callMeLaterDisplay}
                        callMeLaterToggle={this.state.callMeLaterToggle}
                        leaveMessageDisplay={leaveMessageDisplay}
                        leaveMessageToggle={this.state.leaveMessageToggle}
                        clickToCallName={clickToCallName}
                        clickToCallNameToggle={this.state.clickToCallNameToggle}
                        clickToCallEmail={clickToCallEmail}
                        clickToCallEmailToggle={
                          this.state.clickToCallEmailToggle
                        }
                        clickToCallTeam={clickToCallTeam}
                        clickToCallTeamToggle={this.state.clickToCallTeamToggle}
                        clickToCallCustomFields={clickToCallCustomFields}
                        clickToCallCustomFieldsToggle={
                          this.state.clickToCallCustomFieldsToggle
                        }
                        showQualification={showQualification}
                        handleQualification={this.handleQualification}
                        lstCustomFields={this.state.lstCustomFields}
                        onAddRemoveCustomeFields={this.onAddRemoveCustomeFields}
                        onUpdateCustomeFields={this.onUpdateCustomeFields}
                        lstFinalCustomFields={this.state.lstFinalCustomFields}
                        onSubmitCustomFields={this.onSubmitCustomFields}
                        onDeleteCustomFields={this.onDeleteCustomFields}
                        handleCustomFieldModal={this.handleCustomFieldModal}
                        isCustomeCancelModalOpen={
                          this.state.isCustomeCancelModalOpen
                        }
                        handleCloseCancelModal={this.handleCloseCancelModal}
                        fullNameToggle={this.state.fullNameToggle}
                        emailToggle={this.state.emailToggle}
                        teamToggle={this.state.teamToggle}
                        customFieldsToggle={this.state.customFieldsToggle}
                        callMeBackName={callMeBackName}
                        callMeBackNameToggle={this.state.callMeBackNameToggle}
                        callMeBackEmail={callMeBackEmail}
                        callMeBackEmailToggle={this.state.callMeBackEmailToggle}
                        callMeBackTeam={callMeBackTeam}
                        callMeBackTeamToggle={this.state.callMeBackTeamToggle}
                        callMeBackCustomFields={callMeBackCustomFields}
                        callMeBackCustomFieldsToggle={
                          this.state.callMeBackCustomFieldsToggle
                        }
                        callMeLaterName={callMeLaterName}
                        callMeLaterNameToggle={this.state.callMeLaterNameToggle}
                        callMeLaterEmail={callMeLaterEmail}
                        callMeLaterEmailToggle={
                          this.state.callMeLaterEmailToggle
                        }
                        callMeLaterTeam={callMeLaterTeam}
                        callMeLaterTeamToggle={this.state.callMeLaterTeamToggle}
                        callMeLaterCustomFields={callMeLaterCustomFields}
                        callMeLaterCustomFieldsToggle={
                          this.state.callMeLaterCustomFieldsToggle
                        }
                        leaveMessageName={leaveMessageName}
                        leaveMessageNameToggle={
                          this.state.leaveMessageNameToggle
                        }
                        leaveMessageEmail={leaveMessageEmail}
                        leaveMessageEmailToggle={
                          this.state.leaveMessageEmailToggle
                        }
                        leaveMessageTeam={leaveMessageTeam}
                        leaveMessageCustomFields={leaveMessageCustomFields}
                        leaveMessageCustomFieldsToggle={
                          this.state.leaveMessageCustomFieldsToggle
                        }
                        classicSmart={classicSmart}
                        classicSmartToggle={this.state.classicSmartToggle}
                        contextRef={this.contextRef}
                        privacyToggle={this.state.privacyToggle}
                        widgetShape={this.state.widgetShape}
                        onClickTableCategory={this.onClickTableCategory}
                        widgetStyleTabs={this.state.widgetStyleTabs}
                        onClickAllowedTabs={this.onClickAllowedTabs}
                        allowedTabs={this.state.allowedTabs}
                      />
                      <div className="content-footer">
                        <button
                          className="btn-close"
                          onClick={this.handleCloseClick}
                        >
                          close
                        </button>
                      </div>
                    </Accordion.Content>
                  </div>

                  <div className="accordion-content-wrapper style-greeting">
                    <Accordion.Title
                      active={activeIndex === 5}
                      index={5}
                      onClick={this.handleClick}
                    >
                      <GreetingStyleTitle />
                    </Accordion.Title>
                    <Accordion.Content active={activeIndex === 5}>
                      {this.state.widget && this.state.widget.id ? (
                        <WidgetGreetingStyleContent
                          loading={this.handleLoading}
                          widget={this.state.widget}
                          widgetShadow={widgetShadow}
                          widgetShape={this.state.widgetShape}
                          showShadowWidgetToggle={
                            this.state.showShadowWidgetToggle
                          }
                        />
                      ) : null}
                      <div className="content-footer">
                        <button
                          className="btn-close"
                          onClick={this.handleCloseClick}
                        >
                          close
                        </button>
                      </div>
                    </Accordion.Content>
                  </div>

                  <div className="accordion-content-wrapper">
                    <Accordion.Title
                      active={activeIndex === 6}
                      index={6}
                      onClick={this.handleClick}
                    >
                      <WidgetTeamsTitle />
                    </Accordion.Title>
                    <Accordion.Content active={activeIndex === 6}>
                      <WidgetTeamsContent
                        loading={this.handleLoading}
                        widget={this.state.widget}
                        handleGroupBtnData={this.handleGroupBtnData}
                        handleDataRef={this.handleDataRef}
                        showWidget={showWidget}
                        legalWidget={legalWidget}
                        widgetShadow={widgetShadow}
                      />

                      <div className="content-footer">
                        <button
                          className="btn-close"
                          onClick={this.handleCloseClick}
                        >
                          close
                        </button>
                      </div>
                    </Accordion.Content>
                  </div>
                  {/* <div className="accordion-content-wrapper">
                <Accordion.Title
                  active={activeIndex === 8}
                  index={8}
                  onClick={this.handleClick}
                >
                  <WidgetNotificationTitle />
                </Accordion.Title>
                <Accordion.Content active={activeIndex === 8}>
                  <WidgetNotificationContent
                    onChangeSelect={this.onChangeSelect}
                    handleGroupBtnData={this.handleGroupBtnData}
                    onChangeInput={this.onChangeInput}
                  />
                  <div className="content-footer">
                    <button
                      className="btn-close"
                      onClick={this.handleCloseClick}
                    >
                      close
                    </button>
                  </div>
                </Accordion.Content>
              </div> */}
                  <div className="accordion-content-wrapper">
                    <Accordion.Title
                      active={activeIndex === 7}
                      index={7}
                      onClick={this.handleClick}
                    >
                      <WidgetAvailableDomainsTitle />
                    </Accordion.Title>
                    <Accordion.Content active={activeIndex === 7}>
                      <WidgetAvailableDomainsContent
                        loading={this.handleLoading}
                        widget={this.state.widget}
                        onChangeState={this.onChangeState}
                        onEditState={this.state.domains}
                      />
                      <div className="content-footer">
                        <button
                          className="btn-close"
                          onClick={this.handleCloseClick}
                        >
                          close
                        </button>
                      </div>
                    </Accordion.Content>
                  </div>
                  <div className="accordion-content-wrapper">
                    <Accordion.Title
                      active={activeIndex === 8}
                      index={8}
                      onClick={this.handleClick}
                    >
                      <WidgetFollowUpTitle />
                    </Accordion.Title>
                    <Accordion.Content active={activeIndex === 8}>
                      <WidgetFollowUpContent
                        loading={this.handleLoading}
                        widget={this.state.widget}
                        showFollowUpBrandName={showFollowUpBrandName}
                        handleDataRef={this.handleDataRef}
                        thankYouToggle={this.state.thankYouToggle}
                        missedCallToggle={this.state.missedCallToggle}
                        scheduleCallMessageToggle={
                          this.state.scheduleCallMessageToggle
                        }
                        brandNameSMSToggle={this.state.brandNameSMSToggle}
                        scheduleCallReminderMessageToggle={
                          this.state.scheduleCallReminderMessageToggle
                        }
                        onChangeFollowUpMessage={this.onChangeFollowUpMessage}
                        thankYouMessageText={this.state.thankYouMessageText}
                        missedCallMessageText={this.state.missedCallMessageText}
                      />

                      <div className="content-footer">
                        <button
                          className="btn-close"
                          onClick={this.handleCloseClick}
                        >
                          close
                        </button>
                      </div>
                    </Accordion.Content>
                  </div>
                  {/* <div className="accordion-content-wrapper">
                <Accordion.Title
                  active={activeIndex === 11}
                  index={11}
                  onClick={this.handleClick}
                >
                  <WidgetIncomingNumberTitle />
                </Accordion.Title>
                <Accordion.Content active={activeIndex === 11}>
                  <WidgetIncomingNumberContent
                    showQualification={showQualification}
                    handleDataRef={this.handleDataRef}
                  />
                  <div className="content-footer">
                    <button
                      className="btn-close"
                      onClick={this.handleCloseClick}
                    >
                      close
                    </button>
                  </div>
                </Accordion.Content>
              </div> */}
                  {/* <div className="accordion-content-wrapper">
                <Accordion.Title
                  active={activeIndex === 9}
                  index={9}
                  onClick={this.handleClick}
                >
                  <WidgetQualificationTitle />
                </Accordion.Title>
                <Accordion.Content active={activeIndex === 9}>
                  <WidgetQualificationContent
                    handleDataRef={this.handleDataRef}
                    showQualification={showQualification}
                    handleQualification={this.handleQualification}
                    lstCustomFields={this.state.lstCustomFields}
                    onAddRemoveCustomeFields={this.onAddRemoveCustomeFields}
                    onUpdateCustomeFields={this.onUpdateCustomeFields}
                    lstFinalCustomFields={this.state.lstFinalCustomFields}
                    onSubmitCustomFields={this.onSubmitCustomFields}
                    onDeleteCustomFields={this.onDeleteCustomFields}
                    handleCustomFieldModal={this.handleCustomFieldModal}
                    isCustomeCancelModalOpen={this.state.isCustomeCancelModalOpen}
                    handleCloseCancelModal={this.handleCloseCancelModal}
                    fullNameToggle={this.state.fullNameToggle}
                    emailToggle={this.state.emailToggle}
                    teamToggle={this.state.teamToggle}
                    customFieldsToggle={this.state.customFieldsToggle}
                  />
                  <div className="content-footer">
                    <button
                      className="btn-close"
                      onClick={this.handleCloseClick}
                    >
                      close
                    </button>
                  </div>
                </Accordion.Content>
              </div> */}
                  {/* <div className="accordion-content-wrapper">
                <Accordion.Title
                  active={activeIndex === 10}
                  index={10}
                  onClick={this.handleClick}
                >
                  <WidgetShouldAppearTitle />
                </Accordion.Title>
                <Accordion.Content active={activeIndex === 10}>
                  <WidgetShouldAppearContent
                    handleDataRef={this.handleDataRef}
                    pageLoad={pageLoad}
                    pageSeconds={pageSeconds}
                    pageExit={pageExit}
                    pagePercent={pagePercent}
                    state={this.state}
                  />
                  <div className="content-footer">
                    <button
                      className="btn-close"
                      onClick={this.handleCloseClick}
                    >
                      close
                    </button>
                  </div>
                </Accordion.Content>
              </div> */}
                  <div className="accordion-content-wrapper">
                    <Accordion.Title
                      active={activeIndex === 10}
                      index={10}
                      onClick={this.handleClick}
                    >
                      <WidgetCustomCssTitle />
                    </Accordion.Title>
                    <Accordion.Content active={activeIndex === 10}>
                      <WidgetCustomCssContent
                        loading={this.handleLoading}
                        widget={this.state.widget}
                        showWidget={showWidget}
                        handleDataRef={this.handleDataRef}
                        showWidgetToggle={this.state.showWidgetToggle}
                        showShadowWidgetToggle={
                          this.state.showShadowWidgetToggle
                        }
                        handleGroupBtnData={this.handleGroupBtnData}
                        legalWidget={legalWidget}
                        legalToggle={this.state.legalToggle}
                        socialWidget={socialWidget}
                        socialToggle={this.state.socialToggle}
                        privacyWidget={privacyWidget}
                        privacyToggle={this.state.privacyToggle}
                        widgetShadow={widgetShadow}
                        widgetShape={this.state.widgetShape}
                        onClickTableCategory={this.onClickTableCategory}
                        widgetStyleTabs={this.state.widgetStyleTabs}
                        onClickAllowedTabs={this.onClickAllowedTabs}
                        allowedTabs={this.state.allowedTabs}
                      />

                      <div className="content-footer">
                        <button
                          className="btn-close"
                          onClick={this.handleCloseClick}
                        >
                          close
                        </button>
                      </div>
                    </Accordion.Content>
                  </div>
                  <div className="accordion-content-wrapper">
                    <Accordion.Title
                      active={activeIndex === 11}
                      index={11}
                      onClick={this.handleClick}
                    >
                      <WidgetWhereAppearTitle />
                    </Accordion.Title>
                    <Accordion.Content active={activeIndex === 11}>
                      <WidgetWhereAppearContent
                        loading={this.handleLoading}
                        widget={this.state.widget}
                        handleDataRef={this.handleDataRef}
                        chosenPage={chosenPage}
                        chosenPageToggle={this.state.chosenPageToggle}
                        socialWidgetActive={socialWidgetActive}
                        socialToggle={this.state.socialToggle}
                        socialToggleActive={this.state.socialToggle}
                        onClickAddOfficeHour={this.onClickAddOfficeHour}
                        onClickRemoveOfficeHours={this.onClickRemoveOfficeHours}
                        onClickAddOfficeHour2={this.onClickAddOfficeHour2}
                        onClickRemoveOfficeHours2={
                          this.onClickRemoveOfficeHours2
                        }
                        onChangeSelectOfficeHour={this.onChangeSelectOfficeHour}
                        onChangeTimeZone={this.onChangeTimeZone}
                        state={this.state}
                      />
                      <div className="content-footer">
                        <button
                          className="btn-close"
                          onClick={this.handleCloseClick}
                        >
                          close
                        </button>
                      </div>
                    </Accordion.Content>
                  </div>
                  <div className="accordion-content-wrapper">
                    <Accordion.Title
                      active={activeIndex === 12}
                      index={12}
                      onClick={this.handleClick}
                    >
                      <WidgetBehaviourTitle />
                    </Accordion.Title>
                    <Accordion.Content active={activeIndex === 12}>
                      <WidgetBehaviourContent
                        loading={this.handleLoading}
                        widget={this.state.widget}
                        handleDataRef={this.handleDataRef}
                        widgetBehaviour={this.state.widgetBehaviourToggleData}
                        widgetDataAPi={this.state.widgetDataAPi}
                        widgetDataAPiCancel={this.state.widgetDataAPiCancel}
                        widgetObject={this.state.widgetObject}
                        widgetDataAPiSaveCancel={
                          this.state.widgetDataAPiSaveCancel
                        }
                        onCancelBehaviour={this.onCancelBehaviour}
                        lstSpecificPage={this.state.lstSpecificPage}
                        lstUrls={this.state.lstUrls}
                        onAddRemoveSpecificPage={this.onAddRemoveSpecificPage}
                        onUpdateSpecificRecord={this.onUpdateSpecificRecord}
                        onSubmitSpecificRecords={this.onSubmitSpecificRecords}
                        customTargetToggle={this.state.customTargetToggle}
                        updateDataRef={this.updateDataRef}
                        onChangeInputBehaviour={this.onChangeInputBehaviour}
                      />
                      <div className="content-footer">
                        <button
                          className="btn-close"
                          onClick={this.handleCloseClick}
                        >
                          close
                        </button>
                      </div>
                    </Accordion.Content>
                  </div>
                  {/* <div className="accordion-content-wrapper">
                    <Accordion.Title
                      active={activeIndex === 13}
                      index={13}
                      onClick={this.handleClick}
                    >
                      <WidgetSurveyDisplayTitle />
                    </Accordion.Title>
                    <Accordion.Content active={activeIndex === 13}>
                      <WidgetSurveyDisplayContent
                        loading={this.handleLoading}
                        widget={this.state.widget}
                        handleRadio={this.handleRadio}
                        callAlgorithm={this.state.callAlgorithm}
                        respondText={this.state.respondText}
                        state={this.state}
                      />
                      <div className="content-footer">
                        <button
                          className="btn-close"
                          onClick={this.handleCloseClick}
                        >
                          close
                        </button>
                      </div>
                    </Accordion.Content>
                  </div> */}
                  {/* <div className="accordion-content-wrapper">
                    <Accordion.Title
                      active={activeIndex === 14}
                      index={14}
                      onClick={this.handleClick}
                    >
                      <WidgetSeeSurveyTitle />
                    </Accordion.Title>
                    <Accordion.Content active={activeIndex === 14}>
                      <WidgetSeeSurveyContent
                        loading={this.handleLoading}
                        widget={this.state.widget}
                        handleModal={this.handleModal}
                        handleCloseModal={this.handleCloseModal}
                        isModalOpen={this.state.isModalOpen}
                        onChangeNodeCheckbox={this.onChangeNodeCheckbox}
                        activeIndexSurvey={this.state.activeIndexSurvey}
                        handleClickSurvey={this.handleClickSurvey}
                        handleRadioSurvey={this.handleRadioSurvey}
                        visitorType={this.state.visitorType}
                        cameSiteItem={this.state.cameSiteItem}
                        handleDataRef={this.handleDataRef}
                        includeTagged={includeTagged}
                        excludeTagged={excludeTagged}
                        specificUrl={specificUrl}
                        addUrl={addUrl}
                        userPage={userPage}
                        haveCookie={haveCookie}
                        dontHaveCookie={dontHaveCookie}
                        customAttribute={customAttribute}
                        knownIdentity={knownIdentity}
                        visitorUsing={visitorUsing}
                        toggleCustomAttribute={this.state.toggleCustomAttribute}
                        useWebsiteAttribute={this.state.useWebsiteAttribute}
                        knownIdentityAttribute={
                          this.state.knownIdentityAttribute
                        }
                        visitedAtLeast={this.state.visitedAtLeast}
                        onClickAddMore={this.onClickAddMore}
                        onClickRemoveAddMore={this.onClickRemoveAddMore}
                        state={this.state}
                        isValue={this.state.isValue}
                        onChangeInput={this.onChangeInput}
                        onChangeSelect={this.onChangeSelect}
                      />
                      <div className="content-footer">
                        <button
                          className="btn-close"
                          onClick={this.handleCloseClick}
                        >
                          close
                        </button>
                      </div>
                    </Accordion.Content>
                  </div> */}
                </Accordion>
                {/* <div className="holder-preview">
              <div className="preview-wrapper">
                <div className="preview-head">
                  <div className="icon-wrap">
                    <img src={squareActive} alt="icon" />
                  </div>
                  <div className="text-wrap">
                    <h2 className="text-h2">Purplerain</h2>
                    <p className="text-p">The team typically replies in a few minutes</p>
                  </div>
                </div>
                <div className="preview-body">
                  <div className="body-main">
                    <div className="icon-wrap">
                      <img src={squareActiveBlack} alt="icon" />
                    </div>
                    <div className="text-wrap">
                      <p className="text-p">The team typically replies in a few minutes</p>
                    </div>
                  </div>
                </div>
                <div className="preview-footer">
                  <p className="text-p">Write a reply...</p>
                </div>
              </div>
            </div> */}
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default Widgets
