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
import { COLORS } from '../constants';
import { useDispatch, useSelector } from 'react-redux';
import { signInUser,resetAllAuthForms } from '../redux/User/user.actions';
import auth from '@react-native-firebase/auth';

const mapState = ({ user }) => ({
  currentUser: user.currentUser,
  signInSuccess: user.signInSuccess,
});

const ForgetPassword = ({navigation}) => {
  const { currentUser, signInSuccess } = useSelector(mapState);
  const dispatch = useDispatch();

  const [email, onChangeEmail] = useState('');
  const [emailErrors, setEmailErrors] = useState('');

  const [confirm, setConfirm] = useState(null);

  const [code, setCode] = useState('');


  const verifCode = Math.floor(Math.random() * 8999) + 1000;
  // console.log('Verification code is here',verifCode)

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


  const ResetForm = () => {
    onChangeEmail('');
    setError([]);
  };

  useEffect(() => {
    // console.log('From Login ===>', email);
  }, [email]);

  const handleRegister = async e => {
    var checking_form = 'true';
    // console.log('From Login ===>', email);
    // if (email.length === 0 || email.indexOf('@') === -1 ){
    //   setEmailErrors('* Email Field Required');
    //   checking_form = 'false';
    // }
    // if ( checking_form === 'true' ){
    //   const to = ['notrami21@gmail.com'] 
    //     email(to , {
    //         cc: 'ramirez404.rami@gmail.com', 
    //         bcc: 'ramirez404.rami@gmail.com', 
    //         subject: 'Your verification code Ready',
    //         body: `Your verification code is: ${verifCode}`
    //     })
    //     .then(res => {
    //       console.log('E-mail Successfully Sent')
    //     })
    //     .catch(err => {
    //       console.log('E-mail Failed Sent')
    //     })
    // }
    console.log('BEFORE sign Phone')
    await auth().sendPasswordResetEmail(email);
    // const confirmation = await auth().signInWithPhoneNumber('+216 29 738 044')
    //   .then(res => {
    //     console.log('SUCCESS')
    //     console.log('AFTER sign Phone', confirmation)
    //     console.log('response ', res)
    //     setConfirm(confirmation);
    //     console.log('Confirmation Code',confirm)
    //   })
    //   .catch(err => console.log('FAILED'));
    
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
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
            Forget Password
          </Text>
        </View>
        <View
          style={styles.content}
        >
            <Text 
                style={styles.parag_reset}
            >
                Please enter your registered email.
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
              <TextInput
                style={styles.input}
                onChangeText={onChangeEmail}
                value={email}
                textContentType="emailAddress"
              />
              <Text
                style={styles.fieldErrors}
              >
                {emailErrors}
              </Text>
          </View>
          <TouchableOpacity
            style={styles.button1}
            onPress={handleRegister}
          >
            <Text
              style={styles.signup}
            >Reset Password</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ForgetPassword;

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
  },
  icon_style: {
    flex: 0.45,
    padding: 10,
  },
  headerTitle: {
    fontSize: 14,
  },
  content: {
    padding: 20,
  },
  inputField: {
    paddingTop: 10,
    padding: 5,
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
    fontWeight: '600',
  },
  input: {
    borderRadius: 5,
    fontSize:18,
    borderWidth: 0.5,
    color: COLORS.main,
    borderColor: COLORS.main,
    paddingTop:5,
    paddingLeft:20,
    width:'100%',
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
    paddingTop: 0,
    width: '100%',
  },
  forget: {
    textAlign: 'center',
    fontSize:17,
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
    marginHorizontal:0,
    marginVertical: 10,
    fontWeight: '600',
  },
  errors: {
    paddingVertical: 10,
  },
  error: {
    color: 'red',
    fontSize: 18,
    fontWeight: '600',
  },
  parag_reset: {
    textAlign: 'center',
    fontSize: 16,
    color: COLORS.main,
    marginVertical:10,
  }
});
