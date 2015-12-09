'use strict';

let gulp = require( 'gulp' );
let karma = require( 'karma' ).server;
let jshint = require( 'gulp-jshint' );
let concat = require( 'gulp-concat' );
let uglify = require( 'gulp-uglify' );
let header = require( 'gulp-header' );
let jscs = require( 'gulp-jscs' );
let plato = require( 'plato' );
let exec = require( 'child_process' ).exec;
let pkg = require( './package.json' );

let coreFiles = 'src/**/*.js';
let allFiles = '{test,src}/**/*.js';

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
      let ERROR_CODE = 1;
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
  karma.start({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }, done );
});

gulp.task( 'webserver', done => {
  require( './api/app' );
  exec( 'pkill -9 python && python -m SimpleHTTPServer 9001', () => {
    console.log( 'Server listen on port 9001' );
    done();
  });
});

gulp.task( 'watch', [ 'test', 'lint' ], () => {
  gulp.watch( '{test,src}/**/*.js', [ 'test', 'lint' ]);
});

gulp.task( 'plato', done => {
  let files = [ coreFiles ];
  let outputDir = './plato';
  let options = { title: '#Ajax' };
  function callback( report ) { done(); };
  plato.inspect( files, outputDir, options, callback );
});

gulp.task( 'deploy', done => {
  console.log( 'Deploying...' );
  let date = new Date( Date.now() );
  let commands = [
    'gulp uglify',
    'git add .',
    'git commit -m "Minifying"',
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
    'git checkout dev'
  ];
  exec( commands.join( ' && ' ), ( err, stdout, stderr ) => {
    console.log( 'Done!' );
    if( stdout ) console.log( 'STDOUT:', stdout );
    if( stderr ) console.log( 'STDERR:', stderr );
    if( err ) console.log( 'ERROR:', err );
    process.exit(1);
    done();
  });
});

gulp.task( 'default', [ 'webserver', 'watch' ]);
