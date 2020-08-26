import React from 'react'
import { toastr } from 'react-redux-toastr'
import { useSelector, useDispatch } from 'react-redux'
import { ButtonGroup, Button } from 'react-bootstrap'
import { closeModal } from '../modals/modalActions'
import { setActiveChannel } from '../../shopify/shopifyActions'
import { asyncActionStart, asyncActionFinish, asyncActionError } from '../../common/async/asyncActions'

const CountrySelector = () => {
  const dispatch = useDispatch()
  const activeChannel = useSelector(state => state.shopify.activeChannel)

  function changeStore(country) {
    const message = `Confirm: Do you want to switch to our ${country === 'CAD' ? 'Canadian' : 'US'} online store?`
    try {
      toastr.confirm(message, {
        onOk: () => {
          dispatch(asyncActionStart())
          dispatch(setActiveChannel(country))
          toastr.success('Success', `You are now in the ${activeChannel === 'USD' ? 'Candadian' : 'US'} store`)
          dispatch(asyncActionFinish())
          dispatch(closeModal())
        }
      })
    } catch (error) {
      console.log(error);
      dispatch(asyncActionError());
      toastr.error('Oops', 'Staying put')
    }
  }
  return (
    <>
      <p className="text-center p-4">
        <strong>Do you want to switch stores?</strong><br />CFR offers shipping from the following countries.
      </p>
      <div className="d-flex align-items-center">
        <div className="m-auto">
          <ButtonGroup size="sm">
            <Button
              variant="dark"
              onClick={() => changeStore('USD')}
              active={activeChannel === 'USD' ? true : false}>
              <span className="flag-icon flag-icon-us mr-2"></span>
              USA
            </Button>
            <Button
              variant="dark"
              onClick={() => changeStore('CAD')}
              active={activeChannel === 'CAD' ? true : false}>
              <span className="flag-icon flag-icon-ca mr-2"></span>
              Canada
            </Button>
          </ButtonGroup>
        </div>
      </div>
    </>
  )
}

CountrySelector.propTypes = {}

export default CountrySelector
