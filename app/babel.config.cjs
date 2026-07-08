module.exports = {
  env: {
    development: {
      presets: [
        ['@babel/preset-env', { modules: false, targets: { esmodules: true } }],
        '@babel/preset-react',
      ],
      compact: false,
    },
    production: {
      presets: [
        ['@babel/preset-env', { modules: false, targets: { esmodules: true } }],
        '@babel/preset-react',
      ],
      compact: true,
    },
  },
}
