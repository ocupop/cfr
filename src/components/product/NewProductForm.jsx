import React from 'react'
import { useField, useForm } from '@shopify/react-form'
import PropTypes from 'prop-types'

const ProductForm = () => {
  const {
    fields: { title },
    submit,
    submitting,
    dirty,
    reset,
    submitErrors,
    makeClean,
  } = useForm({
    fields: {
      title: useField('some default title'),
    },
    onSubmit: async fieldValues => {
      return { status: 'fail', errors: [{ message: 'bad form data' }] };
    },
  });

  const loading = submitting ? <p className="loading">loading...</p> : null;
  const errors =
    submitErrors.length > 0 ? (
      <p className="error">{submitErrors.join(', ')}</p>
    ) : null;
  return (
    <div>
      <h3>Product Form</h3>
      <form onSubmit={submit}>
        {loading}
        {errors}
        <div>
          <label htmlFor="title">
            Title
          <input
              id="title"
              name="title"
              value={title.value}
              onChange={title.onChange}
              onBlur={title.onBlur}
            />
          </label>
          {title.error && <p className="error">{title.error}</p>}
        </div>
        <button type="button" disabled={!dirty} onClick={reset}>
          Reset
      </button>
        <button type="submit" disabled={!dirty} onClick={submit}>
          Submit
      </button>
      </form>
    </div>
  )
}

ProductForm.propTypes = {

}

export default ProductForm
