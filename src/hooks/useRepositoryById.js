import { useQuery } from '@apollo/client';
import { GET_REPOSITORY_BY_ID } from '../graqhql/queries';

const useRepositoryById = (variables) => {
  const { data, loading, error, refetch, fetchMore, ...result } = useQuery(GET_REPOSITORY_BY_ID, {
    variables,
    fetchPolicy: 'cache-and-network',
  });

  if (error) {
    console.error("Error fetching repository:", error);
  }

  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.repository.reviews.pageInfo.hasNextPage

    if (!canFetchMore) {
      return
    }

    fetchMore({
      variables: {
        after: data.repository.reviews.pageInfo.endCursor,
        ...variables
      }
    })
  }

  const repository = data?.repository;
  if (error) {
    console.log(error)
  }

  return {
    repository,
    fetchMore: handleFetchMore,
    error,
    ...result,
    loading,
    refetch
  };
};

export default useRepositoryById;
