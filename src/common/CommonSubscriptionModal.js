import React, { Component, Fragment } from 'react'
import { Table, Image, Modal, Checkbox, Dropdown } from 'semantic-ui-react'
import _ from 'lodash'

import CommonInput from './CommonInput'
import CommonGroupButton from './CommonGroupButton'
import CommonButtons from './CommonButtons'

import starterIcon from '../assets/images/startericon.svg'
import proIcon from '../assets/images/proicon.svg'
import advanceIcon from '../assets/images/advanceicon.svg'
import enterpriceIcon from '../assets/images/enterprise.svg'
import sms from '../assets/images/sms.svg'
import mobileDesktopApp from '../assets/images/mobiledesktopapp.svg'
import leadAnalytics from '../assets/images/leadanalytics.svg'
import callTransfer from '../assets/images/calltransfer.svg'
import outgoingCalls from '../assets/images/outgoingcalls.svg'
import callRecord from '../assets/images/callrecord.svg'
import api from '../assets/images/api.svg'
import sync from '../assets/images/syncicon.svg'

import checked from '../assets/images/checked.svg'
import americanExpress from '../assets/images/americanexpress.svg'
import visa from '../assets/images/visa.svg'
import masterCard from '../assets/images/mastercard.svg'
import { cancelSubscription, getSubscription } from '../config/subscription'
import Toggle from '../common/CommonToggle'

import axios from 'axios'
import { CommonNotify } from './CommonNotify'
import CommonAddCardModal from './CommonAddCardModal'
import ConfirmUpgradePlanModal from './ConfirmUpgradePlanModal'
import moment from 'moment';

const apiToken = localStorage.getItem('access_token')

class CommonSubscriptionModal extends Component {
  state = {
    isModalOpen: false,
    promoCode: '',
    isCancelModalOpen: false,
    cardSummary: false,
    allPlans: [],
    activePlans: null,
    selectedPlan: { activeLabel: '', activePrice: 0, actualPrice: 0 },
    payCard: [],
    updateCard: false,    
    payCardDropdown: [],
    dataModal: {
      dataPlan: {
        planName: 'Pro',
        planPrice: '$119'
      },
      addCredits: '',
      promoCode: '',
      creditCardDetails: {
        cardName: '',
        cardNumber: '',
        validMonth: '',
        validYear: '',
        cvv: ''
      },
      creditCardDetailsErrors: {
        cardName: '',
        cardNumber: '',
        validMonth: '',
        validYear: '',
        cvv: ''
      }
    },
    subscriptionData: {
      plan_id: 8,
      apply_now: 1,
      period: 'Monthly',
      downgrading_reason: '',
      selected_plan_price: {},
      current_plan_price: 35,
      coupon: '',
      cardId: 0
    },
    newCard: false,
    applyCouponLoader: false,
    addPaymentLoader: false,
    addCardModalOpen: false,
    confirmOnOpen: false,
    selectedIndex: null
  }
  applyNowToggle = {
    callTitle: 'applyNow',
    callDesc: 'applyNow',
    callId: 'applyNow',
    callref: 'applyNow'
  }
  // fetch plan details

  setPlanData = plans => {
    let { currentPlan } = this.props

    let images = [starterIcon, proIcon, advanceIcon, advanceIcon, advanceIcon]
    if (plans) {
      plans.forEach((item, index, theArray) => {
        //var temp = Object.assign({}, item)
        theArray[index].icon = images[index]
        theArray[index].yearly_total = 0
        if (item.yearly_price) {
          theArray[index].yearly_total = item.yearly_price * 12
        }
        if (currentPlan) {
          const UpdateCurrentPlaneName = currentPlan.toLowerCase().split(' ')
          if (item.name.toLowerCase() == UpdateCurrentPlaneName[0]) {
            theArray[index].active = true
          } else {
            theArray[index].active = false
          }
        }
      })
      const getActivePlaneData = plans.find(element => element.active) || {}
      this.setState({ activePlans: getActivePlaneData })
      this.setState({ allPlans: plans })
    }
  }

  componentDidMount = () => {
    this.fetchPlans()
    this.fetchCard()
  }

