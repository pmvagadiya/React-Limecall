import React from 'react'
import './style.scss';
import axios from 'axios'
import { Dropdown } from 'semantic-ui-react';

class CallSummaryComponent extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
        currentRatingData: this.currentRatingData,
        leadOwnerOptionList: [],
        leadQualificationOptionList: [],
        callDisposition: '',
        feedbackText: ''
      };
    }

    currentRatingData = [
      {
        active: true,
      },
      {
        active: true,
      },
      {
        active: true,
      },
      {
        active: false,
      },
      {
        active: false,
      }
    ]

    componentDidMount = () => {
      this.fetchMembersData();
      this.fetchWidgetsData();
    }

    
    fetchMembersData = () => {
      let token = localStorage.getItem('access_token');
      let head = {
        headers: {
          Authorization: 'Bearer ' + token
        }
      }
      axios.get(`${process.env.REACT_APP_BASE_APP_URL}/api/v1/team/members`, head).then((res) => {
        if(res.data.data){
          const resData = res.data.data;
          let tmpMembersList = [];
          const adminUserAsMember = {
            key: 0,
            value: resData.admin.id,
            text: resData.admin.first_name + ' ' + resData.admin.last_name
          }

          tmpMembersList.push(adminUserAsMember);
          if(resData.members && resData.members.length){
            resData.members.forEach((user, index)=>{
              const userData = {
                key: (index + 1),
                value: user.id,
                text: user.first_name + ' ' + user.last_name
              }
              tmpMembersList.push(userData);
            })
          }
          this.setState({leadOwnerOptionList: tmpMembersList})
        }
      }).catch((error) => {
          console.log(error);
      });
    }

    fetchWidgetsData = () => {
      let token = localStorage.getItem('access_token');
      let head = {
        headers: {
          Authorization: 'Bearer ' + token
        }
      }

      axios.get(`${process.env.REACT_APP_BASE_APP_URL}/api/v1/widget/widgets`, head).then((res) => {
        if(res.data.data && res.data.data[0]){
          const tmpScore = res.data.data[0].scores;
          let scoreArr = [];
          if(tmpScore){
            tmpScore.forEach((score, index)=>{
              const scoreObj = {
                key : index,
                text: score,
                value: score,
              }
              scoreArr.push(scoreObj);
            })
           
          }
          this.setState({leadQualificationOptionList: scoreArr});
        }
      }).catch((error) => {
          console.log(error);
      });
    }

    getStarCard = () => {
      return this.state.currentRatingData.map((data, index)=>(
       (<i class={"material-icons " + (data.active ? 'star-icon' :  'star-outline-icon') }
          onClick = { () => this.updateRating(index) }>
          {data.active ? 'star' : 'star_outline'}
        </i>)
      ))
    }

    updateRating = (index) => {
      let currentRatingData = this.state.currentRatingData;
      currentRatingData.forEach((data, i) => {
        if(i<=index){
          data.active = true;
        }else{
          data.active = false;
        }
      })
      this.setState({currentRatingData: currentRatingData})
    }
    
  handleChangeInput = (value, key = 'callDisposition') => {
      this.setState({
        [key]: value
      })
  }

  saveCallSummaryData = () => {
    this.saveLeadQualification();
    this.saveLeadOwner();

    if(!this.state.feedbackText){
      return false;
    }

    let rating = 0;
    for(let i = 0; i < 5; i++){
      if( this.state.currentRatingData[i].active ){
        rating = (i + 1);
      }else{
        break;
      }
    }

    const feedbackData = {
      agent_feedback_rate: rating,
      agent_feedback_text: this.state.feedbackText
    }

    this.props.handleCallSummaryPost(feedbackData);
  }

  saveLeadQualification = () => {
    if(!this.state.leadQualification){
      return false;
    }

    const qualificationPostData = {
      lead_id: this.props.currentCallData.id,
      // lead_id: "6134",
      score: this.state.leadQualification
    }
    let token = localStorage.getItem('access_token');
    let head = {
      headers: {
        Authorization: 'Bearer ' + token
      }
    }
    const url = `${process.env.REACT_APP_BASE_APP_URL}/api/v1/leads/is-good` ;
      axios.post(url, qualificationPostData, head).then((res) => {
      }).catch((error) => {
          console.log(error);
          this.props.CommonNotify(`Can't Save call qualifications, Please try again`)
      });
  }
  
  saveLeadOwner = () => {
    if(!this.state.leadOwner){
      console.log('return as no owner set')
      return false;
    }

    const qualificationPostData = {
      lead_id: this.props.currentCallData.id,
      // lead_id: "6134",
      user_id: this.state.leadOwner
    }
    let token = localStorage.getItem('access_token');
    let head = {
      headers: {
        Authorization: 'Bearer ' + token
      }
    }
    const url = `${process.env.REACT_APP_BASE_APP_URL}/api/v1/leads/set-owner` ;
      axios.post(url, qualificationPostData, head).then((res) => {
      }).catch((error) => {
          console.log(error);
          this.props.CommonNotify(`Can't Save call owner, Please try again`)
      });

  }

    render = () => {
        return (
            <div className = 'call-summary-container-main'>
              <div className='hor-row heading-main'>
                  Call Summary
                  <i class="material-icons call-summary-close-icon"
                  onClick = { () => this.props.handleCallSummaryPost(null) } >close</i>
              </div>

              <div className='hor-row call-info-container-main'> 

                <div className='user-image-container'>
                  <div className='user-image'></div>
                </div>
                <div className='hor-row user-name-container'>
                  { (this.props.currentCallData.customer_name && this.props.currentCallData.customer_name !== 'undefined') ? this.props.currentCallData.customer_name : ' Unknown' }
                </div>

                { this.props.currentCallData.type !== 'DIGITAL_CALL' && <div className='hor-row mobile-number-container'>
                  { this.props.currentCallData.phone_number }
                </div>}
                {/* <div className='hor-row add-contact-container'>
                  Add a Contact 
                  <i class="material-icons add-contact-icon">person_add_outline</i>
                </div> */}
              </div>

              <div className='hor-row call-rating-input-form-container'>
                <div className='hor-row input-form-row'>
                  <div className='label-container'>
                    Call rating
                  </div>
                  <div className='value-container'>
                    <div className='hor-row star-container'>
                      { this.getStarCard() }
                    </div>
                  </div>
                </div>

                {/* <div className='hor-row input-form-row'>
                  <div className='label-container'>
                    Call disposition
                  </div>
                  <div className='value-container'>
                      <Dropdown
                        onChange={ (e, { value }) => this.handleChangeInput(value, 'callDisposition')}
                        options={options}
                        selection
                        className='custom-dropdown-class'
                        value={this.state.callDisposition}
                      />
                  </div>
                </div> */}
                
                <div className='hor-row input-form-row'>
                  <div className='label-container'>
                    Owner
                  </div>
                  <div className='value-container'>
                      <Dropdown
                        onChange={ (e, { value }) => this.handleChangeInput(value, 'leadOwner')}
                        options={this.state.leadOwnerOptionList}
                        selection
                        className='custom-dropdown-class'
                        value={this.state.leadOwner}
                      />
                  </div>
                </div>
                
                <div className='hor-row input-form-row'>
                  <div className='label-container'>
                    Lead Qualification
                  </div>
                  <div className='value-container'>
                      <Dropdown
                        onChange={ (e, { value }) => this.handleChangeInput(value, 'leadQualification')}
                        options={this.state.leadQualificationOptionList}
                        selection
                        className='custom-dropdown-class'
                        value={this.state.leadQualification}
                      />
                  </div>
                </div>

                <div className='hor-row input-form-row'>
                  <div className='label-container'>
                    Comment
                  </div>
                  <textarea 
                    onChange = { (event) => this.handleChangeInput(event.target.value, 'feedbackText') } >

                  </textarea>
                </div>
                <div className='hor-row input-form-row'>
                  <button className = 'save-button-container'
                    onClick = {() => this.saveCallSummaryData() }>
                    Save
                  </button>
                </div>
              </div>
            </div>
        )
    }
}
export default CallSummaryComponent