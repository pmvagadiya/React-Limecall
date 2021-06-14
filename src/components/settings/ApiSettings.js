import React, { Component } from 'react'
import CommonInput from '../../common/CommonInput'
import { Icon, Label, Menu, Table } from 'semantic-ui-react'

import key from '../../assets/images/copy.png'

import CommonButton from '../../common/CommonButtons'
import circlePlus from '../../assets/images/cicle-plus.png'
import deleteIcon from '../../assets/images/delete-icon.png'

class ApiSettings extends Component {
  state = {
    activeIndexes: [0],
    setOfficeHour2: {
      addOfficeHour2: '',
      link: 'Link',
      officeHourFrom: '',
      officeHourTo: ''
    },
    addOfficeHour2: [1],
    api_key: localStorage.getItem('api_key')
  }

  onClickAddOfficeHour2 = () => {
    const { setOfficeHour2 } = this.state
    const link = this.state.setOfficeHour2.link
    const officeHourFrom = this.state.setOfficeHour2.officeHourFrom
    const officeHourTo = this.state.setOfficeHour2.officeHourTo
    const addOfficeHour2 = 'addOfficeHour2'
    const addOfficeHourItem2 = link + ' ' + officeHourFrom + ' ' + officeHourTo

    setOfficeHour2[addOfficeHour2] = addOfficeHourItem2

    this.setState({ setOfficeHour2 })

    this.cloneSetHoursWrapper2()
  }

  onClickRemoveOfficeHours2 = () => {
    const currentDiv2 = this.state.addOfficeHour2
    currentDiv2.pop()
    this.setState({ addOfficeHour2: currentDiv2 })
  }

  cloneSetHoursWrapper2 = () => {
    const currentDiv2 = this.state.addOfficeHour2
    currentDiv2.push(1)
    this.setState({ addOfficeHour2: currentDiv2 })
  }

  render() {
    // const { activeIndexes } = this.state
    return (
      <div className="api-wrapper api_wrapper_main">
        <div className="api-holder">
          <p>Seamlessly integrate with LimeCall using our powerful APIs</p>
          <h3 className="call-title">
            API tokens are personal and can be used to access information on all
            your websites in Limecall, so treat them like passwords. You can
            find more information and the documentation on our
             <a href = 'https://help.limecall.com/en/articles/4103760-api' 
              style={{textDecoration: 'none', marginLeft: '5px'}}>
               API documentation.
              </a>
          </h3>
        </div>
        {/* <div className="key-wrapper">
					<p className="subtext">Public Key</p>
					<CommonInput
						name="key"
						type="text"
						value="bVC6mpRaNFVqhOx8C9W6AOuwgaLrZa94T2dMGNqw"
					/>
					<img src={key} alt="copy" />
				</div> */}
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Token</Table.HeaderCell>
              <Table.HeaderCell>Status</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {/* {this.state.addOfficeHour2.map((data, index) => { */}
            {/* return ( */}
            <Table.Row>
              <Table.Cell>
                <CommonInput
                  name="key"
                  type="text"
                  defaultValue={this.state.api_key}
                />
              </Table.Cell>
              <Table.Cell>
                <div className="api-add-item">Active</div>
              </Table.Cell>
            </Table.Row>
            {/* ) */}
            {/* // })} */}
          </Table.Body>
        </Table>
        <div className="filter-add">
          {/* <CommonButton
						onClick={this.onClickAddOfficeHour2}
						btnClass="btn-hours"
						image={circlePlus}
					/> */}
        </div>
      </div>
    )
  }
}

export default ApiSettings
