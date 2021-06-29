/* eslint-disable prettier/prettier */
import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import IconFeather from 'react-native-vector-icons/Feather';

const COLORS = {
  primary: '#68707f',
};

const Home = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.flexContainer} >
        <View style={styles.subContainer} >
          <Icon
            name="circle-thin"
            size={100}
            color="grey"
            style={styles.icon_style}
          />
          <Text style={styles.title}>APS</Text>
        </View>
        <View style={styles.subContainer} >
          <Text style={styles.parag}>
            Prevents Fraud before it occurs in{'\n'} real time.
          </Text>
        </View>
        <View style={styles.subContainer} >
          <TouchableOpacity
            style={styles.button1}
            onPress={() => navigation.navigate('Registration')}>
            <Text style={styles.signup}>Sign Up</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button2}
            onPress={() => navigation.navigate('Login')}>
            <Text style={styles.login}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    flex: 1,
    color: COLORS.primary,
    backgroundColor: '#fff',
  },
  flexContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  subContainer: {
    
  },
  icon_style: {
    textAlign: 'center',
    marginHorizontal: 'auto',
    // marginTop: 50,
  },
  title: {
    textAlign: 'center',
    color: COLORS.primary,
    fontSize: 22,
    fontWeight: '700',
    marginTop: 15,
  },
  parag: {
    textAlign: 'center',
    color: COLORS.primary,
    fontSize: 16,
    // marginTop: 50,
    lineHeight: 25,
  },
  button1: {
    // marginTop: 60,
  },
  signup: {
    backgroundColor: COLORS.primary,
    color: 'white',
    fontSize: 18,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    paddingVertical: 10,
    paddingHorizontal: 35,
    borderRadius: 4,
    // marginHorizontal: 45,
    marginVertical: 10,
    fontWeight: '600',
  },
  login: {
    backgroundColor: 'transparent',
    color: COLORS.primary,
    fontSize: 18,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    paddingVertical: 10,
    paddingHorizontal: 35,
    borderWidth: 1,
    borderStyle: 'solid',
    borderRadius: 4,
    // marginHorizontal: 45,
    marginVertical: 10,
    fontWeight: '600',
    width:  300,
  },
  
});
