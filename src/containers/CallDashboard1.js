import React, { Component } from 'react'
import { Image, TextArea, Modal, Dimmer, Loader } from 'semantic-ui-react'

import Title from '../common/Title'
import CommonCheckbox from '../common/CommonCheckbox'
import CommonButtons from '../common/CommonButtons'

import leadLogo from '../assets/images/call-details.png'
import defaultImage from '../assets/images/default-image.png'
import returnCall from '../assets/images/call-return.svg'
import greenReturnCall from '../assets/images/call-return-green.svg'
import email from '../assets/images/blue-email.svg'
import whiteEmail from '../assets/images/white-email.svg'
import ukFlag from '../assets/images/UK-flag.png'
import voiceRecord from '../assets/images/voice-record.png'
import play from '../assets/images/play.png'
import playHover from '../assets/images/Play-hover.svg'
import pause from '../assets/images/pause.png'
import pauseHover from '../assets/images/Pause-hover.svg'
import prev from '../assets/images/prev.png'
import prevHover from '../assets/images/Prev-hover.svg'
import next from '../assets/images/next.png'
import nextHover from '../assets/images/Next-hover.svg'
import callStarColored from '../assets/images/call-star-yellow.svg'
import callStar from '../assets/images/call-star-gray.svg'
import QuickTexts from '../components/calldashboard/QuickTexts'

import axios from 'axios'

import queryString from 'query-string'
import { CommonNotify } from '../common/CommonNotify'
import LeadInfo from './LeadInfo'
import RecentPageViews from './RecentPageViews'
import CallLogs from './CallLogs'

const apiToken = localStorage.getItem('access_token')

const callDataDefault = {
  phone_number: '',
  customer_name: '',
  email: '',
  ip_address: '',
  company_domain: '',
  duration: 0,
  final_status: '',
  tags: [],
  member: {
    first_name: '',
    last_name: ''
  },
  location: {
    city: '',
    country: ''
  },
  owner: {
    temp_phone_number: '',
    company_domain: ''
  },
  source: '',
  score: 0,
  id: ''
}

const getStarts = val => {
  let stars = []
  for (var i = 1; i < 6; i++) {
    if (i <= val) {
      stars.push(<img src={callStarColored} />)
    } else {
      stars.push(<img src={callStar} />)
    }
  }

  return stars
}

const Stars = ({ value }) => <span> {getStarts(value)}</span>

const NotesFeedback = () => (
  <div className="textarea">
    <div className="textarea-notes">
      <TextArea />
    </div>{' '}
    <div className="textarea-feedback">
      <TextArea />
    </div>{' '}
  </div>
)

class CallDashboard1 extends Component {
  state = {
    open: false,
    callData: callDataDefault,
    messages: [],
    apiLoaded: false,
    isLoading: false
  }

  handleLoading = state => {
    this.setState({ isLoading: state })
  }

  show = dimmer => () => {
    document.querySelector('.App').style.overflow = 'hidden'
    const btnBlueEmail = document.querySelector('.btn-blue-email')

    if (btnBlueEmail) {
      btnBlueEmail.classList.add('active')
    }

    this.setState({
      dimmer,
      open: true
    })
  }

  close = () => {
    this.setState({
      open: false
    })
    const btnBlueEmail = document.querySelector('.btn-blue-email')

    if (btnBlueEmail) {
      btnBlueEmail.classList.remove('active')
    }

    document.querySelector('.App').style.overflow = 'scroll'
  }

  componentDidMount = () => {
    const callId = this.getCallId()
    if (callId) {
      this.fetchCallData(callId)
    }
  }

  getCallId = () => {
    let url = this.props.location.search
    let params = queryString.parse(url)
    if (params.callId) return params.callId
    return 0
  }

  fetchCountryData = () => {
    const token = '7cb27f1b3b4e06'
    const url = `https://ipinfo.io?token=${token}`

    axios.get(url).then(res => {
      if (res.data) {
        let callData = {
          ...this.state.callData
        }
        let location = res.data
        callData.location = location

        this.setState(
          {
            callData: callData
          },
          () => {
            console.info(this.state.callData)
          }
        )
      }
    })
  }

  fetchCallData = callId => {
    let head = {
      headers: {
        Authorization: 'Bearer ' + apiToken
      }
    }
    const url = `${process.env.REACT_APP_BASE_APP_URL}/api/v1/leads/get-call-by-id?id=${callId}`

    axios.get(url, head).then(res => {
      if (res.data.data) {
      
        let callData = {
          ...this.state.callData
        }

        if (res.data.data.owner == null) {
          res.data.data.owner = res.data.data.member
        }

        if (res.data.data.tags == null) {
          res.data.data.tags = []
        }

       

        this.setState(
          prevState => ({
            ...prevState,
            callData: {
              ...prevState.callData,
              ...res.data.data
            }
          }),
          () => {
            this.fetchCountryData()
          }
        )

        this.setState({ apiLoaded: true })
      }
    })
  }

