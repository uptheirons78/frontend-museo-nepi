import React from "react";
import { Link, graphql } from "gatsby";
import Img from "gatsby-image";
import Layout from "../components/layout";
import SEO from "../components/seo";
import ReactMarkdown from "react-markdown";

const postTemplate = ({ data }) => {
  const { title, content, image, author } = data.strapiPost;
  return (
    <Layout>
      <SEO title={title} />
      <Img fluid={image.childImageSharp.fluid} />
      <h1>{title}</h1>
      <p>
        by <Link to={`/authors/User_${author.id}`}>{author.username}</Link>
      </p>
      <ReactMarkdown source={content} />
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
          fluid(maxWidth: 960, maxHeight: 300) {
            ...GatsbyImageSharpFluid
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
