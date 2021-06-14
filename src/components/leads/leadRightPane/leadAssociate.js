import React from 'react'
import assignAgentIcon from '../../../assets/images/add-contact.png'
import QualifyFooter from './QualifyFooter'

const LeadAssociate = ({ leadData, leadScore }) => {
  const leads = leadData?.lead?.member

  return (
    <div className="associationsTab">
      <div className="associationBoxes">
        <div className="associationWrap">
          <div className="profileContain">
            <div className="profileAssociation">
              <label>{leads?.first_name?.charAt(0)}</label>
            </div>
            <div className="detailAssociation">
              <h4>{leads?.first_name}</h4>
              <p>{leads?.temp_phone_number}</p>
              <p>{leads?.email}</p>
            </div>
          </div>

          <div className="leadAssociation">
            <div className="leadeDetail">
              <span></span>
              <label>{leads?.score}</label>
            </div>
            <div className="leadIcon">
              <img class="" src={assignAgentIcon} alt="" />
            </div>
          </div>
        </div>
      </div>
      <QualifyFooter leadData={leadData.lead} leadScore={leadScore}/>
    </div>
  )
}

export default LeadAssociate
