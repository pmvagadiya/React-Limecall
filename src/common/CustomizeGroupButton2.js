import React, { useState, useEffect } from 'react'
import { Button } from 'semantic-ui-react'
import classnames from 'classnames'

const CustomizeGroupButton = ({
  identity,
  topLeftBtn,
  topRightBtn,
  bottomLeftBtn,
  bottomRightBtn,
  handleGroupBtnData,
  title,
  groupStyle,
  description,
  active = 'btnTopRight'
}) => {
  const [toggleBtn, setToggleBtn] = useState(topRightBtn)
  const [id, setId] = useState(identity)
  const [activeDirection, setActiveDirection] = useState(active)

  // useEffect(setActiveDirection(active), [active])

  const onClickToggle = e => {
    const attr = e.target.getAttribute('name')

    if (attr === 'btnTopLeft') {
      setToggleBtn(topLeftBtn)
      setId(identity)
      setActiveDirection(attr)

      handleGroupBtnData(toggleBtn, id, attr)
    } else if (attr === 'btnTopRight') {
      setToggleBtn(topRightBtn)
      setId(identity)
      setActiveDirection(attr)

      handleGroupBtnData(toggleBtn, id, attr)
    } else if (attr === 'btnBottomLeft') {
      setToggleBtn(bottomLeftBtn)
      setId(identity)
      setActiveDirection(attr)

      handleGroupBtnData(toggleBtn, id, attr)
    } else if (attr === 'btnBottomRight') {
      setToggleBtn(bottomRightBtn)
      setId(identity)
      setActiveDirection(attr)

      handleGroupBtnData(toggleBtn, id, attr)
    }
  }

  return (
    <div className={`${groupStyle} groupbtn-holder`}>
      <div className="groupbtn-text">
        <p className="groupbtn-title widget-sub-heading">{title}</p>
        {description ? <p className="groupbtn-desc">{description}</p> : ''}
      </div>
      <div className="groupbtn-wrapper">
        <Button
          onClick={onClickToggle}
          name="btnTopLeft"
          className={classnames('group-left', {
            activeBtn: active === 'btnTopLeft'
          })}
          attached="left"
        >
          {topLeftBtn}
        </Button>
        <Button
          onClick={onClickToggle}
          name="btnTopRight"
          attached="right"
          className={classnames('group-left', {
            activeBtn: active === 'btnTopRight'
          })}
        >
          {topRightBtn}
        </Button>
        <Button
          onClick={onClickToggle}
          name="btnBottomLeft"
          className={classnames('group-left', {
            activeBtn: active === 'btnBottomLeft'
          })}
          attached="left"
        >
          {bottomLeftBtn}
        </Button>
        <Button
          onClick={onClickToggle}
          name="btnBottomRight"
          attached="right"
          className={classnames('group-left', {
            activeBtn: active === 'btnBottomRight'
          })}
        >
          {bottomRightBtn}
        </Button>
      </div>
      {/* <div className="groupbtn-wrapper-mobile">
        <div className="groupbtn-wrapper-col">
          <Button
            onClick={onClickToggle}
            name="btnTopLeft"
            className={classnames('group-left', {
              activeBtn: activeDirection === 'btnTopLeft'
            })}
            attached="left"
          >
            {topLeftBtn}
          </Button>
          <Button
            onClick={onClickToggle}
            name="btnTopRight"
            attached="right"
            className={classnames('group-left', {
              activeBtn: activeDirection === 'btnTopRight'
            })}
          >
            {topRightBtn}
          </Button>
        </div>
        <div className="groupbtn-wrapper-col">
          <Button
            onClick={onClickToggle}
            name="btnBottomLeft"
            className={classnames('group-left', {
              activeBtn: activeDirection === 'btnBottomLeft'
            })}
            attached="left"
          >
            {bottomLeftBtn}
          </Button>
          <Button
            onClick={onClickToggle}
            name="btnBottomRight"
            attached="right"
            className={classnames('group-left', {
              activeBtn: activeDirection === 'btnBottomRight'
            })}
          >
            {bottomRightBtn}
          </Button>
        </div>
      </div> */}
    </div>
  )
}

export default CustomizeGroupButton
