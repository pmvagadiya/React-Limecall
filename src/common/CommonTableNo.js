import React, { Fragment, useState } from 'react'
import { Table, Modal } from 'semantic-ui-react'

import InvertedModal from './InvertedModal'
import EditModal from './EditModal'

import time from '../assets/images/mini-clock.png'
import deleteIcon from '../assets/images/delete-icon.png'
import greenCheck from '../assets/images/Dashboard 2-10.png'

import CommonButtons from './CommonButtons'
import CommonInput from './CommonInput'
import { CommonNotify } from './CommonNotify'

import axios from 'axios'

import { useAlert } from 'react-alert'

const apiToken = localStorage.getItem('access_token')
const plan_name = localStorage.getItem('plan_name');

const CommonTableNo = props => {
  const alert = useAlert()
  const { deleteHandle, style, handleBuy } = props
  const [isCancelModalOpen, setCancelModalOpen] = useState(false)
  const [selecctedNo, setSelectedNo] = useState('')
  const [selecctedPrice, setSelectedPrice] = useState('monthly')
  const [selectedPlan, setSelectedPlan] = useState('monthly')
  const [cardNo, setCardNo] = useState('')
  const [friendlyName, setFriendlyName] = useState('')

  const cancelModalOpen = (number, price, plan = 'monthly') => {
    let head = {
      headers: {
        Authorization: 'Bearer ' + apiToken
      }
    }

    const url = `${process.env.REACT_APP_BASE_APP_URL}/api/v1/credit-cards`

    axios
      .get(url, head)
      .then(res => {
        if (res.data.data.length) {
          res.data.data.map(row => {
            if (row.is_primary == 'yes') {
              setCardNo(row.card.last_four_digits)
              setCancelModalOpen(true)
              setSelectedNo(number)
              setSelectedPrice(price)
              setSelectedPlan(plan)
            }
          })
        } else {
          CommonNotify('Please Add a credit Card', 'warning')
        }
      })
      .catch(error => {
        CommonNotify(
          'Credit Card Not Avilable / Cant Fetch Credit Cards',
          'warning'
        )//     
      })
  }

  const handleThis = data => {
    setCancelModalOpen(false)
    handleBuy(data)
  }

  return (
    <div className="common-table-wrapper">
      <Table style={style} singleLine>
        <Table.Header className="top-table-header">
          <Table.Row>
            {props.dataTable.header.map((data, i) => {
              return (
                <Table.HeaderCell
                  key={i}
                  className="default-text header-modal-style"
                  style={{ fontSize: '16px', fontWeight: 600 }}
                >
                  {data.headerTitle}
                </Table.HeaderCell>
              )
            })}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <Fragment>
            {props.dataTable.tableContentData.map((data, i) => {
              return (
                <Table.Row
                  key={i}
                  className="table-content-row"
                  style={{ fontSize: '14px' }}
                >
                  <Table.Cell>{data.phone}</Table.Cell>
                  <Table.Cell>Yes</Table.Cell>
                  <Table.Cell>Yes</Table.Cell>
                  <Table.Cell>{data.price}</Table.Cell>
                  <Table.Cell>
                    {' '}
                    <CommonButtons
                      type="button"
                      content="+Add"
                      background="blue"
                      onClick={e => cancelModalOpen(data.phone, data.price)}
                    />
                  </Table.Cell>
                </Table.Row>
              )
            })}
          </Fragment>
        </Table.Body>
      </Table>

      <Modal
        className="local-number-modal"
        open={isCancelModalOpen}
        onClose={e => setCancelModalOpen(false)}
      >
        <Modal.Content>
          <div className="modal-content">
            <p style={{marginTop: 20}}>
              Are you sure you want to add {selecctedNo} ? <br />
              Total cost $ {selecctedPrice} Per Month <br />
              You will be charged from Card {cardNo}
            </p>

<div>
            <CommonInput
              placeholder="Friendly Name for Number"
              name="call-me-now"
              type="text"
              style={{minWidth : 200}}
              value={friendlyName}
              required={true}
              onChange={e => setFriendlyName(e.target.value)}
            />

</div>

            <br />
            <br />

            <div>

            <CommonButtons
              onClick={e =>
                handleThis({
                  number: selecctedNo,
                  price: selecctedPrice,
                  name: friendlyName,
                  plan: plan_name
                })
              }
              type="button"
              type="button"
              content="Confirm"
              background="blue"
              style={{width : '100%',borderRadius: 0,backgroundColor : '#0071eb',  color : '#ffffff'}}
              // disabled={friendlyName === ''}
            />
            </div>
            <div>
            <CommonButtons
              onClick={e => setCancelModalOpen(false)}
              type="button"
              content="No"
              background="red"
              style={{width : '100%',borderRadius: 0,backgroundColor : 'red',  color : '#ffffff'}}
            />

            {/* <CommonButtons
              onClick={e => setCancelModalOpen(false)}
              style={{width : '100%', backgroundColor : 'red', color : '#ffffff', borderRadius: 0}}
              type="button"
              content="No"
              background="red"
            /> */}
            </div>
          </div>
        </Modal.Content>
      </Modal>
    </div>
  )
}

export default CommonTableNo
