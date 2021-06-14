import React from 'react'
import { Modal, Button, Image, Input } from 'semantic-ui-react'

import checked from '../assets/images/checked.svg'
import americanExpress from '../assets/images/americanexpress.svg'
import visa from '../assets/images/visa.svg'
import masterCard from '../assets/images/mastercard.svg'
import CommonInput from './CommonInput'
import CommonButtons from './CommonButtons'

const CommonAddCardModal = ({
  open,
  onCloseAddCardModal,
  creditCardDetailsErrors,
  handleCreditCardInfo,
  addCreditCardLoader,
  onAddCreditCard,
  updateCard  
}) => {
  const {
    cardName,
    cardNumber,
    validMonth,
    validYear,
    cvv
  } = creditCardDetailsErrors  

  return (
    <Modal
      open={open}
      size="tiny"
      onClose={() => onCloseAddCardModal()}
      className="common-add-card-modal"
    >
      <Modal.Header>
        <span>{ updateCard ? 'Update card' : 'Add Card' }</span>
        <i
          onClick={() => onCloseAddCardModal()}
          className="fa fa-times"
          aria-hidden="true"
        ></i>
      </Modal.Header>
      <Modal.Content style={{ padding: '20px' }}>
        <>
          <CommonInput
            onChange={e => handleCreditCardInfo(e)}
            name="cardName"
            title="NAME ON CARD"
            background="gray"
          />
          {cardName ? <span className="error-message-cardName">{cardName}</span> : null}
          <div className="holder-card-number">
            <CommonInput
              onChange={e => handleCreditCardInfo(e)}
              name="cardNumber"
              title="CARD NUMBER"
              background="gray"
            />
            <div className="holder-images">
              <Image src={visa} />
              <Image src={americanExpress} />
              <Image src={masterCard} />
            </div>
            {cardNumber ? <span className="error-message-cardNumber">{cardNumber}</span> : null}
          </div>
          <div className="holder-date">
            <div className="hold-expiry-date">
              <label>Expiry Date</label>
              <div className="input-holder">
                <Input
                  onChange={e => handleCreditCardInfo(e)}
                  name="validMonth"
                  placeholder="Month"
                  minLength="1"
                  maxLength="2"
                  error={validMonth}
                  style={{ width: "80px"}}
                />
                <Input
                  onChange={e => handleCreditCardInfo(e)}
                  name="validYear"
                  placeholder="Year"
                  minLength="1"
                  maxLength="4"
                  error={validYear}
                  style={{ width: "80px"}}
                />
              </div>
            </div>
            
            {/* <CommonInput
              onChange={() => handleCreditCardInfo()}
              name="validMonth"
              title="VALID THRU"
              placeholder="Month"
              background="gray"
              error={validMonth}
            />
            <CommonInput
              onChange={() => handleCreditCardInfo()}
              name="validYear"
              placeholder="Year"
              background="gray"
              error={validYear}
            /> */}
          </div>
          <CommonInput
            onChange={e => handleCreditCardInfo(e)}
            name="cvv"
            title="CVV"
            background="gray"
          />
          {cvv ? <span className="error-message-cvv">{cvv}</span> : null}
          <div className="span-text-holder">
            <span className="secure-text">
              <Image src={checked} />
              100% secure checkout
            </span>
            <span className="commercial-text">
              <Image src={checked} />
              256-Bit Commercial grade Security
            </span>
          </div>
          {/* <CommonButtons
            content="Update Card"
            background="blue"
            loading={addCreditCardLoader}
            onClick={() => onAddCreditCard()}
          /> */}
        </>
      </Modal.Content>
      <Modal.Actions>
        <CommonButtons
          content="Cancel"
          background="blue"
          onClick={() => onCloseAddCardModal()}
        />
        <CommonButtons
          content={ updateCard ? 'Update' : 'Add' }
          background="blue"
          loading={addCreditCardLoader}
          onClick={() => onAddCreditCard()}
        />
      </Modal.Actions>
    </Modal>
  )
}
export default CommonAddCardModal
