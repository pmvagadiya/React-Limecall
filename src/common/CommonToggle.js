import React, { Component } from 'react'
class Toggle extends Component {
  //let customEvent = null;
  state = {
    activeToggle: this.props.dataToggleActive,
    prevToggle: this.props.dataToggleActive,
    firstRun: true
  }
  onClickToggle = e => {
    this.setState(
      {
        activeToggle: !this.props.dataToggleActive,
        firstRun: false
      },
      () => {
        return this.props.handleToggleData(this.state.activeToggle)
      }
    )
  }

  componentDidMount() {
    const { activeDefault } = this.props

    if (activeDefault && this.state.firstRun) {
      //this.customEvent = setInterval(this.setActive, 1000);
      this.setState({ firstRun: false })
    }
  }

  componentWillReceiveProps = nextProps => {
    const { activeDefault } = this.props

    if (activeDefault && this.state.firstRun) {
      //this.customEvent = setInterval(this.setActive, 1000);
      this.setState({ firstRun: false })
    }
  }
  render() {
    const { dataStateToggle } = this.props
    return (
      <div className="togggle__btn">
        <input
          type="checkbox"
          className="toggle"
          onClick={this.onClickToggle}
          id={dataStateToggle.callId}
          ref={e => (this.triggerElement = e)}
          checked={this.props.activeDefault}
        />{' '}
        <label htmlFor={dataStateToggle.callId}>
          <span className="off"> OFF </span>
          <span className="on"> ON </span>
        </label>{' '}
      </div>
    )
  }
}
export default Toggle
