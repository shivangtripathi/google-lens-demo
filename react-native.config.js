module.exports = {
  project: {
    ios: {},
    android: {},
  },
  assets: [],
  getTransformModulePath() {
    return require.resolve("react-native-typescript-transformer");
  },
  getSourceExts() {
    return ["ts", "tsx"];
  },
};