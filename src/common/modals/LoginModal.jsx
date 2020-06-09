import React from 'react'
import { isLoaded, isEmpty } from 'react-redux-firebase'
import { useDispatch, useSelector } from 'react-redux'
import { Modal } from 'react-bootstrap'
import LoadingComponent from '../../common/ui/LoadingComponent'
import { closeModal } from './modalActions'
import LoginForm from "../auth/LoginForm"
import Notifications from "../ui/Notifications"
import logo from '../../common/assets/logo-wordmark.svg'

const LoginModal = () => {
  const auth = useSelector(state => state.firebase.auth)
  const profile = useSelector(state => state.firebase.profile)
  const dispatch = useDispatch()

  return (
    <>
      <Modal show onHide={() => dispatch(closeModal())}>
        <Modal.Body>
          <div className="row justify-content-center mb-4">
            <div className="col-12">
              <img src={logo} className="img-fluid" alt="4pFoods Logo" />
            </div>
          </div>
          {!isLoaded(auth) ? (
            <LoadingComponent inverted />
          ) : (isEmpty(profile) ? <LoginForm/> : <Notifications/>)}

        </Modal.Body>
      </Modal>
    </>
  )
}

export default LoginModal
