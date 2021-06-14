import React, { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet'

const SharableLink = () => {
  const [scriptId, setScriptId] = useState(localStorage.getItem('data-api-key'))
  useEffect(() => {
    setScriptId(localStorage.getItem('data-api-key'))
  }, [])
  return (
    <Helmet>
      <script
        data-api-url={process.env.REACT_APP_BASE_APP_URL}
        data-api-key={scriptId}
        data-widget-type="shareable"
        src="https://dev-widget.limecall.com/widget.js"
      ></script>
    </Helmet>
  )
}

export default SharableLink
