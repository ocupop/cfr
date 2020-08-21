import React, { useEffect }from 'react'

const contact = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://services.cognitoforms.com/s/bbN8iw1MJUqjPe6aHn-_rw';
    document.body.appendChild(script);
    script.addEventListener('load', () => {
      Cognito.load("forms", { id: "58" })
    });
  }, [])

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
                <div className="cognito">
                  <div className="preloader">
                    <img src="/img/favicon.png" />
                  </div>
                </div>
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
      <Faq />
    </>
  )
}

export default contactPage
