import React from 'react'

import BannerImage from '../../assets/images/Dashboard-93.png'

const WidgetBanner = () => {
  return (
    <div className="widget-banner-main">
      <div className="banner-icon">
        <img src={BannerImage} alt="icon" />
      </div>
      <div className="banner-description-wrapper">
        {/* <h1 className="banner-title">Customize your widget</h1> */}
        <p className="banner-description">
          Personalise your widget's appearance to make it look like a part of your website
        </p>
      </div>
    </div>
  )
}

export default WidgetBanner
