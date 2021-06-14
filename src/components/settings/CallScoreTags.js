import React, { Component } from 'react'

import CommonSelect2 from '../../common/CommonSelect2'
import CommonButtons from '../../common/CommonButtons'
import { CommonNotify } from '../../common/CommonNotify'

import axios from 'axios'
import { el } from 'date-fns/locale'

const apiToken = localStorage.getItem('access_token')

const lstAllowedUser = [
  { value: 'VIP', label: 'VIP' },
  { value: 'NEW', label: 'NEW' }
]
const lstScoredUser = [
  { value: 'Lead', label: 'Lead' },
  { value: 'MQL', label: 'MQL' },
  { value: 'SQL', label: 'SQL' },
  { value: 'Opportunity', label: 'Opportunity' },
  { value: 'Customer', label: 'Customer' },
  { value: 'Spam', label: 'Spam' },
  { value: 'Disqualified', label: 'Disqualified' }
]

const lstScoredLead = [
  { value: 'Assigned', label: 'Assigned' },
  { value: 'Qualified', label: 'Qualified' },
  { value: 'Negotiation', label: 'Negotiation' },
  { value: 'Won', label: 'Won' },
  { value: 'Lost', label: 'Lost' }
]
class CallScoreTagSettings extends Component {
  state = {
    selectedAllowedUser: [  { value: 'VIP', label: 'VIP' } ],
    selectedScoredUser: [],
    selectedScoredLead: [],
    lstAllowedUserData: lstAllowedUser,
    lstScoredUserData: lstScoredUser,
    lstScoredLeadData: lstScoredLead
  }

  setSetting = data => {
    var selectedAllowedUser = []
    data.allowed_tags.map((row, index) => {
      let temp = {
        value: row,
        label: row
      }
      selectedAllowedUser.push(temp)
    })

   var selectedScoredUser = []
    data.allowed_scores.map((row, index) => {
      let temp = {
        value: row,
        label: row
      }
      selectedScoredUser.push(temp)
    })

    var selectedScoredLead = []
    data.allowed_stages.map((row, index) => {
      let temp = {
        value: row,
        label: row
      }
      selectedScoredLead.push(temp)
    })

    this.setState({
      selectedAllowedUser,
      selectedScoredUser,
      selectedScoredLead
    })
  }

  fetchSettings = async () => {
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
        if (res.data.data) {
          this.setSetting(res.data.data.scores_tags)
        }
      })
      .catch(error => {
        this.props.loading(false)
        CommonNotify('Cant Fetch Tags / Score')        
      })
  }

  componentDidMount = () => {
    this.fetchSettings()
  }

  changeAllowedUser = async data => {  
    await this.setState({selectedAllowedUser : data})
  }

  changeScoredUser = data => {   
    this.setState({ selectedScoredUser : data })
  }

  changeScoredLead = data => {   
    this.setState({ selectedScoredLead : data })
  }

  updateAllowedUser = () => {
    let head = {
      headers: {
        Authorization: 'Bearer ' + apiToken
      }
    }

    var selectedAllowedUser = this.state.selectedAllowedUser
    var tags = []

    selectedAllowedUser !== null && selectedAllowedUser.map((row, index) => {
      tags.push(row.label)
    })
   
    const data = {
      tags,
      widget_id: this.props.widget.id
    }

    if(tags.length === 0) {
      CommonNotify('Please select atleast 1 tag.')
    }else{
      this.props.loading(true)
    const url = `${process.env.REACT_APP_BASE_APP_URL}/api/v1/widget/set-tags`
    axios
      .post(url, data, head)
      .then(res => {
        this.props.loading(false)
        if (res.data.message[0] == 'Successfully') {
          CommonNotify('Setting Saved', 'success')        
        }
      })
      .catch(error => {
        this.props.loading(false)
        CommonNotify('Cant Save Setting')
      })
    }

  }

  updateScoredUser = () => {

    let head = {
      headers: {
        Authorization: 'Bearer ' + apiToken
      }
    }

    var selectedScoredUser = this.state.selectedScoredUser
    var scores = []

    selectedScoredUser !== null && selectedScoredUser.map((row, index) => {
      scores.push(row.label)
    })

    const data = {
      scores,
      widget_id: this.props.widget.id
    }

    if(scores.length === 0)
    {
      CommonNotify('Please select atleast 1 score.')
    }else{
      this.props.loading(true)
    const url = `${process.env.REACT_APP_BASE_APP_URL}/api/v1/widget/customer-add-scores`
    axios
      .post(url, data, head)
      .then(res => {
        this.props.loading(false)
        if (res.data.message[0] == 'Successfully') {
          CommonNotify('Setting Saved', 'success')        
        }
      })
      .catch(error => {
        this.props.loading(false)
        CommonNotify('Cant Save Setting')        
      })
    }
  }

  updateScoredLead = () => {
    let head = {
      headers: {
        Authorization: 'Bearer ' + apiToken
      }
    }

    var selectedScoredLead = this.state.selectedScoredLead
    var stages = []

    selectedScoredLead !== null && selectedScoredLead.map((row, index) => {
      stages.push(row.label)
    })

    const data = {
      stages,
      widget_id: this.props.widget.id
    }

    if(stages.length === 0)
    {
      CommonNotify('Please select atleast 1 stage')
    }else{
      this.props.loading(true)
    const url = `${process.env.REACT_APP_BASE_APP_URL}/api/v1/widget/update-stages`
    axios
      .post(url, data, head)
      .then(res => {
        this.props.loading(false)
        if (res.data.message[0] == 'Successfully') {
          CommonNotify('Setting Saved', 'success')          
        }
      })
      .catch(error => {
        this.props.loading(false)
        CommonNotify('Cant Save Setting')        
      })
    }
  }

  render() {
    return (
      <div className="callerID-settings-wrapper">
        <p className="callerID-title">Call Tags Scores</p>
        <div className="callerId-select">
          <CommonSelect2
            onChange={this.changeAllowedUser}
            value={this.state.selectedAllowedUser}
            options={this.state.lstAllowedUserData}
            title="Tags Allowed To User:"
          />
          <CommonButtons
            type="Update"
            onClick={this.updateAllowedUser}
            content="Save"
            background="blue"
          />
          <CommonButtons
            onClick={() => this.componentDidMount()}
            type="reset"
            content="Cancel"
            background="grey"
          />
        </div>
        <div className="callerId-select">
          <CommonSelect2
            onChange={this.changeScoredUser}
            value={this.state.selectedScoredUser}
            options={this.state.lstScoredUserData}
            title="Allowed Scores To Users:"
          />
          <CommonButtons
            onClick={this.updateScoredUser}
            type="Update"
            content="Save"
            background="blue"
          />
          <CommonButtons
            onClick={() => this.componentDidMount()}
            type="reset"
            content="Cancel"
            background="grey"
          />
        </div>
        <div className="callerId-select">
          <CommonSelect2
            onChange={this.changeScoredLead}
            value={this.state.selectedScoredLead}
            options={this.state.lstScoredLeadData}
            title="Allowed Stages To Leads:"
          />
          <CommonButtons
            onClick={this.updateScoredLead}
            type="Update"
            content="Save"
            background="blue"
          />
          <CommonButtons
            onClick={() => this.componentDidMount()}
            type="reset"
            content="Cancel"
            background="grey"
          />
        </div>
      </div>
    )
  }
}

export default CallScoreTagSettings
