import React from 'react'
import cx from 'classnames'

import styles from '../styles/game.scss'

export default ({ isTransitioning }) => (
  <div
    className={cx(styles['game'], {
      [styles['transitioning']]: isTransitioning,
    })}
  >
    game
  </div>
)
