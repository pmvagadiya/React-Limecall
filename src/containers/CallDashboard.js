import React, { Component } from 'react'
import axios from 'axios'
import queryString from 'query-string'
import { MentionsInput, Mention } from 'react-mentions'
import RecentVisits from './RecentVisits'
import { swapTags, getUsersFromTags } from './tags'

import {
  Dimmer,
  Dropdown,
  Loader,
  Popup,
  Menu,
  Label,
  Button
} from 'semantic-ui-react'
import moment from 'moment-timezone'
import UtmData from './UtmData'
import Callset from '../assets/images/call_set.png'
import DummyProfileImage from '../assets/images/dummy_profile.webp'
import smallcall from '../assets/images/small_call.png'
import smallemail from '../assets/images/small_email.png'
import location from '../assets/images/location.png'
import ukflag from '../assets/images/uk_flag.png'
import Clockset from '../assets/images/clock_set.png'
import clockicon from '../assets/images/clcok_icons.png'
import callicons from '../assets/images/call_icons.png'
import emailicon from '../assets/images/mail_icons.png'
import CallLogs from './CallLogs'
import LeadInfo from './LeadInfo'
import Calldata from './Calldata'
import VisitData from './VisitData'
import { CommonNotify } from '../common/CommonNotify'

import LeadPageModal from '../common/LeadPageModal'
import {
  onCallRequest,
  onStatusChangeHandler,
  _getLeadActivities,
  _getLeadNotes,
  _onTagsSaveHandler
} from '../config/leadAPI'
import SendMessageModal from '../common/SendMessageModal'
import CommonButtons from '../common/CommonButtons'
import LeadActivities from '../common/LeadActivities'

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
  id: '',
  date: ''
}

const statusOption = [
  { key: 'Awaiting Review', text: 'Awaiting Review', value: '1' },
  { key: 'Reviewed', text: 'Reviewed', value: '2' },
  { key: 'Disqualified', text: 'Disqualified', value: '3' },
  { key: 'Qualified', text: 'Qualified', value: '4' }
]
class CallDashboard extends Component {
  state = {
    defaultStage: null,
    showAddNotes : true,
    recentPageHistory : [],
    showActivity: true,
    show: false,
    dataTag: null,
    open: false,
    commentBoxOpen: true,
    callData: callDataDefault,
    messages: [],
    apiLoaded: false,
    isLoading: true,
    isBoxVisible: true,
    leadScore: [],
    tagsData: [],
    tagsDataDefault: [],
    updateTagsData: [],
    leadScoreDefault: '',
    defaultCollaborator: '',
    defaultOwner: '',
    collaboratesData: [],
    defaultLeadMembers: [],
    collaborationAdminData: null,
    assignOption: [],
    lead_Id: null,
    dropDownData: [],
    tagTeamData: [],
    open: false,
    interseted: null,
    client_name: '',
    getNotes: [],
    inEditMode: false,
    btnLoading: false,
    mentionUser: [],
    ownerName: '',
    leadActivities: [],
    //
    name: 'React',
    value: '',
    mentionData: null
  }

  Collaborators = {
    lable: 'Give team member access',
    header: 'Add Collaborators',
    btnTitle: 'Update'
  }
  Tags = {
    lable: 'New tag',
    header: 'Tag Lead',
    btnTitle: 'Update'
  }

  handleChange = (event, newValue, newPlainTextValue, mentions) => {
    

    // var reg = ''
    // mentions.map(data => {
    //   reg += '|' + data.display
    // })

    // const re = new RegExp(reg.substring(1), 'g')
    // newPlainTextValue = newPlainTextValue.replace(re, function(matched) {
    //   return mentions.find(obj => obj.display == matched).id
    // })

    
    this.setState({
      value: newValue,
      mentionData: { newValue, newPlainTextValue, mentions }
    })
  }

  componentDidMount = () => {
    const callId = this.getCallId()
    this.setState({
      ...this.state,
      lead_Id: callId
    })
    this.getWidget()
    this.getCollaborates()

    if (callId) {
      this.fetchCallData(callId)
      this.getLeadNotes(callId)
      this.getLeadActivities(callId)
    }
  }

