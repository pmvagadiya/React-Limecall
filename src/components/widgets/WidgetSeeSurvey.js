import React, { Fragment, useState, Component } from 'react'
import { Modal, Radio } from 'semantic-ui-react'
// import { Link } from 'react-router-dom'
import { TextArea } from 'semantic-ui-react'
import TimezonePicker from 'react-timezone'
import NodeToggle from '../../common/NodeToggle'
import CommonInput from '../../common/CommonInput'
import CommonCheckbox from '../../common/CommonCheckbox'
import CommonRadio from '../../common/CommonRadio'
import CommonButtons from '../../common/CommonButtons'

import { Accordion } from 'semantic-ui-react'
import Collapse from '../../common/Accordion'
import NodeCheckbox from '../../common/NodeCheckbox'

// import CommonInput from '../../common/CommonInput'
import CommonSelect from '../../common/CommonSelect'
import CommonButton from '../../common/CommonButtons'
import { CommonNotify } from '../../common/CommonNotify'

import iconSet from '../../assets/images/Dashboard 2-05.png'
import circlePlus from '../../assets/images/cicle-plus.png'
import deleteIcon from '../../assets/images/delete-icon.png'
import {
  includeTagged,
  excludeTagged,
  specificUrl,
  addUrl,
  userPage,
  haveCookie,
  dontHaveCookie,
  customAttribute,
  knownIdentity,
  visitorUsing
} from '../../lib/WidgetData'

export const WidgetSeeSurveyTitle = () => (
  <div className="accordion-widget-holder">
    <div className="accordion-image-holder">
      <img src={iconSet} alt="logo" />
    </div>{' '}
    <div className="accordion-title-holder">
      <h2 className="accordion-title"> Who should see your widget ? </h2>{' '}
      <p className="accordion-description"> Set team office and reply times </p>{' '}
    </div>{' '}
  </div>
)

