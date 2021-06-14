import React, { Fragment, useState } from 'react'
// import { Link } from 'react-router-dom'
import { TextArea } from 'semantic-ui-react'
import TimezonePicker from 'react-timezone'
import NodeToggle from '../../common/NodeToggle'
import CommonInput from '../../common/CommonInput'
import CommonCheckbox from '../../common/CommonCheckbox'

// import CommonInput from '../../common/CommonInput'
import CommonSelect from '../../common/CommonSelect'
import CommonButton from '../../common/CommonButtons'

import iconSet from '../../assets/images/Dashboard 2-05.png'
import circlePlus from '../../assets/images/cicle-plus.png'
import deleteIcon from '../../assets/images/delete-icon.png'

export const WidgetShouldAppearTitle = () => (
  <div className="accordion-widget-holder">
    <div className="accordion-image-holder">
      <img src={iconSet} alt="logo" />
    </div>
    <div className="accordion-title-holder">
      <h2 className="accordion-title">When should the widget appear?</h2>
      <p className="accordion-description">Set team office and reply times</p>
    </div>
  </div>
)

export const WidgetShouldAppearContent = ({
  handleDataRef,
  pageLoad,
  pageSeconds,
  pageExit,
  pagePercent,
  onChangeInput,
  state
}) => {
  return (
    <div className="survey-appear should-appear">
      <div className="legal-head">
        <NodeToggle
          handleDataRef={e => handleDataRef('pageLoad', e)}
          dataToggle={pageLoad[0]}
        />
        <p className="style-widget-title">Right after the page loads</p>
      </div>
      <div className="legal-head page-seconds">
        <NodeToggle
          handleDataRef={e => handleDataRef('pageSeconds', e)}
          dataToggle={pageSeconds[0]}
        />
        <p className="style-widget-title">
          When a user has been on the page for{' '}
          <CommonInput
            onChange={onChangeInput}
            name="widgetName"
            type="text"
            placeholder="3"
          />{' '}
          seconds
        </p>
      </div>
      <div className="legal-head page-seconds">
        <NodeToggle
          handleDataRef={e => handleDataRef('pageExit', e)}
          dataToggle={pageExit[0]}
        />
        <p className="style-widget-title">
          When the visitor is about to leave the page (exit intent)
        </p>
      </div>
      <div className="legal-head page-seconds">
        <NodeToggle
          handleDataRef={e => handleDataRef('pagePercent', e)}
          dataToggle={pagePercent[0]}
        />
        <p className="style-widget-title">
          When the visitor has scrolled{' '}
          <CommonInput
            onChange={onChangeInput}
            name="widgetName"
            type="text"
            placeholder="80"
          />{' '}
          % of the page
        </p>
      </div>
      <CommonCheckbox
        text="Don’t show this survey if a respondent has answered to other surveys during current visit to your website or app"
        checkboxStyle="modal-checkbox"
        name="checkbox"
      />
    </div>
  )
}
