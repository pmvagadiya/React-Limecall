import React, { Component } from 'react'
import { TextArea } from 'semantic-ui-react'

import CommonSelect from '../../common/CommonSelect';
import CommonCheckbox from '../../common/CommonCheckbox'

class Automation extends Component {
  state = {
    checkboxForFirstTimeCall: false,
    checkboxForReturningCall: false
  }
  onCheckboxForFirstTimeCall = e => {
    const { checkboxForFirstTimeCall } = this.state
    this.setState({ checkboxForFirstTimeCall: !checkboxForFirstTimeCall })
  }
  onCheckboxForReturningCall = e => {
    const { checkboxForReturningCall } = this.state
    this.setState({ checkboxForReturningCall: !checkboxForReturningCall })
  }
  render() {
    const { checkboxForFirstTimeCall, checkboxForReturningCall } = this.state
    return (
      <div className="automation-wrapper">
        <p>Setup Automation Rules</p>
        <CommonCheckbox
          onChange={e => this.onCheckboxForFirstTimeCall(e)}
          text="If I miss a call from a first time caller then send them a text message immediately"
          checkboxStyle="modal-checkbox"
          name="checkboxForFirstTimeCall"
          checked={checkboxForFirstTimeCall}
        />
        {checkboxForFirstTimeCall && (
          <div className="automation-check">
            <TextArea placeholder="Enter your message" />
            <CommonSelect
              name="config"
              className="popup-font-select"
              placeholder="Select Template"
              options={[
                'Thank you very much',
                'Thanks for calling',
                'We will contact you soon'
              ]}
            />
          </div>
        )}
        <CommonCheckbox
          onChange={e => this.onCheckboxForReturningCall(e)}
          text="If I miss a call from a returning caller then send them a text message immediately"
          checkboxStyle="modal-checkbox"
          name="checkboxForReturningCall"
          checked={checkboxForReturningCall}
        />
        {checkboxForReturningCall && (
          <div className="automation-check">
            <TextArea placeholder="Enter your message" />
            <CommonSelect
              name="config"
              className="popup-font-select"
              placeholder="Select Template"
              options={[
                'Thank you very much',
                'Thanks for calling',
                'We will contact you soon'
              ]}
            />
          </div>
        )}
      </div>
    )
  }
}

export default Automation
