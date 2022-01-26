import sharp from 'sharp'
import {join, resolve, dirname} from 'path'
import {fileURLToPath} from 'url'
import {promises as fs} from 'fs'
import process from 'process'

const __dirname = dirname(fileURLToPath(import.meta.url))
process.chdir(__dirname)
const readFrom = resolve(__dirname, '../wiki/images')
const writeTo = resolve(__dirname, '../public/images')

const imagePaths = await fs
  .readdir(readFrom, {withFileTypes: true})
  .then((dirents) => {
    return dirents.reduce(async (prev, current) => {
      const resolved = resolve(readFrom, current.name)
      // if it's a folder, pull out the stuff inside
      const result = current.isDirectory()
        ? (await fs.readdir(resolved)).map((path) =>
            join(current.name, path),
          )
        : [current.name]
      return [...(await prev), ...result]
    }, [])
  })
imagePaths.forEach(async (imagePath) => {
  const imageBuffer = await sharp(resolve(readFrom, imagePath))
    .resize(500)
    .jpeg({
      progressive: true,
      mozjpeg: true,
      force: false,
      quality: 80,
    })
    .png({
      progressive: true,
      force: false,
      quality: 80,
      compressionLevel: 9,
    })
    .toBuffer()
  const writePath = resolve(writeTo, imagePath)
  await fs.mkdir(dirname(writePath), {recursive: true})
  await fs.writeFile(writePath, imageBuffer)
})
