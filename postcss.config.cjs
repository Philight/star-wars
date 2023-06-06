module.exports = {
  plugins: [
    require('postcss-import'),
//    require('postcss-initial'),
//    require('postcss-url'),
    require("postcss-normalize"),
    require('postcss-preset-env')({
      browsers: 'last 2 versions',
//      stage: 0,
      stage: 1,
    }),
    require('postcss-mixins'),
    require('postcss-simple-vars'),
    require('postcss-nested'),
  	require('autoprefixer'),
  ],
};