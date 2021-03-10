import { gql } from "graphql-request";

const viewerRepos = `
query {
  viewer {
    repositories(first: 1) {
      nodes {
        nameWithOwner
        description
        name
        languages(first: 50){
          totalCount
          nodes {
            name
            color
          }

        }
        stargazers(first:50) {
          nodes {
            name
          }
        }
      }
    }
  }
}`;

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
