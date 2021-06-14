import React, { Fragment } from 'react'

import salesDirector from '../../assets/images/Dashboard-08.png'
import utreachLogo from '../../assets/images/Dashboard-09.png'
import anastasia from '../../assets/images/anastasia.png'
import utreachGreyLogo from '../../assets/images/Dashboard-03.png'
import finder from '../../assets/images/finder.png'
import freshRocket from '../../assets/images/freshrocket.png'
import madri from '../../assets/images/madri.png'
import support from '../../assets/images/support.png'

export const RegisterDescription = () => {
  return (
    <Fragment>
      <h2 className="register-title">Join 100+ happy Businesses...</h2>
      <p className="italic-text default-text">
        "I was able to have Limecall up and running on our website within 5
        minutes. Our team got the first call within 2 hours and have closed the
        deal in 3 says. Limecall helped us convert 40% more sales per month by
        turning those passive leads to active ones. Our sales have gone through
        the roof, as we’ve drastically reduced the leads that fall through
        cracks.”
      </p>
      <div className="sales-director-holder">
        <div className="director-image">
          <img src={anastasia} alt="directorImage" />
        </div>
        <div className="director-info">
          <p className="director-name">Anastasia Negru</p>
          <div className="director-position-holder">
            <div className="direction-position">
              <img src={salesDirector} alt="logo" />
            </div>
            <div className="director-logo">
              <img src={utreachLogo} alt="logo" />
            </div>
          </div>
        </div>
      </div>
      <div className="trustedby-holder">
        <p className="trusted-text">Trusted By</p>
        <div className="trusted-logo-holder">
          <img src={utreachGreyLogo} alt="logo" />
          <img src={finder} alt="logo" />
          <img src={support} alt="logo" />
          <img src={madri} alt="logo" />
          <img src={freshRocket} alt="logo" />
        </div>
      </div>
    </Fragment>
  )
}
