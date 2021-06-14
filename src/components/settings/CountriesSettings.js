import React, { Component } from 'react'

import CommonButtons from '../../common/CommonButtons'
import NodeCheckbox from '../../common/NodeCheckbox'
import NodeToggle from '../../common/NodeToggle'

import { CommonNotify } from '../../common/CommonNotify'

import axios from 'axios'
import { tr } from 'date-fns/locale'

const apiToken = localStorage.getItem('access_token')

const callToggle = [
  {
    callTitle: 'Only show permitted countries',
    callDesc:
      'The widget country dropdown selector will only show countries in the permitted list',
    callId: 'toogleAutomated',
    callref: 'permittedCountries'
  }
]

const countryId = [
  {
    id: 63,
    name: 'Egypt'
  },
  {
    id: 98,
    name: 'India'
  },
  {
    id: 222,
    name: 'United States'
  }
]

class CountriesSettings extends Component {
  state = {
    data: {
      inputDefaultCountry: '',
      nodeCheckBoxCountries: [],
      permittedCountries: false
    },
    allowedList: [],
    excludeList: [],
    allCountry: [],
    excludeCountry: [],
    allCountries: [],
    permitted: false,
    isPermitted: false
  }

  componentWillMount = () => {
    this.fetchCountrySetting()
  }

  getCountryId = country => {
    let id = 0
    countryId.map((row, index) => {
      if (row.name == country) id = row.id
      return
    })
    return id
  }

  getAllCountriesId = country => {
    let id = 0
    this.state.allCountries.map((row, index) => {
      if (row.label == country) {
        return (id = row.id)
      }
    })
    return id
  }

  setCountry = data => {

    var allCountry = []
    var allowedList = []
    var excludeList = []

    let temp_all = data.allowed_countries
    let ex_country = data.excluded_countries

    ex_country.map((row, index, rows) => {
      let tempObj = {
        label: row,
        key: row,
        checked: false
      }
      excludeList.push(tempObj)
    })
    
    allCountry = [...allowedList, ...excludeList]
    this.setState({ allowedList : temp_all ,excludeList },(
      () => this.getAllCountriesApi()
    ))
  }

  setAllCountries = data => {
    var allowed = this.state.allowedList;
    var allCountries = []
    var tempObj;

    data.map((row, index, rows) => {

      if(row.is_supported === "1")
      {

          var n = allowed.includes(row.name);

         // var obj = allowed.find(o => o.label === row.name);

          tempObj = {
            label: row.name,
            key: row.name,
            id: row.id,
            checked: n
          }
          allCountries.push(tempObj)

    }

    })
    this.setState({ allCountries, allCountry : allCountries })
  }

  togglePermitted = () => {
    let { permitted } = { ...this.state }
    permitted = !permitted

    if (permitted) {
      this.setState({ isPermitted: true })
    } else {
      this.setState({ isPermitted: false })
    }
    this.setState({ permitted: permitted })
  }

  onChangeInput = e => {
    const { name, value } = e.target
    const { data } = this.state

    data[name] = value

    this.setState({ data })
  }

  fetchCountrySetting = async () => {
    const w_id = await localStorage.getItem('widget_id');
    this.props.loading(true)
    // console.log(this.props, 'this.props')
    let head = {
      headers: {
        Authorization: 'Bearer ' + apiToken
      }
    }
    const url = `${process.env.REACT_APP_BASE_APP_URL}/api/v1/widget/get-widget-countries?widget_id=${w_id}`

    axios
      .get(url, head)
      .then(res => {
        this.props.loading(false)
        if (res.data.data) {
          this.setCountry(res.data.data)
        }
      })
      .catch(error => {
        this.props.loading(false)
        CommonNotify('Cant Fetch Country List')
      })
  }

  getAllCountriesApi = async () => {   
    const apiToken = localStorage.getItem('access_token')
    const allUrl = `${process.env.REACT_APP_BASE_APP_URL}/api/v1/widget/get-countries`

    let head = {
      headers: {
        Authorization: 'Bearer ' + apiToken
      }
    }

    axios
      .get(allUrl, head)
      .then(res => {
        this.props.loading(false)
        if (res.data.data) {
          this.setAllCountries(res.data.data)
        }
      })
      .catch(error => {
        this.props.loading(false)
        CommonNotify('Cant Fetch Country Listt')
      })
  }

