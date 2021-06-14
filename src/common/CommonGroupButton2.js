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
  btnLeft = true,
  active
}) => {
  const [toggleBtn, setToggleBtn] = useState(leftBtn)
  const [id, setId] = useState(identity)
  const [activeDirection, setActiveDirection] = useState(active)

  const onClickToggle = e => {
    const attr = e.target.getAttribute('name')

    if (attr === 'default') {
      setToggleBtn(leftBtn)
      setId(identity)
      setActiveDirection(attr)
      handleGroupBtnData(rightBtn, id, attr)
    } else if (attr === 'square') {
      setToggleBtn(rightBtn)
      setId(identity)
      setActiveDirection(attr)
      handleGroupBtnData(rightBtn, id, attr)
    }
  }

  // useEffect(() => {
  //   if (btnLeft) {
  //     setActiveDirection('btnLeft')
  //   } else {
  //     setActiveDirection('btnRight')
  //   }
  // }, [btnLeft])

  return (
    <div className={`${groupStyle} groupbtn-holder`}>
      <div className="groupbtn-text">
        <p className="groupbtn-title widget-sub-heading">{title}</p>
        {description ? <p className="groupbtn-desc">{description}</p> : ''}
      </div>
      <div className="groupbtn-wrapper">
        <Button
          onClick={onClickToggle}
          name="default"
          className={classnames('group-left', {
            activeBtn: activeDirection === 'default'
          })}
          attached="left"
        >
          {leftBtn}
        </Button>
        <Button
          onClick={onClickToggle}
          name="square"
          attached="right"
          className={classnames('group-left', {
            activeBtn: activeDirection === 'square'
          })}
        >
          {rightBtn}
        </Button>
      </div>
    </div>
  )
}

export default CommonGroupButton
