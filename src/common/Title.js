import React, { Fragment, useEffect, useState } from 'react'
import CommonSelect from './CommonSelect'
import { Link } from 'react-router-dom'
import CommonSubscriptionModal from './CommonSubscriptionModal'

const Title = props => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [location, setlocation] = useState('home')

  const handleCloseModal = async () => {   
    props.closeSubscriptionModal()
  }


  const handleOpenModal = async () => {   
    props.openSubscriptionModal()
  }

  useEffect(() => {
    const location = window.location.href
    setlocation(location.split('/')[3])   
  }, [location])

  return (
    <div className="title-container header_fixed">
      {props.data.type === 'image' ? (
        <Fragment>
          <div className="title-wrapper">
            <img src={props.data.titleOne} className="img-icon" alt="logo" />
            <div className="title-two">{props.data.titleTwo}</div>
          </div>
          {props.dataInvoice === 'Invoices' ? (
            <div className="invoice-select-wrapper filter_section">
              <p className="saved-filter-text">Saved Filters</p>
              <CommonSelect name="invoice" options={['Basic', 'Premium']} />
            </div>
          ) : null}
        </Fragment>
      ) : (
        <Fragment>
          <div className="welcome-name">
            <div className="title-one main_title">{props.data.titleOne}</div>
            <div className="title-two">{props.data.titleTwo}</div>
          </div>
        </Fragment>
      )}
      {location === 'home'  ? (
        <div  onClick={handleOpenModal}>
          <Link className="home-card-button sky-blue" to="#">
            Upgrade
          </Link>
          {/* <CommonSubscriptionModal
            open={props.plan_name !== null && props.showSubscriptionModal === true}
            onClose={handleCloseModal}
            currentPlan={props.plan_name}
            // updateGetSubscription={this.props.updateGetSubscription}
            dataTable={props.subscriptionData}
          /> */}
        </div>
         ) : null } 
         </div>
  )
}

export default Title
