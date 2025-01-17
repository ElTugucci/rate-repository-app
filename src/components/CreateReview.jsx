import Text from './Text';
import {
  TextInput, View, Pressable, StyleSheet
} from 'react-native';
import { useFormik } from 'formik';
import theme from '../theme';
import * as yup from 'yup';
import { useNavigate } from 'react-router-native';
import { useAddReview } from '../hooks/useAddReview';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 20,
  },
  input: {
    width: '100%',
    height: 50,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    fontSize: 16,
  },
  button: {
    backgroundColor: theme.colors.label,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    width: '100%',
  },
  buttonText: {
    color: theme.colors.textContrast,
    fontSize: 18,
    fontWeight: 'bold',
  },
});

const initialValues = {
  ownerName: '',
  repositoryName: '',
  rating: 0,
  review: ''
};

const validationSchema = yup.object({
  ownerName: yup.string().required('Repository owner name is required'),
  repositoryName: yup.string().required('Repository name is required'),
  rating: yup.number().positive().integer()
    .min(0, 'Rating cannot be less than 0')
    .max(100, 'Rating cannot be more than 100')
    .required('Rating is required')
});

export const CreateReviewForm = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Repository owner name"
        value={formik.values.ownerName}
        onChangeText={formik.handleChange('ownerName')}
      />
      {formik.touched.ownerName && formik.errors.ownerName && (
        <Text style={{ color: '#d73a4a' }}>{formik.errors.ownerName}</Text>
      )}


      <TextInput
        style={styles.input}
        placeholder="Repository name"
        value={formik.values.repositoryName}
        onChangeText={formik.handleChange('repositoryName')}
      />
      {formik.touched.repositoryName && formik.errors.repositoryName && (
        <Text style={{ color: '#d73a4a' }}>{formik.errors.repositoryName}</Text>
      )}

      <TextInput
        style={styles.input}
        placeholder="Rating between 1 and 100"
        value={formik.values.rating}
        onChangeText={formik.handleChange('rating')}
      />
      {formik.touched.rating && formik.errors.rating && (
        <Text style={{ color: '#d73a4a' }}>{formik.errors.rating}</Text>
      )}

      <TextInput
        style={styles.input}
        placeholder="Review"
        value={formik.values.review}
        onChangeText={formik.handleChange('review')}
        multiline={true}
      />
      {formik.touched.review && formik.errors.review && (
        <Text style={{ color: '#d73a4a' }}>{formik.errors.review}</Text>
      )}

      <Pressable testID='submitButton' style={styles.button} onPress={formik.handleSubmit}>
        <Text style={styles.buttonText}>Create Review</Text>
      </Pressable>
    </View>
  );
};
const CreateReview = () => {
  const [createReview] = useAddReview()
  const navigate = useNavigate()

  const onSubmit = async (values) => {
    const { repositoryName, ownerName, rating, review } = values
    try {
      const { data } = await createReview({ ownerName, repositoryName, review, rating })
      navigate('/')
      console.log(data)
    } catch (e) {
      console.log(e)
    }
  };

  return <CreateReviewForm onSubmit={onSubmit} ></CreateReviewForm>
};

export default CreateReview
