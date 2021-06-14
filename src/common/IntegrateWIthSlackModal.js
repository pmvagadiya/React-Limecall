import React, { useState } from 'react'
import { Modal } from 'semantic-ui-react'
import classnames from 'classnames'

import CommonInput from '../common/CommonInput'
import CommonButton from './CommonButtons'

const IntegrateWIthSlackModal = ({ modalImg, title, selectedData, id }) => {
  const [apiKey, SetApiKey] = useState('')
  const [modalOpen, setModalOpen] = useState(false)

  const handleOpen = () => {
    window.open(
      `https://slack.com/oauth/authorize?scope=channels:read,channels:write,chat:write:bot&client_id=749926049636.737615074242&redirect_uri=${process.env.REACT_APP_BASE_APP_URL}/redirect-slack',
      '_blank`
    )
  }

  const handleClose = () => setModalOpen(false)

  const onChangeApiKey = e => {
    const value = e.target.value
    SetApiKey(value)
  }

  const onClickSaveApi = () => {}

  return (
    <Modal
      dimmer="inverted"
      trigger={
        <p
          onClick={handleOpen}
          name={id}
          className={classnames('integration-status', {
            selectedIntegration: selectedData === id
          })}
        >
          Integrate With Slack
        </p>
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
            Navigate to Settings Installation <span>API Keys</span> to generate
            your API Key.
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

export default IntegrateWIthSlackModal
