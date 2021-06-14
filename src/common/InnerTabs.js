import React, { Component } from 'react'

class InnerTabs extends Component {
  state = {
    activeTitle: this.props.dataTabs,
    previousDataTabs: this.props.dataTabs
  }
  onClickTab = item => {
    const stateName = item

    this.setState({ activeTitle: stateName }, () => {
      return this.props.handleTabData(stateName, true)
    })
  }

  componentDidUpdate() {
    if (this.props.dataTabs !== this.state.previousDataTabs) {
      this.setState(
        {
          activeTitle: this.props.dataTabs,
          previousDataTabs: this.props.dataTabs
        },
        () => {
          return this.props.handleTabData(this.state.activeTitle)
        }
      )
    }
  }

  render() {
    const { activeTitle } = this.state
    return (
      <div className="innertab-wrapper">
        {this.props.tabs.map((item, i) => (
          <div key={i} className="innertab-item">
            <div
              onClick={() => this.onClickTab(item)}
              className={activeTitle === item ? 'active' : null}
            >
              {item}
            </div>
          </div>
        ))}
      </div>
    )
  }
}

export default InnerTabs
