'use strict'

const fs = require('fs')
const gulp = require('gulp')
const Server = require('karma').Server
const concat = require('gulp-concat')
const uglify = require('gulp-uglify')
const header = require('gulp-header')
const standard = require('gulp-standardize')
const plato = require('plato')
const exec = require('child_process').exec
const pkg = require('./package.json')

const coreFiles = 'src/**/*.js'
const allFiles = '{test,src}/**/*.js'

const banner = () => {
  return [
    '/**!',
    ' * <%= pkg.name.replace("@fdaciuk/", "") %> - v<%= pkg.version %>',
    ' * <%= pkg.description %>',
    ' * <%= pkg.homepage %>',
    '',
    ' * <%= new Date( Date.now() ) %>',
    ' * <%= pkg.license %> (c) <%= pkg.author %>',
    '*/',
    ''
  ].join('\n')
}

gulp.task('lint', () => {
  gulp.src(allFiles)
    .pipe(standard())
    .pipe(standard.reporter('snazzy'))
    .pipe(standard.reporter('fail'))
})

gulp.task('uglify', () => {
  gulp.src(coreFiles)
    .pipe(concat('ajax.min.js'))
    .pipe(uglify())
    .pipe(header(banner(), { pkg: pkg }))
    .pipe(gulp.dest('./dist'))
})

gulp.task('test', done => {
  const server = new Server({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }, done)
  server.start()
})

gulp.task('webserver', done => {
  exec('lsof -t -i tcp:3000 | xargs kill && lsof -t -i tcp:9001 | xargs kill', () => {
    require('./api/app')
    exec('python -m SimpleHTTPServer 9001', () => {
      console.log('Server listen on port 9001')
      done()
    })
  })
})

gulp.task('watch', [ 'test', 'lint' ], () => {
  gulp.watch(allFiles, [ 'test', 'lint' ])
})

gulp.task('plato', done => {
  const files = [ coreFiles ]
  const outputDir = './plato'
  const options = { title: '#Ajax' }
  const callback = (report) => done()
  plato.inspect(files, outputDir, options, callback)
})

gulp.task('update-readme', (done) => {
  fs.readFile('README.md', 'utf8', (err, file) => {
    const updateVersion = file.split('\n').reduce((acc, line) => {
      const versionLine = line.includes('//cdn.rawgit.com/fdaciuk/ajax')
      let newLine = line
      if (versionLine) {
        newLine = line.replace(/\/v([\d.]+)\//, `/v${pkg.version}/`)
      }
      return acc.concat(newLine)
    }, [])

    fs.writeFile('README.md', updateVersion.join('\n'), done)
  })
})

gulp.task('deploy', done => {
  const date = new Date(Date.now())
  const execCommand = (command, message) => {
    console.log(`- ${message}`)
    return new Promise((resolve, reject) => {
      exec(command.join(' && '), (err, stdout, stderr) => {
        if (err) return reject(err)
        return resolve(stdout)
      })
    })
  }

  const syncRepository = [
    'git pull origin dev --force'
  ]
  const createNewVersion = [
    'gulp update-readme',
    'gulp uglify',
    'git add .',
    'git commit -m "Minifying"',
    'git tag -f v' + pkg.version
  ]
  const generateReports = [
    'gulp plato',
    'rm -rf .tmp',
    'mkdir .tmp',
    'cd .tmp',
    'git clone git@github.com:reportz/ajax.git ./',
    'cp -R ../coverage ../plato ./',
    'git add -A',
    'git commit -m "Update reports at ' + date + ' "',
    'git push origin gh-pages',
    'cd ../',
    'rm -rf .tmp'
  ]
  const updateMainBranch = [
    'git checkout master',
    'git merge dev',
    'git push origin master --tags'
  ]
  const updateDevBranch = [
    'git checkout dev',
    'git push origin dev --tags'
  ]
  const npmPublish = [
    'npm run pub'
  ]

  execCommand(syncRepository, 'Sync repository...')
    .then(() => execCommand(createNewVersion, 'Create new Version...'))
    .then(() => execCommand(generateReports, 'Generate reports...'))
    .then(() => execCommand(updateMainBranch, 'Update master branch...'))
    .then(() => execCommand(updateDevBranch, 'Update dev branch...'))
    .then(() => execCommand(npmPublish, 'Publish on NPM...'))
    .then(() => {
      console.log('Done!')
      process.exit(0)
    })
    .catch((err) => {
      console.log(err)
      process.exit(1)
    })
})

gulp.task('default', [ 'webserver', 'watch' ])
