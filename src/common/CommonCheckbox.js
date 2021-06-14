import React from 'react'
import { Checkbox } from 'semantic-ui-react'

const CommonCheckbox = ({
  id,
  onClick,
  name,
  checked,
  text,
  index,
  value,
  onChange,
  italicText = undefined,
  checkboxStyle,
  defaultChecked,
  data
}) => {
  return (
    <div className="holder-checkbox">
      <Checkbox
        onClick={e => onChange(e, index, checked, data)}
        id={id}
        name={value}
        defaultChecked={defaultChecked}
        checked={checked}
        value={value}
        className={checkboxStyle}
        label={
          <label>
            {' '}
            {text}{' '}
            {italicText === undefined ? (
              ''
            ) : (
              <span className="text-italic"> {`(${italicText})`} </span>
            )}{' '}
          </label>
        }
      />{' '}
    </div>
  )
}

export default CommonCheckbox
