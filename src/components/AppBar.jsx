import { View, StyleSheet, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import theme from '../theme';
import Text from './Text';
import { Link } from 'react-router-native';

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
    color: theme.colors.textContrast
  },
  link: {
    marginHorizontal: 10,
  }
});

const AppBar = () => {
  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <Link style={styles.link} to="/">
          <Text style={styles.text}>Repositories</Text>
        </Link>
        <Link style={styles.link} to="/signin" >
          <Text style={styles.text}>Sign-In</Text>
        </Link>
      </ScrollView>
    </View >
  );
};

export default AppBar;
