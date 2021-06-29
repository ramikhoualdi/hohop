/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
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
import { auth } from '../firebase/utils';

// const accountSid = process.env.TWILIO_ACCOUNT_SID;
// const authToken = process.env.TWILIO_AUTH_TOKEN;
// const client = require('twilio')('AC79d6fbc6f45835ffbc55a252840ac23f', 'd124abb0f42f4c189c5c765b409ca86c');

// client.messages
//   .create({
//      body: 'This is the Verification code : 8672',
//      from: '+1 205 539 0216',
//      to: '+216 29 738 044'
//    })
//   .then(message => {
//     console.log(' ========================== ')
//     console.log('Message Send Successfully !!')
//     console.log(message.sid)
//     console.log(' ========================== ')
//   });

const VerifyAccount = ({navigation}) => {

  const [field1, onChangeField1] = useState(null);
  const [field2, onChangeField2] = useState(null);
  const [field3, onChangeField3] = useState(null);
  const [field4, onChangeField4] = useState(null);

  const handleVerify = () => {
    // if(field1 === '8' && field2 === '6' && field3 === '7' && field4 === '2'){
    //   navigation.navigate('MobileVerified');
    // }else{
    //   console.log('Wrong Code Verification !!')
    // }
    auth().verifyPhoneNumber('+216 29 738 044')
      .on('state_changed', (phoneAuthSnapshot) => {
        console.log('SUCCESS !!')
        console.log('Snapshot state: ', phoneAuthSnapshot.state);
      }, (phoneAuthError) => {
        console.log('FAILED !!')
        console.error('Error: ', phoneAuthError.message);
      });
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
            Verify Account
          </Text>
        </View>
        <View style={styles.flexContainer} >
          <View
              style={styles.verifyTop}
          >
              <Text
                  style={styles.verifyParag}
              >
                  Please enter 4 digit password code{'\n'}we sent to +1(415) 555-2671
              </Text>
          </View>
          <View
              style={styles.verifyCenter}
          >
              <TextInput
                  style={styles.input}
                  onChangeText={onChangeField1}
                  value={field1}
                  maxLength = {1}
                  keyboardType="phone-pad"
              />
              <TextInput
                  style={styles.input}
                  onChangeText={onChangeField2}
                  value={field2}
                  maxLength = {1}
                  keyboardType="phone-pad"
              />
              <TextInput
                  style={styles.input}
                  onChangeText={onChangeField3}
                  value={field3}
                  maxLength = {1}
                  keyboardType="phone-pad"
              />
              <TextInput
                  style={styles.input}
                  onChangeText={onChangeField4}
                  value={field4}
                  maxLength = {1}
                  keyboardType="phone-pad"
              />
          </View>
          <View
              style={styles.verifyBottom}
          >
              <Text
                  style={styles.verifyCode}
              >
                  Didn't receive a code?
              </Text>
              <Text
                  style={styles.verifyResend}
              >
                  Resend Verification Code
              </Text>
          </View>
          <View
            style={styles.content}
          >
            <TouchableOpacity
              style={styles.button1}
              onPress={handleVerify}
            >
              <Text
                style={styles.signup}
              >Verify</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default VerifyAccount;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    color: COLORS.main,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderBottomColor: COLORS.main,
    paddingVertical: 5,
  },
  flexContainer: {
    position: 'relative',
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  icon_style: {
    flex: 0.45,
    padding: 10,
  },
  headerTitle: {
    fontSize: 14,
  },
  content: {
    paddingHorizontal: 20,
  },
  verifyCenter: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  input: {
    borderRadius: 5,
    borderWidth: 0.5,
    paddingHorizontal:20,
    paddingVertical:20,
    marginHorizontal: 5,
    fontSize:40,
    color: COLORS.main,
    fontWeight: 'bold',
  },
  verifyTop: {
    marginVertical: 20,
  },
  verifyParag: {
    textAlign: 'center',
    fontSize:16,
    lineHeight: 25,
  },
  verifyBottom: {
    marginBottom:130,
  },
  verifyCode: {
    textAlign: 'center',
    fontSize: 17,
    marginVertical:20,
  },
  verifyResend: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 17,
  },
  signup: {
    backgroundColor: COLORS.main,
    color: 'white',
    fontSize:18,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    paddingVertical: 10,
    paddingHorizontal: 35,
    borderRadius: 4,
    // marginHorizontal:0,
    marginVertical: 10,
    fontWeight: '600',
    width: 300
  },
});
