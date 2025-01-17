import { useApolloClient, useMutation } from "@apollo/client"
import { SIGN_UP } from "../graqhql/mutations"

export const useSignUp = () => {
  const [mutate, result] = useMutation(SIGN_UP)

  const apolloClient = useApolloClient()
  const signUp = async ({ username, password }) => {
    try {
      const { data } = await mutate({
        variables: { username, password },
      });

      apolloClient.resetStore();
      return data

    } catch (error) {
      console.error('Error signing up:', error);
      throw error;
    }
  };

  return [signUp, result]
}

