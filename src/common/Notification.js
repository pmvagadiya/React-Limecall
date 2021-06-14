import React from 'react'

import CommonButton from '../common/CommonButtons'

function Notification({ actionEvent }) {
  return (
    <div className="notification">
      <div className="notification-content">
        <p>LimeCall needs your permission to</p>
        <CommonButton content="Enable Desktop Notifications" />
      </div>
      <div className="notification-close">
        <button className="btn-close" onClick={actionEvent} />
      </div>
    </div>
  )
}

export default Notification
