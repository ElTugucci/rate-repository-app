import { useQuery } from "@apollo/client";
import { ME } from "../graqhql/queries";
export const useMyReviews = () => {
  const { loading, error, data, refetch } = useQuery(ME, {
    variables: { includeReviews: true },
  });

  const reviews = data?.me?.reviews?.edges

  return {
    loading,
    error,
    reviews,
    refetch
  };
};

