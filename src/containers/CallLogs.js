import React, { useState } from 'react'
import { Accordion, Icon, Table } from 'semantic-ui-react'

function CallLogs({ data }) {
  const [activeIndex, setActiveIndex] = useState(0)

  const handleClick = (e, titleProps) => {
    const { index } = titleProps
    const activeIndexs = activeIndex
    const newIndex = activeIndexs === index ? -1 : index
    setActiveIndex(newIndex)
  }
  return (
    <>
      <Accordion className="Lead_wrapper" fluid styled>
        <Accordion.Title
          active={activeIndex === 3}
          index={3}
          onClick={handleClick}
        >
          Call Logs
        </Accordion.Title>
        <Accordion.Content active={activeIndex === 3}>
          <Table singleLine>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Type</Table.HeaderCell>
                <Table.HeaderCell>Agent</Table.HeaderCell>
                <Table.HeaderCell>Date</Table.HeaderCell>
              </Table.Row>{' '}
            </Table.Header>{' '}
            <Table.Body>
              <Table.Cell>{data.callData?.type}</Table.Cell>
              <Table.Cell>{data.callData?.member?.first_name}</Table.Cell>
              <Table.Cell>{data.callData?.created_at}</Table.Cell>
            </Table.Body>{' '}
          </Table>
        </Accordion.Content>
      </Accordion>
    </>
  )
}

export default CallLogs
