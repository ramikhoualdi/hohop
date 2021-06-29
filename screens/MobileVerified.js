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
import IconMaterialIcons from 'react-native-vector-icons/MaterialIcons';



const COLORS = {
  primary: '#68707f',
};

const MobileVerified = ({navigation}) => {

  const handleVerify = () => {
      navigation.navigate('TouchIDAuth');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View
          style={styles.header}
        >
          <Text
            style={styles.headerTitle}
          >
            Verify
          </Text>
        </View>
        <View
            style={styles.VerifyContent}
        >
            <IconMaterialIcons
                style={styles.iconVerify}
                name="verified-user"
                fontSize={50}
                color={COLORS.primary}
            />
            <Text
                style={styles.title1}
            >
                Mobile Phone Verified
            </Text>
            <Text
                style={styles.title2}
            >
                Proceed to continue with {'\n'}setting up your biometrics.
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
            >Continue</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default MobileVerified;

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  header: {
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderBottomColor: COLORS.primary,
    paddingVertical: 5,
  },
  headerTitle: {
    textAlign: 'center',
    fontSize: 16,
    paddingVertical:10,
  },
  content: {
    padding: 20,
  },
  iconVerify: {
    textAlign: 'center',
    fontSize: 80,
    paddingVertical: 20,
    paddingTop: 100,
  },
  VerifyContent: {
    paddingHorizontal: 20,
  },
  title1: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.primary,
    paddingVertical: 20,
  },
  title2: {
    textAlign: 'center',
    fontSize: 20,
    color: COLORS.primary,
    paddingBottom:150,
  },
  signup: {
    backgroundColor: COLORS.primary,
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
});
