// reduces image file sizes, which can be quite large in original formats

import sharp from 'sharp'
import {join, dirname, basename} from 'path'
import {fileURLToPath} from 'url'
import {promises as fs} from 'fs'
import readdir from 'recursive-readdir'
import du from 'du'
import bytes from 'bytes'

const __dirname = dirname(fileURLToPath(import.meta.url))
const imageDir = join(__dirname, '../public/images')
const updateConsole = (str) => {
  process.stdout.clearLine()
  process.stdout.cursorTo(0)
  process.stdout.write(str)
}

// we only want to process images once, since processing them every time
//  could make .jpg files unreasonably blurry
//  my answer to this is to keep an array of files we already
//  processed in the file referenced below
const alreadyProcessed = JSON.parse(
  await fs.readFile(join(__dirname, 'processedImages.json'), 'utf-8'),
)

const allImages = await readdir(imageDir)
const imagePaths = allImages.filter(
  (imagePath) => !alreadyProcessed.includes(imagePath),
)

fs.writeFile(
  join(__dirname, 'processedImages.json'),
  JSON.stringify([...allImages, ...imagePaths]),
)

console.log(
  `Image processing beginning, current size is ${bytes(
    await du(imageDir),
  )}`,
)

if (imagePaths.length === 0)
  updateConsole(
    'No files to process D: either files were already optimized or this script broke \n',
  )

let currentIndex = 1
imagePaths.forEach(async (imagePath) => {
  const imageBuffer = await sharp(imagePath)
    .resize(1000)
    .jpeg({progressive: true, force: false, quality: 70})
    .png({
      progressive: true,
      force: false,
      quality: 80,
      compressionLevel: 9,
    })
    .toBuffer()
  updateConsole(
    `${basename(dirname(imagePath))}/${basename(
      imagePath,
    )} processed! Writing to disk now...`,
  )
  await fs.writeFile(imagePath, imageBuffer)

  if (currentIndex === imagePaths.length) {
    console.log(
      `\nImage processing finished! ${
        imagePaths.length
      } files processed; Final size is ${bytes(await du(imageDir))}`,
    )
  }
  currentIndex += 1
})
