import React, { Component } from 'react'

import IntegrationCard from '../integration/IntegrationCard'

class Integration extends Component {
  state = {
    selectedApp: ''
  }

  onClickSelectedApp = e => {
    const selected = e.target.getAttribute('name')
    this.setState({ selectedApp: selected })
  }

  render() {
    const { selectedApp } = this.state

    return (
      <div className="integration-container integration_main">
        <div className="integration-wrapper">
          <IntegrationCard
            onClickSelectedApp={this.onClickSelectedApp}
            selectedApp={selectedApp}
          />
        </div>
      </div>
    )
  }
}

export default Integration
