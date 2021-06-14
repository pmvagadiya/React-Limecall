import React, { Component } from 'react'

import axios from 'axios'
import { CommonNotify } from '../../common/CommonNotify'

// import { Link } from 'react-router-dom'

class ShareYourLinkSettings extends Component {
  state = {
    // previewLink: null,
    shareLink: null
  }

  componentDidMount() {
    this.loadWidget()
  }

  loadWidget = () => {
    this.props.loading(true)
    this.setState({ isLoading: true })
    let head = {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('access_token')
      }
    }
    const widget_id = localStorage.getItem('widget_id')
    const url = `${process.env.REACT_APP_BASE_APP_URL}/api/v1/widget/install?widget_id=${widget_id}`

    axios
      .get(url, head)
      .then(res => {
        this.props.loading(false)
        if (res.data.data) {
          this.setState({
            // previewLink: res.data.data.preview_link,
            shareLink: res.data.data.shareable_link
          })
        }
      })
      .catch(er => {
        this.props.loading(false)
        CommonNotify('Cant Fetch Widget Link')     
      })
  }

  render() {
    return (
      <>
        <div className="share-your-link-wrapper share_your_link_fixed">
          <div className="share-your-link">
            <p className="subtext">Shareable Link</p>
            <a
              rel="noopener noreferrer"
              target="_blank"
              href={`https://v2dev.limecall.com/widget/${this.state.shareLink &&
                this.state.shareLink.split('/widget/')[1]}`}
              className="link-holder"
            >
              <p className="profile-link-text">{`https://v2dev.limecall.com/widget/${this
                .state.shareLink &&
                this.state.shareLink.split('/widget/')[1]}`}</p>
            </a>
          </div>
          {/* <div className="share-your-link">
            <p className="subtext">Preview Link</p>
            <a
              rel="noopener noreferrer"
              target="_blank"
              href={this.state.previewLink}
              className="link-holder"
            >
              <p className="profile-link-text">Open Modal</p>
            </a>
          </div> */}
        </div>
      </>
    )
  }
}

export default ShareYourLinkSettings
