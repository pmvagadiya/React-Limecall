import React, { Component, Fragment } from 'react'
import { Table, Image, Modal, Label } from 'semantic-ui-react'
// import Swiper from 'react-id-swiper'
// Need to add Pagination, Navigation modules
// import { Navigation } from 'swiper/dist/js/swiper.esm'

import CommonInput from '../../common/CommonInput'
import CommonGroupButton from '../../common/CommonGroupButton'
import CommonButtons from '../../common/CommonButtons'
import CommonSelect from '../../common/CommonSelect'
import CommonCheckbox from '../../common/CommonCheckbox'

import starterIcon from '../../assets/images/startericon.svg'
import proIcon from '../../assets/images/proicon.svg'
import advanceIcon from '../../assets/images/advanceicon.svg'
import enterpriceIcon from '../../assets/images/enterprise.svg'
import sms from '../../assets/images/sms.svg'
import mobileDesktopApp from '../../assets/images/mobiledesktopapp.svg'
import leadAnalytics from '../../assets/images/leadanalytics.svg'
import callTransfer from '../../assets/images/calltransfer.svg'
import outgoingCalls from '../../assets/images/outgoingcalls.svg'
import callRecord from '../../assets/images/callrecord.svg'
import api from '../../assets/images/api.svg'
import sync from '../../assets/images/syncicon.svg'
// import cardColored from '../../assets/images/card-colored.svg'
// import grayCard from '../../assets/images/graycard.svg'
import checked from '../../assets/images/checked.svg'
import americanExpress from '../../assets/images/americanexpress.svg'
import visa from '../../assets/images/visa.svg'
import masterCard from '../../assets/images/mastercard.svg'
import { cancelSubscription } from '../../config/subscription'

import axios from 'axios'

import { useAlert } from 'react-alert'
import CommonSubscriptionModal from '../../common/CommonSubscriptionModal'
import CommonTextArea from '../../common/CommonTextArea'
import { CommonNotify } from '../../common/CommonNotify'
import ConfirmUpgradePlanModal from '../../common/ConfirmUpgradePlanModal'

const apiToken = localStorage.getItem('access_token')

