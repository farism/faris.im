import React from 'react'
import { withRouter } from 'react-router'
import { NavLink } from 'react-router-dom'
import cx from 'classnames'

import styles from '../styles/footer.scss'

export default () => (
  <footer
    className={cx(styles['footer'], styles[location.pathname.replace('/', '')])}
  >
    ©{new Date().getFullYear()} Faris Mustafa{' '}
    <NavLink to="/home">[Back To Home]</NavLink>
    <a href="https://github.com/farism/faris.im" target="_blank">
      [View Source]
    </a>
  </footer>
)
