import {marked} from 'marked'
import {dirname, resolve} from 'path'
import {fileURLToPath} from 'url'
import {promises as fs} from 'fs'
const __dirname = dirname(fileURLToPath(import.meta.url))
process.chdir(__dirname)
const contentDir = resolve('../wiki/locations')

/** Maybe this is getting out of hand, but in order to
 * reduce a dependency (even a dev dependency)
 * this function parses YAML frontmatter
 * into a JS object
 * Doesn't handle tables or anything like that
 */
export function parseYAML(frontmatter) {
  return frontmatter.split('\n').reduce((accum, pair) => {
    if (!pair) return accum
    const [key, value] = pair.split(':').map((item) => item.trim())
    let result
    if (value === 'true' || value === 'false') {
      result = value === 'true'
    } else if (value.slice(0, 1) === '[') {
      // switched from leaflet to mapbox; we now need reversed coords
      result = eval(value).reverse()
    } else if (!isNaN(parseFloat(value))) {
      result = parseFloat(value)
    } else {
      result = value
    }
    return {...accum, [key]: result}
  }, {})
}

/** Reads in our markdown files from the wiki and writes it out
 * to the public/ directory as a JSON file
 */
async function processContent() {
  const renderer = {
    link(href, title, text) {
      return `<a target="_blank" href="${href}">${text}</a>`
    },
  }

  marked.use({renderer})
  const contentObj = (await fs.readdir(contentDir)).map(
    async (filename) => {
      const text = await fs.readFile(
        resolve(contentDir, filename),
        'utf-8',
      )
      const [_, frontmatter, content] = text.split('---')
      return {data: parseYAML(frontmatter), content: marked(content)}
    },
  )
  const content = await Promise.all(contentObj)

  fs.writeFile('../public/content.json', JSON.stringify(content))
}

processContent()
