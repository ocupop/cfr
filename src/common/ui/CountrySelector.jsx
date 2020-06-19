import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { ButtonGroup, Button } from 'react-bootstrap'
import { setCurrency } from '../../shopify/shopifyActions'

const CountrySelector = () => {
  const dispatch = useDispatch()
  const currency = useSelector(state => state.shopify.currency)

  function changeStore(country) {
    dispatch(setCurrency(country))
  }
  return (
    <div className="d-flex align-items-center">
      <div className="m-auto">
        <ButtonGroup size="sm">
          <Button
            variant="dark"
            onClick={() => changeStore('USD')}
            active={currency === 'USD' ? true : false}>
            <span className="flag-icon flag-icon-us mr-2"></span>
            USA
          </Button>
          <Button
            variant="dark"
            onClick={() => changeStore('CAD')}
            active={currency === 'CAD' ? true : false}>
            <span className="flag-icon flag-icon-ca mr-2"></span>
            Canada
          </Button>
        </ButtonGroup>
      </div>
    </div>
  )
}

CountrySelector.propTypes = {}

export default CountrySelector
