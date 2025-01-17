import { gql } from '@apollo/client';

export const SIGN_IN = gql`
  mutation signIn($username: String!, $password: String!) {
    authenticate(credentials: { username: $username, password: $password }) {
      accessToken
    }
  }
`;

export const SIGN_UP = gql`
mutation signUp($username: String!, $password: String!) {
    createUser(user: {username: $username, password: $password }) {
      username
  }
}
`

export const CREATE_REVIEW = gql`
mutation CreateReview($input: CreateReviewInput) {
  createReview(review: $input){
    repositoryId
  }
}
`

export const DELETE_REVIEW = gql`
mutation DeleteReview($deleteReviewId: ID!) {
  deleteReview(id: $deleteReviewId)
}
`
