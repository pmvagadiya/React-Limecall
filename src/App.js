import React, { Component, Fragment, useState ,useEffect} from 'react'
import 'semantic-ui-css/semantic.min.css'
import 'rc-time-picker/assets/index.css'
import rg4js from 'raygun4js';
import history from 'history/browser';
import {
  BrowserRouter as Router,
  HashRouter,
  Route,
  Redirect,
  Switch
} from 'react-router-dom'
import ScrollToTop from 'react-router-scroll-top'
import { hot } from 'react-hot-loader'
import { AuthContext } from './components/authentication/auth'
import PrivateRoute from './components/authentication/PrivateRoute'
import classnames from 'classnames'

import Home from './containers/Home'
import Leads from './containers/Leads'
import CallDashboard from './containers/CallDashboard'
import NoRouteMatch from './containers/404'
import Navbar from './components/navbar/Navbar'
import Settings from './containers/Settings'
import Meets from './containers/Meets'
import Conversation from './containers/Conversation'
import Tasks from './containers/Tasks'
import Widgets from './containers/Widgets'
import Notification from './common/Notification'
import Register from './containers/Register'
import Login from './containers/Login'
import PasswordReset from './containers/PasswordReset'
import PasswordUpdate from './containers/PasswordUpdate'

import SignUp from './containers/SignUp'
import GetStartedLog from './containers/GetStarted'
import Numbers from './containers/Numbers'
import AddNumber from './containers/AddNumber'
import SetCampaign from './containers/SetCampaign'
import ConversationContent from './containers/ConversationContent'
import Billing from './containers/Billing'

import 'rc-color-picker/assets/index.css'
import 'react-datepicker/dist/react-datepicker.css'
import './stylesheets/main.scss'

import QuickSetup from './containers/QuickSetup'
import NotificationSettings from './components/settings/NotificationSettings'
import NotificationSide from './components/notification/NotificationSide'
import Dialer from './helpers/dialer/Dialer'
import VerifyEmail from './components/verifyemail/VerifyEmail'
import Installation from './components/settings/Installation'
import SharableLink from './components/settings/SharableLink'
import SlackRedirection from './containers/SlackRedirection'
import HubSpotRedirection from './containers/HubSpotRedirection'
import ResetPasswordToken from './containers/ResetPasswordToken'
import RequestLink from './containers/RequestLink'
require('dotenv').config();
class App extends Component {

  constructor(props) {
    super(props);

    rg4js('apiKey', '71pSno4MdPm3xJPkPP7fGA');
    rg4js('enablePulse', true);
    rg4js('enableCrashReporting', true);
    // The listener
  }

  // componentDidUpdate(prevProps) {
  //   if (this.props.location !== prevProps.location) {
  //     history.listen((location, action) => {
  //       console.log('history event triggered')
  //       rg4js('trackEvent', { type: 'pageView', path: location.pathname });
  //     });
  //   }
  // }

  existingTokens = localStorage.getItem('access_token')
  state = {
    isNotification: false,
    activeTab: 'Account',
    activeComponent: 'MySettings',
    activeNumberTab: 'Manage Number',
    activeNumberComponent: 'Manage Number',
    activeAddNumberTab: 'LocalNumbers',
    activeAddNumberComponent: 'AddNumbers',
    activeSetCampaignTab: 'Configure',
    activeSetCampaignComponent: 'SetCampaign',
    activeNotificationComponent: 'notification',
    activeNotificationTab: 'notification',
    token: this.existingTokens || null
  }

  handleActive = (activeTabData, activeComponentData) => {
    this.setState({
      activeTab: activeTabData,
      activeComponent: activeComponentData
    })
  }

  handleNumberActive = (activeTabData, activeComponentData) => {
    this.setState({
      activeNumberTab: activeTabData,
      activeNumberComponent: activeComponentData
    })
  }

  onclickCloseNotification = () => {
    let { isNotification } = this.state

    isNotification = !isNotification
    this.setState({
      isNotification
    })
  }

