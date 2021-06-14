import React, { useState, useEffect } from 'react'
import { Button } from 'semantic-ui-react'
import classnames from 'classnames'

const CommonGroupButton = ({
  identity,
  leftBtn,
  rightBtn,
  handleGroupBtnData,
  title,
  groupStyle,
  description,
  btnLeft = true
}) => {
  const [toggleBtn, setToggleBtn] = useState(leftBtn)
  const [id, setId] = useState(identity)
  const [activeDirection, setActiveDirection] = useState('btnLeft')

  const onClickToggle = e => {
    const attr = e.target.getAttribute('name')

    if (attr === 'btnLeft') {
      setToggleBtn(leftBtn)
      setId(identity)
      setActiveDirection(attr)
      handleGroupBtnData(leftBtn)
    } else if (attr === 'btnRight') {
      setToggleBtn(rightBtn)
      setId(identity)
      setActiveDirection(attr)
      handleGroupBtnData(rightBtn)
    }
  }

  useEffect(() => {
    if (btnLeft) {
      setActiveDirection('btnLeft')
    } else {
      setActiveDirection('btnRight')
    }
  }, [btnLeft])

  return (
    <div className={`${groupStyle} groupbtn-holder`}>
      <div className="groupbtn-text">
        <p className="groupbtn-title">{title}</p>
        {description ? <p className="groupbtn-desc">{description}</p> : ''}
      </div>
      <div className="groupbtn-wrapper">
        <Button
          onClick={onClickToggle}
          name="btnLeft"
          className={classnames('group-left', {
            activeBtn: activeDirection === 'btnLeft'
          })}
          attached="left"
        >
          {leftBtn}
        </Button>
        <Button
          onClick={onClickToggle}
          name="btnRight"
          attached="right"
          className={classnames('group-left', {
            activeBtn: activeDirection === 'btnRight'
          })}
        >
          {rightBtn}
        </Button>
      </div>
    </div>
  )
}

export default CommonGroupButton