class SubscriptionTableModal extends Component {
  state = {
    isModalOpen: false,
    promoCode: '',
    isCancelModalOpen: false,
    cardSummary: false,
    allPlans: [],
    selectedPlan: { activeLabel: '', activePrice: 0, actualPrice: 0 },
    payCard: {},
    reasonSubscriptionCancel: '',
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
      }
    },
    upgradePlanModalOpen: false
  }

  // fetch plan details

  setPlanData = plans => {
    let { currentPlan } = this.props

    let images = [starterIcon, proIcon, advanceIcon, advanceIcon, advanceIcon]

    plans.forEach((item, index, theArray) => {
      //var temp = Object.assign({}, item)
      theArray[index].icon = images[index]
      theArray[index].yearly_total = 0
      if (item.yearly_price) {
        theArray[index].yearly_total = item.yearly_price * 12
      }
      let UpdateCurrentPlaneName = currentPlan.toLowerCase().split(' ')
      if (item.name.toLowerCase() == UpdateCurrentPlaneName[0]) {
        theArray[index].active = true
      } else {
        theArray[index].active = false
      }
    })  

    this.setState({ allPlans: plans })
  }

  componentWillMount = () => {
    this.fetchPlans()
    this.fetchCard()
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
      if (res.data.data[0]) {
        //this.setPlanData(res.data.data)
        //this.onUpdateCard()
        this.setState({ payCard: res.data.data[0] })
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
          let { selectedPlan } = this.state
          selectedPlan.actualPrice = res.data.data
          this.setState({ selectedPlan: selectedPlan })
        }
      })
      .catch(function(error) {
        if (error.response) {
          alert('Invalid Coupon Code')
          // Request made and server responded
        
        } else if (error.request) {
          // The request was made but no response was received
          
        } else {
          // Something happened in setting up the request that triggered an Error
         
        }
      })
  }

  handleGroupBtnData = (toggleBtn, id) => {
    let { selectedPlan } = this.state

    if (toggleBtn == 'Monthly') {
      selectedPlan.activePrice = selectedPlan.price
      selectedPlan.actualPrice = selectedPlan.price
      selectedPlan.activeLabel = 'Monthly Charge'
    } else {
      selectedPlan.activePrice = selectedPlan.yearly_total
      selectedPlan.actualPrice = selectedPlan.yearly_total
      selectedPlan.activeLabel = 'Annual Charge'
    }

    this.setState({ selectedPlan: selectedPlan })
  }

  handleDataModal = (e, index) => {
    let { dataModal } = this.state
    const newPlanName = e.target.parentNode.querySelector('.plan-title')
    const newPlanPrice = e.target.parentNode.querySelector('.plan-price')
    const planStatus = e.target.parentNode.querySelector('.plan-status')
    const allPlanStatus = document.querySelectorAll('.plan-status')

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

    allPlanStatus.forEach((value, index) => {
      const planStatus = e.target.parentNode.querySelector('.plan-status')

      if (
        value.innerHTML !== 'Current Plan' &&
        value.innerHTML !== 'Contact Sales' &&
        planStatus.innerHTML !== 'Current Plan'
      ) {
        value.classList.remove('selected')
        value.innerHTML = 'Upgrade to'
      }
    })

    if (
      planStatus.innerHTML !== 'Contact Sales' &&
      planStatus.innerHTML !== 'Current Plan'
    ) {
      planStatus.innerHTML = 'Selected'
      planStatus.classList.add('selected')
    }
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
  }

  checkSubscription = () => {
    if (this.state.selectedPlan.activeLabel == '') {
      alert('Please Select Plan First')
      return
    }

    this.setState({ cardSummary: true })
  }

  onCancel = async () => {
    if (this.state.reasonSubscriptionCancel === '') {
      CommonNotify('This field is required', 'warning')
      return
    }
    await cancelSubscription(this.state.reasonSubscriptionCancel)
      .then(res => {
        this.setState({ isCancelModalOpen: false })
        CommonNotify('Successfully Updated', 'success')
      })
      .catch(err => {
        const error = { ...err }
        if (error.response.data.errors.length) {
          CommonNotify(error.response.data.errors[0])
        }
      })
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

  onChangeInput = e => {
    const { value } = e.target
    this.setState({ reasonSubscriptionCancel: value })
  }

  onCloseUpgradePlanModal = () => {
    this.setState({ upgradePlanModalOpen: false })
  }

  upgradeYourPlane = data => {
    if (data.max_calls === 0 || data.max_sms === 0) {
      this.handleModal()
    } else {
      this.onOpenUpgradePlanModal()
    }
  }
  onOpenUpgradePlanModal = () => {
    let { upgradePlanModalOpen } = this.state
    upgradePlanModalOpen = !upgradePlanModalOpen
    this.setState({ upgradePlanModalOpen })
  }

  render() {
    const {
      isModalOpen,
      isCancelModalOpen,
      dataModal,
      cardSummary
    } = this.state
    const { dataTable, currentPlan } = this.props
    return (
      <Fragment>
        <Table singleLine>
          <Table.Header>
            <Table.Row>
              {dataTable.header.map((header, index) => {
                return (
                  <Table.HeaderCell key={index}>
                    {header.headerTitle}
                  </Table.HeaderCell>
                )
              })}
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {dataTable.tableContentData.map((data, index) => {
              return (
                <Table.Row key={index} className="table-content-row">
                  <Table.Cell>{data.product}</Table.Cell>
                  <Table.Cell>{data.currentPlan}</Table.Cell>
                  <Table.Cell>{data.status}</Table.Cell>
                  <Table.Cell>{data.ends}</Table.Cell>
                  <Table.Cell onClick={this.handleCancelModal}>
                    {data.cancel}
                  </Table.Cell>
                  <Table.Cell onClick={this.handleModal}>
                    {data.upgrade}
                  </Table.Cell>
                </Table.Row>
              )
            })}
          </Table.Body>
        </Table>

        <CommonSubscriptionModal
          open={this.state.isModalOpen}
          onClose={this.handleCloseModal}
          currentPlan={this.props.currentPlan}
          updateGetSubscription={this.props.updateGetSubscription}
          dataTable={dataTable}
        />
        {/* <ConfirmUpgradePlanModal
          open={this.state.upgradePlanModalOpen}
          onCloseUpgradePlanModal={this.onCloseUpgradePlanModal}
          dataTable={dataTable}
        /> */}
        <Modal
          className="cancel-subscription-wrapper limecall_subscription"
          open={isCancelModalOpen}
          // onClose={this.handleCloseCancelModal}
        >
          <Modal.Header>
            <p className="cancel-title">Cancel your Limecall Subscription</p>
            <i
              onClick={this.handleCancelModal}
              className="fa fa-times"
              aria-hidden="true"
            ></i>
          </Modal.Header>
          <Modal.Content>
            <div className="modal-content">
              <p className="cancel-subs-text default-text">
                We are sad to see you go. Please take a moment to tell us why you want to cancel your subscription
              </p>
              <div className="subscription-feedback-input">
                <CommonTextArea
                  onChange={e => this.onChangeInput(e)}
                  name="reasonSubscriptionCancel"
                  type="text"
                  inputStyle="subscription-input"
                  placeholder="Reason for cancellation"
                />
              </div>
              <div className="cancel-subs-description-holder">
                <p className="cancel-subs-descripiton">
                  By clicking on <span>Cancel Subscription</span> below, you are confirming the cancellation and deletion of your account. Your Limecall powdered phone system and access all integrated products will stop working .This will cause an irreversable deletion of your account which includes all your leads and call records
                </p>
              </div>
              <div className="btn-scancel-subscription-wrapper">
                <CommonButtons
                  onClick={this.onCancel}
                  content="Cancel Subscription"
                  type="button"
                  btnClass="btn-cancel"
                />
              </div>
            </div>
          </Modal.Content>
        </Modal>
      </Fragment>
    )
  }
}

export default SubscriptionTableModal
