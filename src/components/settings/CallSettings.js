import React, { Component } from 'react'
import { Form, TextArea, Dimmer, Loader } from 'semantic-ui-react'

import NodeToggle from '../../common/NodeToggle3'
import CommonButtons from '../../common/CommonButtons'
import CommonButton from '../../common/CommonButtons'
import CommonRadio from '../../common/CommonRadio2'
import CommonInput from '../../common/CommonInput'

import { CommonNotify } from '../../common/CommonNotify'

import axios from 'axios'
import { getAudioFileName } from '../../helpers/common'
const apiToken = localStorage.getItem('access_token')

const callToggleDefault = [
  {
    callTitle: 'Welcome Greeting',
    callDesc:
      'Setup the very first greeting that the caller will hear when they call you',
    callId: 'toogleAutomated',
    callref: 0,
    status: true,
    file: null,
    url: '',
    path: 'call_start_pb_status',
    fileName: ''
  },
  {
    callTitle: 'Playbacks when the call ends',
    callDesc: 'Download Call Recording',
    callId: 'toggleRecord',
    callref: 1,
    status: true,
    file: null,
    url: '',
    path: 'call_end_pb_status',
    fileName: ''
  },
  {
    callTitle: 'Playbacks to notify your prospects',
    callDesc:
      'If turned off, customer will see the call rep’s number instead of Limecall’s Number',
    callId: 'toggleMasking',
    callref: 2,
    status: true,
    file: null,
    url: '',
    path: 'notify_prospects_pb_status',
    fileName: ''
  },
  {
    callTitle: 'Busy Situation',
    callDesc: '',
    callId: 'toogleBusySituation',
    callref: 3,
    status: false,
    file: null,
    active: false,
    nofile: true,
    fileName: ''
  }
]

const lstCallAlgorithm = [
  {
    label: 'Simultaneously',
    value: '0'
  },
  {
    label: 'In a sequence',
    value: '1'
  },
  {
    label: 'In a random sequence',
    value: '2'
  }
]
const lstCallDirection = [
  { label: 'Client to customer service', value: 'client_to_services' },
  { label: 'Service to Client', value: 'services_to_client' }
]

class Calls extends Component {
  constructor(props) {
    super(props)
    this.audio = React.createRef()
    this.upload = React.createRef()
  }
  state = {
    isLoading: false,
    automatedCall: false,
    callRecording: false,
    callerId: false,
    voiceMessage: true,
    callAlgorithm: null,
    callDirection: '0',
    maxCallTime: 60,
    callToggle: callToggleDefault,
    apiCalled: false,
    callSetting: {
      callAlgorithm: '0',
      callDirection: 'client_to_services',
      maxCallTime: 60
    },
    isHandleRadio: false,
    isHandleDataTextAreaChange: false,
    isFileChange: false,
    isUpdateMaxCallTime: false,
    selectedFileName: '',
    file: '',
    isHandleBusyStation: false
  }

  handleDataTextAreaChange = e => {
    if (!e.target.value) {
      this.setState({ isHandleDataTextAreaChange: false })
    } else {
      this.setState({ isHandleDataTextAreaChange: true })
    }
    this.setState({ voiceMessage: e.target.value })
  }

  handleDataRef = (DataState, DataRef, callTitle) => {
    if (callTitle === 'Busy Situation') {
      this.setState({ isHandleBusyStation: true })
    }
    let callToggle = [...this.state.callToggle]
    callToggle[DataRef].status = DataState
    const path = callToggle[DataRef].path
    if (path) {
      this.postMeetingSetting(path)
    }
    // const items = [
    //   'call_start_pb_status',
    //   'call_end_pb_status',
    //   'notify_prospects_pb_status'
    // ]
    // if (DataRef < 3) {
    //   const payload = {
    //     widget_id: this.props.widget.id,
    //     parameter: items[DataRef]
    //   }
    //   this.postMeetingSetting(payload)
    // }

    this.setState({ callToggle })
  }

  handleRadio = (index, value) => {
    if (!value) {
      this.setState({ isHandleRadio: false })
    } else {
      this.setState({ isHandleRadio: true })
    }
    let callSetting = { ...this.state.callSetting }
    callSetting[index] = value
    this.setState({ callSetting })
  }

