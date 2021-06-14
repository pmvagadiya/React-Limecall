import React, { Component } from 'react'

import CommonButtons from '../../common/CommonButtons'
import CommonButton from '../../common/CommonButtons'
// import CommonSelect from '../../common/CommonSelect'
import NodeCheckbox from '../../common/NodeCheckbox'

import CommonSelect2 from '../../common/CommonSelect2'

import circlePlus from '../../assets/images/cicle-plus.png'
import deleteIcon from '../../assets/images/delete-icon.png'

class Notifications extends Component {
  state = {
    activeIndexes: [0],
    //Notification Data
    data: {
      checkboxForMobile: false,
      checkboxCallNotif: false,
      selectConvoType: '',
      selectConvoSound: '',
      inputBillingEmail: '',
      checkboxBrowserDeiplayNotif: false,
      checkboxDesktopNotifOnScreen: false,
      selectAdvanceSound: '',
      checkboxNotifRepeat: false,
      selectEmailNotif: '',
      nodeCheckboxEmail: [],
      nodeCheckboxDesktop: [],
      nodeCheckboxMobile: [],
    },
    lstEmailSummary: [{
      sendType: 'Daily',
      activityEmail: 'test01.aipxperts@gmail.com'
    }],
    lstEmailAlerts: [{
      activityEmail: 'test01.aipxperts@gmail.com',
      for: 'answered calls',
      campaign: 'Set Campaign'
    }],
    lstDays: [
      { value: 'Daily', label: 'Daily' },
      { value: 'Weekly', label: 'Weekly' },
      { value: 'Monthly', label: 'Monthly' }
    ],
    lstEmail: [
      { value: 'test01.aipxperts@gmail.com', label: 'test01.aipxperts@gmail.com' },
      { value: 'test02.aipxperts@gmail.com', label: 'test02.aipxperts@gmail.com' },
      { value: 'test03.aipxperts@gmail.com', label: 'test03.aipxperts@gmail.com' }
    ],
    lstActivity: [
      { value: 'answered calls', label: 'answered calls' },
      { value: 'missed calls without voicemail', label: 'missed calls without voicemail' },
      { value: 'missed calls with voicemail', label: 'missed calls with voicemail' },
      { value: 'texts', label: 'texts' }
    ],
    lstCampaign: [
      { value: 'Set Campaign', label: 'Set Campaign' },
    ]
  }

  onChangeInput = e => {
    const { name, value } = e.target
    const { data } = this.state
    data[name] = value

    this.setState({ data })
  }

  onChangeCheckbox = e => {
    const { name } = e.target.parentNode.querySelector('.hidden')
    const { data } = this.state
    data[name] = !data[name]

    this.setState(data)
  }

  onChangeNodeCheckbox = e => {
    const name = e.target.parentNode.parentNode.parentNode.getAttribute('name')
    const value = e.target.innerText
    const { data } = this.state

    const index = data[name].indexOf(value)
    if (index === -1) {
      data[name].push(value)
    } else {
      data[name].splice(index, 1)
    }

    this.setState(data)
  }

  onChangeSelect = e => {
    const name = e.target.parentNode.parentNode.parentNode.getAttribute('name')
    const value = e.target.innerText
    const { data } = this.state
    data[name] = value

    this.setState({ data })
  }

  onSave = () => {
    // const { data } = this.state
  }

  // handleClick = (e, titleProps) => {
  //   const { index } = titleProps
  //   const { activeIndexes } = this.state
  //   const newIndex = activeIndexes

  //   const currentIndexPosition = activeIndexes.indexOf(index)
  //   if (currentIndexPosition > -1) {
  //     newIndex.splice(currentIndexPosition, 1)
  //   } else {
  //     newIndex.push(index)
  //   }

  //   this.setState({ activeIndexes: newIndex })
  // }

  onClickAddEmailSummaries = () => {
    const { lstEmailSummary } = this.state;
    lstEmailSummary.push({
      sendType: 'Daily',
      activityEmail: 'test01.aipxperts@gmail.com'
    });
    this.setState({ ...lstEmailSummary });
  }

