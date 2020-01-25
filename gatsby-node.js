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
  // Get Posts and create pages
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

  // Get Authors and create pages
  const getAuthors = makeRequest(
    graphql,
    `
    {
      allStrapiUser {
        edges {
          node {
            id
          }
        }
      }
    }
    `
  ).then(result => {
    // Create pages for each user.
    result.data.allStrapiUser.edges.forEach(({ node }) => {
      createPage({
        path: `/authors/${node.id}`,
        component: path.resolve(`src/templates/authorTemplate.js`),
        context: {
          id: node.id,
        },
      });
    });
  });

  // Query for posts nodes to use in creating pages.
  return Promise.all([getPosts, getAuthors]);
};
