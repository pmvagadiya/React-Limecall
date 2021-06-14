import React from 'react'
import Accordion from '../../common/Accordion'
import AccordionQuickSetup from '../../common/AccordionQuickSetup'
import ContentFooter from './ContentFooter'

const Install = ({ onClick, script }) => {
  const handleDataRef = (DataRef, DataState) => {
    this.setState({
      [DataRef]: DataState
    })
  }
  return (
    <div className="install">
      <div className="install-title-wrapper">
        <h2 className="install-title">Install Limecall on your website</h2>
        {/* <p className="install-sub-title">
          Not a developer?<a href="#"> Invite your team from here</a>
        </p> */}
      </div>

      <Accordion script={script} handleDataRef={handleDataRef} />
      <ContentFooter onClick={onClick} />
    </div>
  )
}

export default Install
