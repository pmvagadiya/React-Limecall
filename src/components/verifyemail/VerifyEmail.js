import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Dimmer, Loader } from 'semantic-ui-react'
import { useHistory } from 'react-router-dom'

import { CommonNotify } from '../../common/CommonNotify'

const VerifyEmail = props => {
  const history = useHistory()
  useEffect(() => {
    fetchVerification()
  }, [])

  const [isLoading, setIsLoading] = useState(false)

  const fetchVerification = () => {
    setIsLoading(true)
    const { location } = props
    const { search } = location
    const decodeToken = decodeURIComponent(search.split('=')[1])
    const url = `${process.env.REACT_APP_BASE_APP_URL}/api/verify-user`
    const data = {
      verification_token: decodeToken
    }
    axios
      .post(url, data)
      .then(res => {
        CommonNotify('Verification Done', 'success')
        history.push('/login')
        setIsLoading(false)
      })
      .catch(err => {
        CommonNotify('Something went wrong!', 'error')
        history.push('/login')
        setIsLoading(false)
      })
  }
  return (
    <>
      <Dimmer active={isLoading}>
        <Loader />
      </Dimmer>
    </>
  )
}
export default VerifyEmail
