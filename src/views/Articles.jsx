import React from 'react'
import cx from 'classnames'

import styles from '../styles/articles.scss'

export default ({ isTransitioning }) => (
  <div
    className={cx(styles['articles'], {
      [styles['transitioning']]: isTransitioning,
    })}
  >
    hopefully this page being here will motivate me to finally compile some
    articles
  </div>
)