  onFileChange = (event, index, DataRef) => {
    if (!event.target.files[0]) {
      CommonNotify('Select current file', 'error')
      this.setState({ isFileChange: false })
    } else {
      this.setState({
        ...this.state,
        isFileChange: true,
        selectedFileName: event.target.files[0].name,
        file: event.target.files[0].name
      })
    }
    var sound = document.getElementById('sound')
    var reader = new FileReader()
    reader.onload = function(e) {
      sound.src = this.result
      callToggle[index].url = this.result
    }
    reader.readAsDataURL(event.target.files[0])
    let callToggle = [...this.state.callToggle]
    callToggle[index].file = event.target.files[0]
    callToggle[index].fileName = event.target.files[0].name
    callToggle[index].url = event.target.files[0]
    this.setState({ callToggle }, () => this.onTrackChange())
  }

  handleClick(e, i) {
    this.inputOpenFileRef.current.click()
    //this.refs.fileUploader.click()
  }

  componentDidMount = async () => {
    await this.fetchSetting()
  }

  setSetting = data => {
    let callToggle = [...this.state.callToggle]
    let callSetting = { ...this.state.callSetting }

    let file = this.state.file

    callToggle[0].status =
      data['playback_settings'].call_start_pb_status == 1 ? true : false
    callToggle[0].url = `${process.env.REACT_APP_BASE_APP_URL}/storage/${data['playback_settings'].call_start_pb_path}`

    callToggle[1].status =
      data['playback_settings'].call_end_pb_status == 1 ? true : false
    callToggle[1].url = `${process.env.REACT_APP_BASE_APP_URL}/storage/${data['playback_settings'].call_end_pb_path}`

    callToggle[2].status =
      data['playback_settings'].notify_prospects_pb_status == 1 ? true : false
    callToggle[2].url = `${process.env.REACT_APP_BASE_APP_URL}/storage/${data['playback_settings'].notify_prospects_pb_path}`

    callToggle[3].status =
      data['call_settings'].busy_situation == 1 ? true : false

    callToggle[0].fileName = getAudioFileName(
      data['playback_settings'].call_start_pb_path
    )

    callToggle[1].fileName = getAudioFileName(
      data['playback_settings'].call_end_pb_path
    )

    callToggle[2].fileName = getAudioFileName(
      data['playback_settings'].notify_prospects_pb_path
    )

    if (callToggle[0].url) {
      file = data['playback_settings'].call_start_pb_path
    } else if (callToggle[1].url) {
      file = data['playback_settings'].call_end_pb_path
    } else if (callToggle[2].url) {
      file = data['playback_settings'].notify_prospects_pb_path
    }
    this.setState({ file })
    callSetting.callAlgorithm = data.call_settings.call_process.toString()

    // if (data.call_settings.call_process === 'SIMULTANEOUSLY') {
    //   data.call_settings.call_process.replace('SIMULTANEOUSLY', '0')
    // } else if (data.call_settings.call_process) {
    //   data.call_settings.call_process.replace('IN_A_SEQUENCE', '1')
    // } else if (data.call_settings.call_process) {
    //   data.call_settings.call_process.replace('IN_A_RANDOM_SEQUENCE', '2')
    // }
    callSetting.callDirection = data.call_settings.call_direction

    callSetting.maxCallTime = data.call_settings.max_call_time
    this.setState({ callToggle, apiCalled: true, callSetting })
    this.onTrackChange()
  }

  fetchSetting = async () => {
    this.setState({ isLoading: true })
    const Token = await localStorage.getItem('access_token')
    const widget_id = await localStorage.getItem('widget_id')

    let head = {
      headers: {
        Authorization: 'Bearer ' + Token
      }
    }
    const url = `${process.env.REACT_APP_BASE_APP_URL}/api/v1/widget/get-widget-call-settings?widget_id=${widget_id}`

    axios
      .get(url, head)
      .then(async res => {
        this.setState({ isLoading: false })
        if (res.data.data) {
          await this.setSetting(res.data.data)
        }
      })
      .catch(error => {
        this.setState({ isLoading: false })
        CommonNotify("Can't fetch call Settings")
      })
  }

