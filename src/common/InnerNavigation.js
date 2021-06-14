import React, { Component } from 'react'
import { Dimmer, Loader } from 'semantic-ui-react'
import { useMediaQuery } from 'react-responsive'

import Title from './Title'
import InnerSideBar from './InnerSidebar'
import InnerTabs from './InnerTabs'
import MySettingsNotifications from '../components/settings/NotificationSettings'
import updateProfile from '../config/updateProfile'
import MySettingsAccount from '../components/settings/AccountSettings'
import MySettingsCalls from '../components/settings/CallSettings'
import ScheduleSettings from '../components/settings/ScheduleSettings'
import CountriesSettings from '../components/settings/CountriesSettings'
import SmsSettings from '../components/settings/SmsSettings'
import TeamSettings from '../components/settings/TeamSettings'
import BlackListSettings from '../components/settings/BlackListSettings'
import ManageTeammates from '../components/settings/ManageTeammates'
import Invoices from '../components/settings/InvoiceBilling'
import BillingInfo from '../components/settings/BillingInfo'
import Usage from '../components/settings/UsageBilling'
import PaymentMethod from '../components/settings/PaymentMethods'
import SubscriptionSettings from '../components/settings/SubscriptionSettings'
import Integration from '../components/settings/Integration'
import CallForwarding from '../components/settings/CallForwarding'
import Notifications from '../components/settings/Notifications'
import CallerIdSettings from '../components/settings/CallerIdSetting'
import CallScoreTagSettings from '../components/settings/CallScoreTags'
import CallRoutingSettings from '../components/settings/CallRouting'
import CallTableDesignSettings from '../components/settings/CallTableDesign'
import MyNumbers from '../components/numbers/MyNumbers'
import LocalNumbers from '../components/numbers/LocalNumbers'
import TollFreeNumbers from '../components/numbers/TollFreeNumbers'
import ApiSettings from '../components/settings/ApiSettings'
import InstallationSettings from '../components/settings/InstallationSettings'
import ShareYourLinkSettings from '../components/settings/ShareYourLinkSettings'
import WebHooksSettings from '../components/settings/WebHooksSettings'
import Configure from '../components/numbers/Configure'
import WorkingHours from '../components/settings/WorkingHours'
import BusinessWorkingHours from '../components/settings/BusinessWorkingHours'
import CompanySettings from '../components/settings/CompanySettings'
import Branding from '../components/settings/BrandingSetting'

// import CallLog from '../components/numbers/CallLog'
import Automation from '../components/numbers/Automation'

import { CommonNotify } from './CommonNotify'

import axios from 'axios'
import AddConnections from '../components/settings/AddConnections'
import AddPersonalLink from '../components/settings/AddPersonalLink'
import NotificationSide from '../components/notification/NotificationSide'
import NotificationSettings from '../components/settings/NotificationSettings'
import { logOut } from  '../common/ProfileModal';

const apiToken = localStorage.getItem('access_token')

class Settings extends Component {
  state = {
    activeComponent: this.props.settingActiveComponent ? this.props.settingActiveComponent : this.props.activeComponent,
    activeTab: this.props.settingActiveTab ? this.props.settingActiveTab : this.props.activeTab,
    widget: { id: 0, script: '', business_hours_status: null },
    // isLoading: true,
    isMenuOpen: false
  }

  handleLoading = state => {
    // this.setState({ isLoading: state })
  }

  optionRemove = () => {
    document.getElementsByTagName('body')[0].removeAttribute('class', '')
  }

  optionAdd = () => {
    document.getElementsByTagName('body')[0].setAttribute('class', 'noScroll')
  }

  fetchWidget = () => {
    // const apiToken = sessionStorage.getItem('access_token')
    const apiToken = localStorage.getItem('access_token')
    let head = {
      headers: {
        Authorization: 'Bearer ' + apiToken
      }
    }
    const url = `${process.env.REACT_APP_BASE_APP_URL}/api/v1/widget/widgets`
    axios
      .get(url, head)
      .then(res => {
        if (res.data.data[0]) {
          let items = { ...this.state.widget }
          let tempObject = {
            id: res.data.data[0].id,
            script: res.data.data[0].script_id,
            business_hours_status: res.data.data[0].business_hours_status
          }
          localStorage.setItem('widget_id', res.data.data[0].id)
          items = tempObject
          this.setState({ ...this.state, widget: items })
        }
      })
      .catch(error => {
        if(!error.response) {         
          return;
        }
        if(error.response.status === 401){
          logOut();
        }
      })
  }

  componentWillMount = () => {
    this.fetchWidget()
  }
  
