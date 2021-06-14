import React from 'react'
import { TextArea } from 'semantic-ui-react'

const CommonTextArea = ({
  onChange,
  onClick = null,
  name,
  type = 'text',
  background,
  value,
  inputStyle = '',
  title = '',
  placeholder = '',
  icon = '',
  iconPosition = null,
  required = false,
  defaultValue = null,
  disabled = false,
  style = null,
  rows
}) => {
  return (
    <div className="input-wrapper">
      {title && <label className="default-text input-title">{title}</label>}
      <TextArea
        style={style}
        onClick={onClick}
        onChange={onChange}
        name={name}
        type={type}
        value={value}
        icon={icon}
        placeholder={placeholder}
        iconPosition={iconPosition}
        className={`input-${background} ${inputStyle}`}
        required={required}
        defaultValue={defaultValue}
        disabled={disabled}
        rows={rows}
      />
    </div>
  )
}

export default CommonTextArea
