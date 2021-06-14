import React, { Fragment } from 'react'
import { Table } from 'semantic-ui-react'
import CommonCheckbox from '../../../common/CommonCheckbox'

const LeadTableHeaders = ({
  isMarkAllCheckbox,
  isMarkOpen,
  onClickMarkAllCheckbox,
  onClickMark,
  setSortField,
  leadType
}) => (
  <Fragment>
    <Table.HeaderCell>
      <div className="mark-all">
        <CommonCheckbox
          onChange={onClickMarkAllCheckbox}
          name="isMarkAllCheckbox"
          checked={isMarkAllCheckbox}
        />
        <button onClick={onClickMark} className="btn-mark" type="button">
          <i className="fas fa-chevron-down"></i>
        </button>
        <div className={isMarkOpen ? 'mark active' : 'mark'}>
          <span
            style={{ display: 'inline-block' }}
            className="checkbox-item"
            onClick={e => setSortField('id')}
          >
            ID
          </span>
          <span
            style={{ display: 'inline-block' }}
            onClick={e => setSortField('id')}
            className="checkbox-item"
          >
            Time
          </span>
          <span
            style={{ display: 'inline-block' }}
            onClick={e => setSortField('phone_number')}
            className="checkbox-item"
          >
            Contact No
          </span>
          <span
            style={{ display: 'inline-block' }}
            onClick={e => setSortField('email')}
            className="checkbox-item"
          >
            Email
          </span>
          <span
            style={{ display: 'inline-block' }}
            onClick={e => setSortField('score')}
            className="checkbox-item"
          >
            Score
          </span>
        </div>
      </div>
    </Table.HeaderCell>
    <Table.HeaderCell>ID</Table.HeaderCell>
    <Table.HeaderCell>Time</Table.HeaderCell>
    <Table.HeaderCell>Contact</Table.HeaderCell>
    {/* <Table.HeaderCell>Email</Table.HeaderCell> */}
    <Table.HeaderCell>Source</Table.HeaderCell>
    <Table.HeaderCell>Stages</Table.HeaderCell>
    <Table.HeaderCell>Owner</Table.HeaderCell>
    <Table.HeaderCell>Rate as</Table.HeaderCell>
    {leadType === 'call'  ? (
      <>
        <Table.HeaderCell>Status</Table.HeaderCell>
        <Table.HeaderCell>Agent</Table.HeaderCell>
      </>
    ) : (
      <Table.HeaderCell>Team</Table.HeaderCell>
    )}
        {leadType === 'SCHEDULE_CALL'  ? (
      <>
        <Table.HeaderCell>Status</Table.HeaderCell>
      </>
    ) : null}
    <Table.HeaderCell>Score</Table.HeaderCell>
  </Fragment>
)

export default LeadTableHeaders
