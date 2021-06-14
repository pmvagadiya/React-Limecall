import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import 'react-semantic-ui-datepickers/dist/react-semantic-ui-datepickers.css'

import Title from '../common/Title'
import CommonButton from '../common/CommonButtons'

import leadLogo from '../assets/images/lead-logo.svg'

import iconCall from '../assets/images/Dashboard 2-04.png'

class Leads extends Component {
  render() {
    const title = {
      type: 'image',
      titleOne: leadLogo,
      titleTwo: 'Conversations'
    }

    return (
      <div className="conversation-container">
        <Title data={title} />
        <div className="widget-banner-container">
          <div className="conversation-content-holder conversations-section">
            <div className="welcome-section">
              <div className="welcome-holder">
                <div className="welcome-image-holder">
                  <img src={iconCall} alt="logo" />
                </div>
                <div className="welcome-text-holder">
                  <h2 className="banner-title">Good Morning Andrew</h2>
                  <p className="banner-description">
                    Time to ace those Conversations
                  </p>
                  <Link to="conversationContent">
                    <CommonButton
                      btnClass="btn-start sky-blue"
                      content="Start New Conversation"
                    />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Leads
