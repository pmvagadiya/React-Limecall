import React, { Fragment } from 'react'

import info from '../../assets/images/info.png'

const IntegrationnSearch = () => {
  return (
    <Fragment>
      <p className="integration-create-text">Create New Integrations</p>
      <div className="integration-text-holder">
        <p className="integration-text">
          <img src={info} alt="logo" />
          Pick the app, which you want to integrate with your account
        </p>
      </div>
    </Fragment>
  )
}

export default IntegrationnSearch
