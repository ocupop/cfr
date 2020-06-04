import React from "react"
import PropTypes from "prop-types"

const VariantSelector = ({ option, onBlur }) => {

  return (
    <>
      <div className="form-group">
        <label htmlFor={option.name}>{option.name} </label>
        <div className="styled-select">
          <select
            name={option.name}
            onBlur={onBlur}
            className="form-control"
          >
            {Object.values(option.values).map(({value}) => {
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

VariantSelector.propTypes = {
  onChange: PropTypes.func,
  option: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    values: PropTypes.instanceOf(Object),
  }),
}

export default VariantSelector
