import { gql } from '@apollo/client';

export const GET_REPOSITORIES = gql`
  query {
    repositories {
       edges
    { 
      node {
        fullName
        ratingAverage
        reviewCount
        stargazersCount
        forksCount
        ownerAvatarUrl
        description
        language
      }
    } 
    }
  }
`;

export const ME = gql`
query {
  me {
    id
    username
  }
}
`
