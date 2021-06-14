import React from 'react'
import NotificationSettings from '../settings/NotificationSettings'

import { Dimmer, Icon, Loader } from 'semantic-ui-react'
import Title from '../../common/Title'
import NotificationSideContent from './NotificationSideContent'

class NotificationSide extends React.Component {
  state = {
    isLoading: false,
    titleContent: {
      titleOne: 'Notification'
    }
  }
  handleLoading = state => {
    this.setState({ isLoading: state })
  }
  render() {
    return (
      <>
        <Dimmer active={this.state.isLoading} style={{ position: 'fixed' }}>
          <Loader />
        </Dimmer>
        <NotificationSideContent loading={this.handleLoading} />
      </>
    )
  }
}
export default NotificationSide
