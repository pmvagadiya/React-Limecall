import React, { useMemo, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Table, Popup, Dropdown, Image, Tab } from 'semantic-ui-react'
import MissedCall from '../../../assets/images/orangeCall.png'
import PickedCall from '../../../assets/images/greenCall.png'
import cutCall from '../../../assets/images/callRed.jpeg'
import moment from 'moment'
import Select from 'react-dropdown-select'
import {
  onCallRequest,
  onChangeInterseted,
  onLeadScoreHandler,
  onChangeOwner,
  setLeadStage
} from '../../../config/leadAPI'
import SendMessageModal from '../../../common/SendMessageModal'
import DummyProfileImage from '../../../assets/images/dummy_profile.webp'
import emailicon from '../../../assets/images/mail_icons.png'
import smallcall from '../../../assets/images/small_call.png'
import smallEmail from '../../../assets/images/small_email.png'
import CommonCheckbox from '../../../common/CommonCheckbox'
import callicons from '../../../assets/images/call_icons.png'

const LeadTableContent = ({
  index,
  data,
  onClickMarkCheckbox,
  leadType,
  dropDownData,
  leadOwner,
  leadScore,
  rightPane,
  handleRightPaneOpen
}) => {
  const history = useHistory()
  const [open, setOpen] = React.useState(false)
  const [stage, setStage] = useState([])
  const [loading, setLoading] = useState(false)

  const handelClick = () => {
    history.push(`/calldashboard?callId=${data.id.substring(1)}`)
  }

  const isModalClose = () => {
    setOpen(false)
  }

  const isModalOpen = () => {
    setOpen(true)
  }

  const data_popup = () => {
    return (
      <>
        <div className="dispaly_profile1">
          <div className="profile_boxes1">
            <div className="profile_left1">
              <div className="profile_images1">
                <img src={DummyProfileImage} />
              </div>
              <div className="profile_detail1">
                <p style={{ marginTop: 7 }}>
                  {data.customerName !== null && data.customerName !== 'null'
                    ? data.customerName
                    : ''}
                </p>
              </div>
            </div>
          </div>
          <div className="dispaly_profile_detail1">
            {data.phone_number &&
            data.phone_number !== '' &&
            data.phone_number !== null ? (
              <div className="profile_content1">
                <div className="call_icon1">
                  <img src={smallcall} />
                </div>
                <pre>
                  Contact : <span>{data.phone_number}</span>
                </pre>
              </div>
            ) : (
              ' '
            )}
            {data.email && data.email !== 'null' ? (
              <div className="profile_content1">
                <div className="call_icon1">
                  <img src={smallEmail} />
                </div>
                <pre>
                  Email : <span>{data.email}</span>
                </pre>
              </div>
            ) : (
              ' '
            )}
            {data.type === 'LIVE_CALL' ? (
              <div className="display_button1">
                <div className="row">
                  <a
                    className="call_set1 col"
                    onClick={() => onCallRequest(data.id)}
                  >
                    <img src={callicons} />
                  </a>
                  <a className="mail_set1 col" onClick={() => setOpen(true)}>
                    <img src={emailicon} />
                  </a>
                </div>
              </div>
            ) : (
              ' '
            )}
          </div>
        </div>
      </>
    )
  }
  const options = [
    { key: 1, text: 'Good Fit', value: 1 },
    { key: 2, text: 'Maybe', value: 2 },
    { key: 3, text: 'Bad Fit', value: 3 }
  ]

  const leadScoreOption = [
    { key: 1, text: 'Bad Fit', value: 'Bad fit' },
    { key: 2, text: 'Qualified', value: 'Qualified' }
  ]
  const ownerDropdown = [
    {
      key: 1,
      text: 'Assigned',
      value: 1
    },
    {
      key: 2,
      text: 'Qualified',
      value: 2
    },
    {
      key: 3,
      text: 'Negotiation',
      value: 3
    },
    {
      key: 4,
      text: 'Won',
      value: 4
    },
    {
      key: 5,
      text: 'Lost',
      value: 5
    }
  ]
  const onStageSelected = data => {
    setLeadStage(466, stage, setLoading)
  }

  const onStageValueChanged = data => {
    // const postData = []
    // data.map(obj => {
    //   postData.push(obj.value)
    // })
    // setStage(postData)
  }
  const leadId = data?.id?.replace('#', '')
  return (
    <>
      <Table.Row className="table-content-row">
        <Table.Cell data-key={index}>
          <CommonCheckbox
            onChange={onClickMarkCheckbox}
            name="isChecked"
            checked={data.isChecked}
          />
        </Table.Cell>
        <Table.Cell onClick={handelClick}>{data.id}</Table.Cell>
        <Table.Cell onClick={ () => handleRightPaneOpen(data.id.substring(1)) }>
          {moment
            .utc(data.time)
            .local()
            .startOf('seconds')
            .fromNow()}
        </Table.Cell>
        <Table.Cell onClick={ () => handleRightPaneOpen(data.id.substring(1)) }>
          {!data.isHoverDisplay ? (
            <Popup
              className="profile_popup"
              content={data_popup}
              size="large"
              position="bottom left"
              flowing
              hoverable
              trigger={<p>{data.contact}</p>}
            />
          ) : (
            <p>{data.contact}</p>
          )}
        </Table.Cell>
        <Table.Cell onClick={ () => handleRightPaneOpen(data.id.substring(1))}>
          <div className={data.source === 'Webpage' ? 'webpage' : 'facebook'}>
            {data.source === null ? 'Unknown' : data.source}
          </div>
        </Table.Cell>
        <Table.Cell onClick={ () => handleRightPaneOpen(data.id.substring(1)) }>
          <div>
            {/* <Dropdown
              placeholder="Stages"
              multiple
              options={leadStage}
              onChange={onStageSelected}
              loading={loading}

              // onClose={onStageSelected}
            /> */}
            {/* <Select
              options={ownerDropdown}
              labelField="text"
              valueField="value"
              create
              loading={loading}
              defaultValue={data.defaultStage}
              onDropdownClose={values => onStageSelected(values)}
              onChange={values => onStageValueChanged(values)}
            /> */}
            <Dropdown
              options={ownerDropdown}
              placeholder="Select"
              basic
              defaultValue={data.defaultStage}
              onChange={values => onStageValueChanged(values)}
            />
          </div>
        </Table.Cell>
        <Table.Cell className="Lead Owne" onClick={ () => handleRightPaneOpen(data.id.substring(1)) } >
          <Dropdown
            options={leadOwner}
            placeholder="Lead Owner"
            basic
            defaultValue={
              data.owner_id === null ? data?.interseted : data.owner_id
            }
            onChange={(e, dat) => onChangeOwner(e, dat, leadId)}
          />
        </Table.Cell>
        <Table.Cell className="Lead Owne"  onClick={ () => handleRightPaneOpen(data.id.substring(1)) }>
          <Dropdown
            options={options}
            placeholder="Rate as"
            defaultValue={data?.interseted}
            onChange={(e, dat) => onChangeInterseted(e, dat, data.id)}
          />
        </Table.Cell>

        {leadType === 'call' ? (
          <>
          <Popup trigger={
            <Table.Cell
              onClick={() => handleRightPaneOpen(data.id.substring(1))}
              style={{
                textTransform: 'capitalize',
                paddingLeft: 20,
                alignContent: 'center',
                alignItems: 'center'
              }}
            >
              {data.status !== null && (
              data.status === 'failed_to_connect_agent' || data.status === 'failed_to_connect_customer' ) ? (
                <Image
                  src={MissedCall}
                  className={rightPane ? 'rightPopUp' : ''}
                  style={{ width: 25, height: 25 }}
                />
              ) : null}

              {data.status !== null && data.status === 'completed' ? (
                <Image src={PickedCall} style={{ width: 25, height: 25 }} />
              ) : null}

              {data.status !== null && (data.status === 'suspended' || data.status === 'canceled') ? (
                <Image src={cutCall} style={{ width: 25, height: 25 }} />
              ) : null}
            </Table.Cell>
            } position="top center">
            {data.status ?  data.status.replace(/_/g, ' ') : 'No Status found' }
          </Popup>
            <Table.Cell onClick={() => handleRightPaneOpen(data.id.substring(1))}>{data.agent}</Table.Cell>{' '}
          </>
        ) : (
          <Table.Cell></Table.Cell>
        )}

        {leadType === 'SCHEDULE_CALL' ? (
          <Table.Cell onClick={() => handleRightPaneOpen(data.id.substring(1))}>
            {data.schedule_call_status ? data.schedule_call_status : ''}
          </Table.Cell>
        ) : null}

        <Table.Cell  onClick={ () => handleRightPaneOpen(data.id.substring(1)) }>
          <Dropdown
            placeholder="Lead Score"
            options={leadScore}
            defaultValue={data.score}
            onChange={(e, dat) =>
              onLeadScoreHandler(e, dat, data.id.replace('#', ''))
            }
          />
          {/* {data.score == 1 ? '' : data.score} */}
        </Table.Cell>
        <SendMessageModal
          closeAfterSend={isModalClose}
          isModalClose={isModalClose}
          isModalOpen={isModalOpen}
          open={open}
          dropDownData={dropDownData}
          leadData={data}
        />
      </Table.Row>
    </>
  )
}

export default LeadTableContent
