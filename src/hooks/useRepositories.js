import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from '../graqhql/queries';

const useRepositories = (variables) => {
  const { data, loading, error, refetch, fetchMore, ...result } = useQuery(GET_REPOSITORIES, {
    variables,
    fetchPolicy: 'cache-and-network',
  });

  if (error) {
    console.error("Error fetching repositories:", error);
  }

  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.repositories.pageInfo.hasNextPage

    if (!canFetchMore) {
      return
    }

    fetchMore({
      variables: {
        after: data.repositories.pageInfo.endCursor,
        ...variables
      }
    })
  }
  const repositories = data ? data.repositories : undefined

  return {
    repositories,
    fetchMore: handleFetchMore,
    loading,
    error,
    refetch,
    ...result
  };
};

export default useRepositories;
