import React from 'react'
import { Image } from 'semantic-ui-react'

import uteach from '../../assets/images/utreachplus.svg'
import finder from '../../assets/images/finder.svg'
import support from '../../assets/images/support.svg'
import freshrocket from '../../assets/images/freshrocket.svg'
import madridblues from '../../assets/images/madridblues.svg'

const LoginFooter = () => {
  return (
    <div className="login-footer">
      <p className="login-companies">Trusted by top companies</p>
      <ul className="login-logos">
        <li className="login-footer-logo">
          <Image src={uteach} />
        </li>
        <li className="login-footer-logo">
          <Image src={finder} />
        </li>
        <li className="login-footer-logo">
          <Image src={support} />
        </li>
        <li className="login-footer-logo">
          <Image src={madridblues} />
        </li>
        <li className="login-footer-logo">
          <Image src={freshrocket} />
        </li>
      </ul>
    </div>
  )
}

export default LoginFooter
