import React from 'react'
import Select from 'react-select'

const CommonSelect2 = ({
  options,
  onChange,
  name,
  value,
  title = '',
  required = false,
  isMulti = true,
  isSearchable = true,
  closeMenuOnSelect = true
}) => {
  const setValue =
    value && typeof value !== 'object' && options && options.length
      ? options.find(item => item.value === value)
      : value

  return (
    <div className="input-wrapper">
      <label className="default-text input-title">{title}</label>
      <Select
        key={1}
        onChange={onChange}
        name={name}
        value={setValue}
        required={required}
        isMulti={isMulti}
        isSearchable={isSearchable}
        options={options}
        closeMenuOnSelect={closeMenuOnSelect}
      />
    </div>
  )
}

export default CommonSelect2
