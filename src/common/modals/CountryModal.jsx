import React from 'react'
// import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { Modal, Button } from 'react-bootstrap'
import { closeModal } from './modalActions'
import CountrySelector from '../ui/CountrySelector'
import logo from '../assets/footer-logo.png'


const CountryModal = ({ currency }) => {
  const dispatch = useDispatch()

  return (
    <>
      <Modal show onHide={() => dispatch(closeModal())}>
        <Modal.Body>
          <div className="bg-dark text-center mb-4">
            <img src={logo} alt="Cheetah Factory Racing"  className="w-25 my-3"/>
          </div>
          <CountrySelector/>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-mid text-mid" onClick={() => dispatch(closeModal())}>cancel</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

// CountryModal.propTypes = {

// }

export default CountryModal
