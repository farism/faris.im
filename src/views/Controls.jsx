import React from 'react'
import Mousetrap from 'mousetrap'

import styles from '../styles/controls.scss'

export default ({ onGodmode }) => (
  <div className={styles['controls']}>
    <span>wsad - move</span>
    <span>arrows - move</span>
    <span>left click - pan</span>
    <span>mouse wheel - zoom</span>
    <input
      onKeyPress={e => {
        if (
          e.key === 'Enter' &&
          e.target.value.replace(' ', '').toLowerCase() === 'poweroverwhelming'
        ) {
          onGodmode()
          e.target.value = ''
        }
      }}
      placeholder="enter godmode code"
    />
  </div>
)
