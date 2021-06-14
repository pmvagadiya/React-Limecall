import React from 'react'

import iconKeep from '../../assets/images/Dashboard 2-09.png'

export const WidgetSecureTitle = () => (
  <div className="accordion-widget-holder">
    <div className="accordion-image-holder">
      <img src={iconKeep} alt="logo" />
    </div>
    <div className="accordion-title-holder">
      <h2 className="accordion-title">Keep your widget Secure</h2>
      <p className="accordion-description">
        Security, domain settings, and identity verification
      </p>
    </div>
  </div>
)

export const WidgetSecureContent = () => {
  return <h2>test</h2>
}
