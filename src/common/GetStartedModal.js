import React, { useState } from 'react'
import { Modal } from 'semantic-ui-react'
import classnames from 'classnames'

import circle from '../assets/images/circle.png'
import circleCheck from '../assets/images/circle-check.png'
import arrow from '../assets/images/Dashboard-21.png'
import writeIcon from '../assets/images/Dashboard-35.png'
import getStartedBanner from '../assets/images/Dashboard-41.png'

const GetStartedModal = ({ counter, onClickCheckList, data }) => {
  const [open, setOpen] = useState(false)

  const handleModalOpen = () => {
    setOpen(true)
  }

  const handleModalClose = () => {
    setOpen(false)
  }

  return (
    <div className="getstarted-wrapper">
      <Modal
        className="getstarted-modal"
        onClick={handleModalOpen}
        onClose={handleModalClose}
        open={open}
        trigger={
          <button
            className="home-card-button sky-blue"
            onClick={handleModalOpen}
          >
            View Task
          </button>
        }
      >
        <Modal.Content>
          <div className="getstarted-banner-wrapper">
            <div className="getstarted-banner-holder">
              <h2 className="getstarted-banner-title">
                Getting Started Checklist
              </h2>
              <div className="getstarted-banner-text-holder">
                <img src={writeIcon} alt="icon" />
                <p className="getstarted-banner-text">
                  {counter}/5 tasks Complete
                </p>
              </div>
            </div>
            <div className="getstarted-banner-holder">
              <div className="getstarted-banner-img-box">
                <img src={getStartedBanner} alt="banner" />
              </div>
            </div>
          </div>
          <div className="getstarted-content-wrapper">
            <div className="getstarted-content-holder">
              <div
                className={classnames('getstarted-content-item', {
                  getstartedInActive: data[0].createAccount === true
                })}
              >
                <img
                  className="circle-check"
                  src={data[0].createAccount === true ? circleCheck : circle}
                  alt="icon"
                  onClick={onClickCheckList}
                  id="createAccount"
                />
                <div onClick={onClickCheckList} id="createAccount">
                  1. Create a free LimeCall Account
                </div>
                <img
                  className={classnames('title-arrow', {
                    arrowOpacity: data[0].createAccount === true
                  })}
                  src={arrow}
                  alt="arrow"
                />
              </div>
              <p className="getstarted-content-desc">
                Setup your account information and create password
              </p>
            </div>
            <div className="getstarted-content-holder">
              <div
                className={classnames('getstarted-content-item', {
                  getstartedInActive: data[0].setYourSite === true
                })}
              >
                <img
                  onClick={onClickCheckList}
                  id="setYourSite"
                  className="circle-check"
                  src={data[0].setYourSite === true ? circleCheck : circle}
                  alt="icon"
                />
                <div onClick={onClickCheckList} id="setYourSite">
                  2. Set your site's welcome message
                </div>

                <img
                  className={classnames('title-arrow', {
                    arrowOpacity: data[0].setYourSite === true
                  })}
                  src={arrow}
                  alt="arrow"
                />
              </div>
              <p className="getstarted-content-desc">
                Setup your account information and create a password
              </p>
            </div>
            <div className="getstarted-content-holder">
              <div
                className={classnames('getstarted-content-item', {
                  getstartedInActive: data[0].installDrift === true
                })}
              >
                <img
                  onClick={onClickCheckList}
                  id="installDrift"
                  className="circle-check"
                  src={data[0].installDrift === true ? circleCheck : circle}
                  alt="icon"
                />
                <div onClick={onClickCheckList} id="installDrift">
                  3. Install Drift on your website
                </div>
                <img
                  className={classnames('title-arrow', {
                    arrowOpacity: data[0].installDrift === true
                  })}
                  src={arrow}
                  alt="arrow"
                />
              </div>
              <p className="getstarted-content-desc">
                Setup your account information and create passowrd
              </p>
            </div>
            <div className="getstarted-content-holder">
              <div
                className={classnames('getstarted-content-item', {
                  getstartedInActive: data[0].completeProfile === true
                })}
              >
                <img
                  onClick={onClickCheckList}
                  id="completeProfile"
                  className="circle-check"
                  src={data[0].completeProfile === true ? circleCheck : circle}
                  alt="icon"
                />
                <div onClick={onClickCheckList} id="completeProfile">
                  4. Complete your online Profile
                </div>
                <img
                  className={classnames('title-arrow', {
                    arrowOpacity: data[0].completeProfile === true
                  })}
                  src={arrow}
                  alt="arrow"
                />
              </div>
              <p className="getstarted-content-desc">
                Setup your account information and create passowrd
              </p>
            </div>
            <div className="getstarted-content-holder">
              <div
                className={classnames('getstarted-content-item', {
                  getstartedInActive: data[0].setOfficeHours === true
                })}
              >
                <img
                  onClick={onClickCheckList}
                  id="setOfficeHours"
                  className="circle-check"
                  src={data[0].setOfficeHours === true ? circleCheck : circle}
                  alt="icon"
                />
                <div onClick={onClickCheckList} id="setOfficeHours">
                  5. Set your online / office hours
                </div>

                <img
                  className={classnames('title-arrow', {
                    arrowOpacity: data[0].setOfficeHours === true
                  })}
                  src={arrow}
                  alt="arrow"
                />
              </div>
              <p className="getstarted-content-desc">
                Setup your account information and create passowrd
              </p>
            </div>
          </div>
        </Modal.Content>
      </Modal>
    </div>
  )
}
export default GetStartedModal
