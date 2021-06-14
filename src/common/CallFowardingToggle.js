import React, { Component, Fragment } from 'react'
import ReactPhoneInput from 'react-phone-input-2'
import axios from 'axios'
//import 'react-phone-input-2/dist/style.css'

import { Input, Button, Label } from 'semantic-ui-react'

import CommonInput from './CommonInput'
import Toggle from './CommonToggleClass'

const AppMobile = () => (
  <div className="phone-number-wrapper">
    <Label color="green">Primary</Label>
    <p className="default-text">91 7980 57 1601</p>
    <i className="fas fa-info-circle"></i>
  </div>
)

const AppWeb = () => (
  <div className="phone-number-wrapper">
    <Label color="blue">WEB</Label>
    <p className="default-text">Receive Calls in Browser</p>
  </div>
)

const Sip = ({ Number }) => {
  return (
    <div className="phone-number-wrapper">
      <Label color="orange">Phone</Label>
      <Input value={Number} readOnly />
      {/* <p className="default-text">{Number}</p> */}
    </div>
  )
}


class CallFowardingToggle extends Component {
  state = {
    activeToggle: false,
    toggleRef: this.props.dataToggle.forwardRef,
    countryName: ''
  }

  componentDidMount = () => {   
    this.getGeoInfo()
  }

  getGeoInfo = () => {
    axios
      .get('https://ipapi.co/json/')
      .then(response => {
        let data = response.data
        const countryName = data.country.toLowerCase()
        this.setState({
          countryName: countryName
          // countryCode: data.country_calling_code
        })
      })
      .catch(error => {})
  }

  handleToggleData = toggleData => {
    this.setState({ activeToggle: toggleData }, () => {
      return this.props.handleDataRef(
        this.state.activeToggle,
        this.state.toggleRef,
        this.props.number
      )
    })
  }

  render() {
    const {
      dataToggle,
      onChangeCountry,
      dataNumber,
      noToggle = false,
      isButton,
      addNumforVerify,
      addNumberLoader,
      countryName
    } = this.props
    return (
      <div className="toogle-forwading-wrapper">
        <div className="input-contact">
          {dataToggle.forwardingTitle ? (
            <Fragment>
              <div className="forwarding-title-holder">
                <p className="forwarding-title">
                  {dataToggle.forwardingTitle[0]}
                </p>
              </div>
            </Fragment>
          ) : (
            ''
          )}
          {dataToggle.type === 'select' ? (
            <Fragment>
              <div 
              className="input-select-wrapper input-wrapper"
               style={{marginTop: "0 !important"}}>
                <ReactPhoneInput
                  country={this.state.countryName}
                  value={dataNumber}
                  onChange={onChangeCountry}
                  placeholder="+1 (702) 123-4567"
                />
                <Button
                  loading={addNumberLoader}
                  onClick={() => addNumforVerify()}
                >
                  Verify
                </Button>
              </div>
            </Fragment>
          ) : (
            <Fragment>
              {dataToggle.phoneValue === 'mobile' ? (
                <AppMobile />
              ) : dataToggle.phoneValue === 'web' ? (
                <AppWeb />
              ) : (
                <Sip Number={this.props.number} />
              )}
            </Fragment>
          )}
        </div>
        <div className="toggle-enable-holder">
          {dataToggle.forwardingTitle ? (
            <Fragment>
              <div className="forwarding-title-holder">
                <p className="forwarding-title">
                  {dataToggle.forwardingTitle[2]}
                  <i className="fas fa-info-circle"></i>
                </p>
              </div>
            </Fragment>
          ) : (
            ''
          )}
          {noToggle == false && (
            <Toggle
              handleToggleData={this.handleToggleData}
              dataToggleActive={this.state.activeToggle}
              dataStateToggle={dataToggle}
              activeDefault={this.props.active}
            />
          )}
          {/* {isButton && (
             <Button primary className={'forwarding-button-holder'}>
               Verify
             </Button>
           )} */}
        </div>
      </div>
    )
  }
}

export default CallFowardingToggle