  componentDidUpdate(prevProps) {
    if (!_.isEqual(this.props.currentPlan, prevProps.currentPlan)) {
      this.fetchPlans()
      const subscriptionData = {
        plan_id: 8,
        period: 'Monthly',
        downgrading_reason: '',
        selected_plan_price: {},
        current_plan_price: 35,
        coupon: '',
        cardId: 0
      }
      // this.setState({ cardSummary: false, subscriptionData: subscriptionData })
     
      this.setState({ cardSummary: false })
    }
  }

  fetchCard = () => {
    const apiToken = localStorage.getItem('access_token')
    let head = {
      headers: {
        Authorization: 'Bearer ' + apiToken
      }
    }
    const url = `${process.env.REACT_APP_BASE_APP_URL}/api/v1/get-customer-payment-methods`
    axios.get(url, head).then(res => {
      if (res) {
        //this.setPlanData(res.data.data)
        //this.onUpdateCard()
        if (res.data.data.length === 1) {
          const { subscriptionData } = this.state
          subscriptionData['cardId'] = res.data.data[0].id
          this.setState({ subscriptionData })
          this.setState({ updateCard: true })
          this.setState({ updateCardInfo: res.data.data[0] })
        }
        const updatePayCard = res.data.data.map(item => {
          return {
            key: `${item.card.expiry_month} / ${item.card.expiry_month}`,
            text: `**** ${item.card.last_four_digits}`,
            value: item.id
          }
        })
        this.setState({
          payCard: res.data.data,
          payCardDropdown: updatePayCard
        })
      }
    })
  }

  applyCoupon = () => {}

  fetchPlans = () => {
    const apiToken = localStorage.getItem('access_token')
    let head = {
      headers: {
        Authorization: 'Bearer ' + apiToken
      }
    }
    const url = `${process.env.REACT_APP_BASE_APP_URL}/api/v1/plans`
    axios.get(url, head).then(res => {
      if (res.data.data) {
        this.setPlanData(res.data.data)
      }
    })
  }

  executeCoupanCode = () => {
    const apiToken = localStorage.getItem('access_token')
    this.setState({ applyCouponLoader: true })
    if (!this.state.promoCode) {
      CommonNotify('Please enter Code', 'warning')
      this.setState({ applyCouponLoader: false })
      return
    }
    let head = {
      headers: {
        Authorization: 'Bearer ' + apiToken
      }
    }
    const url = `${process.env.REACT_APP_BASE_APP_URL}/api/v1/subscription/check-coupon`
    let data = {
      price: this.state.selectedPlan.activePrice,
      coupon: this.state.promoCode
    }
    axios
      .post(url, data, head)
      .then(res => {
       

        if (res.data) {
          let { selectedPlan, subscriptionData } = this.state
          selectedPlan.actualPrice = res.data.data
          this.setState({ selectedPlan: selectedPlan })
          subscriptionData['coupon'] = res.data.data
          this.setState({ subscriptionData })
          this.setState({ applyCouponLoader: false })
        }
      })
      .catch(error => {
        if (error.response) {
          this.setState({ applyCouponLoader: false })
          CommonNotify('Invalid Coupon Code')
          // Request made and server responded
         
        } else if (error.request) {
          // The request was made but no response was received
          
        } else {
          // Something happened in setting up the request that triggered an Error
         
        }
      })
  }

  handleGroupBtnData = (toggleBtn, id) => {
    let { selectedPlan, subscriptionData } = this.state

    if (toggleBtn == 'Monthly') {
      selectedPlan.activePrice = selectedPlan.price
      selectedPlan.actualPrice = selectedPlan.price
      selectedPlan.activeLabel = 'Monthly Charge'
      subscriptionData['period'] = toggleBtn
      this.setState({ subscriptionData })
    } else {
      selectedPlan.activePrice = selectedPlan.yearly_total
      selectedPlan.actualPrice = selectedPlan.yearly_total
      selectedPlan.activeLabel = 'Annual Charge'
      subscriptionData['period'] = toggleBtn
      this.setState({ subscriptionData })
    }

    this.setState({ selectedPlan: selectedPlan })
  }

