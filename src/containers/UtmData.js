import React, { useState } from 'react'
import { Accordion, Icon } from 'semantic-ui-react'
import googleicon from '../assets/images/google_icon.png'
import { Rating } from 'semantic-ui-react'

function UtmData({ data }) {
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
          active={activeIndex === 4}
          index={4}
          onClick={handleClick}
        >
          UTM Info
        </Accordion.Title>
        <Accordion.Content active={activeIndex === 4}>
          <div className="form-group row">
            <div className="col-md-4">
              <p className="mb-0 text-color lead_title">
                <img
                  src={process.env.REACT_APP_BASE_APP_URL + "/assets/lead_details_icons/Lead popup edited-33.svg"}
                  className="lead-data-icon"
                />
                <label>Compaign</label>
              </p>
            </div>
            <div class="col-md-1 ">: </div>
            <div class="col-md-5">
              <p class="detail_text">
                <b>
                  { data.callData.customer_utm.length !== 0 && data.callData.customer_utm.utm_campaign } 
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
                <label>Content</label>
              </p>
            </div>
            <div className="col-md-1 ">: </div>
            <div className="col-md-5">
              <p className="detail_text">
                <b>
                  {data.callData.customer_utm.length !== 0 && data.callData.customer_utm.utm_content }
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
                <label>Medium</label>
              </p>
            </div>
            <div className="col-md-1 ">: </div>
            <div className="col-md-5">
              <p className="detail_text">
                <b>  { data.callData.customer_utm.length !== 0 && data.callData.customer_utm.utm_medium  } </b>
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
                <label>Source</label>
              </p>
            </div>
            <div class="col-md-1 ">: </div>
            <div class="col-md-5">
              <p class="detail_text">
                <b>
                  
                   { data.callData.customer_utm.length !== 0 && data.callData.customer_utm.utm_source  } 
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
                <label>Term</label>
              </p>
            </div>
            <div className="col-md-1 ">: </div>
            <div className="col-md-5">
              <p className="detail_text">
                <b>
                  {data.callData.customer_utm.length !== 0 && data.callData.customer_utm.utm_term }
                </b>
              </p>
            </div>
          </div>

        </Accordion.Content>
      </Accordion>
    </>
  )
}

export default UtmData
