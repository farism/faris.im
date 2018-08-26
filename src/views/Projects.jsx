import React from 'react'
import cx from 'classnames'

import styles from '../styles/projects.scss'

const projects = [
  {
    name: 'faris.im',
    url: '',
    repo: 'faris.im',
    description: "You're looking at it!",
  },
  {
    name: 'stylegator',
    url: 'https://farism.github.io/stylegator/latest/#/',
    repo: 'stylegator',
    description:
      'Stylegator is a tool for creating static documentation sites with live editing of HTML and React. the documentation site for Stylegator is actually built with Stylegator, check it out!',
  },
  {
    name: 'elm-factory',
    url: 'http://elm-factory.io',
    repo: 'elm-factory',
    description:
      'A build and wrapper around elm-reactor, adding livereload support and a build mode with css extract and cache busting.',
  },
  {
    name: 'daoc discord bot',
    url:
      'https://discordapp.com/oauth2/authorize?client_id=273965527297163264&scope=bot&permissions=0',
    repo: 'daoc-discord-bot',
    description: 'a discord bot for the mmorpg Dark Age of Camelot.',
  },
  {
    name: 'prop-types-docs',
    url: 'https://www.npmjs.com/package/prop-types-docs',
    repo: 'prop-types-docs',
    description: 'document your React prop types.',
  },
  {
    name: 'mori-prop-types',
    url: 'https://www.npmjs.com/package/react-mori-proptypes',
    repo: 'react-mori-proptypes',
    description: 'use prop-types with Morijs immutable library.',
  },
  {
    name: 'lerna-git-flow-deploy',
    url: 'https://www.npmjs.com/package/lerna-git-flow-deploy',
    repo: 'lerna-git-flow-deploy',
    description: 'use lerna and lerna-changelog to autopublish a monorepo.',
  },
  {
    name: 'lerna-changelog-helpers',
    url: 'https://www.npmjs.com/package/lerna-changelog-helpers',
    repo: '',
    description: 'a helper cli for lerna-changelog, adds a couple features.',
  },
  {
    name: 'daoc spellcraft',
    url: '',
    repo: '',
    description:
      'a tool for planning a character gear template in the mmorpg Dark Age of Camelot.',
  },
  {
    name: 'graffold',
    url: '',
    repo: 'graffold',
    description:
      'crawl a ruby model graph to generate GraphQL types, using the graphql-ruby gem',
  },
  {
    name: 'pgschema-to-graphql',
    url: '',
    repo: 'pgschema-to-graphql',
    description:
      'reflect on a postgres schema to generate types using a templating engine',
  },
  {
    name: 'gulp-elm-find-dependencies',
    url: 'https://www.npmjs.com/package/gulp-elm-find-dependencies',
    repo: 'gulp-elm-find-dependencies',
    description: 'gulp plugin crawling elm dependencies from an entry module',
  },
  {
    name: 'gulp-elm-css',
    url: 'gulp-elm-css',
    repo: 'https://www.npmjs.com/package/gulp-elm-css',
    description: 'gulp plugin for extracting css using elm-css',
  },
  {
    name: 'gulp-elm-extract-assets',
    url: 'https://www.npmjs.com/package/gulp-elm-extract-assets',
    repo: 'gulp-elm-extract-assets',
    description: 'gulp plugin for extracting assets from an entry module',
  },
  {
    name: 'gulp-any-template',
    url: 'https://www.npmjs.com/package/gulp-any-template',
    repo: 'gulp-any-template',
    description: '',
  },
  {
    name: 'gulp-elm-basic',
    url: 'https://www.npmjs.com/package/gulp-elm-basic',
    repo: 'gulp-elm-basic',
    description: 'super simple gulp wrapper around elm',
  },
  {
    name: 'pony-ecs',
    url: '',
    repo: 'pony-ecs',
    description:
      'messing with Pony-lang to build a simple entity component system',
  },
  {
    name: 'elixir-ecs',
    url: '',
    repo: '',
    description:
      'messing with Elixir lang to build a simple entity component system library',
  },
]

export default ({ isTransitioning }) => (
  <div
    className={cx(styles['projects'], {
      [styles['transitioning']]: isTransitioning,
    })}
  >
    <div className={styles['content']}>
      <div className={styles['copy']}>
        <p>
          when trying to learn some new
          technologies/frameworks/libraries/whatever, imho the most fun way (and
          thus the best way!) is to try out a little project
        </p>
        <p>
          i like to dabble with things all the time. once in a great while it
          culminates an a useful tool. but most of the time it doesn't :)
        </p>
        <p>
          the following is a list of some of the projects i have played with
          over the years; some are completed and being used in production
          applications. others were just for fun and academic only.
        </p>
      </div>
      <ul>
        {projects.map(project => (
          <li>
            <div className={styles['title']}>
              <h2>{project.name}</h2>
              <div className={styles['links']}>
                {project.url && (
                  <a href={project.url} target="_blank">
                    [visit site]
                  </a>
                )}
                {project.repo && (
                  <a
                    href={`https://github.com/farism/${project.repo}`}
                    target="_blank"
                  >
                    [view source]
                  </a>
                )}
              </div>
            </div>
            <p>{project.description}</p>
          </li>
        ))}
      </ul>
    </div>
  </div>
)
