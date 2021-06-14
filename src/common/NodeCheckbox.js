import React from 'react'
import CommonCheckbox from './CommonCheckbox'

const NodeCheckbox = ({ checkboxlist, name, onChange, title, onSave }) => {
  return (
    <div className="node-checkbox" name={name}>
      <h2 className="bold-text nodecheckbox-title">{title}</h2>
      {checkboxlist.map((checkbox, index) => {
        return (
          <CommonCheckbox
            onChange={onChange}
            index={index}
            text={checkbox.label}
            value={checkbox.key}
            checked={checkbox.checked}
            data={checkbox}
          />
        )
      })}
    </div>
  )
}

export default NodeCheckbox
