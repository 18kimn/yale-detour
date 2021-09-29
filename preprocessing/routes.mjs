import path from 'path'
import {promises as fs} from 'fs'
import decodePolyline from 'decode-google-map-polyline'
import matter from 'gray-matter'
import fetch from 'node-fetch'
import dotenv from 'dotenv'
import {fileURLToPath} from 'url'
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
dotenv.config()

// this file creates a GeoJSON file in src/assets/routes.json of
//   the routes between locations on the Yale Detour. In brief, it:
// 1. assembles a list of our locations
// 2. queries the google maps API for routes
// 3. assembles them into a geojson file and writes to disk
// run it with `node preprocessing/routes.mjs`

// getLocations() pulls locations data from the markdown files in
//  1. reads in files
//  2. gets just the metadata with matter().data
//  3. In those markdown files we have it as [lat, lng] but google maps wants it as `lng,lat`
//    i.e. reverse and as a comma-separated string, so I adjusted that
const getLocations = async () => {
  const locationsDir = await fs.readdir(
    path.join(__dirname, '../src/locations/guided'),
  )
  const locationsPromises = locationsDir.map((filename) =>
    fs.readFile(__dirname + '/../src/locations/guided/' + filename, 'utf-8'),
  )
  const result = await Promise.all(locationsPromises)
  const locations = result.map((text) => {
    const location = matter(text).data
    // format locations so google maps likes them
    location.center = location.center.reverse().join(',')
    return location
  })

  return locations
}

// Each route will copy this template and fill out the properties and geometry.coordinates field
const featureTemplate = {
  'type': 'Feature',
  'geometry': {
    'type': 'LineString',
    'coordinates': [],
  },
  'properties': null,
}

// getRoute()
// inputs: the locations data scraped from the markdown files and
//    the index of the current origin for the route
//    1. it gets a origin and destination locations, to start and end the route at
//    2. it constructs a query with template literals
//    3. it decodes the route returned, which would be in a compressed format
const getRoute = async (locations, index) => {
  const origin = locations[index].center
  const destination = locations[index + 1].center

  const path = '/maps/api/directions/json'
  const options = `?origin=${origin}&destination=${destination}`
  const query = `${path}${options}&key=${process.env.REACT_APP_GMAPS_API_KEY}`

  const response = await fetch('https://maps.googleapis.com' + query)
  const {routes} = await response.json()
  const route = decodePolyline(routes[0].overview_polyline.points)
  return route
}

// main(): puts all of the above together in an async() context to execute it
//    1. gets locations that should be used in the routes (hopper, ypd, xc, etc)
//    2. Sorts locations so that IDs go from smallest to largest
//    3. For every location, it constructs a route that begins at this location and ends at
//        the next location in the locations array
//    4. Wraps all of these together in a GeoJSON format object and writes it to a file
const main = async () => {
  const locations = await getLocations()
  const featurePromises = locations
    .sort((a, b) => {
      if (a.id < b.id) return -1
      if (a.id > b.id) return 1
      return 0
    })
    .slice(0, locations.length - 1)
    .map(async (location, index) => {
      const route = await getRoute(locations, index)
      const feature = JSON.parse(JSON.stringify(featureTemplate))
      const coords = route.map(({lng, lat}) => [lng, lat])
      feature.geometry.coordinates = [...coords]
      feature.properties = {
        start: location,
        end: locations[index + 1],
      }
      console.log(feature.geometry.coordinates)
      return feature
    })

  const features = await Promise.all(featurePromises)
  const geo = {
    'name': 'detour-routes',
    'type': 'FeatureCollection',
    'features': features,
  }

  fs.writeFile('src/assets/routes.json', JSON.stringify(geo))
}

main()