  render() {
    const { isNotification } = this.state
    return (
      <AuthContext.Provider value={{ token: this.existingTokens }}>
        <Router basename="/">
          <ScrollToTop onClick={this.testing}>
            <div className="App">
              {isNotification ? (
                <Notification actionEvent={this.onclickCloseNotification} />
              ) : null}
              <div
                className={classnames('main-container', {
                  'notif-active': isNotification
                })}
              >
                <Switch>
                  <Route
                    exact
                    path={[
                      '/settings',
                      '/home',
                      '/leads',
                      '/meets',
                      '/widgets',
                      '/calldashboard',
                      // '/callLog',
                      '/numbers',
                      '/addNumbers',
                      '/setCampaign',
                      '/conversation',
                      '/conversationContent',
                      '/billing',
                      '/redirect-slack',
                      '/hubspot-callback',

                      
                      '/settings/Personal/Account',
                      '/settings/Personal/Notifications',
                      '/settings/Personal/call_forwarding',
                      '/settings/Personal/Availability',
                      '/settings/Personal/Integrations',
                      '/settings/Personal/personal_link',
                    
                      '/settings/Company/Company',
                      '/settings/Company/Business_Hours',
                      '/settings/Company/Notifications',

                      '/settings/Platform/Calls',
                      '/settings/Platform/Schedules',
                      '/settings/Platform/Countries',
                      '/settings/Platform/auto_response',
                      '/settings/Platform/BlackList',
                      '/settings/Platform/caller_id',
                      '/settings/platform/call_score__tags',

                      '/settings/Team/team_settings',
                      '/settings/Team/manage_teammates',


                      '/settings/Billing/Subscription',
                      '/settings/Billing/Invoices',
                      '/settings/Billing/Usage',
                      '/settings/Billing/Billing_info',
                      '/settings/Billing/payment_methods',


                      '/settings/Integration/Integration',


                      '/settings/API/api',
                      '/settings/API/Web_hooks',

                      '/settings/Installation/Installation',
                      '/settings/Installation/Share_your_link',

                    ]}
                    render={() => {
                      return (
                        <Fragment>
                          <Navbar handleActive={this.handleActive} />
                          <Dialer/>
                               
                        {/*///////////////////////////////////////
                                   start of setting path
                            ///////////////////////////////////*/}




                          <PrivateRoute
                            exact
                            path="/settings"
                            component={() => (
                              <Settings
                                settingActiveTab = 'Account'
                                settingActiveComponent = 'Personal'
                              />
                            )}
                          />

                          <PrivateRoute
                            path="/settings/Personal/Account"
                            component={() => (
                              <Settings
                                settingActiveTab = 'Account'
                                settingActiveComponent = 'Personal'
                              />
                            )}
                          />
                          <PrivateRoute
                            path="/settings/Personal/Notifications"
                            component={() => (
                              <Settings
                                settingActiveTab = 'Notifications'
                                settingActiveComponent = 'Personal'
                              />
                            )}
                          />
                          <PrivateRoute
                            path="/settings/Personal/call_forwarding"
                            component={() => (
                              <Settings
                                settingActiveTab = 'Call Forwarding'
                                settingActiveComponent = 'Personal'
                              />
                            )}
                          />
                          <PrivateRoute
                            path="/settings/Personal/Availability"
                            component={() => (
                              <Settings
                                settingActiveTab = 'Availability'
                                settingActiveComponent = 'Personal'
                              />
                            )}
                          />
                          <PrivateRoute
                            path="/settings/Personal/Integrations"
                            component={() => (
                              <Settings
                                settingActiveTab = 'Integrations'
                                settingActiveComponent = 'Personal'
                              />
                            )}
                          />
                          <PrivateRoute
                            path="/settings/Personal/personal_link"
                            component={() => (
                              <Settings
                                settingActiveTab = 'Personal Link'
                                settingActiveComponent = 'Personal'
                              />
                            )}
                          />

                          <PrivateRoute
                            path="/settings/Company/Company"
                            component={() => (
                              <Settings
                                settingActiveTab = 'Company'
                                settingActiveComponent = 'Company'
                              />
                            )}
                          />
                          <PrivateRoute
                            path="/settings/Company/business_hours"
                            component={() => (
                              <Settings
                                settingActiveTab = 'Business Hours'
                                settingActiveComponent = 'Company'
                              />
                            )}
                          />
                          <PrivateRoute
                            path="/settings/Company/Notifications"
                            component={() => (
                              <Settings
                                settingActiveTab = 'Notifications'
                                settingActiveComponent = 'Company'
                              />
                            )}
                          />

                          <PrivateRoute
                            path="/settings/Platform/Calls"
                            component={() => (
                              <Settings
                                settingActiveTab = 'Calls'
                                settingActiveComponent = 'Platform'
                              />
                            )}
                          />
                          <PrivateRoute
                            path="/settings/Platform/Schedules"
                            component={() => (
                              <Settings
                                settingActiveTab = 'Schedules'
                                settingActiveComponent = 'Platform'
                              />
                            )}
                          />
                          <PrivateRoute
                            path="/settings/Platform/Countries"
                            component={() => (
                              <Settings
                                settingActiveTab = 'Countries'
                                settingActiveComponent = 'Platform'
                              />
                            )}
                          />
                          <PrivateRoute
                            path="/settings/Platform/auto_response"
                            component={() => (
                              <Settings
                                settingActiveTab = 'Auto Response'
                                settingActiveComponent = 'Platform'
                              />
                            )}
                          />
                          <PrivateRoute
                            path="/settings/Platform/BlackList"
                            component={() => (
                              <Settings
                                settingActiveTab = 'BlackList'
                                settingActiveComponent = 'Platform'
                              />
                            )}
                          />
                          <PrivateRoute
                            path="/settings/Platform/caller_id"
                            component={() => (
                              <Settings
                                settingActiveTab = 'Caller Id'
                                settingActiveComponent = 'Platform'
                              />
                            )}
                          />
                          <PrivateRoute
                            path="/settings/platform/call_score__tags"
                            component={() => (
                              <Settings
                                settingActiveTab = 'Call Score / Tags'
                                settingActiveComponent = 'Platform'
                              />
                            )}
                          />


                          <PrivateRoute
                            path="/settings/Team/team_settings"
                            component={() => (
                              <Settings
                                settingActiveTab = 'Team Settings'
                                settingActiveComponent = 'Team'
                              />
                            )}
                          />
                          <PrivateRoute
                            path="/settings/Team/manage_teammates"
                            component={() => (
                              <Settings
                                settingActiveTab = 'Manage Teammates'
                                settingActiveComponent = 'Team'
                              />
                            )}
                          />

                          <PrivateRoute
                            path="/settings/Billing/Subscription"
                            component={() => (
                              <Settings
                                settingActiveTab = 'Subscription'
                                settingActiveComponent = 'Billing'
                              />
                            )}
                          />
                          <PrivateRoute
                            path="/settings/Billing/Invoices"
                            component={() => (
                              <Settings
                                settingActiveTab = 'Invoices'
                                settingActiveComponent = 'Billing'
                              />
                            )}
                          />
                          <PrivateRoute
                            path="/settings/Billing/Usage"
                            component={() => (
                              <Settings
                                settingActiveTab = 'Usage'
                                settingActiveComponent = 'Billing'
                              />
                            )}
                          />
                          <PrivateRoute
                            path="/settings/Billing/Billing_info"
                            component={() => (
                              <Settings
                                settingActiveTab = 'Billing info'
                                settingActiveComponent = 'Billing'
                              />
                            )}
                          />
                          <PrivateRoute
                            path="/settings/Billing/payment_methods"
                            component={() => (
                              <Settings
                                settingActiveTab = 'Payment Methods'
                                settingActiveComponent = 'Billing'
                              />
                            )}
                          />

                          <PrivateRoute
                            path="/settings/Integration/Integration"
                            component={() => (
                              <Settings
                                settingActiveTab = 'Integration'
                                settingActiveComponent = 'Integration'
                              />
                            )}
                          />

                          <PrivateRoute
                            path="/settings/API/API"
                            component={() => (
                              <Settings
                                settingActiveTab = 'API'
                                settingActiveComponent = 'API'
                              />
                            )}
                          />
                          <PrivateRoute
                            path="/settings/API/Web_Hooks"
                            component={() => (
                              <Settings
                                settingActiveTab = 'Web Hooks'
                                settingActiveComponent = 'API'
                              />
                            )}
                          />

                          <PrivateRoute
                            path="/settings/Installation/Installation"
                            component={() => (
                              <Settings
                                settingActiveTab = 'Installation'
                                settingActiveComponent = 'Installation'
                              />
                            )}
                          />
                          <PrivateRoute
                            path="/settings/Installation/Share_your_link"
                            component={() => (
                              <Settings
                                settingActiveTab = 'Share Your Link'
                                settingActiveComponent = 'Installation'
                              />
                            )}
                          />

                        {/*///////////////////////////////////////
                                   End of setting path
                            ///////////////////////////////////*/}
                          {/* <PrivateRoute
                            path="/settings"
                            component={() => (
                              <Settings
                                activeComponent={this.state.activeComponent}
                                activeTab={this.state.activeTab}
                              />
                            )}
                          /> */}

                          <PrivateRoute path="/home" component={Home} />
                          <PrivateRoute
                            path="/conversationContent"
                            component={ConversationContent}
                          />
                          <PrivateRoute path="/tasks" component={Tasks} />
                          <PrivateRoute path="/meets" component={Meets} />
                          <PrivateRoute path="/leads" component={Leads} />
                          <PrivateRoute
                            path="/conversation"
                            component={Conversation}
                          />
                          <PrivateRoute path="/widgets" component={Widgets} />
                          <PrivateRoute
                            path="/calldashboard"
                            component={CallDashboard}
                          />
                          <PrivateRoute
                            path="/notification"
                            component={() => (
                              <NotificationSide
                                activeComponent={
                                  this.state.activeNotificationComponent
                                }
                                activeTab={this.state.activeNotificationTab}
                              />
                            )}
                          />
                          <PrivateRoute
                            path="/numbers"
                            component={() => (
                              <Numbers
                                activeComponent={
                                  this.state.activeNumberComponent
                                }
                                activeTab={this.state.activeNumberTab}
                              />
                            )}
                          />
                          <PrivateRoute
                            path="/addNumbers"
                            component={() => (
                              <AddNumber
                                activeComponent={
                                  this.state.activeAddNumberComponent
                                }
                                activeTab={this.state.activeAddNumberTab}
                              />
                            )}
                          />
                          <PrivateRoute
                            path="/setCampaign"
                            component={() => (
                              <SetCampaign
                                activeComponent={
                                  this.state.activeSetCampaignComponent
                                }
                                activeTab={this.state.activeSetCampaignTab}
                              />
                            )}
                          />
                          <PrivateRoute
                            path="/redirect-slack"
                            component={SlackRedirection}
                          />
                          <PrivateRoute
                            path="/hubspot-callback"
                            component={HubSpotRedirection}
                          />
                        </Fragment>
                      )
                    }}
                  />
                  <Route path="/" exact component={Login} />
                  <Route path="/request-link" exact component={RequestLink} />
                  <Route
                    exact
                    path="/verify/:verification_key?"
                    component={VerifyEmail}
                  />
                  <Route
                    exact
                    path="/reset-password/:token?"
                    component={ResetPasswordToken}
                  />
                  <Route path="/login" component={Login} />
                  <Route path="/signup" component={SignUp} />
                  <Route path="/getstarted" component={GetStartedLog} />
                  <PrivateRoute path="/QuickSetup" component={QuickSetup} />
                  <Route path="/forgot-password" component={PasswordReset} />
                  <Route path="/register" component={Register} />
                  <Route path="/widgetLink" component={Installation} />
                  <Route path="/widget/:id" component={SharableLink} />
                  {/* <PrivateRoute path="/billing" component={Billing} /> */}
                  {/* <Route path="/redirect-slack" component={SlackRedirection} /> */}
                </Switch>
              </div>
            </div>
          </ScrollToTop>
        </Router>
      </AuthContext.Provider>
    )
  }
}

export default hot(module)(App)
