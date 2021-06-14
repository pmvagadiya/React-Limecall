import React, { Component } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import CommonSubscriptionModal from '../../common/CommonSubscriptionModal';

export default class HomeTrial extends Component {

  state = {
    phoneLength: 0,
    subscriptionModal : false
  }

  componentDidMount = async() => {
    const n = JSON.parse(localStorage.getItem('phone_numbers'));
    if(n !== null && n !== undefined)
    {
    this.setState({phoneLength : n.length})
    }
  }

  modalClick = async () => {   
    this.setState({subscriptionModal: true})
  }

  closeSubscriptionModal = async () => {   
    this.setState({subscriptionModal: false})
  }

 renderlist(){
    const  n =  JSON.parse(localStorage.getItem('phone_numbers'));
    const { phoneLength } = this.state;
     let list = [];
    
     if(localStorage.getItem('phone_numbers') !== null){
      for(let i=0; i < (n.length > 2 ? 2 : n.length) ; i++) {        
         list.push( 
          <div class="trial-box">
          <div class="banner-icon">
            <div class="banner-iconTwo">
              <div class="inner-spacing">
          <i class="fa fa-phone fa-rotate-90"  aria-hidden="true" style={{color: 'white', alignSelf: 'center', width: 20, height: 20}}></i>
          </div> 
          </div>
          </div>
          <div class="banner-description-wrapper">
            <p>{"Your " + (n[i].number_type && n[i].number_type !== null ? (n[i].number_type.charAt(0).toUpperCase() + n[i].number_type.slice(1)) : "Local") + " Number"}</p>
            <p class="fontize">{n[i].phone_number}</p>
          </div>
        </div>
       )
     }
    }
     return list;
  }

  render() {
    const { phoneLength } = this.state;
    return (
      <div className="cardbox-wrapper deatil_box">
        <div className="container-trial">
          <div className="banner-description-wrapper">
            {/* <div class="accordion-widget-holder"> */}
            {/* <h1 className="banner-title">Welcome to Limecall</h1> */}
            {/* <img style={{width: 30, height: 30}} src={Emoji} alt="icon" /> */}
            {/* </div> */}
              <p class="trial-headline"> {this.props.titleLine} <a class="link-color" onClick={this.modalClick}>{this.props.pleaseUpgrade}</a>{this.props.upgradeLine}</p>
        <div class="trial-back"> 
        <CommonSubscriptionModal
          open={this.state.subscriptionModal}
          onClose={this.closeSubscriptionModal}
          currentPlan={this.props.subscriptionData.tableContentData[0].plan_name}
          // updateGetSubscription={this.props.subscriptionData}
          dataTable={this.props.subscriptionData}
        />
            <div class="row">

              {/* ----------------------------- First Row -------------------------- */}

              <div class="col">
              <p class="fontsize-label">{"YOU HAVE GOT " + this.state.phoneLength + " PHONE NUMBERS."}</p>

                <div>

{this.renderlist()}
{phoneLength > 2 ?
<p onClick={() => window.location.href = '/numbers'} className="view-more"><a>Show More</a></p>
: null }
             {phoneLength === 0 ?
              <div class="add-number-btn">
                <div class="add-numbercta">
                <button onClick={()=> window.location.href = '/addNumbers'} class="ui button btn-blue"> <p class="wrap-text">Add Number&nbsp;&nbsp;</p></button>
              </div>
              <p class="btn-title">Get a number for your business.</p>
              </div>
               : null }

                </div>
              </div>

              {/* ----------------------------- Second Row ---------------------------- */}
              <div class="col"><p class="fontsize-trial">REQUEST A LIVE DEMO </p>
              <div class="request-demo">
              <div class="add-numbercta">
              <button onClick={()=> window.open("https://limecall.com/demo/", "_blank")} class="ui button btn-grey" style={{backgroundColor: '#39b54a'}}> <p class="wrap-text">Request Demo</p> </button>
              </div>
              <p class="btn-title">Request a custom demo of LimeCall in action.</p>
              </div>
              {/* <div class="request-demo">
              <div class="add-numbercta">
<button onClick={()=> window.open("https://limecall.com/contact-us/", "_blank")} class="ui button btn-blue"> <p class="wrap-text">Live Support</p></button>
              </div>
              <p class="btn-title">Need something else , talk to us right now.</p>
              </div> */}

               </div>
            </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
