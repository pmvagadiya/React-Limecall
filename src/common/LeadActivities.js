import React, { useEffect, useState } from 'react'
import { Button, Dropdown } from 'semantic-ui-react'
import moment from 'moment'

const options = [
  {
    id: 0,
    text: 'All',
    value: 0
  },
  {
    id: 1,
    text: 'Call',
    value: 'CALL'
  },
  {
    id: 2,
    text: 'Note',
    value: 'NOTE'
  },
  {
    id: 3,
    text: 'Score',
    value: 'SCORE'
  },
  {
    id: 4,
    text: 'Assign',
    value: 'ASSIGN'
  },
  {
    id: 5,
    text: 'Sms',
    value: 'SMS'
  },
  {
    id: 6,
    text: 'Tag',
    value: 'TAG'
  },
  {
    id: 7,
    text: 'Mention',
    value: 'MENTION'
  }
]

const LeadActivities = ({ datas }) => {
  const [filter, setFilter] = useState(datas)

  const activitiesColor = type => {
    var colorClass = ''
    var icon = ''

    switch (type) {
      case 'CALL':
        icon = 'fa fa-phone'
        colorClass = 'item-blue'
        break
      case 'SCORE':
        icon = 'fa fa-thumbs-up'
        colorClass = 'item-warning'
        break
      case 'ASSIGN':
        icon = 'fa fa-globe'
        colorClass = 'item-red'
        break
      case 'NOTE':
        colorClass = 'item-green'
        icon = 'fas fa-edit'
        break
      case 'SMS':
        icon = 'fa fa-envelope'
        colorClass = 'item-sms'
        break
      case 'TAG':
        colorClass = 'item-tag'
        icon = 'fa fa-quote-left'
        break
      case 'MENTION':
        colorClass = 'item-mention'
        icon = 'fa fa-share-alt'
      default:
        break
    }
    return { colorClass, icon }
  }

  const onActivityChange = (e, data) => {
    if (!data.value) return setFilter(datas)
    const filterData = datas.filter(obj => {
      return obj.type === data.value
    })
    setFilter(filterData)
  }

  useEffect(() => {
    setFilter(datas)
  }, [datas])

  // formatTime = async () => {
    
  // }

  return (
    <>
      <div className="activities-wrapper">
        <Dropdown
          className="dropButton"
          placeholder="All"
          onChange={(e, data) => onActivityChange(e, data)}
          selection
          options={options}
        />
        {filter?.map(data => {
          return (
            <div className="activities-main">
              <div
                className={`sl-activities-item ${
                  activitiesColor(data.type).colorClass
                }`}
              >
                <div class="sl-icon">
                  <i className={`${activitiesColor(data.type).icon}`}></i>
                </div>
                <div class="sl-content box px-3 py-2">
                  <p class="text-color mb-0">
                    <small> {moment.utc(data.created_at).local().format('mm/DD/yyyy hh:mm:ss')} </small>
                    <p>{data?.action?.data}</p>
                  </p>
                  <Button primary>{data?.action?.userName}</Button>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}

export default LeadActivities
