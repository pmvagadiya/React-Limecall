import React, { useState } from 'react'
import { Accordion, Icon } from 'semantic-ui-react'
import googleicon from '../assets/images/google_icon.png'
import { Rating } from 'semantic-ui-react'

function VisitData({ data }) {
  const [activeIndex, setActiveIndex] = useState(0)

  const handleClick = (e, titleProps) => {
    const { index } = titleProps
    const activeIndexs = activeIndex
    const newIndex = activeIndexs === index ? -1 : index
    setActiveIndex(newIndex)
  }

  return (
    <>
      <Accordion className="Lead_wrapper" fluid styled>
        <Accordion.Title
          active={activeIndex === 3}
          index={3}
          onClick={handleClick}
        >
          Visits
        </Accordion.Title>
        <Accordion.Content active={activeIndex === 3}>
          <div className="form-group row">
            <div className="col-md-4">
              <p className="mb-0 text-color lead_title">
                <img
                  src={process.env.REACT_APP_BASE_APP_URL + "/assets/lead_details_icons/Lead popup edited-33.svg"}
                  className="lead-data-icon"
                />
                <label>Time on site</label>
              </p>
            </div>
            <div class="col-md-1 ">: </div>
            <div class="col-md-5">
              <p class="detail_text">
                <b>
                  {data.callData.trackingData && data.callData.trackingData.time_on_site} S
                </b>
              </p>
            </div>
          </div>
          <div className="form-group row">
            <div className="col-md-4">
              <p className="mb-0 text-color lead_title">
                <img
                  src={process.env.REACT_APP_BASE_APP_URL + "/assets/lead_details_icons/i copy-39.svg"}
                  className="lead-data-icon"
                />
                <label>Last interaction</label>
              </p>
            </div>
            <div className="col-md-1 ">: </div>
            <div className="col-md-5">
              <p className="detail_text">
                <b>
                  {data.callData.trackingData && data.callData.trackingData.last_interaction}
                </b>
              </p>
            </div>
          </div>
          <div className="form-group row">
            <div className="col-md-4">
              <p className="mb-0 text-color lead_title">
                <img
                  src={process.env.REACT_APP_BASE_APP_URL + "/assets/lead_details_icons/Lead popup edited-24.svg"}
                  className="lead-data-icon"
                />
                <label>Device info</label>
              </p>
            </div>
            <div class="col-md-1 ">: </div>
            <div class="col-md-5">
              <p class="detail_text">
                <b>
                  {data.callData.trackingData && data.callData.trackingData.length &&
                    data.callData.trackingData.browser.name}
                </b>
              </p>
            </div>
          </div>
          <div className="form-group row">
            <div className="col-md-4">
              <p className="mb-0 text-color lead_title">
                <img
                  src={process.env.REACT_APP_BASE_APP_URL + "/assets/lead_details_icons/i copy-39.svg"}
                  className="lead-data-icon"
                />
                <label>Browser name</label>
              </p>
            </div>
            <div class="col-md-1 ">: </div>
            <div class="col-md-5">
              <p class="detail_text">
                <b>                  
                   { data.callData.trackingData && data.callData.trackingData.browser.name } 
                </b>
              </p>
            </div>
          </div>

          <div className="form-group row">
            <div className="col-md-4">
              <p className="mb-0 text-color lead_title">
                <img
                  src={process.env.REACT_APP_BASE_APP_URL + "/assets/lead_details_icons/Lead popup edited-31.svg"}
                  className="lead-data-icon"
                />
                <label>Browser version</label>
              </p>
            </div>
            <div className="col-md-1 ">: </div>
            <div className="col-md-5">
              <p className="detail_text">
                <b>
                  {data.callData.trackingData  &&
                    data.callData.trackingData.browser.version}
                </b>
              </p>
            </div>
          </div>
          <div className="form-group row">
            <div className="col-md-4">
              <p className="mb-0 text-color lead_title">
                <img
                  src={process.env.REACT_APP_BASE_APP_URL + "/assets/lead_details_icons/Lead popup edited-32.svg"}
                  className="lead-data-icon"
                />
                <label>Mobile</label>
              </p>
            </div>
            <div className="col-md-1 ">: </div>
            <div className="col-md-5">
              <p className="detail_text">
                <b>
                  {data.callData.trackingData &&
                  data.callData.trackingData.device.is_mobile_device
                    ? data.callData.trackingData.device.is_mobile_device
                    : 'No'}
                </b>
              </p>
            </div>
          </div>

          <div className="form-group row">
            <div className="col-md-4">
              <p className="mb-0 text-color lead_title">
                <img
                  src={process.env.REACT_APP_BASE_APP_URL + "/assets/lead_details_icons/Lead popup edited-32.svg"}
                  className="lead-data-icon"
                />
                <label>Type</label>
              </p>
            </div>
            <div className="col-md-1 ">: </div>
            <div className="col-md-5">
              <p className="detail_text">
                <b>
                  {data.callData.trackingData &&
                    data.callData.trackingData.device.type}
                </b>
              </p>
            </div>
          </div>

          <div className="form-group row">
            <div className="col-md-4">
              <p className="mb-0 text-color lead_title">
                <img
                  src={process.env.REACT_APP_BASE_APP_URL + "/assets/lead_details_icons/Lead popup edited-32.svg"}
                  className="lead-data-icon"
                />
                <label>Brand</label>
              </p>
            </div>
            <div className="col-md-1 ">: </div>
            <div className="col-md-5">
              <p className="detail_text">
                <b>
                  {data.callData.trackingData  &&
                    data.callData.trackingData.device.brand}
                </b>
              </p>
            </div>
          </div>
          <div className="form-group row">
            <div className="col-md-4">
              <p className="mb-0 text-color lead_title">
                <img
                  src={process.env.REACT_APP_BASE_APP_URL + "/assets/lead_details_icons/Lead popup edited-32.svg"}
                  className="lead-data-icon"
                />
                <label>Model</label>
              </p>
            </div>
            <div class="col-md-1 ">: </div>
            <div class="col-md-5">
              <p class="detail_text">
                <b>
                {data.callData.trackingData  &&
                    data.callData.trackingData.device.name}
                </b>
              </p>
            </div>
          </div>

          <div className="form-group row">
            <div className="col-md-4">
              <p className="mb-0 text-color lead_title">
                <img
                  src= {process.env.REACT_APP_BASE_APP_URL + "/assets/lead_details_icons/Lead popup edited-32.svg"}
                  className="lead-data-icon"
                />
                <label>OS</label>
              </p>
            </div>
            <div className="col-md-1 ">: </div>
            <div className="col-md-5">
              <p className="detail_text">
                <b>
                  {' '}
                  {data.callData.trackingData &&
                    data.callData.trackingData.os}
                </b>
              </p>
            </div>
          </div>
        </Accordion.Content>
      </Accordion>
    </>
  )
}

export default VisitData
