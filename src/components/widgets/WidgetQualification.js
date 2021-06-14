import React from 'react'
import { Table, Modal } from 'semantic-ui-react'

import NodeToggle from '../../common/NodeToggle'
import CommonInput from '../../common/CommonInput'
import CommonButton from '../../common/CommonButtons'
import CommonCheckbox from '../../common/CommonCheckbox'
import CommonSelect from '../../common/CommonSelect'

import iconStyle from '../../assets/images/Dashboard 2-06.png'
import deleteIcon from '../../assets/images/delete-icon.png'
import plusIcon from '../../assets/images/plus.png'
import editIcon from '../../assets/images/Dashboard-35.png'

import {
  lstCustomFieldTypeOptions,
  lstCustomFieldDisplay,
  lstCustomFieldDisplayOnCallNow,
  lstCustomFieldDisplayOnCallLater
} from '../../lib/WidgetData'
import CommonButtons from '../../common/CommonButtons'

export const WidgetQualificationTitle = () => (
  <div className="accordion-widget-holder">
    <div className="accordion-image-holder">
      <img src={iconStyle} alt="logo" />
    </div>
    <div className="accordion-title-holder">
      <h2 className="accordion-title">Qualification</h2>
      <p className="accordion-description">Qualification</p>
    </div>
  </div>
)

