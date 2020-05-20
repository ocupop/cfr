import React from 'react'
import { useRecoilState } from 'recoil'
// import PropTypes from 'prop-types'
import { ButtonGroup, Button } from 'react-bootstrap'
import { activeCountry } from './authAtoms'

const AuthNav = () => {
  const [country, setCountry] = useRecoilState(activeCountry)

  return (
    <div className="d-flex align-items-center h-100">
      <div className="my-auto mr-5">
        <ButtonGroup size="sm">
          <Button
            variant="dark"
            onClick={() => setCountry('US')}
            active={country === 'US' ? true : false }>
            <span className="flag-icon flag-icon-us mr-2"></span>
            USA
          </Button>
          <Button
            variant="dark"
            onClick={() => setCountry('CA')}
            active={country === 'CA' ? true : false}>
            <span className="flag-icon flag-icon-ca mr-2"></span>
            Canada
          </Button>
        </ButtonGroup>
      </div>
      <div className="my-auto mr-5">My Account</div>
    </div>
  )
}

AuthNav.propTypes = {

}

export default AuthNav
