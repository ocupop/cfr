import React from 'react'
import { toastr } from 'react-redux-toastr'
import { useSelector, useDispatch } from 'react-redux'
import { ButtonGroup, Button } from 'react-bootstrap'
import { setCurrency } from '../../shopify/shopifyActions'
import { asyncActionStart, asyncActionFinish, asyncActionError } from '../../common/async/asyncActions'

const CountrySelector = () => {
  const dispatch = useDispatch()
  const currency = useSelector(state => state.shopify.currency)

  function changeStore(country) {
    const message = `Confirm: Do you want to switch to our ${country === 'CAD' ? 'Canadian' : 'US'} online store?`
    try {
      toastr.confirm(message, {
        onOk: () => {
          dispatch(asyncActionStart())
          dispatch(setCurrency(country))
          toastr.success('Success', `You are now in the ${currency === 'USD' ? 'Candadian' : 'US'} store`)
          dispatch(asyncActionFinish())
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
        <strong>Do you need to switch stores?</strong><br />CFR offers shipping from the following countries.
      </p>
      <div className="d-flex align-items-center">
        <div className="m-auto">
          <ButtonGroup size="sm">
            <Button
              variant="mid"
              onClick={() => changeStore('USD')}
              active={currency === 'USD' ? true : false}>
              <span className="flag-icon flag-icon-us mr-2"></span>
              USA
            </Button>
            <Button
              variant="mid"
              onClick={() => changeStore('CAD')}
              active={currency === 'CAD' ? true : false}>
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
