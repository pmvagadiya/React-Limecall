import React, { Component, createRef } from 'react'
import axios from 'axios'
import Dropzone from 'react-dropzone-uploader'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Accordion, Button, Grid } from 'semantic-ui-react'
import CommonButtons from '../../common/CommonButtons'
import CommonInput from '../../common/CommonInput'
import { CommonNotify } from '../../common/CommonNotify'
import CommonTextArea from '../../common/CommonTextArea'
import InputValidator from '../../common/validator'

const apiToken = localStorage.getItem('access_token')
toast.configure()

class AccountSettings extends Component {
  constructor(props) {
    super(props)
    this.dropzoneRef = createRef()
    this.state = {
      activeIndexs: [0, 1, 2],
      data: {
        companyName: '',
        companyDirectoryUrl: '',
        companyWebsiteUrl: '',
        companyDirectoryTitle: '',
        companyAddress: '',
        companyTwitterLink: '',
        companyFacebookLink: '',
        companyLinkedInLink: '',
        companyDescription: '',
        companyLogo: {},
        showDropBox : false
      },
      companyName: 'The knight company',
      errors: {},
      isCompanyData: false,
      isLoader: false
    }
    this.updateCompanyData = this.updateCompanyData.bind(this)
    this.handleCompnayValidation = this.handleCompnayValidation.bind(this)
  }

  componentDidMount() {
    this.props.loading(true)
    this.getCompanyData()
    this.updateCompanyData()
  }

  getCompanyData = () => {
    const url = `${process.env.REACT_APP_BASE_APP_URL}/api/v1/user/profile`
    this.setState({ isLoader: true })
    let head = {
      headers: {
        Authorization: 'Bearer ' + apiToken
      }
    }

    axios
      .get(url, head)
      .then(res => {
        const Data = {
          companyName: res.data.data.company.company_name || '-',
          companyDescription: res.data.data.company.company_description || '-',
          companyTwitterLink: res.data.data.company.company_twitter_link || '-',
          companyLinkedInLink:
            res.data.data.company.company_linkedin_link || '-',
          companyDirectoryUrl:
            res.data.data.company.company_directory_url || '-',
          companyAddress: res.data.data.company.company_address || '-',
          companyFacebookLink:
            res.data.data.company.company_facebook_link || '-',
          companyLogo: res.data.data.company.company_logo,
          companyDirectoryTitle:
            res.data.data.company.company_directory_title || '-',
          companyWebsiteUrl: res.data.data.company.company_domain || '-'
        }
        this.props.loading(false)
        this.setState({
          isCompanyData : false,
          data: Data
        })
      })
      .catch(error => {
        toast.error('error')
        this.props.loading(false)
      })
  }

  /*--------------------- Handle Company Validation And API -----------------*/

  handleCompnayValidation = () => {
    let fields = this.state.data
    let errors = {}
    let formIsValid = true
    let checkIfNotEmptyArr = ['companyName']

    checkIfNotEmptyArr.forEach(item => {
      if (!InputValidator.checkIfNotEmpty(fields[item])) {
        formIsValid = false
        errors[item] = 'This is a required field'
      }
    })

    this.setState({ errors: errors })
    return formIsValid
  }

