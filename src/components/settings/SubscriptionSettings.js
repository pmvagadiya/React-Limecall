import React, { Component } from 'react'
import { Modal, Table } from 'semantic-ui-react'

// import Toggle from '../../common/CommonToggle'
import CommonInput from '../../common/CommonInput'
import CommonButton from '../../common/CommonButtons'
import { applyChangeSubscription, getSubscription } from '../../config/subscription'
import SubscriptionTable from './SubscriptionTable'
import { Dimmer, Loader, Image, Segment } from 'semantic-ui-react'
import { CommonNotify } from '../../common/CommonNotify'

// const callToggle = {
//   callTitle: '',
//   callDesc: '',
//   callId: 'autoRecharge',
//   callref: 'toggleRecharge'
// }

class SubscriptionSettings extends Component {
  state = {
    isCancelModalOpen: false,
    currentPlan: '',
    creditLeft: 0,
    isTrail: false,
    isLoading: true,
    tables: {
      totalUsage: {
        type: '3',
        header: [
          { headerTitle: 'Call Made To' },
          { headerTitle: 'Time' },
          { headerTitle: 'Credits Used' }
        ],
        tableContentData: [
          {
            columnOne: '+ 71-5676545443',
            columnTwo: '22-05-2019 22:45',
            columnThree: '$ 0.87'
          }
        ]
      },
      subscription: {
        header: [
          { headerTitle: 'Product' },
          { headerTitle: 'Current Plan' },
          { headerTitle: 'Status' },
          { headerTitle: 'Ends at' },
          { headerTitle: '' },
          { headerTitle: '' }
        ],
        tableContentData: [
          {
            product: '',
            currentPlan: '',
            status: '',
            ends: '',
            cancel: '',
            upgrade: '',
            isModalOpen: false
          }
        ]
      }
    },
    activeToggle: false,
    activeNewPlan: false,
    newPlanActive: {
      new_plan_start_date: '',
      new_plan: ''
    }
  }

  componentDidMount() {    
    this.updateGetSubscription()
  }

  updateGetSubscription = () => {

   

    getSubscription()
      .then(res => {
        this.setState({
          isLoading: false
        })
        const d = res.data.data
        if (d.new_plan) {
          const newData = {
            new_plan_start_date: d.new_plan_start_date,
            new_plan: d.new_plan
          }
          this.setState({ activeNewPlan: true, newPlanActive: newData })
        }
        if (d != '') {         
          const { tables } = this.state
          const subscription = tables.subscription
          const tableContentData = subscription.tableContentData
          const data = []
          const obj = {}
          obj.product = 'Limecall'
          obj.currentPlan = d.plan_name
          obj.status = this.humanize(d.status)
          obj.ends = d.current_term_end
          obj.max_calls = d.max_calls
          obj.max_sms = d.max_sms
          obj.calls_used = d.calls_used
          obj.sms_used = d.sms_used
          let { isTrail } = this.state
          isTrail = true
          if (d.status == 'in_trial') {
            obj.ends = d.trial_end
            isTrail = false
          }
          obj.cancel = 'Cancel Subscription'
          obj.upgrade = 'Upgrade your plan'
          obj.isModalOpen = false

          let creditLeft = parseInt(d.max_calls) - parseInt(d.calls_used)
          //this.setState({ creditLeft: creditLeft })
          //this.setState({ currentPlan: obj.currentPlan })

          data.push(obj)
          this.setState(prevState => ({
            ...prevState,
            creditLeft: creditLeft,
            currentPlan: obj.currentPlan,
            isTrail: isTrail,
            tables: {
              ...prevState.tables,
              subscription: {
                ...prevState.tables.subscription,
                tableContentData: data
              }
            }
          }))
        }
      })
      .catch(err => console.error(err))
  }

  handleToggleData = toggleData => {
    this.setState({ activeToggle: toggleData })
  }

  humanize = str => {
    var i,
      frags = str.split('_')
    for (i = 0; i < frags.length; i++) {
      frags[i] = frags[i].charAt(0).toUpperCase() + frags[i].slice(1)
    }
    return frags.join(' ')
  }

