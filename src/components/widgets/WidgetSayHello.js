import React, { Fragment } from 'react'
import { TextArea } from 'semantic-ui-react'
import iconSay from '../../assets/images/Dashboard 2-03.png'

import CommonSelect from '../../common/CommonSelect'
import CommonButton from '../../common/CommonButtons'
import CommonInput from '../../common/CommonInput'

export const SayHelloTitle = () => {
  return (
    <div className="accordion-widget-holder">
      <div className="accordion-image-holder">
        <img src={iconSay} alt="logo" />
      </div>
      <div className="accordion-title-holder">
        <h2 className="accordion-title">Say hello in (almost) any language</h2>
        <p className="accordion-description">
          Introduce your team in upto 38 languages
        </p>
      </div>
    </div>
  )
}

export const SayHelloContent = ({
  onChangeInput,
  onChangeSelect,
  languageList
}) => {
  return (
    <Fragment>
      <div className="say-hello-wrapper">
        <form action="">
          <div className="greeting-holder">
            <p className="say-title say-text">Greeting</p>
            <p className="greeting-description say-text">
              Say hi to your customers when they open the Messenger.
            </p>
            <p className="english-text">English</p>
            <CommonInput
              onChange={onChangeInput}
              name="englishInput"
              type="text"
            />
          </div>
          <div className="team-intro-wrapper">
            <p className="team-intro-title say-text">Team Intro</p>
            <p className="team-intro-description say-text">
              Introduce your team and say how you can help your customer.
            </p>
            <p className="english-text">English</p>
            <TextArea
              onChange={onChangeInput}
              className="english-textarea"
              rows={5}
              placeholder="Ask us anything, or share your feedback"
              name="englishTextArea"
            />
            <p className="remaining-text">120 Characters remaining</p>
          </div>
          <div className="default-language-wrapper">
            <p className="say-text default-language">Default language</p>
            <p className="say-text default-description">
              Display the Messenger interface in:
            </p>
            <CommonSelect
              onChange={onChangeSelect}
              className="default-language-select"
              name="filterLanguage"
              options={languageList}
            />
            <p className="say-text addition-languate-text">
              Additional Languages
            </p>
            <p className="say-text language-desc">
              Display the Messenger in these languages when they match your
              customers' device settings
            </p>
            <div className="add-language-wrapper">
              <p className="add-text">Add language</p>
            </div>
          </div>
          <div className="widget-btn-wrapper">
            <CommonButton
              content="Save and set live"
              background="green"
              btnClass="btn-save"
            />
            <CommonButton
              content="Cancel"
              background="white"
              btnClass="btn-cancel"
            />
          </div>
        </form>
      </div>
    </Fragment>
  )
}