  handleDataModal = (e, index, plans) => {
    let { dataModal, subscriptionData, cardSummary } = this.state
    const newPlanName = e.target.parentNode.querySelector('.plan-title')
    const newPlanPrice = e.target.parentNode.querySelector('.plan-price')
    const planStatus = e.target.parentNode.querySelector('.plan-status')
    const allPlanStatus = [...document.querySelectorAll('.plan-status')] || []

    subscriptionData['selected_plan_price'] = {
      price: plans.price,
      yearly_price: plans.yearly_price
    }
    subscriptionData['plan_id'] = plans.id
    this.setState({
      subscriptionData,
      cardSummary: false,
      selectedIndex: index
    })
    if (planStatus.innerHTML !== 'Current Plan') {
      dataModal.dataPlan = {
        planName: newPlanName.innerHTML,
        planPrice: newPlanPrice.innerHTML
      }

      let { allPlans } = this.state
      let selectedPlan = allPlans[index]

      selectedPlan.activePrice = selectedPlan.price
      selectedPlan.activeLabel = 'Monthly charge'

      this.setState({ selectedPlan: selectedPlan })

      this.setState({ dataModal })
    }

    // allPlanStatus.map((value, index) => {
    //   const planStatus = e.target.parentNode.querySelector('.plan-status')
  
    //   // if (
    //   //   value.innerHTML !== 'Current Plan' &&
    //   //   value.innerHTML !== 'Contact Sales' &&
    //   //   planStatus.innerHTML !== 'Current Plan' &&
    //   //   value.innerHTML !== 'Downgrade to'
    //   // ) {
    //   //   alert(value.innerHTML)
    //   //   value.classList.remove('selected')
    //   //   value.innerHTML = 'Upgrade to'
    //   // } else
    //   if (
    //     value.innerHTML !== 'Current Plan' &&
    //     value.innerHTML !== 'Contact Sales' &&
    //     planStatus.innerHTML !== 'Current Plan'
    //   ) {
    //     value.classList.remove('selected')
    //     value.innerHTML = 'Downgrade to'
    //   }
    // })

    // if (
    //   planStatus.innerHTML !== 'Contact Sales' &&
    //   planStatus.innerHTML !== 'Current Plan'
    // ) {
    //   planStatus.innerHTML = 'Selected'
    //   planStatus.classList.add('selected')
    // }
  }

  handleDataInput = e => {
    const { name, value } = e.target
    const { dataModal } = this.state
    dataModal[name] = value

    this.setState({ dataModal })
  }

  handleCreditCardInfo = e => {
    const { name, value } = e.target
    const { dataModal } = this.state
    dataModal.creditCardDetails[name] = value

    this.setState({ dataModal })
    const ERROR_CODE = {
      cardName: 'Card Name',
      cardNumber: 'Card Number',
      validMonth: 'Month',
      validYear: 'Year',
      cvv: 'CVV'
    }


    if (!value) {
      dataModal.creditCardDetailsErrors[
        name
      ] = `${ERROR_CODE[name]} is required`
      this.setState({ dataModal })
      return
    } else {



      dataModal.creditCardDetailsErrors[name] = ''
      this.setState({ dataModal })
    }

    if (name === 'cardNumber') {

     

      if (value < 0) {
        dataModal.creditCardDetailsErrors[
          name
        ] = `${ERROR_CODE[name]} must be greater than 0.`
        this.setState({ dataModal })
      } else {
        dataModal.creditCardDetailsErrors[name] = ''
        this.setState({ dataModal })
      }
    }

    if (name === 'validMonth') {
      if (value.toString().length > 2) {
        dataModal.creditCardDetailsErrors[
          name
        ] = `${ERROR_CODE[name]} must be less than 2 digit long.`
        this.setState({ dataModal })
      } else if (value < 0) {
        dataModal.creditCardDetailsErrors[
          name
        ] = `${ERROR_CODE[name]} must be greater than 0.`
        this.setState({ dataModal })
      } else {
        dataModal.creditCardDetailsErrors[name] = ''
        this.setState({ dataModal })
      }
    }

    if (name === 'validYear') {
      if (value.toString().length > 4) {
        dataModal.creditCardDetailsErrors[
          name
        ] = `${ERROR_CODE[name]} must be less than 4 digit long.`
        this.setState({ dataModal })
      } else if (value < 0) {
        dataModal.creditCardDetailsErrors[
          name
        ] = `${ERROR_CODE[name]} must be greater than 0.`
        this.setState({ dataModal })
      } else {
        dataModal.creditCardDetailsErrors[name] = ''
        this.setState({ dataModal })
      }
    }

    if (name === 'cvv') {
      if (value.toString().length > 4) {
        dataModal.creditCardDetailsErrors[
          name
        ] = `${ERROR_CODE[name]} must be less than 4 digit long.`
        this.setState({ dataModal })
      } else if (value < 0) {
        dataModal.creditCardDetailsErrors[
          name
        ] = `${ERROR_CODE[name]} must be greater than 0.`
        this.setState({ dataModal })
      } else {
        dataModal.creditCardDetailsErrors[name] = ''
        this.setState({ dataModal })
      }
    }
  }

