import React, { Component } from 'react'

import anastasia from '../assets/images/anastasia.png'
import utreachLogo from '../assets/images/Dashboard-09.png'
import salesDirector from '../assets/images/Dashboard-08.png'
import CommonButtons from '../common/CommonButtons'

class GetStartedLog extends Component {
  handleGetStarted = () => {
    window.location.hash = '/quicksetup'
  }

  render() {
    return (
      <div className="get-started-log-wrapper">
        <div className="get-started-log-holder">
          <div className="title-login-holder">
            <p className="title-text">Get Started</p>
          </div>
          <div className="get-started-log-content">
            <div className="get-started-log-content-description-holder">
              <p className="get-started-log-name">Welcome, Ravi</p>
              <p className="get-started-log-content-description">
                You are less than a minute away from improving your customer
                interaction and enhancing your user’s experience. To get
                started, a developer needs to integrate the SDK into your app.
              </p>
            </div>
            <div className="register-decription-holder">
              <h2 className="register-title">Join 100+ happy Businesses...</h2>
              <p className="italic-text default-text">
                I was able to have Limecall up and running on our website within
                5 minutes. Our team got the first call within 2 hours and have
                closed the deal in 3 says. Limecall helped us convert 40% more
                sales per month by turning those passive leads to active ones.
                Our sales have gone through the roof, as we’ve drastically
                reduced the leads that fall through cracks.
              </p>
              <div className="sales-director-holder">
                <div className="director-image">
                  <img src={anastasia} alt="directorImage" />
                </div>
                <div className="director-info">
                  <p className="director-name">Anastasia Negru</p>
                  <div className="director-position-holder">
                    <div className="direction-position">
                      <img src={salesDirector} alt="logo" />
                    </div>
                    <div className="director-logo">
                      <img src={utreachLogo} alt="logo" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="footer-log-wrapper">
            <p className="help-schedule-text">
              We can Help! <a href="/login">Schedule a call</a>
            </p>

            <div className="footer-btn">
              <CommonButtons
                content="Invite a Developer"
                background="white"
                btnClass="btn-modal-style"
              />
              <CommonButtons
                onClick={this.handleGetStarted}
                content="Get Started"
                background="blue"
                btnClass="btn-modal-style"
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default GetStartedLog
