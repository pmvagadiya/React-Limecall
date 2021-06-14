import React, { Fragment, Component } from 'react'
import { Select } from 'semantic-ui-react'
import classnames from 'classnames'

class CommonSelect extends Component {
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
      style,
      value
    } = this.props

    return (
      <Fragment>
        <Select
          style={style}
          onChange={onChange}
          name={name}
          className={classnames('', {
            'background-gray': isGray
          })}
          value={value}
          placeholder={placeholder}
          defaultValue={defaultValue}
          value={value}
          disabled={disabled}        
          options={options.map((option, index) => ({
            key: index,
            text: option,
            value: option
          }))}
        />{' '}
      </Fragment>
    )
  }
}

export default CommonSelect
