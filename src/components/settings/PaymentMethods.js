import React, { Component, Fragment } from 'react'

import AddCard from '../../common/AddCard'
import Button from '../../common/CommonButtons'
import creditCard from '../../assets/images/credit-card.png'
// import editIcon from '../../assets/images/Dashboard-35.png'
// import creditPlaceholder from '../../assets/images/card-placeholder.png'

import axios from 'axios'
import { CommonNotify } from '../../common/CommonNotify'

import { Table } from 'semantic-ui-react'

const apiToken = localStorage.getItem('access_token')

export default class PaymentMethods extends Component {
  state = {
    addCard: false,
    selectCard: true,
    editCard: false,
    saveCard: [],
    updateCard: [],
    updateCardId: '',
    cardData: {
      expiry_month: '',
      expiry_year: ''
    }
  }

  onSelectCard = () => {

    if(this.state.saveCard.length){
      this.setState({
        addCard: false,
        selectCard: false,
        editCard: true
      })
    }else{
      this.setState({
        addCard: true,
        selectCard: false,
        editCard: false
      })
    }

   
  }

  onUpdateCard = index => {
    this.setState({
      addCard: false,
      selectCard: false,
      editCard: true,
      updateCard: this.state.saveCard[index],
      updateCardId: index
    })
  }

  onChangeState = data => {
    let copyArr = this.state.saveCard
    data.status = 'Active'
    if (this.state.updateCardId !== '') {
      copyArr[this.state.updateCardId] = data
    } else {
      copyArr.push(data)
    }
    this.setState({
      addCard: false,
      selectCard: true,
      editCard: false,
      saveCard: copyArr
    })
  }

  onChangeComponent = dataStatus => {
    this.setState({
      addCard: false,
      selectCard: dataStatus,
      editCard: false
    })
  }

  componentWillMount = () => {
    this.fetchCard()
  }

  fetchCard = () => {
    this.props.loading(true)
    let head = {
      headers: {
        Authorization: 'Bearer ' + apiToken
      }
    }
    const url = `${process.env.REACT_APP_BASE_APP_URL}/api/v1/get-customer-payment-methods`
    axios
      .get(url, head)
      .then(res => {
        this.props.loading(false)
        if (res.data.data[0]) {
          //this.setPlanData(res.data.data)
          //this.onUpdateCard()
          this.setState({ saveCard: res.data.data })
        }
      })
      .catch(er => {
        this.props.loading(false)
        CommonNotify('Cant Fetch Saved Card')     
      })
  }

  renderAddCard() {
    return (
      <Fragment>
        <div className="payment-title-wrapper">
          <h2 className="default-text bold-text"> Credit Card</h2>{' '}
        </div>{' '}
        <AddCard
          loading={this.props.loading}
          onChangeComponent={this.onChangeComponent}
          onChangeState={this.onChangeState}
          onEditState={null}
          update={this.state.editCard}
        />{' '}
      </Fragment>
    )
  }

  renderUpdateCard() {
    return (
      <Fragment>
        <div className="payment-title-wrapper">
          <h2 className="default-text bold-text"> Edit a Payment method </h2>{' '}
        </div>{' '}
        <AddCard
          onChangeComponent={this.onChangeComponent}
          onChangeState={this.onChangeState}
          onEditState={this.state.updateCard}
          update={this.state.editCard}
        />{' '}
      </Fragment>
    )
  }

  render() {
    return (
      <div className="paymentmethods-wrapper credit_card_main">
        {' '}
        {this.state.selectCard === true ? (
          <Fragment>
            {' '}
            {this.state.saveCard[0] ? (
              <Fragment>
                <div className="saved-card-title">
                  <h2 className="default-text bold-text"> Saved Card 1 </h2>{' '}
                </div>{' '}
                <div className="saved-card-holder">
                  <Table celled>
                    <Table.Header>
                      <Table.Row>
                        <Table.HeaderCell> Card No </Table.HeaderCell>{' '}
                        <Table.HeaderCell> Expiry Date </Table.HeaderCell>{' '}
                        <Table.HeaderCell> Status </Table.HeaderCell>{' '}
                        <Table.HeaderCell> Action </Table.HeaderCell>{' '}
                      </Table.Row>{' '}
                    </Table.Header>{' '}
                    <Table.Body>
                      {' '}
                      {this.state.saveCard.map((item, i) => {
                        return (
                          // <div key={i} className="card-box">
                          //   <img src={creditPlaceholder} alt="placeholder" />
                          // </div>
                          <Table.Row key={i} id={i}>
                            <Table.Cell>
                              {' '}
                              **** **** **** {item.card.last_four_digits}{' '}
                            </Table.Cell>{' '}
                            <Table.Cell>
                              {' '}
                              {item.card.expiry_month +
                                '/' +
                                item.card.expiry_year}{' '}
                            </Table.Cell>{' '}
                            <Table.Cell> {item.status} </Table.Cell>{' '}
                            <Table.Cell className="edit-icon">
                              {' '}
                              {/* <img
                                                      src={editIcon}
                                                      alt="placeholder"
                                                    /> */}{' '}
                              <Button
                                onClick={() => this.onUpdateCard(i)}
                                content="Edit"
                                background="grey"
                                btnClass=""
                              />
                            </Table.Cell>{' '}
                          </Table.Row>
                        )
                      })}{' '}
                    </Table.Body>{' '}
                  </Table>{' '}
                </div>{' '}
              </Fragment>
            ) : (<div style={{fontSize: '16px',  marginTop: '30px',  fontWeight: '600'}}>
                Looks like you have not added your credit card details yet!
             </div>)}{' '}
            
            <div className="payment-title-wrapper">
              <h2 className="default-text bold-text"> Credit Card </h2>{' '}
            </div>{' '}
            <div className="card-wrapper">
              <div className="card-holder">
                <img
                  src={creditCard}
                  onClick={this.onSelectCard}
                  className="credit-card-item"
                  alt="card"
                />
              </div>{' '}
              {/* <div className="card-holder">
                            <img
                              src={paypal}
                              onClick={this.onSelectCard}
                              className="credit-card-item"
                              alt="card"
                            />
                          </div> */}{' '}
            </div>{' '}
          </Fragment>
        ) : this.state.addCard === true ? (
          this.renderAddCard()
        ) : this.state.editCard === true ? (
          this.renderUpdateCard()
        ) : null}{' '}
      </div>
    )
  }
}
