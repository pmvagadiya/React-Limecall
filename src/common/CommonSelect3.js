import React, { Fragment, Component } from 'react'
import { Select } from 'semantic-ui-react'
import classnames from 'classnames'

class CommonSelect3 extends Component {
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
      defaultValue,
      isGray,
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
          defaultValue={defaultValue && defaultValue.value}
          value={
            value &&
            options
              .filter(item => item.value == value)
              .map(item => item.value)[0]
          }
          disabled={disabled}
          options={
            options &&
            options.map((option, index) => ({
              key: index,
              text: option.text,
              value: option.value
            }))
          }

        />{' '}
      </Fragment>
    )
  }
}

export default CommonSelect3
