import React, {useState} from 'react'
import SiteNav from './SiteNav'
import Map from './Map/Map'
import Introduction from './Intro/Introduction'
import GuidedContext from './guided-context'

function Home() {
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
