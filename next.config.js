const withImages = require('next-images');

module.exports = withImages({
  webpack(config, options) {
    config.module.rules.push({
      test: /\.svg$/,
      use: [
        {
          loader: 'svg-react-loader',
          options: {
            jsx: true,
          },
        },
      ],
    });

    return config;
  },
  reactStrictMode: false,
});
