import React, {useState, useRef, useEffect, useContext} from 'react'
import mapboxgl from 'mapbox-gl'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import './index.css'
import Carousel from './Carousel'
import Location from '../Location'
import {addPopup} from './mapbox-utils'
import usePosts from './usePosts'
import GuidedContext from '../guided-context'
import ExploreSidebar from '../Sidebar'
import routes from '../../assets/routes.json'

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_API_KEY

// React and Mapbox can be confusing to use together at first
// because they both have state and modify a virtual DOM.
// If you're familiar with React, you might be tempted to use
// componentDidUpdate to act on changes made to the map, but
// this won't work because the Mapbox maintains its own separate
// state. The equivalent is using map.on('event', () => {})

const Map = () => {
  // Get context for right sidebar (varies depending on Explore or Guided Tour mode)
  const [guided] = useContext(GuidedContext)
  const [index, setIndex] = useState(-2)
  const mapContainerRef = useRef(null)
  const map = useRef()
  const locationData = usePosts(guided)

  // initialize the map
  useEffect(() => {
    map.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style:
        'mapbox://styles/nathanckim18/ckjtewzfv0a1619ob3opmk6c2?optimize=true',
      center: [-72.92889674697767, 41.311363185264725],
      zoom: 14.66,
    })
    // add our routes onto this map
    map.current.on('load', () => {
      map.current
        .addSource('routes', {type: 'geojson', data: routes})
        .addLayer({
          id: 'routesLayer',
          source: 'routes',
          type: 'line',
          paint: {
            'line-color': '#0000ff',
            'line-opacity': 0.5,
            'line-width': 2,
          },
        })
    })
    // remove the map instance when the component unmounts
    return () => map.current.remove()
  }, [])

  // update the set of visible markers whenever the user changes from 'guided' to 'explore'
  useEffect(() => {
    // remove any markers if there are any
    ;[...document.getElementsByClassName('marker')].forEach((el) =>
      el.remove(),
    )
    // create a marker for each location
    locationData.forEach((marker) => {
      var el = document.createElement('div')
      el.className = 'marker'
      el.addEventListener('click', () => {
        setIndex(marker.id)
      })
      const popup = addPopup(map, marker)
      new mapboxgl.Marker(el)
        .setLngLat(marker.center)
        .setPopup(popup)
        .addTo(map.current)
    })
  }, [locationData])

  // transition map to the right position when the chosen location changes
  useEffect(() => {
    if (index === -2) return
    if (index === -1 || index === -3) {
      setIndex((_) => locationData.length - 1)
      return
    }
    if (index > locationData.length - 1) {
      setIndex((_) => 0)
      return
    }
    const newLocation = locationData.find(
      (location) => location.id === index,
    )
    addPopup(map, newLocation)
    map.current.easeTo({...newLocation, zoom: 16.3, speed: 1})
    if (!guided) return
    map.current.setFilter('routesLayer', ['==', 'id', newLocation.id])
  }, [index, locationData, guided])

  // when the user switches from 'guided' to 'explore' mode or vice versa,
  //  on guided mode fly to the first location (where index === 0)
  //  on explore mode fly to the overview position
  useEffect(() => {
    if (guided) {
      setIndex((_) => 0)
      return
    }
    setIndex((_) => -2)
    map.current.easeTo({
      center: [-72.92889674697767, 41.311363185264725],
      zoom: 14.66,
      speed: 1,
    })
  }, [guided])

  return (
    <Container
      fluid
      className="h-100 overflow-hidden"
      style={{padding: 0}}
    >
      <Row className="h-100" style={{margin: 0}}>
        <Col xs lg="7" className="text-white" style={{padding: 0}}>
          <div className="map-wrapper">
            <div ref={mapContainerRef} className="map" />
          </div>
        </Col>
        <Col xs lg="5" style={{padding: 0}}>
          <Carousel
            index={index}
            onLeft={() => setIndex((prev) => prev - 1)}
            onRight={() => setIndex((prev) => prev + 1)}
          >
            {
              // when the map is immediately opened and the user is on explore mode,
              //  show the "click to explore" page
              index === -2 && !guided ? (
                <ExploreSidebar />
              ) : (
                locationData.map((location, i) => (
                  <Location
                    key={i}
                    location={{
                      ...location,
                      index: i,
                      currentIndex: index,
                    }}
                  />
                ))
              )
            }
          </Carousel>
        </Col>
      </Row>
    </Container>
  )
}
export default Map
