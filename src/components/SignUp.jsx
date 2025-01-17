import Text from './Text';
import {
  TextInput, View, Pressable, StyleSheet
} from 'react-native';
import { useFormik } from 'formik';
import theme from '../theme';
import * as yup from 'yup';
import { useNavigate } from 'react-router-native';
import { useSignUp } from '../hooks/useSignUp';

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
  username: '',
  password: '',
  passwordConfirmation: ''
};

const validationSchema = yup.object({
  username: yup.string()
    .min(5, 'Username must be at least  5 characters long')
    .max(30, 'Username cannot exceed 30 characters')
    .required('Username is required'),
  password: yup.string()
    .min(5, 'Password must be at least 5 characters long')
    .max(30, 'Password cannot exceed 30 characters')
    .required('Password is required'),
  passwordConfirmation: yup.string()
    .oneOf([yup.ref('password'), null])
    .required('Password confirmation is required'),
});

export const SignUpForm = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <View style={styles.container}>
      <Text> SIGNUP</Text>
      <TextInput
        testID='usernameField'
        style={styles.input}
        placeholder="Username"
        value={formik.values.username}
        onChangeText={formik.handleChange('username')}
      />
      {formik.touched.username && formik.errors.username && (
        <Text style={{ color: '#d73a4a' }}>{formik.errors.username}</Text>
      )}
      <TextInput
        testID='passwordField'
        style={styles.input}
        placeholder="Password"
        secureTextEntry={true}
        value={formik.values.password}
        onChangeText={formik.handleChange('password')}
      />
      {formik.touched.password && formik.errors.password && (
        <Text style={{ color: '#d73a4a' }}>{formik.errors.password}</Text>
      )}
      <TextInput
        testID='passwordConfiramationField'
        style={styles.input}
        placeholder="Password confirmation"
        secureTextEntry={true}
        value={formik.values.passwordConfirmation}
        onChangeText={formik.handleChange('passwordConfirmation')}
      />
      {formik.touched.passwordConfirmation && formik.errors.passwordConfirmation && (
        <Text style={{ color: '#d73a4a' }}>{formik.errors.passwordConfirmation}</Text>
      )}
      <Pressable testID='submitButton' style={styles.button} onPress={formik.handleSubmit}>
        <Text style={styles.buttonText}>Sign In</Text>
      </Pressable>
    </View>
  );
};
const SignUp = () => {
  const [signUp] = useSignUp();
  const navigate = useNavigate()

  const onSubmit = async (values) => {
    const { username, password } = values
    try {
      const { data } = await signUp({ username, password })
      navigate('/')
      console.log(data)
    } catch (e) {
      console.log(e)
    }
  };

  return <SignUpForm onSubmit={onSubmit} ></SignUpForm>
};

export default SignUp