  updateCompanyData(e) {
    if (this.handleCompnayValidation()) {
      this.props.loading(true)
      e.preventDefault()
      const token = localStorage.getItem('access_token')
      const URL = `${process.env.REACT_APP_BASE_APP_URL}/api/v1/user/company-data`

      const form = new FormData()
      form.append('company_name', this.state.data.companyName)
      form.append('company_domain', this.state.data.companyWebsiteUrl)
      form.append('company_address', this.state.data.companyAddress)
      form.append('company_facebook_link', this.state.data.companyFacebookLink)
      form.append('company_description', this.state.data.companyDescription)
      form.append('company_directory_url', this.state.data.companyDirectoryUrl)
      form.append(
        'company_directory_title',
        this.state.data.companyDirectoryTitle
      )
      form.append('company_twitter_link', this.state.data.companyTwitterLink)
      form.append('company_linkedin_link', this.state.data.companyLinkedInLink)

      if (this.state.data?.companyLogo?.name) {
        form.append('company_logo', this.state.data.companyLogo)
      }
      const sappendettings = {
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

      return axios(sappendettings)
        .then(res => {
          if (res) {
            // this.getCompanyData()
            // this.props.loading(false)
            // const { data } = this.state
            // data.companyLogo = res.data.data.company_logo
              this.getCompanyData()
            toast.success('Copmany Data Updated Successfully')
            return res
          }
        })
        .catch(err => {
          this.props.loading(false)
          toast.error('Upload Company Logo must be Image!')
        })
    }
  }

  onChange = e => {
    const { name, value } = e.target
    const { data } = this.state

    if (!value) {
      this.setState({ isCompanyData: false })
    } else {
      this.setState({ isCompanyData: true })
    }
    data[name] = value

    this.setState({ data })
  }

  handleClick = (e, titleProps) => {
    const { index } = titleProps
    const { activeIndexs } = this.state
    const newIndex = activeIndexs
    const currentIndexPosition = activeIndexs.indexOf(index)

    if (currentIndexPosition > -1) {
      newIndex.splice(currentIndexPosition, 1)
    } else {
      newIndex.push(index)
    }

    this.setState({ activeIndexs: newIndex })
  }

  handleChangeStatus = ({ meta, file }, status) => {
    const { data } = this.state
    if (data) {
      this.setState({ isCompanyData: true })
    } else {
      this.setState({ isCompanyData: false })
    }
    if (status === 'removed') {
      data.companyLogo = ''
    } else {
      data.companyLogo = file
    }
    this.setState({
      data
    })
  }

  onRemoveLogo = () => {
    const myObj = document.getElementsByClassName('dzu-previewButton')[0]
    myObj && myObj.click()

    if (this.state.isCompanyData) {    
      this.setState({
        ...this.state,
        isCompanyData: false
      })
    } else {
      this.props.loading(true)
      const token = localStorage.getItem('access_token')
      let head = {
        headers: {
          Authorization: 'Bearer ' + token
        }
      }

      const URL = `${process.env.REACT_APP_BASE_APP_URL}/api/v1/user/remove-company-logo`
      const pustData = {
        time_zone: 'GMT'
      }

      axios
        .post(URL, pustData, head)
        .then(res => {
          this.props.loading(false)
          this.setState({
            ...this.state,
            isCompanyData: false
          })
          this.getCompanyData()
          CommonNotify('Logo removed successfully', 'success')
        })
        .catch(err => {
          this.props.loading(false)        
          CommonNotify("Can't remove logo")
        })
    }
    // const { data } = this.state
    // data.companyLogo = ''
    // this.setState({
    //   ...data
    // })
  }

  render() {
    const { activeIndexs, data, isCompanyData } = this.state
    return (
      <>
        <div className="account-settings">
          <Accordion className="holder-account">
            <div className="accordion-holder company-information company_main">
              <Accordion.Title
                active={activeIndexs.includes(0)}
                index={0}
                onClick={this.handleClick}
                style={{ marginBottom: '30px' }}
              >
                <p className="bold-text accordion-title">Company Information</p>
                <p className="subtext accordion-desc">
                  Enter your company’s information to help visitors recognize and connect with your brand.
                </p>
              </Accordion.Title>
              <Accordion.Content active={activeIndexs.includes(0)}>
                <form method="" action="">
                  <div className="holder-input">
                    <Grid columns="equal">
                      <CommonInput
                        onChange={this.onChange}
                        name="companyName"
                        title="Name"
                        required={true}
                        background="gray"
                        value={data.companyName}
                      />

                      <CommonInput
                        onChange={this.onChange}
                        name="companyWebsiteUrl"
                        title="Website URL"
                        required={true}
                        background="gray"
                        value={data.companyWebsiteUrl}
                      />
                    </Grid>
                    {/* <CommonInput
                      onChange={this.onChange}
                      name="companyDirectoryUrl"
                      title="Directory URL"
                      label={{ content: '.lime.me' }}
                      labelPosition="right"
                      // required={true}
                      background="gray"
                      value={data.companyDirectoryUrl}
                    /> */}

                    <Grid columns="equal">
                      {/* <CommonInput
                        onChange={this.onChange}
                        name="companyDirectoryTitle"
                        title="Directory title"
                        // required={true}
                        background="gray"
                        value={data.companyDirectoryTitle}
                      /> */}
                    </Grid>
                    <Grid columns="equal">
                      {/* <CommonInput
                        onChange={this.onChange}
                        name="companyAddress"
                        title="Address"
                        required={true}
                        background="gray"
                        value={this.state.data.companyAddress}
                      /> */}
                      <CommonInput
                        onChange={this.onChange}
                        name="companyTwitterLink"
                        title="Twitter"
                        required={true}
                        background="gray"
                        value={data.companyTwitterLink}
                      />
                      <CommonInput
                        onChange={this.onChange}
                        name="companyFacebookLink"
                        title="Facebook"
                        required={true}
                        background="gray"
                        value={data.companyFacebookLink}
                      />
                    </Grid>

                    <Grid columns="equal">
                      <CommonInput
                        onChange={this.onChange}
                        name="companyLinkedInLink"
                        title="LinkedIn"
                        required={true}
                        background="gray"
                        value={data.companyLinkedInLink}
                      />
                    </Grid>
                    {/* <Grid className="Industry-dropdown">
                      <label>{industryData.headerTitle}</label>
                      <CommonSelect3
                        name={industryData.name}
                        placeholder="Select Option"
                        options={industryData.modalContent}
                        title={'dd'}
                        defaultValue={21}
                        // onChange={onChangeSelectFilter}
                      />
                    </Grid> */}
                    <div className="text-area">
                      <CommonTextArea
                        name="companyDescription"
                        title="Description"
                        required={true}
                        background="gray"
                        value={data.companyDescription}
                        onChange={this.onChange}
                      />
                    </div>
                    <div className="dropZone">
                      <div style={{width: '44%'}}>
                      {this.state.data.companyLogo ? (
                        <Dropzone
                          canCancel={true}
                          canRemove={true}
                          inputContent={
                            <img src={this.state.data.companyLogo} />
                          }
                          onChangeStatus={this.handleChangeStatus}
                          accept="image/*"
                          ref={this.dropzoneRef}
                        />
                      ) : (
                        <Dropzone
                          canCancel={true}
                          canRemove={true}
                          onChangeStatus={this.handleChangeStatus}
                          accept="image/*"
                          ref={this.dropzoneRef}
                        />
                      )}
                      </div>
                      {/* <Dropzone
                        canCancel={true}
                        canRemove={true}
                        inputContent={<img src={this.state.data.companyLogo} />}
                        onChangeStatus={this.handleChangeStatus}
                        accept="image/*"
                        ref={this.dropzoneRef}
                      /> */}
                      <div className="dropZone-content">
                        <h3>Upload your logo…</h3>
                        <div>Your logo should be less than 500px x 300px</div>
                        <div>
                          Logo should be either a .jpg, png, or .gif to work
                          properly in emails
                        </div>
                        {this.state.data.companyLogo && (
                          <Button onClick={this.onRemoveLogo} type="button">
                            Clear logo
                          </Button>
                        )}
                        {/* <CommonButtons
                          background="grey"
                          type="reset"
                          content="Clear Logo"
                          onClick={this.onClearDropzone}
                        ></CommonButtons> */}
                      </div>
                    </div>
                  </div>
                  {isCompanyData && (
                    <>
                      <CommonButtons
                        onClick={this.updateCompanyData}
                        type="submit"
                        content="Save"
                        background="blue"
                      />
                      <CommonButtons
                        //onClick={}
                        type="reset"
                        content="Cancel"
                        background="grey"
                      />
                    </>
                  )}
                </form>
              </Accordion.Content>
            </div>
          </Accordion>
        </div>
      </>
    )
  }
}

export default AccountSettings
