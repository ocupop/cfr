import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { ButtonGroup, Button } from 'react-bootstrap'
import {setCurrency} from '../../shopify/shopifyActions'

const AuthNav = () => {
  const currency = useSelector(state => state.shopify.currency)
  const dispatch = useDispatch()
  return (
    <div className="d-flex align-items-center h-100">
      <div className="my-auto mr-5">
        <ButtonGroup size="sm">
          <Button
            variant="dark"
            onClick={() => dispatch(setCurrency('USD'))}
            active={currency === 'USD' ? true : false }>
            <span className="flag-icon flag-icon-us mr-2"></span>
            USA
          </Button>
          <Button
            variant="dark"
            onClick={() => dispatch(setCurrency('CAD'))}
            active={currency === 'CAD' ? true : false}>
            <span className="flag-icon flag-icon-ca mr-2"></span>
            Canada
          </Button>
        </ButtonGroup>
      </div>
    </div>
  )
}

AuthNav.propTypes = {}

export default AuthNav
