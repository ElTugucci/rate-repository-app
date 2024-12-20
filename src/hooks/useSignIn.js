import { useApolloClient, useMutation } from "@apollo/client"
import { SIGN_IN } from "../graqhql/mutations"
import { useContext } from "react"
import AuthStorageContext from "../contexts/AuthStorageContext"

export const useSignIn = () => {
  const authStorage = useContext(AuthStorageContext)
  const [mutate, result] = useMutation(SIGN_IN)

  const apolloClient = useApolloClient()
  const signIn = async ({ username, password }) => {
    try {
      const { data } = await mutate({
        variables: { username, password },
      });
      const accessToken = data?.authenticate?.accessToken

      authStorage.setAccessToken(accessToken)
      apolloClient.resetStore();

      return accessToken
    } catch (error) {
      console.error('Error signing in:', error);
      throw error;
    }
  };

  return [signIn, result]
}

