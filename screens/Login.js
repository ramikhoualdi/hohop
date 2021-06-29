/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import IconFeather from 'react-native-vector-icons/Feather';
import IconEntypo from 'react-native-vector-icons/Entypo';
import { COLORS } from '../constants';
import { useDispatch, useSelector } from 'react-redux';
import { signInUser,resetAllAuthForms } from '../redux/User/user.actions';

const mapState = ({ user }) => ({
  currentUser: user.currentUser,
  signInSuccess: user.signInSuccess,
  errors: user.errors,
});

const Registration = ({navigation}) => {
  const { currentUser, signInSuccess, errors } = useSelector(mapState);
  const dispatch = useDispatch();

  const [email, onChangeEmail] = useState('');
  const [password, onChangepassword] = useState('');
  const [emailErrors, setEmailErrors] = useState('');
  const [passwordErrors, setPasswordErrors] = useState('');
  const [isSecure, setIsSecure] = useState(true);
  const [iconPasswordName, setIconPasswordName] = useState('eye-with-line');
  const [error, setError] = useState([]);

  useEffect(() => {
    if (currentUser){
      navigation.navigate('VerifyAccount');
    }
// eslint-disable-next-line react-hooks/exhaustive-deps
}, [currentUser]);

  useEffect(() => {
    if (signInSuccess){
        ResetForm();
        dispatch(resetAllAuthForms());
        navigation.navigate('Identification');
    }
// eslint-disable-next-line react-hooks/exhaustive-deps
}, [signInSuccess]);

  useEffect(() => {
    if (Array.isArray(errors) && errors.length > 0){
        setError(errors);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [signInSuccess]);

  const ResetForm = () => {
    onChangeEmail('');
    onChangepassword('');
    setIsSecure(true);
    setIconPasswordName('eye');
    setError([]);
  };

  const handlePasswordSecure  = () => {
    setIsSecure(!isSecure);
    if (isSecure){
      setIconPasswordName('eye');
    } else {
      setIconPasswordName('eye-with-line');
    }
  };

  useEffect(() => {
    console.log('From Login ===>', { email, password});
  }, [email, password]);

  const handleRegister = async e => {
    var checking_form = 'true';
    console.log('From Login ===>', { email, password});
    if (email.length === 0 || email.indexOf('@') === -1 ){
      setEmailErrors('* Email Field Required');
      checking_form = 'false';
    } else {
      setEmailErrors('');
    }
    if (password.length < 6) {
      setPasswordErrors('* Password Field Required, 6 caracter min');
      checking_form = 'false';
    } else {
      setPasswordErrors('');
    }
    if ( checking_form === 'true' ){
      dispatch(signInUser({ email, password}));
    }
  };
  const handleForget = () => {
    navigation.navigate('ForgetPassword');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.scrollView}>
        <View
          style={styles.header}
        >
          <IconFeather
            name="arrow-left"
            size={25}
            color={COLORS.main}
            style={styles.icon_style}
            onPress={() => navigation.goBack()}
          />
          <Text
            style={styles.headerTitle}
          >
            Login
          </Text>
        </View>
        <View
          style={styles.content}
        >
          {/* { errors.length > 0 && (
            <View style={styles.errors}>
                {error.map((err, index) => {
                    return (
                        <Text style={styles.error} key={index} >
                            {err}
                        </Text>
                        );
                })};
            </View>
          )} */}
        <View style={styles.inputs} >
            <Text 
              style={styles.error}
            >
              { errors[0] != undefined && errors[0]}
            </Text>
            {/* Email Adresse */}
            <View
              style={styles.inputField}
            >
              <Text
                style={styles.label}
              >
                Email Adresse
              </Text>
                <View style={styles.passwordField}>
                  <TextInput
                    style={styles.input}
                    onChangeText={onChangeEmail}
                    value={email}
                    textContentType="emailAddress"
                  />
                </View>
                <Text
                  style={styles.fieldErrors}
                >
                  {emailErrors}
                </Text>
            </View>
            {/* Password */}
            <View
              style={styles.inputField}
            >
              <Text
                style={styles.label}
              >
                Password
              </Text>
                <View style={styles.passwordField} >
                  <TextInput
                    style={styles.input}
                    onChangeText={onChangepassword}
                    value={password}
                    secureTextEntry={isSecure}
                  />
                  <IconEntypo
                    style={styles.eyeIcon}
                    name={iconPasswordName}
                    fontSize={25}
                    color={COLORS.main}
                    onPress={handlePasswordSecure}
                  />
                </View>
                <Text
                  style={styles.fieldErrors}
                >
                  {passwordErrors}
                </Text>
            </View>
          </View>
        <View style={styles.bottomSection} >
          <TouchableOpacity
              style={styles.button1}
              onPress={handleRegister}
            >
              <Text
                style={styles.signup}
              >Login
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.forget}
              onPress={handleForget}
            >
              <Text
                style={styles.forget}
              >
                Forget Password?
              </Text>
            </TouchableOpacity>
         </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Registration;

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  container: {
    flex: 1,
    color: COLORS.main,
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderBottomColor: COLORS.main,
    paddingVertical: 5,
    marginBottom: 0,
  },
  content: {
    position: 'relative',
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  inputs: {
    margin: 0,
  },
  icon_style: {
    flex: 0.45,
    padding: 10,
  },
  headerTitle: {
    fontSize: 14,
  },
  inputField: {
    paddingTop: 0,
    paddingHorizontal: 5,
    width: '100%',
  },
  fieldErrors: {
    color: 'red',
    fontSize:14,
  },
  label: {
    textAlign: 'left',
    fontSize: 16,
    color: COLORS.main,
    marginVertical:10,
  },
  input: {
    flex: 1,
    borderRadius: 5,
    fontSize:16,
    borderWidth: 0.5,
    color: COLORS.main,
    borderColor: COLORS.main,
    paddingTop:5,
    paddingLeft:20,
  },
  inputPassword: {
    borderBottomWidth: 0,
  },
  passwordField: {
    position: 'relative',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  eyeIcon: {
    position: 'absolute',
    right:20,
    fontSize: 25,
  },
  button1: {
    // position: 'absolute',
    // bottom: 20,
    width: '100%',
  },
  forget: {
    textAlign: 'center',
    fontSize:17,
    color: COLORS.main,
    fontWeight: '500',
  },
  signup: {
    backgroundColor: COLORS.main,
    color: 'white',
    fontSize:16,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    paddingVertical: 10,
    paddingHorizontal: 35,
    borderRadius: 4,
    // marginHorizontal:0,
    marginVertical: 10,
    fontWeight: '600',
    width: 300,
  },
  errors: {
    paddingVertical: 10,
  },
  bottomSection: {
    marginBottom: 20,
  },
  error: {
    color: 'red',
    fontSize: 18,
    fontWeight: '600',
  },
});
