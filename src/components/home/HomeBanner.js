import React, { Component } from 'react'
import GetStartedModal from '../../common/GetStartedModal'
import axios from 'axios'

const apiToken = localStorage.getItem('access_token')

class HomeBanner extends Component {
  state = {
    data: [
      {
        createAccount: false,
        setYourSite: false,
        completeProfile: false,
        installDrift: false,
        setOfficeHours: false
      }
    ],
    counter: 0,
    count: []
  }

  setReqData = d => {
    let data = [...this.state.data]

    var elements = [
      'install_widget',
      'widget_settings',
      'call_settings',
      'invite_your_team_members',
      'receive_your_first_lead'
    ]

    var object = [
      'createAccount',
      'setYourSite',
      'completeProfile',
      'installDrift',
      'setOfficeHours'
    ]
    var test = {}

    elements.map((items, index) => {
      if (d[items]) {
        let cont = this.state.counter + 1
        this.setState({
          counter: cont
        })
        test[object[index]] = true
      }
    })

    data[0] = test

    this.setState({
      data
    })

    // this.setState(...this.state.data, { data: test}) }
  } // this is new update

  componentWillMount = () => {
    //return
    this.props.loading(true)
    let head = {
      headers: {
        Authorization: 'Bearer ' + apiToken
      }
    }
    const url = `${process.env.REACT_APP_BASE_APP_URL}/api/v1/user/get-intro-to-limecall`
    
    axios
      .post(url, {}, head)
      .then(res => {
        if (res.data.data) {
          this.props.loading(false)
          this.setReqData(res.data.data)
        }
      })
      .catch(error => {
        this.props.loading(false)       
      })
  }

  onClickCheckList = e => {
    return
    let { data, counter, count } = this.state
    const name = e.target.id
    const index = count.indexOf(name)

    data[0][name] = !data[0][name]

    if (index === -1) {
      count.push(name)
    } else {
      count.splice(index, 1)
    }

    counter = count.length
    this.setState({
      data,
      count,
      counter
    })
  }

  render() {
    const { counter } = this.state

    if (counter >= 5) return <div className="homebanner-wrapper"> </div>

    return (
      <div className="homebanner-wrapper">
        <div className="home-card-wrapper">
          <div className="home-card">
            <div className="home-card-content">
              <p className="home-card-counter">
                {' '}
                {counter}
                /5{' '}
              </p>{' '}
              <p className="home-card-text">
                Task <br /> Complete{' '}
              </p>{' '}
            </div>{' '}
            <div className="home-card-button-wrapper">
              <GetStartedModal
                data={this.state.data}
                counter={this.state.counter}
                onClickCheckList={this.onClickCheckList}
              />{' '}
            </div>{' '}
          </div>{' '}
        </div>{' '}
        <div className="homebanner-text-wrapper">
          <h2 className="homebanner-title"> Getting Started Checklist </h2>{' '}
          <p className="homebanner-description">
            You’ re on a roll!Here’ s a checklist of what’ s left to do before
            you can start having conversation with your customers through
            Limecall.{' '}
          </p>{' '}
        </div>{' '}
      </div>
    )
  }
}

export default HomeBanner