  handleModal = () => {
    let { isModalOpen, cardSummary } = this.state

    isModalOpen = !isModalOpen
    cardSummary = false
    this.setState({ isModalOpen, cardSummary })
  }

  handleCloseModal = () => {
    this.setState({ isModalOpen: false })
  }

  handleCancelModal = () => {
    let { isCancelModalOpen } = this.state

    isCancelModalOpen = !isCancelModalOpen

    this.setState({ isCancelModalOpen })
  }

  handleCloseCancelModal = () => this.setState({ isCancelModalOpen: false })

  handleCreditCard = () => {
    this.setState({ cardSummary: true })
    // var target = document.querySelector('.saved-cards')
    // this.animate(
    //   document.querySelector('.holder-small-content') ||
    //   document.querySelector('.holder-small-content'),
    //   'scrollTop',
    //   '',
    //   0,
    //   target.offsetTop,
    //   200,
    //   true
    // )
  }

  checkSubscription = () => {
    if (_.isEmpty(this.state.subscriptionData.selected_plan_price)) {
      CommonNotify('Please Select Plan First', 'warning')
      return
    }
    this.setState({ confirmOnOpen: true })
    // this.setState({ cardSummary: true })
    // var target = document.querySelector('.saved-cards')
    // this.animate(
    //   document.querySelector('.holder-small-content') ||
    //   document.querySelector('.holder-small-content'),
    //   'scrollTop',
    //   '',
    //   0,
    //   target.offsetTop,
    //   200,
    //   true
    // )
  }

  onCancel = () => {
    cancelSubscription()
      .then(res => {
        this.setState({ isCancelModalOpen: false })
      })
      .catch(err => console.error('error-msg', err))
  }

  animate = (elem, style, unit, from, to, time, prop) => {
    if (!elem) return

    var start = new Date().getTime(),
      timer = setInterval(function() {
        var step = Math.min(1, (new Date().getTime() - start) / time)

        if (prop) {
          elem[style] = from + step * (to - from) + unit
        } else {
          elem.style[style] = from + step * (to - from) + unit
        }

        if (step === 1) {
          clearInterval(timer)
        }
      }, 25)
    if (prop) {
      elem[style] = from + unit
    } else {
      elem.style[style] = from + unit
    }
  }

  onChangeCheckBox = (e, index, checked, data) => {
    if (index.checked) {
      const { subscriptionData } = this.state
      subscriptionData['cardId'] = data.id
      this.setState({ subscriptionData })
    } else {
      const { subscriptionData } = this.state
      subscriptionData['cardId'] = ''
      this.setState({ subscriptionData })
    }
  }

