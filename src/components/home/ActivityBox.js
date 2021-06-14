import React, { useState, useEffect } from 'react'
import CardBox from '../../common/CardBox'
import axios from 'axios'
import moment from 'moment'

const apiToken = localStorage.getItem('access_token')

const cardboxData = [
  {
    type: 'flatRate',
    title: 'Avg. Lead Response Time',
    callLog: '00',
    callSup: 's'
  },
  {
    type: 'flatRate',
    title: 'AGENT ANSWER RATE',
    callLog: '00%'
  },
  {
    type: 'flatRate',
    title: 'CUSTOMER ANSWER RATE',
    callLog: '00%'
  },
  {
    type: 'flatRate',
    title: 'Avg Call Duration',
    callLog: '00',
    callSup: 's'
  }
]

const toplead = {
  type: 'topLead',
  title: 'Top Lead Generating Pages'
}

const usage = [
  {
    type: 'usage',
    title: 'Calls',
    usageLog: '0'
    //usageDescription: 'in this subscription period'
  },
  {
    type: 'usage',
    title: 'Message',
    usageLog: '0'
    //usageDescription: 'in this subscription period'
  },
  {
    type: 'usage',
    title: 'Upcomming Call',
    usageLog: '0'
    //usageDescription: 'in this subscription period'
  }
]

const ActivityBox = ({ date, loading }) => {
  const [boxData, setBoxData] = useState(cardboxData)
  useEffect(() => {
    if (date) {
      const updated = cardboxData.map(item => {
        // eslint-disable-next-line default-case
        switch (item.title) {
          case 'Avg. Lead Response Time':

            return { ...item, callLog: Number.isInteger(date.lead_response_time) ? date.lead_response_time : (date.lead_response_time).toFixed(2) }
          case 'AGENT ANSWER RATE':
            return { ...item, callLog: Number.isInteger(date.agent_answer_rate) ? date.agent_answer_rate : (date.agent_answer_rate).toFixed(2) }
          case 'CUSTOMER ANSWER RATE':
            return { ...item, callLog: Number.isInteger(date.customer_answer_rate) ? date.customer_answer_rate : (date.customer_answer_rate).toFixed(2) }
          case 'Avg Call Duration':
            return { ...item, callLog: date.average_duration }
        }
      })
      setBoxData(updated)
    }
    // setBoxData(date)
  }, [date])
  return (
    <div>
      <div className="cardbox-wrapper">
        {date
          ? boxData.map((item, i) => {
              return <CardBox key={i} cardContent={item} />
            })
          : null}
      </div>{' '}
    </div>
  )
}

export default ActivityBox
