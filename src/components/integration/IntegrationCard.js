import React, { useState, useEffect } from 'react'
import axios from 'axios'

import IntegrationModal from '../../common/IntegrationModal'

import zapierActive from '../../assets/images/Asset 10.svg'
import zapierColored from '../../assets/images/zapier-colored.svg'
import modalHubspot from '../../assets/images/hubspotModal.svg'
import modalZapier from '../../assets/images/Dashboard-89.png'
import hubspotInactive from '../../assets/images/hubstop-inactive.svg'
import hubspotActive from '../../assets/images/hubspot-active.svg'
import slackActive from '../../assets/images/slack-icon.png'
import slackInactive from '../../assets/images/slack-icon.png'
import slackModal from '../../assets/images/slack-icon.png'
import integromat from '../../assets/images/integromatNew.png'
import { CommonNotify } from '../../common/CommonNotify'

const IntegrationCard = ({ selectedApp, onClickSelectedApp }) => {
  const [connectedApp, setConnectedApp] = useState(null)
  const [connectedAppData, setConnectedAppData] = useState(null)

  const apiToken = localStorage.getItem('access_token')

  useEffect(() => {
    fetchUserIntegrations()
  }, [])

  const fetchUserIntegrations = () => {
    let head = {
      headers: {
        Authorization: 'Bearer ' + apiToken
      }
    }
    const url = `${process.env.REACT_APP_BASE_APP_URL}/api/v1/integration/user-integrations`

    axios
      .get(url, head)
      .then(res => {
        if (res.data.data) {
          setConnectedAppData(res.data.data)
          const data = { ...connectedApp }
          // localStorage.setItem('hubspot_id', data.hubSpot.id)
          res.data.data.map(obj => {            
            // localStorage.setItem('hubspot_id', obj.hubSpot.id)
            switch (obj.integration) {
              case 'slack':
                data.slack = true
                setConnectedApp({
                  ...connectedApp,
                  data
                })
                break
              case 'Google Calendar':
                data.googleCl = true
                setConnectedApp({
                  ...connectedApp,
                  data
                })
                break
              case 'HubSpot':
                data.hubSpot = true
                setConnectedApp({
                  ...connectedApp,
                  data
                })
                break
              default:
                break
            }
          })
        }
      })
      .catch(er => {
        console.error(er)
      })
  }

  const disconnectSlack = () => {
    let head = {
      headers: {
        Authorization: 'Bearer ' + apiToken
      }
    }
    const url = `${process.env.REACT_APP_BASE_APP_URL}/api/v1/integration/delete-slack-account`

    axios
      .post(url, null, head)
      .then(res => {
        if (res) {
          CommonNotify(res.data.message[0], 'success')
          fetchUserIntegrations()
        }
      })
      .catch(err => {       
        CommonNotify(err.response.data.errors[0])
      })
  }

  const disconnectHubSpot = () => {
    let head = {
      headers: {
        Authorization: 'Bearer ' + apiToken
      }
    }
    const hubSpot = connectedAppData.find(data => {
      return data.integration === 'HubSpot'
    })
    const url = `${process.env.REACT_APP_BASE_APP_URL}/api/v1/integration/${hubSpot.id}/disconnect`

    axios
      .delete(url, head)
      .then(res => {
        if (res) {
          CommonNotify(res.data.message[0], 'success')
          fetchUserIntegrations()
        }
      })
      .catch(err => {        
        CommonNotify(err.response.data.errors[0])
      })
  }
  return (
    <div className="integration-card-holder">
      <div
        onClick={onClickSelectedApp}
        name="zapier"
        className="integration-card"
      >
        <div className="integration-img-holder" name="zapier">
          <img
            name="zapier"
            src={selectedApp === 'zapier' ? zapierActive : zapierColored}
            alt="logo"
          />
          <div className="text-wrapper">
            {/* <h3>Zapier</h3> */}
            <p>Connect Zapier to automate your marketing & sales work flows.</p>
          </div>
        </div>
        <IntegrationModal
          modalImg={modalZapier}
          selectedData={selectedApp}
          title="Zapier"
          id="zapier"
          connected={connectedApp?.data?.zapier}
        />
      </div>
      {/* <div
        onClick={onClickSelectedApp}
        className="integration-card"
        name="googleManager"
      >
        <div name="googleManager" className="integration-img-holder">
          <img
            name="googleManager"
            src={
              selectedApp === 'googleManager' ? googleActive : googleInactive
            }
            alt="logo"
          />
          <div className="text-wrapper">
            {/* <h3>Google Analytic</h3>
            <p>Connect your Marketing Hub account to sync .</p>
          </div>
        </div>
        <IntegrationModal
          modalImg={googleModal1}
          selectedData={selectedApp}
          title="Google Manager"
          id="googleManager"
        />
      </div> */}
      <div
        onClick={onClickSelectedApp}
        className="integration-card"
        name="hubSpot"
      >
        <div name="hubSpot" className="integration-img-holder">
          <img
            name="hubSpot"
            src={selectedApp === 'hubSpot' ? hubspotActive : hubspotInactive}
            alt="logo"
          />
          <div className="text-wrapper">
            {/* <h3>HubSpot</h3> */}
            <p>
              Connect Hubspot to manage your sales calls right from Hubspot CRM.
            </p>
          </div>
        </div>
        <IntegrationModal
          modalImg={modalHubspot}
          selectedData={selectedApp}
          title="HubSpot"
          id="hubSpot"
          connected={connectedApp?.data?.hubSpot}
          onClick={disconnectHubSpot}
        />
      </div>
      <div
        onClick={onClickSelectedApp}
        className="integration-card"
        name="slack"
      >
        <div name="slack" className="integration-img-holder">
          <img
            name="slack"
            src={selectedApp === 'slack' ? slackActive : slackInactive}
            alt="logo"
            className="slack"
          />
          <div className="text-wrapper">
            {/* <h3>Slack</h3> */}
            <p>
              Connect with Slack to receive notifications in your slack
              channels.
            </p>
          </div>
        </div>
        <IntegrationModal
          modalImg={slackModal}
          selectedData={selectedApp}
          title="Wordpress"
          id="slack"
          connected={connectedApp?.data?.slack}
          onClick={disconnectSlack}
        />
      </div>
      <div
        onClick={onClickSelectedApp}
        className="integration-card"
        name="integromat"
      >
        <div name="integromat" className="integration-img-holder">
          <img
            className="integromat-image"
            name="integromat"
            src={selectedApp === 'slack' ? integromat : integromat}
            alt="logo"
          />
          <div className="text-wrapper">
            <p>
              Automate your business workflows by connecting with Integromat
            </p>
          </div>
        </div>
        <IntegrationModal
          modalImg={integromat}
          selectedData={selectedApp}
          title="integromat"
          id="integromat"
          connected={connectedApp?.data?.integromat}
        />
      </div>
    </div>
  )
}

export default IntegrationCard
