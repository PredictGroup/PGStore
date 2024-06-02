module.exports = {
  project: {
    ios: {},
    android: {}, // grouped into "project"
  },
  assets: ["./fonts/", "./images/"], // stays the same
  dependencies: {
    'expo-file-system': {
      platforms: {
        android: null,
      },
    },
  },
};
