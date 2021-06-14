import React from 'react'

import CommonInput from '../../common/CommonInput'
import CommonButton from '../../common/CommonButtons'

const IntegrationMonitor = () => {
  return (
    <div className="integration-input-btn-holder">
      <CommonInput
        name="integrationInput"
        type="text"
        placeholder="Integrate Limecall with apps and services you already use."
        background="gray"
      />
      <CommonButton
        content="Go to Integration Monitor"
        background="blue"
        btnClass="btn-integration"
      />
    </div>
  )
}

export default IntegrationMonitor
