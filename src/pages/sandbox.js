import React from 'react'
import { useSelector } from 'react-redux'
import LoadingComponent from '../common/ui/LoadingComponent'


const SandboxPage = () => {
  const activeChannel = useSelector(state => state.shopify.activeChannel)

  if (!activeChannel) {
    return <LoadingComponent />
  }

  return (
    <>
      <section className="p-0">
        <div className="container">
          <div className="row">
            <div className="col-12 col-md-8">
              <div className="p-5">
                <h5>Sandbox</h5>
                <form name="contact" netlify>
                  <p>
                    <label>Name <input type="text" name="name" /></label>
                  </p>
                  <p>
                    <label>Email <input type="email" name="email" /></label>
                  </p>
                  <p>
                    <button type="submit">Send</button>
                  </p>
                </form>

              </div>
            </div>
            <div className="col-12 col-md-4 bg-dark bg-bleed text-white">
              <div className="px-3 pt-5 text-center">
                <h5>Application State Summary:</h5>
                <hr />
                <p>
                  <strong>Active Sales Channel:</strong> {activeChannel}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

SandboxPage.propTypes = {

}

export default SandboxPage
