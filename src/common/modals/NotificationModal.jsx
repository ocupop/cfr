import React from 'react'
// import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { Modal } from 'react-bootstrap'
import { closeModal } from './modalActions'
import Notifications from '../ui/Notifications'
import logo from '../../common/assets/logo-vertical.svg'


const NotificationModal = () => {
  const dispatch = useDispatch()

  return (
    <>
      <Modal show onHide={() => dispatch(closeModal())}>
        <Modal.Body>
          <div className="row justify-content-center">
            <div className="col-8">
              <img src={logo} className="img-fluid" alt="4P Foods logo" />
            </div>
          </div>
          <Notifications/>
        </Modal.Body>
        <Modal.Footer>
          {/* <Button variant="secondary" onClick={() => dispatch(closeModal())}>Close</Button> */}
        </Modal.Footer>
      </Modal>
    </>
  )
}

NotificationModal.propTypes = {

}

export default NotificationModal
