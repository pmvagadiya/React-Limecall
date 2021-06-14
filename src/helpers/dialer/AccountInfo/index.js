import React from 'react'
import './style.scss';

class AccountInfoComponent extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
        currentComponent: 'insights'
      };
    }

    setCurrentComponent = (data) => {
      this.setState({currentComponent: data})
    }

    getTimeOnSite = () => {
      const timer = this.props.currentCallData.trackingData;
      if(timer && timer.time_on_site){
        let seconds =  parseInt(timer.time_on_site % 60, 10);
        let minutes =  parseInt(timer.time_on_site / 60, 10);
        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;
        return minutes + "m " + seconds + 's';
      }
      return '';
    }

    getBrowsingHistoryBlock = () => {
      const browserHistory = this.props.currentCallData.trackingData ?  this.props.currentCallData.trackingData.browsing_history : null;

      if(browserHistory){
        const localHistory = browserHistory.slice(1).slice(-10);
        return localHistory.map((data)=>(
          <div className='info-label-full-width'
            >
            <i class="material-icons call-made-icon">call_made</i>
            <a href={data.page_url}>
              { data.page_url }
            </a>
          </div>
        ))
      }
    }

    render = () => {
      const trackingData = this.props.currentCallData.trackingData;
        return (
          <div className='hor-row account-info-container'>
            <div className='hor-row account-tab-container'>
              <div className={'quarter-container' + ( this.state.currentComponent === 'insights' ? ' active-quarter' : '') }
                onClick = {() => this.setCurrentComponent('insights')} >
                INSIGHTS
              </div>
              {/* <div className='quarter-container'
                onClick = {() => this.setCurrentComponent('insights')}>
                PRE CALL
              </div> */}
              <div className={'quarter-container' + ( this.state.currentComponent === 'technology' ? ' active-quarter' : '') }
                onClick = {() => this.setCurrentComponent('technology')}>
                TECHNOLOGY
              </div>
              <div className={'quarter-container' + ( this.state.currentComponent === 'visited' ? ' active-quarter' : '') }
                onClick = {() => this.setCurrentComponent('visited')}>
                VISITED
              </div>
            </div>

            {this.state.currentComponent === 'insights' && <div className='hor-row account-info-container'>
              <div className='hor-row account-info-block'>
                <div className='info-label'>
                  Company
                </div>
                <div className='info-value'>
                  {this.props.currentCallData.enrichment ? this.props.currentCallData.enrichment.company_name : ' '  }
                </div>
              </div>
              <div className='hor-row account-info-block'>
                <div className='info-label'>
                  IP Address
                </div>
                <div className='info-value'>
                  { this.props.currentCallData.ip_address }
                </div>
              </div>
              <div className='hor-row account-info-block'>
                <div className='info-label'>
                  Email
                </div>
                <div className='info-value'>
                  {( this.props.currentCallData.email &&  this.props.currentCallData.email !== 'undefined' ) ?  this.props.currentCallData.email: '' }
                </div>
              </div>
            </div>
            }

            {this.state.currentComponent === 'technology' && <div className='hor-row account-info-container'>
              <div className='hor-row account-info-block'>
                <div className='info-label'>
                  Browser 
                </div>
                <div className='info-value'>
                  {(trackingData && trackingData.browser ) ? (trackingData.browser.name + ' ' + trackingData.browser.version_major)  : ' '  }
                </div>
              </div>
              <div className='hor-row account-info-block'>
                <div className='info-label'>
                  OS
                </div>
                <div className='info-value'>
                  {trackingData ? trackingData.os  : ' '  }
                </div>
              </div>
              <div className='hor-row account-info-block'>
                <div className='info-label'>
                  Device
                </div>
                <div className='info-value'>
                   {(trackingData && trackingData.device) ? (trackingData.device.name + ' ' + trackingData.device.brand)  : ' '  }
                </div>
              </div>
            </div>
            }

            {this.state.currentComponent === 'visited' && <div className='hor-row account-info-container'>
              <div className='hor-row account-info-block'>
                <div className='info-label'>
                  Last seen:
                </div>
                <div className='info-value'>
                  { (trackingData && trackingData.last_interaction) ? ( new Date(trackingData.last_interaction).toLocaleDateString() + ' ' +   new Date(trackingData.last_interaction).toLocaleTimeString() ) : ' '  }
                </div>
              </div>
              <div className='hor-row account-info-block'>
                <div className='info-label'>
                  Time On Site
                </div>
                <div className='info-value'>
                  { this.getTimeOnSite()}
                </div>
              </div>
              <div className='hor-row account-info-block'>
                { this.getBrowsingHistoryBlock()}
              </div>
            </div>
            }

          </div>
        )
    }
}

export default AccountInfoComponent;