  handleAddCreditModal = () => {
    let { isCancelModalOpen, isTrail } = this.state

    if (isTrail) {
      alert('Not Applicable for trial Account')
      return
    }

    isCancelModalOpen = !isCancelModalOpen
    this.setState({ isCancelModalOpen })
  }

  handleCloseCancelModal = () => this.setState({ isCancelModalOpen: false })

  changeSubscription = () => {
    this.setState({ isLoading: true })
    applyChangeSubscription()
      .then(res => {
        if (res.data.data) {
          CommonNotify('Successfully', 'success')
          this.setState({ activeNewPlan: false })
          this.updateGetSubscription()
        }
      })
      .catch(err => {
        const errors = { ...err }
        if (errors.response.data.errors) {
          CommonNotify(errors.response.data.errors[0])
          this.setState({ isLoading: false })
          return
        }
        CommonNotify('Some thing went wrong')
        this.setState({ isLoading: false })
      })
  }
  render() {
    const { tables, isCancelModalOpen } = this.state

    return (
      <>
        <Dimmer active={this.state.isLoading} style={{ position: 'fixed' }}>
          <Loader />
        </Dimmer>
        <div className="billing-subscription available-phone-credits">
          <div className="container-billing">
            <div className="credits">
              <div className="available-credits">
                <p className="title available-phone-credits">
                  Available Phone Credits
                </p>
                <p className="credit-value">
                  {this.state.creditLeft}
                  <span
                    className="btn-add-credits"
                    onClick={this.handleAddCreditModal}
                  >
                    Add Credits
                  </span>
                </p>
              </div>
              {/* <div className="auto-recharge">
              <p className="title auto-recharge-text">
                Auto recharge
                <Icon fitted name="question circle" />
              </p>
              <Toggle
                dataStateToggle={callToggle}
                dataToggleActive={this.state.activeToggle}
                handleToggleData={this.handleToggleData}
              />
            </div> */}
            </div>
            {/* {this.state.activeNewPlan && (
              <div className="credits apply-now">
                <div className="available-credits">
                  <p>
                    You have requested new changes, new plan is{' '}
                    {this.state.newPlanActive.new_plan} will start at{' '}
                    {this.state.newPlanActive.new_plan_start_date} UTC OR,
                    <span
                      className="btn-add-credits"
                      onClick={this.changeSubscription}
                    >
                      Apply Now
                    </span>
                  </p>
                  {/* <p className="credit-value">
                  {this.state.creditLeft}
                  <span
                    className="btn-add-credits"
                    onClick={this.handleAddCreditModal}
                  >
                    Add Credits
                  </span>
                </p> 
                </div>
              </div>
            )} */}
          </div>
          <div className="holder-subscription">
            <SubscriptionTable
              dataTable={tables.subscription}
              currentPlan={this.state.currentPlan}
              updateGetSubscription={this.updateGetSubscription}
            />
          </div>

          <Modal
            className="add-credit-modal-wrapper"
            open={isCancelModalOpen}
            onClose={this.handleCloseCancelModal}
          >
            <Modal.Header>
              <p className="cancel-title">Add Credits</p>
              <i
                onClick={this.handleAddCreditModal}
                className="fa fa-times"
                aria-hidden="true"
              ></i>
            </Modal.Header>
            <Modal.Content>
              <div className="modal-content">
                <Table>
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell>Card Number</Table.HeaderCell>
                      <Table.HeaderCell>Added Date</Table.HeaderCell>
                      <Table.HeaderCell>Status</Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>
                  <Table.Body>
                    <Table.Row>
                      <Table.Cell>123546789</Table.Cell>
                      <Table.Cell>10/20</Table.Cell>
                      <Table.Cell>Active</Table.Cell>
                    </Table.Row>
                  </Table.Body>
                </Table>
                <div className="add-credit-field">
                  <CommonInput
                    title="Add Amount"
                    placeholder="Add Amount"
                    name="addAmount"
                    type="text"
                  />
                  <CommonButton
                    content="Add"
                    background="blue"
                    btnClass="btn-send"
                  />
                </div>
              </div>
            </Modal.Content>
          </Modal>
        </div>
      </>
    )
  }
}

export default SubscriptionSettings
