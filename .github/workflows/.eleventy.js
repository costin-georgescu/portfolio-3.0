module.exports = function (eleventyConfig) {
  // Copy all assets to the output directory
  eleventyConfig.addPassthroughCopy('src/assets');

  // You can add other configuration options here

  return {
    dir: {
      input: 'src',
      output: 'public',
      includes: '_includes',
      layouts: '_includes/layouts',
    },
    // This ensures that URLs are relative to the site root
    pathPrefix: process.env.BASE_URL || '/',
    markdownTemplateEngine: 'njk',
    htmlTemplateEngine: 'njk',
  };
};
