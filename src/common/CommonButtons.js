import React, { Fragment } from 'react'
import { Button, Icon } from 'semantic-ui-react'

const CommonButtons = ({
  onClick,
  content,
  background,
  btnClass,
  type = 'button',
  icon = '',
  image = '',
  style = {},
  disabled,
  loading
}) => {
  return (
    <Fragment>
      <Button
        style={style}
        onClick={onClick}
        type={type}
        className={`btn-${background} ${btnClass}`}
        disabled={disabled || false}
        loading={loading}
      >
        {image ? <img src={image} alt="img" /> : ''}
        {icon ? <Icon name={icon} /> : ''}
        {content}
      </Button>
    </Fragment>
  )
}

export default CommonButtons
