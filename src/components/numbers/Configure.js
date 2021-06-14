import React, { Component } from 'react'
import { Button, Dropdown } from 'semantic-ui-react'
import ReactPhoneInput from 'react-phone-input-2'
import queryString, { parse } from 'query-string'
import Axios from 'axios'

import CommonInput from '../../common/CommonInput'
import CommonSelect from '../../common/CommonSelect'
import NodeToggle from '../../common/NodeToggle2'

import { CommonNotify } from '../../common/CommonNotify'
import { da, th } from 'date-fns/locale'
import { assign } from 'lodash-es'

const AssignTo = [
  {
    key: 'Platform',
    text: 'Platform',
    value: 'Platform'
  },
  {
    key: 'Team',
    text: 'Team',
    value: 'Team'
  },
  {
    key: 'User',
    text: 'User',
    value: 'User'
  }
]

class Configure extends Component {
  constructor(props) {
    super(props)
    this.audio = React.createRef()
  this.state = {
    defaultAssignTo : '',
    phoneNumber : null,
    defaultAssigned : null,
    showAssignValues : false,
    assignedData : null,
    showEditButton : false,
    nameFromAPI : '',
    callToggle: null,
    numberName: '',
    greeting: false,
    recording: true,
    call_start_greeting: null,
    whisper: false,
    callerId: false,
    numberId: null,
    selectedMembers: null,
    configuration: null,
    selectedFileName: null,
    file: null,
    assignToData: {
      placeholderValue : 'Select Platform',
      label: 'Platform',
      platform: {
        label: 'Platform',
        options: []
      },
      team: {
        label: 'Team',
        options: []
      },
      user: {
        label: 'User',
        options: []
      }
    }
  }
  }

  getNumberAPI = async (parsed) => {   
    const apiToken = await localStorage.getItem('access_token')
    let head = {
      headers: {
        Authorization: 'Bearer ' + apiToken
      }
    }
    const url = `${process.env.REACT_APP_BASE_APP_URL}/api/v1/numbers/${parsed.id}`

    await Axios.get(url, head)
      .then( async res => {
        if (res.data) {
          this.props.loading(false)
          const data = await res.data.data;         
          this.setSettings(data);
        }
      })
      .catch(err => {        
        this.props.loading(false)
      })
  }

   getScript = async () => {
    const URL = `${process.env.REACT_APP_BASE_APP_URL}/api/v1/widget/widgets`
    const apiToken = await localStorage.getItem('access_token')
    const { assignToData } = this.state

    let head = {
      headers: {
        Authorization: 'Bearer ' + apiToken
      }
    }
  
    await Axios.get(URL, head)
      .then(res => {       
        if (res.data.data) {
          this.props.loading(false)
          const data = []
          res.data.data.map(platform => {
            data.push({
              key: platform.name,
              text: platform.name,
              value: platform.id
            })
          })
          assignToData.platform.options = data          
          this.setState({
            ...this.state,
            assignToData
          })
        }
      })
      .catch(err => {
        console.error(err)
      })
  }

  setSettings = async (data) => {
    const assigned = data.assigned;
    const assignToData = {...this.state.assignToData};

    const l = await (assigned === null ? null : ((assigned.type).charAt(0).toUpperCase() + assigned.type.slice(1)))

    assignToData.label = l;   
    var selectedData;
    var nameArr;
    if(assigned !== null)
    {
     selectedData = assigned.id;
    }else{
      selectedData = null
    }
    
    
    const callToggle =  [
      {
        callTitle: 'Call recording',
        callDesc: '',
        callId: 'toggleCallShowBtn',
        callref: 0,
        status: data.configuration === null ? false : ( data.configuration.record_calls === 0 ? false : true)
      },
      {
        callTitle: 'Play a greeting to callers',
        callDesc: '',
        callId: 'toggleCallerShowBtn',
        callref: 1,
        status: data.configuration === null ? false :  (data.configuration.use_start_greeting === 0 ? false : true)
      }]
  await this.setState({
    ...this.state,
    defaultAssigned : selectedData,
    assignToData : assignToData,
    defaultAssignTo :  l === 'Widget' ? 'Platform' : l, 
    showAssignValues: assigned === null ? false : true,
    assignedData : assigned,
    callToggle : callToggle,
    numberName : data.friendly_name,
    nameFromAPI : data.friendly_name,
    phoneNumber : data.phone_number,
    recording : false
  },async () => {
    await this.getTeams()
    await this.getUsers()
    await this.getScript()
    })
  }

