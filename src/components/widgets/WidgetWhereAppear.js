/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment, useState, useEffect } from 'react'
// import { Link } from 'react-router-dom'
import { Tab, Table, TextArea } from 'semantic-ui-react'
import TimezonePicker from 'react-timezone'
import NodeToggle from '../../common/NodeToggle'
import CommonInput from '../../common/CommonInput'
import CommonCheckbox from '../../common/CommonCheckbox'

// import CommonInput from '../../common/CommonInput'
import CommonSelect from '../../common/CommonSelect'
import CommonButtons from '../../common/CommonButtons'

import { CommonNotify } from '../../common/CommonNotify'

import iconSet from '../../assets/images/Dashboard 2-05.png'
import circlePlus from '../../assets/images/cicle-plus.png'
import deleteIcon from '../../assets/images/delete-icon.png'
import _ from 'lodash'

import axios from 'axios'

import {
  lstFieldTypeOptions
} from '../../lib/WidgetData'
import { useAlert } from 'react-alert'

const apiToken = localStorage.getItem('access_token')

const defaultLocations = {
  widget_id: 0,
  display_all_pages: false,
  display_chosen_pages: true,
  display_on_pages: [{ key: 'equals', value: 'google.com' }],
  display_not_page: true,
  display_off_pages: [{ key: 'equals', value: '' }],
  spa_mode: false
}

export const WidgetWhereAppearTitle = () => (
  <div className="accordion-widget-holder">
    <div className="accordion-image-holder">
      <img src={iconSet} alt="logo" />
    </div>{' '}
    <div className="accordion-title-holder">
      <h2 className="accordion-title"> Where should the widget appear ? </h2>{' '}
      <p className="accordion-description"> Define the specific pages where you want to display your widget </p>{' '}
    </div>{' '}
  </div>
)