  onChangeNodeCheckbox = e => {
    const name = e.target.parentNode.parentNode.parentNode.getAttribute('name')
    const value = e.target.innerText
    let currentIndex = -1

    let allCountry = [...this.state.allCountry]
    allCountry.map((row, index, rows) => {
      if (row.key == value) {
        currentIndex = index
        return
      }
    })

    allCountry[currentIndex].checked = !allCountry[currentIndex].checked
  
    this.setState({ allCountry })
  }

  onChangeNodeCheckboxAllCountries = e => {
    const name = e.target.parentNode.parentNode.parentNode.getAttribute('name')
    const value = e.target.innerText
    let currentIndex = -1

    let allCountry = [...this.state.allCountries]
    allCountry.map((row, index, rows) => {
      if (row.key == value) {
        currentIndex = index
        return
      }
    })

    allCountry[currentIndex].checked = !allCountry[currentIndex].checked

    this.setState({ allCountries: allCountry })
  }

  removeArElement = (arr, item) => {
    var what, ax
    while ((ax = arr.indexOf(item)) !== -1) {
      arr.splice(ax, 1)
    }
    return arr
  }

  onSave = e => {
    let allCountries = [...this.state.allCountries]
    let allCountry = [...this.state.allCountry]

    const unCheckAllCountry = allCountry.filter(item => !item.checked)
    const getAllCountryIds = allCountries
      .filter(value =>
        unCheckAllCountry.map(item => item.key).includes(value.key)
      )
      .map(item => item.id)
    const removeDuplicates = allCountries.filter(
      value => !allCountry.map(item => item.key).includes(value.key)
    )
    const unCheckAllCountries = removeDuplicates
      .filter(item => !item.checked)
      .map(item => item.id)

    this.setState(
      { excludeCountry: [...unCheckAllCountries, ...getAllCountryIds] },
      () => {
        this.saveSetting()
      }
    )
  }

  saveSetting = () => {
    const apiToken = localStorage.getItem('access_token')
    this.props.loading(true)
    let head = {
      headers: {
        Authorization: 'Bearer ' + apiToken
      }
    }

    const data = {
      excludedCountries: this.state.excludeCountry,
      widget_id: this.props.widget.id
    }
   
    const url = `${process.env.REACT_APP_BASE_APP_URL}/api/v1/widget/post-exclude-countries`
    axios
      .post(url, data, head)
      .then(res => {
        this.props.loading(false)
        if (res.data.message[0] == 'Successfully') {
          CommonNotify('Settings are updated', 'success')
          this.fetchCountrySetting()
        }
      })
      .catch(error => {
        this.props.loading(false)
        CommonNotify('Cant save settings')
      })
  }

  handleDataRef = (DataRef, DataState) => {
    let currentData = this.state.data
    currentData[DataRef] = DataState
    this.setState({ data: currentData })
  }

  render() {
    const { allCountries, allCountry } = this.state
    // const removeDuplicates = allCountries.filter(
    //   value => !allCountry.map(item => item.key).includes(value.key)
    // )
    
    return (
      <div className="countries-settings">
        <form method="" action="">
          <div className="holder-checkboxes">
            <div className="holder-other-countries">
              <p className="item-title">Countries Available</p>
              <p className="subtext item-desc">
                { "Only allow calls to and from these countries"}
              </p>
            </div>
            <div className="checkboxes">
              <NodeCheckbox
                onChange={this.onChangeNodeCheckbox}
                name="nodeCheckBoxCountries"
                checkboxlist={this.state.allCountry}
              />
            </div>
            {/* {removeDuplicates.length ? (
              <>
                <div className="holder-other-countries margin-top">
                  <p className="blue-text">
                    <a
                      href="javascript:void(0)"
                      onClick={e =>
                        alert(
                          'To request additional countries to be enabled, contact our support team.'
                        )
                      }
                    >
                      Other countries
                    </a>
                  </p>
                </div>
                <div className="checkboxes margin-top">
                  <NodeCheckbox
                    onChange={this.onChangeNodeCheckboxAllCountries}
                    name="nodeCheckBoxAllCountries"
                    checkboxlist={removeDuplicates}
                  />
                </div>
              </>
            ) : null} */}
          </div>

          <CommonButtons
            onClick={this.onSave}
            type="button"
            content="Save"
            background="blue"
          />
          <CommonButtons
            type="reset"
            onClick={this.componentWillMount}
            content="Cancel"
            background="grey"
          />
        </form>
      </div>
    )
  }
}

export default CountriesSettings