  componentDidMount = async () => {
    this.props.loading(true)
    // this.getIncomingNumbers()
    const parsed = queryString.parse(window.location.search);  
    await this.getQueryString()
  }

  renameNumber = () => {
    const {numberId, numberName} = this.state; 
    console.log('Number Name ::::',numberName);
    if(numberName === '' || numberName === null)
    {
      CommonNotify("Please enter name first.")
    }else{
    console.log('In Rename Function',numberName);
    this.props.loading(true)
    const idd = parseInt(numberId.id);
    const apiToken = localStorage.getItem('access_token')

    let head = {
      headers: {
        Authorization: 'Bearer ' + apiToken
      }
    }
    const url = `${process.env.REACT_APP_BASE_APP_URL}/api/v1/number/${idd}/name`

    const data = {
      name: numberName,
    }
    Axios.post(url, data, head)
      .then(res => {        
        this.props.loading(false)
        this.setState({nameFromAPI : numberName, showEditButton: false})
        CommonNotify(
          'Rename Successfully',
          'success'
        )
      })
      .catch(err => {
        this.props.loading(false)       
      })
    }
  }

  getUsers = () => {
    this.props.loading(true)
    const apiToken = localStorage.getItem('access_token')
    const { assignToData } = this.state

    let head = {
      headers: {
        Authorization: 'Bearer ' + apiToken
      }
    }
    const url = `${process.env.REACT_APP_BASE_APP_URL}/api/v1/team/members`

    Axios.get(url, head)
      .then(res => {
        const { admin, members } = res.data.data     
        const data = []
        this.props.loading(false)
        if (admin) {
            data.push({
              key: admin.first_name,
              value: admin.id,
              text: admin.first_name + ' ' + admin.last_name
            })
        }
        members.map(member => {
          member.get_teams.length &&
            data.push({
              key: member.first_name,
              value: member.id,
              text: member.first_name + ' ' + member.last_name
            })
        })
        assignToData.user.options = data        

        this.setState({
          ...this.state,
          assignToData
        })
      })
      .catch(err => {
        this.props.loading(false)       
      })
  }

  getQueryString = async () => {
    const parsed = await queryString.parse(window.location.search)   
    await this.setState(
      {
        ...this.state,
        numberId: parsed
      },
      () => {
        // this.getIncomingNumbers()
        // await this.getNumberData(parsed.id);
        this.getNumberAPI(parsed)
        
      }
    )
  }

  getTeams = () => {
    this.props.loading(true)
    const apiToken = localStorage.getItem('access_token')
    const { assignToData } = this.state

    let head = {
      headers: {
        Authorization: 'Bearer ' + apiToken
      }
    }
    const url = `${process.env.REACT_APP_BASE_APP_URL}/api/v1/team/teams?limit=20000&offset=0`

    Axios.get(url, head)
      .then(res => {
        if (res.data.data) {
          this.props.loading(false)
          const data = []
          res.data.data.map(team => {
            data.push({
              key: team.name,
              text: team.name,
              value: team.id
            })
          })
          assignToData.team.options = data
          this.setState({
            ...this.state,
            assignToData
          })
        }
      })
      .catch(err => {      
        this.props.loading(false)
      })
  }

  getNumberData = () => {
    this.props.loading(true)
    const {numberId} = this.state; 
    const apiToken = localStorage.getItem('access_token')
    const { assignToData } = this.state

    let head = {
      headers: {
        Authorization: 'Bearer ' + apiToken
      }
    }
    const url = `${process.env.REACT_APP_BASE_APP_URL}/api/v1/numbers/${numberId.id}`

    Axios.get(url, head)
      .then(res => {
        if (res.data) {
          this.props.loading(false)
          const data = res.data.data;          
          this.setState({
            ...this.state,
          numberName : data.friendly_name,
        })
        }
      })
      .catch(err => {        
        this.props.loading(false)
      })
  }

  onChangeCountry = value => {
    this.setState({ numberAppNumber: value })
  }

  handleDataRef = (DataState, DataRef) => {    
    if(DataRef === 0)
    {
     this.onCallRecording(DataState);
    }else{
      this.onGrettingCaller(DataState);
    }
  }

