const gulp = require("gulp");
const { exec } = require("child_process");
const del = require("del");

// Clean the output directory
function clean() {
  return del(["dist/**", "!dist"]);
}

// Build the React application using react-scripts
function buildClient() {
  return exec("npm run build --prefix client", (err, stdout, stderr) => {
    console.log(stdout);
    console.error(stderr);
  });
}

// Copy server files to the dist folder
function buildServer() {
  return gulp
    .src(["server/**/*", "!server/**/*.test.js", "!server/node_modules/**"], {
      nodir: true,
    })
    .pipe(gulp.dest("dist/server"));
}

// Copy client build to dist folder
function copyClient() {
  return gulp.src("client/build/**/*").pipe(gulp.dest("dist/client"));
}

// Define complex tasks
const build = gulp.series(
  clean,
  buildClient,
  gulp.parallel(buildServer, copyClient)
);

// Export tasks
exports.clean = clean;
exports.buildClient = buildClient;
exports.buildServer = buildServer;
exports.copyClient = copyClient;
exports.build = build;
exports.default = build;
