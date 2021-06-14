import React, { Fragment, Component } from 'react'
import { Select } from 'semantic-ui-react'
import classnames from 'classnames'

class CommonSelect4 extends Component {
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
      multiple
    } = this.props

    return (
      <Fragment>
        <Select
          style={style}
          multiple={multiple}
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
            value: option.id
          }))}
        />{' '}
      </Fragment>
    )
  }
}

export default CommonSelect4
