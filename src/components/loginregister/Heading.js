import React from 'react'
import { Image } from 'semantic-ui-react'

import loginLogo from '../../assets/images/logo-limecall.svg'

const Heading = props => {
  const { title } = props

  return (
    <div className="login-header">
      <div className="login-logo">
        <div className="logo">
          <Image src={loginLogo} />
        </div>
      </div>
      <p className="login-header-title">{title}</p>
    </div>
  )
}

export default Heading
