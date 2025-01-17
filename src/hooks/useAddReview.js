import { useApolloClient, useMutation } from "@apollo/client"
import { CREATE_REVIEW } from "../graqhql/mutations"

export const useAddReview = () => {
  const [mutate, result] = useMutation(CREATE_REVIEW)
  const apolloClient = useApolloClient()

  const createReview = async ({ ownerName, repositoryName, rating, review }) => {
    const myResult = await mutate({
      variables: {
        "input": {
          "repositoryName": repositoryName,
          "ownerName": ownerName,
          "rating": parseInt(rating),
          "text": review
        }
      }
    })
    apolloClient.resetStore()
    return myResult
  }
  return [createReview, result]
}

