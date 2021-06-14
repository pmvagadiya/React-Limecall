import React, { useState } from 'react'
import { Accordion, Icon } from 'semantic-ui-react'
import googleicon from '../assets/images/google_icon.png'
import { Rating } from 'semantic-ui-react'

function LeadInfo({ data }) {
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
          active={activeIndex === 0}
          index={0}
          onClick={handleClick}
        >
          Call data
        </Accordion.Title>
        <Accordion.Content active={activeIndex === 0}>
          <div className="form-group row">
            <div className="col-md-4">
              <p className="mb-0 text-color lead_title">
                <img
                  src={process.env.REACT_APP_BASE_APP_URL + "/assets/lead_details_icons/Lead popup edited-33.svg"}
                  className="lead-data-icon"
                />
                <label>ID</label>
              </p>
            </div>
            <div class="col-md-1 ">: </div>
            <div class="col-md-5">
              <p class="detail_text">
                <b style={{ lineBreak: 'anywhere' }}>
                  {/* <img src={googleicon} /> */}
                  {data.callData.id}
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
                <label>Duration</label>
              </p>
            </div>
            <div className="col-md-1 ">: </div>
            <div className="col-md-5">
              <p className="detail_text">
                <b>
                  {data?.callData?.duration ? data?.callData?.duration : 0} Sec
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
                <label>Agent</label>
              </p>
            </div>
            <div class="col-md-1 ">: </div>
            <div class="col-md-5">
              <p class="detail_text">
                <b>{data.callData?.member?.first_name}</b>
              </p>
            </div>
          </div>

          {data?.callData?.final_status && (
            <div className="form-group row">
              <div className="col-md-4">
                <p className="mb-0 text-color lead_title">
                  <img
                    src={process.env.REACT_APP_BASE_APP_URL + "/assets/lead_details_icons/i copy-39.svg"}
                    className="lead-data-icon"
                  />
                  <label>Status</label>
                </p>
              </div>
              <div className="col-md-1 ">: </div>
              <div className="col-md-5">
                <p className="detail_text">
                  <b>
                    {data.callData?.final_status.toString().replace(/\_/g, ' ')}
                  </b>
                </p>
              </div>
            </div>
          )}
          <div className="form-group row">
            <div className="col-md-4">
              <p className="mb-0 text-color lead_title">
                <img
                  src={process.env.REACT_APP_BASE_APP_URL + "/assets/lead_details_icons/Lead popup edited-31.svg"}
                  className="lead-data-icon"
                />
                <label>Direction</label>
              </p>
            </div>
            <div className="col-md-1 ">: </div>
            <div className="col-md-5">
              <p className="detail_text">
                <b>{data.callData && data.callData.direction} </b>
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
                <label>Time</label>
              </p>
            </div>
            <div className="col-md-1 ">: </div>
            <div className="col-md-5">
              <p className="detail_text">
                <b>{data.callData.created_at}</b>
              </p>
            </div>
          </div>

          {/* <div className="form-group row">
            <div className="col-md-4">
              <p className="mb-0 text-color lead_title">
                <img
                  src={process.env.REACT_APP_BASE_APP_URL + "/assets/lead_details_icons/Lead popup edited-32.svg"}
                  className="lead-data-icon"
                />
                <label>Scheduled At</label>
              </p>
            </div>
            <div className="col-md-1 ">: </div>
            <div className="col-md-5">
              <p className="detail_text">
                <b>{data.callData.trackingData && data.callData.trackingData.updated_at}</b>
              </p>
            </div>
          </div> */}

          <div className="form-group row">
            <div className="col-md-4">
              <p className="mb-0 text-color lead_title">
                <img
                  src={process.env.REACT_APP_BASE_APP_URL + "/assets/lead_details_icons/Lead popup edited-32.svg"}
                  className="lead-data-icon"
                />
                <label>Rating (By Lead) </label>
              </p>
            </div>
            <div className="col-md-1 ">: </div>
            <div className="col-md-5">
              <p className="detail_text">
                <div className="lead-details-star-rating">
                  <Rating
                    disabled
                    icon="star"
                    defaultRating={data?.callData?.customer_feedback_rate}
                    maxRating={5}
                  />
                </div>
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
                <label>Feedback (By Lead)</label>
              </p>
            </div>
            <div class="col-md-1 ">: </div>
            <div class="col-md-5">
              <p class="detail_text">
                <b>
                  {data?.callData?.customer_feedback_text
                    ? data?.callData?.customer_feedback_text
                    : '-'}
                </b>
              </p>
            </div>
          </div>

          {data.callData && data.callData.recording_url !== null ? (

          <div className="form-group row">
            <div className="col-md-4">
              <p className="mb-0 text-color lead_title">
                <img
                  src={process.env.REACT_APP_BASE_APP_URL + "/assets/lead_details_icons/Lead popup edited-32.svg"}
                  className="lead-data-icon"
                />
                <label>Recording </label>
              </p>
            </div>
            <div className="col-md-1 ">: </div>
            <div className="col-md-5">
              <p className="detail_text">
                <audio controls>
                  <source
                    src={`${data.callData && data.callData.recording_url}`}
                    type="audio/binary"
                  />
                </audio>
              </p>
            </div>
          </div>
          ) : null }
        </Accordion.Content>
      </Accordion>
    </>
  )
}

export default LeadInfo
