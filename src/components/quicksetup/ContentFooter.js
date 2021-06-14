import React from 'react'
import { useHistory } from 'react-router-dom'

import CommonButtons from '../../common/CommonButtons'

const ContentFooter = props => {
  const { onClick, disabled } = props
  const history = useHistory()
  const skipStep = () => {
    history.push('/home')
  }
  return (
    <div className="quicksetup-footer">
      <CommonButtons
        content="CONTINUE"
        background="blue"
        btnClass="btn-modal-style"
        onClick={onClick}
        disabled={props.disabled}
        loading={props.loading}
      />
      <CommonButtons
        content="Skip>>"
        background="blue"
        btnClass="btn-modal-style"
        onClick={skipStep}
      />
    </div>
  )
}

export default ContentFooter