  handleData = (data, initialTab, isMobile) => {
    if (isMobile) {
      this.setState({
        activeComponent: data
      })
    } else {
      this.setState({
        activeComponent: data,
        activeTab: initialTab
      })
    }
  }
  handleTabData = (tabData, updateURL) => {
    this.setState({ activeTab: tabData })
    if(updateURL){
      let menuString = '/settings/'+ this.state.activeComponent.toLowerCase().split(' ').join('_') + '/' +tabData.toLowerCase().split(' ').join('_').split('/').join('');
      window.history.pushState("object or string", "Title", menuString);
    }
  }

  onMobileMenuHandler = () => {
    this.optionAdd()
    this.setState({
      isMenuOpen: true
    })
  }

  onMobileclickMenuHandler = () => {
    this.setState({
      isMenuOpen: false
    })
  }

  render() {
    const { dataComponent, dataTitle } = this.props
    // set by default active tabs to 'Personal
      if (this.state.activeComponent === 'MySettings') {
      this.setState({
        activeComponent: 'Personal'
      })
    }

    const { activeComponent, activeTab } = this.state
    let dataInnerMenu = []
    let dataInnerTabs = []
    let dataInnerTabsMenu
    let matchedItem
    dataComponent.forEach(item => {
      dataInnerMenu.push(item.mainSidebar)
    })

    matchedItem = dataComponent.find(item => {
      if (item.mainSidebar) {
        return item.mainSidebar.replace(/\s/g, '') === activeComponent
      }
    })
    if (matchedItem) {
      dataInnerTabs = matchedItem.innerTabs
      dataInnerTabsMenu = matchedItem.innerTabs[0]
    }
    if (dataComponent && dataComponent.innerTabs) {
      dataInnerTabs = dataComponent.innerTabs
      dataInnerTabsMenu = dataComponent.innerTabs[0]
    }
    let ActiveTabComponent = MySettingsAccount
    if (activeComponent === 'Personal' && activeTab === 'Account') {
      ActiveTabComponent = MySettingsAccount
    } else if (
      activeComponent === 'Personal' &&
      activeTab === 'Notifications'
    ) {
      ActiveTabComponent = MySettingsNotifications
    }
    // else if (
    //   activeComponent === 'Personal' &&
    //   activeTab === 'Personal Link'
    // ) {
    //   ActiveTabComponent = AddPersonalLink
    // }
    else if (activeComponent === 'Personal' && activeTab === 'Integrations') {
      ActiveTabComponent = AddConnections
    } else if (activeComponent === 'Company' && activeTab === 'Company') {
      ActiveTabComponent = CompanySettings
    } else if (
      activeComponent === 'Company' &&
      activeTab === 'Business Hours'
    ) {
      ActiveTabComponent = ActiveTabComponent = BusinessWorkingHours
    } else if (activeComponent === 'Company' && activeTab === 'Notifications') {
      ActiveTabComponent = NotificationSide
    } else if (activeComponent === 'Platform' && activeTab === 'Calls') {
      ActiveTabComponent = MySettingsCalls
    } else if (activeComponent === 'Platform' && activeTab === 'Schedules') {
      ActiveTabComponent = ScheduleSettings
    } else if (activeComponent === 'Platform' && activeTab === 'Countries') {
      ActiveTabComponent = CountriesSettings
    } else if (
      activeComponent === 'Platform' &&
      activeTab === 'Auto Response'
    ) {
      ActiveTabComponent = SmsSettings
    } else if (activeComponent === 'Team' && activeTab === 'Team Settings') {
      ActiveTabComponent = TeamSettings
    } else if (activeComponent === 'Team' && activeTab === 'Manage Teammates') {
      ActiveTabComponent = ManageTeammates
    } else if (activeComponent === 'Platform') {
      if (activeTab === 'BlackList') {
        ActiveTabComponent = BlackListSettings
      } else if (activeTab === 'Caller Id') {
        ActiveTabComponent = CallerIdSettings
      } else if (
        activeComponent === 'Platform' &&
        activeTab === 'Call Score / Tags'
      ) {
        ActiveTabComponent = CallScoreTagSettings
      } else if (activeTab === 'Call Routing') {
        ActiveTabComponent = CallRoutingSettings
      } else if (activeTab === 'Call Table Design') {
        ActiveTabComponent = CallTableDesignSettings
      }
    } else if (activeComponent === 'Billing' && activeTab === 'Invoices') {
      ActiveTabComponent = Invoices
    } else if (activeComponent === 'Billing' && activeTab === 'Billing info') {
      ActiveTabComponent = BillingInfo
    } else if (activeComponent === 'Billing' && activeTab === 'Usage') {
      ActiveTabComponent = Usage
    } else if (activeComponent === 'Billing' && activeTab === 'Payment Methods') {
      ActiveTabComponent = PaymentMethod
    } else if (activeComponent === 'Billing' && activeTab === 'Subscription') {
      ActiveTabComponent = SubscriptionSettings
    } else if (
      activeComponent === 'Integration' &&
      activeTab === 'Integration'
    ) {
      ActiveTabComponent = Integration
    } else if (
      (activeComponent === 'CallForwarding' ||
        activeComponent === 'Personal') &&
      activeTab === 'Call Forwarding'
    ) {
      ActiveTabComponent = CallForwarding
    } else if (activeTab === 'Availability') {
      ActiveTabComponent = WorkingHours
    }
    // } else if (
    //   activeComponent === 'AddConnections' &&
    //   activeTab === 'Add Connections'
    // ) {
    //   ActiveTabComponent = AddConnections
    // }
    else if (activeComponent === 'Personal' && activeTab === 'Personal Link') {
      ActiveTabComponent = AddPersonalLink
    }
    // else if (
    //   activeComponent === 'Notification' &&
    //   activeTab === 'Notification'
    // ) {
    //   ActiveTabComponent = Notifications
    // }
    else if (
      activeComponent === 'Manage Number' &&
      activeTab === 'Manage Number'
    ) {
      ActiveTabComponent = MyNumbers
    } else if (activeComponent === 'SetCampaign' && activeTab === 'Configure') {
      ActiveTabComponent = Configure
    }
    // else if (activeComponent === 'SetCampaign' && activeTab === 'Call Log') {
    //   ActiveTabComponent = CallLog
    // }
    // else if (activeComponent === 'SetCampaign' && activeTab === 'Automation') {
    //   ActiveTabComponent = Automation
    // }
    else if (activeComponent === 'AddNumbers' && activeTab === 'LocalNumbers') {
      ActiveTabComponent = LocalNumbers
    } else if (
      activeComponent === 'AddNumbers' &&
      activeTab === 'TollFreeNumbers'
    ) {
      ActiveTabComponent = TollFreeNumbers
    } else if (activeComponent === 'API' && activeTab === 'API') {
      ActiveTabComponent = ApiSettings
    } else if (activeComponent === 'API' && activeTab === 'Web Hooks') {
      ActiveTabComponent = WebHooksSettings
    } else if (
      activeComponent === 'Installation' &&
      activeTab === 'Installation'
    ) {
      ActiveTabComponent = InstallationSettings
    } else if (
      activeComponent === 'Installation' &&
      activeTab === 'Share Your Link'
    ) {
      ActiveTabComponent = ShareYourLinkSettings
    }
    // else if (
    //   activeComponent === 'Notifications' &&
    //   activeTab === 'Notifications'
    // ) {
    //   ActiveTabComponent = NotificationSide
    // }
    return (
      <div>
        <Dimmer active={this.state.isLoading} style={{ position: 'fixed' }}>
          <Loader />
        </Dimmer>
        <Title data={dataTitle} dataInvoice={this.state.activeTab} />
        <div className="dashboard-wrapper inner-main-contaner settings">
          <div
            className={`mobile_side_menu ${
              this.state.isMenuOpen ? 'open' : null
            } `}
          >
            <i class="fas fa-bars" onClick={this.onMobileMenuHandler}></i>
          </div>

          {dataComponent &&
            dataComponent[0] &&
            dataComponent[0].mainSidebar !== 'Manage Number' &&
            dataComponent[0].mainSidebar !== 'AddNumbers' &&
            dataComponent[0].mainSidebar !== 'SetCampaign' && (
              <InnerSideBar
                dataInnerMenu={dataComponent}
                tabs={dataInnerTabs}
                isMenuOpen={this.state.isMenuOpen}
                onMobileclickMenuHandler={this.onMobileclickMenuHandler}
                dataTabs={dataInnerTabsMenu}
                activeComponent={this.state.activeComponent}
                handleData={this.handleData}
                handleTabData={this.handleTabData}
              />
            )}
          <div className="tab-wrapper">
            {dataInnerTabs.length > 0 && (
              <InnerTabs
                tabs={dataInnerTabs}
                dataTabs={this.state.activeTab}
                handleTabData={this.handleTabData}
              />
            )}
            <div className="activeComponent-wrapper ">
              <ActiveTabComponent
                widget={this.state.widget}
                loading={this.handleLoading}
                activeTab={this.state.activeTab}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Settings
