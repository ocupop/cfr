import React from 'react'
import Label from './label'
import MaskedInput from 'react-text-mask'
import emailMask from 'text-mask-addons/dist/emailMask'

const EmailInput = ({ className, hint, type, label, placeholder, required, field, form: { errors, touched } }) => {
  const status = touched[field.name] && errors[field.name] ? `is-invalid` : ``

  return (
    <div className={`form-group ${className}`}>
      <Label label={label} hint={hint} />
      <MaskedInput
        mask={emailMask}
        className={`form-control ${status}`}
        {...field}
        placeholder={placeholder}
        type={type}
        required={required}
      />
      {touched[field.name] && errors[field.name] && <div className="invalid-feedback">{errors[field.name]}</div>}
    </div>
  )
}

export default EmailInput
