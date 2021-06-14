import React, { useEffect, useState, useCallback } from 'react'
import { Button } from 'semantic-ui-react'
import googleCalenderIcon from '../../assets/images/google-calendar.png'
import ZoomVideoCall from '../../assets/images/video-player.png'
import CommonButtons from '../../common/CommonButtons'
import ApiCalendar from 'react-google-calendar-api'

const AddConnections = () => {
  const [sign, setSign] = useState(false)
  const [email, setEmail] = useState('')

  const fetchGoogleCalendar = useCallback(async () => {
    if (sign) {
      const response = await ApiCalendar.getBasicUserProfile()
      setEmail(response.getEmail())
    }
  }, [sign])

  useEffect(() => {
    fetchGoogleCalendar()
  }, [fetchGoogleCalendar])

  useEffect(() => {
    setSign(ApiCalendar.sign)
  }, [sign])

  const handleItemClick = (_, name) => {
    if (name === 'sign-in') {
      ApiCalendar.handleAuthClick()
      ApiCalendar.onLoad(async () => {
        ApiCalendar.listenSign(signUpdate)
        await fetchGoogleCalendar()
      })
    } else if (name === 'sign-out') {
      ApiCalendar.handleSignoutClick()
      ApiCalendar.onLoad(async () => {
        ApiCalendar.listenSign(signUpdate)
        await fetchGoogleCalendar()
      })
    }
  }

  const signUpdate = sign => {
    setSign(sign)
  }

  return (
    <>
      <div className="share-your-link-wrapper integrations">
        <div className="share-your-link">
          {!sign ? (
            <div className="connect-block">
              <span className="google-logo">
                <img src={googleCalenderIcon} alt="google-calendar" />
              </span>
              <span>Google Calendar</span>
              <CommonButtons
                type="button"
                content="Connect"
                background="blue"
                onClick={e => handleItemClick(e, 'sign-in')}
              />
            </div>
          ) : (
            <>
              <div className="disconnect-block">
                <div className="text-wrapper">
                  <span className="google-logo">
                    <img src={googleCalenderIcon} alt="google-calendar" />{' '}
                  </span>
                  <div className="google-email">
                    <span>Google Calendar</span>
                    <span>{email}</span>
                  </div>
                </div>
                <div className="drop-down">
                  <Button onClick={e => handleItemClick(e, 'sign-out')}>
                    Disconnect
                  </Button>
                </div>
              </div>
              <div class="configuration">
                <h2>Configuration</h2>
                <div className="config-content">
                  <div className="config-left">
                    <img src={googleCalenderIcon} alt="google-calendar" />
                    <div className="check-conflicts">
                      <b>Check for conflicts</b>
                      <p>
                        Set the calendar(s) to check for conflicts to prevent
                        double bookings.
                      </p>
                    </div>
                  </div>
                  <div className="config-right">
                    <span className="google-logo">
                      <img src={googleCalenderIcon} alt="google-calendar" />{' '}
                    </span>
                    <div className="check-email">
                      <span>Check {email}</span>
                      <li>{email}</li>
                    </div>
                  </div>
                </div>
                <div className="config-content">
                  <div className="config-left">
                    <img src={googleCalenderIcon} alt="google-calendar" />
                    <div className="check-conflicts">
                      <b>Add to calendar</b>
                      <p>
                        Set the calendar you would like to add new events to as
                        they’re scheduled.
                      </p>
                    </div>
                  </div>
                  <div className="config-right">
                    <span className="google-logo">
                      <img src={googleCalenderIcon} alt="google-calendar" />{' '}
                    </span>
                    <div className="check-email">
                      <span>Add {email}</span>
                      <li>{email}</li>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
        {/* <div className="share-your-link"> 
          <div className="text-wrapper">
            <p>
              <span className="zoom-logo ">
                <img src={ZoomVideoCall} alt="zoomIcon" />{' '}
              </span>
              Zoom video conferencing
            </p>
            <p className="subtext">
              Connect your Zoom account to instantly add a Zoom link to your
              Limecall meetings.
            </p>
            <span className="link-text">Learn more</span>
          </div>
          <div className="drop-down">
            <Button className="zoom-button">Disconnect</Button>
          </div>
        </div>
      */}
        </div>
    </>
  )
}

export default AddConnections