  postMeetingSettingWav = data => {
    this.setState({ isLoading: true })

    let head = {
      headers: {
        Authorization: 'Bearer ' + apiToken
      }
    }

    const url = `${process.env.REACT_APP_BASE_APP_URL}/api/v1/widget/upload-playbacks`
    axios
      .post(url, data, head)
      .then(res => {
        this.fetchSetting()
        this.setState({ isLoading: false })
        if (res.data.message[0] == 'Successfully') {
          CommonNotify('Call playback file successfully uploaded', 'success')
        }
      })
      .catch(error => {
        this.setState({ isLoading: false })
        CommonNotify('Cant uploaded the call playback file', 'error')
      })
  }

  postMeetingSetting = path => {
    this.setState({ isLoading: true })
    let head = {
      headers: {
        Authorization: 'Bearer ' + apiToken
      }
    }
    const data = {
      widget_id: this.props.widget.id,
      parameter: path
    }
    const url = `${process.env.REACT_APP_BASE_APP_URL}/api/v1/widget/change-playback-status`
    axios
      .post(url, data, head)
      .then(async res => {
        await this.fetchSetting()
      })
      .catch(error => {
        this.setState({ isLoading: false })
        CommonNotify("Can't Update Playback Settings")
      })
  }

  postCallSetting = data => {
    this.setState({ isLoading: true })
    let head = {
      headers: {
        Authorization: 'Bearer ' + apiToken
      }
    }

    const url = `${process.env.REACT_APP_BASE_APP_URL}/api/v1/widget/call-algorithm`
    axios
      .post(url, data, head)
      .then(res => {
        this.setState({ isLoading: false })
        if (res.data.message[0] == 'Successfully') {
          CommonNotify('Call Algorithm Successfully Updated', 'success')
        }
      })
      .catch(error => {
        this.setState({ isLoading: false })
        CommonNotify('Cant update call algorithm ')
      })
  }

  onSave = () => {
    let { callSetting, callToggle, isFileChange } = this.state

    let callPayload = {
      widget_id: this.props.widget.id,
      busy_mode: callToggle[3].status == true ? '1' : '0',
      call_direction:
        callSetting.callDirection === 'client_to_services' ? '0' : '1',
      call_process: callSetting.callAlgorithm.toString(),
      max_call_time: callSetting.maxCallTime
    }
    this.postCallSetting(callPayload)
    const updateCallToggle = callToggle.filter(
      item => item.callTitle !== 'Busy Situation'
    )
    // this.fetchSetting()
    this.setState({
      callSetting: {
        callDirection: callSetting.callDirection,
        callAlgorithm: callSetting.callAlgorithm.toString()
      },
      isHandleDataTextAreaChange: false,
      isHandleRadio: false,
      isHandleDataTextAreaChange: false,
      isFileChange: false,
      isUpdateMaxCallTime: false,
      isHandleBusyStation: false
    })
    // upload wav file

    this.updateAudioFile()
  }

  updateAudioFile = () => {
    let { callToggle, isFileChange } = this.state
    const updateCallToggle = callToggle.filter(
      item => item.callTitle !== 'Busy Situation'
    )
    var formData = new FormData()
    if (updateCallToggle.map(item => item.status).includes(true)) {
      formData.append('widget_id', this.props.widget.id)
      formData.append('call_process', this.props.widget.id)
      if (callToggle[0].file) {
        formData.append('call_start_playback', callToggle[0].file)
      }
      if (callToggle[1].file) {
        formData.append('call_end_playback', callToggle[1].file)
      }
      if (callToggle[2].file) {
        formData.append('notify_prospects', callToggle[2].file)
      }
    }
    if (callToggle[2].file) {
      formData.append('notify_prospects', callToggle[2].file)
    }

    if (isFileChange) {
      this.postMeetingSettingWav(formData)
    }
  }

  updateMaxCallTime = e => {
    if (!e.target.value) {
      this.setState({ isUpdateMaxCallTime: false })
    } else {
      this.setState({ isUpdateMaxCallTime: true })
    }
    let callSetting = { ...this.state.callSetting }
    callSetting.maxCallTime = e.target.value
    this.setState({ callSetting })
  }

