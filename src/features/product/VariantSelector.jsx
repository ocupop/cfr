import React from "react"
import PropTypes from "prop-types"

const VariantSelector = props => {
  const { option } = props
  return (
    <>
      <div className="form-group">
        <label htmlFor={option.name}>{option.name} </label>
        <div className="styled-select">
          <select
            name={option.name}
            key={option.id}
            onChange={props.onChange}
            className="form-control"
          >
            {option.values.map(value => {
              return (
                <option
                  value={value}
                  key={`${option.name}-${value}`}
                >{`${value}`}</option>
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
    values: PropTypes.arrayOf(PropTypes.string),
  }),
}

export default VariantSelector
