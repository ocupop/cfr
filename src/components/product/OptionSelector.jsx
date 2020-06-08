/* eslint-disable jsx-a11y/no-onchange */
import React from "react"
import PropTypes from "prop-types"

const OptionSelector = ({ option, onChange }) => {

  return (
    <>
      <div className="form-group">
        <label htmlFor={option.name}>{option.name} </label>
        <div className="select">
          <select
            name={option.name}
            onChange={onChange}
            className="form-control"
          >
            <option>Choose {option.name}...</option>
            {Object.values(option.values).map(({ value }) => {
              return (
                <option
                  value={value}
                  key={`${option.name}-${value}`}>
                  {`${value}`}
                </option>
              )
            })}
          </select>
        </div>
      </div>
      <br />
    </>
  )
}

OptionSelector.propTypes = {
  onChange: PropTypes.func,
  option: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    values: PropTypes.instanceOf(Object),
  }),
}

export default OptionSelector