export const WidgetSeeSurveyContent = ({
  widget,
  handleModal,
  toggleCustomAttribute,
  isModalOpen,
  handleCloseModal,
  onChangeNodeCheckbox,
  onChangeInput,
  activeIndexSurvey,
  handleClickSurvey,
  handleRadioSurvey,
  visitorType,
  cameSiteItem,
  handleDataRef,
  onClickAddMore,
  onClickRemoveAddMore,
  onChangeSelectLink,
  onChangeSelectDevice,
  state,
  isValue,
  onChangeSelect,
  useWebsiteAttribute,
  visitedAtLeast,
  knownIdentityAttribute
}) => {
  const radioListSurvey = ['All', 'New', 'Returning at last for']

  const cameSite = [
    'It doesnt matter (all traffic sources)',
    'They came directly (typed in URL or from bookmark)',
    'They came from different site',
    'They came from a search engine',
    'They came from a campaign'
  ]
  const allDevices = [
    {
      text: 'All devices',
      value: 0
    },
    {
      text: 'Only mobiles (phones and tablets)',
      value: 1
    },
    {
      text: 'Only desktops',
      value: 2
    }
  ]

  return (
    <div>
      <div className="see-survey-modal survey_modal_main">
        {' '}
        {/* <div className="survey-input">
                <p className="cancel-title">Targeted Widget Name</p>
                <CommonInput onChange={onChangeInput} name="widgetName" type="text" placeholder="Your custom widget"/>
              </div> */}
        <Accordion className="holder-widget holder-dp">
          <div className="accordion-content-wrapper">
            <Accordion.Title
              active={activeIndexSurvey === 0}
              index={0}
              onClick={handleClickSurvey}
            >
              What type of visitors belong to this widget ?
            </Accordion.Title>{' '}
            <Accordion.Content active={activeIndexSurvey === 0}>
              <p> Visitor Type </p>{' '}
              <div className="radio-field">
                <Radio label="All" name="radioGroup" value="all" checked />
              </div>{' '}
              <div className="radio-field">
                <Radio label="New" name="radioGroup" value="new" />
              </div>{' '}
              <div className="radio-field">
                <Radio
                  label="Returning at last for"
                  name="radioGroup"
                  value="returning"
                />
                <p className="style-widget-title">
                  <CommonInput
                    onChange={onChangeInput}
                    name="widgetName"
                    type="text"
                    placeholder="0"
                  />{' '}
                  time.{' '}
                </p>{' '}
              </div>{' '}
            </Accordion.Content>{' '}
          </div>{' '}
        </Accordion>{' '}
        {/* <Accordion className="holder-widget">
                <div className="accordion-content-wrapper">
                  <Accordion.Title
                    active={activeIndexSurvey === 1}
                    index={1}
                    onClick={handleClickSurvey}
                  >
                    How did they come to your site?
                  </Accordion.Title>
                  <Accordion.Content active={activeIndexSurvey === 1}>
                    <CommonRadio
                    radioList={cameSite}
                    onChange={(e, { value }) => handleRadioSurvey('cameSiteItem', value)}
                    defaultValue={cameSiteItem}
                    name={'cameSiteItem'}
                    ></CommonRadio>
                  </Accordion.Content>
                </div>
              </Accordion> */}{' '}
        {/* <Accordion className="holder-widget">
                <div className="accordion-content-wrapper">
                  <Accordion.Title
                    active={activeIndexSurvey === 2}
                    index={2}
                    onClick={handleClickSurvey}
                  >
                    Have they been engaged with other surveys already?
                  </Accordion.Title>
                  <Accordion.Content active={activeIndexSurvey === 2}>
                  <div className="legal-head page-seconds engaged-survey">
                    <NodeToggle
                      handleDataRef={(e) => (handleDataRef('pageSeconds', e))}
                      dataToggle={includeTagged[0]}
                    />
                    <div>
                      <p className="style-widget-title">Include tagged with <CommonInput onChange={onChangeInput} name="widgetName" type="text" placeholder="tag"/></p>
                    </div>
                  </div>
                  <div className="legal-head page-seconds engaged-survey">
                    <NodeToggle
                      handleDataRef={(e) => (handleDataRef('pageSeconds', e))}
                      dataToggle={excludeTagged[0]}
                    />
                    <p className="style-widget-title">Exlude tagged with <CommonInput onChange={onChangeInput} name="widgetName" type="text" placeholder="tag"/></p>
                  </div>
                  </Accordion.Content>
                </div>
              </Accordion> */}{' '}
        <Accordion className="holder-widget">
          <div className="accordion-content-wrapper">
            <Accordion.Title
              active={activeIndexSurvey === 3}
              index={3}
              onClick={handleClickSurvey}
            >
              How do they use your website ?
            </Accordion.Title>{' '}
            <Accordion.Content active={activeIndexSurvey === 3}>
              <div className="legal-head page-seconds engaged-survey specific-link">
                <div className="visited-specific">
                  <NodeToggle
                    handleDataRef={e => handleDataRef('useWebsiteAttribute', e)}
                    dataToggle={specificUrl[0]}
                  />{' '}
                  <p className="style-widget-title">
                    They have visited specific URLs{' '}
                  </p>
                  {useWebsiteAttribute ? (
                    <CommonButton
                      onClick={onClickAddMore}
                      content="add more"
                      btnClass="btn-hours"
                      image={circlePlus}
                      style={{ marginLeft: '25%' }}
                    />
                  ) : null}
                </div>
                {useWebsiteAttribute ? (
                  <div className="visited-link">
                    {' '}
                    {state.addMoreUrl.map((data, index) => {
                      return (
                        <div className="set-hours-wrapper" key={index}>
                          <div className="general-content-holder-right">
                            <CommonInput
                              onChange={onChangeInput}
                              name="widgetName"
                              type="text"
                              placeholder="http://"
                              style={{ width: '250px' }}
                            />
                            <NodeToggle
                              handleDataRef={e =>
                                handleDataRef('specificUrl', e)
                              }
                              dataToggle={addUrl[0]}
                            />{' '}
                          </div>{' '}
                          {index !== 0 ? (
                            <CommonButton
                              onClick={onClickRemoveAddMore}
                              disabled={index === 0 ? 'disabled' : ''}
                              btnClass="btn-delete"
                              image={deleteIcon}
                            />
                          ) : null}{' '}
                        </div>
                      )
                    })}{' '}
                  </div>
                ) : null}
              </div>{' '}
              <div className="legal-head page-seconds user-page">
                <NodeToggle
                  handleDataRef={e => handleDataRef('visitedAtLeast', e)}
                  dataToggle={userPage[0]}
                />{' '}
                <p className="style-widget-title">
                  They have visited at least{' '}
                  {visitedAtLeast ? (
                    <CommonInput
                      onChange={onChangeInput}
                      name="widgetName"
                      type="text"
                      placeholder="0"
                    />
                  ) : (
                    <p> 0 </p>
                  )}
                  ages already.{' '}
                </p>{' '}
              </div>{' '}
              <div className="legal-head page-seconds user-page ">
                <NodeToggle
                  handleDataRef={e => handleDataRef('haveCookie', e)}
                  dataToggle={haveCookie[0]}
                />{' '}
                <p className="style-widget-title"> They have cookie. </p>{' '}
              </div>{' '}
              <div className="legal-head page-seconds user-page ">
                <NodeToggle
                  handleDataRef={e => handleDataRef('dontHaveCookie', e)}
                  dataToggle={dontHaveCookie[0]}
                />{' '}
                <p className="style-widget-title"> They don 't have cookie.</p>{' '}
              </div>{' '}
              <div className="legal-head page-seconds user-page custom-attribute">
                <NodeToggle
                  handleDataRef={e => handleDataRef('toggleCustomAttribute', e)}
                  dataToggle={customAttribute[0]}
                />{' '}
                <p className="style-widget-title">
                  They have custom attribute.{' '}
                </p>{' '}
                {toggleCustomAttribute ? (
                  <div className="custom-attribute-holder">
                    <CommonInput
                      onChange={onChangeInput}
                      name="attributeName"
                      type="text"
                      placeholder="Attribute Name"
                    />
                    <CommonInput
                      onChange={onChangeInput}
                      name="attributeValue"
                      type="text"
                      placeholder="Attribute Value"
                    />
                  </div>
                ) : null}{' '}
              </div>{' '}
              <div className="legal-head page-seconds user-page known-identity">
                <NodeToggle
                  handleDataRef={e =>
                    handleDataRef('knownIdentityAttribute', e)
                  }
                  dataToggle={knownIdentity[0]}
                />{' '}
                {knownIdentityAttribute ? (
                  <CommonSelect
                    onChange={onChangeSelect}
                    placeholder="known"
                    name="link"
                    className="set-hours-select"
                    options={['known', 'unknown']}
                  />
                ) : (
                  <div className="identityDropdown">known</div>
                )}
                <p className="style-widget-title">identity. </p>{' '}
              </div>{' '}
            </Accordion.Content>{' '}
          </div>{' '}
        </Accordion>{' '}
        <Accordion className="holder-widget">
          <div className="accordion-content-wrapper">
            <Accordion.Title
              active={activeIndexSurvey === 4}
              index={4}
              onClick={handleClickSurvey}
            >
              Where are they located ? What language do they use ?
            </Accordion.Title>{' '}
            <Accordion.Content active={activeIndexSurvey === 4}>
              <div className="legal-head page-seconds engaged-survey specific-link">
                <div className="legal-head page-seconds user-page use-language">
                  <NodeToggle
                    handleDataRef={e => handleDataRef('visitorUsing', e)}
                    dataToggle={visitorUsing[0]}
                  />{' '}
                  <p className="style-widget-title">
                    Visitor using{' '}
                    <CommonInput
                      onChange={onChangeInput}
                      name="widgetName"
                      type="text"
                      placeholder="0"
                    />{' '}
                    language(based on browser language).{' '}
                  </p>{' '}
                </div>{' '}
              </div>{' '}
            </Accordion.Content>{' '}
          </div>{' '}
        </Accordion>{' '}
        <Accordion className="holder-widget">
          <div className="accordion-content-wrapper what-device">
            <Accordion.Title
              active={activeIndexSurvey === 5}
              index={5}
              onClick={handleClickSurvey}
            >
              What device do they use ?
            </Accordion.Title>{' '}
            <Accordion.Content active={activeIndexSurvey === 5}>
              <div className="legal-head page-seconds engaged-survey specific-link">
                <div className="legal-head page-seconds user-page use-language device-dropdown">
                  <CommonSelect
                    onChange={onChangeSelect}
                    placeholder="All devices"
                    name="link"
                    className="set-hours-select"
                    options={allDevices}
                  />{' '}
                </div>{' '}
              </div>{' '}
            </Accordion.Content>{' '}
          </div>{' '}
        </Accordion>{' '}
        {isValue && (
          <>
            <CommonButtons
              style={{ marginTop: '30px' }}
              type="button"
              content="Save"
              background="blue"
            />
            <CommonButtons
              //onClick={}
              type="reset"
              content="Cancel"
              background="grey"
            />
          </>
        )}
      </div>{' '}
      {/* <Modal
            className="see-survey-modal"
            open={isModalOpen}
            onClose={handleCloseModal}
          >
            <Modal.Header>
              <p className="cancel-title">Add targeted widget</p>
            </Modal.Header>
            <Modal.Content>

            </Modal.Content>
          </Modal> */}{' '}
    </div>
  )
}
