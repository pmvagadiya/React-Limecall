import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import axios from 'axios'

function Installation() {
  const [scriptId, setScriptId] = useState(localStorage.getItem('data-api-key'))
  const [companyLogo, setCompanyLogo] = useState(null)

  useEffect(() => {
    setScriptId(localStorage.getItem('data-api-key'))
    loadWidgetsSetting()
  }, [])

  const loadWidgetsSetting = () => {
    const url = `${process.env.REACT_APP_BASE_APP_URL}/api/v1/user/profile`

    let head = {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('access_token')
      }
    }
    axios
      .get(url, head)
      .then(res => {
        setCompanyLogo(res.data.data.company.company_logo)
      })
      .catch(error => {
        console.error(error)
      })
  }

  return (
    <div className="installation_main_wrapper">
      <Helmet>
        <script
          data-api-url={process.env.REACT_APP_BASE_APP_URL}
          data-api-key={scriptId}
          src="https://dev-widget.limecall.com/widget.js"
        ></script>
      </Helmet>
      <div class="flex-center position-ref full-height">
        <div class="content">
          <div class="title m-b-md">
            <img
              src={`${companyLogo}`}
              style={{ width: '150px !important;' }}
              alt="company logo"
            />{' '}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Installation
