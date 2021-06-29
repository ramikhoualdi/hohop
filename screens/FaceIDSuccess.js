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
import IconEntypo from 'react-native-vector-icons/Entypo';



const COLORS = {
  primary: '#68707f',
};

const TouchIDAuth = ({navigation}) => {

  const handleTouchID = () => {
    navigation.navigate('Identification');
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
            Face ID
          </Text>
        </View>
        <View
            style={styles.VerifyContent}
        >
            <View
                style={styles.borderTouch}
            >
                <IconEntypo
                    style={styles.iconVerify}
                    name="check"
                    fontSize={50}
                    color={COLORS.primary}
                />
            </View>
            <Text
                style={styles.title1}
            >
                Success!
            </Text>
            <Text
                style={styles.title2}
            >
                You enabled your Face ID.
            </Text>
            <Text
                style={styles.title2}
            >
                Your account is ready.{'\n'}Now let's get started.
            </Text>

        </View>
        <View
          style={styles.content}
        >
          <TouchableOpacity
            style={styles.button1}
            onPress={handleTouchID}
          >
            <Text
              style={styles.signup}
            >Get Started</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default TouchIDAuth;

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
  borderTouch: {
    borderColor: '#e1e2e5',
    borderWidth: 8,
    borderRadius: 80,
    width:120,
    height:120,
    display: 'flex',
  },
  iconVerify: {
    textAlign: 'center',
    fontSize: 60,
    paddingVertical: 20,
  },
  VerifyContent: {
    paddingHorizontal: 20,
    paddingTop: 120,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title1: {
    textAlign: 'center',
    fontSize: 26,
    fontWeight: 'bold',
    color: COLORS.primary,
    paddingVertical: 20,
    paddingTop: 50,
  },
  title2: {
    textAlign: 'center',
    fontSize: 22,
    color: COLORS.primary,
    paddingBottom:25,
  },
  signup: {
    backgroundColor: COLORS.primary,
    color: 'white',
    fontSize:18,
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
