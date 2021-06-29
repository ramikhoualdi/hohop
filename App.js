/* eslint-disable prettier/prettier */
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Provider} from 'react-redux';
import store from './redux/createStore';
import {
  Home,
  Login,
  Registration,
  VerifyAccount,
  MobileVerified,
  TouchIDAuth,
  FaceIDAuth,
  TouchIDSuccess,
  FaceIDSuccess,
  Identification,
  CreditFrontPhoto,
  CreditBackPhoto,
  DriverFrontPhoto,
  DriverBackPhoto,
  InsuranceFrontPhoto,
  InsuranceBackPhoto,
  ForgetPassword,
  CreditIdentification,
  DriverIdentification,
  InsuranceIdentification,
} from './screens';

const Stack = createStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          initialeRouteName="Home"
          screenOptions={{
            headerShown: false,
          }}
          >
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Registration" component={Registration} />
          <Stack.Screen name="VerifyAccount" component={VerifyAccount} />
          <Stack.Screen name="MobileVerified" component={MobileVerified} />
          <Stack.Screen name="TouchIDAuth" component={TouchIDAuth} />
          <Stack.Screen name="FaceIDAuth" component={FaceIDAuth} />
          <Stack.Screen name="TouchIDSuccess" component={TouchIDSuccess} />
          <Stack.Screen name="FaceIDSuccess" component={FaceIDSuccess} />
          <Stack.Screen name="Identification" component={Identification} />
          <Stack.Screen name="CreditFrontPhoto" component={CreditFrontPhoto} />
          <Stack.Screen name="CreditBackPhoto" component={CreditBackPhoto} />
          <Stack.Screen name="DriverFrontPhoto" component={DriverFrontPhoto} />
          <Stack.Screen name="DriverBackPhoto" component={DriverBackPhoto} />
          <Stack.Screen name="InsuranceFrontPhoto" component={InsuranceFrontPhoto} />
          <Stack.Screen name="InsuranceBackPhoto" component={InsuranceBackPhoto} />
          <Stack.Screen name="ForgetPassword" component={ForgetPassword} />
          <Stack.Screen name="CreditIdentification" component={CreditIdentification} />
          <Stack.Screen name="DriverIdentification" component={DriverIdentification} />
          <Stack.Screen name="InsuranceIdentification" component={InsuranceIdentification} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
