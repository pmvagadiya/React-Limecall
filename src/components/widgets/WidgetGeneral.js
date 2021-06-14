import React, { useState, useEffect, useRef, Profiler } from 'react'
// import { TextArea } from 'semantic-ui-react'
import CommonInput from '../../common/CommonInput'
import CommonSelect3 from '../../common/CommonSelect3'
import CommonSelect from '../../common/CommonSelect'
import CommonButton from '../../common/CommonButtons'
import CommonGroupButton from '../../common/CommonGroupButton'

import CommonButtons from '../../common/CommonButtons'

import axios from 'axios'

import iconEmail from '../../assets/images/Dashboard 2-08.png'

import { useAlert } from 'react-alert'
import Toggle from '../../common/CommonToggle'
import Dropzone from 'react-dropzone-uploader'
import { Icon } from 'semantic-ui-react'
import { CommonNotify } from '../../common/CommonNotify'

const apiToken = localStorage.getItem('access_token')

const defaultSetting = {
  name: '',
  allow_business_only: false,
  time_zone: 'UTC',
  language: 'en'
}

const callToggle = {
  callTitle: 'Business email only',
  callDesc:
    'When turned on, our system is permitted to make automated calls to your customers when requited',
  callId: 'Business_email_only',
  callref: 'Business_email_only'
}

const callRecord = {
  callTitle: 'Call record',
  callDesc:
    'When turned on, our system is permitted to make automated calls to your customers when requited',
  callId: 'Call_record',
  callref: 'Call_record'
}

const deleteLogoURL = `${process.env.REACT_APP_BASE_APP_URL}/api/v1/user/remove-company-logo`;

export const WidgetGeneralTitle = () => (
  <div className="accordion-widget-holder">
    <div className="accordion-image-holder">
      <img src={iconEmail} alt="logo" />
    </div>{' '}
    <div className="accordion-title-holder">
      <h2 className="accordion-title"> General Settings </h2>{' '}
      <p className="accordion-description">
        Customize your widget with zero coding and provide personalized resolutions to your customers.{' '}
      </p>{' '}
    </div>{' '}
  </div>
)

