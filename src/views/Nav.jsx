import React from 'react'
import { withRouter } from 'react-router'
import { NavLink } from 'react-router-dom'
import cx from 'classnames'
import Mousetrap from 'mousetrap'

import styles from '../styles/nav.scss'

const Link = ({ path, style }) => (
  <li style={style}>
    <NavLink
      to={`/${path}`}
      className={styles[path]}
      activeClassName={styles['active']}
    >
      {path}
    </NavLink>
  </li>
)

class Nav extends React.Component {
  constructor(props) {
    super(props)

    Mousetrap.bind('up up down down left right left right b a enter', () => {
      props.history.push('/game')
    })
  }

  render() {
    return (
      <nav
        className={cx(
          styles['nav'],
          styles[location.pathname.replace('/', '')]
        )}
      >
        <ul>
          <Link path="home" />
          <Link path="about" />
          <Link path="articles" />
          <Link path="projects" />
          <Link path="resume" />
          <Link path="game" />
          <Link style={{ display: 'none' }} path="game" />
        </ul>
      </nav>
    )
  }
}

export default withRouter(Nav)
