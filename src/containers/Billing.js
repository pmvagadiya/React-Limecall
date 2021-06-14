import React, { useState } from 'react'
import { Dimmer, Loader } from 'semantic-ui-react'
import BillingInfo from '../components/settings/BillingInfo'

function Billing() {
  const [isLoading, setIsLoading] = useState(false)

  const changeLoadingState = state => {
    setIsLoading(state)
  }
  return (
    <div className="billing_wrapper">
      <Dimmer active={isLoading}>
        <Loader />
      </Dimmer>
      <BillingInfo loading={changeLoadingState} />
    </div>
  )
}

export default Billing
