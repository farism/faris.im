import React from 'react'
import Obfuscate from 'react-obfuscate'
import cx from 'classnames'
import Clipboard from 'react-clipboard.js'

import styles from '../styles/resume.scss'

const RESUME_URL =
  'https://docs.google.com/document/d/1Aq2NT7uEdBk-W879aSd3RHR6rbjndwi7zIdvOyOUKSQ/edit?usp=sharing'

export default class extends React.Component {
  constructor(props) {
    super(props)

    this.state = {}
  }

  render() {
    const { isTransitioning } = this.props

    return (
      <div
        className={cx(styles['resume'], {
          [styles['transitioning']]: isTransitioning,
        })}
      >
        <p>
          My resume can be{' '}
          <a href={RESUME_URL} target="_blank">
            [viewed here]
          </a>
        </p>
        <p>
          If you would like to reach out to me for any reason, please feel free
          to <Obfuscate email="farismmk@gmail.com">[email me here]</Obfuscate>
        </p>
        <p>
          I can also be reached on Discord at
          <Clipboard
            component="a"
            data-clipboard-text="fae#8390"
            style={{ cursor: 'pointer' }}
            onSuccess={() => this.setState({ copied: true })}
          >
            [fae#8390]
          </Clipboard>
          {this.state.copied && (
            <span className={styles['copied']}> Copied</span>
          )}
        </p>
      </div>
    )
  }
}
