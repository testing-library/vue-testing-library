module.exports = {
  sourceType: 'module',
  plugins: [
    // Fixes for loose issue from https://github.com/rails/webpacker/issues/3008
    ['@babel/plugin-proposal-class-properties', {loose: true}],
    ['@babel/plugin-proposal-private-methods', {loose: true}],
    ['@babel/plugin-proposal-private-property-in-object', {loose: true}],
  ],
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current',
          esmodules: true,
        },
      },
    ],
  ],
}
