import React, {useState, useEffect} from 'react'
// import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { Modal, Button } from 'react-bootstrap'
import { closeModal } from './modalActions'
import { objectToArray, getPriceRange } from '../utils/helpers'

const SearchModal = ({ heading }) => {
  const dispatch = useDispatch()
  const activeChannel = useSelector(({ shopify }) => shopify.activeChannel)
  const products = useSelector(({ shopify }) => shopify[activeChannel].products)

  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([])

  const handleChange = e => {
    setSearchTerm(e.target.value)
  }

  useEffect(() => {
    let results = []
    if (searchTerm.length < 2) {
      return
    }
    results = objectToArray(products).filter(product =>
      product.title.toLowerCase().includes(searchTerm)
    )
    setSearchResults(results)
  }, [searchTerm, products])

  return (
    <>
      <Modal size="lg" show onHide={() => dispatch(closeModal())}>
        <Modal.Header closeButton>
          <Modal.Title>Search Products</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="form-group bg-dark p-3">
            <input
              type="text"
              placeholder="Enter term..."
              className="form-control"
              value={searchTerm}
              onChange={handleChange}
            />
          </div>

          <div>
            {searchResults.map(product => (
              <a href={`/products/${product.handle}`} className="list-group-item">
                <div className="row">
                  <div className="col-1">
                    <img src={product.images[0].src} alt={product.title} className="img-fluid" />
                  </div>
                  <div className="col-8">
                    <span>{product.title}</span>
                  </div>
                  <div className="col-3 text-right text-muted">
                    {getPriceRange(product)}
                  </div>
                </div>
              </a>
            ))}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => dispatch(closeModal())}>Close</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

// SearchModal.propTypes = {}

export default SearchModal
