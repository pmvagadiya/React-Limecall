import React from 'react'
import { Button, Modal } from 'semantic-ui-react'
import CommonButtons from './CommonButtons'

const confirmUpgradePlanModal = ({
  open,
  onCloseUpgradePlanModal,
  dataTable,
  addPayment,
  loading
}) => {
  return (
    <Modal
      size="tiny"
      open={open}
      onOpen={open}
      onClose={() => onCloseUpgradePlanModal()}
      className="confirm-upgrade-planModal-container"
      // closeIcon
    >
      <Modal.Header>
        <p>Please take a moment to read this!</p>
        <i
          onClick={() => onCloseUpgradePlanModal()}
          className="fa fa-times"
          aria-hidden="true"
        ></i>
      </Modal.Header>
      <Modal.Content>
        <p>
          Your monthly subscription is paid until{' '}
          {dataTable.tableContentData[0].ends}. If you would like to proceed
          with purchasing a new plan, your current plan's call quota left {' '}
          {dataTable.tableContentData[0].max_calls - dataTable.tableContentData[0].calls_used} and sms quota left {' '}
          {dataTable.tableContentData[0].max_sms - dataTable.tableContentData[0].sms_used} will be gone and usage will be reset to 0, please select "Update
          Subscription" below to continue.
        </p>
      </Modal.Content>
      <Modal.Actions>
        <CommonButtons
          content="Cancel"
          background="blue"
          onClick={() => onCloseUpgradePlanModal()}
        />
        <CommonButtons
          content="Update Subscription"
          background="blue"
          onClick={() => addPayment()}
          loading={loading}
        />
      </Modal.Actions>
    </Modal>
  )
}

export default confirmUpgradePlanModal
