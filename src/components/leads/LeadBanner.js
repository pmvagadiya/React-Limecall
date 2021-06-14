import React from 'react'

import LeadLogo from '../../assets/images/lead-logo.svg'

const WidgetBanner = () => {
  return (
    <div className="widget-banner">
      <div className="banner-icon">
        <img src={LeadLogo} alt="icon" />
      </div>
      <div className="banner-description-wrapper">
        <h1 className="banner-title">Leads</h1>
        <p className="banner-description">
          Help your customers by calling them, now or at some other scheduled time
        </p>
      </div>
    </div>
  )
}

export default WidgetBanner
