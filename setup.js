/**
 * Simple setup script to be executed after degit finished cloning
 * Note: Shell commands, Writing files manually should be avoided.
 */
const path = require('path')
const fs = require('fs')
const sync = require('child_process').execSync

/**
 * Last portion of working directory...
 */
const cwd = path.join(__dirname)
const name = cwd.split(path.sep).pop()

const fromRoot = file => path.join(cwd, file)

/**
 * Write a README.md file
 */
fs.writeFileSync(
  fromRoot('README.md'),
  `#${name}\n\nThis project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).\n\n`,
  'utf-8'
)

/**
 * ReWrite a package.json file
 * Change package name and remove devDependencies while re-writing
 */
const pkg = require('./package.json')
pkg.name = name
const deps = Object.keys(pkg.dependencies).join(' ')
const devDeps = Object.keys(pkg.devDependencies).join(' ')
delete pkg.dependencies
delete pkg.devDependencies
fs.writeFileSync(fromRoot('package.json'), JSON.stringify(pkg, null, '  ') + '\n', 'utf-8')

/**
 * Remove Files and Self destruct
 */
const files = ['yarn.lock', 'setup.js', '.gitignore', '.prettierrc']
files.forEach(file => fs.unlinkSync(fromRoot(file)))

/**
 * Add latest devDependencies and initialize git repo
 */
const commands = [`yarn add ${deps}`, `yarn add --dev ${devDeps}`, 'git add .', 'git commit -am "first commit"']
commands.forEach(command => {
  console.log(`----- Executing Command -----> ${command}`)
  sync(command, { stdio: [0, 1, 2] })
})
