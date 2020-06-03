module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./src'],
          alias: {
            '@components': `./src/components`,
            '@config': `./src/config`,
            '@containers': `./src/containers`,
            '@domain': `./src/domain`,
            '@infra': `./src/infra`,
            '@useCases': `./src/useCases`,
          },
        },
      ],
    ],
  };
};
