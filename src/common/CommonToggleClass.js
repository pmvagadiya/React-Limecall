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
        activeToggle: !this.state.activeToggle
      },
      () => {
        return this.props.handleToggleData(this.state.activeToggle)
      }
    )
  }

  componentWillReceiveProps = nextProps => {
    const { activeDefault } = this.props

    if (activeDefault && this.state.firstRun) {
      //this.customEvent = setInterval(this.setActive, 1000);
      this.setState({ firstRun: false }, () => {
        this.triggerElement.click()
      })
    }
  }

  render() {
    const { dataStateToggle } = this.props
    return (
      <div>
        <input
          type="checkbox"
          className="toggle"
          onClick={(e) => this.onClickToggle(e)}
          id={dataStateToggle && dataStateToggle.callId}
          ref={e => (this.triggerElement = e)}
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
