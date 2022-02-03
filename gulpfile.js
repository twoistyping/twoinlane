// Load package variables to be used below. These are imported in package.json.
var autoprefixer = require('gulp-autoprefixer');
var babel = require('gulp-babel');
var gulp = require('gulp');
var pump = require('pump');
var sass = require('gulp-sass')(require('sass'));
var sourcemaps = require('gulp-sourcemaps');
var terser = require('gulp-terser');


// Styling function
gulp.task('styles', function (cb) { // Defines a gulp task with the name 'styles'.
    pump([ // Pump is just a package that allows for cleaner function chaining.
        gulp.src('./sass/**/*.scss'), // Defines where the SASS is coming from.
        sourcemaps.init(), // Before we compile, start tracking the sourcemaps.
        sass().on('error', sass.logError), // Run the SASS compilation, and log any errors that come up.
        autoprefixer([ "last 1 version", "> 1%", "IE 10" ]), // Prefix any CSS declarations with their appropriate older versions.
        sourcemaps.write(), // Write the tracked sourcemaps now that compilation has finished.
        gulp.dest('./css') // Write the compiled CSS file to a destination folder.
      ],
      cb // Callback promise variable for gulp task that signals completion.
    );
});

// Styling watch function
gulp.task('styles:watch', function () { // Defines a task named 'styles:watch'.
  // Starts the watch function, with the path of the files to watch, and on change run the 'styles' task.
  return gulp.watch('./sass/**/*.scss', gulp.series('styles'));
});


// Script compression function
gulp.task('compress', function (cb) {
  pump([
      gulp.src('./js/*.js'), // Define where the JS is coming from.
      babel(), // Run the JS through babel to be compiled down.
      terser(), // Minify the JS.
      gulp.dest('./js/min') // Place it into a destination folder.
    ],
    cb
  );
});

gulp.task('compress:watch', function () {
  // Starts the watch function, with the path of the files to watch, and on change run the 'compress' task.
  return gulp.watch('./js/*.js', gulp.series('compress'));
});


// Watch parent task.
// This will create a single 'watch' command that will run the 'styles:watch' and 'compress:watch' commands in parallel.
gulp.task('watch', gulp.parallel('styles:watch', 'compress:watch'));

// Build without watch
// This defines a 'build' task that will run 'styles' followed by 'compress'.
gulp.task('build', gulp.series('styles', 'compress'));

// Default task
// This task will run when you run just 'gulp'.
gulp.task('default', gulp.series('styles', 'compress', 'watch'));
