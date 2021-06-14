import React, { Component } from 'react'

import InnerNavigation from '../common/InnerNavigation'

import Title from '../common/Title'
import icon from '../assets/images/settingIcon.png'

const titleContent = {
  type: 'image',
  titleOne: icon,
  titleTwo: 'Manage Number'
}

const settingsData = [
  {
    mainSidebar: 'SetCampaign',
    // innerTabs: ['Call Log', 'Configure', 'Automation']
    // innerTabs: ['Configure', 'Automation']
    innerTabs: ['Configure']
  }
]

class SetCampaign extends Component {
  render() {
    return (
      <div className="fullwidth-container number-container">
        <Title data={titleContent} />
        <div className="numbers-banner-container">
          {/* <div className="numbers-banner">
            <h1 className="banner-title">Numbers</h1>
          </div> */}
          <InnerNavigation
            dataComponent={settingsData}
            activeTab={this.props.activeTab}
            activeComponent={this.props.activeComponent}
            dataTitle={titleContent}
          />
        </div>
      </div>
    )
  }
}

export default SetCampaign
