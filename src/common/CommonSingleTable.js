import React from 'react'
import { Table } from 'semantic-ui-react'
import Input from './CommonInput'
import CommonTextArea from './CommonTextArea'
import Toggle from './CommonToggle'
import NodeToggle from './NodeToggle'

const SingleTable = props => {
  return (
    <div className="common-single-table">
      <div className="label-container">
        <label> {props.tableData.success}</label>
        <NodeToggle
          handleDataRef={props.toggleConfig}
          dataToggle={props.toggleData}
          activeDefault={props.activeDefault}
        />
      </div>
      {props.activeDefault ? (
        <CommonTextArea
          value={props.tableData.from}
          onChange={props.onChange}
          onClick={props.onClick}
          inputStyle={props.className}
        />
      ) : null}
    </div>
  )
}

export default SingleTable