export const WidgetWhereAppearContent = ({
  widget,
  handleDataRef,
  socialToggle,
  socialToggleActive,
  chosenPage,
  chosenPageToggle,
  socialWidgetActive,
  onClickAddOfficeHour,
  onClickAddOfficeHour2,
  onChangeSelectOfficeHour,
  onChangeSelectWeekdays,
  onChangeSelectLink,
  onClickRemoveOfficeHours,
  onClickRemoveOfficeHours2,
  onChangeInput,
  state,
  loading
}) => {
  const [widgetLocation, setWidgetLocation] = useState(defaultLocations)
  const [isValueChange, setIsValueChange] = useState(false)
  const [isValueSelected, setIsValueSelected] = useState(false)
  const [pagesDataApi, setPagesDataApi] = useState([])
  const [widgetData, setWidgetData] = useState({})
  const [allPages, setAllPages] = useState(false)
  const [chosenPages, setChosenPages] = useState(false)

  // const widgetOption = [
  //   {
  //     text: 'equals'
  //     // value: 'url-equals'
  //   },
  //   {
  //     text: 'starts with'
  //     // value: 'url-starts'
  //   },
  //   {
  //     text: 'ends with'
  //     // value: 'url-ends'
  //   },
  //   {
  //     text: 'contains'
  //     // value: 'url-contains'
  //   }
  // ]
  const widgetOption = ['equals', 'starts with', 'ends with', 'contains']
  const getWidgetData = () => {
    loading(true)
    let head = {
      headers: {
        Authorization: 'Bearer ' + apiToken
      }
    }
    const url = `${process.env.REACT_APP_BASE_APP_URL}/api/v1/widget/widgets`
    axios
      .get(url, head)
      .then(res => {
        loading(false)
        setWidgetData(res.data.data[0])
        if (res.data.data[0].triggers_status) {
          setChosenPages(true)
          setAllPages(false)
        } else {
          setAllPages(true)
          setChosenPages(false)
        }
      })
      .catch(er => {
        loading(false)
        const errors = { ...er }       
        if (errors) {
          CommonNotify('Failed to fetch the settings', 'error')
        } else {
          CommonNotify('Cant widget data', 'error')
        }       
      })
  }
  const pagesDataApiData = () => {
    loading(true)
    let head = {
      headers: {
        Authorization: 'Bearer ' + apiToken
      }
    }
    const url = `${process.env.REACT_APP_BASE_APP_URL}/api/v1/widget/widget/visibility-triggers/${widget.id}`
    axios
      .get(url, head)
      .then(res => {
        loading(false)
        setPagesDataApi(res.data.data)
      })
      .catch(er => {
        loading(false)
        CommonNotify('Cant Fetch Pages Data', 'error')        
      })
  }

  useEffect(() => {
    if (widget.id) {
      pagesDataApiData()
      getWidgetData()
    }
  }, [widget])

  const setLocations = data => {}

  const fetchWidgetLocations = () => {
    loading(true)
    let head = {
      headers: {
        Authorization: 'Bearer ' + apiToken
      }
    }
    const url = `${process.env.REACT_APP_BASE_APP_URL}/api/v1/widget/${widget.id}/pages`

    axios
      .get(url, head)
      .then(res => {
        loading(false)
        if (res.data.data[0]) {
          setLocations(res.data.data)
        }
      })
      .catch(er => {
        loading(false)
        CommonNotify('Cant Fetch Setting', 'error')        
      })
  }

  const updateWidgetLocation = () => {
    loading(true)
    let head = {
      headers: {
        Authorization: 'Bearer ' + apiToken
      }
    }

    const url = `${process.env.REACT_APP_BASE_APP_URL}/api/v1/widget/update-location`

    axios
      .post(url, widgetLocation, head)
      .then(res => {
        loading(false)
        if (res.data.message == 'Successfully') {
          //fetchWidgetLocations()
          CommonNotify('Setting Updated', 'success')
        } else {
          CommonNotify('Cant Updated Setting', 'error')
        }
      })
      .catch(er => {
        loading(false)
        CommonNotify('Cant Updated Setting', 'error')       
      })
  }

  const changeonPage = (index, val) => {
    let oldData = { ...widgetLocation }
    oldData.display_on_pages[index].key = val
    setWidgetLocation(oldData)
  }

  const changeonPageValue = (index, val) => {
    let oldData = { ...widgetLocation }
    oldData.display_on_pages[index].value = val
    setWidgetLocation(oldData)
  }

  const changeoffPage = (index, val) => {
    if (!val) {
      setIsValueSelected(false)
    } else {
      setIsValueSelected(true)
    }
    let oldData = { ...widgetLocation }
    oldData.display_off_pages[index].key = val
    setWidgetLocation(oldData)
  }

  const changeoffPageValue = (index, val) => {
    if (!val) {
      setIsValueChange(false)
    } else {
      setIsValueChange(true)
    }
    let oldData = widgetLocation
    oldData.display_off_pages[index].value = val    
    setWidgetLocation(oldData)
  }

  const changeTypePageValue = (index, val) => {
    if (!val) {
      setIsValueChange(false)
    } else {
      setIsValueChange(true)
    }
    let oldData = widgetLocation
    oldData.display_off_pages[index].visibility_rule_type = val.value
     
    setWidgetLocation(oldData)
  }


  const changeAllPages = (e, data) => {   
    // let oldData = { ...widgetData }    
    // oldData[e] = data
    // setWidgetData(oldData)
    if (data) {
      setAllPages(true)
      setChosenPages(false)
      updateToggle(0)
    } else {
      setAllPages(false)
      setChosenPages(true)
      updateToggle(1)
    }
  }

  const addOnPage = e => {
    let oldData = { ...widgetLocation }
    const row = {
      key: 'equals',
      value: ''
    }

    oldData.display_on_pages.push(row)
    setWidgetLocation(oldData)
  }

  const removeOnPage = index => {
    let oldData = { ...widgetLocation }
    delete oldData.display_on_pages[index]
    setWidgetLocation(oldData)
  }

  const removeOffPage = index => {
    let oldData = { ...widgetLocation }
    delete oldData.display_off_pages[index]
    setWidgetLocation(oldData)
  }

  const addOffPage = e => {
  
    let oldData = { ...widgetLocation }
    const row = {
      key: 'equals',
      value: ''
    }
    oldData.display_off_pages.push(row)
    setWidgetLocation(oldData)
  }

  const changeSelectedPages = (e, data) => {
    // let oldData = { ...widgetData }   
    // oldData[e] = data
    // setWidgetData(oldData)
    if (data) {
      setAllPages(false)
      setChosenPages(true)
      updateToggle(1)
      return
    } else {
      setAllPages(true)
      setChosenPages(false)
      updateToggle(0)
      return
    }
  }
  const updateToggle = data => {
    loading(true)
    let head = {
      headers: {
        Authorization: 'Bearer ' + apiToken
      }
    }
    const url = `${process.env.REACT_APP_BASE_APP_URL}/api/v1/widget/${widget.id}/targets-status/${data}`
    const bodyData = { data: "hello"}
    axios
      .post(url, bodyData, head)
      .then(res => {
        loading(false)
        getWidgetData()
      })
      .catch(err => {
        loading(false)
      })
  } 
  const changeDisplayNotPage = () => {
    let oldData = { ...widgetLocation }
    oldData.display_not_page = !oldData.display_not_page
    setWidgetLocation(oldData)
  }

  const changeSpaMode = () => {
    let oldData = { ...widgetLocation }
    oldData.spa_mode = !oldData.spa_mode
    setWidgetLocation(oldData)
  }
  const setWidgetVisibility = () => {
    loading(true)
    let head = {
      headers: {
        Authorization: 'Bearer ' + apiToken
      }
    }

    const url = `${process.env.REACT_APP_BASE_APP_URL}/api/v1/widget/set-widget-visibility-triggers`
   
    const updateOperator = {
      equals: 'url-equals',
      'starts with': 'url-starts',
      'ends with': 'url-ends',
      contains: 'url-contains'
    }

    const triggerData = widgetLocation.display_off_pages.map( (item, index) => {
      return{
        key: 'url',
          operator: updateOperator[item.key],
          option: 'and',
          type: 1,
          value: item.value,
          visibility_rule_type:  item.visibility_rule_type === 'Block on' ? 'block_on' : 'show_on'
      }
    } )  

   

    const data = {
      script_id: widget.script,
      visibilityTriggers: triggerData
    }  

    axios
      .post(url, data, head)
      .then(res => {
        loading(false)
        pagesDataApiData()
        if (res.status == 200 || (res.data && res.data.message && res.data.message && res.data.message[0] == 'Successfully')) {
          CommonNotify('Settings Updated Successfully', 'success')
        } else {
          CommonNotify(`Can't Update Setting`, 'error')
          
        }
      })
      .catch(err => {
        loading(false)
      })
  }

  const onDeletePagesUrl = index => {
    loading(true)
    let head = {
      headers: {
        Authorization: 'Bearer ' + apiToken
      }
    }
    const url = `${process.env.REACT_APP_BASE_APP_URL}/api/v1/widget/widget/delete-visibility-triggers`
    const data = {
      id: index,
      script_id: widget.script,
      widget_id: widget.id
    }
    axios
      .post(url, data, head)
      .then(res => {
        loading(false)
        pagesDataApiData()
        if (res.data && res.data.message && res.data.message && res.data.message[0] == 'Successfully') {
          CommonNotify('Settings Updated Successfully', 'success')
        } else {
          CommonNotify(`Can't Update Setting`, 'error')
        }      })
      .catch(err => {
        loading(false)
      })
  }
  return (
    <div className="set-availability-wrapper survey-appear appear_section">
      {/* <div className="legal-head">
        <p className="style-widget-title widget-sub-heading"> Display on all pages </p>{' '}
        <NodeToggle
          handleDataRef={e => changeAllPages('triggers_status', e)}
          dataToggle={socialWidgetActive[0]}
          activeDefault={allPages}
        />{' '}
      </div>{' '} */}
      <div className="legal-head">
        <p className="style-widget-title widget-sub-heading"> Display only on chosen pages </p>{' '}
        <NodeToggle
          handleDataRef={e => changeSelectedPages('triggers_status', e)}
          dataToggle={chosenPage[0]}
          activeDefault={chosenPages}
        />{' '}
      </div>{' '}
      {chosenPages ? (
        <div className="legal-content">
          <div id="setHoursWrapper">
            <Fragment>
              <p className="style-widget-title widget-sub-heading">
                Display widget on pages, which:
              </p>{' '}
              {/* {widgetLocation.display_on_pages.map((data, index) => {
                return (
                  <div className="set-hours-wrapper" key={index}>
                    <CommonSelect
                      onChange={(e, { value }) => changeonPage(index, value)}
                      placeholder="starts with"
                      name="weekdays"
                      defaultValue={data.key}
                      className="set-hours-select"
                      options={[
                        ' ',
                        'equals',
                        'starts with',
                        'ends with',
                        'contains'
                      ]}
                    />{' '}
                    <div className="general-content-holder-right">
                      <CommonInput
                        onChange={(e, { value }) =>
                          changeonPageValue(index, value)
                        }
                        name="widgetName"
                        type="text"
                        defaultValue={data.value}
                        placeholder="e.g. http://www.example.com/"
                      />
                    </div>{' '}
                    <CommonButtons
                      onClick={e => removeOnPage(index)}
                      btnClass="btn-delete"
                      image={deleteIcon}
                    />
                  </div>
                )
              })}{' '} */}
            </Fragment>{' '}
          </div>
          {/* <CommonButtons
            onClick={e => addOnPage()}
            content="add page"
            btnClass="btn-hours"
            image={circlePlus}
          /> */}
          <div id="setHoursWrapper">
            {/* <CommonCheckbox
              onClick={e => changeDisplayNotPage()}
              text="Don’t display widget on pages, which:"
              checkboxStyle="modal-checkbox"
              checked={widgetLocation.display_not_page}
              name="checkbox"
            /> */}
            <Fragment>
              {' '}
              {widgetLocation.display_off_pages.map((data, index) => {
                return (
                  <div className="set-hours-wrapper custom-pages" key={index}>
                    <CommonSelect
                      name="type"
                      className="set-hours-select"
                      options={lstFieldTypeOptions}
                      defaultValue={data.type ||  lstFieldTypeOptions[0] }
                      onChange={(e, result) => {
                          changeTypePageValue(index, result)
                      }}
                    />{' '}
                    <CommonSelect
                      onChange={(e, { value }) => changeoffPage(index, value)}
                      // defaultValue={data.key}
                      placeholder="equals"
                      name="link"
                      className="set-hours-select"
                      options={widgetOption}
                    />{' '}
                    <div className="general-content-holder-right">
                      <CommonInput
                        onChange={(e, { value }) =>
                          changeoffPageValue(index, value)
                        }
                        defaultValue={data.value}
                        name="widgetName"
                        type="text"
                        placeholder="e.g. http://www.example.com/"
                      />
                    </div>{' '}
                    <CommonButtons
                      onClick={e => removeOffPage(index)}
                      btnClass="btn-delete"
                      image={deleteIcon}
                    />
                  </div>
                )
              })}{' '}
            </Fragment>{' '}
          </div>
          <div className="addPage">
            <CommonButtons
              onClick={e => addOffPage()}
              content="add page"
              btnClass="btn-hours"
              image={circlePlus}
            />{' '}
          </div>
          {/* <CommonCheckbox
            onChange={e => changeSpaMode()}
            text="Single Page App: Close widget when URL changes"
            checkboxStyle="modal-checkbox"
            name="checkbox"
            checked={widgetLocation.spa_mode}
          /> */}
        </div>
      ): null}
      {chosenPages ? (
        <div className="cutom-targets-listing">
          <Table>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell> Key </Table.HeaderCell>{' '}
                <Table.HeaderCell> Rule </Table.HeaderCell>{' '}
                <Table.HeaderCell> Operator </Table.HeaderCell>{' '}
                <Table.HeaderCell> Value </Table.HeaderCell>{' '}
                {/* <Table.HeaderCell> Option </Table.HeaderCell>{' '} */}
                <Table.HeaderCell> Actions </Table.HeaderCell>{' '}
              </Table.Row>{' '}
            </Table.Header>{' '}
            <Table.Body>
              {' '}
              {pagesDataApi.map((item, index) => {
                return (
                  <Table.Row key={index}>
                    <Table.Cell> {item.key} </Table.Cell>{' '}
                    {/* <Table.Cell> {item.visibility_rule_type} </Table.Cell>{' '} */}
                    <Table.Cell>
                      {' '}
                      {item.visibility_rule_type === 'block_on' ? 'Block on' : 'Show on'}{' '}
                    </Table.Cell>{' '}
                    <Table.Cell> {item.operator} </Table.Cell>{' '}
                    <Table.Cell> {item.value} </Table.Cell>{' '}
                    {/* <Table.Cell> {item.option} </Table.Cell>{' '} */}
                    <Table.Cell className="delete-icon">
                      <img
                        src={deleteIcon}
                        alt="placeholder"
                        onClick={() => onDeletePagesUrl(item.id)}
                      />{' '}
                    </Table.Cell>{' '}
                  </Table.Row>
                )
              })}{' '}
            </Table.Body>{' '}
          </Table>{' '}
        </div>
      ) : null}
      {(isValueChange || isValueSelected) && (
        <>
          <CommonButtons
            style={{ marginTop: '30px' }}
            onClick={setWidgetVisibility}
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
    </div>
  )
}
