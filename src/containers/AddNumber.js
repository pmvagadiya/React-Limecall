import React, { Component } from 'react'
import InnerNavigation from '../common/InnerNavigation'

import Title from '../common/Title'

import icon from '../assets/images/settingIcon.png'

import Country from '../helpers/CountryList'

const titleContent = {
  type: 'image',
  titleOne: icon,
  titleTwo: 'Manage Number'
}

const settingsData = [
  {
    mainSidebar: 'AddNumbers',
    innerTabs: ['LocalNumbers', 'TollFreeNumbers']
  }
]

class AddNumber extends Component {
  render() {
    return (
      <div className="fullwidth-container number-container">
        <Title data={titleContent} />
        <div className="numbers-banner-container add-number add_number_inner">
          <div className="numbers-banner">
            <h1 className="banner-title">
              Add New Numbers
              <div className="banner-info-text">
                Set up local and toll-free numbers to increase contact rate with
                your prospects
              </div>
            </h1>
          </div>
          <InnerNavigation
            dataComponent={settingsData}
            activeTab={this.props.activeTab}
            activeComponent={this.props.activeComponent}
            dataTitle={titleContent}
            CountryList={Country}
          />
        </div>
      </div>
    )
  }
}

export default AddNumber
