import React from 'react'
import { NavLink } from 'react-router-dom'
import cx from 'classnames'

import styles from '../styles/modal.scss'
import { EASY, MEDIUM, HARD, INSANE } from './Game'

const Checkbox = ({ label, difficulty, value, onChange }) => (
  <label>
    <input
      type="radio"
      name="difficulty"
      checked={value === difficulty}
      onChange={() => onChange(difficulty)}
    />
    <span />
    {label}
  </label>
)

export default ({ value, onChange, onReset, isVisible }) => (
  <div
    className={cx(styles['modal'], {
      [styles['visible']]: isVisible,
    })}
  >
    <h3>You won! Try a harder level?</h3>
    <div>
      <Checkbox
        label="easy"
        difficulty={EASY}
        onChange={onChange}
        value={value}
      />
      <Checkbox
        label="medium"
        difficulty={MEDIUM}
        onChange={onChange}
        value={value}
      />
      <Checkbox
        label="hard"
        difficulty={HARD}
        onChange={onChange}
        value={value}
      />
      <Checkbox
        label="insane"
        difficulty={INSANE}
        onChange={onChange}
        value={value}
      />
    </div>
    <div className={styles['links']}>
      <a onClick={onReset}>[yes, again!]</a>
      <NavLink to="home">[no thanks]</NavLink>
    </div>
  </div>
)
