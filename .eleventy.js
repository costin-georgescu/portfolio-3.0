module.exports = function(eleventyConfig) {
  // Copy all assets to the output directory
  eleventyConfig.addPassthroughCopy({
    'src/assets': '/assets',
    'src/admin': '/admin',
    'src/robots.txt': '/robots.txt',
    'src/sitemap.xml': '/sitemap.xml'
  });

  // Watch for changes in these directories
  eleventyConfig.addWatchTarget('./src/assets/');

  // Set the default template engine
  return {
    dir: {
      input: 'src',
      output: 'public',
      includes: '_includes',
      layouts: '_includes/layouts',
      data: '_data'
    },
    templateFormats: ['html', 'njk', 'md', '11ty.js'],
    htmlTemplateEngine: 'njk',
    markdownTemplateEngine: 'njk',
    passthroughFileCopy: true
  };
};
