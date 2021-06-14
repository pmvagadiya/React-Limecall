import React, { useState } from 'react'
import { Dimmer, Loader } from 'semantic-ui-react'
import axios from 'axios'

import ContentFooter from '../ContentFooter'
import ContentHeader from '../ContentHeader'
import QuickSetupCheckbox from './QuickSetupCheckbox'

import quicksetupincrease from '../../../assets/images/quicksetupincrease.svg'
import quicksetupsmile from '../../../assets/images/quicksetupsmile.svg'
import quicksetupclock from '../../../assets/images/quicksetupclock.svg'
import { CommonNotify } from '../../../common/CommonNotify'

const apiToken = localStorage.getItem('access_token')

const checkboxContent = [
  {
    img: quicksetupincrease,
    title: 'Increase conversion on my website',
    desc: 'I want more passive leads to convert into sales calls.'
  },
  {
    img: quicksetupsmile,
    title: 'Get more leads from your web visitors',
    desc: 'I am want my sales team to get morsesales qualified leads.'
  },
  {
    img: quicksetupclock,
    title: 'Reduce lead response time',
    desc: 'I want my hot leads to get a top quality service.'
  }
]

const Requirement = props => {
  const { onClick, script } = props
  const [isLoading, setIsLoading] = useState(false)
  const [radioData, setRadioData] = useState('')

  const onSaveCompanyData = () => {
    setIsLoading(true)
    const Url = `${process.env.REACT_APP_BASE_APP_URL}/api/v1/user/save-company-data`
    const head = {
      headers: {
        Authorization: 'Bearer ' + apiToken
      }
    }
    const payload = {
      achieve: radioData,
      widget_id: script.id
    }
    axios
      .post(Url, payload, head)
      .then(res => {
        setIsLoading(false)
        CommonNotify('Successful', 'success')
        onClick()
      })
      .catch(error => {
        const errorMessage = { ...error }       
        setIsLoading(false)
        CommonNotify(errorMessage.response.data.errors[0])
      })
  }
  const changeRadioData = checkBoxItem => {
    setRadioData(checkBoxItem.title)
  }  
  return (
    <div className="requirement">
      <Dimmer active={isLoading}>
        <Loader />
      </Dimmer>
      <ContentHeader content="What are you here to do" />

      <div className="requirement-content">
        {checkboxContent.map((checkBoxItem, index) => {
          return (
            <QuickSetupCheckbox
              key={index}
              content={checkBoxItem}
              changeRadioData={() => changeRadioData(checkBoxItem)}
            />
          )
        })}
      </div>
      {radioData ? <ContentFooter onClick={onSaveCompanyData} /> : null}
    </div>
  )
}

export default Requirement
