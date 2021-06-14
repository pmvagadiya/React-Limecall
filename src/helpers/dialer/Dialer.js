import React from 'react'
import axios from 'axios'
// import config from '../../config/apiconfig.json'
// import { Modal,Button } from 'semantic-ui-react'
import Draggable, {DraggableCore} from 'react-draggable'; // Both at the same time
import './style.scss';
import CallSummaryComponent from './CallSummaryComponent'
import { CommonNotify } from '../../common/CommonNotify';
import TagsComponent from './Tags';
import NotesComponent from './Notes';
import history from 'history/browser';
import rg4js from 'raygun4js';
import AccountInfoComponent from './AccountInfo';
// import Twilio from "twilio-client"
import { withRouter } from "react-router";

class Dialer extends React.Component {

  constructor(props) {
    super(props);
    this.state = this.initialState;
    

    rg4js('apiKey', '71pSno4MdPm3xJPkPP7fGA');
    rg4js('enablePulse', true);
    rg4js('enableCrashReporting', true);
  }

  initialState = {
    status: 'start',
    displayIncoming:false,
    callStatus:'idle',
    currentCallData: {},
    timerData: 0,
    displayAdditionalTools: null,
    callMuteStatus: false
  }

  componentDidMount() {
  }
  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
        console.log('location change tracked')
        rg4js('trackEvent', { type: 'pageView', path: this.props.location.pathname });
    }
  }
  timerInterval = null;

  setupDialer = (token) => {
    if(token===null || token==='' || !token){
      return null;
    }
      let twilioToken = this.fetchToken(token)
      if(twilioToken===''){
          console.log("null token")
          console.log(twilioToken)
          return null;
      }
    return null;
  }


  runDialer = (tkn) =>{
    const twilio =  window.Twilio;
    if(!this.device){
      this.device = new twilio.Device();
      this.device.setup(tkn, {
            codecPreferences: ['opus', 'pcmu'],
            fakeLocalDTMF: true,
            enableRingingState: true,
        });
    }
      
      this.device.on('ready', (device) => {
          console.log("dialer is ready to receive calls");
        });
      
      this.device.on('error',  (error) => {
          console.log('Device Error: ' + error.message);
        });
      
      this.device.on('disconnect',  (conn) => {
          console.log('Call ended.');
          this.rejectCall(true);
      });

      this.device.on('connect', (conn) => {
          console.log('Call started progress.');
          this.setState({
            callStatus:'connected'
          })
      })

      this.device.connect( (connection)=> {
        // bindVolumeIndicators(connection);
        // __callManager__.callManagerScreenStatus = 2;
        // setTimeout(function () {
        //     // prepareInputs();
        //     // startTimer();
        // },100)
      });

      this.device.incoming( (conn) => {
        this.setState({ ...this.initialState }, () => {
          this.setState({
            displayIncoming:true
          })
          
          console.log("incoming call-----",conn)
           this.connection = conn;
  
           const leadID = conn.customParameters.get('lead');
           if(leadID){
  
            let token = localStorage.getItem('access_token');
            let head = {
              headers: {
                Authorization: 'Bearer ' + token
              }
            }
              axios.get(`${process.env.REACT_APP_BASE_APP_URL}/api/v1/leads/get-call-by-id?id=${leadID}`, head).then((res) => {
              this.setState({currentCallData: res.data.data})
              }).catch((error) => {
                  console.log(error);
              });
           }
        })
    });
  }

  disconnectCall = () =>{
    if (this.device) {
        this.device.disconnectAll();
        this.connection.ignore()
        console.log("disconnecting call");
      }
  }

  startTimeRecording = (stopTimer = false) => {
    if (stopTimer) {
      clearInterval(this.timerInterval);
    } else {  
      this.timerInterval = setInterval(() => {
        this.setState(previousState => {
          return {
            timerData: previousState.timerData + 1
          };
        });
      }, 1000);
    }
  }

  do_load = () => {
    var self = this;
    var my_script = this.new_script('https://media.twiliocdn.com/sdk/js/client/v1.13/twilio.min.js');

    my_script.then(function() {
      self.setState({'status': 'done'});
    }).catch(function() {
      self.setState({'status': 'error'});
    })
  }

  new_script = (src) =>{
    return new Promise(function(resolve, reject){
      var script = document.createElement('script');
      script.src = src;
      script.addEventListener('load', function () {
        resolve();
      });
      script.addEventListener('error', function (e) {
        reject(e);
      });
      document.body.appendChild(script);
    })
  };

  fetchToken = (token) =>{
    console.log("fetching token");
      const URL = `${process.env.REACT_APP_BASE_APP_URL}/api/v1/customer-generate-call-token`
      var tkn = ''
      let head = {
          headers: {
            Authorization: 'Bearer ' + token
          }
        }
    
       axios
          .post(URL,null , head)
          .then(res => {
            if (res.data.data) {
              tkn = res.data.data.token
              this.runDialer(tkn)
            }
          })
          .catch(err => {
            console.info(err)
          })
      return tkn;
  }

  renderDialer = (token) =>{
    if(this.state.status==="done"){
      console.log("twilio loaded")
      this.setupDialer(token)
    }
  }

  rejectCall = (displaySummaryBlock = false) =>{
    let newCallStatus = 'idle';
    let newDisplayIncoming = false;

    if(this.timerInterval){
      this.startTimeRecording(true)
    }
    if(displaySummaryBlock){
      newCallStatus = 'disconnected';
      newDisplayIncoming = true;
    }
    this.setState({
      displayIncoming:newDisplayIncoming,
      callStatus:newCallStatus
    })
    this.disconnectCall()
  }

  acceptCall = () =>{
    this.setState({
      // displayIncoming:'close'
    })
    if(this.connection){
      console.log("connection accepting")
      this.connection.accept();
    }
    this.startTimeRecording()
  }

  updateCallMuteStatus = (mute) => {
    this.connection.mute(mute)
    this.setState({callMuteStatus: mute })
  }

  handleCallSummaryPost = (data) => {
    if(data){
      data['lead_id'] = this.state.currentCallData.id;
      let token = localStorage.getItem('access_token');
      let head = {
        headers: {
          Authorization: 'Bearer ' + token
        }
      }
      const url = `${process.env.REACT_APP_BASE_APP_URL}/api/v1/leads/set-feedback` ;
        axios.post(url, data, head).then((res) => {
          CommonNotify('Feedback Saved Successfully', 'success')
        }).catch((error) => {
            console.log(error);
            CommonNotify(`Can't Save Feedback, Error Occured`)
        });
    }

    this.setState({
      displayIncoming:false,
      callStatus:'idle'
    })
  }

  saveCallNotesData = (notesData) => {
    const leadID = this.state.currentCallData.id;
    // const leadID = 6285;
    let token = localStorage.getItem('access_token');
    let head = {
      headers: {
        Authorization: 'Bearer ' + token
      }
    }
    const url = `${process.env.REACT_APP_BASE_APP_URL}/api/v1/leads/${leadID}/add-note` ;
      axios.post(url, notesData, head).then((res) => {
        CommonNotify('Notes Saved Successfully', 'success');
      }).catch((error) => {
          console.log(error);
          CommonNotify(`Can't Save Notes, Please try again`)
      });
  }

  defaultDialerUi = () => {
    return (
      <div className = 'dialer-component-main'>
        <div className='hor-row heading-main'>
        {this.state.callStatus!=="idle" ?  <span className='timer-component-main'>
            {
              new Date(this.state.timerData * 1000).toISOString().substr(11, 8)
            }
          </span> : ''}
          { this.state.callStatus!=="idle" ? 'Ongoing ': 'Incoming ' }
          Call
        </div>
        <div className='hor-row call-info-container-main'>
          {/* {this.state.callStatus==="connected" ? (<i class="material-icons person-add-icon">person_add_outline</i>) : null } */}

          <div className='user-image-container'>
            <div className='user-image'></div>
          </div>
          <div className='hor-row user-name-container'>
            { (this.state.currentCallData.customer_name && this.state.currentCallData.customer_name !== 'undefined') ? this.state.currentCallData.customer_name : ' Unknown' }
          </div>
          { this.state.currentCallData.type !== 'DIGITAL_CALL' && <div className='hor-row mobile-number-container'>
            { this.state.currentCallData.phone_number }
          </div>}
          {/* <div className='hor-row duration-container'>
            <i class="material-icons update-icon">update</i> 
            { new Date(this.state.currentCallData.created_at ? this.state.currentCallData.created_at : new Date()  ).toLocaleTimeString() }
          </div> */}
          { this.state.callStatus==="idle" ? (<div className='hor-row call-tool-container'>
              <span className='accept-call-container'
                onClick={(e) => this.acceptCall()}
                >
                <i class="material-icons accept-call-icon">call_end</i> Accept Call
              </span>
              <span className='end-call-container'
                onClick={(e) => this.rejectCall()}
                >
                <i class="material-icons end-call-icon">call_end</i>
              </span>
            </div>
          )
          :(<div className='hor-row call-tools-after-call-pick-container'>
              <div className='hor-row basic-tools-container'>
                <span className='basic-tool-icon-container'
                  onClick = { () => this.updateCallMuteStatus(!this.state.callMuteStatus) }>
                  <i class="material-icons basic-tool-icon">
                    { this.state.callMuteStatus ? 'mic_off' : 'mic_none_outline' }
                  </i>
                </span>
                {/* <span className='basic-tool-icon-container'>
                  <i class="material-icons basic-tool-icon">videocam_outline</i>
                </span> */}
                <span className='basic-tool-icon-container call-button-icon-container'
                  onClick={(e) => this.rejectCall(true)}
                  >
                  <i class="material-icons basic-tool-icon">call_end</i>
                </span>
                {/* <span className='basic-tool-icon-container'>
                  <i class="material-icons basic-tool-icon">pause</i>
                </span> */}
                {/* <span className='basic-tool-icon-container'>
                  <i class="material-icons basic-tool-icon">sms_outline</i>
                </span> */}
              </div>
              <div className='hor-row extra-tool-container'>
               <span className={'extra-tool-card' + ( this.state.displayAdditionalTools === 'notes' ? ' active-extra-tool-card' : '' )}
                  onClick = {() => this.setState({ displayAdditionalTools: 'notes'})}>
                  <i class="material-icons extra-tool-icon">create_outline</i>
                  Notes
                </span>
                <span className={'extra-tool-card' + ( this.state.displayAdditionalTools === 'tags' ? ' active-extra-tool-card' : '' )}
                  onClick = {() => this.setState({displayAdditionalTools: 'tags'})}>
                  <i class="material-icons extra-tool-icon">local_offer_outline</i>
                  Tags
                </span>
                {/* <span className='extra-tool-card'>
                  <i class="material-icons extra-tool-icon">transfer_within_a_station_outline</i>
                  Transfer
                </span> */}
              </div>
            </div>)
          }

        </div>

        <AccountInfoComponent
          currentCallData = { this.state.currentCallData }
          />
      </div>
    )
  } 

  render(){
    var self = this;
    let token = localStorage.getItem('access_token');
    if (self.state.status === 'start') {
      self.state.status = 'loading';
      setTimeout(function () {
        self.do_load()
      }, 0);
    }



    return (<React.Fragment>
     { this.state.displayIncoming &&  <Draggable
        >
        <div className='draggalbe-container-main'>
          <div className = 'draggable-content-main'>
            {
              this.state.callStatus === 'disconnected' ? (<CallSummaryComponent
                CommonNotify = { CommonNotify }
                currentCallData = { this.state.currentCallData }
                handleCallSummaryPost = { this.handleCallSummaryPost } />)
              : (
                this.defaultDialerUi()
              )
            }
          </div>
        </div>
      </Draggable>
      }
      
     { this.state.displayAdditionalTools &&  <Draggable
        >
        <div className='draggalbe-container-main tags-draggable-container-main'>
          <div className = 'draggable-content-main'>
            {this.state.displayAdditionalTools === 'tags' && <TagsComponent
              toggleDisplayTag = {() => this.setState({displayAdditionalTools: false})}
              leadID = { this.state.currentCallData.id }
            />}

            {this.state.displayAdditionalTools === 'notes' && <NotesComponent
              toggleDisplayTag = {() => this.setState({displayAdditionalTools: false})}
              saveCallNotesData = { this.saveCallNotesData } 
            />}

          </div>
        </div>
      </Draggable>
      }
      {this.renderDialer(token)}
    </React.Fragment>)
  }
}
export default withRouter(Dialer)