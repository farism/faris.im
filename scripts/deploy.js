const execa = require('execa')
const path = require('path')

const TMP = 'gh-pages-tmp'

async function deploy() {
  console.log('Starting deployment...\n')

  try {
    const cwd = path.resolve(process.cwd(), TMP)
    const opts = { cwd, stdio: 'inherit' }

    const origin = await execa('git', ['config', 'remote.origin.url'])

    console.log(`Using origin: ${origin.stdout}\n`)

    console.log(`Creating temp folder at: ./${TMP}\n`)

    await execa('rm', ['-rf', TMP])
    await execa('mkdir', ['-p', TMP])
    await execa('git', ['init'], opts)
    await execa('git', ['remote', 'add', 'origin', origin.stdout], opts)
    await execa('git', ['fetch', 'origin', 'gh-pages'], opts)
    await execa('git', ['checkout', 'gh-pages'], opts)
    await execa('rm', ['-f', 'main.*.js'], opts)
    await execa('cp', ['-a', '../dist/.', '.'], opts)
    await execa('git', ['add', '--all'], opts)
    try {
      await execa('git', ['commit', '-m', '"Publish to gh-pages"'], { cwd })
    } catch (e) {}
    await execa('git', ['push', '--quiet', 'origin', 'gh-pages'], opts)
    await execa('rm', ['-rf', TMP])
  } catch (e) {
    console.log('Failed deployment!')
    console.error(e)
    return
  }

  console.log('Finished deployment!')
}

deploy()
