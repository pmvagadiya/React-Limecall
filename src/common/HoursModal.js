import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Modal } from 'semantic-ui-react'

import callLogPic from '../assets/images/call-log.svg'
import callLogActive from '../assets/images/Dashboard-86.png'
import helpActive from '../assets/images/Dashboard-14.png'
import helpinActive from '../assets/images/Asset 19.svg'

import knowledgeInactive from '../assets/images/Dashboard-15.png'
import knowledgeActive from '../assets/images/Asset 21.svg'
import writeInactive from '../assets/images/Dashboard-16.png'
import writeActive from '../assets/images/Asset 24.svg'

import callbackInactive from '../assets/images/Dashboard-17.png'
import callbackActive from '../assets/images/Asset 26.svg'

const HoursModal = () => {
  const [open, setOpen] = useState(false)
  // const [callLog, setCallLog] = useState(callLogPic)
  const [help, setHelp] = useState(helpinActive)
  const [knowledge, setKnowledge] = useState(knowledgeInactive)
  const [write, setWrite] = useState(writeInactive)
  const [callback, setCallBack] = useState(callbackInactive)

  const close = () => setOpen(false)

  const onCloseModal = () => {
    const profile = document.querySelector('.profile-wrapper')
    if (profile) {
      profile.parentNode.parentNode.parentNode.click()
    }
  }

  const handleModalOpen = () => {
    onCloseModal()
    setOpen(!open)
  }

  return (
    <div className="miniModal">
      <Modal
        className="mini-modal nav_mini_profile"
        size="mini"
        open={open}
        onClose={close}
        trigger={
          <img
            src={open === false ? callLogPic : callLogActive}
            onClick={handleModalOpen}
            alt="img"
          />
        }
      >
        <Modal.Content>
          <div className="hours-call-wrapper">
            <div className="hours-call-holder">
              <a href="https://help.limecall.com/en/" target="__blank">
                <img
                  src={help}
                  onMouseEnter={e => {
                    setHelp(helpActive)
                  }}
                  onMouseOut={() => {
                    setHelp(helpinActive)
                  }}
                  alt="help"
                />
                <p
                  className="hours-title"
                  onMouseEnter={e => {
                    setHelp(helpActive)
                  }}
                  onMouseOut={() => {
                    setHelp(helpinActive)
                  }}
                >
                  Help Documentation
                </p>
              </a>
            </div>
            {/* <div className="hours-call-holder">
              <Link to="#">
                <img
                  src={knowledge}
                  onMouseEnter={e => {
                    setKnowledge(knowledgeActive)
                  }}
                  onMouseOut={() => {
                    setKnowledge(knowledgeInactive)
                  }}
                  alt="knowledge"
                />
                <p
                  className="hours-title"
                  onMouseEnter={e => {
                    setKnowledge(knowledgeActive)
                  }}
                  onMouseOut={() => {
                    setKnowledge(knowledgeInactive)
                  }}
                >
                  Knowledgebase/FAQ's
                </p>
              </Link>
            </div> */}
            <div className="hours-call-holder">
              <a
                href="https://forms.monday.com/forms/5cc59fdaff1da448a669a841c4b5ac89?r=use1"
                target="__blank"
              >
                <img
                  src={write}
                  onMouseEnter={e => {
                    setWrite(writeActive)
                  }}
                  onMouseOut={() => {
                    setWrite(writeInactive)
                  }}
                  alt="write"
                />
                <p
                  className="hours-title"
                  onMouseEnter={e => {
                    setWrite(writeActive)
                  }}
                  onMouseOut={() => {
                    setWrite(writeInactive)
                  }}
                >
                  Write to us
                </p>
              </a>
            </div>
            {/* <div className="hours-call-holder">
                <Link to="#">
                  <img src={callback} alt="callback" />
                  <p
                    onMouseEnter={e => {
                      setCallBack(callbackActive)
                    }}
                    onMouseOut={() => {
                      setCallBack(callbackInactive)
                    }}
                    className="hours-title"
                  >
                    Request a callback
                  </p>
                </Link>
              </div> */}
          </div>
        </Modal.Content>
      </Modal>
    </div>
  )
}

export default HoursModal
