import React, {useState} from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import './Introduction.css'
import logo from '../logo.svg'
import AboutText from '../About/AboutText'

const Introduction = () => {
  const [show, setShow] = useState(true)
  const handleClose = () => {
    setShow(false)
  }

  // Use the context created by App.js
  const handleGuided = () => {
    setShow(false)
  }

  return (
    <Modal
      show={show}
      onHide={handleClose}
      aria-labelledby="introduction-fullscreen-modal"
      centered
    >
      <Modal.Header className="justify-content-center">
        <img
          src={logo}
          width="100"
          height="100"
          alt="The Yale Detour logo"
        />
      </Modal.Header>
      <Modal.Body className="text-center pl-5 pr-5 introduction-text">
        <h1 className="pt-1 pb-2">The Yale Detour</h1>
        <AboutText />
      </Modal.Body>
      <Modal.Footer className="justify-content-center">
        <Button variant="outline-secondary" onClick={handleClose}>
          Explore
        </Button>
        <Button variant="outline-primary" onClick={handleGuided}>
          Guided Tour
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default Introduction