  onAddCreditCard = () => {
    const apiToken = localStorage.getItem('access_token')

    if(!this.state.dataModal.creditCardDetails.cardNumber.match(/^[-_ 0-9]+$/)){
      CommonNotify("Invalid Card No", "warning")
      return;
    }

    this.setState({ addCreditCardLoader: true })

   

    if (
      !this.state.dataModal.creditCardDetails.cardName ||
      !this.state.dataModal.creditCardDetails.cardNumber ||
      !this.state.dataModal.creditCardDetails.validMonth ||
      !this.state.dataModal.creditCardDetails.validYear ||
      !this.state.dataModal.creditCardDetails.cvv
    ) {
      CommonNotify('Please add all felids', 'warning')
      this.setState({ addCreditCardLoader: false })
      return
    }
    const date = new Date()
    const newYear = moment(date).format('yyyy')
    if (this.state.dataModal.creditCardDetails.validMonth > 12) {
      this.setState({ addCreditCardLoader: false })
      CommonNotify('Please enter valid expire date', 'warning')
      return
    } else {
      if (this.state.dataModal.creditCardDetails.validYear < newYear) {
        this.setState({ addCreditCardLoader: false })
        CommonNotify(
          'Expiry date should not be lesser then current date',
          'warning'
        )
        return
      }
    }
    let head = {
      headers: {
        Authorization: 'Bearer ' + apiToken
      }
    }
    const url = `${process.env.REACT_APP_BASE_APP_URL}/api/v1/create-customer-credit-card`

    /*
    if(this.state.updateCard){
      url = `${process.env.REACT_APP_BASE_APP_URL}/api/v1/update-primary-payment-method?payment_id=${this.state.subscriptionData['cardId']}`
    }
    */

    const data = {
      name: this.state.dataModal.creditCardDetails.cardName,
      card_number: this.state.dataModal.creditCardDetails.cardNumber,
      expiry: `${this.state.dataModal.creditCardDetails.validMonth}/${this.state.dataModal.creditCardDetails.validYear}`,
      cvv: this.state.dataModal.creditCardDetails.cvv
    }
    axios
      .post(url, data, head)
      .then(res => {
        this.setState({ addCreditCardLoader: false, newCard: false })
        CommonNotify(`Card successfully ${ this.state.updateCard ? 'updated' : 'created'}`, 'success')
        this.setState({ addCardModalOpen: false })
        this.fetchCard()
      })
      .catch(err => {
        const errors = { ...err }
        if (errors.response.data.errors.length) {
          CommonNotify(errors.response.data.errors[0])
          this.setState({ addCreditCardLoader: false })
        }
      })
  }

  addPayment = () => {
    const apiToken = localStorage.getItem('access_token')
    this.setState({ addPaymentLoader: true })
    if (!this.state.subscriptionData.cardId) {
      CommonNotify('Please select payment method', 'warning')
      this.setState({ addPaymentLoader: false })
      return
    }
    const head = {
      headers: {
        Authorization: 'Bearer ' + apiToken
      }
    }
    const url = `${process.env.REACT_APP_BASE_APP_URL}/api/v1/update-primary-payment-method`
    const data = {
      payment_id: this.state.subscriptionData.cardId,
      plan_price:
        this.state.subscriptionData.period === 'Monthly'
          ? this.state.subscriptionData.selected_plan_price.price
          : this.state.subscriptionData.selected_plan_price.yearly_price * 12
    }
    axios
      .post(url, data, head)
      .then(res => {
        this.addNewSubscription()
      })
      .catch(err => {
        this.setState({ addPaymentLoader: false })
      })
  }

  addNewSubscription = () => {
    const apiToken = localStorage.getItem('access_token')
    // if(this.state.subscriptionData)
    let head = {
      headers: {
        Authorization: 'Bearer ' + apiToken
      }
    }
    const url = `${process.env.REACT_APP_BASE_APP_URL}/api/v1/subscription/update-subscription-plan`
    const data = {
      plan_id: this.state.subscriptionData.plan_id,
      apply_now: 1,
      period:
        this.state.subscriptionData.period === 'Monthly' ? 'month' : 'year',
      downgrading_reason: '',
      selected_plan_price:
        this.state.subscriptionData.period === 'Monthly'
          ? this.state.subscriptionData.selected_plan_price.price
          : this.state.subscriptionData.selected_plan_price.yearly_price,
      current_plan_price: 35,
      coupon: ''
    }
    axios
      .post(url, data, head)
      .then(res => {
        this.setState({ addPaymentLoader: false })
        CommonNotify('Successfully', 'success')
        this.props.updateGetSubscription()
        this.props.onClose()
      })
      .catch(err => {
        this.setState({ addPaymentLoader: false })
        const errors = { ...err }
        if (errors.response.data.errors) {
          CommonNotify(errors.response.data.errors[0])
        } else {
          CommonNotify('Some thing went wrong')
        }
      })
  }

