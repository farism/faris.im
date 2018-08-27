import React from 'react'
import cx from 'classnames'

import styles from '../styles/about.scss'

export default ({ isTransitioning }) => (
  <div
    className={cx(styles['about'], {
      [styles['transitioning']]: isTransitioning,
    })}
  >
    <div className={styles['content']}>
      <p>hello, and thank you for visiting my site!</p>
      <p>
        my name is Faris Mustafa, and i am a software engineer. i currently
        reside in Santa Barbara, California. i've been programming for about 10
        years, and have gone through a variety of discipline changes over that
        time frame. i've done everything from frontend actionscript/javascript,
        to mobile android development, to backend ruby and coldfusion. i enjoy
        the whole stack but i definitely spend most of my time on the frontend.
        the first company i worked for was heavy on custom experiences and
        microsites, and i think that gave me an ongoing appreciation and desire
        to try to create smooth web interactions.
      </p>
      <p>
        aside from the career stuff, i am an avid gamer. mostly of the fantasy
        rpg genre. i think video games - and partly the desire to make video
        games - is what got me into programming. hopefully i can make a cool
        multiplayer game one day. i also enjoy standup comedy, tennis and
        basketball, going to the beach, bbqs, and other regular activities.
      </p>
      <p>
        i am currently a sr. frontend engineer at an awesome company called
        Procore Technologies, where we make construction management software.
        let me know if you'd like to apply! of course, all of my opinions are my
        own ;)
      </p>
      <p>
        anyway, this site exists for no other reason that i wanted to reserve
        the domain name and then felt obligated to put something up. please look
        around and maybe something will catch your eye. perhaps i hid some stuff
        to discover. take care!
      </p>
    </div>
  </div>
)
