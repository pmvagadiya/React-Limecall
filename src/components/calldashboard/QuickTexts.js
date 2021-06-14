import React, { useState, useEffect } from 'react'
import { TextArea } from 'semantic-ui-react'
import CommonCheckbox from '../../common/CommonCheckbox'
import CommonButtons from '../../common/CommonButtons'
import CommonSelect from '../../common/CommonSelect4'
import MyNumbers from '../numbers/MyNumbers'

import { CommonNotify } from '../../common/CommonNotify'

import axios from 'axios'

const apiToken = localStorage.getItem('access_token')

const QuickTextHeading = ({ callData, onOpenMessageBox }) => (
  <div className="message-heading" onClick={onOpenMessageBox}>
    <button>
      <i className="fas fa-arrow-left"> </i>{' '}
    </button>{' '}
    <p className="message-title">
      {!callData.customer_name ? callData.ip_address : callData.customer_name}
      <span className="message-id"> (#{callData.id})</span>
    </p>
  </div>
)

const QuickTextContent = ({ messages, callData }) => (
  <div className="message-content">
    {' '}
    {messages.map((message, i) => (
      <div className={`message-text message-${message.status}`} key={i}>
        <div className="message-text-holder">
          <p>
            Lorem ipsum dolor sir amet, consectetuer adipiscing elit, sed diam
            nonummy nibh euismod tincidunt ut laoreet dolore magna{' '}
          </p>{' '}
        </div>{' '}
        <div className="message-image"> {/* <Image src="#" /> */} </div>{' '}
      </div>
    ))}{' '}
  </div>
)

const QuickTextFooter = ({ numbers, onChange, onClick }) => (
  <div className="message-footer">
    <div className="message-settings">
      {/* <p className="message-quick-text"> Select No </p>{' '} */}
      {/* <button>
        <i className="fas fa-cog"> </i>{' '}
      </button>{' '} */}
    </div>{' '}
    <div className="message-settings">
      {/* <p className="message-quick-text"> Select No </p>{' '} */}
      {/* <button>
        <i className="fas fa-cog"> </i>{' '}
      </button>{' '} */}

      <CommonSelect
        style={{ height: '35px' }}
        isMulti={false}
        options={numbers}
        defaultValue={0}
        onChange={(p1, p2) => onChange('number', p2.value)}
      />
    </div>{' '}
    <TextArea
      onChange={e => onChange('msg', e.target.value)}
      placeholder="Type your message here..."
    />
    <div className="message-save">
      {/* <CommonCheckbox text="Save as Quick Text" /> */}
      <CommonButtons content="Send" background="green" onClick={onClick} />
    </div>{' '}
  </div>
)

const QuickTexts = ({ messages, callData, callback, loading, widget }) => {
  const [myNumbers, setNumbers] = useState([
    { id: '', name: 'Select Number' },
    { id: '+12627102119', name: '+12627102119' }
  ])

  const [isClasses, setIsClasses] = useState(false)
  const [msgData, setMsgData] = useState({ number: '', msg: '' })

  useEffect(() => {
    fetchNumbers()
  }, [])

  const fetchNumbers = () => {
    loading(true)

    let head = {
      headers: {
        Authorization: 'Bearer ' + apiToken
      }
    }
    const url = `${process.env.REACT_APP_BASE_APP_URL}/api/v1/widget/get-widget-call-settings?widget_id=${widget}`

    axios
      .get(url, head)
      .then(res => {
        loading(false)
        if (res.data.data.available_forward_no) {
          // setWidget(res.data.data[0].id)
          
          let tempRows = [...myNumbers]
          res.data.data.available_forward_no.map((row, index) => {
            if (!row.primary) {
              let obj = {
                id: row.phone_number,
                name: row.phone_number
              }
              tempRows.push(obj)
            }
          })
          setNumbers(tempRows)
        }
      })
      .catch(error => {
        loading(false)
        CommonNotify('Cant fetch numbers')      
      })
  }

  const changeData = (index, value) => {
    const temp = { ...msgData }
    temp[index] = value
    setMsgData(temp)
  }

  const sendMessage = () => {
    setMsgData({ number: '', msg: '' })
    callback(msgData)
  }

  const onOpenMessageBox = () => {
    setIsClasses(!isClasses)
  }

  return (
    <div
      className={['message', `${isClasses ? 'display__message' : ''}`].join(
        ' '
      )}
    >
      <QuickTextHeading
        callData={callData}
        onOpenMessageBox={onOpenMessageBox}
      />
      <QuickTextContent messages={messages} />{' '}
      <QuickTextFooter
        numbers={myNumbers}
        onChange={changeData}
        onClick={sendMessage}
      />
    </div>
  )
}

export default QuickTexts
