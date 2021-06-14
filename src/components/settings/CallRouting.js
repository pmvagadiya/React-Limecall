import React, { Component } from 'react'

import CommonInput from '../../common/CommonInput'
import CommonSelect from '../../common/CommonSelect'
import CommonButtons from '../../common/CommonButtons'
import NodeToggle from '../../common/NodeToggle'

const lstOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
const lstToggles = [{
  callTitle: 'By activating this you can make your user choose the department he want to call during the call e.g. Press 1 for Sales. press 2 for complaints',
  callId: 'toggleActivateRouteCalls',
  callref: 'sctivateRouteCalls'
}]
class CallRoutingSettings extends Component {
  state = {}
  render() {
    return (
      <div className="callerID-settings-wrapper">
        <p className="callerID-title">Activate Route Calls</p>
        {lstToggles.map((item, i) => {
          return (
            <NodeToggle
              key={i}
              dataToggle={item}
              handleDataRef={() => { }}
            />
          )
        })}
        <div className="callerID-settings-content">
          <CommonInput
            title="Team" />
          <div className="input-wrapper">
            <label className="default-text input-title">Digits</label>
            <CommonSelect
              options={lstOptions}

              defaultValue={1} />
          </div>
          <CommonButtons
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
      </div>
    )
  }
}

export default CallRoutingSettings
