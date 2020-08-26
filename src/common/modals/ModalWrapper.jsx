import React from 'react'
// import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import TestModal from './TestModal'
import FixModal from './FixModal'
import SearchModal from './SearchModal'
import ImageModal from './ImageModal'
import ChannelModal from './ChannelModal'
import CheckoutModal from './CheckoutModal'
// import LoginModal from './LoginModal'
// import RegisterModal from './RegisterModal'
// import NotificationModal from './NotificationModal'

const modalLookup = {
  TestModal,
  FixModal,
  SearchModal,
  ImageModal,
  ChannelModal,
  CheckoutModal,
  // LoginModal,
  // RegisterModal,
  // NotificationModal
}

const ModalWrapper = () => {
  const currentModal = useSelector(state => state.modals)

  if (currentModal) {
    const { modalType, modalProps } = currentModal
    const ModalComponent = modalLookup[modalType]
    return <ModalComponent {...modalProps} />
  }
  return <></>
}

ModalWrapper.propTypes = {

}

export default ModalWrapper