export const WidgetGeneralContent = ({
  widget,
  onChangeSelect,
  handleGroupBtnData,
  onChangeInput,
  onChangeTimeZone,
  state,
  loading
}) => {
  const fileInputRef = useRef(null)
  const languageRef = useRef('')

  const languagesOptions = ['English', 'French', 'Germany']
  const languagesValues = ['en', 'fr', 'gr']

  const languages = [
    {
      text: 'English',
      value: 'en'
    },
    {
      text: 'French',
      value: 'fr'
    },
    {
      text: 'Germany',
      value: 'gr'
    }
  ]

  const [widgetName, setWidgetName] = useState('')
  const [emailNotification, setEmailNotification] = useState('')
  const [companyBrand, setCompanyBrand] = useState(0)
  const [companyLogo, setCompanyLogo] = useState(null)
  const [companyLogoImg, setCompanyLogoImg] = useState('')
  const [timeZone, setTimeZone] = useState('')
  const [widgetLanguage, setWidgetLanguage] = useState(null)
  //const [isDataChange, setIsDataChange] = useState(false)
  const [widgetSetting, setWidgetSetting] = useState(null)
  const [onSaveCancel, setOnSaveCancel] = useState(false)
  const [isFileSelected, setIsFileSelected] = useState(false)
  const [isLanguageSelected, setIsLanguageSelected] = useState(false)
  const [isTimeSelected, setIsTimeSelected] = useState(false)
  const [isMailSelected, setIsMailSelected] = useState(false)
  const [isWidgetSettingSelected, setIsWidgetSettingSelected] = useState(false)
  const [logo, setLogo] = useState(null)
  const [getLogoApi, setGetLogoApi] = useState(null)
  const [apiResponseSetting, setApiResponseSetting] = useState({})

  const [callRecording, setCallRecording] = useState(false)



  const alert = useAlert()
  const selectLanguage = (e, data) => {
    if (data) {
      setOnSaveCancel(true)
    } else {
      setIsLanguageSelected(false)
    }
    let settings = { ...widgetSetting }
    settings.language = data.value
    setWidgetSetting(settings)
  }

  const selectTimeZone = e => {
    if (e) {
      setOnSaveCancel(true)
    } else {
      setIsTimeSelected(false)
    }
    let settings = { ...widgetSetting }
    settings.time_zone = e
    setWidgetSetting(settings)
  }

  const selectMail = e => {
    if (e) {
      setIsMailSelected(true)
    } else {
      setIsMailSelected(false)
    }
    let settings = { ...widgetSetting }
    if (e == 'Yes') {
      settings.allow_business_only = true
    } else {
      settings.allow_business_only = false
    }
    setWidgetSetting(settings)
  }

  useEffect(() => {
    if (widget.id == '' || widget.id == 0) return
    getSettings()
    getRecorderValue()
    getCompany()
  }, [widget])

  const changeWidgetSetting = (key, value) => {
    if (value) {
      setOnSaveCancel(true)
    } else {
      setIsWidgetSettingSelected(false)
    }
    let setting = { ...widgetSetting }
    setting[key] = value
    setWidgetSetting(setting)
  }

  const setData = data => {
    setWidgetName(data.widget_name)
    setEmailNotification(data.email_notifications)
    setCompanyBrand(data.display_company_name)
    setCompanyLogoImg(data.company_logo)
    setTimeZone(data.timezone)

    setWidgetLanguage(data.language)

  }

  const getSettings = () => {
    // const apiToken = sessionStorage.getItem('access_token')
    const apiToken = localStorage.getItem('access_token')
    loading(true)
    let head = {
      headers: {
        Authorization: 'Bearer ' + apiToken
      }
    }
    const url = `${process.env.REACT_APP_BASE_APP_URL}/api/v1/widget/${widget.id}`


    axios
      .get(url, head)
      .then(res => {
        if (res.data.data) {
          
          loading(false)
          setData(res.data.data[0])
          setWidgetSetting(res.data.data[0])
          setApiResponseSetting(res.data.data[0])
          // const responseData = res.data.data
          // const data = res.data.data.language
          // const defaultLanguage = languages.filter(item => item.value === data)
          // const defaultLanguageText = defaultLanguage.map(item => item)
          // responseData.language = defaultLanguageText
          // setWidgetSetting(responseData)
          // setDefaultLanguage(defaultLanguageText)
        }
      })
      .catch(er => {
        loading(false)
      })
  }

  const getRecorderValue = () => {
    // const apiToken = sessionStorage.getItem('access_token')
    const apiToken = localStorage.getItem('access_token')
    loading(true)
    let head = {
      headers: {
        Authorization: 'Bearer ' + apiToken
      }
    }
    const url = `${process.env.REACT_APP_BASE_APP_URL}/api/v1/widget/get-widget-call-settings?widget_id=${widget.id}`

    axios
      .get(url, head)
      .then(res => {
        if (res.data.data) { 
          const result = res.data.data.call_recording.status == 1 ? true : false          
           setCallRecording(result)
        }
      })
      .catch(er => {
        loading(false)
      })
  }

  const getCompany = () => {
    const apiToken = localStorage.getItem('access_token')

    loading(true)
    let head = {
      headers: {
        Authorization: 'Bearer ' + apiToken
      }
    }
    const url = `${process.env.REACT_APP_BASE_APP_URL}/api/v1/user/profile`

    axios
      .get(url, head)
      .then(res => {
        if (res.data.data) {
          setLogo(res.data.data.company.company_logo)
          setGetLogoApi(res.data.data.company.company_logo)
        }
      })
      .catch (er => {})
  }

  const updateLogo = () => {
     const apiToken = localStorage.getItem('access_token')

    if (getLogoApi === logo) {
      getSettings()

      return
    }
    loading(true)
    let head = {
      headers: {
        Authorization: 'Bearer ' + apiToken
      }
    }
    var url = `${process.env.REACT_APP_BASE_APP_URL}/api/v1/user/company-logo`
    const form = new FormData()
    form.append('company_logo', logo)
    // const data = {
    //   company_logo: logo.file
    // }
    axios
      .post(url, form, head)
      .then(res => {
       
        loading(false)
        if (res.data.message == 'Successfully') {
          CommonNotify('Logo successfully updated...', 'success')
          getSettings()
          getCompany()
        } else {
          CommonNotify('Data cannot saved System error occurred...')
        }
      })
      .catch(err => {
        loading(false)
      })
  }

  const updateGenSetting = () => {

     const apiToken = localStorage.getItem('access_token')

    loading(true)
    let head = {
      headers: {
        Authorization: 'Bearer ' + apiToken
      }
    }
    var url = `${process.env.REACT_APP_BASE_APP_URL}/api/v1/widget/general-settings`
    axios
      .post(url, widgetSetting, head)
      .then(res => {
        loading(false)       
        if (res.data.message == 'Successfully') {
          CommonNotify('Data successfully updated...', 'success')
          setOnSaveCancel(false)
          updateLogo()
        } else {
          CommonNotify('Data cannot saved System error occurred...')
        }
      })
      .catch(error => {
        if (error.response) {
          loading(false)        
        } else if (error.request) {
          // The request was made but no response was received
         
        } else {
          // Something happened in setting up the request that triggered an Error
          
        }
      })
  }

  const openFileDialog = e => {
    fileInputRef.current.click()
  }

  const handleFileSelected = e => {
    if (
      e.target.files[0].type === 'image/png' ||
      e.target.files[0].type === 'image/jpg' ||
      e.target.files[0].type === 'image/jpeg' ||
      e.target.files[0].type === 'image/svg'
    ) {
      CommonNotify('Company Logo uploaded successfully...', 'success')
    } else {
      CommonNotify('Company logo is not uploaded...')
    }
    if (e.target.files) {
      setOnSaveCancel(true)
    } else {
      setIsFileSelected(false)
    }
    const files = Array.from(e.target.files)
    setCompanyLogo(files[0])
  }

  const handleRecorderData = toggleData => {
   
     let newData = toggleData ? 1 : 0
     const apiToken = localStorage.getItem('access_token')
    loading(true)
    let head = {
      headers: {
        Authorization: 'Bearer ' + apiToken
      }
    }
    var url = `${process.env.REACT_APP_BASE_APP_URL}/api/v1/widget/call-record` 
    axios
      .post(url, {widget_id: widgetSetting.id, status: newData}, head)
      .then(res => {
        loading(false)        
        if (res.data.message == 'Successfully') {
          setCallRecording(toggleData);
          CommonNotify('Data successfully updated...', 'success')         
        } else {
          CommonNotify('Data cannot saved System error occurred...')
        }
      })
      .catch(error => {
        if (error.response) {
          loading(false)        
        } else if (error.request) {
          // The request was made but no response was received
         
        } else {
          // Something happened in setting up the request that triggered an Error
         
        }
      })
  }

  const handleToggleData = (toggleData, index) => {
    let updateWidgetSetting = { ...widgetSetting }
    updateWidgetSetting.allow_business_only = parseInt(`${toggleData ? 1 : 0}`)

     const apiToken = localStorage.getItem('access_token')

    loading(true)
    let head = {
      headers: {
        Authorization: 'Bearer ' + apiToken
      }
    }
    var url = `${process.env.REACT_APP_BASE_APP_URL}/api/v1/widget/general-settings`
    axios
      .post(url, updateWidgetSetting, head)
      .then(res => {
        loading(false)        
        if (res.data.message == 'Successfully') {
          setWidgetSetting(updateWidgetSetting);
          CommonNotify('Data successfully updated...', 'success')
          getSettings()
        } else {
          CommonNotify('Data cannot saved System error occurred...')
        }
      })
      .catch(error => {
        if (error.response) {
          loading(false)        
        } else if (error.request) {
          // The request was made but no response was received
         
        } else {
          // Something happened in setting up the request that triggered an Error
         
        }
      })
    setWidgetSetting(updateWidgetSetting)
  }

  

  const onUploadLogo = ({ file }, status) => {
    setLogo(file)
    setIsFileSelected(true)
    setOnSaveCancel(true)
  }
  const oncancel = () => {
    setWidgetSetting(apiResponseSetting)
    setOnSaveCancel(false)
  }
  return (
    <div className="email-timezone-wrapper">
      <div className="general-content-wrapper">
        <div className="general-content-holder">
          <p className="general-content-title"> Widget Name </p>{' '}
          <p className="general-content-desc">Set the name of your widget </p>{' '}
        </div>{' '}
        <div className="general-content-holder-right">
          <CommonInput
            onChange={e => changeWidgetSetting('name', e.target.value)}
            value={widgetSetting && widgetSetting.name}
            name="widgetName"
            type="text"
            placeholder="Enter a name"
          />
        </div>{' '}
      </div>{' '}
      <input
        type="file"
        onChange={e => handleFileSelected(e)}
        id="file"
        ref={fileInputRef}
        style={{
          display: 'none'
        }}
        accept="image/*"
      />{' '}
      <div className="general-content-wrapper">
        <div className="general-content-holder">
          <p className="general-content-title"> Email Notification </p>{' '}
          <p className="general-content-desc">Email notifications will be sent to this email</p>{' '}
        </div>{' '}
        <div className="general-content-holder-right">
          <CommonInput
            defaultValue={localStorage.getItem('email')}
            disabled
            name="widgetEmail"
            type="text"
          />
        </div>{' '}
      </div>{' '}
      <div className="general-content-wrapper general-content-wrapper-thrid">
        <div className="general-content-holder">
          <p className="general-content-title"> Company Logo </p>{' '}
          <p className="general-content-desc">
            Upload your company's logo and embed it in your widget.{' '}
          </p>
          {''}
        </div>{' '}
        <div className="general-content-holder-right">
          <Dropzone
            canCancel={true}
            canRemove={true}
            canRestart={true}
            inputContent={
              logo ? (
                <img
                  className="companyLogoImage"
                  src={`${process.env.REACT_APP_BASE_APP_URL}/storage${logo}`}
                  alt=""
                />
              ) : (
                <Icon name="upload" />
              )
            }
            onChangeStatus={(e, status) => onUploadLogo(e, status)}
            accept="image/*"
          />
          {/* <CommonButton
              onClick={e => openFileDialog()}
              type="file"
              content="Upload an Image"
              btnClass="btn-upload"
            /> */}
          <p>Supports jpg, png, jpeg, svg</p>
          <p> Max File size 5 MB
            <Icon
              name="trash alternate"
              className="remove-logo"
              onClick={(e)=>{
                let head = {
                  headers: {
                    Authorization: 'Bearer ' + apiToken
                  }
                }
                const form = new FormData()
                form.append('time_zone', 'GMT')
                axios
                .post(deleteLogoURL, form, head)
                .then(res => {                
                  loading(false)
                  if (res.data.message == 'Successfully') {
                    CommonNotify('Logo successfully Removed...', 'success')
                    getSettings()
                    getCompany()
                  } else {
                    CommonNotify('Data cannot saved System error occurred...')
                  }
                })
                .catch(err => {
                  loading(false)
                })
              }}
            >

            </Icon>
          </p>
        </div>{' '}
        {/* {companyLogo && (
          <div
            style={{
              display: 'flex'
            }}
          >
            <div
              style={{
                flex: '80%'
              }}
            >
              <p
                style={{
                  color: '#f36723'
                }}
              >
                {' '}
                {companyLogo.name}{' '}
              </p>{' '}
            </div>{' '}
            <div
              style={{
                flex: '20%'
              }}
            >
              {' '}
              <a
                style={{
                  marginLeft: '5px',
                  color: '#f36723'
                }}
                href="javascript:void(0)"
                onClick={e => setCompanyLogo(null)}
              >
                X{' '}
              </a>{' '}
            </div>{' '}
          </div>
        )}{' '} */}
      </div>{' '}
      {/* <div className="general-content-wrapper  general-content-wrapper-fourth">
                    <div className="general-content-holder">
                      <p className="general-content-title">Data Protection Message</p>
                      <p className="general-content-desc">
                        A customized data protection message that will appear on each page
                        of the widget
                      </p>
                    </div>
                    <div className="general-content-holder-right">
                      <TextArea
                        onChange={onChangeInput}
                        rows="5"
                        name="dataProtectionMessage"
                        className="data-protection-textarea"
                      />
                    </div>
                  </div> */}{' '}
      <div className="general-content-wrapper general-content-wrapper-fifth">
        <div className="general-content-holder">
          <p className="general-content-title"> Widget Language </p>{' '}
          <p className="general-content-desc"> Set your default language </p>{' '}
        </div>{' '}
        <div className="general-content-holder-right">
          <CommonSelect3
            isGray
            ref={languageRef}
            onChange={selectLanguage}
            // defaultValue={defaultLanguage && defaultLanguage[0]}
            value={widgetSetting && widgetSetting.language}
            name="widgetLanguage"
            // placeholder="English"
            options={languages}
            isMulti={false}
          />{' '}
        </div>{' '}
      </div>


      <div className="displayname-btn groupbtn-holder">
      <div className="groupbtn-text">
          <p className="groupbtn-title">Business email only</p>
          <p className="groupbtn-desc">
            Allow prospects to enter only business account in the widget
          </p>
        </div>
      
        <div className="groupbtn-wrapper">
          <Toggle
            handleToggleData={(data) => handleToggleData(data, 'allow_business_only')}
            dataToggleActive={
              widgetSetting && widgetSetting.allow_business_only ? true : false
            }
            dataStateToggle={callToggle}
            activeDefault={ (widgetSetting && parseInt(widgetSetting.allow_business_only)) === 0 ? false : true}
          />
        </div>
      </div>



      <div className="displayname-btn groupbtn-holder">
      <div className="groupbtn-text">
          <p className="groupbtn-title">Call Recording</p>
          <p className="groupbtn-desc">
            Enable / disable call recording feature
          </p>
        </div>
        <div className="groupbtn-wrapper">
          <Toggle
            handleToggleData={(data) => handleRecorderData(data)}
            dataToggleActive={
               callRecording 
            }
            dataStateToggle={callRecord}
            activeDefault={callRecording }
          />
        </div>
      </div>


     



      {onSaveCancel && (
        <>
          <CommonButtons
            onClick={() => updateGenSetting()}
            type="button"
            content="Save"
            background="blue"
          />
          <CommonButtons
            onClick={()=> oncancel()}
            type="reset"
            content="Cancel"
            background="grey"
          />
        </>
      )}
    </div>
  )
}