  handleToggleData = toggleData => {
    const dataToggled = toggleData ? 1 : 0
    const { subscriptionData } = this.state
    subscriptionData['apply_now'] = dataToggled
    this.setState({ subscriptionData })
  }

  onChangePaymentDropDown = (e, data) => {
    const { subscriptionData } = this.state
    subscriptionData['cardId'] = data.value
    this.setState({ subscriptionData })
  }

  onOpenAddCardModal = () => {
    this.setState({ addCardModalOpen: true })
  }

  onCloseAddCardModal = () => {
    this.setState({ addCardModalOpen: false })
  }

  onCloseUpgradePlanModal = () => {
    this.setState({ confirmOnOpen: false })
  }

  render() {
    const {
      isModalOpen,
      isCancelModalOpen,
      dataModal,
      cardSummary
    } = this.state
    const { dataTable, currentPlan } = this.props
    const {
      cardName,
      cardNumber,
      validMonth,
      validYear,
      cvv
    } = this.state.dataModal.creditCardDetailsErrors
    return (
      <Fragment>
        <Modal
          className="subscription-modal"
          open={this.props.open}
          onClose={this.props.onClose}
        >
          <Modal.Header>
            <p className="modal-header">Choose Your Plan</p>
            <i
              onClick={this.props.onClose}
              className="fa fa-times"
              aria-hidden="true"
            ></i>
          </Modal.Header>
          <Modal.Content scrolling>
            <div className="plans">
              <div className="plan-list">
                {this.state.allPlans.map((plan, index) => (
                  <div className="plan-item" key="plan-item">
                    {!plan.active && (
                      <div
                        className="event-handler"
                        onClick={e => this.handleDataModal(e, index, plan)}
                        disable={plan.active ? true : false}
                      ></div>
                    )}

                    <Image src={plan.icon} size="small" />
                    <p className="plan-title">{plan.name}</p>
                    <p className="plan-price">${plan.price}</p>
                    <p className="plan-desc">
                      Up to {plan.max_calls} calls per month
                    </p>
                    <p className="plan-subdesc">
                      Up to {plan.max_sms} SMS per month
                    </p>
                    {/* <p className="plan-subdesc">+35 leads for $29</p> */}
                    {plan.active ? (
                      <p className="plan-status">Current Plan</p>
                    ) : this.state.selectedIndex === index ? (
                      <p className="plan-status plan-selected">Selected</p>
                    ) : this.state.activePlans.price > plan.price ? (
                      <p className="plan-status">Downgrade to</p>
                    ) : (
                      <p className="plan-status">Upgrade to</p>
                    )}
                    {/* {plan.active === false && (
                      <p className="plan-status">Subscribe to</p>
                    )} */}
                  </div>
                ))}

                {/* <div className="plan-item advance-item">
                  <Image
                    src={enterpriceIcon}
                    className="advance-icon"
                    size="small"
                  />
                  <p className="plan-title">Enterprise</p>
                  <p className="plan-subdesc">Custom call packages</p>
                  <p className="plan-status">Contact Sales</p>
                </div> */}
              </div>
              {/* <div className="plans-included">
                <p className="title">All Limecall plans include:</p>
                <ul className="plans-icon">
                  <li className="icon">
                    <Image src={sms} size="small" />
                    Sms Followups
                  </li>
                  <li className="icon">
                    <Image src={mobileDesktopApp} size="small" />
                    Mobile + Desktop App
                  </li>
                  <li className="icon">
                    <Image src={leadAnalytics} size="small" />
                    Lead Analytics
                  </li>
                  <li className="icon">
                    <Image src={callTransfer} size="small" />
                    Call Transfer
                  </li>
                  <li className="icon">
                    <Image src={outgoingCalls} size="small" />
                    Outgoing Calls
                  </li>
                  <li className="icon">
                    <Image src={callRecord} size="small" />
                    Call Record
                  </li>
                  <li className="icon">
                    <Image src={api} size="small" />
                    API Access
                  </li>
                  <li className="icon">
                    <Image src={sync} size="small" />2 way sync through
                    Integrations
                  </li>
                </ul>
              </div>
             */}
            </div>
            <div className="holder-small-content">
              {!cardSummary && (
                <div className="summary">
                  <p className="summary-title">Summary</p>
                  <div className="summary-tab-holder">
                    <CommonGroupButton
                      title=""
                      identity="addForwardNumber"
                      leftBtn="Monthly"
                      rightBtn="Annual"
                      groupStyle="summary-toggle"
                      handleGroupBtnData={e => this.handleGroupBtnData(e)}
                    />
                  </div>
                  <div className="summary-plan">
                    <p className="light-text">Plan</p>
                    <span className="center-line" />
                    <p className="gray-text">{dataModal.dataPlan.planName}</p>
                  </div>
                  <div className="summary-plan">
                    <p className="light-text">Users</p>
                    <span className="center-line" />
                    <p className="gray-text">One</p>
                  </div>
                  <div className="summary-code">
                    <p className="summary-code-text">
                      <i className="fas fa-question-circle" />
                      Have a promotional Code?
                    </p>
                    <CommonInput
                      onChange={e =>
                        this.setState({ promoCode: e.target.value })
                      }
                      name="promoCode"
                      placeholder="Enter your Code here"
                    />
                    <CommonButtons
                      onClick={this.executeCoupanCode}
                      content="Apply"
                      background="blue"
                      loading={this.state.applyCouponLoader}
                    />
                  </div>
                  <div className="summary-plan">
                    <p className="summary-plan-title">Summary</p>
                    <p className="light-text">
                      {this.state.selectedPlan.activeLabel}
                    </p>
                    <span className="center-line" />
                    <p className="gray-text">
                      ${this.state.selectedPlan.activePrice}
                    </p>
                  </div>
                  <div className="summary-due">
                    <p className="summary-due-text">Due Today</p>
                    <p className="summary-due-price">
                      $ {this.state.selectedPlan.actualPrice} USD
                    </p>
                  </div>
                  <div className="summary-drop">
                    <div className="payment-drop-down">
                      <p className="summary-due-text">Payment Method</p>
                      <p className="summary-due-price show-card">
                        {this.state.payCardDropdown.length === 1 ? (
                          <div>
                            {this.state.payCardDropdown.map(item => {
                              return (
                                <div className="cardDetails">
                                  <span>{`*** ${item.text}`}</span>
                                </div>
                              )
                            })}
                          </div>
                        ) : (
                          <div>Please add new card</div>
                        )}
                      </p>
                    </div>
                    <span
                      className="add-card"
                      onClick={this.onOpenAddCardModal}
                    >
                      { this.state.updateCard ? 'Edit card' : 'Add new card' }
                    </span>
                    <CommonAddCardModal
                      open={this.state.addCardModalOpen}
                      onCloseAddCardModal={this.onCloseAddCardModal}
                      handleCreditCardInfo={this.handleCreditCardInfo}
                      creditCardDetailsErrors={
                        this.state.dataModal.creditCardDetailsErrors
                      }
                      addCreditCardLoader={this.state.addCreditCardLoader}
                      onAddCreditCard={this.onAddCreditCard}
                      updateCard={ this.state.updateCard }
                     
                    />
                  </div>
                  <div className="holder-credit-card">
                    <CommonButtons
                      onClick={this.checkSubscription}
                      content={
                        this.state.activePlans
                          ? this.state.activePlans.price <
                            this.state.selectedPlan.activePrice
                            ? 'Upgrade Subscription'
                            : this.state.activePlans.price >
                              this.state.selectedPlan.activePrice
                            ? 'Downgrade Subscription'
                            : 'Update Subscription'
                          : 'Update Subscription'
                      }
                      // {plan.active ? (
                      //   <p className="plan-status">Current Plan</p>
                      // ) : this.state.activePlans.price > plan.price ? (
                      //   <p className="plan-status">Downgrade to</p>
                      // ) : (
                      //   <p className="plan-status">Upgrade to</p>
                      // )}
                      background="blue"
                    />
                  </div>
                  {/* <CommonSubscriptionModal
                    open={this.state.isModalOpen}
                    onClose={this.handleCloseModal}
                    currentPlan={this.props.currentPlan}
                    updateGetSubscription={this.props.updateGetSubscription}
                  /> */}
                  <ConfirmUpgradePlanModal
                    open={this.state.confirmOnOpen}
                    onCloseUpgradePlanModal={this.onCloseUpgradePlanModal}
                    dataTable={dataTable}
                    loading={this.state.addPaymentLoader}
                    addPayment={this.addPayment}
                  />
                </div>
              )}
              {cardSummary && (
                <div className="saved-cards">
                  <p className="saved-cards-title">Saved Cards</p>
                  <Table>
                    <Table.Header>
                      <Table.Row>
                        <Table.HeaderCell></Table.HeaderCell>
                        <Table.HeaderCell>Card Number</Table.HeaderCell>
                        <Table.HeaderCell>Expiry Date</Table.HeaderCell>
                        <Table.HeaderCell>Status</Table.HeaderCell>
                      </Table.Row>
                    </Table.Header>
                    <Table.Body>
                      {this.state.payCard.map(item => (
                        <Table.Row>
                          <Table.Cell>
                            <Checkbox
                              text=""
                              checkboxStyle="modal-checkbox"
                              name="checkbox"
                              value={this.state.creditCardDetails}
                              onChange={(e, data, checked) =>
                                this.onChangeCheckBox(e, data, checked, item)
                              }
                            />
                          </Table.Cell>
                          <Table.Cell>
                            ****
                            {item.card.last_four_digits}
                          </Table.Cell>
                          <Table.Cell>
                            {' '}
                            {item.card.expiry_month +
                              '/' +
                              item.card.expiry_year}{' '}
                          </Table.Cell>
                          <Table.Cell>Active</Table.Cell>
                        </Table.Row>
                      ))}
                    </Table.Body>
                  </Table>
                  <div className="card-info">
                    {this.state.newCard ? (
                      <>
                        <p className="card-title">Update Card</p>
                        <CommonInput
                          onChange={this.handleCreditCardInfo}
                          name="cardName"
                          title="NAME ON CARD"
                          background="gray"
                          error={cardName}
                        />
                        <div className="holder-card-number">
                          <CommonInput
                            onChange={this.handleCreditCardInfo}
                            name="cardNumber"
                            title="CARD NUMBER"
                            background="gray"
                            error={cardNumber}
                          />
                          <div className="holder-images">
                            <Image src={visa} />
                            <Image src={americanExpress} />
                            <Image src={masterCard} />
                          </div>
                        </div>
                        <div className="holder-date">
                          <CommonInput
                            onChange={this.handleCreditCardInfo}
                            name="validMonth"
                            title="VALID THRU"
                            placeholder="Month"
                            background="gray"
                            error={validMonth}
                          />
                          <CommonInput
                            onChange={this.handleCreditCardInfo}
                            name="validYear"
                            placeholder="Year"
                            background="gray"
                            error={validYear}
                          />
                        </div>
                        <CommonInput
                          onChange={this.handleCreditCardInfo}
                          name="cvv"
                          title="CVV"
                          background="gray"
                          error={cvv}
                        />
                        <span className="secure-text">
                          <Image src={checked} />
                          100% secure checkout
                        </span>
                        <span className="commercial-text">
                          <Image src={checked} />
                          256-Bit Commercial grade Security
                        </span>
                        <CommonButtons
                          content="Update Card"
                          background="blue"
                          loading={this.state.addCreditCardLoader}
                          onClick={this.onAddCreditCard}
                        />
                      </>
                    ) : (
                      <CommonButtons
                        content="Add New Card"
                        background="blue"
                        onClick={() => this.setState({ newCard: true })}
                      />
                    )}
                  </div>
                  <div>
                    <div className="applyNowToggleContainer">
                      <Toggle
                        activeDefault={this.state.subscriptionData.apply_now}
                        dataStateToggle={this.applyNowToggle}
                        dataToggleActive={this.state.subscriptionData.apply_now}
                        handleToggleData={this.handleToggleData}
                      />
                      <p>Apply now</p>
                    </div>
                    <div className="changeSubscription">
                      <CommonButtons
                        content="Change subscription"
                        background="blue"
                        loading={this.state.addPaymentLoader}
                        onClick={this.addPayment}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </Modal.Content>
        </Modal>
      </Fragment>
    )
  }
}

export default CommonSubscriptionModal
