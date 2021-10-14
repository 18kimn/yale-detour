import {select, interpolateRgbBasis} from 'd3'

const rand = (min, max) => Math.random() * (max - min) + min

const getTotalLength = (coords, lineGen) => {
  const svg = select('body').append('svg')
  const length = svg
    .attr('display', 'none')
    .append('path')
    .attr('d', lineGen(coords))
    .node()
    .getTotalLength()
  svg.remove()
  return length
}

const getColors = interpolateRgbBasis(['red', 'blue', 'white'])

export {rand, getTotalLength, getColors}
