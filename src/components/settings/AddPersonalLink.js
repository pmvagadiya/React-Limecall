import React, { Component } from 'react'
import { Accordion, Button, Input, Dimmer, Loader, Popup } from 'semantic-ui-react'
import CommonInput from '../../common/CommonInput'
import CommonTextArea from '../../common/CommonTextArea'
import Dropzone from 'react-dropzone-uploader'
import CommonButtons from '../../common/CommonButtons'
import axios from 'axios'
import { CommonNotify } from '../../common/CommonNotify'
import Toggle from '../../common/CommonToggle'
// import { Link } from 'react-router-dom'
import { Icon } from 'semantic-ui-react'

const apiToken = localStorage.getItem('access_token')

class AddPersonalLink extends Component {
  state = {
    activeIndexs: [0, 1],
    isProfileData: false,
    isTwitterEnable: false,
    isLinkedInEnable: false,
    complete_name : '',
    data: {
      designation: '',
      twitter: '',
      linkedin: '',
      bio: '',
      time_zone: 'Africa/cairo',
      full_name: 'Muhammad Magd',
      company_name: "Mario's",
      selectedFile: null
    },

    role: '',
    selectedFile: null,
    personalUrl: '',
    personalLinkCopyText: '',
    twitterToggle: {
      callId: 'twitterToggleSnippet'
    },
    linkedInToggle: {
      callId: 'linkedInToggleSnippet'
    },
    isLoader: false
  }

  componentDidMount() {
    this.getPersonalLink()
  }

  getPersonalLink = () => {
    const url = `${process.env.REACT_APP_BASE_APP_URL}/api/v1/user/profile`
    this.setState({ isLoader: true })
    let head = {
      headers: {
        Authorization: 'Bearer ' + apiToken
      }
    }
    axios
      .get(url, head)
      .then(res => {
        const urlData = res.data.data.personal_link.split('me/').pop()
        const personalData = res.data.data
        const roleData = res.data.data.role.name
        const full_name = res.data.data.first_name + ' ' + res.data.data.last_name
        this.setState({
          personalLinkCopyText: res.data.data.personal_link,
          personalUrl: urlData,
          role: roleData,
          data: personalData,
          isLoader: false,
          complete_name : full_name
        })
      })
      .catch(error => {
        CommonNotify('error')
        this.setState({ isLoader: false })
      })
  }

  onChangeProfileData = e => {
    const { name, value } = e.target
    if (!value) {
      this.setState({ isProfileData: false })
    } else {
      this.setState({ isProfileData: true })
    }
    const { data } = this.state

    data[name] = value

    this.setState({ value })
  }

  onChangeUrlData = e => {
    const { value } = e.target
    if (!value) {
      this.setState({ isPersonalLink: false })
    } else {
      this.setState({ isPersonalLink: true })
    }
    this.setState({ personalUrl: value })
  }

  handleClick = (e, titleProps) => {
    const { index } = titleProps
    const { activeIndexs } = this.state
    const newIndex = activeIndexs
    const currentIndexPosition = activeIndexs.indexOf(index)
    if (currentIndexPosition > -1) {
      newIndex.splice(currentIndexPosition, 1)
    } else {
      newIndex.push(index)
    }

    this.setState({ activeIndexs: newIndex })
  }
  onUpdate = event => {
    event.preventDefault()
    this.setState({ isLoader: true })
    let head = {
      headers: {
        Authorization: 'Bearer ' + apiToken
      }
    }
    const url = `${process.env.REACT_APP_BASE_APP_URL}/api/v1/user/personal-link`
    const data = {
      code: this.state.personalUrl
    }
    axios
      .post(url, data, head)
      .then(res => {
        if (res.data) {
          CommonNotify(res.data.message[0], 'success')
          this.getPersonalLink()
          this.setState({ isLoader: false })
        }
      })
      .catch(error => {
        CommonNotify(error.data.error[0])
        this.setState({ isLoader: false })
      })
  }
  handleLinkedInToggleData = toggleData => {
    this.setState({
      ...this.state,
      isLinkedInEnable: toggleData
    })
  }
  handleTwitterInToggleData = toggleData => {
    this.setState({
      ...this.state,
      isTwitterEnable: toggleData
    })
  }

