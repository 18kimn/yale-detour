import {useEffect, useState} from 'react'
import matter from 'gray-matter'

const importAll = (r) => r.keys().map(r)

const usePosts = (guided) => {
  const [locationData, setLocationData] = useState([])

  useEffect(() => {
    // this is an async function, so it needs a second wrapper inside useEffect
    // it depends on intra-component elements like setLocationData() so it needs to be
    // defined inside the component itself
    // kind of obtuse and annoying, but it is what it is
    const setup = async () => {
      // import images and markdown text
      const files = importAll(
        guided
          ? require.context('../../locations/guided', false, /\.md$/)
          : require.context(
              '../../locations/explore',
              false,
              /\.md$/,
            ),
      )
      const promises = files.map((file) =>
        fetch(file)
          .then((res) => res.text())
          .then((text) => matter(text))
          .then((obj) => ({...obj.data, text: obj.content})),
      )
      const resolved = await Promise.all(promises)
      const results = resolved.sort((a, b) => {
        if (a.id < b.id) return -1
        if (a.id > b.id) return 1
        return 0
      })

      setLocationData(results)
    }
    setup()
  }, [guided])

  return locationData
}

export default usePosts
