import React, { Component } from 'react'
import { Modal, Table } from 'semantic-ui-react'

import CommonButtons from '../../common/CommonButtons'
import CommonSelect from '../../common/CommonSelect'
import CommonTable from '../../common/CommonTableNo'
import { Redirect } from 'react-router-dom'

const table = {
  type: '6',
  header: [
    { headerTitle: 'Phone Number' },
    { headerTitle: 'SMS' },
    { headerTitle: 'VOICE' },
    { headerTitle: 'REGION' },
    { headerTitle: 'Action' }
  ],
  tableContentData: []
}

class LocalNumbers extends Component {
  state = {
    isCancelModalOpen: false,
    redirect: false
  }

  handleModal = () => {
    let { isCancelModalOpen } = this.state

    isCancelModalOpen = !isCancelModalOpen
    this.setState({ isCancelModalOpen })
  }
  handleYesModal = () => {
    this.setState({ isCancelModalOpen: false, redirect: true })
  }
  handleCancelModal = () => {
    this.setState({ isCancelModalOpen: false })
  }
  handleCloseCancelModal = () => this.setState({ isCancelModalOpen: false })

  render() {
    const { redirect } = this.state   
    if (redirect) {
      return <Redirect to="/setCampaign?campaignId=2" />
    }
    return (
      <div>
        <div className="local-number-wrap">
          <div className="local-number-header">
            <CommonSelect
              name="config"
              className="popup-font-select"
              placeholder="Text"
              options={['Text', 'Text1', 'Text2']}
            />
            <CommonSelect
              name="config"
              className="popup-font-select"
              placeholder="Text"
              options={['201', '202', '203']}
            />
            <CommonButtons
              type="button"
              content="Search"
              background="blue"
              onClick={this.handleModal}
              style={{ marginLeft: '20px' }}
            />
          </div>
          <Table>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>PHONE NUMBER</Table.HeaderCell>
                <Table.HeaderCell>SMS</Table.HeaderCell>
                <Table.HeaderCell>VOICE</Table.HeaderCell>
                <Table.HeaderCell>REGION</Table.HeaderCell>
                <Table.HeaderCell> Action </Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              <Table.Row>
                <Table.Cell>(201) 243-4548</Table.Cell>
                <Table.Cell>Yes</Table.Cell>
                <Table.Cell>Yes</Table.Cell>
                <Table.Cell>NJ</Table.Cell>
                <Table.Cell>
                  <CommonButtons
                    type="button"
                    content="+Add"
                    background="blue"
                    onClick={this.handleModal}
                  />
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        </div>
        <Modal
          className="local-number-modal"
          open={this.state.isCancelModalOpen}
          onClose={this.handleCloseCancelModal}
        >
          <Modal.Content>
            <div className="modal-content">
              <p>Are you sure you want to add (201) 243-4548 ?</p>
              <CommonButtons
                type="button"
                content="Yes"
                background="blue"
                onClick={this.handleYesModal}
              />
              <CommonButtons
                type="button"
                content="No"
                background="blue"
                onClick={this.handleCancelModal}
              />
            </div>
          </Modal.Content>
        </Modal>
      </div>
    )
  }
}

export default LocalNumbers