  updateCompanyData = e => {
    e.preventDefault()
    const url = `${process.env.REACT_APP_BASE_APP_URL}/api/v1/user/update-profile`
    this.setState({ isLoader: true })
    const head = {
      headers: {
        Authorization: 'Bearer ' + apiToken
      }
    }
    const resetData = {
      role: this.state.role,
      designation: this.state.data.designation,
      twitter: this.state.data.twitter,
      linkedin: this.state.data.linkedin,
      bio: this.state.data.bio,
      time_zone: this.state.data.time_zone,
      full_name: this.state.complete_name,
      company_name: this.state.data.company_name
    }
    axios
      .post(url, resetData, head)
      .then(res => {
        if (res.data) {
          this.getPersonalLink()
          this.setState({ isLoader: false })
          CommonNotify('Profile Information Successfully Updated', 'success')
        }
      })
      .catch(error => {
        CommonNotify('error')
        this.setState({ isLoader: false })
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
        <Dimmer active={this.state.isLoader}>
          <Loader />
        </Dimmer>
        <div className="link-Sharing add_personal_link">
          <div className="share-your-link-wrapper profile_url">
            <div className="share-your-link change-personal">
              <Accordion>
                <Accordion.Title
                  active={this.state.activeIndexs.includes(1)}
                  index={1}
                  onClick={this.handleClick}
                  style={{ padding: '15px' }}
                >
                  <p className="bold-text accordion-title">My Personal URL</p>
                  <p className="subtext accordion-desc">
                    Create your profile link and share it with your customer.
                  </p>
                </Accordion.Title>
                <Accordion.Content active={this.state.activeIndexs.includes(1)}>
                  <form method="" action="">
                    <div className="holder-change-personal">
                      <div className="personal-link-container">
                        <Input
                          label="https://qa.limecall.me/"
                          onChange={this.onChangeUrlData}
                          value={this.state.personalUrl}
                          placeholder="XYZ"
                          name="personalUrl"
                        />
                        <Popup
                          content="Copy personal URL"
                          trigger={
                            <Icon
                              name="copy"
                              onClick={() =>
                                this.onCopyText(this.state.personalLinkCopyText)
                              }
                            />
                          }
                        />
                      </div>
                    </div>
                    {this.state.isPersonalLink && (
                      <div className="save-cancel">
                        <CommonButtons
                          onClick={e => this.onUpdate(e)}
                          type="submit"
                          content="Save"
                          background="blue"
                        />
                        <CommonButtons
                          //onClick={}
                          type="reset"
                          content="Cancel"
                          background="grey"
                        />
                      </div>
                    )}
                  </form>
                </Accordion.Content>
              </Accordion>
            </div>
          </div>
          <div className="share-your-link-wrapper profile_information">
            <div className="share-your-link personal-info-wrapper">
              <Accordion>
                <Accordion.Title
                  active={this.state.activeIndexs.includes(0)}
                  index={0}
                  onClick={this.handleClick}
                  style={{ padding: '15px' }}
                >
                  <p className="bold-text accordion-title">
                    Profile Information
                  </p>
                  <p className="subtext accordion-desc">
                   Set Profile Information
                  </p>
                </Accordion.Title>
                <Accordion.Content active={this.state.activeIndexs.includes(0)}>
                  <form>
                    <div className="holder-input">
                      <CommonInput
                        onChange={this.onChangeProfileData}
                        name="designation"
                        title="Designation"
                        required={true}
                        background="gray"
                        value={this.state.data.designation}
                      />
                      {/* <CommonInput
                        onChange={this.onChangeProfileData}
                        name="role"
                        type="text"
                        title="Role"
                        background="gray"
                        required={true}
                        value={this.state.role}
                      /> */}
                      <div className="linkedin__field">
                        <CommonInput
                          onChange={this.onChangeProfileData}
                          name="linkedin"
                          type="text"
                          title="LinkedIn"
                          background="gray"
                          required={true}
                          value={this.state.data.linkedin}
                          disabled={!this.state.isLinkedInEnable}
                        />
                        <Toggle
                          dataToggleActive={this.state.isLinkedInEnable}
                          handleToggleData={this.handleLinkedInToggleData}
                          dataStateToggle={this.state.linkedInToggle}
                        />
                      </div>

                      <div className="twitter__field">
                        <CommonInput
                          onChange={this.onChangeProfileData}
                          name="twitter"
                          type="text"
                          title="Twitter"
                          background="gray"
                          required={true}
                          value={this.state.data.twitter}
                          disabled={!this.state.isTwitterEnable}
                        />
                        <Toggle
                          dataToggleActive={this.state.isTwitterEnable}
                          handleToggleData={this.handleTwitterInToggleData}
                          dataStateToggle={this.state.twitterToggle}
                        />
                      </div>
                      <CommonTextArea
                        onChange={this.onChangeProfileData}
                        value={this.state.data.bio}
                        //placeholder="Custom CSS"
                        background="gray"
                        title="Bio"
                        name="bio"
                      />
                      <div className="dropZone set_images">
                        <Dropzone accept="image/*,audio/*,video/*" />
                        <div className="dropZone-content">
                          <h3>Upload Image..</h3>
                          <div>
                            Your image should be less than 500px x 300px
                          </div>
                          <div>
                            Image should be either a .jpg, png, or .gif to work
                            properly in emails
                          </div>
                          <Button>Clear Image</Button>
                        </div>
                      </div>
                    </div>
                    {this.state.isProfileData && (
                      <>
                        <CommonButtons
                          onClick={this.updateCompanyData}
                          type="submit"
                          content="Save"
                          background="blue"
                        />
                        <CommonButtons
                          //onClick={}
                          type="reset"
                          content="Cancel"
                          background="grey"
                        />
                      </>
                    )}
                  </form>
                </Accordion.Content>
              </Accordion>
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default AddPersonalLink
