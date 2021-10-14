import * as d3 from 'd3'
import {rand, getTotalLength, getColors} from '../utils.js'

const config = {
  maxLineWidth: 7,
  nLines: 30,
  nCoords: 30,
  totalTime: 1000,
  ease: d3.easeSinInOut,
}

const drawBackground = (id) => {
  const elementToMount = d3.select(id)
  const {width, height} = elementToMount
    .node()
    .getBoundingClientRect()
  elementToMount.select('canvas').remove()
  const canvas = elementToMount
    .append('canvas')
    .attr('id', 'background')
    .attr('width', width)
    .attr('height', height)
    .style('position', 'absolute')
    .style('top', '0')
    .style('pointer-events', 'none')
    .style('opacity', '0.1')
  const context = canvas.node().getContext('2d')

  const coords = Array(config.nCoords)
    .fill(0)
    .map(() => ({
      x: rand(-width, 2 * width),
      y: rand(-height, 2 * height),
    }))

  const lineGenerator = d3
    .line()
    .x((d) => d.x)
    .y((d) => d.y)
  const totalLength = getTotalLength(coords, lineGenerator)
  const lineWidths = Array(config.nLines)
    .fill(0)
    .map((_) => rand(0, config.maxLineWidth))

  context.setLineDash([totalLength, totalLength])
  context.globalAlpha = 0.3

  // const interpolator = d3.interpolate(0, 1)
  const drawFrame = (elapsed, totalTime) => {
    context.clearRect(0, 0, width, height)
    for (let i = 0; i < config.nLines; i++) {
      context.beginPath()
      lineGenerator
        .context(context)
        .curve(
          d3.curveBundle.beta(
            config.ease(i / config.nLines) * 0.7 + 0.3,
          ),
        )(coords)
      const dashOffset =
        config.ease(1 - elapsed / totalTime) * totalLength
      if (dashOffset > 0) context.lineDashOffset = dashOffset
      context.strokeStyle = getColors(i / config.nLines)
      context.lineWidth = lineWidths[i]
      context.stroke()
      context.closePath()
    }
  }

  const timer = d3.timer((elapsed) => {
    drawFrame(elapsed, config.totalTime)
    if (elapsed > config.totalTime) timer.stop()
  })
}

export default drawBackground
