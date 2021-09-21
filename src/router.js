import React from 'react'
import AboutBody from './components/About/AboutBody'
import AboutPrivacy from './components/About/AboutPrivacy'

const routes = {
  '/': () => <AboutBody />,
  '/privacy': () => <AboutPrivacy />,
}

export default routes
