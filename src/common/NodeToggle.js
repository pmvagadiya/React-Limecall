import React, { Component } from 'react'
import { Input } from 'semantic-ui-react'
import Toggle from './CommonToggle'
class NodeToggle extends Component {
  state = {
    activeToggle: false,
    toggleRef: this.props.dataToggle.callref,
    inputDataRef:
      this.props.dataToggle.inputData && this.props.dataToggle.inputData.change,
      currentValue: this.props.value
  }
  handleToggleData = toggleData => {
    return this.props.handleDataRef(toggleData, this.state.toggleRef)
  }

  handleInputData = inputData => {   
    this.setState({currentValue: inputData},  () => {
      setTimeout(() => {
        console.log('currentValue', this.state.currentValue)
          },1500)})
    return this.props.handleDataRef(inputData, this.state.inputDataRef, 'input')
  }

  componentWillReceiveProps=(nextProps) => {
    if ((nextProps.value !== this.state.currentValue)) {
      const { value } = nextProps;      
      this.setState({currentValue: value})
    }
  }

  render() {
    const {
      dataToggle,
      inputData,
      activeDefault,
      isDayOff,
      isToggle,
      defaultValue,
      value
    } = this.props

    return (
      <div className="toggle-group">
        <div className="toggle-wrapper">
          {(dataToggle.callTitle || dataToggle.callDesc) && (
            <div className="toggle-content">
              {dataToggle.callTitle && (
                <h3 className="call-title widget-sub-heading">{dataToggle.callTitle}</h3>
              )}
              {dataToggle.callDesc && (
                <p className="call-description">{dataToggle.callDesc}</p>
              )}
            </div>
          )}
          {inputData && inputData.isDisplayInput && (
            <div className="input-with-toggle">
              <Input
                type="text"
                className="input-style"
                name="month"
                onChange={e => this.handleInputData(e.target.value)}
                disabled={this.props.inputDisable}
                defaultValue={this.props.inputData.defaultValue}
                value={this.state.currentValue}
              />
              <p>{inputData.inputText}</p>
            </div>
          )}
          <div className="toggle-holder">
            <Toggle
              handleToggleData={this.handleToggleData}
              // dataToggleActive={activeDefault}
              dataStateToggle={dataToggle}
              activeDefault={activeDefault}
              dataToggleActive={activeDefault}
            />
          </div>
        </div>
      </div>
    )
  }
}
export default NodeToggle
