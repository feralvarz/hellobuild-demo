import { gql } from "graphql-request";

export const viewerRepos = gql`
  query {
    viewer {
      repositories(first: 30) {
        nodes {
          id
          nameWithOwner
          description
          name
          languages(first: 50) {
            totalCount
            nodes {
              name
              color
            }
          }
        }
      }
    }
  }
`;

export const repositoriesByUsername = gql`
  query($username: String!, $count: Int!) {
    user(login: $username) {
      repositories(first: $count) {
        nodes {
          nameWithOwner
          description
          name
          languages(first: 50) {
            nodes {
              name
              color
            }
          }
          stargazers(first: 50) {
            nodes {
              name
            }
          }
        }
      }
    }
  }
`;

export const GET_REPOS = gql`
  query {
    viewer {
      name
      repositories(last: 50) {
        nodes {
          name
        }
      }
    }
  }
`;
