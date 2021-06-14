import React, { useState, useEffect, useCallback } from 'react'
import { Icon, IconGroup } from 'semantic-ui-react'
import classnames from 'classnames'
import Toggle from '../common/CommonToggle'
import CommonInput from '../common/CommonInput'
import CommonButton from './CommonButtons'

import wordpress from '../assets/images/Dashboard-99.png'
import google from '../assets/images/Dashboard-100.png'
// import jsLogo from '../assets/images/js-logo.svg'

import { useAlert } from 'react-alert'
import { GoogleLogin } from 'react-google-login'
import axios from 'axios'
import { CommonNotify } from './CommonNotify'

const Accordion = props => {
  const {
    handleDataRef = () => {},
    widget = null,
    loading = () => {},
    script = null
  } = props
  const [jsWidget, setJsWidget] = useState('')
  const [jsCode, setJsCode] = useState('')
  const apiToken = localStorage.getItem('access_token')

  const alert = useAlert()

  const loadWidget = useCallback(() => {
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
        if (res.data.data[0]) {
          loading(false)
          setJsWidget(res.data.data[0].script_id)
          let code = `<script data-api-url="${process.env.REACT_APP_BASE_APP_URL}" data-api-key="${res.data.data[0].script_id}" src="https://widget.limecall.com/widget.js"> </script>`
          setJsCode(code)
        }
      })
      .catch(error => {
        loading(false)
      })
  }, [apiToken, loading])

  useEffect(() => {
    if (jsWidget === '') {
      loadWidget()
    }
  }, [jsWidget, loadWidget])

  const callToggle = {
    callTitle: 'JavaScript Snippet',
    callDesc:
      'When turned on, our system is permitted to make automated calls to your customers when requited',
    callId: 'toogleJavaScriptSnippet',
    callref: 'javaScriptSnippet'
  }

  const [javaScriptSnippet, setJavascriptSnippet] = useState(false)
  const [email, setEmail] = useState('')
  const [scripCode, setScriptCode] = useState(false)
  const [collapsable, setCollapsable] = useState({
    javascriptCollapse: false,
    setupCollapse: false,
    googleTagCollapse: false,
    sendsnipperCollapse: false
  })

  const responseGoogle = response => {}

  const sendCode = () => {
    loading(true)

    let head = {
      headers: {
        Authorization: 'Bearer ' + apiToken
      }
    }

    let data = {
      developer_email: email,
      widget_script: jsCode
    }

    const url = `${process.env.REACT_APP_BASE_APP_URL}/api/v1/widget/send-code-to-developer`

    axios
      .post(url, data, head)
      .then(res => {
        if (res.data.errors.length == 0) {
          loading(false)
          setEmail('')
          CommonNotify('Js Code snippet Send successfully', 'success')
        }
      })
      .catch(err => {
        loading(false)
        CommonNotify('Cant Send Email System Error occurred')
      })
  }
  const onCopyText = async jsCode => {
    try {
      await navigator.clipboard.writeText(jsCode)
      CommonNotify('Copied!', 'success')
    } catch (err) {
      CommonNotify('Failed to copy!')
    }
  }

  const handleToggleData = toggleData => {
    setScriptCode(toggleData)
    setJavascriptSnippet(!toggleData)
  }

  const onClickTitle = e => {
    const key = e.target.getAttribute('data')
    setCollapsable({
      [key]: !collapsable[key]
    })
  }

  const onChangeInput = e => {
    const ref = e.target.name
    const value = e.target.value

    setEmail(value)
    return handleDataRef(ref, value)
  }
  return (
    <div className="collaps widget-install">
      <div
        className={classnames('collapse-panel', {
          'collapse-expanded': collapsable.javascriptCollapse
        })}
      >
        <h3
          className="collapse-header custom-collapse-panel-header"
          onClick={onClickTitle}
          data="javascriptCollapse"
        >
          {collapsable.javascriptCollapse === true ? (
            <Icon name="caret up"
              onClick={onClickTitle}
              data="javascriptCollapse" />
          ) : (
            <Icon name="dropdown" 
              onClick={onClickTitle}
              data="javascriptCollapse"/>
          )}
          <div className="logo-wrapper">
            <Icon name="code" />
          </div>
          &nbsp;JavaScript Snippet{' '}
        </h3>{' '}
        <div className="collapse-body">
          <h2 className="collapse-title">
           {' Copy & insert the JavaScript on your website preferably before the closing body tag . '}
          </h2>{' '}
          <div className="javscript-description-holder">
            <Icon name="copy" onClick={() => onCopyText(jsCode)} />
            <p className="collapse-description" id="copyText">
              {jsCode}
            </p>
          </div>{' '}
        </div>{' '}
      </div>{' '}
      <div
        className={classnames('collapse-panel', {
          'collapse-expanded': collapsable.setupCollapse
        })}
      >
        <h3
          className="collapse-header custom-collapse-panel-header"
          onClick={onClickTitle}
          data="setupCollapse"
        >
          {collapsable.setupCollapse === true ? (
            <Icon name="caret up" 
              data="setupCollapse"
              onClick={onClickTitle}/>
          ) : (
            <Icon name="dropdown" 
              data="setupCollapse"
              onClick={onClickTitle}/>
          )}
          <div className="logo-wrapper">
            <Icon name="wordpress" />
          </div>
          Wordpress{' '}
        </h3>{' '}
        <div className="collapse-body">
          <h2 className="collapse-title">
            Download the zip file and then open WordPress account.{' '}
          </h2>{' '}
          {/* <p className="suggestions-text">
            Or, select from these popular suggestions:
          </p>{' '} */}
          <div className="subtext"> 
            <a className="subtextLink"
            href="https://help.limecall.com/en/articles/3562768-how-to-install-limecall-using-wordpress"
            // style={{color:'black'}}
            >
            And Follow these step-by-step guide to Install through WordPress.
            </a>
          </div>
          <br/>
          <div className="suggestion-logo-wrapper">
            {/* <div className="suggestion-logo-holder">
              <img src={wordpress} alt="logo" />
            </div>{' '} */}
            {/* <div className="suggestion-logo-holder">
              <img src={google} alt="logo" />
            </div>{' '} */}
            <a
              download="limecall.zip"
              href="https://app.limecall.com/limecall.zip"
              class="d-inline-block mr-2"
            >
              <img
                src={process.env.REACT_APP_BASE_APP_URL + "/assets/img/logo_setting_2.svg"}
                alt="Logo"
                title="WordPress"
              />
            </a>
          </div>{' '}
        </div>{' '}
      </div>{' '}
      {/* <div
        className={classnames('collapse-panel', {
          'collapse-expanded': collapsable.googleTagCollapse
        })}
      >
        <h3
          className="collapse-header custom-collapse-panel-header"
          onClick={onClickTitle}
          data="googleTagCollapse"
        >
          {collapsable.googleTagCollapse === true ? (
            <Icon name="caret up"
              onClick={onClickTitle}
              data="googleTagCollapse" />
          ) : (
            <Icon name="dropdown" 
              onClick={onClickTitle}
              data="googleTagCollapse"/>
          )}
          <div className="logo-wrapper">
            <Icon name="google" />
          </div>
          Google Tag Manager{' '}
        </h3>
        <div className="collapse-body">
          <h2 className="collapse-title">
          Copy Installation code and open GTM . Now go to Tags, add New and   Select Custom HTML tag. Paste the installation code. 
          <a 
          href="https://help.limecall.com/en/articles/3310671-installing-limecall-using-google-tag-manager"
          className="subtextLink"
          >
          Learn more...{' '}
          </a>
          </h2>{' '}
          <br/>
        <div class="suggestion-logo-wrapper">
          <img 
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIIAAAAWCAMAAAA7KrSaAAABCFBMVEUAAACmpqZ9fX11dXWoqKiysrJ1dXX09PTk5OTg4ODl5eX6+vrb29t1dXV+fn7t7e15eXl8fHyJiYmMjIy6urr5+fl8fHyHh4eysrK/v7/T09NxcXF1dXWBgYGTk5OYmJi6urrLy8vy8vKqqqp6enqVlZWgoKCmpqazs7PX19fw8PB4eHiDg4Oenp6qqqrb29t3d3e6urrPz8/p6emXl5eXl5epqam6urrIyMiLi4uOjo7o6Oi/v7+tra3BwcHp6emVlZVtbW2Ojo6urq6SkpK7u7vq6upmZmaDg4OQkJClpaW+vr6BgYGXl5ednZ26urrk5ORnZ2exsbGVlZW3t7exsbGtra2RkZH5+P/4AAAAWHRSTlMApqamWVShBBQaFgEgpZELppSCfT8CpoZQQSmmo4x8b0wzB5uYdWRgSyQJm4lpWx6eUi4Pa2hWRjmReRJnUTwipqalkXk2H6aQb0lzaltRSi6mioOBaGNcLYNk2AAAAw5JREFUSMfN0NmSmkAAheGTNNDsDCAiBEUIKrhh1FGjo9n3fX//NwkCYjI1ycxFqsx/09XVBfXVwX/UgyefRZy053dv3XpyUsODTHAqw3GDExmOGxQ9fPmbQXPGDRlXxqf/doNKcOfsPo+qYDAxVKWLq2JaKHPv7ePxW+4qPxz3phscBfXb96sdZG+kAcH0GsKU6XoMc4nAciKARGnfeIOj4PbtagfftlBm8RRZ/U1+29CCEBZX8Bwux0Y+IBnRkWDdYIM3rUyQVe0wWAKaLMspVhEZOLC6ChkKkJtEVxcZocERc3YgTJuKLUMwOHPh7AmM6mJnj9pahxts8ezcVIyZ1eW4LsUyil7bluZzeg2NxfAtKgHtf8kF1Q7cCggIIUrq9fit4sbRVHhqU7UjOArDtAKlJqr+gbDb0e0QRkzdSSMnrOxQd8/bm0U4e5nUvCRcM31mNrN3gS6EPqF+zxL0tBdNNZSCrxTQ7peG7zlh2AP6olDj4oEFNMfGGEjJMyIA64zQHcaq7RwIwsgcebwOoFcQYJg+ztt0az61a7UW0J7DWXdMdtQAeBJy6/lc/dAbA7hV9hFwSkHdyQmNiQxA6nTiAT0Q5IJg7glKxwVKgqQvxJ0nNgGMS0LCiRkhtmXBrNU6e0KgJoLP+jGgkVBxgiAQevcAXJSEux9XBwGLPGpMWHdlconIdVNGSZaDIDFM+rIlL5WM4CqNdLQoCdRLEXuSHmCmlwTwyAjjHmZqSVh20LfZ5VADQ+i6gbBbEKyD4bFXrwSlgdWJZybAVCX6CtKYUwwegk1Uldm+Qi0izaQkYDFovvIwnTT1pwcC9gQhGqpGTvhwrjWzV9aaT9RXhPLDZuTTnADpohC8eHRWCao0Wp5SbuoDkMW+pMb5l30c2wiQIGpy2F3i10I5lFBGZU0CFXhRmEiQhBkOWReF4M6dei74e5I5dOaciCtb+2482OCvuRNnajCX/3pRCAipXysA+q/f/kj/+PbuvYhrkt+/eybhUta3T7ng7IzFqZJGpxYA1uh0guMOJxP8BInQWezb3vCfAAAAAElFTkSuQmCC" 
            alt="logo"
            title="Google Tag Manager"
          />
          </div>
        </div>{' '}
      </div>{' '}
       */}
       
      {/*  <div
        className={classnames('collapse-panel', {
          'collapse-expanded': collapsable.googleTagCollapse
        })}
      >
        {/* <h3
          className="collapse-header"
          onClick={onClickTitle}
          data="googleTagCollapse"
        >
          {collapsable.googleTagCollapse === true ? (
            <Icon name="caret up" />
          ) : (
            <Icon name="dropdown" />
          )}
          <div className="logo-wrapper">
            <Icon name="google" />
          </div>
          Google tag manager{' '}
        </h3>{' '} 
        <div className="collapse-body">
          <h2 className="collapse-title">
            Easy, code - free setup with popular services.{' '}
          </h2>{' '}
          <p className="suggestions-text">
            Or, select from these popular suggestions:
          </p>{' '}
          <div className="suggestion-logo-wrapper">
            <GoogleLogin
              clientId="908049893487-g0r1vt07btpuo0sdslo8m46902ijci4n.apps.googleusercontent.com"
              buttonText="Login"
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
            />
            {/* <div className="suggestion-logo-holder">
              <img src={wordpress} alt="logo" />
            </div>{' '} */}
      {/* <div className="suggestion-logo-holder">
              <img src={google} alt="logo" />
            </div>{' '} ]
          </div>{' '}
        </div>
      </div>  */}
      <div
        className={classnames('collapse-panel', {
          'collapse-expanded': collapsable.sendsnipperCollapse
        })}
      >
        <h3
          className="collapse-header custom-collapse-panel-header"
          data="sendsnipperCollapse"
          onClick={onClickTitle}
        >
          {collapsable.sendsnipperCollapse === true ? (
            <Icon name="caret up" 
              data="sendsnipperCollapse"
              onClick={onClickTitle} />
          ) : (
            <Icon name="dropdown" 
              data="sendsnipperCollapse"
              onClick={onClickTitle}/>
          )}
          Send your snippet to your team mate{' '}
        </h3>{' '}
        <div className="collapse-body">
          <h2 className="collapse-title">
            Send instructions to your developer on how to install LimeCall widget.{' '}
          </h2>{' '}
          <CommonInput
            onChange={onChangeInput}
            placeholder="Email"
            name="email"
            type="email"
            defaultValue={email}
          />{' '}
          <CommonButton
            content="Send"
            onClick={sendCode}
            background="blue"
            btnClass="btn-send"
          />
        </div>{' '}
      </div>{' '}
    </div>
  )
}

export default Accordion
