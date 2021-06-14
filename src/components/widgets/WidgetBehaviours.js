import React, { useState, useEffect } from 'react'

import NodeToggle from '../../common/NodeToggle'
import CommonInput from '../../common/CommonInput'
import CommonSelect from '../../common/CommonSelect'
import CommonButtons from '../../common/CommonButtons'

import { CommonNotify } from '../../common/CommonNotify'

import { Table } from 'semantic-ui-react'

import iconAdjust from '../../assets/images/Dashboard 2-06.png'
import iconCicle from '../../assets/images/cicle-plus.png'
import deleteIcon from '../../assets/images/delete-icon.png'
import {
  lstSpecificPageOptions,
  lstFieldTypeOptions
} from '../../lib/WidgetData'

import axios from 'axios'


import { useAlert } from 'react-alert'

const apiToken = localStorage.getItem('access_token')

export const WidgetBehaviourTitle = () => {
  return (
    <div className="accordion-widget-holder">
      <div className="accordion-image-holder">
        <img src={iconAdjust} alt="logo" />
      </div>{' '}
      <div className="accordion-title-holder">
        <h2 className="accordion-title"> When should the widget appear ? </h2>{' '}
        <p className="accordion-description"> Customize the widget's behavior </p>{' '}
      </div>{' '}
    </div>
  )
}

