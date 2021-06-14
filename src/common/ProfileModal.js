import React, { useState, useEffect } from 'react'

import { Link } from 'react-router-dom'
import { Modal } from 'semantic-ui-react'
// import { useHistory } from 'react-router-dom'

import avatar from '../assets/images/Dashboard-27.png'
import avatarBox from '../assets/images/Dashboard-25.png'
import arrow from '../assets/images/Dashboard-33.png'
import notification from '../assets/images/icon-notification.png'
import gift from '../assets/images/icon-wedding-gift.png'
import { getSubscription } from '../config/subscription'

export const logOut = () => {
  localStorage.clear()
  localStorage.clear();
  window.location.href = '/login';
}

const ProfileModal = props => {
  // const history = useHistory()
  const [open, setOpen] = useState(false)
  const [image, setImage] = useState(avatar)
  const [nextBill, setNextBill] = useState('')
  const [tokenNA, setTokenNA] = useState(false)

  const first_name = localStorage.getItem('first_name')
  const last_name = localStorage.getItem('last_name')
  const role = localStorage.getItem('role')
  const apiToken = localStorage.getItem('access_token')

  useEffect(() => {
    if (props.name === 'Profile') setImage(avatar)
    if (props.name === 'Gift') setImage(gift)
    if (props.name === 'Notification') setImage(notification)
  }, [image])

  useEffect(() => {    
    if (apiToken == null) {
      localStorage.clear()
      window.location.replace('/login')
    }
    getSubscription()
      .then(res => {
        const obj = {}
        const d = res.data.data

        const months = [
          'Jan',
          'Feb',
          'Mar',
          'Apr',
          'May',
          'Jun',
          'Jul',
          'Aug',
          'Sep',
          'Oct',
          'Nov',
          'Dec'
        ]

        obj.ends = d.current_term_end
        if (d.status == 'in_trial') {
          obj.ends = d.trial_end
        }
        //obj.ends = new Date(obj.ends)
        let dt = obj.ends.split(' ')
        dt = dt[0]

        let dts = dt.split('-')
        dts[1] = parseInt(dts[1]) - 1

        dt = dts[2] + '  ' + months[dts[1]] + ' ' + dts[0]       

        setNextBill(dt)
      })
      .catch(err => console.error(err))
  }, [])

  const close = () => setOpen(false)

  const onCloseModal = () => {
    const profile = document.querySelector('.hours-call-wrapper')
    if (profile) {
      profile.parentNode.parentNode.parentNode.click()
    }
  }

  const goingToAccount = () => {
    setOpen(!open)
  }


  const handleModalOpen = () => {
    onCloseModal()
    setOpen(!open)
  }

  return (
    <>
      <div className="mini-profile">
        <Modal
          className="mini-profile nav_mini_profile"
          size="mini"
          open={open}
          onClose={close}
          trigger={<img src={image} onClick={handleModalOpen} alt="img" />}
        >
          <Modal.Content>
            <div className="profile-wrapper">
              <div className="profile-link-wrapper">
                <a
                  href="https://changelog.limecall.com/?utm_medium=dashboard"
                  target="__blank"
                  className="link-holder"
                >
                  <p className="profile-link-text">
                    {' '}
                    What's New in LimeCall ?{' '}
                  </p>{' '}
                </a>{' '}
                <a
                  href="https://forms.monday.com/forms/5cc59fdaff1da448a669a841c4b5ac89?r=use1"
                  target="__blank"
                  className="link-holder"
                >
                  <p className="profile-link-text"> Give Feedback </p>{' '}
                </a>{' '}
              </div>{' '}
              <div className="profile-content-wrapper">
                <div className="profile-avatar-holder">
                  <img src={avatarBox} alt="avatar" />
                </div>{' '}
                <div className="profile-content-holder">
                  <p className="profile-name"> {first_name} </p>{' '}
                  <p className="profile-email"> {role ? role : 'Admin'} </p>{' '}
                  <p className="edit-profile">
                    {' '}
                    <Link to="/settings" onClick={goingToAccount}>
                      {' '}
                      Edit Profile{' '}
                    </Link>
                  </p>
                </div>{' '}
              </div>{' '}
              <div className="profile-plan-wrapper">
                <p className="plan-avail"> Starter Plan </p>{' '}
                <p className="plan-expiration"> Next billing at {nextBill} </p>{' '}
                <p className="manage-profile">
                  {' '}
                  <Link to="/settings" onClick={goingToAccount}>
                    {' '}
                    Manage Account{' '}
                  </Link>
                </p>
              </div>{' '}
              <div className="sign-out-wrapper">
                <img src={arrow} alt="arrow" />
                <div className="sign-out-text-holder">
                  <p className="sign-out-text">
                    {' '}
                    <Link onClick={logOut}> Log Out </Link>
                  </p>
                </div>{' '}
              </div>{' '}
            </div>{' '}
          </Modal.Content>{' '}
        </Modal>{' '}
      </div>
    </>
  )
}

export default ProfileModal
