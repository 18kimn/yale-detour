import React, {useState} from 'react'
import Modal from 'react-bootstrap/Modal'
import Nav from 'react-bootstrap/Nav'
import './index.css'

import Body from './AboutBody'
const About = () => {
  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  return (
    <>
      <Nav.Link onClick={handleShow} className="pl-3 pr-3">
        About
      </Nav.Link>
      <Modal
        show={show}
        onHide={handleClose}
        dialogClassName="modal-100w"
        aria-labelledby="about-fullscreen-modal"
        centered
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body
          style={{
            maxHeight: 'calc(100vh - 210px)',
            overflowY: 'auto',
          }}
        >
          <Body />
        </Modal.Body>
      </Modal>
    </>
  )
}

export default About
