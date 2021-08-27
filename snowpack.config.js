module.exports = {
  mount: {
    public: { url: '/', static: true },
    src: { url: '/' },
  },
  plugins: ['@snowpack/plugin-typescript'],
  buildOptions: {
    baseUrl: '/meandering',
    out: './docs',
  },
};