  onCallRecording = e => {
    const {numberId, callToggle} = this.state; 
    const apiToken = localStorage.getItem('access_token')  

    const stateValue = (callToggle === null ? e : callToggle[0].status);

    if(e !== stateValue)
    {
  
      const tg = [...this.state.callToggle]
     
    let head = {
      headers: {
        Authorization: 'Bearer ' + apiToken
      }
    }
    const url = `${process.env.REACT_APP_BASE_APP_URL}/api/v1/change-number-record-status`

    const data = {
      number_id: parseInt(numberId.id),
      record_calls: e ? 1 : 0
    }
    Axios.post(url, data, head)
      .then(res => {
        CommonNotify(
          e ? 'Record enabled successfully' : 'Record disabled successfully',
          'success'
        )
        tg[0].status = e;
      this.setState({callToggle : tg});
      })
      .catch(err => {
        console.error(err)
      })
    }
    
  }

  onGrettingCaller = e => {
    const {numberId, callToggle} = this.state; 
    const apiToken = localStorage.getItem('access_token')

    const stateValue = (callToggle === null ? e : callToggle[1].status);

    if(e !== stateValue)
    {     
      const tg = [...this.state.callToggle]
      console.log('User Automative G ::::');
  
       console.log(' Greetings *******',e, numberId);
    let head = {
      headers: {
        Authorization: 'Bearer ' + apiToken
      }
    }
    const url = `${process.env.REACT_APP_BASE_APP_URL}/api/v1/change-call-greeting-status`

    const data = {
      number_id: parseInt(numberId.id),
      use_start_greeting: e ? 1 : 0
    }
    Axios.post(url, data, head)
      .then(res => {
        CommonNotify(
          e
            ? 'Call start greetings enabled successfully'
            : 'Call start greetings disabled successfully',
          'success'
        )
        tg[1].status = e;
        this.setState({callToggle : tg});
      })
      .catch(err => {
        console.error(err)
      })
    }
  }

  onAssingToHandler = (e, data) => {

    const { assignToData, assignedData } = this.state
      
      assignToData.label = data.value;
      assignToData.placeholderValue = 'Select ' + data.value;

      

      this.setState({
        ...this.state,
        assignToData,
        showAssignValues : true,
        defaultAssignTo : data.value
      })
  //   }
  //   else{
  //     console.log('Not Null ::::',assignedData.type,a)

  //    if(a.toUpperCase() ===  assignedData.type.toUpperCase()  )
  //    {
  //     assignToData.placeholderValue = assignedData.name;
  //    }else{
  //     assignToData.placeholderValue = 'Selectt ' + data.value;
  //    }
  //   this.setState({
  //     ...this.state,
  //     assignToData
  //   })


  // }
  }

  onCancel = async () => {
    const {nameFromAPI} = this.state;  
    this.setState({numberName : nameFromAPI, showEditButton : false})
  }

  selectOptionHandler = label => {
    const { assignToData } = this.state
    switch (label) {
      case 'Platform':
        return assignToData.platform.options
        break
      case 'Team':
        return assignToData.team.options
        break
      case 'User':  
        return assignToData.user.options
        break
      default:
        return assignToData.platform.options
        break
    }
  }

  onAssignedToTeam = data => {
    const {assignedData} = this.state;

    // const nowData =  (assignedData === null ? {type : 'abc', id : 0} : assignedData )
    // console.log('NOW ::::',nowData);

    // if(assignedData.id === data.value)
    // {
    //   console.log('Same Team ::::',assignedData.id, data.value);
    // }else{
    this.props.loading(true)
    const apiToken = localStorage.getItem('access_token')

    const url = `${process.env.REACT_APP_BASE_APP_URL}/api/v1/assign-incoming-numbers-to-team`

    const postData = {
      phone_number_id: this.state.numberId.id,
      team_id: data.value
    }
    let head = {
      headers: {
        Authorization: 'Bearer ' + apiToken
      }
    }

    Axios.post(url, postData, head)
      .then(res => {
        this.props.loading(false)
        const name = res.data.data.name
        CommonNotify(`Number Assigned To Team ${name} successfully`, 'success')
      })
      .catch(err => {
        this.props.loading(false)
        CommonNotify('Not able to Assigned team')        
      })
    // }
  }

  onAssignedToUsers = data => {

    const postData = {
      type: 'member',
      member_id: this.state.selectedMembers
    }
    this.assignTheNumber(postData);
  }

