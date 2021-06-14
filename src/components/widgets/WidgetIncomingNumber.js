import React from 'react';
import { Table } from 'semantic-ui-react'

// import NodeToggle from '../../common/NodeToggle';
// import CommonInput from '../../common/CommonInput';
import CommonButton from '../../common/CommonButtons';

import iconStyle from '../../assets/images/Dashboard 2-04.png';
import deleteIcon from '../../assets/images/delete-icon.png'

export const WidgetIncomingNumberTitle = () => (
    <div className="accordion-widget-holder">
        <div className="accordion-image-holder">
            <img src={iconStyle} alt="logo" />
        </div>
        <div className="accordion-title-holder">
            <h2 className="accordion-title">Incoming Number</h2>
            <p className="accordion-description">Available Incoming Numbers</p>
        </div>
    </div>
)

export const WidgetIncomingNumberContent = ({
    handleDataRef
}) => {
    return (
        <div className="style-widget-wrapper">
            <p className="style-widget-title">Available Incoming Numbers</p>
            <CommonButton
                content="Buy a new number"
                btnClass="btn-blue"
            />

            <Table>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>ID</Table.HeaderCell>
                        <Table.HeaderCell>Phone Number</Table.HeaderCell>
                        <Table.HeaderCell>Actions</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    <Table.Row>
                        <Table.Cell>1</Table.Cell>
                        <Table.Cell>123456789</Table.Cell>
                        <Table.Cell className="delete-icon">
                            <img src={deleteIcon} alt="placeholder" />
                        </Table.Cell>
                    </Table.Row>
                </Table.Body>
            </Table>
        </div>
    )
}