import React, { Component } from 'react'
import { Table } from 'semantic-ui-react'

import CommonSelect from '../../common/CommonSelect'
import CommonInput from '../../common/CommonInput'

class CallLog extends Component {
  render() {
    return (
      <div className="call-log-wrapper">
        <div className="day-filter">
          <CommonSelect
            name="config"
            placeholder="Text"
            options={['Text', 'Text', 'Text']}
          />
        </div>
        <div className="call-log-head">
          <p>All Calls and SMS (0)</p>
          <div className="coll-log-filter">
            <CommonSelect
              name="config"
              className="popup-font-select"
              placeholder="Text"
              options={['Text', 'Text', 'Text']}
            />
            <CommonInput name="search" type="text" placeholder="Search" />
            <CommonSelect
              name="config"
              className="popup-font-select"
              placeholder="Text"
              options={['Text', 'Text', 'Text']}
            />
            <CommonSelect
              name="config"
              className="popup-font-select"
              placeholder="Text"
              options={['Text', 'Text', 'Text']}
            />
          </div>
        </div>
        <Table>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>CAMPAIGN</Table.HeaderCell>
              <Table.HeaderCell>CALLER</Table.HeaderCell>
              <Table.HeaderCell>STATUS</Table.HeaderCell>
              <Table.HeaderCell>DIALED</Table.HeaderCell>
              <Table.HeaderCell>DURATION</Table.HeaderCell>
              <Table.HeaderCell>TIME</Table.HeaderCell>
              <Table.HeaderCell>REC</Table.HeaderCell>
              <Table.HeaderCell>TAGS</Table.HeaderCell>
              <Table.HeaderCell>SOURCE</Table.HeaderCell>
              <Table.HeaderCell>CITY</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            <Table.Row>
              <Table.Cell>CAMPAIGN</Table.Cell>
              <Table.Cell>CALLER</Table.Cell>
              <Table.Cell>STATUS</Table.Cell>
              <Table.Cell>DIALED</Table.Cell>
              <Table.Cell>DURATION</Table.Cell>
              <Table.Cell>TIME</Table.Cell>
              <Table.Cell>REC</Table.Cell>
              <Table.Cell>TAGS</Table.Cell>
              <Table.Cell>SOURCE</Table.Cell>
              <Table.Cell>CITY</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </div>
    )
  }
}

export default CallLog
