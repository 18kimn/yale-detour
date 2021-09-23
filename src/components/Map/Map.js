import React, {useState, useRef, useEffect, useContext} from 'react'
import mapboxgl from 'mapbox-gl'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import './Map.css'
import Carousel from 'react-bootstrap/Carousel'
import GuidedContext from '../guided-context'
import ExploreSidebar from '../Sidebar'
import Location from './Location'
import matter from 'gray-matter'

const importAll = (r) => r.keys().map(r)

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_API_KEY

// React and Mapbox can be confusing to use together at first
// because they both have state and modify a virtual DOM.
// If you're familiar with React, you might be tempted to use
// componentDidUpdate to act on changes made to the map, but
// this won't work because the Mapbox maintains its own separate
// state. The equivalent is using map.on('event', () => {})

const Map = () => {
  // Get context for right sidebar (varies depending on Explore or Guided Tour mode)
  const [guided, setGuided] = useContext(GuidedContext)

  // Get state for carousel (used in guided mode)
  const [index, setIndex] = useState(0)
  const [locationData, setLocationData] = useState([])
  const mapContainerRef = useRef(null)
  const map = useRef()

  useEffect(() => {
    const fetchMd = async () => {
      const files = importAll(
        require.context('../../locations', false, /\.md$/),
      )
      const promises = files.map((file) =>
        fetch(file)
          .then((res) => res.text())
          .then((text) => matter(text))
          .then((obj) => ({...obj.data, text: obj.content})),
      )
      const result = await Promise.all(promises)
      setLocationData(result)
    }
    fetchMd()
  }, [])

  // Initialize map when component mounts
  useEffect(() => {
    map.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style:
        'mapbox://styles/nathanckim18/ckjtewzfv0a1619ob3opmk6c2?optimize=true',
      center: [-72.92889674697767, 41.311363185264725],
      zoom: 14.66,
    })

    locationData.forEach((marker) => {
      // Create a DOM element for marker
      var el = document.createElement('div')
      el.className = 'marker'
      // Add event listener on marker to adjust
      // location carousel when marker is clicked
      el.addEventListener('click', () => {
        setIndex(marker.id)
        setGuided(true)
      })
      // Create popup for marker (when clicked)
      var popup = new mapboxgl.Popup({offset: 25}).setText(
        marker.title,
      )
      // Add marker to the map
      new mapboxgl.Marker(el)
        .setLngLat(marker.center)
        .setPopup(popup)
        .addTo(map.current)
    })

    // Clean up on dismount
    return () => map.current.remove()
  }, [setGuided, locationData]) // [] in useEffect mimics componentDidMount(); (will run only once)

  // Function to update carousel state (used in guided mode)
  const handleSelect = (selectedIndex) => setIndex(selectedIndex)

  const locationComponents = locationData
    .sort((a, b) => {
      if (a.id < b.id) return -1
      if (a.id > b.id) return 1
      return 0
    })
    .map((location, i) => (
      <Location
        key={i}
        location={{...location, index: i, currentIndex: index}}
      />
    ))

  // Hook: guided or carousel changes, fly map to the overview position
  useEffect(() => {
    // Fly to overview position
    if (!guided) {
      map.current.easeTo({
        center: [-72.92889674697767, 41.311363185264725],
        zoom: 14.66,
        speed: 1,
      })
    } else {
      const newLocation = locationData.find(
        (location) => location.id === index,
      )
      map.current.easeTo({...newLocation, zoom: 17.3, speed: 1})
    }
  }, [guided, index, locationData])

  return (
    <Container
      fluid
      className="h-100 overflow-hidden"
      style={{padding: 0}}
    >
      <Row className="h-100">
        <Col xs lg="7" className="bg-gray text-white">
          <div className="map-wrapper">
            <div ref={mapContainerRef} className="map" />
          </div>
        </Col>
        <Col xs lg="5">
          <div className="h-100 d-flex flex-column">
            <Row className="h-100 justify-content-center bg-light">
              {guided ? (
                <Carousel
                  activeIndex={index}
                  onSelect={handleSelect}
                  interval={null}
                >
                  {locationComponents}
                </Carousel>
              ) : (
                <ExploreSidebar />
              )}
            </Row>
          </div>
        </Col>
      </Row>
    </Container>
  )
}
export default Map
