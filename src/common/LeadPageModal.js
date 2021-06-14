import React from 'react'
import { Button, Modal, Form } from 'react-bootstrap'
import ModalHeader from 'react-bootstrap/ModalHeader'
const LeadPageModal = ({ show, handleClose, data }) => {
  return (
    <>
      <Modal show={show} className="lead_page_modal">
        <ModalHeader>
          <Modal.Title>{data && data.header}</Modal.Title>
          <p className="close_modal" onClick={handleClose}>
            X
          </p>
        </ModalHeader>
        <Modal.Body>
          <Form.Group controlId="exampleForm.ControlInput1">
            <Form.Label>{data && data.lable}</Form.Label>
            <Form.Control type="text" />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            {data && data.btnTitle}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default LeadPageModal
