module.exports = {
  chainWebpack: config => {
    config.plugin("html").tap(args => {
      args[0].title = "Assessment Tool and Outcome Measure (ATOM) V1.0";
      return args;
    });
  },
  configureWebpack: {
    devtool: "source-map"
  }
};
