/** @type {import("snowpack").SnowpackUserConfig } */
module.exports = {
  mount: {
    src: '/',
    public: '/public/'
  },
  alias: {
    '@': './src'
  },
  plugins: ['@snowpack/plugin-sass']
};
