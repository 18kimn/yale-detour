import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import React from 'react'
import ReactDOM from 'react-dom'
import WebFont from 'webfontloader'
import Home from './components/Home'

WebFont.load({
  google: {
    families: ['Roboto:300,700', 'sans-serif'],
  },
})

ReactDOM.render(<Home />, document.getElementById('root'))
