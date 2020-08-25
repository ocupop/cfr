import React from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { Modal } from 'react-bootstrap'
import { Formik, Field, Form } from 'formik'
import FormikDebug from '../../common/utils/FormikDebug'
import { TextArea } from '../fields'
import { closeModal } from './modalActions'
import { addNote } from '../../shopify/shopifyActions'


const CheckoutModal = ({ webUrl }) => {
  const dispatch = useDispatch()

  return (
    <>
      <Modal show onHide={() => dispatch(closeModal())}>
        <Modal.Header closeButton>
          <Modal.Title>Please tell us about your snowmobile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            enableReinitialize
            initialValues={{
              note: ''
            }}
            onSubmit={(values) => {
              dispatch(addNote(values.note))
              // window.location.replace(webUrl)
            }}>

            {({ values, dirty }) => (
              <Form>
                <p>In order to help us process your order and make sure that the correct hardware is included we need to know the year, make and model of your snowmobile.</p>
                <Field
                  name="note"
                  component={TextArea}
                  label="Tell us the make and model of your snowmobile"
                />
                <FormikDebug />
                <div className="text-center">
                  <button
                    className="btn btn-success"
                    disabled={!dirty}>Checkout Now</button>
                </div>
              </Form>
            )}
          </Formik>
        </Modal.Body>
      </Modal>
    </>
  )
}

CheckoutModal.propTypes = {
  webUrl: PropTypes.string.isRequired
}

export default CheckoutModal
