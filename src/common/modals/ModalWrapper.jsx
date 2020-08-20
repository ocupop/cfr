import React from 'react'
// import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import TestModal from './TestModal'
import FixModal from './FixModal'
import VariantModal from './VariantModal'
import ImageModal from './ImageModal'
import CountryModal from './CountryModal'
// import LoginModal from './LoginModal'
// import RegisterModal from './RegisterModal'
// import NotificationModal from './NotificationModal'

const modalLookup = {
  TestModal,
  FixModal,
  VariantModal,
  ImageModal,
  CountryModal,
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
