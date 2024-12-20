import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from '../graqhql/queries';
const useRepositories = () => {
  const { data, loading, error, refetch } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network',
  });

  if (error) {
    console.error("Error fetching repositories:", error);
  }

  const repositories = data?.repositories;
  if (error) {
    console.log(error)
  }

  return { repositories, loading, refetch };
};

export default useRepositories;
