module.exports = {
  chainWebpack: config => {
    config.plugin("html").tap(args => {
      args[0].title = "Adult Needs and Strengths Assessment (ANSA) V1.0";
      return args;
    });
  }
};
