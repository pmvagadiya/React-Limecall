import React from 'react'
import DateRangePicker from 'react-bootstrap-daterangepicker'
// you will need the css that comes with bootstrap@3. if you are using
// a tool like webpack, you can do the following:
import 'bootstrap/dist/css/bootstrap.css'
// you will also need the css that comes with bootstrap-daterangepicker
import 'bootstrap-daterangepicker/daterangepicker.css'

const CommonDateRangePicker = ({
  handleApply,
  initialSettings,
  handleCancel
}) => {
  return (
    <DateRangePicker
      onApply={handleApply}
      initialSettings={initialSettings}
      onCancel={handleCancel}
    >
      <input style={{width: 300}} type="text" className="form-control" />
    </DateRangePicker>
  )
}
export default CommonDateRangePicker
