import React from 'react'

import NodeToggle from '../../common/NodeToggle'
import CommonInput from '../../common/CommonInput'
import CommonSelect from '../../common/CommonSelect'
import CommonButton from '../../common/CommonButtons'
import { Table } from 'semantic-ui-react'

import iconAdjust from '../../assets/images/Dashboard 2-06.png'
import iconCicle from '../../assets/images/cicle-plus.png'
import deleteIcon from '../../assets/images/delete-icon.png'
import {
  lstSpecificPageOptions,
  lstFieldTypeOptions
} from '../../lib/WidgetData'

export const WidgetBehaviourTitle = () => {
  return (
    <div className="accordion-widget-holder">
      <div className="accordion-image-holder">
        <img src={iconAdjust} alt="logo" />
      </div>
      <div className="accordion-title-holder">
        <h2 className="accordion-title">When should the widget appear?</h2>
        <p className="accordion-description">Widget Targeting</p>
      </div>
    </div>
  )
}

export const WidgetBehaviourContent = ({
  widgetBehaviour,
  handleDataRef,
  lstSpecificPage,
  lstUrls,
  onAddRemoveSpecificPage,
  onUpdateSpecificRecord,
  onSubmitSpecificRecords,
  onDeleteUrl,
  customTargetToggle
}) => {
  return (
    <div className="adjust-behaviour-wrapper">
      <p className="adjust-title">Widget Behaviour</p>
      {widgetBehaviour.map((item, i) => {
        return i !== widgetBehaviour.length - 1 ? (
          <NodeToggle
            key={i}
            handleDataRef={handleDataRef}
            dataToggle={item}
            inputData={item.inputData}
          />
        ) : null
      })}

      {/* <p className="adjust-title">Custom Targets</p> */}
      <div className="custom-target-wrapper">
        {widgetBehaviour.map((item, i) => {
          return i === widgetBehaviour.length - 1 ? (
            <NodeToggle
              key={i}
              handleDataRef={e => handleDataRef('customTargetToggle', e)}
              dataToggle={item}
            />
          ) : null
        })}

       
        {customTargetToggle &&
          lstSpecificPage.map((item, index) => {
            return (
              <div className="specific-page" key={index}>
                <CommonSelect
                  name="fieldType"
                  className="set-hours-select"
                  options={lstFieldTypeOptions}
                  defaultValue={item.fieldType || lstFieldTypeOptions[1]}
                  onChange={(e, result) =>
                    onUpdateSpecificRecord(index, result)
                  }
                />
                <CommonSelect
                  name="weekdays"
                  className="set-hours-select"
                  options={lstSpecificPageOptions}
                  defaultValue={item.weekdays || lstSpecificPageOptions[1]}
                  onChange={(e, result) =>
                    onUpdateSpecificRecord(index, result)
                  }
                />
                <CommonInput
                  placeholder="Text"
                  name="text"
                  type="text"
                  defaultValue={item.text}
                  onChange={e => onUpdateSpecificRecord(index, e.target)}
                />
                {index === 0 ? (
                  <CommonSelect
                    name="officeHourFrom"
                    className="set-hours-select"
                    options={['', 'AND', 'OR']}
                    defaultValue={item.officeHourFrom || 'AND'}
                    onChange={(e, result) =>
                      onUpdateSpecificRecord(index, result)
                    }
                  />
                ) : (
                  <img
                    src={deleteIcon}
                    alt="delete"
                    onClick={() => onAddRemoveSpecificPage({ index })}
                  />
                )}
                {index === 0 ? (
                  <div className="add-more-targets">
                    <img
                      src={iconCicle}
                      alt="plus"
                      onClick={() => onAddRemoveSpecificPage({ item })}
                    />
                  </div>
                ) : null}
              </div>
            )
          })}

        {customTargetToggle ? (
          <CommonButton
            content="Save"
            btnClass="btn-blue"
            onClick={() => onSubmitSpecificRecords()}
          />
          <CommonButtons
            //onClick={}
            type="reset"
            content="Cancel"
            background="grey"
          />
        ) : null}
        {customTargetToggle && (
          <div className="cutom-targets-listing">
            <Table>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Key</Table.HeaderCell>
                  <Table.HeaderCell>Field Type</Table.HeaderCell>
                  <Table.HeaderCell>Operator</Table.HeaderCell>
                  <Table.HeaderCell>Value</Table.HeaderCell>
                  <Table.HeaderCell>Option</Table.HeaderCell>
                  <Table.HeaderCell>Actions</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {lstUrls.map((item, index) => {
                  return (
                    <Table.Row key={index}>
                      <Table.Cell>url</Table.Cell>
                      <Table.Cell>{item.fieldType}</Table.Cell>
                      <Table.Cell>{item.weekdays}</Table.Cell>
                      <Table.Cell>{item.text}</Table.Cell>
                      <Table.Cell>{item.officeHourFrom}</Table.Cell>
                      <Table.Cell className="delete-icon">
                        <img
                          src={deleteIcon}
                          alt="placeholder"
                          onClick={() => onDeleteUrl({ index })}
                        />
                      </Table.Cell>
                    </Table.Row>
                  )
                })}
              </Table.Body>
            </Table>
          </div>
        )}
      </div>
    </div>
  )
}
