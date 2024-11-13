module.exports = {
    presets: [
      ['@babel/preset-env', { modules: 'commonjs' }], // Usa CommonJS en lugar de módulos ESM
      '@babel/preset-react',  // Si estás usando React
    ],
  };