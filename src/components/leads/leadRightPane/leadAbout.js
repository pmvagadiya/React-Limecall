import React, { useState, useEffect } from 'react'
import { Grid, Image, Dropdown } from 'semantic-ui-react'
import StarRatings from 'react-star-ratings'
import {
  _getLeadActivities,
  _getLeadNotes,
  _onTagsSaveHandler  
} from '../../../config/leadAPI'



import plusIcon from '../../../assets/images/add.svg'
import callIcon from '../../../assets/images/call.svg'
import Record from '../../../assets/images/mic.png'
import clockIcon from '../../../assets/images/clock.svg'
import backIcon from '../../../assets/images/back-button.svg'
import userIcon from '../../../assets/images/user.svg'

import transferIcon from '../../../assets/images/transfer.svg'
import priceIcon from '../../../assets/images/price-tag.svg'
import groupIcon from '../../../assets/images/group.svg'
import chatIcon from '../../../assets/images/chat.svg'
import starIcon from '../../../assets/images/star.svg'
import penIcon from '../../../assets/images/pen.svg'
import QualifyFooter from './QualifyFooter'
const Tags = [
  {
    key: 1,
    text: 'VIP',
    value: 1
  },
  {
    key: 2,
    text: 'NEW',
    value: 2
  },
  {
    key: 3,
    text: 'SOMETHING',
    value: 3
  }
]
const LeadAboutRight = ({ leadData, leadScore }) => {

  const [leadUpdated, setLeadUpdated] = useState(true);


  useEffect(() => {
    let lUpdated = !leadUpdated
    setLeadUpdated(lUpdated)
    console.info("updated" , leadUpdated)

  }, [leadData])


  const trimUrl = (url = "") => {
     
    if(!url || url == "") return ""; 
    const newUrl = url.split("/", 3);
    if(!url.length) return "";

   
    url = newUrl[newUrl.length-1]    
    return url;         
  }

  const leads = leadData?.lead
  return (
    <div className="contact-card aboutTabpane">
      <div className="contact-card-boxes">
        <Grid className="card-boxes-text">
          <h4>Lead Form :</h4>
          <Grid.Row>
            <Grid.Column width={6}>
              <p className="card-boxes-left-text">Name:</p>
            </Grid.Column>
            <Grid.Column width={10}>
              <p className="card-boxes-right-text"></p>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={6}>
              <p className="card-boxes-left-text">Email:</p>
            </Grid.Column>
            <Grid.Column width={10}>
              <p className="card-boxes-right-text"></p>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={6}>
              <p className="card-boxes-left-text">Message:</p>
            </Grid.Column>
            <Grid.Column width={10}>
              <p className="card-boxes-right-text"></p>
            </Grid.Column>
          </Grid.Row>{' '}
          <Grid.Row>
            <Grid.Column width={6}>
              <p className="card-boxes-left-text">Referral:</p>
            </Grid.Column>
            <Grid.Column width={10}>
              <a href={leads?.referral }>{trimUrl(leads?.referral )}</a>             
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>{' '}
      <div className="contact-card-boxes">
        <Grid className="card-boxes-text">
          <h4>Call Data:</h4>{' '}
          <Grid.Row>
            <Grid.Column width={6}>
              <p className="card-boxes-left-text">Time:</p>
            </Grid.Column>
            <Grid.Column width={10}>
              <p className="card-boxes-right-text">{leads?.createdAtDate}</p>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={6}>
              <p className="card-boxes-left-text">Status:</p>
            </Grid.Column>
            <Grid.Column width={10}>
              {' '}
              {leads?.final_status == 'failed_to_connect_agent' ? (
                <p>Failed to Connect</p>
              ) : (
                ''
              )}
              {leads?.final_status == 'completed' ? <p>connected</p> : ''}
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={6}>
              <p className="card-boxes-left-text">Duration:</p>
            </Grid.Column>
            <Grid.Column width={10}>
              <p className="card-boxes-right-text">{leads?.duration} min</p>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={6}>
              <p className="card-boxes-left-text">Recording :</p>
            </Grid.Column>
            <Grid.Column width={10}>
              <p className="card-boxes-right-text">{leads?.recording_url}</p>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={6}>
              <p className="card-boxes-left-text">Team:</p>
            </Grid.Column>
            <Grid.Column width={10}>
              <p className="card-boxes-right-text">{leads?.team}</p>
            </Grid.Column>
          </Grid.Row>{' '}
          <Grid.Row>
            <Grid.Column width={6}>
              <p className="card-boxes-left-text">Handled by:</p>
            </Grid.Column>
            <Grid.Column width={10}>
              <p className="card-boxes-right-text">
                {' '}
                {leads?.owner?.first_name} {'  '}
                {leads?.owner?.last_name}
              </p>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={6}>
              <p className="card-boxes-left-text">Source</p>
            </Grid.Column>
            <Grid.Column width={10}>
              <a href={leads?.source}>{trimUrl(leads?.source)}</a>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>{' '}
      {/* <div className="contact-card-boxes">
        <Grid className="card-boxes-text">
          <h4>Visitor Feedback:</h4>
          <Grid.Row>
            <Grid.Column width={6}>
              <p className="card-boxes-left-text">Company:</p>
            </Grid.Column>
            <Grid.Column width={10}>
              <p className="card-boxes-right-text"></p>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={6}>
              <p className="card-boxes-left-text">Location:</p>
            </Grid.Column>
            <Grid.Column width={10}>
              <p className="card-boxes-right-text"></p>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={6}>
              <p className="card-boxes-left-text">Revenue:</p>
            </Grid.Column>
            <Grid.Column width={10}>
              <p className="card-boxes-right-text"></p>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>{' '} */}
      <div className="contact-card-boxes">
        <Grid className="card-boxes-text">
          <h4>Agent Feedback:</h4>
          <Grid.Row>
            <Grid.Column width={6}>
              <p className="card-boxes-left-text">Agent Rating:</p>
            </Grid.Column>
            <Grid.Column width={10}>
              <p className="card-boxes-right-text">
                {' '}
                <StarRatings
                  rating={0}
                  starRatedColor="#f78030"
                  numberOfStars={5}
                  name="rating"
                />
              </p>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={6}>
              <p className="card-boxes-left-text">Location:</p>
            </Grid.Column>
            <Grid.Column width={10}>
              <p className="card-boxes-right-text"></p>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={6}>
              <p className="card-boxes-left-text">Revenue:</p>
            </Grid.Column>
            <Grid.Column width={10}>
              <p className="card-boxes-right-text"></p>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>{' '}
      <QualifyFooter leadUpdated={leadUpdated} leadData={leadData.lead} leadScore={leadScore}/>
    </div>
  )
}

export default LeadAboutRight
