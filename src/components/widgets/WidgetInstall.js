import React from 'react'
import iconWidget from '../../assets/images/Dashboard 2-01.png'

export const WidgetInstallTitle = () => {
  return (
    <div className="accordion-widget-holder">
      <div className="accordion-image-holder">
        <img src={iconWidget} alt="logo" />
      </div>
      <div className="accordion-title-holder">
        <h2 className="accordion-title">Install Limecall on your website</h2>
        <p className="accordion-description">
          Just one snippet of code to start turning visitors into leads
        </p>
      </div>
    </div>
  )
}
