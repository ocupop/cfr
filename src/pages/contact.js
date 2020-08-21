import React, { useEffect }from 'react'

const contactPage = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://www.cognitoforms.com/s/bbN8iw1MJUqjPe6aHn-_rw";
    script.async = true;
    script.onload = () => this.scriptLoaded();

    document.body.appendChild(script)
    scriptLoaded() {
      Cognito.load("forms", { id: "1" })
    }
  }, [])
  return (
    <div>
      <div className="cognito">
      </div>
    </div>
  )
}

export default contactPage
