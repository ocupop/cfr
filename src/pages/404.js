import React from "react"
import HEAD from "../common/ui/Head"

const NotFoundPage = () => (
  <>
    <HEAD title="404: Not found" />
    <section>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h1>PAGE NOT FOUND</h1>
            <p>You just requested a web page that doesn&#39;t exist</p>
            <a href="/" className="btn btn-primary">Continue Shopping</a> 
          </div>
        </div>
      </div>
    </section>
    
  </>
)

export default NotFoundPage