  titleCase = str => {
    var splitStr = str.toLowerCase().split(' ')
    for (var i = 0; i < splitStr.length; i++) {
      // You do not need to check if i is larger than splitStr length, as your for does that for you
      // Assign it back to the array
      splitStr[i] =
        splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1)
    }
    // Directly return the joined string
    return splitStr.join(' ')
  }

  sendSMS = data => {
    if (data.msg == '' || data.number == '') {
      CommonNotify('Text Message Or Number Is Missing')
      return
    }

    if (!this.state.callData.id) {
      CommonNotify('Cant Fetch Lead Id')
      return
    }

    if (this.state.callData.phone_number == '') {
      CommonNotify('Cant Fetch Sender Phone Number')
      return
    }

    this.handleLoading(true)

    const payload = {
      from: data.number,
      to: this.state.callData.phone_number,
      lead_id: this.state.callData.id,
      message: data.msg
    }

    let head = {
      headers: {
        Authorization: 'Bearer ' + apiToken
      }
    }
    const url = `${process.env.REACT_APP_BASE_APP_URL}/api/v1/leads/send-message`

    axios
      .post(url, payload, head)
      .then(res => {
        this.handleLoading(false)
        if (res.data.data.userNameAntials) {
          CommonNotify('Message Send Successfully', 'success')
        }
      })
      .catch(error => {
        this.handleLoading(false)
        CommonNotify('Cant Send Message')      
      })
  }

  render() {
    const { open, dimmer } = this.state

    const title = {
      type: 'image',
      titleOne: leadLogo,
      titleTwo: 'Call Details'
    }

    return (
      <>
        {this.state.apiLoaded && (
          <div className="fullwidth-container call-dashboard call_detail_section">
            <Title data={title} />{' '}
            <div className="content call_information_wrapper">
              <div className="profile">
                <div className="profile-upper-details">
                  <div className="profile-image">
                    <div className="profile-image-holder">
                      <Image src={defaultImage} />{' '}
                    </div>{' '}
                    <div className="profile-id">
                      <p className="profile-id-number">
                        {' '}
                        {this.state.callData.phone_number}{' '}
                      </p>{' '}
                      <div className="profile-buttons">
                        <button className="btn-green-call" type="button">
                          <Image src={returnCall} />{' '}
                          <Image src={greenReturnCall} />{' '}
                        </button>{' '}
                        <button
                          onClick={this.show('inverted')}
                          className="btn-blue-email"
                          type="button"
                        >
                          <Image src={email} /> <Image src={whiteEmail} />{' '}
                        </button>{' '}
                        <Modal
                          className="email-modal"
                          dimmer={dimmer}
                          open={open}
                          onClose={this.close}
                        >
                          <Modal.Content>
                            <Modal.Description>
                              <span> Message: </span>
                              Lorem ipsum dolor sit amet, consectetur adipiscing
                              elit, sed diam nonummy nibh euismod tincidunt ut
                              laoreet dolore magna aliquam erat volutpat.Ut wisi
                              enim ad minim, quis nostrud exerci tation
                              ullamcorper suscipit lobortis nisl ut aliquip ex
                              ea.{' '}
                              <div className="actions">
                                <CommonCheckbox text="Save a copy" />
                                <CommonButtons
                                  content="Send"
                                  background="blue"
                                />
                              </div>{' '}
                            </Modal.Description>{' '}
                          </Modal.Content>{' '}
                        </Modal>{' '}
                      </div>{' '}
                      <p className="profile-id-text">
                        ID: <span> #{this.state.callData.id} </span>{' '}
                      </p>{' '}
                      <p className="profile-country">
                        <Image
                          src={`https://www.countryflags.io/${this.state.callData.location.country}/flat/32.png`}
                        />
                        <span>
                          {' '}
                          {this.state.callData.location.city}{' '}
                          {this.state.callData.location.country}
                        </span>{' '}
                      </p>{' '}
                    </div>{' '}
                  </div>{' '}
                  <div className="profile-personal-info">
                    <p className="profile-info-text profile-info-name">
                      <span>
                        {' '}
                        {!this.state.callData.name
                          ? 'Unknown'
                          : this.state.callData.name}{' '}
                      </span>{' '}
                    </p>{' '}
                    <p className="profile-info-text profile-info-email">
                      <a href={`mailto: ${this.state.callData.email}`}>
                        {' '}
                        {!this.state.callData.email
                          ? 'Unknown'
                          : this.state.callData.email}{' '}
                      </a>{' '}
                    </p>{' '}
                  </div>{' '}
                  <div className="profile-company-info">
                    <p
                      style={{ marginBottom: '20px' }}
                      className="profile-company-text profile-company-phone"
                    >
                      <span>
                        {this.state.callData.owner.company_phone && (
                          <a href={this.state.callData.owner.company_phone}>
                            {' '}
                            {this.state.callData.owner.company_phone}{' '}
                          </a>
                        )}
                      </span>{' '}
                    </p>{' '}
                    <p
                      style={{ marginBottom: '10px' }}
                      className="profile-company-text profile-company-ip"
                    >
                      <span> {this.state.callData.ip_address} </span>{' '}
                    </p>{' '}
                    <p
                      style={{ marginBottom: '20px' }}
                      className="profile-company-text profile-company-domain"
                    >
                      <span>
                        {!this.state.callData.owner.company_domain && (
                          <a href="#"> N.A </a>
                        )}{' '}
                        {this.state.callData.owner.company_domain && (
                          <a href="{this.state.callData.owner.company_domain}">
                            {' '}
                            {this.state.callData.owner.company_domain}{' '}
                          </a>
                        )}{' '}
                      </span>
                    </p>{' '}
                    <p
                      style={{ marginBottom: '10px' }}
                      className="profile-company-text profile-company-email"
                    >
                      <a href="mailto:  {this.state.callData.email}">
                        {' '}
                        {this.state.callData.email}{' '}
                      </a>{' '}
                    </p>{' '}
                  </div>{' '}
                  <div className="profile-social-media">
                    {' '}
                    {/* <a href="http://www.facebook.com" target="__blank">
                          <i className="fab fa-facebook-square"> </i>{' '}
                        </a>{' '} */}{' '}
                    {/* <a href="http://www.twitter.com" target="__blank">
                          <i className="fab fa-twitter-square"> </i>{' '}
                        </a>{' '} */}{' '}
                    {/* <a href="http://www.linkedin.com" target="__blank">
                          <i className="fab fa-linkedin"> </i>{' '}
                        </a>{' '} */}{' '}
                  </div>{' '}
                </div>{' '}
              </div>{' '}
              <div className="record">
                {this.state.callData.recording_url && (
                  <div className="record-heading">
                    <p className="record-title"> Last Recorded Call </p>
                    {/* <p className="record-subtitle"> All calls </p>{' '} */}
                    <div className="record-image-holder">
                      <Image src={voiceRecord} />{' '}
                    </div>{' '}
                    <div className="record-control">
                      {/* <button>
                      <Image src={prev} /> <Image src={prevHover} />{' '}
                    </button>{' '} */}
                      <div className="record-play-pause">
                        <button>
                          <Image src={play} /> <Image src={playHover} />{' '}
                        </button>{' '}
                        <button>
                          <Image src={pause} /> <Image src={pauseHover} />{' '}
                        </button>{' '}
                      </div>{' '}
                      {/* <button>
                      <Image src={next} /> <Image src={nextHover} />{' '}
                    </button>{' '} */}
                    </div>{' '}
                  </div>
                )}
                <div className="record-details">
                  <p className="record-details-text record-details-duration">
                    <span> {this.state.callData.duration} Seconds </span>{' '}
                  </p>{' '}
                  <p className="record-details-text record-details-keywords">
                    <span> Integration / Calls used </span>{' '}
                  </p>{' '}
                  <p className="record-details-text record-details-callstatus">
                    <span>
                      {' '}
                      {this.titleCase(this.state.callData.final_status)}{' '}
                    </span>{' '}
                  </p>{' '}
                  <p className="record-details-text record-details-callstatus">
                    <span> {this.state.callData.score} </span>{' '}
                  </p>{' '}
                  <p className="record-details-text record-details-timecall">
                    <span> </span>{' '}
                  </p>{' '}
                  <p className="record-details-text record-details-agent">
                    <span>
                      {' '}
                      {this.state.callData.member.first_name}{' '}
                      {this.state.callData.member.last_name}{' '}
                    </span>{' '}
                  </p>{' '}
                  <p className="record-details-text record-details-source">
                    <span>
                      {' '}
                      {this.state.callData.source == ''
                        ? 'Unknown'
                        : this.state.callData.source.substring(0, 50)}{' '}
                    </span>{' '}
                  </p>{' '}
                  {/* <p className="record-details-text record-details-source">
                    <span> Widget / API </span>{' '}
                  </p>{' '} */}
                  <p className="record-details-text record-details-tracking">
                    <span> Google Paid </span>{' '}
                  </p>{' '}
                  <p className="record-details-text record-details-traffic">
                    <span> Website </span>{' '}
                  </p>{' '}
                  <p className="record-details-text record-score lead">
                    <Stars value={this.state.callData.agent_feedback_rate} />
                  </p>{' '}
                  <p className="record-details-text record-tags">
                    <span>
                      {' '}
                      {this.state.callData.tags.map(item => (
                        <span> {item} </span>
                      ))}{' '}
                      {!this.state.callData.tags && <span> Not Avilable </span>}{' '}
                    </span>{' '}
                  </p>{' '}
                  <p className="record-details-text record-score call">
                    <Stars value={this.state.callData.customer_feedback_rate} />
                  </p>{' '}
                </div>{' '}
              </div>{' '}
              <LeadInfo />
              <RecentPageViews />
              <CallLogs />
              {/* <NotesFeedback existingNote="fasfsdaf" /> */}{' '}
              <QuickTexts
                callData={this.state.callData}
                messages={this.state.messages}
                callback={this.sendSMS}
                loading={this.handleLoading}
                widget={this.state.callData.widget_id}
              />{' '}
            </div>{' '}
          </div>
        )}
      </>
    )
  }
}

export default CallDashboard1
