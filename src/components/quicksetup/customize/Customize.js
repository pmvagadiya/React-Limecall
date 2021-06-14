import React, { useState } from 'react'
import ColorPickerQuick from './ColorPickerQuick'
import { TextArea, Rail, Ref, Button, Tab } from 'semantic-ui-react'

import CommonInput from '../../../common/CommonInput'
import CommonSelect from '../../../common/CommonSelect'
import ContentFooter from '../ContentFooter'
// import modernTemplate from '../../../assets/images/modern_template.png'
import smartTemplate from '../../../assets/images/smart-template.png'
import classicTemplate from '../../../assets/images/Classic.png'
import modernTemplate from '../../../assets/images/modern.png'
import iconStyle from '../../../assets/images/Dashboard 2-07.png'
import callMeBack from '../../../assets/images/phone-black.svg'
import callMeLetter from '../../../assets/images/mini-clock.png'
import leaveMessage from '../../../assets/images/message.png'
import axios from 'axios'
import { CommonNotify } from '../../../common/CommonNotify'


const panes = [
  { menuItem: 'Web Call', render: () => <Tab.Pane>Tab 1 Content</Tab.Pane> },
  {
    menuItem: 'Call Me Back',
    render: () => <Tab.Pane>Tab 2 Content</Tab.Pane>
  },
  {
    menuItem: 'Call Me Later',
    render: () => <Tab.Pane>Tab 3 Content</Tab.Pane>
  },
  {
    menuItem: 'Leave A Message',
    render: () => <Tab.Pane>Tab 3 Content</Tab.Pane>
  }
]
const Customize = props => {
  const { onClick, increaseSteps } = props
  const [language, setLanguage] = useState('English')
  const [companyName, setCompanyName] = useState('')
  const [message, setMessage] = useState('')
  const [theme, setTheme] = useState('Classic')
  const [color, setColor] = useState('#662D91')
  const [tabs, setTabs] = useState({
    clickToCall: true,
    callMeBack: false,
    callMeLater: false,
    leaveMessage: false
  })
  const [onContinueButton, setOnContinueButton] = useState(false)
  const onChangeTextArea = e => {
    const value = e.target.value
    setMessage(value)
  }

  const onChangeInput = e => {
    const companyValue = e.target.value

    setCompanyName(companyValue)
  }

  const onChangeSelect = e => {
    const value = e.target.innerText

    setLanguage(value)
  }

  const onTabChange = e => {
    const target = e.target.id
    if (target === 'clickToCall') {
      const data = {
        clickToCall: true,
        callMeBack: false,
        callMeLater: false,
        leaveMessage: false
      }
      setTabs(data)
    }
    if (target === 'callMeBack') {
      const data = {
        clickToCall: false,
        callMeBack: true,
        callMeLater: false,
        leaveMessage: false
      }
      setTabs(data)
    }
    if (target === 'callMeLater') {
      const data = {
        clickToCall: false,
        callMeBack: false,
        callMeLater: true,
        leaveMessage: false
      }
      setTabs(data)
    }
    if (target === 'leaveMessage') {
      const data = {
        clickToCall: false,
        callMeBack: false,
        callMeLater: false,
        leaveMessage: true
      }
      setTabs(data)
    }
  }

  const onThemeChange = e => {
    const value = e.target.innerText
    setTheme(value)
  }
  const changeHandler = colors => {  
    setColor(colors.color)
  }
  const onClickColor = e => {
    const colorhex = e.target.getAttribute('data')
    setColor(colorhex)
  }

  const onClickingContinue = () => {
    const apiToken = localStorage.getItem('access_token')
    setOnContinueButton(true)
    if (theme === '' || color === '' || companyName === '' || message === '') {
      CommonNotify('Please fill all felids', 'warning')
      setOnContinueButton(false)
      return
    }
    let head = {
      headers: {
        Authorization: 'Bearer ' + apiToken
      }
    }
    const url = `${process.env.REACT_APP_BASE_APP_URL}/api/v1/widget/quick-setup`
    const updateThemeData = {
      Classic: 1,
      Smart: 2,
      Modern: 3
    }
    const payload = {
      template_type: updateThemeData[theme],
      widget_color: color,
      company_name: companyName,
      bubble_text: message
    }

    axios
      .post(url, payload, head)
      .then(res => {
        CommonNotify('Successfully updated', 'success')
        setOnContinueButton(false)
        onClick()
      })
      .catch(error => {
        const errors = { ...error }        
        if (errors.response.data.errors) {
          const errorShown = errors.response.data.errors
          CommonNotify(errorShown[0])
          setOnContinueButton(false)
        } else {
          CommonNotify('Some thing went wrong')
        }
      })
  }
  return (
    <div className="customize">
      <div style={{ background: '#fff' }}>
        <div className="customize-title-wrapper">
          <h2 className="customize-title">
            Customize assistant to match your brand and website.
          </h2>
        </div>
        <div className="language-wrapper align-box">
          <h2 className="title">Theme</h2>
          <CommonSelect
            onChange={e => onThemeChange(e)}
            // className="language-select"
            name="language"
            options={[' ', 'Classic', 'Smart', 'Modern']}
            defaultValue={'Classic'}
            value={theme}
            disabled={onContinueButton}
          />
        </div>
        <ColorPickerQuick
          changeHandler={e => changeHandler(e)}
          color={color}
          onClickColor={onClickColor}
          disabled={onContinueButton}
        />
        <div className="company-wrapper align-box">
          <h2 className="title">Company Name</h2>
          <CommonInput
            onChange={onChangeInput}
            name="companyName"
            type="text"
            inputStyle="input-company"
            defaultValue={companyName}
            disabled={onContinueButton}
          />
        </div>
        <div className="welcome-wrapper align-box">
          <h2 className="title">Welcome Message</h2>
          <TextArea
            onChange={onChangeTextArea}
            placeholder="e.g. lorem ipsum dolor sit amet"
            className="welcome-textarea"
            rows="5"
            defaultValue={message}
            disabled={onContinueButton}
          />
        </div>

        {/* <div className="language-wrapper align-box">
          <h2 className="title">Default Language</h2>
          <CommonSelect
            onChange={onChangeSelect}
            className="language-select"
            name="language"
            options={[' ', 'English']}
            defaultValue={language}
          />
        </div> */}
        <ContentFooter
          loading={onContinueButton}
          onClick={onClickingContinue}
        />
      </div>
      <div>
        <Ref
          style={{
            background: '#fff',
            left: '70%',
            top: '50px',
            height: 'auto',
            padding: '20px',
            width: '23%'
          }}
        >
          <Rail position="right">
            {/* <Sticky style={{ background: '#fff' }}> */}
            {theme === 'Classic' ? (
              <div style={{ color: `${color}` }}>
                <h1>Classic</h1>
                <div>
                  <img src={classicTemplate} style={{ width: '100%' }} alt="" />
                </div>
              </div>
            ) : theme === 'Smart' ? (
              <div style={{ color: `${color}` }}>
                <h1>Smart</h1>
                <div>
                  <img src={smartTemplate} style={{ width: '100%' }} alt="" />
                </div>
              </div>
            ) : theme === 'Modern' ? (
              <div style={{ color: `${color}` }}>
                <h1>Modern</h1>
                <div>
                  <img src={modernTemplate} style={{ width: '100%' }} alt="" />
                </div>
              </div>
            ) : null}
            {/* </Sticky> */}
          </Rail>
        </Ref>
      </div>
    </div>
  )
}

export default Customize
