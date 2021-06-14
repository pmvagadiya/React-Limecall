import React from 'react'
import { Tab, Dropdown } from 'semantic-ui-react'

import LeadAboutRight from './leadAbout'
import LeadInsight from './leadInsight'
import LeadActivities from './leadActivity'
import LeadAssociate from './leadAssociate'
import closeIcon1 from '../../../assets/images/closeIcon1.png'
import gmailIcon from '../../../assets/images/gmail.svg'
import targetIcon from '../../../assets/images/target.svg'
import dotIcon from '../../../assets/images/dot.svg'
import userIcon from '../../../assets/images/user.svg'
import rightArrow from '../../../assets/images/right-arrow.png'
import leftArrow from '../../../assets/images/left-arrow.png'
import callIcon from '../../../assets/images/call.svg'
import {
  onChangeOwner,
  onLeadScoreHandler,
  onStatusChangeHandler,
  setLeadStage
} from '../../../config/leadAPI'
const ownerDropdown = [
  {
    key: 1,
    text: 'Assigned',
    value: 1
  },
  {
    key: 2,
    text: 'Qualified',
    value: 2
  },
  {
    key: 3,
    text: 'Negotiation',
    value: 3
  },
  {
    key: 4,
    text: 'Won',
    value: 4
  },
  {
    key: 5,
    text: 'Lost',
    value: 5
  }
]
const callStatus = [
  {
    key: 1,
    text: 'Awaiting',
    value: 1
  },
  {
    key: 2,
    text: 'Recieved',
    value: 2
  },
  {
    key: 3,
    text: 'Suspended',
    value: 3
  }
]
const rightPanes = [
  {
    menuItem: `About`,
    render: ({ leadData, stateOptions, leadOwner, leadScore }) => (
      <LeadAboutRight
        leadData={leadData}
        stateOptions={stateOptions}
        leadOwner={leadOwner}
        leadScore={leadScore}
      />
    )
  },
  {
    menuItem: 'Associations',
    render: ({leadData, leadScore}) => <LeadAssociate leadData={leadData} leadScore={leadScore}/>
  },
  {
    menuItem: 'Insights',
    render: ({leadData, leadScore}) => <LeadInsight leadData={leadData}  leadScore={leadScore}/>
  },
  {
    menuItem: 'Activities',
    render: ({leadData, leadScore}) => <LeadActivities leadData={leadData}  leadScore={leadScore}/>
  }
]

const RightPane = ({
  rightPane,
  handleRightClose,
  leadData,
  leadOwner,
  leadScore,
  handleRightPaneOpen,
  nextLeadId,
  prevLeadId
}) => {
  const leadAbout = leadData?.lead


  console.info(leadScore)
  console.info(leadAbout?.score, "lead score")

  const onStageValueChanged = data => {
    console.log(data.target)   
  }


  return (
    <div>
      <div className={rightPane ? 'callModel rightPopUp' : 'callModel'}>
        <div className="detail-title">
          <div className="titleCall">
            <img
              src={leftArrow}
              onClick={() => handleRightPaneOpen(prevLeadId)}
            />
            <h5>Lead Detail - ( {leadAbout?.id} )</h5>
            <img
              src={rightArrow}
              onClick={() => handleRightPaneOpen(nextLeadId)}
            />
          </div>
          <div className="detail-title-icon">
            <img src={closeIcon1} onClick={handleRightClose} />
          </div>
        </div>
        <div className="aboutSubpopup">
          <div className="detail-popup-profile">
            <div className="detailHeadProfile">
              <div className="popUpHead">
                <img
                  src="https://picsum.photos/200/300"
                  style={{
                    height: '40px',
                    width: '40px',
                    borderRadius: '31px'
                  }}
                />
              </div>
              <div className="popUpDetail">
                <div className="callDetail ">
                  <div className="Iconlabel">
                    <img alt="" src={callIcon} />
                    <label>Type</label>
                  </div>

                  <p style={{fontSize: "13px"}}>{leadAbout?.type} </p>
                </div>
                <div className="callDetail">
                  <div className="Iconlabel">
                    <img alt="" src={callIcon} />
                    <label>Phone</label>
                  </div>
                  <p>{leadAbout?.contact?.phone_number}</p>
                </div>
                <div className="callDetail ">
                  <div className="Iconlabel">
                    <img alt="" src={gmailIcon} />
                    <label>Email</label>
                  </div>
                  <p className="email-text">{leadAbout?.contact?.email}</p>
                </div>
                <div className="callDetail">
                  <div className="Iconlabel">
                    <img alt="" src={userIcon} />
                    <label>Owner</label>
                  </div>                 
                  <Dropdown
                    options={leadOwner}
                    placeholder="Lead Owner"
                    basic
                    
                    defaultValue={
                      leadAbout?.owner_id === null
                        ? leadAbout?.interseted
                        : leadAbout?.owner_id
                    }
                    onChange={(e, dat) => onChangeOwner(e, dat, leadAbout?.id)}
                  />
                </div>
                <div className="callDetail">
                  <div className="Iconlabel">
                    <img alt="" src={targetIcon} />
                    <label>Status</label>
                  </div>
                  <Dropdown
                    placeholder="Lead Status"
                    options={callStatus}
                    defaultValue={leadAbout?.status === null ? '' : leadAbout?.status}
                    onChange={(e, dat) =>
                      onStatusChangeHandler(e, dat, leadAbout.id)
                    }
                  />
                </div>
                <div className="callDetail">
                  <div className="Iconlabel">
                    <img alt="" src={dotIcon} />
                    <label>Score</label>
                  </div>

                  <Dropdown
                    placeholder="Lead Score"
                    options={leadScore}
                    defaultValue={leadAbout?.score}
                    onChange={(e, dat) =>
                      onLeadScoreHandler(e, dat, leadAbout.id)
                    }
                  />
                </div>

                <div className="callDetail">
                  <div className="Iconlabel">
                    <img alt="" src={dotIcon} />
                    <label>Stage</label>
                  </div>

                  <Dropdown
                    options={ownerDropdown}
                    placeholder="Assigned"
                    defaultValue={leadAbout?.stage}
                    onChange={values => setLeadStage(466, values)}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="contact-popup-detail">
            <Tab
              menu={{ secondary: true, pointing: true }}
              panes={rightPanes}
              leadData={leadData}
              leadOwner={leadOwner}
              leadScore={leadScore}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default RightPane
