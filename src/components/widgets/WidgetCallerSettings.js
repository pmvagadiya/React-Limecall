import React from 'react'
import { Icon } from 'semantic-ui-react'

import CommonTable from '../../common/CommonTable'
import CommonInput from '../../common/CommonInput'

import iconCall from '../../assets/images/Dashboard 2-04.png'

export const WidgetCallerIDTitle = () => (
  <div className="accordion-widget-holder">
    <div className="accordion-image-holder">
      <img src={iconCall} alt="logo" />
    </div>
    <div className="accordion-title-holder">
      <h2 className="accordion-title">Call's and Caller ID Settings</h2>
      <p className="accordion-description">
        Route your calls to your team and set caller ID
      </p>
    </div>
  </div>
)

export const WidgetCallerIDContent = ({ dataTable }) => {
  return (
    <div className="callerID-settings-wrapper">
      <p className="callerID-title">Assign calls to teams</p>
      <div className="route-incoming-wrapper">
        <p className="callerID-desc">
          <Icon name="caret right" />
          Route all your Incoming call to...
        </p>
        <CommonInput
          name="routeIncoming"
          type="text"
          inputStyle="assign-call-input"
          value="Team 1"
        />
      </div>
      <div className="forward-call-wrapper">
        <p className="callerID-desc">
          <Icon name="caret right" />
          Forward call if not responded...
        </p>
        <CommonInput
          name="forwardCall"
          type="text"
          inputStyle="assign-call-input"
          value="team 2"
        />
      </div>
      <div className="callerId-table-wrapper">
        <p className="callerID-title">
          Verify your phone numbers to be able to use them as Caller ID
        </p>
        <CommonTable dataTable={dataTable} />
      </div>
    </div>
  )
}
