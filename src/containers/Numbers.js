import React, { Component } from 'react'
// import { Link } from 'react-router-dom'

import Title from '../common/Title'
// import CommonButton from '../common/CommonButtons'
import InnerNavigation from '../common/InnerNavigation'

import icon from '../assets/images/settingIcon.png'

const titleContent = {
  type: 'image',
  titleOne: icon,
  titleTwo: 'Number'
}

const settingsData = [
  {
    mainSidebar: 'Manage Number',
    innerTabs: ['Manage Number']
  }
]

class Numbers extends Component {
  render() {
    return (
      <div className="fullwidth-container number-container">
        <Title data={titleContent} />
        <div className="numbers-banner-container manage_number_main">
          <div className="numbers-banner">
            <div className="banner-icon">
              <img src={icon} alt="icon" />
            </div>
            <div className="banner-description-wrapper">
              {/* <h1 className="banner-title">Manage Number</h1> */}
              <p className="banner-description">
                 Online phone numbers help you make and receive calls on any internet connected device such as your laptop, desktop  or mobile phone.
              </p>
            </div>
          </div>

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

export default Numbers
