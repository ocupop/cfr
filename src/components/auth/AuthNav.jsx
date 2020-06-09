import React, { useState } from 'react'
// import PropTypes from 'prop-types'
import { ButtonGroup, Button } from 'react-bootstrap'

const AuthNav = () => {
  const [currency, setCurrency] = useState("CAD")

  return (
    <div className="d-flex align-items-center h-100">
      <div className="my-auto mr-5">
        <ButtonGroup size="sm">
          <Button
            variant="dark"
            onClick={() => setCurrency('USD')}
            active={currency === 'USD' ? true : false }>
            <span className="flag-icon flag-icon-us mr-2"></span>
            USA
          </Button>
          <Button
            variant="dark"
            onClick={() => setCurrency('CAD')}
            active={currency === 'CAD' ? true : false}>
            <span className="flag-icon flag-icon-ca mr-2"></span>
            Canada
          </Button>
        </ButtonGroup>
      </div>
    </div>
  )
}

AuthNav.propTypes = {

}

export default AuthNav