  onClickAddEmailAlerts = () => {
    const { lstEmailAlerts } = this.state;
    lstEmailAlerts.push({
      activityEmail: 'test01.aipxperts@gmail.com',
      for: 'answered calls',
      campaign: 'Set Campaign'
    });
    this.setState({ ...lstEmailAlerts });
  }

  onClickRemoveEmailSummaries = ({ index }) => {
    const { lstEmailSummary } = this.state;
    lstEmailSummary.splice(index, 1);
    this.setState({ ...lstEmailSummary });
  }

  onClickRemoveEmailAlerts = ({ index }) => {
    const { lstEmailAlerts } = this.state;
    lstEmailAlerts.splice(index, 1);
    this.setState({ ...lstEmailAlerts });
  }

  updateDropDownValues = ({ index, key, value }) => {
    const { lstEmailSummary } = this.state;
    lstEmailSummary[index][key] = value;
    this.setState({ ...lstEmailSummary });
  }

  updateDropDownValuesAlerts = ({ index, key, value }) => {
    const { lstEmailAlerts } = this.state;
    lstEmailAlerts[index][key] = value;
    this.setState({ ...lstEmailAlerts });
  }

  render() {
    const { lstDays, lstEmail, lstEmailSummary, lstActivity, lstCampaign, lstEmailAlerts } = this.state
    return (
      <div className="account-settings">
        <div className="holder-notification">
          <div className="setting-notification-wrapper">
            <div className="email-summaries">
              <NodeCheckbox
                onChange={this.onChangeNodeCheckbox}
                name="nodeCheckboxEmail"
                checkboxlist={[
                  'Email Summaries',
                ]}
              />
              {
                lstEmailSummary.map((item, index) => (
                  <div className="email-summaries-inner" key={index}>
                    <p>Send</p>
                    <CommonSelect2
                      options={lstDays}
                      value={item.sendType}
                      onChange={(value) => this.updateDropDownValues({ index, key: 'sendType', value })}
                    />
                    <p>call and text activity summaries to</p>
                    <CommonSelect2
                      options={lstEmail}
                      value={item.activityEmail}
                      onChange={(value) => this.updateDropDownValues({ index, key: 'activityEmail', value })}
                    />
                    {
                      index !== 0 &&
                      <CommonButton
                        onClick={() => this.onClickRemoveEmailSummaries({ index })}
                        btnClass="btn-delete"
                        image={deleteIcon} />}
                  </div>
                ))
              }
              <CommonButton
                onClick={this.onClickAddEmailSummaries}
                content="Schedule another summary"
                btnClass="btn-summary"
                image={circlePlus}
              />
              <div className="text-right">
              <CommonButtons
                type="button"
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
            </div>
          </div>
          <div className="setting-notification-wrapper">
            <div className="email-summaries">
              <NodeCheckbox
                onChange={this.onChangeNodeCheckbox}
                name="nodeCheckboxEmail"
                checkboxlist={[
                  'Email Alerts',
                ]}
              />
              {
                lstEmailAlerts.map((item, index) => (
                  <div className="email-summaries-inner" key={index}>
                    <p>Send alerts to</p>
                    <CommonSelect2
                      options={lstEmail}
                      value={item.activityEmail}
                      onChange={(value) => this.updateDropDownValuesAlerts({ index, key: 'activityEmail', value })}
                    />
                    <p>for</p>
                    <CommonSelect2
                      options={lstActivity}
                      value={item.for}
                      onChange={(value) => this.updateDropDownValuesAlerts({ index, key: 'for', value })}
                    />
                    <CommonSelect2
                      options={lstCampaign}
                      value={item.campaign}
                      onChange={(value) => this.updateDropDownValuesAlerts({ index, key: 'campaign', value })}
                    />
                    {
                      index !== 0 &&
                      <CommonButton
                        onClick={() => this.onClickRemoveEmailAlerts({ index })}
                        btnClass="btn-delete"
                        image={deleteIcon} />}
                  </div>
                ))
              }
              <CommonButton
                onClick={this.onClickAddEmailAlerts}
                content="create another alert"
                btnClass="btn-summary"
                image={circlePlus}
              />
              <div className="text-right">
                <CommonButtons
                  type="button"
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
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Notifications
