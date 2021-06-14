import React, { useState } from 'react'
import 'react-phone-number-input/style.css'
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input'

function CallerIdMeetsYours() {
  const [phoneNumber, setPhoneNumber] = useState();

  function setPhoneNumber1(value) {
    setPhoneNumber(value)
  }

  return (
    <div className="callerID-settings-wrapper callerID-meets-wrapper">
      <p className="callerID-title">Your number</p>
      <PhoneInput
        displayInitialValueAsLocalNumber={true}
        defaultCountry="US"
        placeholder="Enter your number"
        value={phoneNumber}
        onChange={(value) => setPhoneNumber1(value)}
        error={phoneNumber ? (isValidPhoneNumber(phoneNumber) ? undefined : 'Invalid phone number') : 'Phone number required'}
      />
    </div>
  )
}

export default CallerIdMeetsYours