export const WidgetBehaviourContent = ({
  widget,
  widgetBehaviour,
  handleDataRef,
  lstSpecificPage,
  lstUrls,
  onAddRemoveSpecificPage,
  onUpdateSpecificRecord,
  onSubmitSpecificRecords,
  customTargetToggle,
  loading,
  updateDataRef,
  onChange,
  widgetDataAPi,
  onChangeInputBehaviour,
  widgetDataAPiSaveCancel,
  widgetObject

}) => {
  const [widgetBehaviourData, setWidgetBehaviourData] = useState(widgetBehaviour)
  const [triggerScroll, setTriggerScroll] = useState(false)
  const [triggerIntent, setTriggerIntent] = useState(false)
  const [triggerTime, setTriggerTime] = useState(false)
  const [triggerCss, setTriggerCss] = useState(false)
  const [triggerOnce, setTriggerOnce] = useState(false)
  const [triggerScrollValue, setTriggerScrollValue] = useState(null)
  const [triggerTimeValue, setTriggerTimeValue] = useState('')
  const [isWidgetBehaviourContent, setIsWidgetBehaviourContent] = useState(false)
  const [lstSpecificPageData, setLstSpecificPageData] = useState([])
  const alert = useAlert()

  const customGetTargetsTableData = () => {
    loading(true)
    const url = `${process.env.REACT_APP_BASE_APP_URL}/api/v1/widget/widgets`
    let head = {
      headers: {
        Authorization: 'Bearer ' + apiToken
      }
    }
    axios
      .get(url, head)
      .then(res => {
        loading(false)
        setLstSpecificPageData(res.data.data[0].targets)
      })
      .catch(err => {
        const errors = { ...err }       
        if (errors) {
          CommonNotify('Failed to fetch the settings', 'error')
          loading(false)
          return
        } else {
          CommonNotify('Some thing went wrong')
          loading(false)
        }
      })
  }
  const fetchBehaviour = () => {
    loading(true)

    let head = {
      headers: {
        Authorization: 'Bearer ' + apiToken
      }
    }
    const url = `${process.env.REACT_APP_BASE_APP_URL}/api/v1/widget/widget-behavior/${widget.id}`

    axios
      .get(url, head)
      .then(res => {
        loading(false)
        if (res.data.data) {
          setBehaviour(res.data.data)
        }
      })
      .catch(er => {
        loading(false)
        CommonNotify('Cant Fetch Widget Behaviour Setting', 'error')       
      })
  }
  useEffect(() => {
    if (widget.id) {
      fetchBehaviour()
      customGetTargetsTableData()
    }
    // getSettings()
  }, [widget.id])

  const setBehaviour = data => {  
    setTriggerScroll(data.scroll_trigger_status)
    setTriggerIntent(data.exit_intent_trigger_status)
    setTriggerTime(data.time_trigger_status)
    setTriggerCss(data.trigger_css)
    setTriggerOnce(data.trigger_once_per_session)
    setTriggerScrollValue(data.scroll_trigger_value)
    setTriggerTimeValue(data.time_trigger_value)

    let oldData = [...widgetBehaviourData]
    oldData[0] = {
      ...oldData[0],
      active: data.scroll_trigger_status,
      inputData: {
        ...oldData[0].inputData,
        defaultValue: data.scroll_trigger_value
      }
    }
    oldData[1] = {
      ...oldData[1],
      active: data.exit_intent_trigger_status
    }
    oldData[2] = {
      ...oldData[2],
      active: data.time_trigger_status,
      inputData: {
        ...oldData[2].inputData,
        defaultValue: data.time_trigger_value
      }
    }
    oldData[3] = {
      ...oldData[3],
      active: false
    }
    oldData[4] = {
      ...oldData[4],
      active: data.trigger_once_per_session
    }
    setWidgetBehaviourData(oldData)
  }

  const updateBehaviour = () => {

  

    loading(true)
    let head = {
      headers: {
        Authorization: 'Bearer ' + apiToken
      }
    }
    const url = `${process.env.REACT_APP_BASE_APP_URL}/api/v1/widget/update-behavior`

    const data = {
      widget_id: widget.id,
      scroll_trigger_value: widgetDataAPi.scroll_trigger_value,
      time_trigger_value: widgetDataAPi.time_trigger_value,
      scroll_trigger_status: widgetDataAPi.scroll_trigger_status,
      exit_intent_trigger_status: widgetDataAPi.exit_intent_trigger_status,
      time_trigger_status: widgetDataAPi.time_trigger_status,
      trigger_once_per_session: widgetDataAPi.trigger_once_per_session,
      mobile_and_desktop_targeting: widgetDataAPi.mobile_and_desktop_targeting,
      css_trigger_value: 0,
      css_trigger_status: widgetDataAPi.css_trigger_status
    }

    axios
      .post(url, data, head)
      .then(res => {
        if (res.data.message[0] === 'Successfully') {
          CommonNotify('Setting Updated', 'success')
          loading(false)
          // customTargetsTableData()
        } else {
          CommonNotify('Cant Update Setting', 'error')
          loading(false)
        }
      })
      .catch(er => {
        loading(false)
        CommonNotify('Cant Update Setting', 'error')       
      })
  }
  const customTargetsTableData = () => {
    // if (lstSpecificPage.map(item => !item.value && !item.option)) {
    //   CommonNotify('Please fill all field', 'warning')
    //   return
    // }

    // onSubmitSpecificRecords()
    loading(true)
    let head = {
      headers: {
        Authorization: 'Bearer ' + apiToken
      }
    }
    // url-starts,url-ends,url-contains,url-equals,url-regex,url-not-match,url-match,url-not-starts,url-not-ends,url-not-contains,url-not-regex
    let updateOperator = {
      'URL starts with': 'url-starts',
      'URL ends with': 'url-ends',
      'URL contains': 'url-contains',
      'URL equals': 'url-equals',
      'URL regular expression': 'url-regex',
      'URL doesn`t match exactly': 'url-not-match',
      'URL match exactly': 'url-match',
      'URL doesn`t start with': 'url-not-starts',
      'URL doesn`t end with': 'url-not-ends',
      'URL doesn`t contain': 'url-not-contains'
    }
    const moderateData = lstSpecificPage.map(item => {     
      let updateData = {
        option: item.option === 'AND' ? 'and' : 'or',
        type: item.type === 'Block on' ? 0 : 1,
        value: item.value || 'Text',
        key: 'url',
        operator: updateOperator[item.operator]
      }
      return updateData
    })
    const url = `${process.env.REACT_APP_BASE_APP_URL}/api/v1/widget/${widget.id}/targets`
    const data = {
      triggers: moderateData
    }   
    axios
      .post(url, data, head)
      .then(res => {
        loading(false)
        setLstSpecificPageData(res.data.data)
        customGetTargetsTableData()
      })
      .catch(err => {
        const errors = { ...err }
        if (errors.response.data.errors) {
          CommonNotify(errors.response.data.errors[0])
          loading(false)
          return
        } else {
          CommonNotify('Some thing went wrong')
          loading(false)
        }
      })
  }

  const onDeleteUrl = index => {
    loading(true)
    let head = {
      headers: {
        Authorization: 'Bearer ' + apiToken
      }
    }
    const url = `${process.env.REACT_APP_BASE_APP_URL}/api/v1/widget/widget/delete-triggers`
    const data = {
      id: index,
      widget_id: widget.id
    }
    axios
      .post(url, data, head)
      .then(res => {
        loading(false)
        customGetTargetsTableData()
      })
      .catch(err => {
        loading(false)
      })
  }

  // const updateDataRef = (DataState, DataRef) => {
  //   console.log(DataState, DataRef)
  //   switch (DataRef) {
  //     case 'setTriggerScroll':
  //       setTriggerScroll(DataState)
  //       break
  //     case 'setTriggerIntent':
  //       setTriggerIntent(DataState)
  //       break
  //     case 'setTriggerTime':
  //       setTriggerTime(DataState)
  //       break
  //     case 'setTriggerCss':
  //       setTriggerCss(DataState)
  //       break
  //     case 'setTriggerOnce':
  //       setTriggerOnce(DataState)
  //       break
  //     case 'setTriggerScrollValue':
  //       setTriggerScrollValue(DataState)
  //       break
  //     case 'setTriggerTimeValue':
  //       setTriggerTimeValue(DataState)
  //       break
  //   }
  // }
  return (
    <div className="adjust-behaviour-wrapper">
      <p className="adjust-title"> Widget Behaviour </p>{' '}
      {widgetBehaviour.map((item, i) => {
      
       return i !== widgetBehaviour.length - 1 ? (
          <NodeToggle
            key={i}
            handleDataRef={(e, data, type) => {
              updateDataRef(e, data, i,  type);
              setTriggerScrollValue(e);
            }}
            dataToggle={item}
            inputData={item.inputData}
            value={widgetDataAPi && widgetDataAPi[item.inputName]}
            inputDisable={item.active ? false : true}
            activeDefault={item.active}
          />
        ) : null
      })}
      {/* <p className="adjust-title">Custom Targets</p> */}{' '}
      <div className="custom-target-wrapper">
        {widgetBehaviour.map((item, i) => {
          return i === widgetBehaviour.length - 1 ? (
            <NodeToggle
              key={i}
              handleDataRef={e => {handleDataRef('customTargetToggle', e, i)}}
              dataToggle={item}
              activeDefault={
                widgetObject && widgetObject['custom_triggers_status'] ? true : false
              }
            />
          ) : null
        })}
        {/* <p className="adjust-title">Specific Page</p> */}{' '}
        {widgetObject['custom_triggers_status'] ?
          lstSpecificPage.map((item, index) => {
            return (
              <div className="specific-page" key={index}>
                {/* <CommonSelect
                  name="type"
                  className="set-hours-select"
                  options={lstFieldTypeOptions}
                  defaultValue={item.type || lstFieldTypeOptions[1]}
                  onChange={(e, result) => {
                    setIsWidgetBehaviourContent(true)
                    onUpdateSpecificRecord(index, result)
                  }}
                />{' '} */}
                <div className='custom-common-select-class'>
                  <CommonSelect
                    name="operator"
                    className="set-hours-select"
                    style={{padding: "16px 0 0 6px !important"}}
                    options={lstSpecificPageOptions}
                    defaultValue={item.operator || lstSpecificPageOptions[0]}
                    onChange={(e, result) => {
                      setIsWidgetBehaviourContent(true)
                      onUpdateSpecificRecord(index, result)
                    }}
                  />{' '}
                </div>
                <CommonInput
                  placeholder="Text"
                  style={{padding: "10px 15px"}}
                  name="value"
                  type="text"
                  defaultValue={item.value}
                  onChange={e => {
                    setIsWidgetBehaviourContent(true)
                    onUpdateSpecificRecord(index, e.target)
                  }}
                />{' '}
                {index === 0 ? (
                  <CommonSelect
                    name="option"
                    style={{height: "38px"}}
                    className="set-hours-select"
                    options={['AND', 'OR']}
                    defaultValue={item.option || 'AND'}
                    onChange={(e, result) => {
                      setIsWidgetBehaviourContent(true)
                      onUpdateSpecificRecord(index, result)
                    }}
                  />
                ) : (
                  <img
                    src={deleteIcon}
                    alt="delete"
                    onClick={() =>
                      onAddRemoveSpecificPage({
                        index
                      })
                    }
                  />
                )}{' '}
                {index === 0 ? (
                  <div className="add-more-targets">
                    <img
                      src={iconCicle}
                      alt="plus"
                      onClick={() =>
                        onAddRemoveSpecificPage({
                          item
                        })
                      }
                    />{' '}
                  </div>
                ) : null}{' '}
              </div>
            )
          }) : null }
        {widgetObject['custom_triggers_status'] ? (
          <>
            <CommonButtons
              content="Save"
              btnClass="btn-blue"
              onClick={() => customTargetsTableData()}
            />
            <CommonButtons
              //onClick={}
              type="reset"
              content="Cancel"
              background="grey"
            />
          </>
        ) : null}{' '}
        {widgetObject['custom_triggers_status'] ? (
          <div className="cutom-targets-listing">
            <Table>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell> Key </Table.HeaderCell>{' '}
                  {/* <Table.HeaderCell> Field Type </Table.HeaderCell>{' '} */}
                  <Table.HeaderCell> Operator </Table.HeaderCell>{' '}
                  <Table.HeaderCell> Value </Table.HeaderCell>{' '}
                  <Table.HeaderCell> Option </Table.HeaderCell>{' '}
                  <Table.HeaderCell> Actions </Table.HeaderCell>{' '}
                </Table.Row>{' '}
              </Table.Header>{' '}
              <Table.Body>
                {' '}
                {lstSpecificPageData.map((item, index) => {
                  return (
                    <Table.Row key={index}>
                      <Table.Cell> {item.key} </Table.Cell>{' '}
                      {/* <Table.Cell>
                        {' '}
                        {item.type === 0 ? 'Block on' : 'Show on'}{' '}
                      </Table.Cell>{' '} */}
                      <Table.Cell> {item.operator} </Table.Cell>{' '}
                      <Table.Cell> {item.value} </Table.Cell>{' '}
                      <Table.Cell> {item.option} </Table.Cell>{' '}
                      <Table.Cell className="delete-icon">
                        <img
                          src={deleteIcon}
                          alt="placeholder"
                          onClick={() => onDeleteUrl(item.id)}
                        />{' '}
                      </Table.Cell>{' '}
                    </Table.Row>
                  )
                })}{' '}
              </Table.Body>{' '}
            </Table>{' '}
          </div>
        ) : null}{' '}
      </div>{' '}
      {widgetDataAPiSaveCancel ? (
        <>
          <CommonButtons
            content="Save"
            btnClass="btn-blue"
            onClick={updateBehaviour}
          />
          <CommonButtons
            //onClick={}
            type="reset"
            content="Cancel"
            background="grey"
          />
        </>
      ) : null }
    </div>
  )
}
