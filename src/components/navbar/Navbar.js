import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import classNames from 'classnames'

import { menus } from './Menus'
import HoursModal from '../../common/HoursModal'
import ProfileModal from '../../common/ProfileModal'

const activeList = {
  activeNumbers: false,
  activeSettings: false,
  activeCirle: false,
  activePeople: false,
  activeSquare: false,
  activePhone: false,
  activeHome: false,
  activePhoneCall: false,
  activeIntegration: false,
  activeConversation: false,
  activeTasks: false,
  activeMeets: false,
  activeBilling: false
}

class Navbar extends Component {
  state = { ...activeList, activeComponent: 'MySettings', activeTab: 'account' }

  componentDidMount() {
    let urlLink = window.location.pathname
    switch (urlLink) {
      case '/':
        this.setState({ ...activeList, activeHome: true })
        break
      case '/callLog':
        this.setState({ ...activeList, activePhoneCall: true })
        break
      case '/home':
        this.setState({ ...activeList, activeHome: true })
        break
      case '/leads':
        this.setState({ ...activeList, activePhone: true })
        break
      case '/meets':
        this.setState({ ...activeList, activeMeets: true })
        break
      case '/billing':
        this.setState({ ...activeList, activeBilling: true })
        break
      case '/widgets':
        this.setState({ ...activeList, activeSquare: true })
        break
      case '/integration':
        this.setState({ ...activeList, activeIntegration: true })
        break
      case '/settings':
        this.setState({ ...activeList, activePeople: true })
        break
      case '/numbers':
        this.setState({ ...activeList, activeNumbers: true })
        break
      case '/conversation':
        this.setState({ ...activeList, activeConversation: true })
        break
      case '/tasks':
        this.setState({ ...activeList, activeTasks: true })
        break
      case '/numbers':
        this.setState({ ...activeList, activeTasks: true })
        break
      default:
        this.setState({ ...activeList })
        break
    }
  }

  changeActiveMenu(key) {
    const activeListCopy = { ...activeList }

    if (key !== 'activeSettings') {
      activeListCopy.activeSettings = false
      activeListCopy[key] = true
    } else {
      activeListCopy.activeSettings = true
      activeListCopy[key] = true
    }
    if (key === 'activePeople') {
      this.setState(
        {
          ...activeListCopy,
          activeTab: 'Team Settings',
          activeComponent: 'Team'
        },
        () => {
          return this.props.handleActive(
            this.state.activeTab,
            this.state.activeComponent
          )
        }
      )
    } else {
      this.setState(
        {
          ...activeListCopy,
          activeTab: 'Account',
          activeComponent: 'MySettings'
        },
        () => {
          return this.props.handleActive(
            this.state.activeTab,
            this.state.activeComponent
          )
        }
      )
    }
  }

  onCloseModal = () => {
    if (document.querySelector('.dimmer')) {
      document.querySelector('.dimmer').click()
    }
  }

  activeHandle = component => {
    this.onCloseModal()
    if (component === 'menuSettings') {
      this.changeActiveMenu('activeSettings')
    } else if (component === 'menuPeople') {
      this.changeActiveMenu('activePeople')
    } else if (component === 'menuNumbers') {
      this.changeActiveMenu('activeNumbers')
    } else if (component === 'menuSquare') {
      this.changeActiveMenu('activeSquare')
    } else if (component === 'menuPhone') {
      this.changeActiveMenu('activePhone')
    } else if (component === 'menuHome') {
      this.changeActiveMenu('activeHome')
    } else if (component === 'menuPhoneCall') {
      this.changeActiveMenu('activePhoneCall')
    } else if (component === 'menuConversation') {
      this.changeActiveMenu('activeConversation')
    } else if (component === 'menuTasks') {
      this.changeActiveMenu('activeTasks')
    } else if (component === 'menuMeets') {
      this.changeActiveMenu('activeMeets')
    } else if (component === 'menuBilling') {
      this.changeActiveMenu('activeBilling')
    } else {
      this.changeActiveMenu('activeCirle')
    }
  }

  render() {
    return (
      <div className="nav-container custome_nav_bar billing">
        <div className="top-nav">
          {menus.map((menu_item, index) => (
            <Link
              key={index}
              className={classNames('menu-link', {
                'nav-active': this.state[menu_item.stateKey]
              })}
              onClick={() => {
                this.activeHandle(menu_item.handle)
              }}
              to={menu_item.url}
            >
              <div className="icon-wrapper">
                <img src={menu_item.inactiveIcon} alt="icon" />
                {/* <img
                  className="inactive"
                  src={menu_item.inactiveIcon}
                  alt="icon"
                />
                <img className="active" src={menu_item.activeIcon} alt="icon" /> */}
              </div>
              <div className="hover-name-wrapper">
                <i className="fas fa-caret-left"></i>
                <p>{menu_item.hoverName}</p>
              </div>
            </Link>
          ))}
        </div>
        <div className="bottom-nav">
          <div className="menu-link">
            <div className="icon-wrapper">
              <HoursModal />
            </div>
            <div className="hover-name-wrapper">
              <i className="fas fa-caret-left"></i>
              <p>Contact Us</p>
            </div>
          </div>
          {/* <div className="menu-link">
            <div className="icon-wrapper">
              <ProfileModal name="Gift" />
            </div>
          </div> */}
          {/* <div className="menu-link">
            <div className="icon-wrapper">
              <ProfileModal name="Notification" />
            </div>
            <div className="hover-name-wrapper">
              <i className="fas fa-caret-left"></i>
              <p>Notification</p>
            </div>
          </div> */}
          <div className="menu-link">
            <div className="icon-wrapper">
              <ProfileModal name="Profile" />
            </div>
            <div className="hover-name-wrapper">
              <i className="fas fa-caret-left"></i>
              <p>Profile</p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Navbar
