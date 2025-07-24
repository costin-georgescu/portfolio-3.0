const sass = require('sass');
const fs = require('fs');
const path = require('path');

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

// Compile each SASS file
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
