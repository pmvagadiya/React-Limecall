import React from 'react'
import { Input } from 'semantic-ui-react'
import PasswordStrengthBar from 'react-password-strength-bar'

const CommonInput = ({
  onChange,
  onBlur,
  onKeyUp,
  onClick = null,
  name,
  type = 'text',
  background,
  value,
  error,
  pattern = '*',
  inputStyle = '',
  title = '',
  placeholder = '',
  icon = '',
  iconPosition = null,
  required = false,
  passwordBar = false,
  passwordData = '',
  defaultValue = null,
  disabled = false,
  style = null,
  label,
  content,
  labelPosition,
  maxLength,
  min,
  accept,
  
}) => {

  
  return (
    <div className="input-wrapper">
      {title && <label className="default-text input-title">{title}</label>}
      <Input
        style={style}
        pattern={pattern}
        label={label}
        labelPosition={labelPosition}
        onClick={onClick}
        onBlur={onBlur}
        onKeyUp={onKeyUp}
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
        maxLength={maxLength}
        accept={accept}
      />
      {error && <span className="error_msg">{error}</span>}
      {passwordBar === true ? (
        <PasswordStrengthBar password={passwordData} />
      ) : (
        ''
      )}
    </div>
  )
}

export default CommonInput
