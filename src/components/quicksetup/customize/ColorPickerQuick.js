import React, { useState } from 'react'

import ColorPicker from 'rc-color-picker'

const ColorPickerQuick = ({ changeHandler, onClickColor, color }) => {
  // const [color, setColor] = useState('#662D91')

  // const changeHandler = colors => {
  //   setColor(colors.color)
  // }

  // const onClickColor = e => {
  //   const colorhex = e.target.getAttribute('data')
  //   setColor(colorhex)
  // }
  const onClickInput = () => {
    document.querySelector('.rc-color-picker-trigger').click()
  }

  return (
    <div className="colorpicker align-box">
      <p className="title">Colors</p>
      <div className="colorpicker-wrapper">
        <div className="colorpicker-item-wrapper">
          <div className="colorpicker-item-holder">
            <div
              onClick={onClickColor}
              data="#ffc0cb"
              className="colorpicker-item pink"
            ></div>
            <div
              onClick={onClickColor}
              data="#fdd800"
              className="colorpicker-item yellow"
            ></div>
            <div
              onClick={onClickColor}
              data="#f89902"
              className="colorpicker-item brown"
            ></div>
            <div
              onClick={onClickColor}
              data="#7ed321"
              className="colorpicker-item green"
            ></div>
            <div
              onClick={onClickColor}
              data="#2795ff"
              className="colorpicker-item blue"
            ></div>
            <div
              onClick={onClickColor}
              data="#a201fe"
              className="colorpicker-item violet"
            ></div>
          </div>
        </div>
        <p className="or-text">or</p>
        <div className="colorpicker-holder">
          <ColorPicker
            animation="slide-up"
            color={color}
            onChange={changeHandler}
          />
          <div onClick={onClickInput} className="input-value">
            {color}
          </div>
        </div>
      </div>
    </div>
  )
}
export default ColorPickerQuick
