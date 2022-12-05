
const plugins = [
  [
    'import',
    {
      libraryName: 'view-design',
      libraryDirectory: 'src/components',
    },
    'view-design',
  ],
  /* [
    'component',
    {
      libraryName: 'element-ui',
      styleLibraryName: 'theme-chalk',
    },
  ], */
];
if (['production', 'prod'].includes(process.env.NODE_ENV)) {
  plugins.push('transform-remove-console');
}

module.exports = {
  // presets: ["@vue/cli-plugin-babel/preset"],
  presets: [
    // web 和 移动端均可访问
    [
      '@vue/app',
      {
        // 目标环境不需要这些多填充，则会自动排除这些多的填充。
        useBuiltIns: 'usage',
        /* polyfills: [
        'es6.promise',
        'es6.symbol',
      ], */
      },
    ],
  ],
  plugins,
};
