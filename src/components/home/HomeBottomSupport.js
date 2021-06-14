import React, { Component } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import rightBottom from '../../assets/images/rightBottom.png';
import leftBottom from '../../assets/images/leftBottom.png';

export default class HomeBottomSupport extends Component {



  render() {
    return (
        <div className="container-trial">
          <div className="banner-description-wrapper">
            <p class="help-title">
Help And Answers
</p>
<div class="help-box"> 
    {/* <div class="inline"> */}

      {/* ----------------------------- First Row -------------------------- */}

      <div class="one">
        <div class="help-titlediv">
        <p class="help-subtitle">Get in touch with support via <a onClick={()=> window.open("https://limecall.com/contact-us/", "_blank")}> <span class="help-spantitle">Live Chat</span></a> </p>
        </div>
        <img class="help-image" src={leftBottom}></img>
      </div>

      {/* ----------------------------- Second Row ---------------------------- */}
      <div class="two">
        <div class="help-titlediv">
        <p class="help-subtitle">Check out our<a onClick={()=> window.open("https://help.limecall.com/en/", "_blank")}> <span class="help-spantitle"> Help & Documentation </span></a> to learn more about  <a onClick={()=> window.open("https://limecall.com/", "_blank")}> <span class="help-spantitle">LimeCall</span> </a></p>
        </div>
        <img class="help-image" src={rightBottom}></img>
       </div>
    {/* </div> */}
    </div>
  </div>
</div>
)
}
}
