import React, { useState } from "react"
import { graphql, useStaticQuery } from "gatsby"
import BackgroundImage from "gatsby-background-image"
const GetStoked = () => {
  const [videoSrc, setVideoSrc] = useState('')
  const [photoSrc, setPhotoSrc] = useState('')
  console.log('photoSrc', photoSrc)
  const data = useStaticQuery(graphql`
    query {
      
      allInstaNode(limit: 24) {
        edges {
          node {
           localFile{
              childImageSharp {
                fluid(maxHeight: 1000, maxWidth: 1000 quality: 90) {
                 ...GatsbyImageSharpFluid_withWebp
               }
             }
           }
          }
        }
      }
    }
  `)

  return (
    <>
      <div className="infinite-slider-wrapper">
        <div className="infinite-slider-text">
          Get Stoked!
        </div>
        <div className="instagram-handle">
          <a href="https://www.instagram.com/cheetah_snow/" target="blank" rel="noopener" className=" d-flex">
            <div className="insta-icon">
              <i className="ri-instagram-line text-white"></i>
            </div>
            <div className="insta-handle-name">
              @cheetah_snow
            </div>
          </a>
        </div>
        <div className="infinite-slider">
          <div className="mover-1">
          </div>
        </div>
      </div>
      <section>
        <div className="container">
          <div className="row">
            {data.allInstaNode.edges.map((item, index) => (
              <div className="col-md-6 col-lg-4" key={index}>

                {/* {item.node.type == 'video' &&
                  <>
                    <BackgroundImage
                      Tag="div"
                      className="bg-image aspect-1x1 mb-4 insta-video"
                      fluid={item.node.localImage.childImageSharp.fluid}
                      backgroundColor={`#fff`}
                      style={{
                        backgroundSize: 'contain'
                      }}
                      onClick={() => { { setVideoSrc(item.node.videos.standard_resolution.url) } }}
                    >
                      <div className="overlay">
                        <div className="overlay-content">
                          <i className="ri-play-fill"></i>
                        </div>
                      </div>
                    </BackgroundImage>
                  </>
                } */}
                 
                  <BackgroundImage
                    Tag="div"
                    className="bg-image aspect-1x1 mb-4"
                    fluid={item.node.localFile.childImageSharp.fluid}
                    backgroundColor={`#fff`}
                    style={{
                      backgroundSize: 'contain'
                    }}
                  onClick={() => {{ setPhotoSrc(item.node.original) }}}
                  ></BackgroundImage>
                
              </div>
            ))}
          </div>
        </div>
      </section>
      {videoSrc &&
        <div className="modal-wrapper">
          <div className="video-player-content">
            <button onClick={() =>  { setVideoSrc('') } } className="close-modal"><i className="ri-close-circle-line"></i></button>
            <video src={videoSrc} controls autoPlay></video>
          </div>
        </div>
      }
      {photoSrc &&
        <div className="modal-wrapper">
          <div className="photo-modal-content">
            <button onClick={() =>  { setPhotoSrc('') } } className="close-modal"><i className="ri-close-circle-line"></i></button>
            <img
              src={photoSrc}
              className="img-fluid"
              alt="Instagram"
            />
          </div>
        </div>
      }
    </>
  )
}

export default GetStoked
