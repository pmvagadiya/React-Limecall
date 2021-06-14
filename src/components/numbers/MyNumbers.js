import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Table, Dropdown } from 'semantic-ui-react'
import { useHistory } from 'react-router-dom'
import Axios from 'axios'

import CommonCheckbox from '../../common/CommonCheckbox'
import CommonButton from '../../common/CommonButtons'

import Modal from '../../common/ConfirmModal'

import axios from 'axios'
import {
  Dimmer,
  Loader,
  Image,
  Segment,
  Confirm,
  Item
} from 'semantic-ui-react'

import { CommonNotify } from '../../common/CommonNotify'

const apiToken = localStorage.getItem('access_token')

const MyNumbers = ({ loading, widget }) => {
  const history = useHistory()
  const [myNumbers, setNumbers] = useState([])
  const [confirmDel, setConfirmDel] = useState(false)
  const [selectedNumber, setSelectedNumber] = useState(null)
  const [allMark, setAllMark] = useState(false)
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    if (!widget.id) return
    fetchNumbers()
  }, [widget])

  const deleteNumber = number => {

    setLoading(true)

    let head = {
      headers: {
        Authorization: 'Bearer ' + apiToken
      }
    }
    const url = `${process.env.REACT_APP_BASE_APP_URL}/api/v1/number/${number}`
    const data = {
      number_id: number
    }

    axios
      .delete(url, head)
      .then(res => {
        setLoading(false)
        if (res.data.message[0]) { 
          CommonNotify('Number deleted successfully', 'success')
          fetchNumbers()
        }
      })
      .catch(error => {
        setLoading(false)
        CommonNotify('Cant Delete number')
      })
  }

  const fetchNumbers = () => {
    const id = parseInt(localStorage.getItem('id'));
    let head = {
      headers: {
        Authorization: 'Bearer ' + apiToken
      }
    }
    const url = `${process.env.REACT_APP_BASE_APP_URL}/api/v1/get-user-numbers`

    axios
      .get(url, head)
      .then(res => {
        setLoading(false)
        if (res.data.data) {          
          let tempRows = []
          res.data.data.map((row, index) => {
            if (!row.primary) {
              row.isChecked = false;
              row.value = row.id;
              row.assigned = row.assigned === null ? "Not Assigned" : row.assigned.name
              row.label = row.friendly_name
              tempRows.push(row)
            }
          })
          setNumbers(tempRows)
          localStorage.setItem('phone_numbers',JSON.stringify(tempRows))
        }
      })
      .catch(error => {
        setLoading(false)
        CommonNotify('Cant fetch numbers')
      })
  }

  const deleteModal = data => {
    setSelectedNumber(data)
    setConfirmDel(true)
  }

  const handleDelete = () => {
    const val = selectedNumber.id;
    const number = selectedNumber.phone_number;
    setConfirmDel(false)
    if (!val) return
    deleteNumber(val)
  }

  const onMarkAllCheckbox =  (e, val, key, ch) => {
    const data = [...myNumbers]
    data.forEach(function(d) {
      d.isChecked = !key
    })
    setAllMark(!allMark)
    setNumbers(data)
  }

  const onChangeSelect = (e, val, key, ch, id) => {
    const data = [...myNumbers]

    data[id].isChecked = !data[id].isChecked
    setNumbers(data)
  }

  const OnEditNumber = id => {
    history.push(`/setCampaign?id=${id}`)
  }

  const close = async () => {
    setConfirmDel(false)
  }

  /*********************** On Bulk Delete ****************** */

  const onBulkDelete = async () => {
    const data = [...myNumbers]
    var selectedNumbers = [];
    data.forEach(function(d) {
      if(d.isChecked === true){
        selectedNumbers.push(d.id);
      }
    })

    if(selectedNumbers.length === 0)
    {
      CommonNotify('Please select number first.')
    }else {

    setLoading(true)

    let head = {
      headers: {
        Authorization: 'Bearer ' + apiToken
      }
    }
    const url = `${process.env.REACT_APP_BASE_APP_URL}/api/v1/numbers/delete`;
    const Axiosdata = {
      ids: selectedNumbers
    }

    axios
      .post(url, Axiosdata, head)
      .then(res => {
        setLoading(false)
          CommonNotify('Number deleted successfully', 'success')
          fetchNumbers()
        
      })
      .catch(error => {
        setLoading(false)
        CommonNotify('Cant Delete number')
      })

    }

  }

  return (
    <>
    <Dimmer active={isLoading}>
      <Loader/>
    </Dimmer>
    <div className="my-number-tab manage_table">
      <div className="table-heading-wrapper">
        <Dropdown text="Actions">
          <Dropdown.Menu>
            <Dropdown.Item onClick={() => onBulkDelete()} text="Delete" />
          </Dropdown.Menu>
        </Dropdown>
        <Link to="addNumbers">
          <CommonButton content="Add Number" btnClass="btn-blue" />
        </Link>
      </div>
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>
              <CommonCheckbox
                onChange={(e, val, key, ch) =>
                onMarkAllCheckbox(e, val, key, ch)
                } 
                name="isMarkAllCheckbox"
                checked={allMark}
              />
            </Table.HeaderCell>
            <Table.HeaderCell>ID</Table.HeaderCell>
            <Table.HeaderCell>Phone Number</Table.HeaderCell>
            <Table.HeaderCell>Price</Table.HeaderCell>
            <Table.HeaderCell>Friendly Name</Table.HeaderCell>
            <Table.HeaderCell>Assigned To</Table.HeaderCell>
            <Table.HeaderCell>Action</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {myNumbers.map((row, index) => (
            <Table.Row>
              <Table.Cell>
                <CommonCheckbox
                onChange={(e, val, key, ch) =>
                  onChangeSelect(e, val, key, ch, index)
                } 
                name="isChecked"
                checked={row.isChecked}
                />
              </Table.Cell>
              <Table.Cell>
                <p>{row.id}</p>
              </Table.Cell>
              <Table.Cell>
                <p>{row.phone_number}</p>
              </Table.Cell>
              <Table.Cell>
                <p>{row.price} $</p>
              </Table.Cell>
              <Table.Cell>
                <p>{row.label}</p>
              </Table.Cell>
              <Table.Cell>
                <p>{row.assigned}</p>
              </Table.Cell>
              <Table.Cell>
                <div className="number_button">
                  <CommonButton
                    type="button"
                    content="Edit"
                    background="blue"
                    onClick={e => OnEditNumber(row.id)}
                  />

                  <CommonButton
                    type="button"
                    content="Delete"
                    background="red"
                    onClick={e => deleteModal(row)}
                    style={{ borderRadius : 0, marginLeft: '10px' }}
                  />
                </div>
              </Table.Cell>
            </Table.Row>
          ))}

          {/* <Link to="setCampaign?campaignId=2"> */}

          {/* </Link> */}
        </Table.Body>
      </Table>
      <Confirm
            className="confirmBox-wrapper"
            open={confirmDel}
            header="Delete Number!"
            content={`Do you want to delete Number :  ${selectedNumber !== null ? selectedNumber.phone_number : ''} ?`}
            onCancel={close}
            onConfirm={handleDelete}
          />
      {/* {confirmDel && (
        <Modal
          heading={selectedNumber.phone_number}
          resId={selectedNumber.id}
          handleOpen={handleDelete}
        />
      )} */}
    </div>
    </>
  )
}

export default MyNumbers
