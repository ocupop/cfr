import React from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { Modal, Button } from 'react-bootstrap'
import { closeModal } from './modalActions'


const FixModal = ({ heading, body }) => {
  const dispatch = useDispatch()

  return (
    <>
      <Modal size="lg" show onHide={() => dispatch(closeModal())}>
        <Modal.Header closeButton>
          <Modal.Title>FIX: {heading}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Here are details to help troubleshoot</p>
          <p className="alert alert-info">
            {body}
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => dispatch(closeModal())}>Close</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

FixModal.propTypes = {
  heading: PropTypes.string,
  body: PropTypes.string
}

export default FixModal