  getLeadActivities = callId => {
    _getLeadActivities(callId)
      .then(res => {
        this.setState({
          ...this.state,
          leadActivities: res
        })
      })
      .catch(err => {
        
      })
  }

  onEditHandle(event) {
    this.setState({
      inEditMode: true
    })
  }

  onChangeClientName = e =>
    this.setState({
      ...this.state,
      client_name: e.target.value
    })
  openPopupHandler = () => {
    this.setState({ ...this.state, commentBoxOpen: !this.state.commentBoxOpen, showAddNotes : !this.state.showAddNotes })
  }

  activityHandler = () => {
    this.setState({ ...this.state, showActivity: !this.state.showActivity })
  }

  closePopupHandler = () => {
    this.setState({ commentBoxOpen: false })
  }

  createNotes = () => {
    const { mentionData } = this.state
   
if(mentionData === null){
CommonNotify('Please enter text first.')
}else{
  const { newPlainTextValue, mentions } = mentionData
    var str = ''
    if (mentions.length) {
      var reg = ''
      mentions.map(data => {
        reg += '|' + data.display
      })

      const re = new RegExp(reg.substring(1), 'g')
      str = newPlainTextValue.replace(re, function(matched) {
        const id = mentions.find(obj => obj.display == matched).id
        return '<:' + id + '>'
      })
    } else {
      str = newPlainTextValue
    }

    this.setState({
      ...this.state,
      btnLoading: true
    })
    const { lead_Id } = this.state
    let head = {
      headers: {
        Authorization: 'Bearer ' + apiToken
      }
    }

    const url = `${process.env.REACT_APP_BASE_APP_URL}/api/v1/leads/${lead_Id}/add-note`

    const postData = {
      content: str
    }
    axios
      .post(url, postData, head)
      .then(res => {
        this.setState({
          ...this.state,
          value: '',
          mentionData: null
        })
        this.getLeadNotes(lead_Id)
      })
      .catch(error => {
        
      })

    }
  }

  getLeadNotes = callId => {
    _getLeadNotes(callId)
      .then(res => {
        this.setState({
          ...this.state,
          btnLoading: false,
          getNotes: Object.entries(res)
        })
      })
      .catch(err => {
        
      })
  }

  getCollaborates = () => {
    let head = {
      headers: {
        Authorization: 'Bearer ' + apiToken
      }
    }
    const url = `${process.env.REACT_APP_BASE_APP_URL}/api/v1/team/members`
    const user = []
    axios
      .get(url, head)
      .then(res => {
        var defaultIds = [];

        const moderateArray = res.data.data.members.map(item => {
          user.push({
            _id: item.id,
            name: { first: item.first_name, last: item.last_name }
          })
          defaultIds.push(item.id)
          return {
            key: item.id,
            text: `${item.first_name} ${item.last_name}`,
            value: item.id,
            image: {
              avatar: true,
              src: require('../assets/images/new-collab.png')
            }
          }
        })

        const finalCollabList = [...moderateArray]
        this.setState({
          // defaultLeadMembers : defaultIds,
          collaboratesData: finalCollabList,
          collaborationAdminData: res.data.data.admin.id,
          mentionUser: user
        })
      })
      .catch(err => {})
  }

  getWidget = () => {
    let head = {
      headers: {
        Authorization: 'Bearer ' + apiToken
      }
    }
    const url = `${process.env.REACT_APP_BASE_APP_URL}/api/v1/widget/widgets`

    axios
      .get(url, head)
      .then(res => {
        const updateTagsData = res.data.data[0].tags.map((item, index) => {
          return {
            key: item,
            text: item,
            value: item,
            image: { avatar: true, src: require('../assets/images/tag.png') }
          }
        })
        const updateLeadScore = res.data.data[0].scores.map((item, index) => {
          return {
            key: index,
            text: item,
            value: item,
            image: {
              avatar: true,
              src: require('../assets/images/Lead_Score.png')
            }
          }
        })
        this.setState({
          tagsData: [...updateTagsData],
          leadScore: [...updateLeadScore]
        })
      })
      .catch(err => {
        
      })
  }

