import React from "react";
import { Link, graphql } from "gatsby";
import Img from "gatsby-image";
import Layout from "../components/layout";

const postTemplate = ({ data }) => {
  return (
    <Layout>
      <h1>{data.strapiPost.title}</h1>
      <p>
        by{" "}
        <Link to={`/authors/User_${data.strapiPost.author.id}`}>
          {data.strapiPost.author.username}
        </Link>
      </p>
      <Img fixed={data.strapiPost.image.childImageSharp.fixed} />
      <p>{data.strapiPost.content}</p>
    </Layout>
  );
};

export default postTemplate;

export const query = graphql`
  query PostTemplate($slug: String!) {
    strapiPost(slug: { eq: $slug }) {
      title
      content
      image {
        childImageSharp {
          fixed(width: 200, height: 125) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      author {
        id
        username
      }
    }
  }
`;
