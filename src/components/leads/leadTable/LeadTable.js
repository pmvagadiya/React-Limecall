import React from 'react'
import { Table } from 'semantic-ui-react'
import LeadTableHeaders from './LeadTableHeaders'
import LeadTableContent from './LeadTableContent'

const LeadTable = ({
  leadScore,
  tableDataContent,
  isMarkAllCheckbox,
  isMarkOpen,
  onClickMarkAllCheckbox,
  onClickMark,
  onClickMarkCheckbox,
  handleScore,
  star,
  mouseEnter,
  mouseLeave,
  onHoverScore,
  toggleTags,
  handleTagsData,
  setSortField,
  leadType,
  dropDownData,
  leadStage,
  leadOwner,
  rightPane,
  handleRightPaneOpen
}) => (
  <Table singleLine>
    <Table.Header>
      <Table.Row>
        <LeadTableHeaders
          isMarkAllCheckbox={isMarkAllCheckbox}
          leadType={leadType}
          isMarkOpen={isMarkOpen}
          onClickMarkAllCheckbox={onClickMarkAllCheckbox}
          onClickMark={onClickMark}
          setSortField={setSortField}
        />
      </Table.Row>
    </Table.Header>
    <Table.Body>
      {tableDataContent.map((data, index) => (
        <LeadTableContent
          leadScore={leadScore}
          key={index}
          index={index}
          data={data}
          dropDownData={dropDownData}
          leadStage={leadStage}
          leadOwner={leadOwner}
          leadType={leadType}
          star={star}
          mouseEnter={mouseEnter}
          mouseLeave={mouseLeave}
          onClickMarkCheckbox={onClickMarkCheckbox}
          handleScore={handleScore}
          onHoverScore={onHoverScore}
          toggleTags={toggleTags}
          handleTagsData={handleTagsData}
          rightPane={rightPane}
          handleRightPaneOpen={handleRightPaneOpen}
        />
      ))}
    </Table.Body>
  </Table>
)

export default LeadTable
