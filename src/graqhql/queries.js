import { gql } from '@apollo/client';

export const GET_REPOSITORIES = gql`
  query Repositories($orderBy: AllRepositoriesOrderBy, $orderDirection: OrderDirection, $searchKeyword: String, $first: Int, $after: String  ) {
    repositories(orderBy: $orderBy, orderDirection: $orderDirection, searchKeyword: $searchKeyword, after: $after, first: $first) {
    pageInfo {
      endCursor
      startCursor
      hasNextPage
    }
      edges { 
        cursor
        node {
          id
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

export const GET_REPOSITORY_BY_ID = gql`
query GetRepositoryById($id: ID!, $first: Int, $after: String) 
{
    
repository(id: $id)
  {
      id
      fullName
      ratingAverage
      reviewCount
      stargazersCount
      forksCount
      ownerAvatarUrl
      description
      language
      url
    
      reviews (first: $first, after: $after) {
      edges { 
        node {
          id
          text
          rating
          createdAt
          user {
            id
            username
          }
        }
        cursor  
      }
        pageInfo{
          endCursor
          startCursor
          hasNextPage
      }
    }
  }
}
`;

export const ME = gql`
query getCurrentUser($includeReviews: Boolean = false) {
  me {
    id
    username
    reviews @include(if: $includeReviews) {
        edges {
          node {
            id
          text
          rating
          createdAt
          repository {
            fullName
            id
          }
          user {
            id
            username
          }
          }
        }
      }
  }
}
`

