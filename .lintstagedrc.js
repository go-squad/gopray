const getFileNames = filenames => filenames.map(f => `"${f}"`).join(' ');

module.exports = {
  '*.{js,jsx,ts,tsx}': filenames => `yarn eslint --cache --fix ${getFileNames(filenames)}`,
  '*.{json,css,scss,md,html,yml,yaml,graphql,gql}': filenames =>
    `yarn prettier --write ${getFileNames(filenames)}`
};
