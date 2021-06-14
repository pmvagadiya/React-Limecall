import React, { useState, useEffect } from 'react'
import { Input } from 'semantic-ui-react'

import ColorPicker from 'rc-color-picker'

const CommonColor = ({ widgetName, onChange, widgetColor }) => {
  const [name, setName] = useState('')
  const [editColor, setEditColor] = useState(null)
  const [defaultColor, setdefaultColor] = useState(widgetColor)

  const changeHandler = colors => {
    setEditColor(colors.color)
    onChange(colors.color)
  }

  useEffect(() => {
    setName(widgetName)
    setdefaultColor(widgetColor)
  }, [widgetName, widgetColor])

  const onEditBtnColor = color => {
    setEditColor(color)
  }

  return (
    <div className="color-wrapper ">
      <p className="color-title widget-sub-heading">{name}</p>
      {defaultColor && (
        <div className="color-holder">
          <ColorPicker
            animation="slide-up"
            defaultColor={defaultColor && defaultColor}
            color={editColor}
            onChange={changeHandler}
          />
          <Input
            onChange={onEditBtnColor}
            defaultValue={defaultColor && defaultColor}
            value={editColor}
            onChange={e => onEditBtnColor(e.target.value)}
          />
        </div>
      )}
    </div>
  )
}

export default CommonColor
