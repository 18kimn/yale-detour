import React, {useState} from 'react'
import SiteNav from './SiteNav'
import Map from './Map'
import Introduction from './Intro'
import GuidedContext from './guided-context'

const Home = () => {
  const guided = useState(false)
  // const value = { guided, setGuided };

  return (
    <div className="Home">
      <GuidedContext.Provider value={guided}>
        <Introduction />
        <SiteNav />
        <Map />
      </GuidedContext.Provider>
    </div>
  )
}

export default Home
