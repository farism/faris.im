import React from 'react'
import { NavLink } from 'react-router-dom'

import styles from '../styles/nav.scss'

const Link = ({ path }) => (
  <li>
    <NavLink
      to={`/${path}`}
      className={styles[path]}
      activeClassName={styles['active']}
    >
      {path}
    </NavLink>
  </li>
)

export default () => (
  <nav className={styles['nav']}>
    <ul>
      <Link path="home" />
      <Link path="about" />
      <Link path="articles" />
      <Link path="projects" />
      <Link path="resume" />
    </ul>
  </nav>
)
