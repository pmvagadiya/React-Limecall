import React, { Component } from 'react'

import InnerNavigation from '../common/InnerNavigation'

import icon from '../assets/images/settingIcon.png'

const titleContent = {
  type: 'image',
  titleOne: icon,
  titleTwo: 'Settings'
}

const settingsData = [
  {
    mainSidebar: 'Personal',
    innerTabs: [
      'Account',
      'Notifications',
      'Call Forwarding',
      'Availability',
      'Integrations',
      'Personal Link'
    ]
  },
  {
    mainSidebar: 'Company',
    innerTabs: ['Company', 'Business Hours', 'Notifications']
  },
  // {
  //   mainSidebar: 'Notifications',
  //   innerTabs: ['Notifications']
  // },
  {
    mainSidebar: 'Platform',
    innerTabs: [
      'Calls',
      'Schedules',
      'Countries',
      'Auto Response',
      'BlackList',
      'Caller Id',
      'Call Score / Tags'
    ] //'Call Routing', 'Call Table Design'
  },
  {
    mainSidebar: 'Team',
    innerTabs: ['Team Settings', 'Manage Teammates']
  },
  {
    mainSidebar: 'Billing',
    innerTabs: [
      'Subscription',
      'Invoices',
      'Usage',
      'Billing info',
      'Payment Methods'
    ]
  },
  {
    mainSidebar: 'Integration',
    innerTabs: ['Integration']
  },
  /*------------------------ Excluded-api-----------------------*/
  // {
  //   mainSidebar: 'Notification',
  //   innerTabs: ['Notification']
  // }
  // ,
  {
    mainSidebar: 'API',
    innerTabs: ['API', 'Web Hooks']
  },
  {
    mainSidebar: 'Installation',
    innerTabs: ['Installation', 'Share Your Link']
  }
  // {
  //   mainSidebar: 'Call Forwarding',
  //   innerTabs: ['Call Forwarding']
  // }
]

class Settings extends Component {
  render() {
    return (
      <div className="settings-container">
        <InnerNavigation
          dataComponent={settingsData}
          activeTab= { this.props.settingActiveTab ? this.props.settingActiveTab : this.props.activeTab}
          activeComponent={this.props.settingActiveComponent ? this.props.settingActiveComponent : this.props.activeComponent}
          dataTitle={titleContent}
          settingActiveTab={this.props.settingActiveTab}
          settingActiveComponent={this.props.settingActiveComponent}
        />
      </div>
    )
  }
}

export default Settings
