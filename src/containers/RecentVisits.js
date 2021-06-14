import React, { useState } from 'react'
import { Accordion, Icon, Table } from 'semantic-ui-react'
import moment from 'moment'

function RecentVisits({ data, history }) {
  const [activeIndex, setActiveIndex] = useState(0)

  const handleClick = (e, titleProps) => {
    const { index } = titleProps
    const activeIndexs = activeIndex
    const newIndex = activeIndexs === index ? -1 : index
    setActiveIndex(newIndex)
  }

 
 function renderlist(){

     let list = [];
    //  const l = history.length > 10 ? 10 : history.length
    if(history.length > 0)
    {
      var l = history.length > 10 ? history.length - 11 : history.length
     console.log('Accordian in For loop Funczatiob', l)
     for (var i = history.length - 1; i > l; i--) {
         list.push( 
          <div className="form-group row">
            <div className="col-md-4">
              <p className="mb-0 text-color lead_title">
                <label>{moment.utc(history[i].visitied_on).format('YYYY-MM-DD hh:mm:ss')}</label>
              </p>
            </div>
            <div className="col-md-1 ">: </div>
            <div className="col-md-5">
              <p className="detail_text">
                <a href={history[i].page_url} target="_blank">
                <b style={{lineBreak: 'anywhere'}}>{history[i].page_url.substring(0,35)}</b>
                </a>
              </p>
            </div>
          </div>
       )
     }
     return list;
    }
  }
  return (
    <>
      <Accordion className="Lead_wrapper" fluid styled>
        <Accordion.Title
          active={activeIndex === 3}
          index={3}
          onClick={handleClick}
        >
          Recent Visits
        </Accordion.Title>
        {/* {console.log('Accordian :::::',history)} */}
        <Accordion.Content active={activeIndex === 3}>
        <div className="form-group row">
            <div className="col-md-4">
              <p className="mb-0 text-color lead_title">
              <img
                  src="https://qa.limecall.com/assets/lead_details_icons/i copy-39.svg"
                  className="lead-data-icon"
                />
                <label style={{fontSize : 17}}>Time</label>
              </p>
            </div>
            <div className="col-md-1 ">: </div>
            <div className="col-md-5">
              <p className="detail_text">
              <img
                  src="https://qa.limecall.com/assets/lead_details_icons/Lead popup edited-33.svg"
                  className="lead-data-icon"
                />
                <b style={{fontSize : 17}}>Page</b>
              </p>
            </div>
          </div>
        {renderlist()}     
        </Accordion.Content>
      </Accordion>
    </>
  )
}

export default RecentVisits
