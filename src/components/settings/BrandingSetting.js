import React, { Component } from 'react'
import CommonButtons from '../../common/CommonButtons'
import Toggle from '../../common/CommonToggleClass'

class BrandingSetting extends Component {
  render() {
    return (
      <>
        <div className="working-hours-wrapper availability-block Reminder">
          <p className="availability-title">Branding</p>
          <p>
            Configuration default email reminder settings. You can override
            these on per-scheduling link basis.
          </p>
          <div className="guest-availability-section">
            <div className="availability-toggle">
              <Toggle
              // handleToggleData={this.handleToggleData}
              // dataToggleActive={this.state.activeToggle}
              // dataStateToggle={dataToggle}
              // activeDefault={this.props.active}
              />
              <p className="title-label" style={{ marginLeft: '20px' }}>
                Enable business hours to let your users know when your team is
                working.
              </p>
            </div>
          </div>
          <div className="button-section">
            <CommonButtons
              type="button"
              //onClick={this.onSave}
              content="Save"
              background="blue"
            />
            <CommonButtons
              type="button"
              //onClick={this.onSave}
              content="Cancel"
              background="grey"
            />
          </div>
        </div>
      </>
    )
  }
}

export default BrandingSetting