  assignTheNumber = data => {
    const { numberId} = this.state;
    this.props.loading(true)
    const apiToken = localStorage.getItem('access_token')

    const url = `${process.env.REACT_APP_BASE_APP_URL}/api/v1/number/${numberId.id}/assign`

    let head = {
      headers: {
        Authorization: 'Bearer ' + apiToken
      }
    }    

    Axios.post(url, data, head)
      .then(res => {       
        this.props.loading(false)
        CommonNotify(`Number Assigned To ${data.type} successfully`, 'success')
      })
      .catch(err => {
        this.props.loading(false)        
        CommonNotify('Some Error Occured')
      })
  }

  onAssignedToWidget = data => {
    this.props.loading(true)
    const apiToken = localStorage.getItem('access_token')

    const url = `${process.env.REACT_APP_BASE_APP_URL}/api/v1/assign-incoming-numbers-to-member`

    const postData = {
      phone_number_id: this.state.numberId.id,
      widget_id: data.value
    }
    let head = {
      headers: {
        Authorization: 'Bearer ' + apiToken
      }
    }

    Axios.post(url, postData, head)
      .then(res => {
        this.props.loading(false)
        CommonNotify('Number Assigned To widget successfully', 'success')
      })
      .catch(err => {
        this.props.loading(false)
        CommonNotify('Not able to Assigned Number to Widget')
      })
  }

  onPostDataSaveHandler = (e, data) => {
    const { label } = this.state.assignToData   
    var postData = {};
    switch (label) {
      case 'Team':
         postData = {
          type: 'team',
          team_id: [data.value]
        }
        this.setState({
          ...this.state,
          defaultAssigned : data.value })
        this.assignTheNumber(postData)
        break
      case 'User':
        this.setState({
          ...this.state,
          defaultAssigned : data.value,
          selectedMembers: data.value
        })
        break
        case 'Platform':
           postData = {
            type: 'widget',
            widget_id: [data.value]
          }
          this.setState({
            ...this.state,
            defaultAssigned : data.value, })
            this.assignTheNumber(postData)
            break
      default:
        break
    }
  }

  onFileChange = e => {    
    this.setState({
      file : e.target.files[0]
    })
    const apiToken = localStorage.getItem('access_token')
    let head = {
      headers: {
        Authorization: 'Bearer ' + apiToken
      }
    }
    const url = `${process.env.REACT_APP_BASE_APP_URL}/api/v1/update-number-configs`

    const data = {
      phone_number_id: parseInt(this.state.numberId.id),
      call_start_greeting: e.target.files[0]
    }
    Axios.post(url, data, head)
      .then(res => {
        CommonNotify('File Upload successfully', 'success')
      })
      .catch(err => {       
        CommonNotify("You're not able to upload file")
      })
  }

  // onFileChange = (event) => {
  //   if (!event.target.files[0]) {
  //     CommonNotify('Select currect file', 'error')
  //     this.setState({ isFileChange: false })
  //   } else {
  //     this.setState({
  //       ...this.state,
  //       selectedFileName: event.target.files[0].name,
  //       file: event.target.files[0].name
  //     })
  //   }
  // }

