import React, { useState, useEffect } from 'react'
import { Table } from 'semantic-ui-react'

import CommonInput from '../../common/CommonInput'
import CommonButton from '../../common/CommonButtons'

import { CommonNotify } from '../../common/CommonNotify'

import iconStyle from '../../assets/images/Dashboard 2-01.png'
import deleteIcon from '../../assets/images/delete-icon.png'

import config from '../../config/constant.json'


import { useAlert } from 'react-alert'

import axios from 'axios'

export const WidgetAvailableDomainsTitle = () => (
  <div className="accordion-widget-holder">
    <div className="accordion-image-holder">
      <img src={iconStyle} alt="logo" />
    </div>{' '}
    <div className="accordion-title-holder">
      <h2 className="accordion-title"> Security </h2>{' '}
      <p className="accordion-description"> Add your business domain name </p>{' '}
    </div>{' '}
  </div>
)

export const WidgetAvailableDomainsContent = ({
  widget,
  onChangeState,
  onEditState,
  loading
}) => {
  const [domains, setDomains] = useState([])
  const [domain, setDomain] = useState()
  const domainRegex = config.domainRegex
  const [domainError, setDomainError] = useState('')
  const [isDisabled, setIsDisabled] = useState(true)
  const apiToken = localStorage.getItem('access_token')
  const [isButton, setIsButton] = useState(false)
  const alert = useAlert()

  useEffect(() => {
    if (widget.id == '') {
      return
    }

    fetchDomains()
  }, [widget])

  const fetchDomains = () => {
    loading(true)
    let head = {
      headers: {
        Authorization: 'Bearer ' + apiToken
      }
    }
    const url = `${process.env.REACT_APP_BASE_APP_URL}/api/v1/widget/widget/domains/${widget.id}`

    axios
      .get(url, head)
      .then(res => {
        loading(false)
        if (res.data.data) {
          setDomains(res.data.data)
        }
      })
      .catch(error => {
        loading(false)
        CommonNotify('Cant Fetch Domains', 'error')       
      })
  }

  const onChangeInput = e => {
    const { value } = e.target
    if(value){
      setIsButton(true)
    } else {
      setIsButton(false)
    }

    if (new RegExp(domainRegex).test(value)) {
      setDomainError('')
      setIsDisabled(false)
    } else {
      setDomainError('*Please enter valid domain')
      setIsDisabled(true)
    }
    setDomain(value)
  }

  const onAdd = e => {
    if (domains.includes(domain)) {
      setDomainError('*Domain already used')
      setIsDisabled(true)
      return
    }
    loading(true)

    let head = {
      headers: {
        Authorization: 'Bearer ' + apiToken
      }
    }
    const url = `${process.env.REACT_APP_BASE_APP_URL}/api/v1/widget/set-domains`

    axios
      .post(url, { domain: domain, widget_id: widget.id }, head)
      .then(res => {
        loading(false)

        if (!res.data.errors.length) {
          CommonNotify('Domain Added', 'success')
          setDomain('')
          fetchDomains()
        } else {
          CommonNotify('Cant Add Domain', 'error')
        }
      })
      .catch(error => {
        loading(false)        
      })
  }

  const onRemoveDomains = item => {
    loading(true)
    let head = {
      headers: {
        Authorization: 'Bearer ' + apiToken
      }
    }
    const url = `${process.env.REACT_APP_BASE_APP_URL}/api/v1/widget/delete-domain`

    axios
      .delete(url, {
        data: { domain_id: item },
        headers: {
          Authorization: 'Bearer ' + apiToken
        }
      })
      .then(res => {
        loading(false)
        if (!res.data.errors.length) {
          CommonNotify('Domain Delete successfully', 'success')
          fetchDomains()
        } else {
          CommonNotify('Cant Delete Domain', 'error')
        }
      })
      .catch(error => {
        loading(false)
        CommonNotify('Cant Delete Domain', 'error')        
      })
  }

  return (
    <div className="style-widget-wrapper">
      <div className="available-domains-wrapper">
        <CommonInput
          onChange={onChangeInput}
          value={domain}
          title="Domain Name"
          placeholder="Ex: Limecall.com"
          name="widgetEmail"
          type="text"
        />
        {
          isButton && (
            <>
              <CommonButton
                onClick={onAdd}
                content="add"
                background="blue"
                btnClass="btn-upload"
                disabled={isDisabled}
              />{' '}
            </>
          )
        }
      </div>{' '}
      <div className="available-domains-wrapper">
        {' '}
        {domainError && (
          <span
            style={{
              color: 'red'
            }}
          >
            {' '}
            {domainError}{' '}
          </span>
        )}{' '}
      </div>{' '}
      <div className="available-domains-listing">
        <Table>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell> ID </Table.HeaderCell>{' '}
              <Table.HeaderCell> Domains </Table.HeaderCell>{' '}
              <Table.HeaderCell> Actions </Table.HeaderCell>{' '}
            </Table.Row>{' '}
          </Table.Header>{' '}
          {domains.map((item, i) => {
            return (
              <Table.Body key={i}>
                <Table.Row>
                  <Table.Cell> {i + 1} </Table.Cell>{' '}
                  <Table.Cell> {item.domain} </Table.Cell>{' '}
                  <Table.Cell
                    className="delete-icon"
                    onClick={() => onRemoveDomains(item.id)}
                  >
                    <img src={deleteIcon} alt="placeholder" />
                  </Table.Cell>{' '}
                </Table.Row>{' '}
              </Table.Body>
            )
          })}{' '}
        </Table>{' '}
      </div>{' '}
    </div>
  )
}
