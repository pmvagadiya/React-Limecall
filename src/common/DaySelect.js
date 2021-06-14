import React, { Fragment, Component } from 'react'
import { Select } from 'semantic-ui-react'
import classnames from 'classnames'

class DaySelect extends Component {
  componentDidMount() {
    document
      .querySelector('.ui.selection.dropdown')
      .classList.remove('selected')
  }

  render() {
    const {
      onChange,
      name,
      options,
      placeholder,
      isGray,
      defaultValue,
      disabled,
      value
    } = this.props
    return (
      <Fragment>
        <Select
          onChange={onChange}
          name={name}
          className={classnames('', {
            'background-gray': isGray
          })}
          placeholder={placeholder}
          defaultValue={defaultValue}
          value={value}
          disabled={disabled}
          options={options.map((option, index) => ({
            key: index,
            text: option.name,
            value: option.id
          }))}
        />{' '}
      </Fragment>
    )
  }
}

export default DaySelect