  render() {
    const { dataNumber, onChangeCountry, numberName, callToggle } = this.state;
    return (
      <div className="configure-wrapper">
        <div className="campaign-sec">
          <p>Number Name</p>
          <span className="company-subtitle">
            Enter a unique name to save your number
          </span>
          <CommonInput
           value={this.state.numberName}
            placeholder="Enter a Name"
            name="SetCampaign"
            onChange={e => { this.setState({numberName : e.target.value, showEditButton: true})} }
            defaultValue={this.state.numberName}
            type="text"
          />
          {this.state.showEditButton ? (
            <div>
        <button onClick={this.renameNumber} class="ui button btn-grey" style={{backgroundColor: '#0071eb', marginTop: 20, color: '#ffffff'}}> <p style={{color: '#fff', fontSize: 12}}>Save</p> </button> 
        <button onClick={this.onCancel} class="ui button btn-grey" style={{ marginTop: 20}}> <p style={{color: 'black', fontSize: 12}}>Cancel</p> </button> 
        </div> 
          ) : null }
 
        </div>
        <div className="campaign-sec">
          <p>Where Should The Calls Go ?</p>
          <div className="assing_opt">
            <label htmlFor="assing_dropdwon">Assign To</label>
            <Dropdown
              placeholder="Select Option"
              fluid
              selection
              options={AssignTo}
              onChange={this.onAssingToHandler}
              value={this.state.defaultAssignTo}
            />
          </div>

        {this.state.showAssignValues ? 
          <div className="assing_opt">
            <label htmlFor="assing_dropdwon">
              {this.state.assignToData.label}
            </label>
            {this.state.assignToData.label === 'External Number' ? (
              <ReactPhoneInput />
            ) : (
              <Dropdown
                placeholder={`Select ${this.state.assignToData.label} `}
                fluid
                selection
                multiple={this.state.assignToData.label === 'User'}
                options={this.state.showAssignValues ?  this.selectOptionHandler(
                  this.state.assignToData.label
                ) : null }
                onChange={this.onPostDataSaveHandler}
                value={this.state.defaultAssigned}
              />
            )}
          </div>
          
          : null }

          {this.state.assignToData.label === 'User' && (
            <div className="user_assing_btn">
            <button onClick={this.onAssignedToUsers} class="ui button btn-grey" style={{backgroundColor: '#0071eb', marginTop: 10, color: '#ffffff'}}> <p style={{color: '#fff', fontSize: 12}}>Assign to selected members</p> </button> 
            </div>
          )}

          {/* <Dropdown
            placeholder="Select Country"
            fluid
            search
            selection
            options={dropDownOptions}
          /> */}
          {/* <ReactPhoneInput
            onChange={onChangeCountry}
            defaultCountry={'us'}
            value={dataNumber}
            placeholder="Enter phone number"
          />
          <CommonButton
            content="Add Another Number"
            btnClass="btn-add-number"
            image={circlePlus}
            type="button"
          />

          <CommonButton
            content="Add Call Flow"
            btnClass="btn-blue"
            type="button"
          /> */}

          {/* <NodeToggle
            handleDataRef={() => {}}
            dataToggle={{
              callTitle: 'Text forwarding',
              callDesc: '',
              callId: 'toggleTXTShowBtn',
              callRef: 'ShowTXTButton'
            }}
          /> */}
                  {this.state.callToggle === null ? null : this.state.callToggle.map((item, i) => {
          return (
          <NodeToggle
            handleDataRef={this.handleDataRef}
            dataToggle={item}
            activeDefault={item.status}
          />
          )
          })}

          {this.state.greeting && (
            <div className="general-content-holder-right">
              <CommonInput
                name="greeting"
                inputProps={{ accept: 'audio/*;capture=microphone' }}
                type="file"
                onChange={e => this.onFileChange(e)}
                accept="audio/wav"
              />
              <div className="audio-controls">
                <audio controls="controls" ref={this.audio}>
                  <source
                    // src="http://codeskulptor-demos.commondatastorage.googleapis.com/GalaxyInvaders/alien_shoot.wav"
                    src={this.state.file === null ? null : this.state.file.name}
                    type="audio/wav"
                  />
                </audio>
              </div>
              {/* <TextArea placeholder="Hello, this call is being recorded for quality assurance." /> */}
            </div>
          )}
          {/* <NodeToggle
            handleDataRef={e => this.handleDataRef('whisper', e)}
            dataToggle={{
              callTitle: 'Play a whisper message',
              callDesc: '',
              callId: 'toggleMessageShowBtn',
              callRef: 'ShowMessageButton'
            }}
          /> */}
          {this.state.whisper && (
            <div className="greeting-check">
              {/* <TextArea placeholder="Call coming from Facebook" /> */}
              <div className="general-content-holder-right">
                <CommonInput
                  name="whisper"
                  inputProps={{ accept: 'audio/*;capture=microphone' }}
                  type="file"
                />
                {/* <TextArea placeholder="Hello, this call is being recorded for quality assurance." /> */}
              </div>
            </div>
          )}
          {/* <NodeToggle
            handleDataRef={e => this.handleDataRef('callerId', e)}
            dataToggle={{
              callTitle: 'Show Caller Id',
              callDesc: '',
              callId: 'toggleCallerIdShowBtn',
              callRef: 'ShowCallerIdButton'
            }}
          /> */}
          {this.state.callerId && (
            <div className="greeting-check">
              <CommonSelect
                name="callerId"
                placeholder="Select Caller Id"
                options={[
                  'New Number',
                  'Your verified number (+918888847498)',
                  'Limecall Number (default)'
                ]}
              />
            </div>
          )}
        </div>
        {/* <div className="text-right">
          <CommonButton
            type="button"
            content="Delete Number"
            btnClass="btn-blue btn-delete"
          />
          <CommonButton
            type="button"
            content="Save Changes"
            btnClass="btn-blue"
          />
        </div> */}
      </div>
    )
  }
}

export default Configure
