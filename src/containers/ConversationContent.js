import React, { Component, useState } from 'react'
import { Image, Modal } from 'semantic-ui-react'
import {
  Label,
  Menu,
  Tab,
  Icon,
  Dropdown,
  Input,
  TextArea,
  Sidebar,
  Segment,
  Popup,
  Accordion,
  Form,
  Progress
} from 'semantic-ui-react'
import PropTypes from 'prop-types'

import Title from '../common/Title'
import NodeCheckbox from '../common/NodeCheckbox'
import CommonButtons from '../common/CommonButtons'
import CommonSelect from '../common/CommonSelect'
import CommonInput from '../common/CommonInput'

import leadLogo from '../assets/images/lead-logo.svg'
import circlePlus from '../assets/images/cicle-plus.png'
import deleteIcon from '../assets/images/delete-icon.png'
import checkIcon from '../assets/images/checkList.png'
import { find } from 'lodash-es'

class Leads extends Component {
  state = {
    activeQualification: 0,
    activeIndex: 0,
    activeIndexMessage: 0,
    activeItemMessage: 0,
    activeItemMenu: 0,
    activeItem: 'inbox',
    isModalOpen: false,
    isModalMessageOpen: false,
    animation: 'overlay',
    direction: 'right',
    dimmed: false,
    visible: false,
    animationSearch: 'overlay',
    directionSearch: 'right',
    dimmedSearch: false,
    visibleSearch: false,
    animationCall: 'overlay',
    directionCall: 'bottom',
    dimmedCall: false,
    visibleCall: false,
    animationContact: 'overlay',
    directionContact: 'center',
    dimmedContact: false,
    visibleContact: true,
    setOfficeHour2: {
      addOfficeHour2: '',
      link: 'Link',
      officeHourFrom: '',
      officeHourTo: ''
    },
    addOfficeHour2: [1],
    setNote: {
      addNote: '',
      link: 'Link',
      officeHourFrom: '',
      officeHourTo: ''
    },
    addNote: [1],
    chosenEmoji: '',
    setChosenEmoji: ''
  }

  handleNoteChange = e => {
    this.setState({ note: e.target.value })
  }

  handleItemClickMessage = i => this.setState({ activeItemMessage: i })

  handleItemClickMenu = i => this.setState({ activeItemMenu: i })

  cloneSetHoursWrapper2 = () => {
    const currentDiv2 = this.state.addOfficeHour2
    currentDiv2.push(1)
    this.setState({ addOfficeHour2: currentDiv2 })
  }

  onClickAddOfficeHour2 = () => {
    const { setOfficeHour2 } = this.state
    const link = this.state.setOfficeHour2.link
    const officeHourFrom = this.state.setOfficeHour2.officeHourFrom
    const officeHourTo = this.state.setOfficeHour2.officeHourTo
    const addOfficeHour2 = 'addOfficeHour2'
    const addOfficeHourItem2 = link + ' ' + officeHourFrom + ' ' + officeHourTo

    setOfficeHour2[addOfficeHour2] = addOfficeHourItem2

    this.setState({ setOfficeHour2 })

    this.cloneSetHoursWrapper2()
  }

  onClickRemoveOfficeHours2 = () => {
    const currentDiv2 = this.state.addOfficeHour2
    currentDiv2.pop()
    this.setState({ addOfficeHour2: currentDiv2 })
  }

  cloneAddNote = () => {
    const currentDiv3 = this.state.addNote
    currentDiv3.push(1)
    this.setState({ addNote: currentDiv3 })
  }

  onClickAddNote = () => {
    const { setNote } = this.state
    const link = this.state.setNote.link
    const officeHourFrom = this.state.setNote.officeHourFrom
    const officeHourTo = this.state.setNote.officeHourTo
    const addNote = 'addNote'
    const addOfficeHourItem2 = link + ' ' + officeHourFrom + ' ' + officeHourTo

    setNote[addNote] = addNote

    this.setState({ setNote })

    this.cloneAddNote()
  }

  onClickRemoveNote = () => {
    const currentDiv3 = this.state.addNote
    currentDiv3.pop()
    this.setState({ addNote: currentDiv3 })
  }

  handleAnimationChange = animation => () =>
    this.setState(prevState => ({ animation, visible: !prevState.visible }))

