import React from 'react'
import CommonInput from '../../common/CommonInput'
import CommonSelect from '../../common/CommonSelect'

import iconEmail from '../../assets/images/Dashboard 2-08.png'

export const WidgetNotificationTitle = () => (
  <div className="accordion-widget-holder">
    <div className="accordion-image-holder">
      <img src={iconEmail} alt="logo" />
    </div>
    <div className="accordion-title-holder">
      <h2 className="accordion-title">Email, Notification and Time zone.</h2>
      <p className="accordion-description">
        Customize your notifications, set personalized Time zone and more.
      </p>
    </div>
  </div>
)

export const WidgetNotificationContent = ({
  onChangeSelect,
  handleGroupBtnData,
  onChangeInput
}) => {
  return <div className="email-timezone-wrapper">
    <div className="general-content-wrapper">
      <div className="general-content-holder">
        <p className="general-content-title">Email Notification</p>
        <p className="general-content-desc">
          Notification will be sent to this email ("," can be used to separate
          multiple email recipients)
          </p>
      </div>
      <div className="general-content-holder-right">
        <CommonInput
          onChange={onChangeInput}
          name="widgetEmail"
          type="text"
        />
      </div>
    </div>
    <div className="general-content-wrapper">
        <div className="general-content-holder">
          <p className="general-content-title">Timezone</p>
          <p className="general-content-desc">Adjust your working hours.</p>
        </div>
        <div className="general-content-holder-right">
          <CommonSelect
            onChange={onChangeSelect}
            className="timezone-select"
            name="timezone"
            options={[' ', 'America/New york']}
          />
        </div>
      </div>
  </div>
}