export const WidgetQualificationContent = ({
  handleDataRef,
  handleQualification,
  showQualification,
  lstCustomFields,
  lstFinalCustomFields,
  onAddRemoveCustomeFields,
  onUpdateCustomeFields,
  onSubmitCustomFields,
  onDeleteCustomFields,
  handleCustomFieldModal,
  isCustomeCancelModalOpen,
  handleCloseCancelModal,
  fullNameToggle,
  emailToggle,
  teamToggle,
  customFieldsToggle
}) => {
  return (
    <div className="style-widget-wrapper">
      <div className="qualification-wrapper">
        <p className="style-widget-title">Basic fields</p>
        <div className="basic-fields-wrapper">
          <div className="basic-fields-title">
            <label>Basic fields</label>
            <label>Tabs</label>
            <label>Display on</label>
          </div>
          <div className="basic-fields-content">
            <NodeToggle
              handleDataRef={e => handleDataRef('fullNameToggle', e)}
              dataToggle={showQualification[0]}
            />
            <div className="common-checkbox">
              {fullNameToggle && (
                <CommonCheckbox
                  text="Call me now"
                  checkboxStyle="modal-checkbox"
                  name="checkbox"
                />
              )}
              {fullNameToggle && (
                <CommonCheckbox
                  text="Call me later"
                  checkboxStyle="modal-checkbox"
                  name="checkbox"
                />
              )}
              {fullNameToggle && (
                <CommonCheckbox
                  text="Leave message"
                  checkboxStyle="modal-checkbox"
                  name="checkbox"
                />
              )}
              {fullNameToggle && (
                <CommonCheckbox
                  text="Web call"
                  checkboxStyle="modal-checkbox"
                  name="checkbox"
                />
              )}
            </div>
            {fullNameToggle && (
              <CommonSelect
                isGray
                placeholder="On the call me now screen"
                options={[
                  'On the call me now screen',
                  'During the call',
                  'After the call'
                ]}
              />
            )}
          </div>
          <div className="basic-fields-content">
            <NodeToggle
              handleDataRef={e => handleDataRef('emailToggle', e)}
              dataToggle={showQualification[1]}
            />
            <div className="common-checkbox">
              {emailToggle && (
                <CommonCheckbox
                  text="Call me now"
                  checkboxStyle="modal-checkbox"
                  name="checkbox"
                />
              )}
              {emailToggle && (
                <CommonCheckbox
                  text="Call me later"
                  checkboxStyle="modal-checkbox"
                  name="checkbox"
                />
              )}
              {emailToggle && (
                <CommonCheckbox
                  text="Leave message"
                  checkboxStyle="modal-checkbox"
                  name="checkbox"
                />
              )}
              {emailToggle && (
                <CommonCheckbox
                  text="Web call"
                  checkboxStyle="modal-checkbox"
                  name="checkbox"
                />
              )}
            </div>
            {emailToggle && (
              <CommonSelect
                isGray
                placeholder="On the schedule call screen"
                options={[
                  'On the schedule call screen',
                  'After a call is scheduled'
                ]}
              />
            )}
          </div>
          <div className="basic-fields-content">
            <NodeToggle
              handleDataRef={e => handleDataRef('teamToggle', e)}
              dataToggle={showQualification[2]}
            />
            <div className="common-checkbox">
              {teamToggle && (
                <CommonCheckbox
                  text="Call me now"
                  checkboxStyle="modal-checkbox"
                  name="checkbox"
                />
              )}
              {teamToggle && (
                <CommonCheckbox
                  text="Call me later"
                  checkboxStyle="modal-checkbox"
                  name="checkbox"
                />
              )}
              {teamToggle && (
                <CommonCheckbox
                  text="Leave message"
                  checkboxStyle="modal-checkbox"
                  name="checkbox"
                />
              )}
              {teamToggle && (
                <CommonCheckbox
                  text="Web call"
                  checkboxStyle="modal-checkbox"
                  name="checkbox"
                />
              )}
            </div>
            {teamToggle && (
              <CommonSelect
                isGray
                placeholder="On the call me now screen"
                options={[
                  'On the call me now screen',
                  'On the schedule call scree'
                ]}
              />
            )}
          </div>
          <div className="basic-fields-content">
            <NodeToggle
              handleDataRef={e => handleDataRef('customFieldsToggle', e)}
              dataToggle={showQualification[5]}
            />
            <div></div>
            <div></div>
          </div>
        </div>
        {/* <p className="style-widget-title">Custom fields</p> */}
        {customFieldsToggle && (
          <div className="custom-fields-wrapper">
            {lstCustomFields.map((item, index) => {
              return (
                <div className="custom-fields-head" key={index}>
                  <CommonSelect
                    isGray
                    name="fieldType"
                    options={lstCustomFieldTypeOptions}
                    defaultValue={
                      item.fieldType || lstCustomFieldTypeOptions[1]
                    }
                    onChange={(e, result) =>
                      onUpdateCustomeFields(index, result)
                    }
                  />
                  <CommonInput
                    placeholder="Label"
                    name="label"
                    type="text"
                    onChange={(e, result) =>
                      onUpdateCustomeFields(index, result)
                    }
                  />
                  <CommonInput
                    placeholder="values comma separated"
                    name="value"
                    type="text"
                    onChange={(e, result) =>
                      onUpdateCustomeFields(index, result)
                    }
                  />
                  <NodeToggle
                    handleDataRef={value => {
                      handleQualification(
                        index,
                        'showQualificationButton',
                        value
                      )
                    }}
                    dataToggle={{
                      callTitle: 'Enabled',
                      callId: `eQualification${index}`,
                      callRef: `showEQualificationButton${index}`
                    }}
                  />
                  <NodeToggle
                    handleDataRef={value => {
                      handleQualification(
                        index,
                        'showRequiredQualificationButton',
                        value
                      )
                    }}
                    dataToggle={{
                      callTitle: 'Required',
                      callId: `rQualification${index}`,
                      callRef: `showRQualificationButton${index}`
                    }}
                  />
                  <CommonSelect
                    isGray
                    name="displayTabs"
                    options={lstCustomFieldDisplay}
                    defaultValue={
                      item.displayTabs || lstCustomFieldTypeOptions[0]
                    }
                    onChange={(e, result) =>
                      onUpdateCustomeFields(index, result)
                    }
                  />
                  <CommonSelect
                    isGray
                    name="displayOnCallMeNow"
                    options={lstCustomFieldDisplayOnCallNow}
                    defaultValue={
                      item.displayOnCallMeNow || lstCustomFieldTypeOptions[0]
                    }
                    onChange={(e, result) =>
                      onUpdateCustomeFields(index, result)
                    }
                  />
                  <CommonSelect
                    isGray
                    name="displayOnCallMeLater"
                    options={lstCustomFieldDisplayOnCallLater}
                    defaultValue={
                      item.displayOnCallMeLater ||
                      lstCustomFieldDisplayOnCallLater[0]
                    }
                    onChange={(e, result) =>
                      onUpdateCustomeFields(index, result)
                    }
                  />
                  <div>
                    {index === 0 ? (
                      <img
                        src={plusIcon}
                        height="15"
                        alt="logo"
                        onClick={() => onAddRemoveCustomeFields({ item })}
                      />
                    ) : null}
                    <img
                      src={deleteIcon}
                      height="15"
                      alt="logo"
                      onClick={() => onAddRemoveCustomeFields({ index })}
                    />
                  </div>
                </div>
              )
            })}
            <div className="save-cancel">
              <CommonButton
                content="Save"
                btnClass="btn-blue"
                onClick={() => onSubmitCustomFields()}
              />
              <CommonButtons
                //onClick={}
                type="reset"
                content="Cancel"
                background="grey"
              />
            </div>
            <div className="custom-fields-list">
              <Table>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>Type</Table.HeaderCell>
                    <Table.HeaderCell>Enabled</Table.HeaderCell>
                    <Table.HeaderCell>label</Table.HeaderCell>
                    <Table.HeaderCell>Values</Table.HeaderCell>
                    <Table.HeaderCell>Tab</Table.HeaderCell>
                    <Table.HeaderCell>Required</Table.HeaderCell>
                    <Table.HeaderCell>Display On Call Now</Table.HeaderCell>
                    <Table.HeaderCell>Display On Call Later</Table.HeaderCell>
                    <Table.HeaderCell>actions</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {lstFinalCustomFields.map((item, index) => {
                    return (
                      <Table.Row key={index}>
                        <Table.Cell>{item.fieldType}</Table.Cell>
                        <Table.Cell>
                          {item.showQualificationButton
                            ? 'Enabled'
                            : 'Not enabled'}
                        </Table.Cell>
                        <Table.Cell>{item.label}</Table.Cell>
                        <Table.Cell>{item.value}</Table.Cell>
                        <Table.Cell>{item.displayTabs}</Table.Cell>
                        <Table.Cell>
                          {item.showRequiredQualificationButton
                            ? 'Required'
                            : 'Optional'}
                        </Table.Cell>
                        <Table.Cell>{item.displayOnCallMeNow}</Table.Cell>
                        <Table.Cell>{item.displayOnCallMeLater}</Table.Cell>
                        <Table.Cell>
                          <img
                            src={editIcon}
                            height="20"
                            alt="logo"
                            onClick={() => handleCustomFieldModal(index)}
                          />
                          <img
                            src={deleteIcon}
                            height="20"
                            alt="logo"
                            onClick={() => onDeleteCustomFields({ index })}
                          />
                        </Table.Cell>
                      </Table.Row>
                    )
                  })}
                </Table.Body>
              </Table>
            </div>
          </div>
        )}
      </div>

      <Modal
        className="add-credit-modal-wrapper"
        open={isCustomeCancelModalOpen}
        onClose={handleCloseCancelModal}
      >
        <Modal.Header>
          Update Field
          <i
            onClick={handleCloseCancelModal}
            className="fa fa-times"
            aria-hidden="true"
          ></i>
        </Modal.Header>
        <Modal.Content>
          <div className="modal-content update-field">
            <CommonInput name="value" type="text" title="Label" />
            <CommonInput name="value" type="text" title="Value" />
            <div className="side-label-select">
              <label>Tab</label>
              <CommonSelect
                isGray
                name="displayTabs"
                options={lstCustomFieldDisplay}
                placeholder="All Tabs"
              />
            </div>
            <div className="up-label-select">
              <label>Display On Call Now</label>
              <CommonSelect
                isGray
                name="displayTabs"
                options={lstCustomFieldDisplayOnCallNow}
                placeholder="All Tabs"
              />
            </div>
            <div className="up-label-select">
              <label>Display On Call Later</label>
              <CommonSelect
                isGray
                name="displayTabs"
                options={lstCustomFieldDisplayOnCallLater}
                placeholder="All Tabs"
              />
            </div>
            <NodeToggle
              handleDataRef={() => {}}
              dataToggle={{
                callTitle: 'Enabled',
                callId: 'eQualification',
                callRef: 'showEQualificationButton'
              }}
            />
            <NodeToggle
              handleDataRef={() => {}}
              dataToggle={{
                callTitle: 'Required',
                callId: 'rQualification',
                callRef: 'showRQualificationButton'
              }}
            />
            <div className="text-right">
              <CommonButton content="Save Changes" btnClass="btn-blue" />
            </div>
          </div>
        </Modal.Content>
      </Modal>
    </div>
  )
}
