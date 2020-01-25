import React from "react"
import { Link, graphql } from "gatsby"
import Img from "gatsby-image"

import Layout from "../components/layout"
import SEO from "../components/seo"

const IndexPage = ({ data }) => (
  <Layout>
    <SEO title="Home" />
    <ul>
      {data.allStrapiPost.edges.map(post => (
        <li key={post.node.id}>
          <h2>
            <Link to={`/${post.node.id}`}>{post.node.title}</Link>
          </h2>
          <p>{post.node.content.slice(0, 220)} ...</p>
          <Img
            fixed={post.node.image.childImageSharp.fixed}
            alt={post.node.title}
          />
        </li>
      ))}
    </ul>
  </Layout>
)

export default IndexPage

export const pageQuery = graphql`
  query indexQuery {
    allStrapiPost {
      edges {
        node {
          id
          title
          content
          image {
            childImageSharp {
              fixed(width: 200, height: 125) {
                ...GatsbyImageSharpFixed
              }
            }
          }
        }
      }
    }
  }
`
