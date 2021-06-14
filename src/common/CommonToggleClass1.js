import React, { Component } from 'react'

class Toggle extends Component {
  //let customEvent = null;

  state = {
    activeToggle: this.props.dataToggleActive,
    prevToggle: this.props.dataToggleActive,
    firstRun: true
  }

  onClickToggle = e => {
    const { checked } = this.props
    this.setState(
      {
        activeToggle: checked ? e.target.checked : !this.state.activeToggle
      },
      () => {
        return this.props.handleToggleData(this.state.activeToggle)
      }
    )
  }

  componentWillMount = nextProps => {
    const { activeDefault, checked } = this.props

    if (activeDefault && this.state.firstRun) {
      //this.customEvent = setInterval(this.setActive, 1000);
      if (!checked) {
        this.setState({ firstRun: false }, () => {
          this.triggerElement.click()
        })
      }
    }
  }

  render() {
    const { dataStateToggle, checked, activeDefault } = this.props
    const attributes = checked
      ? {
          checked: activeDefault
        }
      : {}
    return (
      <div>
        <input
          type="checkbox"
          className="toggle"
          onClick={this.onClickToggle}
          id={dataStateToggle && dataStateToggle.callId}
          ref={e => (this.triggerElement = e)}
          {...attributes}
        />{' '}
        <label htmlFor={dataStateToggle && dataStateToggle.callId}>
          <span className="off"> OFF </span>
          <span className="on"> ON </span>
        </label>{' '}
      </div>
    )
  }
}

export default Toggle