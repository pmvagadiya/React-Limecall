import React, { useEffect, useState } from 'react'
import moment from 'moment'
import { Button } from 'semantic-ui-react'
import { useHistory } from 'react-router-dom'

import callLOg from '../../../assets/images/call.svg'
import priceIcon from '../../../assets/images/price-tag.svg'
import assignedIcon from '../../../assets/images/add-contact.png'
import mention from '../../../assets/images/mention.png'
import satisfaction from '../../../assets/images/satisfaction.png'
import penIcon from '../../../assets/images/pen.svg'
import QualifyFooter from './QualifyFooter'

const LeadActivities = ({ leadData, leadScore }) => {
  const leads = leadData?.logs
  const history = useHistory()
  const handelClick = () => {
    history.push(`/calldashboard?callId=${leadData?.lead?.id}`)
  }

  const groupBy = array => {
    return array.reduce((result, currentValue) => {
      let aaa = new Date(currentValue.created_at).toISOString().split('T')[0]
      ;(result[aaa] = result[aaa] || []).push(currentValue)
      return result
    }, {})
  }
  const personGroupedByColor = groupBy(leads, 'created_at')
  const dateKeys = Object.keys(personGroupedByColor)
  useEffect(() => {}, [])
  return (
    <div className="activityMainlog">
      {dateKeys?.slice(0, 3).map(d => {
        return (
          <div className="ActivityTabPart">
            <p className="title-date">{d}</p>
            <div className="Activity-section">
              {personGroupedByColor[d]?.slice(0, 3).map(res => {
                const today = moment()
                const currentdate = today.format('YYYY-MM-DD')
                return (
                  <div className="logs-section">
                    <div className="call-assign">
                      {res?.type == 'ASSIGN' ? (
                        <img src={assignedIcon} alt="" />
                      ) : (
                        ''
                      )}
                      {res?.type == 'TAG' ? <img src={priceIcon} alt="" /> : ''}
                      {res?.type == 'SCORE' ? (
                        <img src={satisfaction} alt="" />
                      ) : (
                        ''
                      )}
                      {res?.type == 'NOTE' ? <img src={penIcon} alt="" /> : ''}
                      {res?.type == 'CALL' ? <img src={callLOg} alt="" /> : ''}
                      {res?.type == 'MENTION' ? (
                        <img src={mention} alt="" />
                      ) : (
                        ''
                      )}{' '}
                      <p>{res?.type}</p>
                    </div>
                    <div className="date-and-time">
                      {moment(res?.created_at.split(' ')[0]).from(currentdate)}
                    </div>
                    <div className="assign-name">
                      {leadData?.leadData?.lead?.member?.name}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )
      })}
      {/* </div> */}

      <div className="btnSee">
        <Button onClick={handelClick}>See More</Button>
      </div>
      <QualifyFooter leadData={leadData.lead} leadScore={leadScore}/>
    </div>
  )
}

export default LeadActivities
