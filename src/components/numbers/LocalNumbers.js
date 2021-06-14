import React, { Component } from 'react'

import { Modal, Table, Dimmer, Loader } from 'semantic-ui-react'

import CommonButtons from '../../common/CommonButtons'
import CommonSelect from '../../common/CommonSelectCountry'
import CommonSelect2 from '../../common/CommonSelectRegion'
import CommonTable from '../../common/CommonTableNo'
import { CommonNotify } from '../../common/CommonNotify'
import { Redirect } from 'react-router-dom'

import CountryList from '../../helpers/CountryList'

import axios from 'axios'

const apiToken = localStorage.getItem('access_token')

const table = {
  type: '6',
  header: [
    { headerTitle: 'Phone Number' },
    { headerTitle: 'SMS' },
    { headerTitle: 'Voice' },
    { headerTitle: 'Price' },
    { headerTitle: 'Action' }
  ],
  tableContentData: []
}

class LocalNumbers extends Component {
  state = {
    isLoading: true,
    isCancelModalOpen: false,
    redirect: false,
    selectedCountry: '',
    selectedRegion: '',
    regionList: [],
    haveRegion: false,
    tableData: table,
    countryListt : []
  }

  componentDidMount() {
    this.setState({tableData : {
      type: '6',
      header: [
        { headerTitle: 'Phone Number' },
        { headerTitle: 'SMS' },
        { headerTitle: 'Voice' },
        { headerTitle: 'Price' },
        { headerTitle: 'Action' }
      ],
      tableContentData: []
    }})
    this.props.loading(false)
    this.fetchCountries();
  }

  fetchCountries = () => {
    // const apiToken = sessionStorage.getItem('access_token')
    const apiToken = localStorage.getItem('access_token')
    let head = {
      headers: {
        Authorization: 'Bearer ' + apiToken
      }
    }
    const url = `${process.env.REACT_APP_BASE_APP_URL}/api/v1/numbers/countries`
    axios
      .get(url, head)
      .then(res => {
          var cArray = []
          console.log('Country List :::', res.data.data)
          for (let value of Object.values(res.data.data)) {
            var temp = {
              name : value,
              regions : []
            }
            cArray.push(temp)
          }
          this.setState({countryListt : cArray, isLoading: false})
      })
      .catch(error => {})
  }

  handleModal = () => {
    let { isCancelModalOpen } = this.state
    isCancelModalOpen = !isCancelModalOpen
    this.setState({ isCancelModalOpen })
  }
  handleYesModal = () => {
    this.setState({ isCancelModalOpen: false, redirect: true })
  }
  handleCancelModal = () => {
    this.setState({ isCancelModalOpen: false })
  }
  handleCloseCancelModal = () => this.setState({ isCancelModalOpen: false })

  getLocalNo = () => {
    if (this.state.selectedCountry === '') {
      CommonNotify('Please Select Country', 'warning')
      return
    }

    // this.props.loading(true)
    this.setState({isLoading : true})

    let head = {
      headers: {
        Authorization: 'Bearer ' + apiToken
      }
    }

    const params = `key=null&type=local&country=${this.state.selectedCountry}&region=${this.state.selectedRegion}&fax=false&mms=false&voice=false&sms=false`
    
    const url = `${process.env.REACT_APP_BASE_APP_URL}/api/v1/user/get-available-phone-numbers?${params}`
     
    axios
      .get(url, head)
      .then(res => {
        this.setState({isLoading : false})

        if(res.data.errors !== [])
        {
          CommonNotify(res.data.errors[0],'warning')
        }

        if (res.data.data) {

          let tableData = this.state.tableData 
          tableData.tableContentData = []
          let rows = []
          const amount = res.data.data.price

          if (!res.data.data.phoneNumbers.length) {
            CommonNotify('Number Not Avilable', 'warning')
            return
          }
          

          res.data.data.phoneNumbers.map(row => {
            let obj = {}
            obj.phone = row
            obj.price = amount
            rows.push(obj)
          })
          tableData.tableContentData = rows
          this.setState({ tableData })
        }
      })
      .catch(error => {
        this.setState({isLoading : false})
      })
  }

  changeCountry = (p1, p2) => {
    const val = p2.value
    if (val == '') {
      return
    }
    let reg = this.getRegion(val)
    this.setState({ selectedCountry: val })
    if (reg.length) {
      this.setState({ haveRegion: true, regionList: reg })
    } else {
      this.setState({ haveRegion: false, regionList: [], selectedRegion: '' })
    }
  }

  changeRegion = (p1, p2) => {
    const val = p2.value
    if (val == '') {
      return
    }
    this.setState({ selectedRegion: val })
  }

  getRegion = country => {
    let selectedReg
    CountryList.map((row, index) => {
      if (row.name == country) {
        selectedReg = row.regions
        return
      }
    })
    return selectedReg
  }

  buyNo = data => {

  this.setState({isLoading : true})
    data.type = "local";
    let head = {
      headers: {
        Authorization: 'Bearer ' + apiToken
      }
    }

    if (data.name.trim() === '') {
      this.setState({isLoading : false})
      CommonNotify('Please Enter a Friendly Name For the Number', 'warning')
      return
    }

    const url = `${process.env.REACT_APP_BASE_APP_URL}/api/v1/user/buy-phone-number`

    axios
      .post(url, data, head)
      .then(res => {

      this.setState({isLoading : false})
      if (res.data.data.sid) {
          CommonNotify(res.data.message[0], 'success')
        }
      })
      .catch(error => {
        this.setState({isLoading : false})
        CommonNotify('Can`t Add Number', 'error')
      })
  }

  render() {
    const { redirect } = this.state

    if (redirect) {
      return <Redirect to="/setCampaign?campaignId=2" />
    }
    return (
      <>
            <Dimmer active={this.state.isLoading}>
        <Loader />
      </Dimmer>
      <div>
        <div className="local-number-wrap">
          <div className="local-number-header">
            <CommonSelect
              onChange={this.changeCountry}
              name="config"
              className="popup-font-select"
              placeholder="Select Country"
              options={this.state.countryListt}
            />
            <CommonSelect2
              onChange={this.changeRegion}
              name="config"
              className="popup-font-select"
              placeholder="Select Region"
              options={this.state.regionList}
              disabled={this.state.haveRegion == false ? true : false}
            />
            <CommonButtons
              type="button"
              content="Search"
              background="blue"
              onClick={this.getLocalNo}
              style={{ marginLeft: '20px' }}
            />
          </div>
          <CommonTable
            handleBuy={this.buyNo}
            style={{ marginTop: '30px' }}
            dataTable={this.state.tableData}
          />
        </div>
      </div>
      </>
    )
  }
}

export default LocalNumbers