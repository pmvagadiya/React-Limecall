import React, { Fragment, Component } from 'react'
import { Select } from 'semantic-ui-react'
import classnames from 'classnames'

class CommonSelectCountry extends Component {
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
      disabled
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
          disabled={disabled}
          options={options.map((option, index) => ({
            key: index,
            text: option.name,
            value: option.name
          }))}
        />{' '}
      </Fragment>
    )
  }
}

export default CommonSelectCountry
