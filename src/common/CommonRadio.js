import React, { Component } from 'react'
import { Form, Radio } from 'semantic-ui-react'

class CommonRadio extends Component {
  state = {}

  handleChange = (e, { value }) => this.setState({ value })
  render() {
    const { radioList, onChange, name, defaultValue } = this.props
    return (
      <Form>
        {radioList.map((radio, index) => (
          <Form.Field key={index}>
            <Radio
              label={radio}
              name={name}
              value={radio}
              checked={radio === defaultValue}
              // checked={this.state.value === radio}
              onChange={onChange}
            />
          </Form.Field>
        ))}
      </Form>
    )
  }
}

export default CommonRadio
