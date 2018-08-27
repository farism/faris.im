import React from 'react'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import cx from 'classnames'

import styles from '../styles/app.scss'
import About from './About'
import Articles from './Articles'
import Footer from './Footer'
import Game from './Game'
import Home from './Home'
import Nav from './Nav'
import Projects from './Projects'
import Resume from './Resume'
import Scene from './Scene'
import Controls from './Controls'

export default class extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isTransitioning: true,
    }
  }

  render() {
    const { isTransitioning } = this.state

    return (
      <BrowserRouter>
        <div className={cx(styles['app'])}>
          <div className={styles['scene']}>
            <Scene
              onTransitionBegin={() => {
                this.setState({ isTransitioning: true })
              }}
              onTransitionComplete={() => {
                this.setState({ isTransitioning: false })
              }}
            />
          </div>
          <div className={styles['nav']}>
            <Nav />
          </div>
          <div className={styles['page']}>
            <Switch>
              <Route
                path="/home"
                render={() => <Home {...{ isTransitioning }} />}
              />
              <Route
                path="/about"
                render={() => <About {...{ isTransitioning }} />}
              />
              <Route
                path="/articles"
                render={() => <Articles {...{ isTransitioning }} />}
              />
              <Route
                path="/projects"
                render={() => <Projects {...{ isTransitioning }} />}
              />
              <Route
                path="/resume"
                render={() => <Resume {...{ isTransitioning }} />}
              />
              <Route
                path="/game"
                render={() => <Game {...{ isTransitioning }} />}
              />
              <Redirect from="*" to="/home" />
            </Switch>
          </div>
          <div className={styles['footer']}>
            <Footer />
          </div>
        </div>
      </BrowserRouter>
    )
  }
}
