import React from 'react'
import cx from 'classnames'

import styles from '../styles/home.scss'

export default ({ isTransitioning }) => (
  <div
    className={cx(styles['home'], {
      [styles['transitioning']]: isTransitioning,
    })}
  >
    welcome
  </div>
)
