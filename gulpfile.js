'use strict';

const gulp = require( 'gulp' );
const Server = require( 'karma' ).Server;
const jshint = require( 'gulp-jshint' );
const concat = require( 'gulp-concat' );
const uglify = require( 'gulp-uglify' );
const header = require( 'gulp-header' );
const jscs = require( 'gulp-jscs' );
const plato = require( 'plato' );
const exec = require( 'child_process' ).exec;
const pkg = require( './package.json' );

const coreFiles = 'src/**/*.js';
const allFiles = '{test,src}/**/*.js';

function banner() {
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
  ].join( '\n' );
}

gulp.task( 'lint', () => {
  gulp.src( allFiles )
    .pipe( jshint() )
    .pipe( jshint.reporter( 'default' ) );

  gulp.src( allFiles )
    .pipe( jscs() )
    .on( 'error', err => {
      const ERROR_CODE = 1;
      console.log( err.toString() );
      process.exit( ERROR_CODE );
    });
});

gulp.task( 'uglify', () => {
  gulp.src( coreFiles )
    .pipe( concat( 'ajax.min.js' ) )
    .pipe( uglify() )
    .pipe( header( banner(), { pkg: pkg } ) )
    .pipe( gulp.dest( './dist' ) );
});

gulp.task( 'test', done => {
  const server = new Server({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }, done );
  server.start();
});

gulp.task( 'webserver', done => {
  exec('lsof -t -i tcp:3000 | xargs kill && lsof -t -i tcp:9001 | xargs kill', () => {
    require( './api/app' );
    exec( 'python -m SimpleHTTPServer 9001', () => {
      console.log( 'Server listen on port 9001' );
      done();
    });
  });
});

gulp.task( 'watch', [ 'test', 'lint' ], () => {
  gulp.watch( allFiles, [ 'test', 'lint' ]);
});

gulp.task( 'plato', done => {
  const files = [ coreFiles ];
  const outputDir = './plato';
  const options = { title: '#Ajax' };
  const callback = (report) => done();
  plato.inspect( files, outputDir, options, callback );
});

gulp.task( 'deploy', done => {
  console.log( 'Deploying...' );
  const date = new Date( Date.now() );
  const commands = [
    'gulp uglify',
    'git add .',
    'git commit -m "Minifying"',
    'git tag -f v' + pkg.version,
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
    'rm -rf .tmp',
    'git checkout master',
    'git merge dev',
    'git push origin master --tags',
    'git checkout dev',
    'git push origin dev --tags',
    'npm run pub'
  ];
  exec( commands.join( ' && ' ), ( err, stdout, stderr ) => {
    console.log( 'Done!' );
    if( stdout ) console.log( 'STDOUT:', stdout );
    if( stderr ) console.log( 'STDERR:', stderr );
    if( err ) console.log( 'ERROR:', err );
    process.exit(0);
    done();
  });
});

gulp.task( 'default', [ 'webserver', 'watch' ]);
