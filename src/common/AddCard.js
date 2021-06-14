import React, { useState, useEffect } from 'react'
import _ from 'lodash'
import { Input } from 'semantic-ui-react'
import axios from 'axios'
import CommonInput from './CommonInput'
import { CommonNotify } from './CommonNotify'
import Button from './CommonButtons'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
toast.configure()

const AddCard = ({
  onChangeComponent,
  onChangeState,
  onEditState,
  update,
  loading
}) => {
  const [dataCard, setDataCard] = useState({
    cardName: '',
    cardNumber: '',
    month: '',
    year: '',
    CVV: ''
  })
  const [errorDataCard, setErrorDataCard] = useState({
    cardName: '',
    cardNumber: '',
    month: '',
    year: '',
    CVV: ''
  })

  const ERROR_CODE = {
    cardName: 'Card Name',
    cardNumber: 'Card Number',
    month: 'Month',
    year: 'Year',
    CVV: 'CVV'
  }

  useEffect(() => { 
    setDataCard({
      cardName: (onEditState && onEditState.cardName) || '',
      cardNumber: (onEditState && onEditState.cardNumber) || '',
      month: (onEditState && onEditState.month) || '',
      year: (onEditState && onEditState.year) || '',
      CVV: (onEditState && onEditState.CVV) || ''
    })
  }, [onEditState, update])

  const onClickBack = () => {
    onChangeComponent(true)
  }

  const onChangeInput = e => {
    const { name, value } = e.target
    dataCard[name] = value
    setDataCard({
      ...dataCard
    })
    if (!value) {
      errorDataCard[name] = `${ERROR_CODE[name]} is required`
      setErrorDataCard({ ...errorDataCard })
      return
    } else {
      errorDataCard[name] = ''
      setErrorDataCard({ ...errorDataCard })
    }

    if (name === 'cardNumber') {
      if (value.toString().length > 16) {
        errorDataCard[
          name
        ] = `${ERROR_CODE[name]} must be less than 17 digit long.`
        setErrorDataCard({ ...errorDataCard })
      } else if (value < 0) {
        errorDataCard[name] = `${ERROR_CODE[name]} must be greater than 0.`
        setErrorDataCard({ ...errorDataCard })
      } else {
        errorDataCard[name] = ''
        setErrorDataCard({ ...errorDataCard })
      }
    }

    if (name === 'CVV') {
      if (value.toString().length > 4) {
        errorDataCard[
          name
        ] = `${ERROR_CODE[name]} must be less than 4 digit long.`
        setErrorDataCard({ ...errorDataCard })
      } else if (value < 0) {
        errorDataCard[name] = `${ERROR_CODE[name]} must be greater than 0.`
        setErrorDataCard({ ...errorDataCard })
      } else {
        errorDataCard[name] = ''
        setErrorDataCard({ ...errorDataCard })
      }
    }
  }

  const onAdd = e => {
    loading(true)
    if (
      dataCard.cardName === '' ||
      dataCard.cardNumber === '' ||
      dataCard.month === '' ||
      dataCard.year === '' ||
      dataCard.CVV === ''
    ) {
      CommonNotify('All felids are required', 'warning')
      loading(false)
      return
    }
    dataCard.date = dataCard.month + '/' + dataCard.year
    // onChangeState(dataCard)

    const token = localStorage.getItem('access_token')
    const URL = `${process.env.REACT_APP_BASE_APP_URL}/api/v1/create-customer-credit-card`

    const form = new FormData()
    form.append('name', dataCard.cardName)
    form.append('card_number', dataCard.cardNumber)
    form.append('expiry', dataCard.date)
    form.append('cvv', dataCard.CVV)

    const settings = {
      url: URL,
      method: 'POST',
      timeout: 0,
      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer ' + token
      },
      processData: false,
      mimeType: 'multipart/form-data',
      contentType: false,
      data: form
    }

    return axios(settings)
      .then(res => {
        loading(false)
        CommonNotify('Card Details Saved', 'success')
        return res
      })
      .catch(err => {
        loading(false)
        const errors = { ...err }
        if (errors.response.data.errors) {
          CommonNotify(errors.response.data.errors[0])
        } else {
          CommonNotify('Cant Save Card Details')
        }
      })
  }

  const { cardName, cardNumber, month, year, CVV } = errorDataCard
  return (
    <div className="add-credit-wrapper  credit_card_detail">
      <div className="add-credit-input-holder">
        <CommonInput
          onChange={onChangeInput}
          type="text"
          title="Name on Card"
          background="gray"
          inputStyle="input-style name-number-card"
          name="cardName"
          value={(onEditState && onEditState.cardName) || null}
          error={cardName}
        />{' '}
        <CommonInput
          onChange={onChangeInput}
          type="text"
          title="Card Number"
          background="gray"
          inputStyle="input-style name-number-card"
          name="cardNumber"
          value={(onEditState && onEditState.cardNumber) || null}
          error={cardNumber}
        />{' '}
        <div className="expiry-holder">
          <label className="default-text input-title"> Expiry Date </label>{' '}
          <div className="expiry-input-holder">
            <Input
              onChange={onChangeInput}
              maxLength="2"
              type="text"
              className="input-style"
              name="month"
              value={(onEditState && onEditState.month) || null}
              error={month}
              
            />{' '}
            <Input
              onChange={onChangeInput}
              maxLength="4"
              type="text"
              className="input-style"
              name="year"
              value={(onEditState && onEditState.year) || null}
              error={year}
              
            />{' '}
          </div>{' '}
        </div>{' '}
        <CommonInput
          onChange={onChangeInput}
          type="text"
          pattern="[0-9]+"
          title="CVV"
          background="gray"
          name="CVV"
          inputStyle="input-last"
          value={(onEditState && onEditState.CVV) || null}
          error={CVV}
        />{' '}
      </div>{' '}
      <div className="btn-holder">
        <Button
          onClick={onClickBack}
          content="Back"
          background="blue"
          btnClass=""
        />

        {update == true && (
          <Button onClick={onAdd} content="Save" background="blue" />
        )}
        {update == false && (
          <Button onClick={onAdd} content="Add" background="blue" />
        )}
      </div>{' '}
    </div>
  )
}

export default AddCard
