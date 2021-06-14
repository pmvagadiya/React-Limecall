import React, { Component } from 'react'
import { Input } from 'semantic-ui-react'
import Toggle from './CommonToggleClass1'
class NodeToggle extends Component {
  state = {
    activeToggle: false,
    toggleRef: this.props.dataToggle.callref
  }
  handleToggleData = toggleData => {
    this.setState({ activeToggle: toggleData }, () => {
      return this.props.handleDataRef(
        this.state.activeToggle,
        this.state.toggleRef
      )
    })
  }

  componentDidMount() {
    //const { activeDefault } = this.props   
  }
  render() {
    const { dataToggle, inputData, activeDefault, defaultValue, checked = false } = this.props
    return (
      <div className="toggle-group">
        <div className="toggle-wrapper">
          {(dataToggle.callTitle || dataToggle.callDesc) && (
            <div className="toggle-content">
              {dataToggle.callTitle && (
                <h3 className="call-title">{dataToggle.callTitle}</h3>
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
                defaultValue={inputData.defaultValue}
              />
              <p>{inputData.inputText}</p>
            </div>
          )}
          <div className="toggle-holder">
            <Toggle
              handleToggleData={this.handleToggleData}
              dataToggleActive={this.state.activeToggle}
              dataStateToggle={dataToggle}
              activeDefault={activeDefault}
              checked={checked}
            />
          </div>
        </div>
      </div>
    )
  }
}
export default NodeToggle
