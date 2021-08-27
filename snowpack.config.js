module.exports = {
  mount: {
    public: { url: '/', static: true },
    src: { url: '/' },
  },
  plugins: ['@snowpack/plugin-typescript'],
};
