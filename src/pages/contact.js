import React, { useState, useEffect } from 'react'

const ContactPage = () => {

  return (
    <>
      <section className="py-0">
        <div className="container">
          <div className="row">
            <div className="col-lg-9">
              <div className="content sidebar-layout-content">
                <h1>Contact</h1>
                <p>
                  Let us know if you have an concerns, questions, or kind words
                  for us. We are happy to get back to you as soon as possible.
                  Be sure to check the FAQ below for quick answers.
                </p>
                <form name="contact" method="POST" data-netlify="true" action="/thank-you">
                  <input type="hidden" name="form-name" value="contact" />
                  <div class="row">
                    <div class="col-lg-6">
                      <div class="form-group">
                        <label for="first-name" class="text-uppercase font-weight-bold">First Name:</label>
                        <input type="text" name="first-name" class="form-control" />
                      </div>
                    </div>
                    <div class="col-lg-6">
                      <div class="form-group">
                        <label for="last-name" class="text-uppercase font-weight-bold">Last Name:</label>
                        <input type="text" name="last-name" class="form-control" />
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-12">
                      <div class="form-group">
                        <label for="email" class="text-uppercase font-weight-bold">Email</label>
                        <input type="text" name="email" class="form-control" required />
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-12">
                      <div class="form-group">
                        <label for="inquiry" class="text-uppercase font-weight-bold">Inquiry</label>
                        <textarea name="inquiry" id="" cols="30" rows="8" class="form-control"></textarea>
                      </div>
                    </div>
                  </div>
                  <button type="submit" class="btn btn-secondary text-white">Submit</button>
                </form>
              </div>
            </div>
            <div className="col-lg-3 sidebar">
              <div className="content sidebar-layout-content">
                <h2 className="h4 mb-4">Our Headquarters</h2>
                <p className="h5 text-primary">Address</p>
                <address>
                  Cheetah Factory Racing
                  <br />
                  PO Box 93
                  <br />
                  Pemberton, BC
                  <br />
                  V0N 2L0
                  <br />
                  Canada
                </address>
                <p className="h5 text-primary">Phone</p>
                <p className="mb-5">
                  <a href="tel:604-894-1880">604-894-1880</a>
                </p>

                <h2 className="h4 mb-4">U.S. Shipping</h2>
                <p className="h5 text-primary">Address</p>
                <address>
                  Cheetah Factory Racing
                  <br />
                  1300 Boblett st. Unit A 3584
                  <br />
                  Blaine, Washington 98230
                  <br />
                  USA
                </address>
                <p className="h5 text-primary">Phone:</p>
                <a href="tel:1-877-894-1880">1-877-894-1880</a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default ContactPage
