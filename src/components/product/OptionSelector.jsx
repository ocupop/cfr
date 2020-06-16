/* eslint-disable jsx-a11y/no-onchange */
import React from "react"
import PropTypes from "prop-types"

const OptionSelector = ({ option, onChange }) => {

  return (
    <>
      <div className="py-1">
        <label htmlFor={option.name} className="sr-only">{option.name} </label>
        <div className="square-select">
          <select
            name={option.name}
            onChange={onChange}
            className="form-control"
          >
            <option value={null}>Choose {option.name}...</option>
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
