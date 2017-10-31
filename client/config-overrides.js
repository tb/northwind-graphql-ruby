// based on https://github.com/apollographql/graphql-tag/issues/77
// see also https://github.com/tkvw/react-app-rewire-graphql-tag/pull/1
function rewireGraphQLTag(config, env) {
  const gqlExtension = /\.(graphql|gql)$/;

  const flatten = array =>
    array.reduce((a, b) => a.concat(Array.isArray(b) ? flatten(b) : b), []);

  const fileLoader = flatten(
    config.module.rules.map(rule => rule.oneOf || rule)
  ).find(rule => rule.loader && rule.loader.indexOf("file-loader") !== -1);

  fileLoader && fileLoader.exclude.push(gqlExtension);

  const gqlTagRule = {
    test: gqlExtension,
    loader: "graphql-tag/loader",
    exclude: /node_modules/
  };
  config.module.rules.push(gqlTagRule);

  return config;
}

module.exports = function override(config, env) {
  rewireGraphQLTag(config, env);
  return config;
};
