import React from "react";
import { Link, graphql } from "gatsby";
import Layout from "../components/layout";

const UserTemplate = ({ data }) => (
  <Layout>
    <h1>
      <span style={{ color: "#663399" }}>Author:</span>{" "}
      {data.strapiUser.username}
    </h1>
    <ul>
      {data.strapiUser.posts.map(post => (
        <li key={post.id}>
          <h2>
            <Link to={`/articoli/${post.slug}`}>{post.title}</Link>
          </h2>
          <p>{post.content.slice(0, 220)} ...</p>
        </li>
      ))}
    </ul>
  </Layout>
);

export default UserTemplate;

export const query = graphql`
  query UserTemplate($id: String!) {
    strapiUser(id: { eq: $id }) {
      id
      username
      posts {
        id
        title
        content
        slug
      }
    }
  }
`;
