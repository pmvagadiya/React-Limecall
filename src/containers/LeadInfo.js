import React, { useState } from 'react'
import { Accordion, Icon } from 'semantic-ui-react'
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
          active={activeIndex === 1}
          index={1}
          onClick={handleClick}
        >
          lead info
        </Accordion.Title>
        <Accordion.Content active={activeIndex === 1}>
          <div className="form-group row">
            <div className="col-md-4">
              <p className="mb-0 text-color lead_title">
                <img
                  src={process.env.REACT_APP_BASE_APP_URL + "/assets/lead_details_icons/Lead popup edited-33.svg"}
                  className="lead-data-icon"
                />
                <label>IP</label>
              </p>
            </div>
            <div className="col-md-1 ">: </div>
            <div className="col-md-5">
              <p className="detail_text">
                <b>{data.callData.ip_address}</b>
              </p>
            </div>
          </div>
          <div className="form-group row">
            <div className="col-md-4">
              <p className="mb-0 text-color lead_title">
                <img
                  src={process.env.REACT_APP_BASE_APP_URL + "/assets/lead_details_icons/Lead popup edited-33.svg"}
                  className="lead-data-icon"
                />
                <label>Source</label>
              </p>
            </div>
            <div class="col-md-1 ">: </div>
            <div class="col-md-5">
              <p class="detail_text">
                <b style={{ lineBreak: 'anywhere' }}>{data.callData.source}</b>
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
                <label>Score</label>
              </p>
            </div>
            <div className="col-md-1 ">: </div>
            <div className="col-md-5">
              <p className="detail_text">
                <b>{data.callData.score}</b>
              </p>
            </div>
          </div>
          {/* <div className="form-group row">
            <div className="col-md-4">
              <p className="mb-0 text-color lead_title">
                <img
                  src={process.env.REACT_APP_BASE_APP_URL + "/assets/lead_details_icons/Lead popup edited-24.svg"}
                  className="lead-data-icon"
                />
                <label>Budget</label>
              </p>
            </div>
            <div className="col-md-1 ">: </div>
            <div className="col-md-5">
              <p className="detail_text">
                <b>qa.limecall.com</b>
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
                <label>UTM</label>
              </p>
            </div>
            <div className="col-md-1 ">: </div>
            <div className="col-md-5">
              <p className="detail_text">
                <b></b>
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
                <label>Rating (By Agent) </label>
              </p>
            </div>
            <div className="col-md-1 ">: </div>
            <div className="col-md-5">
              <p className="detail_text">
                <div className="lead-details-star-rating">
                  <Rating
                    icon="star"
                    defaultRating={
                      data.callData && data.callData.agent_feedback_rate
                    }
                    maxRating={5}
                  />
                </div>
              </p>
            </div>
          </div>
          <div className="form-group row">
            <div className="col-md-5">
              <p className="mb-0 text-color lead_title">
                <img
                  src={process.env.REACT_APP_BASE_APP_URL + "/assets/lead_details_icons/Lead popup edited-32.svg"}
                  className="lead-data-icon"
                />
                <label>Feedback (By Agent)</label>
              </p>
            </div>
            <div class="col-md-1 ">: </div>
            <div class="col-md-5">
              <p class="detail_text">
                <b>
                  {data.callData.agent_feedback_text
                    ? data.callData.agent_feedback_text
                    : '-'}
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
                <label>Team</label>
              </p>
            </div>
            <div className="col-md-1 ">: </div>
            <div className="col-md-5">
              <p className="detail_text">
                <b>{data.callData.team ? data.callData.team : '-'}</b>
              </p>
            </div>
          </div>
          {/* <div className="form-group row">
            <div className="col-md-4">
              <p className="mb-0 text-color lead_title">
                <img
                  src={process.env.REACT_APP_BASE_APP_URL + "/assets/lead_details_icons/Lead popup edited-24.svg"}
                  className="lead-data-icon"
                />
                <label>Last Seen</label>
              </p>
            </div>
            <div className="col-md-1 ">: </div>
            <div className="col-md-5">
              <p className="detail_text">
                {data.callData.trackingData.last_interaction}
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
                <label>First Seen</label>
              </p>
            </div>
            <div className="col-md-1 ">: </div>
            <div className="col-md-5">
              <p className="detail_text">
                <b>{data.callData.member.first_login_time}</b>
              </p>
            </div>
          </div> */}
        </Accordion.Content>
      </Accordion>
    </>
  )
}

export default LeadInfo
