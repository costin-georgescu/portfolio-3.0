const sass = require('sass');
const fs = require('fs');
const path = require('path');
const chokidar = require('chokidar');

// Ensure the CSS output directory exists
const cssDir = path.join(__dirname, 'src/assets/css');
if (!fs.existsSync(cssDir)) {
  fs.mkdirSync(cssDir, { recursive: true });
}

// SASS files to compile
const sassFiles = [
  { input: 'src/assets/sass/critical.scss', output: 'src/assets/css/critical.css' },
  { input: 'src/assets/sass/local.scss', output: 'src/assets/css/local.css' },
  { input: 'src/assets/sass/root.scss', output: 'src/assets/css/root.css' },
  { input: 'src/assets/sass/about.scss', output: 'src/assets/css/about.css' },
  { input: 'src/assets/sass/blog.scss', output: 'src/assets/css/blog.css' },
  { input: 'src/assets/sass/contact.scss', output: 'src/assets/css/contact.css' },
  { input: 'src/assets/sass/projects.scss', output: 'src/assets/css/projects.css' },
  { input: 'src/assets/sass/reviews.scss', output: 'src/assets/css/reviews.css' }
];

// Function to compile a single SASS file
function compileSassFile(file) {
  const sassFile = sassFiles.find(f => f.input === file || path.resolve(f.input) === path.resolve(file));
  
  if (!sassFile) {
    // Check if it's a partial that might affect other files
    if (path.basename(file).startsWith('_')) {
      console.log(`Partial file changed: ${file}, recompiling all SASS files...`);
      compileAllSassFiles();
      return;
    }
    return;
  }

  try {
    const result = sass.compile(sassFile.input, {
      style: process.env.NODE_ENV === 'production' ? 'compressed' : 'expanded',
      sourceMap: process.env.NODE_ENV !== 'production'
    });
    
    fs.writeFileSync(sassFile.output, result.css);
    console.log(`✅ Compiled ${sassFile.input} → ${sassFile.output}`);
  } catch (error) {
    console.error(`❌ Error compiling ${sassFile.input}:`, error.message);
  }
}

// Function to compile all SASS files
function compileAllSassFiles() {
  sassFiles.forEach(({ input, output }) => {
    try {
      const result = sass.compile(input, {
        style: process.env.NODE_ENV === 'production' ? 'compressed' : 'expanded',
        sourceMap: process.env.NODE_ENV !== 'production'
      });
      
      fs.writeFileSync(output, result.css);
      console.log(`✅ Compiled ${input} → ${output}`);
    } catch (error) {
      console.error(`❌ Error compiling ${input}:`, error.message);
    }
  });
  
  console.log('🎉 SASS compilation complete!');
}

// Initial compilation
compileAllSassFiles();

// Watch for changes if not in production mode
if (process.argv.includes('--watch')) {
  console.log('👀 Watching for SASS changes...');
  
  const watcher = chokidar.watch('src/assets/sass/**/*.scss', {
    persistent: true,
    ignoreInitial: true
  });

  watcher
    .on('change', path => {
      console.log(`File ${path} has been changed`);
      compileSassFile(path);
    })
    .on('add', path => {
      console.log(`File ${path} has been added`);
      compileSassFile(path);
    });
}
