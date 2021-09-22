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
  const {
    title,
    image_credit,
    image,
    image_alt,
    text,
    index,
    currentIndex,
  } = location

  return (
    <Carousel.Item
      className="mt-2 pl-4 pr-4 text-center"
      style={{display: index === currentIndex ? 'unset' : 'none'}}
    >
      <div className="carousel-container mr-3 ml-3">
        <div className="carousel-title d-flex mb-2 justify-content-center text-center">
          <h3>{title}</h3>
        </div>
        <div style={{display: 'flex', placeContent: 'center'}}>
          <div className="carousel-image-container mr-5 ml-5">
            <span className="image-credit">{image_credit}</span>
            <img
              className="carousel-image rounded"
              src={image}
              alt={image_alt}
            />
          </div>
        </div>
        <div className="mr-5 ml-5 mt-4 carousel-text">
          <ReactMarkdown
            children={text}
            components={{link: LinkRenderer}}
          />
        </div>
      </div>
    </Carousel.Item>
  )
}

export default Location
