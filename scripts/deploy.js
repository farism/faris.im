const { exec } = require('execa-pro')
const path = require('path')

async function deploy() {
  console.log('Starting deployment...\n')

  try {
    const origincmd = await exec('git config remote.origin.url')
    const origin = origincmd[0].stdout

    console.log(`Using origin: ${origin}\n`)

    console.log(`Creating temp folder at: ./gh-pages-branch\n`)

    await exec(['pwd', 'mkdir -p gh-pages-branch'], {
      stdio: 'inherit',
    })

    await exec(
      [
        'git init',
        `git remote add --fetch origin ${origin}`,
        'git checkout --orphan gh-pages',
        'cp -a ../dist/. .',
        'cp -a ../src/404.html .',
        'git add --all',
        'git commit --allow-empty -m "Publish to GitHub pages [ci skip]"',
        'git push --force --quiet origin gh-pages',
      ],
      {
        stdio: 'inherit',
        cwd: path.resolve(process.cwd(), 'gh-pages-branch'),
      }
    )

    // await exec('rm -rf gh-pages-branch')
  } catch (e) {
    console.log('Failed deployment!')
    console.error(e)
    return
  }

  console.log('Finished deployment!')
}

deploy()
