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
import CheckBox from '@react-native-community/checkbox';
import { COLORS } from '../constants';
import {useDispatch, useSelector} from 'react-redux';
import {signUpUser, resetAllAuthForms} from '../redux/User/user.actions';
import TouchID from 'react-native-touch-id';

const mapState = ({user}) => ({
  currentUser: user.currentUser,
  signUpSuccess: user.signUpSuccess,
  errors: user.errors,
});

const optionalConfigObject = {
  unifiedErrors: false, // use unified error messages (default false)
  passcodeFallback: false // if true is passed, itwill allow isSupported to return an error if the device is not enrolled in touch id/face id etc. Otherwise, it will just tell you what method is supported, even if the user is not enrolled.  (default false)
}

const Registration = ({navigation}) => {

  const {currentUser, signUpSuccess, errors} = useSelector(mapState);
  const dispatch = useDispatch();

  console.log('signUpUser =>', signUpSuccess);
  console.log('currentUser =>', currentUser);
  console.log('errors =>', errors);

  const [firstName, onChangefirstName] = useState('');
  const [lastName, onChangelastName] = useState('');
  const [email, onChangeEmail] = useState('');
  const [phone, onChangephone] = useState('');
  const [password, onChangepassword] = useState('');
  const [isSelected, setSelected] = useState(false);
  const [isSecure, setIsSecure] = useState(true);
  const [iconPasswordName, setIconPasswordName] = useState('eye-with-line');
  const [error, setError] = useState([]);
  // Hnadle Errors
  const [firstNameErrors, setFirstNameErrors] = useState('');
  const [lastNameErrors, setLastNameErrors] = useState('');
  const [emailErrors, setEmailErrors] = useState('');
  const [phoneErrors, setPhoneErrors] = useState('');
  const [passwordErrors, setPasswordErrors] = useState('');
  const [termsErrors, setTermsErrors] = useState('');

  const [creditData, setCreditData] = useState({
    createdAt: '',
    front: '',
    back: '',
    name: ''
  });
  const [driverData, setDriverData] = useState({
    createdAt: '',
    front: '',
    back: '',
    name: ''
  });
  const [insuranceData, setInsuranceData] = useState({
    createdAt: '',
    front: '',
    back: '',
    name: ''
  });
  
  useEffect(() => {
    if (currentUser) {
      // navigation.navigate('VerifyAccount');
      
      TouchID.isSupported(optionalConfigObject)
      .then(biometryType => {
        // Success code
        console.log('is Supported <>')
        navigation.navigate('TouchIDAuth');
      })
      .catch(error => {
        // Failure cod
        console.log('is Not Supported <>²')
        navigation.navigate('Identification');
      });
       
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser]);

  

  useEffect(() => {
    if (signUpSuccess) {
      ResetForm();
      dispatch(resetAllAuthForms());
      // navigation.navigate('VerifyAccount');
      TouchID.isSupported(optionalConfigObject)
      .then(biometryType => {
        // Success code
        console.log('is Supported <>')
        navigation.navigate('TouchIDAuth');
      })
      .catch(error => {
        // Failure cod
        console.log('is Not Supported <>²')
        navigation.navigate('Identification');
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [signUpSuccess]);

  useEffect(() => {
    if (Array.isArray(errors) && errors.length > 0) {
      setError(errors);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [signUpSuccess]);

  const ResetForm = () => {
    onChangefirstName('');
    onChangelastName('');
    onChangeEmail('');
    onChangephone('');
    onChangepassword('');
    setIsSecure(true);
    setIconPasswordName('eye');
    setSelected(false);
    setError([]);
  };

  const handlePasswordSecure = () => {
    setIsSecure(!isSecure);
    if (isSecure) {
      setIconPasswordName('eye');
    } else {
      setIconPasswordName('eye-with-line');
    }
  };
  const isThisNumber = () => {
    let i = 0;
    let ch = '0123456789()+ ';
    while (ch.includes(phone[i])) {
      i++;
    }
    if (i > phone.length) {
      return true;
    } else {
      return false;
    }
  };
  // useEffect(() => {
  //   console.log('From Registration ===>', {
  //     firstName,
  //     lastName,
  //     email,
  //     phone,
  //     password,
  //     isSelected,
  //   });
  // }, [firstName, lastName, email, phone, password, isSelected]);

  const handleRegister = async e => {
    console.log('From Registration ===>', {
      firstName,
      lastName,
      email,
      phone,
      password,
      isSelected,
    });
    var checking_form = 'true';
    if (firstName.length === 0) {
      setFirstNameErrors('* First Name Field Required');
      checking_form = 'false';
    } else {
      setFirstNameErrors('');
    }
    if (lastName.length === 0) {
      setLastNameErrors('* Last Name Field Required');
      checking_form = 'false';
    } else {
      setLastNameErrors('');
    }
    if (email.length === 0 || email.indexOf('@') === -1) {
      setEmailErrors('* Email Field Required');
      checking_form = 'false';
    } else {
      setEmailErrors('');
    }
    if (phone.length === 0 || isThisNumber(phone)) {
      setPhoneErrors('* phone Field Required');
      checking_form = 'false';
    } else {
      setPhoneErrors('');
    }
    if (password.length < 6) {
      setPasswordErrors('* Password Field Required, 6 caracter min');
      checking_form = 'false';
    } else {
      setPasswordErrors('');
    }
    if (isSelected !== true) {
      setTermsErrors('* Agree to the Terms and Conditions is required');
      checking_form = 'false';
    } else {
      setTermsErrors('');
    }
    if (checking_form === 'true') {
      dispatch(
        signUpUser({firstName, lastName, email, phone, password, isSelected, creditData, driverData, insuranceData}),
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <IconFeather
            name="arrow-left"
            size={25}
            color={COLORS.main}
            style={styles.icon_style}
            onPress={() => navigation.goBack()}
          />
          <Text style={styles.headerTitle}>Sign Up</Text>
        </View>
        <View style={styles.content}>
          {/* First Name */}
          <View style={styles.inputField}>
            {errors.length > 0 && (
              <View style={styles.errors}>
                {error.map((err, index) => (
                  <Text style={styles.error} key={index}>
                    {err}
                  </Text>
                ))}
                ;
              </View>
            )}
            <Text style={styles.label}>Fisrt Name</Text>
            <TextInput
              style={styles.input}
              onChangeText={onChangefirstName}
              value={firstName}
            />
            <Text style={styles.fieldErrors}>{firstNameErrors}</Text>
          </View>
          {/* Last Name */}
          <View style={styles.inputField}>
            <Text style={styles.label}>Last Name</Text>
            <TextInput
              style={styles.input}
              onChangeText={onChangelastName}
              value={lastName}
            />
            <Text style={styles.fieldErrors}>{lastNameErrors}</Text>
          </View>
          {/* Email Adresse */}
          <View style={styles.inputField}>
            <Text style={styles.label}>Email Adresse</Text>
            <TextInput
              style={styles.input}
              onChangeText={onChangeEmail}
              value={email}
              textContentType="emailAddress"
            />
            <Text style={styles.fieldErrors}>{emailErrors}</Text>
          </View>
          {/* Phone Number */}
          <View style={styles.inputField}>
            <Text style={styles.label}>Phone Number</Text>
            <TextInput
              style={styles.input}
              onChangeText={onChangephone}
              value={phone}
            />
            <Text style={styles.fieldErrors}>{phoneErrors}</Text>
          </View>
          {/* Password */}
          <View style={styles.inputField}>
            <Text style={styles.label}>Password</Text>
            <View style={styles.passwordField}>
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
            <Text style={styles.fieldErrors}>{passwordErrors}</Text>
          </View>
          {/* Terms and Condition */}
          <View style={styles.terms}>
            <CheckBox
              value={isSelected}
              onValueChange={setSelected}
              style={styles.checkbox}
              // tintColor={COLORS.darkgray}
              // onCheckColor={COLORS.darkgray}
              // onFillColor={COLORS.darkgray}
            />
            <Text style={styles.label}>Terms and Conditions</Text>
          </View>
          <Text style={styles.fieldErrors}>{termsErrors}</Text>
          <TouchableOpacity style={styles.button1} onPress={handleRegister}>
            <Text style={styles.signup}>Register</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
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
    paddingTop: 0,
    padding: 5,
    width: '100%',
  },
  label: {
    textAlign: 'left',
    fontSize: 16,
    color: COLORS.main,
    marginBottom: 5,
  },
  fieldErrors: {
    color: 'red',
    fontSize: 14,
  },
  input: {
    borderRadius: 5,
    fontSize: 18,
    borderWidth: 0.5,
    color: COLORS.main,
    borderColor: COLORS.main,
    paddingTop: 5,
    paddingLeft: 20,
    width: '100%',
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
    right: 20,
    fontSize: 25,
  },
  terms: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 0,
  },
  checkbox: {
    // borderWidth: 1,
    // borderColor: COLORS.main,
    // color: COLORS.main,
    marginRight: 10,
  },
  signup: {
    backgroundColor: COLORS.main,
    color: 'white',
    fontSize: 18,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    paddingVertical: 10,
    paddingHorizontal: 35,
    borderRadius: 4,
    marginHorizontal: 0,
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
});
