import React, { Component } from 'react'
import { Form, Icon, TextArea } from 'semantic-ui-react'
import CommonButtons from '../../common/CommonButtons'
import { CommonNotify } from '../../common/CommonNotify'
import axios from 'axios'
import wordpress from '../../assets/images/wordpress.svg'
import logoSetting from '../../assets/images/logo_setting_1.svg'
import { Modal, Button, Input } from 'semantic-ui-react'

const apiToken = localStorage.getItem('access_token')

class InstallationSettings extends Component {
  state = {
    script_text: null,
    isLoading: true,
    widgetInstalled: 0,
    open: false,
    devEmail: '',
    preview_link: null,
    widget_id: null
  }
  componentDidMount() {
    this.loadWidget()
    // this.loadWidgetPreview()
  }

  openModal = () => {
    this.setState({ open: true })
  }

  sendCode = () => {
    if (this.state.devEmail == '') {
      CommonNotify('Please Enter Email Id', 'warning')
      return
    }

    this.props.loading(true)

    let head = {
      headers: {
        Authorization: 'Bearer ' + apiToken
      }
    }

    let data = {
      developer_email: this.state.devEmail,
      widget_script: this.state.script_text
    }

    const url = `${process.env.REACT_APP_BASE_APP_URL}/api/v1/widget/send-code-to-developer`

    axios
      .post(url, data, head)
      .then(res => {
        this.props.loading(false)
        if (res.data.errors.length == 0) {
          this.setState({ devEmail: '', open: false })
          CommonNotify('Js Code snippet Send successfully', 'success')
        }
      })
      .catch(err => {
        this.props.loading(false)
        CommonNotify('Cant Send Email System Error occured')
      })
  }

  copyCode = () => {
    var copyText = this.state.script_text
    const el = document.createElement('textarea')
    el.value = copyText
    document.body.appendChild(el)
    el.select()
    document.execCommand('copy')
    document.body.removeChild(el)
    CommonNotify('Text Copied', 'success')
  }

  loadWidgetPreview = () => {
    this.props.loading(true)
    this.setState({ isLoading: true })
    let head = {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('access_token')
      }
    }
    const url = `${process.env.REACT_APP_BASE_APP_URL}/api/v1/widget/install?widget_id=${this.state.widget_id}`

    axios
      .get(url, head)
      .then(res => {      
        this.props.loading(false)
        if (res.data.data) {
          this.setState({
            previewLink: res.data.data.preview_link.split('value=')[1],
            widget_id: res.data.data.id
          })
          localStorage.setItem('widget_id', res.data.data.id)
        }
      })
      .catch(er => {
        this.props.loading(false)
        CommonNotify('Cant Fetch Widget Link')      
      })
  }
  loadWidget = () => {
    this.props.loading(true)
    this.setState({ isLoading: true })
    // const apiToken = sessionStorage.getItem('access_token')
    let head = {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('access_token')
      }
    }
    const url = `${process.env.REACT_APP_BASE_APP_URL}/api/v1/widget/widgets`

    axios
      .get(url, head)
      .then(res => {
        this.props.loading(false)
        if (res.data.data[0]) {
          localStorage.setItem('data-api-key', res.data.data[0].script_id)
          let code = `<script data-api-url="${process.env.REACT_APP_BASE_APP_URL}" data-api-key="${res.data.data[0].script_id}" src="https://widget.limecall.com/widget.js"> </script>`
          this.setState({
            widgetInstalled: res.data.data[0].installed,
            widget_id: res.data.data[0].id
          })
          this.setState({ script_text: code, isLoading: false })
          this.loadWidgetPreview()
        }
      })
      .catch(er => {
        this.props.loading(false)
        CommonNotify('Cant Fetch Widget Details')       
      })
  }

  onCopyText = async jsCode => {
    try {
      await navigator.clipboard.writeText(jsCode)
      CommonNotify('Copied!', 'success')
    } catch (err) {
      CommonNotify('Failed to copy!')
    }
  }

  render() {
    return (
      <>
        <div className="installation-wrapper installation_main">
          <div className="installation-content intallation_code">
            <div className="intallation_deatil">
              <p className="subtext">
              Copy and insert the JavaScript on your website preferably before the closing body tag. 
              </p>
              <CommonButtons
                content={
                  this.state.widgetInstalled == 1
                    ? 'Widget Installed'
                    : 'Widget Not Installed'
                }
                background="blue"
              />
              <div className="share-your-link">
                <p className="subtext">Preview Link</p>
                <a
                  rel="noopener noreferrer"
                  target="_blank"
                  href={`https://v2dev.limecall.com/widgetLink?key=${this.state.widget_id}&value=${this.state.previewLink}`}
                  className="link-holder"
                >
                  <p className="profile-link-text">Open Preview Link</p>
                </a>
              </div>
            </div>
            <div>
              <Form>
                <Icon
                  name="copy"
                  onClick={() => this.onCopyText(this.state.script_text)}
                />
                <TextArea
                  rows={5}
                  value={this.state.script_text}
                  className="call-textarea"
                />
              </Form>
              <div className="installation-footer">
                <CommonButtons
                  onClick={this.openModal}
                  content="Email Code"
                  background="blue"
                />
                <CommonButtons
                  onClick={this.copyCode}
                  content="Copy Code"
                  background="blue"
                />
              </div>
            </div>
          </div>
          <div className="installation-content">
            <div>
              <p className="subtext">Or Install Through</p>
            </div>
            <div>
              {/* <a
                href="https://app.limecall.com/get-user-gtm-token"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={logoSetting} alt="logo" />
              </a> */}
              <a
                href="http://limecall.com/wp-content/themes/limecall/plugin/limecall.zip"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={wordpress} alt="wordpress" />
              </a>
            </div>
          </div>

          <Modal
            onClose={() => this.setState({ open: false })}
            onOpen={() => this.setState({ open: true })}
            open={this.state.open}
            className="devloper_email_id"
          >
            <Modal.Header>Developer Email ID</Modal.Header>
            <Modal.Content image>
              <Modal.Description>
                <Input
                  placeholder="Email Id"
                  className="call-textarea"
                  onChange={e => this.setState({ devEmail: e.target.value })}
                  value={this.state.devEmail}
                />
              </Modal.Description>
            </Modal.Content>
            <Modal.Actions>
              <Button
                color="black"
                onClick={() => this.setState({ open: false })}
              >
                Close
              </Button>
              <Button
                content="Send Code"
                labelPosition="right"
                icon="checkmark"
                onClick={() => this.sendCode()}
                positive
              />
            </Modal.Actions>
          </Modal>
        </div>
      </>
    )
  }
}

export default InstallationSettings
