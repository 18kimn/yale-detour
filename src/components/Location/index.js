import React from 'react'
import Carousel from 'react-bootstrap/Carousel'
import ReactMarkdown from 'react-markdown'
import './index.css'
import rehypeRaw from 'rehype-raw'

// Link renderer: allow links to open in new tab
const LinkRenderer = (props) => {
  return (
    <a href={props.href} target="_blank" rel="noopener noreferrer">
      {props.children}
    </a>
  )
}

const Location = ({location}) => {
  const {title, text, index, currentIndex} = location

  return (
    <Carousel.Item
      className="location"
      style={{
        display: index === currentIndex ? 'unset' : 'none',
        height: '100%',
      }}
    >
      <div className="carousel-container mr-3 ml-3">
        <div className="carousel-title d-flex">
          <h2 style={{fontWeight: 'bold'}}>{title}</h2>
        </div>
        <div className="mt-1 text-left">
          <ReactMarkdown
            rehypePlugins={[rehypeRaw]} // rehypeRaw allows html elements to be rendered
            children={text}
            components={{link: LinkRenderer}}
          />
        </div>
      </div>
    </Carousel.Item>
  )
}

export default Location
