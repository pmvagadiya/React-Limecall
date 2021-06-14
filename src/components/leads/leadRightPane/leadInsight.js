import React from 'react'
import { Grid } from 'semantic-ui-react'
import moment from 'moment'

import QualifyFooter from './QualifyFooter'

const LeadInsight = ({ leadData, leadScore }) => {
  const enrichment = leadData?.enrichment_user_info

 

  return (
    <div className="contact-card insightTab">
      {' '}
      <div className="contact-card-boxes">
        <Grid className="card-boxes-text">
          <h4>Visitor Insight :</h4>
          <Grid.Row>
            <Grid.Column width={6}>
              <p className="card-boxes-left-text">Industry:</p>
            </Grid.Column>
            <Grid.Column width={10}>
              <p className="card-boxes-right-text">
                {enrichment?.company_domain}
              </p>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={6}>
              <p className="card-boxes-left-text">Location:</p>
            </Grid.Column>
            <Grid.Column width={10}>
              <p className="card-boxes-right-text">
                {enrichment?.company_domain}
              </p>
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
      <div className="contact-card-boxes">
        <Grid className="card-boxes-text">
          <h4>Technology :</h4>
          <Grid.Row>
            <Grid.Column width={6}>
              <p className="card-boxes-left-text">Ip-Address:</p>
            </Grid.Column>
            <Grid.Column width={10}>
              <p className="card-boxes-right-text">
                {leadData?.leadData?.lead?.ip_address}
              </p>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={6}>
              <p className="card-boxes-left-text">OS device:</p>
            </Grid.Column>
            <Grid.Column width={10}>
              <p className="card-boxes-right-text">
                {leadData?.leadData?.lead?.trackingData?.os}
              </p>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={6}>
              <p className="card-boxes-left-text">Browser:</p>
            </Grid.Column>
            <Grid.Column width={10}>
              <p className="card-boxes-right-text">
                {leadData?.leadData?.lead?.trackingData?.browser?.name}
              </p>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>{' '}
      <div className="contact-card-boxes">
        <Grid className="card-boxes-text">
          <h4>Vigites Page: </h4>
          <Grid.Row>
            <Grid.Column width={6}>
              <p className="card-boxes-left-text">VISITED PAGE:</p>
            </Grid.Column>
            <Grid.Column width={10}>
              <p className="card-boxes-right-text">
                {enrichment?.company_domain}
              </p>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={6}>
              <p className="card-boxes-left-text">Last Seen:</p>
            </Grid.Column>
            <Grid.Column width={10}>
              <p className="card-boxes-right-text">
                {moment(
                  leadData?.leadData?.lead?.trackingData?.last_interaction?.split(
                    ' '
                  )[0],
                  'YYYY-MM-DD'
                ).format('DD-MMM')}
                {'   '}
                {moment(
                  leadData?.leadData?.lead?.trackingData?.last_interaction?.split(
                    ' '
                  )[1],
                  'HH'
                ).fromNow()}
              </p>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={6}>
              <p className="card-boxes-left-text">Visit:</p>
            </Grid.Column>
            <Grid.Column width={10}>
              <p className="card-boxes-right-text"></p>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
      <QualifyFooter leadData={leadData.lead} leadScore={leadScore}/>
    </div>

  )
}

export default LeadInsight