  getCallId = () => {
    let url = this.props.location.search
    let params = queryString.parse(url)
    if (params.callId) return params.callId
    return 0
  }

  fetchCountryData = () => {
    const token = '7cb27f1b3b4e06'
    const ip = this.state.callData.ip_address

    if(ip) {
    const url = `https://ipinfo.io/${ip}?token=${token}`

    axios.get(url).then(res => {
      if (res.data) {
        let callData = {
          ...this.state.callData
        }
        let location = res.data
        callData.location = location
        const time = moment()
          .tz(callData.location.timezone)
          .format('yyyy-MM-DD hh:mm')

        this.setState({
          callData: callData,
          date: time
        })
      }
    })
  }
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

  fetchCallData = async callId => {
    let head = {
      headers: {
        Authorization: 'Bearer ' + apiToken
      }
    }
    const url = `${process.env.REACT_APP_BASE_APP_URL}/api/v1/leads/get-call-by-id?id=${callId}`

    await axios.get(url, head).then(res => {
      if (res.data.data) {
        if (res.data.data.tags == null) {
          res.data.data.tags = []
        }

        let selectedCollab = []

         var PageHistory = []

        if (res.data.data.mentions.length) {
          res.data.data.mentions.map(function(item, index){
            selectedCollab.push(item.id)
            })
        }

        if(res.data.data.trackingData && res.data.data.trackingData.length !== 0 )
        {
          PageHistory = res.data.data.trackingData.browsing_history  ? res.data.data.trackingData.browsing_history : [] ;
        }else {
          PageHistory = []
        }

        

        let assignOption = [
          {
            key: 0,
            text: 'Unassigned Owner',
            value: '',
            image: { src: require('../assets/images/owner-assign.png') }
          }
        ]
        if (res.data.data.owner && res.data.data.owner_id) {
          assignOption = [
            ...assignOption,
            {
              key: res.data.data.owner_id,
              text: res.data.data.owner.first_name,
              value: res.data.data.owner_id,
              image: { src: require('../assets/images/owner-assign.png') }
            }
          ]
        }
      
        const ownerName =
          res.data.data.member?.first_name +
          ' ' +
          res.data.data.member?.last_name
        this.setState(
          prevState => ({
            ...prevState,
            isLoading: false,
            recentPageHistory : PageHistory,
            defaultStage : res.data.data.status ? (res.data.data.status).toString() : '',
            ownerName: ownerName,
            interseted: res.data.data.interseted,
            callData: {
              ...prevState.callData,
              ...res.data.data
            },
            addNoteToggleDataRes: res.data.data.call_notes
              ? res.data.data.call_notes
              : [],
            tagsDataDefault: res.data.data.tags,
            leadScoreDefault: res.data.data.score
              ? res.data.data.score
              : 'Lead Score',
            defaultCollaborator: selectedCollab,
            defaultOwner: res.data.data.owner
              ? res.data.data.owner.id
              : 'Unassigned Owner',
            assignOption
          }),
          () => {
            this.fetchCountryData()
          }
        )

        this.setState({ apiLoaded: true })
      }
    })
  }

  getCurrentTime = () => {
    var today = new Date()

    var time = today.getHours() + ':' + today.getMinutes()
    return time
  }

  onClickOpenModal = text =>
    this.setState({ ...this.state, show: true, dataTag: text })
  handleClose = () => this.setState({ ...this.state, show: false })

  // USED FOR TAG LEAD
  onTagsSaveHandler = (e, data) => {
    const { lead_Id, collaborationAdminData } = this.state

    const postData = {
      lead_id: lead_Id,
      customer_id: collaborationAdminData,
      tags: data.value
    }
    _onTagsSaveHandler(postData)
      .then(res => {
        // CommonNotify('Updated Successfully', 'success')
        const callId = this.state.lead_Id
        if(callId)
        {
        this.getLeadActivities(callId)
        }
      })
      .catch(err => {
        CommonNotify('Not able to Update Tags')
      })
  }

  // USED FOR CHANGE THE LEAD SCORE
  onScoreSaveHandler = (e, data) => {
    const { lead_Id } = this.state
    const apiToken = localStorage.getItem('access_token')
    let head = {
      headers: {
        Authorization: 'Bearer ' + apiToken
      }
    }
    const url = `${process.env.REACT_APP_BASE_APP_URL}/api/v1/leads/is-good`
    const postData = {
      lead_id: lead_Id,
      score: data.value
    }
    axios
      .post(url, postData, head)
      .then(res => {
        // CommonNotify('Score Save Successfully', 'success')
        const callId = this.state.lead_Id
        if(callId)
        {
        this.getLeadActivities(callId)
        }
      })
      .catch(err => {
        CommonNotify('Not able to update Score')
      })
  }

  onCollaboratorsHandler = (e, data) => {
    const { lead_Id, collaborationAdminData } = this.state
    const apiToken = localStorage.getItem('access_token')
    let head = {
      headers: {
        Authorization: 'Bearer ' + apiToken
      }
    }
    const url = `${process.env.REACT_APP_BASE_APP_URL}/api/v1/leads/mention-member`
    const postData = {
      content: lead_Id,
      to: data.value,
      from: collaborationAdminData
    }
    axios
      .post(url, postData, head)
      .then(res => {
        // CommonNotify('Scored successfully', 'success')
        const callId = this.state.lead_Id
        if(callId)
        {
        this.getLeadActivities(callId)
        }
      })
      .catch(err => {
        CommonNotify('Not able to Scored')
      })
  }

  isModalClose = () => {
    this.setState({
      ...this.state,
      open: false
    })
  }

  isModalOpen = () => {
    this.setState({
      ...this.state,
      open: true
    })
  }

  onChangeAssign = (e, data) => {
    const { lead_Id } = this.state
    const apiToken = localStorage.getItem('access_token')
    let head = {
      headers: {
        Authorization: 'Bearer ' + apiToken
      }
    }
    const url = `${process.env.REACT_APP_BASE_APP_URL}/api/v1/leads/set-owner`
    const postData = {
      lead_id: lead_Id,
      user_id: data.value
    }

    axios
      .post(url, postData, head)
      .then(res => {
        // CommonNotify('Assigned Successfully', 'success')
        const callId = this.state.lead_Id
        if(callId)
        {
        this.getLeadActivities(callId)
        }
      })
      .catch(err => {
        CommonNotify('Not able to Assigned')   
      })
  }

  handleItemClick = (e, { name }, interseted) => {
    const { lead_Id } = this.state
    this.setState({ ...this.state, interseted: interseted })

    const apiToken = localStorage.getItem('access_token')

    let head = {
      headers: {
        Authorization: 'Bearer ' + apiToken
      }
    }
    const url = `${process.env.REACT_APP_BASE_APP_URL}/api/v1/leads/change-interested`
    const postData = {
      lead_id: lead_Id,
      interested: interseted
    }

    axios
      .post(url, postData, head)
      .then(res => {
        CommonNotify('Done successfully', 'success')
      })
      .catch(err => {      
        CommonNotify('Not able to update  Good Fit')
      })
  }
  onDeleteLeadNotes = (id, index) => {
    const apiToken = localStorage.getItem('access_token')
    const { lead_Id } = this.state

    let head = {
      headers: {
        Authorization: 'Bearer ' + apiToken
      }
    }
    const url = `${process.env.REACT_APP_BASE_APP_URL}/api/v1/leads/delete-notes`

    const postData = {
      id: index,
      lead_id: lead_Id
    }

    axios
      .post(url, postData, head)
      .then(res => {
        this.getLeadNotes(lead_Id)
        CommonNotify('Lead note deleted', 'success')
      })
      .catch(err => {       
        CommonNotify('Not able to update  Good Fit')
      })
  }
  renderEditForm() {
    if (this.state.edit) {
      return (
        <form onSubmit={this.onUpdateHandle.bind(this)}>
          <input
            type="text"
            name="updatedItem"
            className="item"
            defaultValue={this.state.title}
          />
          <button className="update-add-item">Update</button>
        </form>
      )
    }
  }

  render() {
    const userMentionData = this.state.mentionUser.map(myUser => ({
      id: myUser._id,
      display: `${myUser.name.first} ${myUser.name.last}`
    }))

    const { interseted, lead_Id } = this.state
    const data = this.state.callData
    return (
      <>
        {this.state.isLoading ? (
          <Dimmer active={this.state.isLoading} style={{ position: 'fixed' }}>
            <Loader />
          </Dimmer>
        ) : (
          <div className="lead_page">
            <div className="row main_wrapper">
              <div className="col-xl-4 col-lg-5">
                <div className="live_call">
                  <p className="live_call_icon" style={{backgroundColor: '#0071eb'}}>
                    {' '}
                    <img src={Callset} />
                    <span>{data.type ? data.type.replace('_', ' ') : ''}</span>
                  </p>
                  <p className="live_call_date">
                    {data.createdAtTime} Hrs, {data.createdAtDate}
                  </p>
                </div>
                <div className="dispaly_profile">
                  <div className="profile_boxes">
                    <div className="profile_left">
                      <div className="profile_images">
                        <img src={DummyProfileImage} />
                      </div>

                      <div className="profile_detail">
                        <p>{data.customer_name ? data.customer_name : 'N/A'}</p>
                      </div>
                    </div>
                  </div>
                  <div className="dispaly_profile_detail">
                    <div className="profile_content">
                      <div className="call_icon">
                        <img src={smallcall} />
                      </div>
                      <p>{data.phone_number ? data.phone_number : 'Unknown'}</p>
                    </div>

                   {data.email === null ? null : (
                    <div className="profile_content">
                      <div className="call_icon">
                        <img src={smallemail} />
                      </div>
                      <p>{data?.member?.email}</p>
                    </div>
                   ) }


                    {data.location.city && data.location.country ? (
                      <div className="profile_content">
                        <div className="location_text">
                          <div className="location_set">
                            <div className="call_icon">
                              <img src={location} />
                            </div>
                            <p>
                              {data?.location?.city},{data?.location?.country}
                            </p>
                          </div>
                          <div className="time_set">
                            <p>
                              <img src={Clockset} />
                              {this.state.date}
                            </p>
                          </div>
                        </div>
                      </div>
                    ) : null}

                    <div className="display_button">
                      <div className="row">
                        <a
                         style={{backgroundColor: '#0071eb'}}
                          className="call_set col"
                          onClick={e => onCallRequest(this.state.lead_Id)}
                        >
                          <img src={callicons} />
                        </a>
                        <a className="col"></a>
                        <a
                          style={{backgroundColor: 'mail_set col'}}
                          className="mail_set col"
                          onClick={e =>
                            this.setState({
                              ...this.state,
                              open: true
                            })
                          }
                        >
                          <img src={emailicon} />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                <SendMessageModal
                  isModalClose={this.isModalClose}
                  isModalOpen={this.isModalOpen}
                  open={this.state.open}
                  dropDownData={this.state.dropDownData}
                  leadData={data}
                />
                <div className="Calldata">
                  <Calldata data={this.state} />
                </div>
                <div className="leadInfo">
                  <LeadInfo data={this.state} />
                </div>
                <div className="visitData">
                  <VisitData data={this.state} />
                </div>
                <div className="CallLogs">
                  <UtmData data={this.state} />
                </div>
                <div className="CallLogs">
                  <CallLogs data={this.state} />
                </div>
                <div className="CallLogs">
                  <RecentVisits history={this.state.recentPageHistory} data={this.state} />
                </div>


                <LeadPageModal
                  show={this.state.show}
                  handleClose={this.handleClose}
                  data={
                    this.state.dataTag === 'tags'
                      ? this.Tags
                      : this.Collaborators
                  }
                />
              </div>
              <div className="col-xl-8 col-lg-7">
                <div className="good-fit-menu">
                  <Label style={{fontWeight: 300, color : 'black'}}>Good Fit?</Label>
                  <Menu>
                    <Popup
                      content="Yes"
                      trigger={
                        <Menu.Item
                          name="1"
                          active={interseted == '1'}
                          onClick={(e, name) =>
                            this.handleItemClick(e, { name }, 1)
                          }
                        >
                          <i className="fa fa-check"></i>
                        </Menu.Item>
                      }
                    />

                    <Popup
                      content="Not Reviewed"
                      trigger={
                        <Menu.Item
                          name="2"
                          active={interseted == '2'}
                          onClick={(e, name) =>
                            this.handleItemClick(e, { name }, 2)
                          }
                        >
                          <i className="fa fa-question"></i>
                        </Menu.Item>
                      }
                    />
                    <Popup
                      content="No"
                      trigger={
                        <Menu.Item
                          name="3"
                          active={interseted == '3'}
                          onClick={(e, name) =>
                            this.handleItemClick(e, { name }, 3)
                          }
                        >
                          <i className="fa fa-times"></i>
                        </Menu.Item>
                      }
                    />
                  </Menu>
                  {/* <div className="status-wrapper">
                    <Label>Status</Label>
                    <Dropdown
                      placeholder="Status"
                      selection
                      defaultValue={this.state.defaultStage}
                      options={statusOption}
                      onChange={(e, data) =>
                        onStatusChangeHandler(e, data, lead_Id)
                      }
                    />
                  </div> */}
                </div>
                <div className="lead_deatil_side">
                  <div className="title_wrapper">
                  {/* <div className="tags_set">
                      <div
                        className="add-comment-btn"
                        onClick={this.activityHandler}
                      >
                        Activity
                      </div>
                    </div> */}
                    {/* <div className="tags_set">
                      <div
                        className="add-comment-btn"
                        onClick={this.openPopupHandler}
                      >
                        Notes
                      </div>
                    </div> */}
                    <Popup
                      content="Add Tags"
                      mouseEnterDelay={500}
                      trigger={
                        <div className="tags_set">
                          <Dropdown
                            style={{fontSize: 12, fontWeight: 200}}
                            placeholder="Add Tags"
                            className="dropdown-wrapper Colaboration-dropdown"
                            multiple
                            defaultValue={this.state.tagsDataDefault}
                            options={this.state.tagsData}
                            onChange={this.onTagsSaveHandler}
                          />
                        </div>
                      }
                    />

                    <Popup
                      content="Collaboration"
                      mouseEnterDelay={500}
                      trigger={
                        <div className="tags_set">
                          <Dropdown
                            className="dropdown-wrapper Colaboration-dropdown"
                            multiple
                            placeholder="Collaboration"
                            defaultValue={this.state.defaultCollaborator}
                            options={this.state.collaboratesData}
                            onChange={this.onCollaboratorsHandler}
                          />
                        </div>
                      }
                    />
                    <Popup
                      content="Lead Score"
                      mouseEnterDelay={500}
                      trigger={
                        <div className="tags_set">
                          <Dropdown
                            className="dropdown-wrapper "
                            placeholder="Lead Score"
                            search
                            defaultValue={this.state.leadScoreDefault}
                            options={this.state.leadScore}
                            onChange={this.onScoreSaveHandler}
                          />
                        </div>
                      }
                    />
                    <Popup
                      content="Assign"
                      mouseEnterDelay={500}
                      trigger={
                        <div className="tags_set">
                          <Dropdown
                            className="dropdown-wrapper"
                            options={this.state.assignOption}
                            placeholder="Lead Owner"
                            defaultValue={this.state.defaultOwner}
                            onChange={this.onChangeAssign}
                          />
                        </div>
                      }
                    />

                      <Popup
                      content="Assign"
                      mouseEnterDelay={500}
                      trigger={
                        <div className="tags_set">
                    <Dropdown
                          className="dropdown-wrapper"
                      placeholder="Status"
                      defaultValue={this.state.defaultStage}
                      options={statusOption}
                      onChange={(e, data) =>
                        onStatusChangeHandler(e, data, lead_Id)
                      }
                    />
                                            </div>
                      }
                    />


                  </div>
                </div>{' '}
                <div
                  className={` ${
                    this.state.commentBoxOpen
                      ? 'streamline active'
                      : 'streamline'
                  } `}
                  style={{marginBottom: 20}}
                >
                  <div
                    className="sl-item"
                    style={{ borderColor: 'rgb(87, 138, 103)' }}
                  >

                   {this.state.showAddNotes ?
                   (
                     <div>
                                   <div className="sl-icon">
                                   {/* <i class="fa fa-comment font-14"></i> */}
                                 </div>
                    <div className="sl-content box px-3 py-2" style={{backgroundColor: 'white', marginTop: 20, marginBottom: 20}}>
                      <MentionsInput
                        value={this.state.value}
                        onChange={this.handleChange}
                        placeholder="Write a note..."
                        className="mentions"
                      >
                        <Mention
                          type="user"
                          trigger="@"
                          data={userMentionData}
                          className="mentions__mention"
                        />
                      </MentionsInput>
                      {/* <textarea
                        name="note"
                        onChange={e => this.onChangeClientName(e)}
                      ></textarea> */}
                      <div className="sl-foote row">
                        <div className="sl-footer-left col-6 d-flex align-items-center">
                          {/* <i class="far fa-times-circle set-color"></i> */}
                        </div>
                        <div className="sl-footer-right col-6 d-flex justify-content-end align-items-center">
                          <CommonButtons
                            style={{borderRadius : 0}}
                            content="Post"
                            loading={this.state.btnLoading}
                            onClick={this.createNotes}
                          />
                        </div>
                      </div>
                    </div>
                    </div>
                   ) : null }



                  </div>
                  {this.state.getNotes.length > 0 && this.state.showAddNotes ? (
                    <>
                      {this.state.getNotes &&
                        this.state.getNotes?.map((data, index) => {
                          return (
                            <div
                              className="sl-item"
                              style={{ borderColor: 'rgb(87, 138, 103)' }}
                              key={index}
                            >
                              <div className="sl-icon">
                                {/* <i class="fa fa-comment font-14" ></i> */}
                              </div>
                              <div className="sl-content box px-3 py-2" style={{backgroundColor: 'white', marginTop: 6}}>
                                <div className="notes-wrapper">
                                <p style={{fontSize: 15, color: 'grey'}}><span><i class="fas fa-chevron-right" style={{color: 'green'}}></i></span> <span style={{fontWeight: 600, color: 'black'}}>Note </span> <span>by</span> {data[1].userName}</p>
                                  
                                  <div><p style={{fontSize: 14, color: 'gray'}}>
                                    {/* {moment.utc(data[1].date).local().format('LLL')} */}
                                    {moment.utc(data[1].date).local().startOf('seconds').fromNow()}
                                  </p></div>
                                </div>

                                <p
                                  style={{ fontWeight: 400, fontSize: 14, marginTop: -10 }}
                                  > 
                                  &nbsp; <span>
                                  { data[1].note }
                                  </span>
                                </p>
                                {/* <div className="content-button">
                                  <button>
                                    <i class="fas fa-pencil-alt"></i>
                                  </button>
                                  <button
                                    onClick={() =>
                                      this.onDeleteLeadNotes(data[0], data[0])
                                    }
                                  >
                                    <i class="fas fa-trash-alt"></i>
                                  </button>
                                </div> */}
                              </div>
                            </div>
                          )
                        })}
                    </>
                  ) : (
                    ''
                  )}
                </div>
                {this.state.showActivity ?
                <LeadActivities datas={this.state.leadActivities} />
                : null }
              </div>
            </div>
          </div>
        )}
      </>
    )
  }
}
export default CallDashboard
