import { StyleSheet, View } from 'react-native'
import RepositoryList from './RepositoryList';
import AppBar from './AppBar';
import { Routes, Route, Navigate } from 'react-router-native';
import SignIn from './SignIn';
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
  }
});

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar />
      <Routes>
        <Route path='/' element={<RepositoryList />} />
        <Route path='/' element={<Navigate to='/' />} />
        <Route path='/signin' element={<SignIn />} />
      </Routes>
    </View>
  )
}

export default Main
