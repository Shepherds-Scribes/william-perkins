module.exports = function (eleventyConfig) {
    eleventyConfig.addPassthroughCopy("src/_assets");
    eleventyConfig.addPassthroughCopy({ "src/_github": "/" });
    eleventyConfig.addPassthroughCopy({ "node_modules/@fortawesome/fontawesome-free/css/all.min.css": "_assets/css/fontawesome.css" });
    eleventyConfig.addPassthroughCopy({ "node_modules/@fortawesome/fontawesome-free/webfonts": "_assets/webfonts" });
    eleventyConfig.setUseGitIgnore(false);

    return {
        markdownTemplateEngine: 'njk',
        dir: {
            input: 'src',
            output: '../dist'
        }
    }
};