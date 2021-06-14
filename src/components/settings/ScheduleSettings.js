import React, { Component } from 'react'

import NodeToggle from '../../common/NodeToggle2'
import CommonInput from '../../common/CommonInput'
import CommonButtons from '../../common/CommonButtons'

import { CommonNotify } from '../../common/CommonNotify'

import axios from 'axios'

const apiToken = localStorage.getItem('access_token')

const items = [
  {
    itemTitle: 'Timeslot interval',
    itemDesc:
      'Intervals between timeslots where customers can choose to schedule calls.',
    name: 'inputTimeslotInterval',
    status: true,
    active: true,
    value: '',
    callId: 'start_time_increment_id',
    callref: 'start_time_increment'  
  },
  {
    itemTitle: 'Minimum Notice Time',
    itemDesc: 'Limit the number of calls allowed for each timeshot',
    name: 'inputCallsPerTimeslot',
    status: false,
    active: true,
    value: '',
    callId: 'minimum_notice_time_id',
    callref: 'minimum_notice_time'
  },
  {
    itemTitle: 'Schedule buffer time',
    itemDesc: 'Buffer time before a call can be scheduled',
    name: 'inputBufferTime',
    status: false,
    active: false,
    value: '',
    callId: 'buffer_time_id',
    callref: 'buffer_time'
  }
]

class ScheduleSettings extends Component {
  state = {
    data: {
      inputTimeslotInterval: '',
      inputCallsPerTimeslot: '',
      inputBufferTime: '',
      inputScheduleDays: '',
      inputTimeFormat: ''
    },
    itemsData: items,
    apiCalled: false,
    isValue: false
  }

  componentWillMount = () => {
    this.fetchSetting()
  }

  updateDataRef = (DataState, DataRef) => {
    let itemsData = [...this.state.itemsData]

    if (DataRef == 'start_time_increment') {
      itemsData[0].status = DataState
    } else if (DataRef == 'minimum_notice_time') {
      itemsData[1].status = DataState
    } else if (DataRef == 'buffer_time') {
      itemsData[2].status = DataState
    }

    this.setState({ itemsData })
  }

  onChange = (e, i) => {
    const { name, value } = e.target
    if (!value) {
      this.setState({ isValue: false })
    } else {
      this.setState({ isValue: true })
    }
    let itemsData = [...this.state.itemsData]
    itemsData[i].value = value
    this.setState({ itemsData })
  }

  onSave = e => {
    this.props.loading(true)

    let head = {
      headers: {
        Authorization: 'Bearer ' + apiToken
      }
    }

    let itemsData = [...this.state.itemsData]

    const data = {
      id: this.props.widget.id,
      start_time_increment_status: itemsData[0].status,
      start_time_increment_value: itemsData[0].value,
      minimum_notice_time_status: itemsData[1].status,
      minimum_notice_time_value: itemsData[1].value,
      buffer_time_status: itemsData[2].status,
      buffer_time_value: itemsData[2].value
    }

    const url = `${process.env.REACT_APP_BASE_APP_URL}/api/v1/widget/set-meetings-settings`
    axios
      .post(url, data, head)
      .then(res => {
        this.props.loading(false)
        if (res.data.message[0] == 'Successfully') {
          CommonNotify('Schedule Setting Updated', 'success')        
        }
      })
      .catch(error => {
        this.props.loading(false)
        CommonNotify('Cant Update Schedule Setting')       
      })
  }

  setSetting = data => {
    let itemsData = [...this.state.itemsData]
    itemsData[0].status = data.start_time_increment_status
    itemsData[0].active = data.start_time_increment_status
    itemsData[0].value = data.start_time_increment_value

    itemsData[1].status = data.minimum_notice_time_status
    itemsData[1].active = data.minimum_notice_time_status
    itemsData[1].value = data.minimum_notice_time_value

    itemsData[2].status = data.buffer_time_status
    itemsData[2].active = data.buffer_time_status
    itemsData[2].value = data.buffer_time_value

    this.setState({ itemsData, apiCalled: true }, () =>
      console.info(this.state.itemsData)
    )
  }

  fetchSetting = async () => {
    const w_id = await localStorage.getItem('widget_id');
    this.props.loading(true)
    let head = {
      headers: {
        Authorization: 'Bearer ' + apiToken
      }
    }
    const url = `${process.env.REACT_APP_BASE_APP_URL}/api/v1/widget/get-widget-call-settings?widget_id=${w_id}`

    axios
      .get(url, head)
      .then(res => {
        this.props.loading(false)
        if (res.data.data.meeting_settings) {
          // setWidget(res.data.data[0].id)
          this.setSetting(res.data.data.meeting_settings)
        }
      })
      .catch(error => {
        this.props.loading(false)
        CommonNotify('Cant Update Schedule Setting')       
      })
  }

  render() {
    return (
      <div className="call-schedules">
        {this.state.itemsData.map((value, index) => (
          <div className="holder-items" key={index}>
            <div className="holder-text">
              <h2 className="item-title">{value.itemTitle}</h2>
              <p className="subtext item-desc">{value.itemDesc}</p>
            </div>

            <div className="holder-toggle">
              {this.state.apiCalled && (
                <NodeToggle
                  handleDataRef={this.updateDataRef}
                  key={index}
                  dataToggle={value}
                  activeDefault={value.active}
                />
              )}
            </div>

            <div className="holder-input">
              <CommonInput
                style={{ minWidth: '70px' }}
                onChange={e => this.onChange(e, index)}
                name={value.name}
                background="gray"
                value={value.value}
                disabled={value.status ? false : true}
              />
            </div>

            <div className="holder-text-static">mins</div>
          </div>
        ))}
        {this.state.isValue && (
          <>
            <CommonButtons
              onClick={this.onSave}
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
      </div>
    )
  }
}

export default ScheduleSettings
