import { StyleSheet, View } from 'react-native'
import AppBar from './AppBar';
import RepositoryList from './RepositoryList'
import { Routes, Route, Navigate } from 'react-router-native';
import SignIn from './SignIn'
import SingleRepositoryView from './SingleRepositoryView'
import CreateReview from './CreateReview';
import SignUp from './SignUp';
import MyReviews from './MyReviews';
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
        <Route path='/:repositoryId' element={<SingleRepositoryView />} />
        <Route path='/createReview' element={<CreateReview />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/myreviews' element={<MyReviews />} />
      </Routes>
    </View>
  )
}

export default Main
