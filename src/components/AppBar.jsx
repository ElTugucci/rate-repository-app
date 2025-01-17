import { View, StyleSheet, ScrollView, Pressable } from 'react-native';
import Constants from 'expo-constants';
import theme from '../theme';
import Text from './Text';
import { Link } from 'react-router-native';
import { useQuery, useApolloClient } from '@apollo/client';
import { ME } from '../graqhql/queries';
import { useContext } from "react";
import AuthStorageContext from "../contexts/AuthStorageContext";

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.secondary,
    opacity: 0.8,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  text: {
    fontWeight: theme.fontWeights.bold,
    fontSize: theme.fontSizes.subheading,
    color: theme.colors.textContrast,
  },
  link: {
    marginHorizontal: 10,
  },
});

const AppBar = () => {
  const { data } = useQuery(ME, {
    fetchPolicy: 'cache-and-network',
  });

  const authStorage = useContext(AuthStorageContext);
  const apolloClient = useApolloClient();

  const signOut = async () => {
    try {
      await authStorage.removeAccessToken();
      await apolloClient.resetStore();
      console.log('Signed out successfully');
    } catch (error) {
      console.error('Error during sign-out:', error);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <Link style={styles.link} to="/">
          <Text style={styles.text}>Repositories</Text>
        </Link>
        {data?.me?.id ? (

          <ScrollView horizontal>

            <Link to='/createReview'>
              <Text style={styles.text}>Create a review</Text>
            </Link>

            <Link to='/myreviews'>
              <Text style={styles.text}>My Reviews</Text>
            </Link>

            <Pressable onPress={signOut} style={styles.link}>
              <Text style={styles.text}>Sign-Out</Text>
            </Pressable>

          </ScrollView>
        ) : (
          <ScrollView horizontal>
            <Link style={styles.link} to="/signin">
              <Text style={styles.text}>Sign-In</Text>
            </Link>
            <Link style={styles.link} to="/signup">
              <Text style={styles.text}>Sign-Up</Text>
            </Link>
          </ScrollView>

        )}
      </ScrollView>
    </View>
  );
};

export default AppBar;
