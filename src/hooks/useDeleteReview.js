import { useApolloClient, useMutation } from "@apollo/client";
import { DELETE_REVIEW } from "../graqhql/mutations";

export const useDeleteReview = () => {
  const [mutate, result] = useMutation(DELETE_REVIEW);
  const apolloClient = useApolloClient();

  const deleteReview = async (reviewId) => {
    try {
      const { data } = await mutate({
        variables: { deleteReviewId: reviewId }
      });

      apolloClient.resetStore();
      return data;
    } catch (error) {
      console.log("Error deleting review", error);
      throw error;
    }
  };

  return [deleteReview, result];
};

