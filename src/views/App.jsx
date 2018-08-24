import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import styles from '../styles/app.scss'
import About from './About'
import Articles from './Articles'
import Home from './Home'
import Projects from './Projects'
import Resume from './Resume'
import Scene from './Scene'

export default () => (
  <div>
    <div className={styles['scene']}>
      <Scene />
    </div>
    <div className={styles['page']}>
      <BrowserRouter>
        <Switch>
          <Route path="/about" component={About} />
          <Route path="/articles" component={Articles} />
          <Route path="/projects" component={Projects} />
          <Route path="/resume" component={Resume} />
          <Route path="/home" component={Home} />
          <Route path="/" component={Home} />
        </Switch>
      </BrowserRouter>
    </div>
  </div>
)
