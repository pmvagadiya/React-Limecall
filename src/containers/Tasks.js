import React, { Component } from 'react'
import { Button, Radio, Dropdown, Table, Checkbox } from 'semantic-ui-react'

import Title from '../common/Title'

import leadLogo from '../assets/images/lead-logo.svg'

class Tasks extends Component {
  render() {

    const title = {
      type: 'image',
      titleOne: leadLogo,
      titleTwo: 'Tasks'
    }

    const groupOptions = [
      {
        key: 'Group 1',
        text: 'Group 1',
        value: 'Group 1'
      },
      {
        key: 'Group 2',
        text: 'Group 2',
        value: 'Group 2'
      },
      {
        key: 'Group 3',
        text: 'Group 3',
        value: 'Group 3',
      }
    ]

    const header = (
      <Table.Header>
        <p>Overdue</p>
        <Table.Row>
          <Table.HeaderCell></Table.HeaderCell>
          <Table.HeaderCell>Due Date</Table.HeaderCell>
          <Table.HeaderCell>Assigned to</Table.HeaderCell>
          <Table.HeaderCell>Meeting</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
    )

    const body = (
      <Table.Body>
        <Table.Row>
          <Table.Cell><Checkbox label='Our landing page a day for limecall use case' /></Table.Cell>
          <Table.Cell>Oct 02 9:00am</Table.Cell>
          <Table.Cell>skrupa@purple-rain.io</Table.Cell>
          <Table.Cell>Webinar and landing page discussion(Oct 01)</Table.Cell>
        </Table.Row>
      </Table.Body>
    )

    return (
      <div className="task-container">
        <Title data={title} />
        <div className="task-wrapper">
          <div className="task-button-holder">
            <div className="assign-button">
              <Button basic>Assigned to me</Button>
              <Button basic>Assigned by me</Button>
            </div>
            <div className="group-button">
              <p>Show completed <Radio toggle /></p>
              <Dropdown
                placeholder='Group by due date'
                fluid
                selection
                options={groupOptions}
              />
            </div>
          </div>
          <div className="task-table">
            <Table attached='top' basic>
              {header}
              {body}
            </Table>
          </div>
        </div>
      </div>
    )
  }
}

export default Tasks
