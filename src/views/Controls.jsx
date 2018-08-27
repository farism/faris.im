import React from 'react'

import styles from '../styles/controls.scss'

const GODMODES = [
  'iddqd',
  'idkfa',
  'poweroverwhelming',
  'waraintwhatitusedtobe',
  'tooktheredpill',
]

const check = code =>
  GODMODES.some(val => code.replace(/\s/g, '').toLowerCase() === val)

export default ({ onGodmode }) => (
  <div className={styles['controls']}>
    <span>wsad - move</span>
    <span>arrows - move</span>
    <span>left click - pan</span>
    <span>mouse wheel - zoom</span>
    <input
      onKeyPress={e => {
        if (e.key === 'Enter' && check(e.target.value)) {
          onGodmode()
          e.target.value = ''
          e.target.blur()
        }
      }}
      onKeyDown={e => {
        if (e.key === 'Escape') {
          e.target.blur()
        }
      }}
      placeholder="enter godmode code"
    />
  </div>
)
