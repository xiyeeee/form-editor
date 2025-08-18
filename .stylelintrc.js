module.exports = {
  extends: require.resolve('umi/stylelint'),
  rules: {
    // 自定义样式规则
    'selector-class-pattern': null,
    'no-descending-specificity': null,
  },
};