import React, { useState, useEffect } from 'react'
import axios from 'axios'

import Requirement from '../components/quicksetup/requirement/Requirement'
import WizardBox from '../components/quicksetup/WizardBox'
import Install from '../components/quicksetup/Install'
import GoLive from '../components/quicksetup//GoLive'
import Customize from '../components/quicksetup/customize/Customize'
import CallRouting from '../components/quicksetup/CallRouting'
import getScript from '../config/getScript'

const QuickSetup = () => {
  const activeStepsOfQuick = localStorage.getItem('quick_setup')
  const apiToken = localStorage.getItem('access_token')
  const [progress, setProgress] = useState(parseInt(activeStepsOfQuick))
  const [script, setScript] = useState('')
  const [stepsDone, setStepsDone] = useState([parseInt(activeStepsOfQuick)])
  let ActiveSetupComponent = Requirement
  const handleContinue = () => {
    const updateProgress = progress + 1
    setProgress(updateProgress)
    setStepsDone(updateProgress)
  }

  const increaseSteps = () => {
    let head = {
      headers: {
        Authorization: 'Bearer ' + apiToken
      }
    }
    const url = `${process.env.REACT_APP_BASE_APP_URL}/api/v1/user/increase-onboarding`
    const data = progress
    axios
      .post(url, data, head)
      .then(res => {
        localStorage.setItem('quick_setup', res.data.data.onboarding_step)
        handleContinue()
      })
      .catch(err => {})
  }

  switch (progress) {
    case 0:
      ActiveSetupComponent = CallRouting
      break
    case 1:
      ActiveSetupComponent = Customize
      break
    case 2:
      ActiveSetupComponent = Install
      break
    case 3:
      ActiveSetupComponent = GoLive
      break
    default:
      ActiveSetupComponent = CallRouting
      break
  }

  useEffect(() => {
    getScript()
      .then(res => {
        const currentScript = res.data.data[0]
        setScript(currentScript)
      })
      .catch(err => {})
  }, [])

  return (
    <div className="quicksetup">
      <div className="quicksetup-wrapper">
        <div className="quicksetup-wizard">
          <WizardBox activeSetup={progress} stepsDone={stepsDone} />
        </div>
        <div className="quicksetup-content">
          <ActiveSetupComponent
            script={script}
            onClick={increaseSteps}
            // increaseSteps={increaseSteps}
          />
        </div>
      </div>
    </div>
  )
}

export default QuickSetup
