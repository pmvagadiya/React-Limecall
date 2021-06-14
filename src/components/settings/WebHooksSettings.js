import React, { Component } from 'react'
import { Modal, Table } from 'semantic-ui-react'
import CommonButtons from '../../common/CommonButtons'
import CommonInput from '../../common/CommonInput'
import { CommonNotify } from '../../common/CommonNotify'

import axios from 'axios'

const apiToken = localStorage.getItem('access_token')

class WebHooksSettings extends Component {
  state = {
    isCancelModalOpen: false,
    webhook: {
      hookName: '',
      name_field: '',
      country_code_field: '',
      phone_field: '',
      email_field: ''
    },
    webhooks: [],
    onSaveLoader: false,
    webHookError: {
      hookName: '',
      name_field: '',
      country_code_field: '',
      phone_field: '',
      email_field: ''
    }
  }
  componentDidMount = () => {
    this.fetchWebHook()
  }
  fetchWebHook = () => {
    this.props.loading(true)
    let head = {
      headers: {
        Authorization: 'Bearer ' + apiToken
      }
    }
    const url = `${process.env.REACT_APP_BASE_APP_URL}/api/v1/widget/get-hooks?widget_id=${this.props.widget.id}`

    axios
      .get(url, head)
      .then(res => {
        this.props.loading(false)
        if (res.data.data) {
          this.setState({ webhooks: res.data.data })
        }
      })
      .catch(er => {
        this.props.loading(false)
        CommonNotify('Cant Fetch Web Hooks')       
      })
  }

  changeHookValue = e => {
    const value = e.target.value
    const index = e.target.name
    const errorMessageName = {
      hookName: 'Hook Name',
      name_field: 'Name',
      country_code_field: 'Country code',
      phone_field: 'Phone number',
      email_field: 'Email'
    }
    let webHookError = { ...this.state.webHookError }
    if (value === '') {
      webHookError[index] = `${errorMessageName[index]} is required`
      this.setState({ webHookError: webHookError })
    } else {
      webHookError[index] = ''
      this.setState({ webHookError: webHookError })
    }
    let webHook = { ...this.state.webhook }
    webHook[index] = value
    this.setState({ webhook: webHook }, () => console.info(this.state.webhook))
  }

  createWebHook = () => {
    this.setState({ onSaveLoader: true })
    if (
      this.state.webhook.hookName === '' ||
      this.state.webhook.name_field === '' ||
      this.state.webhook.country_code_field === '' ||
      this.state.webhook.phone_field === '' ||
      this.state.webhook.email_field === ''
    ) {
      CommonNotify('All field are required', 'warning')
      this.setState({ onSaveLoader: false })
      return
    }

    this.props.loading(true)

    let head = {
      headers: {
        Authorization: 'Bearer ' + apiToken
      }
    }

    const url = `${process.env.REACT_APP_BASE_APP_URL}/api/v1/widget/create-web-hook`

    axios
      .post(url, this.state.webhook, head)
      .then(res => {
        this.props.loading(false)
        // if (res.data.errors.length == 0) {
        CommonNotify('WebHook Created', 'success')
        this.handleModal()
        this.fetchWebHook()
        this.setState({ onSaveLoader: false })
        // }
      })
      .catch(err => {
        this.props.loading(false)
        const errors = { ...err }
        if (errors.response.data.errors) {
          CommonNotify(errors.response.data.errors[0])
          this.setState({ onSaveLoader: false })
        } else {
          CommonNotify('Some thing went wrong')
          this.setState({ onSaveLoader: false })
        }
      })
  }

  handleModal = () => {
    let { isCancelModalOpen } = this.state

    isCancelModalOpen = !isCancelModalOpen
    const emptyErrorMessage = {
      hookName: '',
      name_field: '',
      country_code_field: '',
      phone_field: '',
      email_field: ''
    }
    this.setState({ isCancelModalOpen, webHookError: emptyErrorMessage })

  }

  handleCloseCancelModal = () => this.setState({ isCancelModalOpen: false })

  render() {
    return (
      <div className="web-hooks-wrapper">
        <div style={{fontSize: '16px',  marginBottom: '30px',  fontWeight: '600'}}>
          Create Webhooks to integrate with your own  extensions as well as other web applications
        </div>
        <CommonButtons
          type="button"
          content="Create Hook"
          background="blue"
          onClick={this.handleModal}
        />
        <Table>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Hook Name</Table.HeaderCell>
              <Table.HeaderCell>Hook URL</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {this.state.webhooks.map((col, index, row) => (
              <Table.Row>
                <Table.Cell>{col.name}</Table.Cell>
                <Table.Cell>{`${process.env.REACT_APP_BASE_APP_URL}/api/v1/widget/hook-call/${col.unique_key}`}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>

        <Modal
          className="webhook-modal creat_web_hook"
          open={this.state.isCancelModalOpen}
          onClose={this.handleCloseCancelModal}
        >
          <Modal.Content>
            <div className="modal-content create__webhook">
              <h3>Create a webhook</h3>
              <CommonInput
                name="hookName"
                title="Hook Name"
                placeholder="Hook Name"
                onChange={this.changeHookValue}
              />
              {this.state.webHookError.hookName ? (
                <span className="error-message">
                  {this.state.webHookError.hookName}
                </span>
              ) : null}
              <h3>WebHook Fields</h3>
              <CommonInput
                name="country_code_field"
                title="Country Code"
                placeholder="Country Code"
                onChange={this.changeHookValue}
              />
              {this.state.webHookError.country_code_field ? (
                <span className="error-message">
                  {this.state.webHookError.country_code_field}
                </span>
              ) : null}
              <CommonInput
                name="email_field"
                title="E-Mail"
                placeholder="E-Mail"
                onChange={this.changeHookValue}
              />
              {this.state.webHookError.email_field ? (
                <span className="error-message">
                  {this.state.webHookError.email_field}
                </span>
              ) : null}
              <CommonInput
                name="phone_field"
                title="Phone"
                placeholder="Phone"
                onChange={this.changeHookValue}
              />
              {this.state.webHookError.phone_field ? (
                <span className="error-message">
                  {this.state.webHookError.phone_field}
                </span>
              ) : null}
              <CommonInput
                name="name_field"
                title="Name"
                placeholder="Name"
                onChange={this.changeHookValue}
              />
              {this.state.webHookError.name_field ? (
                <span className="error-message">
                  {this.state.webHookError.name_field}
                </span>
              ) : null}
              <div className="footer">
                <CommonButtons
                  type="button"
                  content="Close"
                  background="blue"
                  onClick={this.handleModal}
                />
                <CommonButtons
                  type="button"
                  content="Create Hook"
                  background="blue"
                  onClick={this.createWebHook}
                  loading={this.state.onSaveLoader}
                />
              </div>
            </div>
          </Modal.Content>
        </Modal>
      </div>
    )
  }
}

export default WebHooksSettings
