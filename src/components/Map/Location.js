import React, {useEffect, useState} from 'react'
import Carousel from 'react-bootstrap/Carousel'
import ReactMarkdown from 'react-markdown'
import './Location.css'
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
  console.log(location)
  const {title, text, index, currentIndex} = location
  const [bg, setBg] = useState()

  useEffect(() => {
    const randNum = Math.ceil(Math.random() * 4)
    setBg(`url(/images/bg/${randNum}.png)`)
  }, [])

  return (
    <Carousel.Item
      className="pl-4 pr-4 text-center location"
      style={{
        display: index === currentIndex ? 'unset' : 'none',
        backgroundImage: bg,
        height: '100%',
      }}
    >
      <div className="carousel-container mr-3 ml-3">
        <div className="carousel-title d-flex text-center">
          <h1 style={{fontWeight: 'bold'}}>{title}</h1>
        </div>
        <div className="mr-5 ml-5 mt-1 text">
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
