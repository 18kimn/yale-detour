import React from 'react'
import Carousel from 'react-bootstrap/Carousel'
import ReactMarkdown from 'react-markdown'
import './Map.css'

// Link renderer: allow links to open in new tab
const LinkRenderer = (props) => {
  return (
    <a href={props.href} target="_blank" rel="noopener noreferrer">
      {props.children}
    </a>
  )
}

const Location = ({location}) => {
  const {title, image_credit, image, image_alt, text} = location

  return (
    <Carousel.Item className="mt-2 pl-4 pr-4 text-center">
      <div className="mr-3 ml-3">
        <div className="d-flex mb-2 justify-content-center text-center">
          <h3>{title}</h3>
        </div>
        <div className="carousel-image mr-5 ml-5">
          <span className="image-credit">{image_credit}</span>
          <img className="rounded" src={image} alt={image_alt} />
        </div>
        <div className="mr-5 ml-5 mt-4">
          <ReactMarkdown
            source={text}
            renderers={{link: LinkRenderer}}
          />
        </div>
      </div>
    </Carousel.Item>
  )
}

export default Location
