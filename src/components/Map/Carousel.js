import React, {useState, useEffect} from 'react'

// the carousel component from bootstrap is nice but it doesn't allow
//  for dynamic updates of the items it contains
//  this is something we need to change between the 'explore' and 'guided' modes
//  as well as to cleanly use an initial load screen that
//  reads "select a location to get started"

const ArrowButton = ({d, onClick}) => {
  const [opacity, setOpacity] = useState(0.15)
  return (
    <div
      style={{
        display: 'flex',
        placeItems: 'center',
        placeContent: 'center',
        padding: '1rem',
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="#000"
        opacity={opacity}
        onMouseEnter={() => setOpacity(0.3)}
        onMouseLeave={() => setOpacity(0.15)}
        onClick={onClick}
        width="25"
        height="25"
        viewBox="0 0 8 8"
        style={{cursor: 'pointer'}}
      >
        <path d={d} />
      </svg>
    </div>
  )
}

const Carousel = ({index, onLeft, onRight, children}) => {
  const [bg, setBg] = useState()

  useEffect(() => {
    const randNum = Math.ceil(Math.random() * 4)
    setBg(`url(/images/bg/${randNum}.png)`)
  }, [index])

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr auto 1fr',
        height: '100%',
        background: bg,
      }}
    >
      <ArrowButton
        onClick={onLeft}
        d="M5.25 0l-4 4 4 4 1.5-1.5L4.25 4l2.5-2.5L5.25 0z"
      />
      {children}
      <ArrowButton
        onClick={onRight}
        d="M2.75 0l-1.5 1.5L3.75 4l-2.5 2.5L2.75 8l4-4-4-4z"
      />
    </div>
  )
}

export default Carousel