  onTrackChange = () => {
    if (this.audio.current) {
      this.audio.current.pause()
      this.audio.current.load()
    }
  }
  render() {
    const {
      isHandleRadio,
      isHandleDataTextAreaChange,
      isFileChange,
      isUpdateMaxCallTime,
      isHandleBusyStation
    } = this.state
    return (
      <>
        {/* <Dimmer active={this.state.isLoading}> */}
        <Loader active={this.state.isLoading} />
        {/* </Dimmer> */}
        <div className="callsettings-wrapper">
          <h4>Playback Settings</h4>
          <div className="callDetailsMainWrappers">
            <div className="callToggleHead">
              <p>Please upload only .wav file</p>
            </div>
            {this.state.callToggle.map((item, i) => {
              console.log(item.url, 'item.url')
              return (
                <>
                  <div className="callTogglemMain">
                    <div className="callToggles">
                      {this.state.apiCalled && (
                        <NodeToggle
                          key={i}
                          handleDataRef={(DataState, DataRef) =>
                            this.handleDataRef(
                              DataState,
                              DataRef,
                              item.callTitle
                            )
                          }
                          dataToggle={item}
                          activeDefault={item.status}
                          checked={true}
                        />
                      )}
                      {!item.nofile && (
                        <>
                          {item.status && (
                            <div className="call-bottom-wrapper">
                              <div className="call-bottom-holder">
                                <input
                                  type="file"
                                  onChange={e => this.onFileChange(e, i)}
                                  ref={this.upload}
                                  // style={{ display: 'none' }}
                                  accept="audio/wav"
                                  className="file_select"
                                />
                                {/* <CommonButton
                          type="button"
                          content="Upload"
                          btnClass="btn-upload"
                          onClick={() => {
                            this.upload.click()
                          }}

                        /> */}
                                <div
                                  className="file__validation"
                                  style={{ marginBottom: '5px' }}
                                >
                                  {/* <p>Please upload only .wav file</p> */}
                                </div>
                                <p>
                                  {item.fileName}
                                  {/* {this.state.file.split('/')[4] ||
                            this.state.selectedFileName} */}
                                </p>
                                {item.url && (
                                  <div className="audioWrap">
                                    <audio controls ref={this.audio} id="sound">
                                      <source src={item.url} type="audio/wav" />
                                    </audio>
                                  </div>
                                )}
                              </div>
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                </>
              )
            })}
          </div>
          <div className="callAlgorithmWrap">
            <div className="call-bottom-wrapper call-algorithm call_algorithm_main">
              <div className="call-bottom-holder">
                <h3 className="call-title">Call algorithm</h3>
              </div>
              <CommonRadio
                radioList={lstCallAlgorithm}
                onChange={(e, { value }) =>
                  this.handleRadio('callAlgorithm', value)
                }
                defaultValue={this.state.callSetting.callAlgorithm}
                name={this.state.callSetting.callAlgorithm}
              ></CommonRadio>
            </div>
            <div className="call-bottom-wrapper call-algorithm">
              <div className="call-bottom-holder">
                <h3 className="call-title">Call direction</h3>
              </div>
              <CommonRadio
                radioList={lstCallDirection}
                onChange={(e, { value }) =>
                  this.handleRadio('callDirection', value)
                }
                defaultValue={this.state.callSetting.callDirection}
                name={this.state.callSetting.callDirection}
              />
            </div>
            <div className="call-bottom-wrapper call-algorithm">
              <div className="call-bottom-holder">
                <h3 className="call-title">Max Call Time (in seconds)</h3>
              </div>
              <div className="">
                <CommonInput
                  onChange={e => this.updateMaxCallTime(e)}
                  placeholder="Max Call Time"
                  name="maxCall"
                  type="number"
                  value={this.state.callSetting.maxCallTime}
                />
              </div>
            </div>
            {(isHandleRadio ||
              isHandleDataTextAreaChange ||
              isFileChange ||
              isUpdateMaxCallTime ||
              isHandleBusyStation) && (
              <>
                <CommonButtons
                  type="button"
                  onClick={this.onSave}
                  content="Save"
                  background="blue"
                />
                <CommonButtons
                  onClick={() => this.componentDidMount()}
                  type="reset"
                  content="Cancel"
                  background="grey"
                />
              </>
            )}
          </div>
        </div>
      </>
    )
  }
}

export default Calls
