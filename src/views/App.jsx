import React from 'react'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'

import styles from '../styles/app.scss'
import About from './About'
import Articles from './Articles'
import Home from './Home'
import Nav from './Nav'
import Projects from './Projects'
import Resume from './Resume'
import Scene from './Scene'

export default () => (
  <BrowserRouter>
    <div>
      <div className={styles['nav']}>
        <Nav />
      </div>
      <div className={styles['scene']}>
        <Scene />
      </div>
      <div className={styles['page']}>
        <Switch>
          <Route path="/home" component={Home} />
          <Route path="/about" component={About} />
          <Route path="/articles" component={Articles} />
          <Route path="/projects" component={Projects} />
          <Route path="/resume" component={Resume} />
          <Redirect from="*" to="/home" />
        </Switch>
      </div>
    </div>
  </BrowserRouter>
)
