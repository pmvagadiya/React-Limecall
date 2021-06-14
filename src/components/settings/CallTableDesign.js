import React, { Component, Fragment } from 'react'
// import { Icon } from 'semantic-ui-react'
import { Table } from 'semantic-ui-react'

// import CommonTable from '../../common/CommonTable'
import CommonCheckbox from '../../common/CommonCheckbox'
import CommonButtons from '../../common/CommonButtons'

class CallTableDesignSettings extends Component {
  state = {
    dataTable: {
      type: '4',
      header: [],
      tableContentData: [
        {
          name: 'ID',
          checked: true
        },
        {
          name: 'Time',
          checked: true
        },
        {
          name: 'Phone Number	',
          checked: true
        },
        {
          name: 'Agent',
          checked: true
        },
        {
          name: 'Duration',
          checked: true
        },
        {
          name: 'Record Link',
          checked: true
        },
        {
          name: 'Call Source',
          checked: true
        },
        {
          name: 'Status',
          checked: true
        },
        {
          name: 'Score',
          checked: true
        },
        {
          name: 'Lead Type',
          checked: true
        },
        {
          name: 'Lead Direction',
          checked: true
        }
      ]
    }
  }
  render() {
    const { dataTable } = this.state
    return (
      <div className="caller-table-design">
        <p className="caller-table-title">Customize Lead Table</p>
        <div className="common-table-wrapper">
          <Table singleLine>
            <Table.Body>
              <Fragment>
                {dataTable.tableContentData.map((data, i) => {
                  return (
                    <Table.Row key={i} className="table-content-row">
                      <Table.Cell>{data.name}</Table.Cell>
                      <Table.Cell>
                        <div className="holder-checkbox">
                          <CommonCheckbox
                            name={data.name}
                            defaultChecked={data.checked}
                            onChange={(e, value) => {}}
                          />
                        </div>
                      </Table.Cell>
                    </Table.Row>
                  )
                })}
              </Fragment>
            </Table.Body>
          </Table>
        </div>
        <CommonButtons type="Update" content="Save" background="blue" />
        <CommonButtons
          //onClick={}
          type="reset"
          content="Cancel"
          background="grey"
        />
      </div>
    )
  }
}

export default CallTableDesignSettings
