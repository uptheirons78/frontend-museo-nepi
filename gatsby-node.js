const path = require(`path`);

const makeRequest = (graphql, request) =>
  new Promise((resolve, reject) => {
    // Query for nodes to use in creating pages.
    resolve(
      graphql(request).then(result => {
        if (result.errors) {
          reject(result.errors);
        }

        return result;
      })
    );
  });

// Implement the Gatsby API “createPages”. This is called once the
// data layer is bootstrapped to let plugins create pages from data.
exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions;

  const getPosts = makeRequest(
    graphql,
    `
    {
      allStrapiPost {
        edges {
          node {
            slug
          }
        }
      }
    }
    `
  ).then(result => {
    // Create pages for each article.
    result.data.allStrapiPost.edges.forEach(({ node }) => {
      createPage({
        path: `/articoli/${node.slug}`,
        component: path.resolve(`src/templates/postTemplate.js`),
        context: {
          slug: node.slug,
        },
      });
    });
  });

  // Query for posts nodes to use in creating pages.
  return getPosts;
};
