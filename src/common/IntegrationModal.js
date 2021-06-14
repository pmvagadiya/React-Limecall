import React, { useEffect, useState } from 'react'
import { Modal } from 'semantic-ui-react'
import classnames from 'classnames'
import axios from 'axios'

import CommonInput from '../common/CommonInput'
import CommonButton from './CommonButtons'
import { CommonNotify } from './CommonNotify'

const IntegrationModal = ({
  modalImg,
  title,
  selectedData,
  id,
  connected,
  onClick
}) => {
  const [apiKey, SetApiKey] = useState('')
  const [modalOpen, setModalOpen] = useState(false)

  const handleOpen = () => {
    //setModalOpen(true)
    switch (id) {
      case 'zapier':
        window.open(
          'https://zapier.com/developer/invite/110618/2feca0d691d63f01a836e9cf7545740c/',
          '_blank'
        )
        break
      case 'googleManager':
        window.open(
          `${process.env.REACT_APP_BASE_APP_URL}/connect-google-analytics`,
          '_blank'
        )
        break
      case 'hubSpot':
        window.open(
          `https://app.hubspot.com/oauth/authorize?scope=contacts%20oauth%20content%20integration-sync%20timeline%20e-commerce&redirect_uri=${process.env.REACT_APP_ROOT_URL}/hubspot-callback&client_id=88005ab8-5c6f-4c79-9cf9-db43c99683eb`,
          '_blank'
        )
        break
      case 'slack':
        window.open(
          `https://slack.com/oauth/authorize?scope=channels:read,channels:write,chat:write:bot&client_id=749926049636.737615074242&redirect_uri=${process.env.REACT_APP_ROOT_URL}/redirect-slack`,
          '_blank'
        )
        break
      case 'integromat':
        window.open(
          `https://www.integromat.com/en/apps/invite/f95fdc7e03e65d102392c16e613cdbe1`,
          '_blank'
        )
        break
      default:
        return
    }

    // if(id == 'zapier')
    // {
    //   window.open("https://zapier.com/developer/invite/110618/2feca0d691d63f01a836e9cf7545740c", '_blank');
    // }else {
      // window.open(`https://app.hubspot.com/oauth/authorize?scope=contacts%20oauth%20content%20integration-sync%20timeline%20e-commerce&redirect_uri=${process.env.REACT_APP_BASE_APP_URL}/hubspot-callback&client_id=88005ab8-5c6f-4c79-9cf9-db43c99683eb`, '_blank');
    // }
  }

  const handleClose = () => setModalOpen(false)

  const onChangeApiKey = e => {
    const value = e.target.value
    SetApiKey(value)
  }

  // const disconnectSlack = () => {
  //   let head = {
  //     headers: {
  //       Authorization: 'Bearer ' + apiToken
  //     }
  //   }
  //   const url = `${process.env.REACT_APP_BASE_APP_URL}/api/v1/integration/delete-slack-account`

  //   axios
  //     .post(url, null, head)
  //     .then(res => {
  //       if (res) {
  //         CommonNotify(res.data.message[0], 'success')
  //       }
  //     })
  //     .catch(err => {     
  //       CommonNotify(err.response.data.errors[0])
  //     })
  // }

  const onClickSaveApi = () => {}

  return (
    <Modal
      dimmer="inverted"
      trigger={
        connected ? (
          <p
            onClick={onClick}
            name={id}
            className={classnames(`integration-status btn_disconnect`, {
              selectedIntegration: selectedData === id
            })}
          >
            Disconnect
          </p>
        ) : (
          <p
            onClick={handleOpen}
            name={id}
            className={classnames(`integration-status`, {
              selectedIntegration: selectedData === id
            })}
          >
            Connect
          </p>
        )
      }
      open={modalOpen}
      onClose={handleClose}
      className="modal-inverted-integration"
      closeIcon
    >
      <div className="integration-modal-wrapper">
        <h2 className="integration-modal-text">
          Allow {title} to access your Limecall account.
        </h2>
        <div className="center-img">
          <img src={modalImg} alt="logo" />
        </div>
        <div className="integration-input-wrapper">
          <p className="api-text">
            API Key <span>(Required)</span>
          </p>
          <p className="integration-breadcrumb">
            Navigate to Settings > Installation > <span>API Keys</span> to
            generate your API Key.
          </p>
          <CommonInput
            onChange={onChangeApiKey}
            name="apiKey"
            type="text"
            background="gray"
            defaultValue={apiKey}
          />
        </div>

        <div className="integrate-wrapper">
          <CommonButton
            onClick={onClickSaveApi}
            content="Yes, Continue"
            background="blue"
            btnClass="btn-continue"
          />
          <CommonButton
            content="Cancel"
            background="blue"
            btnClass="btn-cancel"
            onClick={handleClose}
          />
        </div>
      </div>
    </Modal>
  )
}

export default IntegrationModal