  handleAnimationChangeSearch = animationSearch => () =>
    this.setState(prevState => ({
      animationSearch,
      visibleSearch: !prevState.visibleSearch
    }))

  handleAnimationChangeCall = animationCall => () =>
    this.setState(prevState => ({
      animationCall,
      visibleCall: !prevState.visibleCall
    }))

  handleAnimationChangeContact = animationContact => () =>
    this.setState(prevState => ({
      animationContact,
      visibleContact: !prevState.visibleContact
    }))

  handleClick = (e, titleProps) => {
    const { index } = titleProps
    const { activeIndex } = this.state
    const newIndex = activeIndex === index ? -1 : index

    this.setState({ activeIndex: newIndex })
  }
  handleQualification = (e, titleProps) => {
    const { index } = titleProps
    const { activeQualification } = this.state
    const newIndex = activeQualification === index ? -1 : index

    this.setState({ activeQualification: newIndex })
  }
  handleClickMessage = (e, titleProps) => {
    const { index } = titleProps
    const { activeIndexMessage } = this.state
    const newIndex = activeIndexMessage === index ? -1 : index

    this.setState({ activeIndexMessage: newIndex })
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  handleChangeAssign = (event, data) => { 
    this.setState({ selectedValueAssign: data.value })
  }

  handleChangePriority = (event, data) => {  
    this.setState({ selectedValuePriority: data.value })
  }

  handleChangeNumber = (event, data) => {   
    this.setState({ selectedValueNumber: data.value })
  }

  handleModal = () => {
    let { isModalOpen, cardSummary } = this.state

    isModalOpen = !isModalOpen
    cardSummary = false
    this.setState({ isModalOpen, cardSummary })
  }

  handleModalMessage = () => {
    let { isModalMessageOpen, cardSummary } = this.state

    isModalMessageOpen = !isModalMessageOpen
    cardSummary = false
    this.setState({ isModalMessageOpen, cardSummary })
  }

  handleCloseModal = () => this.setState({ isModalOpen: false })
  handleCloseModalMessage = () => this.setState({ isModalOpen: false })

  onEmojiClick = emojiObject => {
    this.setState({ setChosenEmoji: emojiObject })
  }

  render() {
    const {
      activeIndex,
      activeItem,
      activeIndexMessage,
      activeItemMessage,
      activeItemMenu,
      isModalOpen,
      isModalMessageOpen,
      dimmed,
      visible,
      animation,
      direction,
      dimmedSearch,
      visibleSearch,
      animationSearch,
      directionSearch,
      dimmedCall,
      visibleCall,
      animationCall,
      directionCall,
      dimmedContact,
      visibleContact,
      animationContact,
      directionContact,
      vertical,
      chosenEmoji,
      setChosenEmoji
    } = this.state

    const title = {
      type: 'image',
      titleOne: leadLogo,
      titleTwo: 'Conversations'
    }

    const assignTo = [
      {
        key: 'Sales',
        text: 'Sales',
        value: 'Sales'
      },
      {
        key: 'Time',
        text: 'Time',
        value: 'Time'
      }
    ]

    const priority = [
      {
        key: 'Close',
        text: 'Close',
        value: 'Close'
      },
      {
        key: 'Open',
        text: 'Open',
        value: 'Open'
      }
    ]

    const number = [
      {
        key: '(812)701-3838',
        text: '(812)701-3838',
        value: '(812)701-3838'
      },
      {
        key: '(812)701-3839',
        text: '(812)701-3839',
        value: '(812)701-3839'
      }
    ]

    const menuDetails = [
      {
        icon: 'user',
        title: 'Myself',
        active: true
      },
      {
        icon: 'user circle',
        title: 'Syed',
        active: false
      },
      {
        icon: 'user circle',
        title: 'Rifad',
        active: false
      },
      {
        icon: 'user outline',
        title: 'Unassigned',
        active: false
      },
      {
        icon: 'users',
        title: 'All',
        active: false
      },
      {
        icon: 'shopping bag',
        title: 'Sales',
        active: false
      },
      {
        icon: 'bullhorn',
        title: 'Marketing',
        active: false
      }
    ]

    const panes = [
      {
        menuItem: (
          <Menu.Item>
            <Dropdown
              item
              text="Assigned To"
              open={activeIndex === 0}
              index={0}
              onClick={this.handleClick}
            >
              <Dropdown.Menu>
                {menuDetails.map((item, i) => {
                  return (
                    <span>
                      {item.active === true ? (
                        <Dropdown.Item active>
                          <Icon name={item.icon} key={i} /> {item.title}
                        </Dropdown.Item>
                      ) : (
                        <Dropdown.Item>
                          <Icon name={item.icon} key={i} /> {item.title}
                        </Dropdown.Item>
                      )}
                    </span>
                  )
                })}
              </Dropdown.Menu>
            </Dropdown>
          </Menu.Item>
        )
      }
    ]

    const messageItem = [
      { menuItem: 'Tab 1', render: () => <Tab.Pane>Tab 1 Content</Tab.Pane> },
      { menuItem: 'Tab 2', render: () => <Tab.Pane>Tab 2 Content</Tab.Pane> },
      { menuItem: 'Tab 3', render: () => <Tab.Pane>Tab 3 Content</Tab.Pane> }
    ]

    const dataMessage = [
      {
        number: '(812)701-3838',
        date: 'Apr 9',
        latestMessage: 'Hello User001 here at limecall, We make your...',
        dataMessageContent: [
          {
            sender: [
              {
                message1: 'Lorem ipsum',
                message2: 'Lorem ipsum dolor sir amet'
              }
            ],
            receiver: [
              {
                message1: 'Lorem ipsum',
                message2: 'Lorem ipsum dolor sir amet'
              }
            ]
          }
        ]
      },
      {
        number: '(812)701-3838',
        date: 'Apr 9',
        latestMessage: 'Missed Call',
        dataMessageContent: [
          {
            sender: [
              {
                message1: 'Lorem ipsum test',
                message2: 'Lorem ipsum dolor sir amet test'
              }
            ],
            receiver: [
              {
                message1: 'Lorem ipsum test',
                message2: 'Lorem ipsum dolor sir amet test'
              }
            ]
          }
        ]
      }
    ]

    const dataMessageUnread = [
      {
        number: '(812)701-3838',
        date: 'Apr 9',
        latestMessage: 'Hello User001 here at limecall, We make your...',
        dataMessageContent: [
          {
            sender: [
              {
                message1: 'Lorem ipsum',
                message2: 'Lorem ipsum dolor sir amet'
              }
            ],
            receiver: [
              {
                message1: 'Lorem ipsum',
                message2: 'Lorem ipsum dolor sir amet'
              }
            ]
          }
        ]
      }
    ]

    const dataMessageDone = [
      {
        number: '(812)701-3838',
        date: 'Apr 9',
        latestMessage: 'Missed Call',
        dataMessageContent: [
          {
            sender: [
              {
                message1: 'Lorem ipsum test',
                message2: 'Lorem ipsum dolor sir amet test'
              }
            ],
            receiver: [
              {
                message1: 'Lorem ipsum test',
                message2: 'Lorem ipsum dolor sir amet test'
              }
            ]
          }
        ]
      }
    ]

    const userDetails = {
      name: 'Ghiyast H',
      location: 'Jakarta, Indonesia',
      time: '11:46pm',
      phone: '+1-234-345-456-5544',
      email: 'ghiyasth@gmail.com',
      ipAddress: '112.234.456.65',
      lastSeen: 'Jan 31, 2020 2:32pm',
      created: 'Jan 31, 2020 2:32pm',
      session: '01',
      push: ''
    }

    const searchDetails = [
      {
        name: 'Daryl James'
      },
      {
        name: 'Alexander Mathue'
      },
      {
        name: 'Samantha Disuza'
      }
    ]

    const messages = [
      {
        menuItem: 'Inbox',
        render: () => (
          <div>
            <Menu fluid vertical tabular>
              {dataMessage.map((item, i) => {
                return (
                  <Menu.Item
                    active={activeItemMessage === i}
                    onClick={() => this.handleItemClickMessage(i)}
                    key={i}
                    id={i}
                  >
                    <div className="message-holder">
                      <div className="message-user">
                        <Icon name="user circle" />
                      </div>
                      <div className="message-content">
                        <div className="message-numdate">
                          <p>{item.number}</p>
                          <p className="message-date">{item.date}</p>
                        </div>
                        <span>{item.latestMessage}</span>
                      </div>
                    </div>
                  </Menu.Item>
                )
              })}
            </Menu>
          </div>
        )
      },
      {
        menuItem: 'Unread',
        render: () => (
          <div>
            <Menu fluid vertical tabular>
              {dataMessageUnread.map((item, i) => {
                return (
                  <Menu.Item
                    active={activeItemMessage === i}
                    onClick={() => this.handleItemClickMessage(i)}
                    key={i}
                    id={i}
                  >
                    <div className="message-holder">
                      <div className="message-user">
                        <Icon name="user circle" />
                      </div>
                      <div className="message-content">
                        <div className="message-numdate">
                          <p>{item.number}</p>
                          <p className="message-date">{item.date}</p>
                        </div>
                        <span>{item.latestMessage}</span>
                      </div>
                    </div>
                  </Menu.Item>
                )
              })}
            </Menu>
          </div>
        )
      },
      {
        menuItem: 'Done',
        render: () => (
          <div>
            <Menu fluid vertical tabular>
              {dataMessageDone.map((item, i) => {
                return (
                  <Menu.Item
                    active={activeItemMessage === i}
                    onClick={() => this.handleItemClickMessage(i)}
                    key={i}
                    id={i}
                  >
                    <div className="message-holder">
                      <div className="message-user">
                        <Icon name="user circle" />
                      </div>
                      <div className="message-content">
                        <div className="message-numdate">
                          <p>{item.number}</p>
                          <p className="message-date">{item.date}</p>
                        </div>
                        <span>{item.latestMessage}</span>
                      </div>
                    </div>
                  </Menu.Item>
                )
              })}
            </Menu>
          </div>
        )
      }
    ]
    const ChatSendContent = [
      {
        menuItem: 'Reply',
        render: () => (
          <>
            <div className="replyTab">
              <TextArea placeholder="Joe Dude, this one is for you! A bug within the team settings." />
              <div className="message-save">
                <div className="message-footer-items">
                  <div className="content-icons">
                    <Icon name="clipboard outline" />
                    <Icon name="file audio outline" />
                    <Icon name="attach" />
                    <Icon name="smile outline" />
                    <Icon name="tag" />
                  </div>
                  <CommonButtons content="Reply" background="green" />
                </div>
              </div>
            </div>
          </>
        )
      },
      {
        menuItem: 'Note',
        render: () => (
          <>
            <div className="replyTab">
              <TextArea placeholder="Joe Dude, this one is for you! A bug within the team settings." />
              <div className="message-save">
                <div className="message-footer-items">
                  <div className="content-icons">
                    <Icon name="clipboard outline" />
                    <Icon name="file audio outline" />
                    <Icon name="attach" />
                    <Icon name="smile outline" />
                    <Icon name="tag" />
                  </div>
                  <CommonButtons content="Add Note" background="green" />
                </div>
              </div>
            </div>
          </>
        )
      }
    ]
    const SizeForm = (
      <div className="info-details">
        <div className="info-main">
          <div className="progressLabel">
            <label>6/10 complete</label>
          </div>
          <div>
            <Progress
              percent={60}
              size="tiny"
              color="green"
              className="progressBar"
            />
          </div>
          <div className="info-item">
            <div className="checkWrap">
              <Image src={checkIcon} />
            </div>
            <p>Name</p>
            <span>James Hernandes</span>
          </div>
          <div className="info-item">
            <div className="checkWrap">
              <Image src={checkIcon} />
            </div>
            <p>Email</p>
            <span>{userDetails.email}</span>
          </div>
          <div className="info-item">
            <div className="checkWrap">
              <Image src={checkIcon} />
            </div>
            <p>Phone</p>
            <span>{userDetails.phone}</span>
          </div>
          <div className="info-item">
            <div className="checkWrap">
              <Image src={checkIcon} />
            </div>
            <p>Company Name</p>
            <span>Zencity</span>
          </div>
          <div className="info-item">
            <div className="checkWrap">
              <Image src={checkIcon} />
            </div>
            <p>Number of Employee</p>
            <span>Add</span>
          </div>
          <div className="info-item">
            <div className="checkWrap">
              <Image src={checkIcon} />
            </div>
            <p>Status</p>
            <span>Add</span>
          </div>
          <div className="info-item">
            <div className="checkWrap">
              <Image src={checkIcon} />
            </div>
            <p>Company Website</p>
            <span>WWW.Zencity.io</span>
          </div>
          <div className="info-item">
            <div className="checkWrap">
              <Image src={checkIcon} />
            </div>
            <p>Your Business Model</p>
            <span>Add</span>
          </div>
          <div className="info-item">
            <div className="checkWrap">
              <Image src={checkIcon} />
            </div>
            <p>Industry</p>
            <Input placeholder="Add industry" />
          </div>
          <div className="info-item">
            <div className="checkWrap">
              <Image src={checkIcon} />
            </div>
            <p>Company Size</p>
            <span>350</span>
          </div>
        </div>
      </div>
    )

    return (
      <div className="conversation-container">
        <Title data={title} />
        <div className="widget-banner-container">
          <div className="conversation-content-holder content-left">
            <Tab
              menu={{ fluid: true, vertical: true, tabular: true }}
              panes={panes}
              className="conversation-tab"
            />
            <div className="conversation-content">
              <div className="conversation-content-holder ">
                <div className="content-header">
                  <div className="content-text">
                    <Dropdown
                      className="icon add-filter"
                      options={number}
                      value={this.state.selectedValueNumber}
                      onChange={this.handleChangeNumber}
                      placeholder="(812)701-3838"
                      icon="chevron down"
                    />
                    {/* <h2>(812)701-3838  <Icon name="chevron down"/></h2> */}

                    <div className="content-icons">
                      {/* <Icon name="tty" onClick={this.handleModal}/> */}
                      <Icon
                        name="comment alternate outline"
                        onClick={this.handleModalMessage}
                      />
                    </div>
                  </div>
                  <div>
                    <Tab
                      menu={{ secondary: true, pointing: true }}
                      panes={messages}
                    />
                  </div>
                </div>
              </div>
            </div>
            <Sidebar.Pushable as={Segment} className="main-segment">
              <div className="conversation-content-messages-info-holder">
                <Sidebar
                  animation={animationContact}
                  direction={directionContact}
                  visible={visibleContact}
                  className="sidebar-contact"
                >
                  <div className="conversation-content-info">
                    <div className="content-user">
                      <div className="icon-holder">
                        <Icon name="user circle" />
                        <p>{userDetails.name}</p>
                      </div>
                      <div className="icon-holder-share">
                        {/* <div className="share-holder">
                        <Icon name="share alternate"/> Share
                      </div> */}
                        <div className="menu-holder">
                          <Icon name="ellipsis horizontal" />
                        </div>
                      </div>
                    </div>
                    <div className="content-info">
                      <div className="info-name">
                        <Icon name="pencil alternate" />
                      </div>
                      <div className="info-location">
                        <Icon name="map marker alternate" />
                        <p>{userDetails.location}</p>
                      </div>
                      <div className="info-location">
                        <Icon name="clock" />
                        <p>{userDetails.time} - Local Time</p>
                      </div>
                    </div>
                    <div className="contact-details">
                      <div className="info-details">
                        <div className="info-head">
                          <p>
                            Contact Details <Icon name="info circle" />
                          </p>
                        </div>
                        <div className="info-main">
                          <div className="info-item">
                            <p>Phone</p>
                            <span>{userDetails.phone}</span>
                          </div>
                          <div className="info-item">
                            <p>Email</p>
                            <span>{userDetails.email}</span>
                          </div>
                          <div className="info-item">
                            <p>IP</p>
                            <span>{userDetails.ipAddress}</span>
                          </div>
                        </div>
                      </div>
                      <div className="info-details">
                        <div className="info-head">
                          <p>
                            Attribute Details <Icon name="info circle" />
                          </p>
                        </div>
                        <div className="info-main">
                          <div className="info-item">
                            <p>Last seen</p>
                            <span>{userDetails.lastSeen}</span>
                          </div>
                          <div className="info-item">
                            <p>Created</p>
                            <span>{userDetails.created}</span>
                          </div>
                          <div className="info-item">
                            <p>Sessions</p>
                            <span>{userDetails.session}</span>
                          </div>
                          <div className="info-item">
                            <p>Push</p>
                            <span>{userDetails.push}</span>
                          </div>
                        </div>
                      </div>
                      <div className="qualification">
                        <Accordion
                          as={Menu}
                          vertical
                          className="qualificationWrap"
                        >
                          <Menu.Item>
                            <Accordion.Title
                              active={this.state.activeQualification === 0}
                              content="Qualification"
                              index={0}
                              onClick={this.handleQualification}
                            />
                            <Accordion.Content
                              active={this.state.activeQualification === 0}
                              content={SizeForm}
                            />
                          </Menu.Item>
                        </Accordion>
                      </div>

                      <div className="info-note">
                        {this.state.addNote.map((data, index) => {
                          return (
                            <div className="info-note-item">
                              <span key={index}>{this.state.note}</span>
                              {index !== 0 ? (
                                <CommonButtons
                                  onClick={this.onClickRemoveNote}
                                  disabled={index === 0 ? 'disabled' : ''}
                                  btnClass="btn-delete"
                                  image={deleteIcon}
                                />
                              ) : null}
                            </div>
                          )
                        })}
                        <div className="add-contact-new info-note-add">
                          <CommonInput
                            name="companyName"
                            type="text"
                            inputStyle="input-company"
                            placeholder="Write a note..."
                            value={this.state.note}
                            onChange={this.handleNoteChange}
                          />
                          <CommonButtons
                            onClick={this.onClickAddNote}
                            btnClass="btn-hours"
                            image={circlePlus}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </Sidebar>
                <Sidebar
                  animation={animation}
                  direction={direction}
                  visible={visible}
                >
                  <div className="add-contact">
                    <h2>Add Contact</h2>
                    {this.state.addOfficeHour2.map((data, index) => {
                      return (
                        <div className="add-contact-inputs">
                          <div className="add-contact-holder">
                            <div className="add-contact-item">
                              <p className="title">First name</p>
                              <CommonInput
                                name="companyName"
                                type="text"
                                inputStyle="input-company"
                              />
                            </div>
                            <div className="add-contact-item">
                              <p className="title">Last name</p>
                              <CommonInput
                                name="companyName"
                                type="text"
                                inputStyle="input-company"
                              />
                            </div>
                            <div className="add-contact-item">
                              <p className="title">Company</p>
                              <CommonInput
                                name="companyName"
                                type="text"
                                inputStyle="input-company"
                              />
                            </div>
                            <div className="add-contact-item">
                              <p className="title">Role</p>
                              <CommonSelect
                                name="link"
                                className="set-hours-select"
                                options={[' ', 'Role 1', 'Role 2', 'Role 3']}
                              />
                            </div>
                            <div className="add-contact-item add-contact-item-type">
                              <p className="title">Type</p>
                              <CommonSelect
                                name="link"
                                className="set-hours-select"
                                options={[' ', 'Role 1', 'Role 2', 'Role 3']}
                              />
                            </div>
                            <div className="add-contact-item add-contact-item-phone">
                              <p className="title">Phone number</p>
                              <CommonInput
                                name="companyName"
                                type="text"
                                inputStyle="input-company"
                              />
                            </div>
                            <div className="add-contact-item add-contact-item-email">
                              <p className="title">Email</p>
                              <CommonInput
                                name="companyName"
                                type="text"
                                inputStyle="input-company"
                              />
                            </div>
                          </div>
                          <div className="add-contact-user">
                            <Icon name="user"></Icon>
                          </div>
                          {index !== 0 ? (
                            <CommonButtons
                              onClick={this.onClickRemoveOfficeHours2}
                              disabled={index === 0 ? 'disabled' : ''}
                              btnClass="btn-delete"
                              image={deleteIcon}
                            />
                          ) : null}
                        </div>
                      )
                    })}
                    <div className="add-contact-new">
                      <CommonButtons
                        onClick={this.onClickAddOfficeHour2}
                        btnClass="btn-hours"
                        image={circlePlus}
                      />{' '}
                      Add a new item
                    </div>
                    <div className="add-contact-button">
                      <CommonButtons
                        btnClass="btn-start sky-blue"
                        content="Save"
                      />
                      <CommonButtons
                        btnClass="btn-start light"
                        content="Cancel"
                      />
                    </div>
                  </div>
                </Sidebar>
                <Sidebar
                  animation={animationSearch}
                  direction={directionSearch}
                  visible={visibleSearch}
                >
                  <div className="add-contact add-contact-search">
                    <CommonInput
                      placeholder="Search by name or number"
                      name="companyName"
                      type="text"
                      inputStyle="input-company"
                    />
                    <div className="square"></div>
                    <div className="contact-items">
                      {searchDetails.map((item, i) => {
                        return (
                          <p>
                            <div className="square"></div>
                            {item.name}
                          </p>
                        )
                      })}
                    </div>
                  </div>
                </Sidebar>
                <Sidebar.Pusher>
                  <Segment basic className="message-segment">
                    {visibleContact ? (
                      <div className="conversation-content-messages auto-width">
                        <div className="conversation-content-messages-holder">
                          <div className="content-text">
                            <div className="content-assign">
                              <span>Assign to:</span>
                              <Dropdown
                                className="icon add-filter"
                                options={assignTo}
                                value={this.state.selectedValueAssign}
                                onChange={this.handleChangeAssign}
                                placeholder="Sales"
                              />
                            </div>
                            <div className="content-assign">
                              <span>Priority:</span>
                              <Dropdown
                                className="icon add-filter"
                                options={priority}
                                value={this.state.selectedValuePriority}
                                onChange={this.handleChangePriority}
                                placeholder="Closed"
                              />
                            </div>
                            <div className="content-icons">
                              {/* <Icon name="phone" disabled={vertical} onClick={this.handleAnimationChangeCall()}/> */}
                              {/* <Icon name="phone"/>
                          <Icon name="comment alternate outline"/> */}
                              <Icon name="ban" className="icon-message" />
                              {/* <Icon name="check"/> */}
                              <Popup
                                trigger={
                                  <Icon name="check" className="icon-message" />
                                }
                                content="Mark as done"
                                position="bottom center"
                              />
                            </div>
                          </div>
                          <div className="content-message-date">
                            <p>
                              <span>April 9</span>
                            </p>
                          </div>
                          <div className="content-message-body">
                            <div className="message-content">
                              {dataMessage[
                                activeItemMessage
                              ].dataMessageContent.map((data, x) => {
                                return (
                                  <div key={x}>
                                    <div className="message-text message-send">
                                      <div className="chatMessages">
                                        {data.sender.map((finData, y) => {
                                          return (
                                            <>
                                              <div className="chatTime">
                                                <div className="message-text-holder">
                                                  <p key={y}>
                                                    {finData.message1}
                                                  </p>
                                                </div>
                                                <label>01:30 PM</label>
                                              </div>
                                              <div className="messageProfile">
                                                <label>A</label>
                                              </div>
                                            </>
                                          )
                                        })}
                                      </div>
                                    </div>
                                    <div className="message-text message-receive">
                                      <div className="chatMessages">
                                        {data.receiver.map((finData, y) => {
                                          return (
                                            <>
                                              <div className="messageProfile">
                                                <label>A</label>
                                              </div>
                                              <div className="chatTime">
                                                <div className="message-text-holder">
                                                  <p>{finData.message1}</p>
                                                </div>
                                                <label>01:30 PM</label>
                                              </div>
                                            </>
                                          )
                                        })}
                                      </div>
                                    </div>
                                  </div>
                                )
                              })}
                            </div>
                            <div className="message-footer">
                              {/* <TextArea placeholder="Shift + enter to add new line" /> */}
                              <Tab
                                menu={{ secondary: true, pointing: true }}
                                panes={ChatSendContent}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="conversation-content-messages min-width">
                        <div className="conversation-content-messages-holder">
                          <div className="content-text">
                            <div className="content-assign">
                              <span>Assign to:</span>
                              <Dropdown
                                className="icon add-filter"
                                options={assignTo}
                                value={this.state.selectedValueAssign}
                                onChange={this.handleChangeAssign}
                                placeholder="Sales"
                              />
                            </div>
                            <div className="content-assign">
                              <span>Priority:</span>
                              <Dropdown
                                className="icon add-filter"
                                options={priority}
                                value={this.state.selectedValuePriority}
                                onChange={this.handleChangePriority}
                                placeholder="Closed"
                              />
                            </div>
                            <div className="content-icons">
                              {/* <Icon name="phone" disabled={vertical} onClick={this.handleAnimationChangeCall()}/> */}
                              {/* <Icon name="phone"/>
                          <Icon name="comment alternate outline"/> */}
                              <Icon name="ban" className="icon-message" />
                              {/* <Icon name="check"/> */}
                              <Popup
                                trigger={
                                  <Icon name="check" className="icon-message" />
                                }
                                content="Mark as done"
                                position="bottom center"
                              />
                            </div>
                          </div>
                          <div className="content-message-date">
                            <p>
                              <span>April 9</span>
                            </p>
                          </div>
                          <div className="content-message-body">
                            <div className="message-content">
                              {dataMessage[
                                activeItemMessage
                              ].dataMessageContent.map((data, x) => {
                                console.log(data)
                                return (
                                  <div key={x}>
                                    <div className="message-text message-send">
                                      <div className="message-text-holder">
                                        {data.sender.map((finData, y) => {
                                          console.log(finData)
                                          return (
                                            <>
                                              <p key={y}>{finData.message1}</p>
                                            </>
                                          )
                                        })}
                                      </div>
                                    </div>
                                    <div className="message-text message-receive">
                                      <div className="message-text-holder">
                                        {data.receiver.map((finData, y) => {
                                          return <p>{finData.message1}</p>
                                        })}
                                      </div>
                                    </div>
                                  </div>
                                )
                              })}
                            </div>
                            <div className="message-footer">
                              <TextArea placeholder="Shift + enter to add new line" />
                              <div className="message-save">
                                <div className="message-footer-items">
                                  <div className="content-icons">
                                    <Icon name="clipboard outline" />
                                    <Icon name="file audio outline" />
                                    <Icon name="attach" />
                                    <Icon name="smile outline" />
                                    <Icon name="tag" />
                                  </div>
                                  <CommonButtons
                                    content="Send"
                                    background="green"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </Segment>
                </Sidebar.Pusher>
              </div>
            </Sidebar.Pushable>
            <div className="conversation-content-tab">
              <div className="content-icons">
                <Icon
                  name="user outline"
                  disabled={vertical}
                  onClick={this.handleAnimationChangeContact('uncover')}
                />
                {/* <Icon name="setting"/> */}
                <Icon
                  name="add user"
                  disabled={vertical}
                  onClick={this.handleAnimationChange()}
                />
                <Icon
                  name="search"
                  disabled={vertical}
                  onClick={this.handleAnimationChangeSearch()}
                />
              </div>
            </div>
            <Modal
              className="conversation-content-modal"
              open={isModalOpen}
              onClose={this.handleCloseModal}
            >
              <Modal.Header>
                <h2>Make a Call</h2>
                <i
                  onClick={this.handleModal}
                  className="fa fa-times"
                  aria-hidden="true"
                ></i>
              </Modal.Header>
              <Modal.Content scrolling>
                <p>Find a contact or enter a new phone number </p>
                <Input placeholder="Enter a number or phone number" />
                <div className="modal-enter">
                  <p>
                    Press <span>enter</span> to call
                  </p>
                  <CommonButtons btnClass="btn-start sky-blue" content="Call" />
                </div>
              </Modal.Content>
            </Modal>
            <Modal
              className="conversation-content-modal"
              open={isModalMessageOpen}
              onClose={this.handleCloseModalMessage}
            >
              <Modal.Header>
                <h2>New Message</h2>
                <i
                  onClick={this.handleModalMessage}
                  className="fa fa-times"
                  aria-hidden="true"
                ></i>
              </Modal.Header>
              <Modal.Content scrolling>
                <p>Find a contact or enter a new phone number </p>
                <Input placeholder="Enter a number or phone number" />
                <div className="modal-enter">
                  <p>
                    Press <span>enter</span> to call
                  </p>
                  <CommonButtons
                    btnClass="btn-start sky-blue"
                    content="Message"
                  />
                </div>
              </Modal.Content>
            </Modal>
          </div>
        </div>
      </div>
    )
  }
}

export default Leads
