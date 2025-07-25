module.exports = function(eleventyConfig) {
  // Ignore blog posts during build
  eleventyConfig.ignores = eleventyConfig.ignores || [];
  if (Array.isArray(eleventyConfig.ignores)) {
    eleventyConfig.ignores.push('src/content/blog/**/*');
  }
  // Copy all assets to the output directory
  eleventyConfig.addPassthroughCopy({
    'src/assets': '/assets',
    'src/admin': '/admin',
    'src/robots.txt': '/robots.txt',
    'src/sitemap.xml': '/sitemap.xml'
  });

  // Watch for changes in these directories
  eleventyConfig.addWatchTarget('./src/assets/');
  
  // Add Sharp Images plugin
  const sharpImages = require('@codestitchofficial/eleventy-plugin-sharp-images');
  eleventyConfig.addPlugin(sharpImages);

  // Add postDate filter for formatting dates
  eleventyConfig.addFilter('postDate', (dateObj) => {
    return new Date(dateObj).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  });

  // Add sitemap plugin
  const sitemap = require('@quasibit/eleventy-plugin-sitemap');
  eleventyConfig.addPlugin(sitemap, {
    sitemap: {
      hostname: 'https://costin-georgescu.github.io/portfolio-3.0/',
    },
  });

  // Add isoDate filter for ISO date formatting in structured data
  eleventyConfig.addFilter('isoDate', (dateObj) => {
    return new Date(dateObj).toISOString();
  });

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
    dataTemplateEngine: 'njk',
    passthroughFileCopy: true,
    pathPrefix: '/' // Remove the portfolio-3.0 prefix to fix 404 errors
  };
};
