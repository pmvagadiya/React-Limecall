import React, { useEffect, useState } from 'react'
import classnames from 'classnames'

import CommonButtons from '../../common/CommonButtons'

import girlIcon from '../../assets/images/girl-icon.svg'
import { forEach } from 'lodash'

const tabsTitle = [
  {
    id: 1,
    title: 'Setup call routing'
  },
  {
    id: 2,
    title: 'Personalize page'
  },
  {
    id: 3,
    title: 'Install'
  },
  {
    id: 4,
    title: ' Go live'
  }
]

const WizardBox = props => {
  const { activeSetup } = props
  const { stepsDone } = props
  const [stepsArray, setStepsArray] = useState([])

  const updateSteps = () => {
    const list = []
    for (let i = 0; i <= stepsDone; i++) {
      list.push(i)
    }
    return list
  }
  return (
    <div className="wizard">
      <h2 className="wizard-title">Quick Setup</h2>
      <div className="wizard-holder">
        {tabsTitle.map((item, index) => {
          return (
            <span
              className={classnames('wizard-item', {
                active: updateSteps().includes(index)
              })}
              key={item.id}
            >
              {item.title}
            </span>
          )
        })}
      </div>
      {/* <div className="wizard-bottom-holder">
        <h2 className="title">Need Help understanding your requirements?</h2>
        <p className="description-text">
          Our Team can assist you, We usually reply in under 10 minutes.
        </p>
        <CommonButtons
          content="CHAT NOW"
          background="blue"
          btnClass="btn-modal-style"
        />
        <img src={girlIcon} alt="call" />
      </div> */}
    </div>
  )
}

export default WizardBox
