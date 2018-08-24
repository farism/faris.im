import React from 'react'
import ReactDOM from 'react-dom'

import './styles/index.scss'
import App from './views/App'

const render = () => {
  ReactDOM.render(<App />, document.getElementById('app'))
}

render()

if (module.hot) {
  module.hot.accept(render)
}
