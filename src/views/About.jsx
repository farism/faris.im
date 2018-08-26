import React from 'react'
import cx from 'classnames'

import styles from '../styles/about.scss'

export default ({ isTransitioning }) => (
  <div
    className={cx(styles['about'], {
      [styles['transitioning']]: isTransitioning,
    })}
  >
    about
  </div>
)
