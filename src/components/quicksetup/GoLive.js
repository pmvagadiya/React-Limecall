import React from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'

import goLiveRocket from '../../assets/images/goliverocket.svg'
import CommonButtons from '../../common/CommonButtons'
import { CommonNotify } from '../../common/CommonNotify'

const GoLive = () => {

  const history = useHistory()
  const skipOnboarding = () => {
    const apiToken = localStorage.getItem('access_token')
    const url = `${process.env.REACT_APP_BASE_APP_URL}/api/v1/user/skip-onboarding`
    let head = {
      headers: {
        Authorization: 'Bearer ' + apiToken
      }
    }
    axios
      .post(url, {}, head)
      .then(res => {
        CommonNotify('Successfully updated', 'success')
        history.push('/home')
      })
      .catch(err => {})
  }
  return (
    <div className="golive">
      <div className="golive-content">
        <img src={goLiveRocket} alt="" />
        <p className="golive-title">You are good to go</p>
        <p className="golive-subtitle">It's time to grow with Limecall</p>
        <p className="golive-desc">
          I would like a one to one personalized demo
        </p>
        <div className="golive-btn-holder">
          <CommonButtons
            content="Go to Dashboard"
            background="blue"
            btnClass="btn-modal-style"
            onClick={() => skipOnboarding()}
          />
          <CommonButtons
            onClick={() => window.open("https://limecall.com/demo/")}
            content="Book a demo"
            background="alt-blue"
            btnClass="btn-modal-style"
          />
        </div>
        <p className="golive-anchor">
          Alternatively, <a href="#">Invite teammates</a>,
          <a href="#"> set up a prompt </a>
          or
          <a href="#"> choose a plan</a>
        </p>
      </div>
    </div>
  )
}

export default GoLive
