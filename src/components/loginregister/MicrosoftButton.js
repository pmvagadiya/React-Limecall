import React, { Fragment } from 'react'

import CommonButton from '../../common/CommonButtons'

const MicrosoftButton = props => {
  const { content } = props

  return (
    <Fragment>
      <CommonButton btnClass="login-with login-microsoft" content={content} />
    </Fragment>
  )
}

export default MicrosoftButton
