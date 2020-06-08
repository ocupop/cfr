import React from 'react'
import { Formik, Field, Form } from 'formik'
import FormikDebug from '../common/utils/FormikDebug'
import * as Yup from 'yup'

import {
  TextInput,
  TextArea,
  SwitchInput,
  // AddressInput,
  // EmailInput,
  // PhoneInput
} from '../common/fields'

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Too Short!')
    .max(100, 'Too Long!')
    .required('Required')
})
const defaultValues = {}

const Sandbox = () => {
  const activeValues = false
  const initialValues = activeValues || defaultValues

  return (
    <section>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <Formik
              enableReinitialize
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={(values) => console.log(values)}>

              {({ values, setFieldValue }) => (
                <Form>
                  <div className="row">
                    <div className="col-12">
                      <div className="d-flex align-items-center">
                        <div className="flex-grow-1">
                          <Field
                            name="name"
                            type="text"
                            component={TextInput}
                            onChange={value => setFieldValue('name', value)}
                            placeholder="Name..."
                            label="Name"
                          />
                        </div>

                        <div className="pl-2">
                          <Field
                            name="featured"
                            className="mb-0 mt-4"
                            type="checkbox"
                            toggle
                            // hint="This is a hint"
                            component={SwitchInput}
                            onChange={() => setFieldValue('featured', !values.featured)}
                            label="Featured"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12">
                      <Field
                        name="description"
                        type="text"
                        component={TextArea}
                        placeholder="Enter Text..."
                        onChange={value => setFieldValue('description', value)}
                        label="Description"
                      />
                    </div>
                  </div>


                  {/* <div className="row">
                    <div className="col-12 col-md-6">
                      <Field
                        name="contactEmail"
                        type="text"
                        hint="Enter the primary contact person's details"
                        component={EmailInput}
                        placeholder="___@___.___"
                        label="Email"
                      />

                      <Field
                        name="phoneInput"
                        type="text"
                        // hint="Enter the primary contact person's details"
                        component={PhoneInput}
                        placeholder="(___) ___-____"
                        label="Phone"
                      />
                      <Field
                        name="website"
                        type="text"
                        component={TextInput}
                        onChange={value => setFieldValue('website', value)}
                        placeholder="website"
                        label="Website URL"
                      />
                      <Field
                        name="notes"
                        type="text"
                        component={TextArea}
                        hint="notes are only visible to Ocupop management"
                        placeholder="Enter Text..."
                        onChange={value => setFieldValue('notes', value)}
                        label="Client Notes"
                      />
                    </div>
                  </div> */}

                  <div className="row mt-4">
                    <div className="col-12">
                      {activeValues ? (
                        <button type="submit" className="btn btn-block btn-lg btn-warning">
                          Save Client
                        </button>
                      ) : (
                          <button type="submit" className="btn btn-block btn-lg btn-success">
                            Add Client
                          </button>
                        )}
                    </div>
                  </div>
                  <FormikDebug />
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Sandbox
