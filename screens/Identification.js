/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import {COLORS} from '../constants';
import IconFeather from 'react-native-vector-icons/Feather';
import {useDispatch, useSelector} from 'react-redux';
import {fetchDriverData, fetchCreditData, fetchInsuranceData} from '../redux/User/user.actions';



const mapState = ({user}) => ({
  driverData: user.driverData,
  creditData: user.creditData,
  insuranceData: user.insuranceData,
  errors: user.errors,
});

const Identification = ({navigation}) => {

  const { driverData, creditData, insuranceData } = useSelector(mapState);
  const dispatch = useDispatch();
  // console.log('driverData <=> ',driverData)
  // console.log('creditData <=> ',creditData)
  // console.log('insuranceData <=> ',insuranceData)

  // const { name_d, createdAt_d, front_d, back_d } = driverData;
  // const { name_c, createdAt_c, front_c, back_c } = creditData;
  // const { name_i, createdAt_i, front_i, back_i } = insuranceData;

  useEffect(() => {
    dispatch(fetchDriverData());
    dispatch(fetchCreditData());
    dispatch(fetchInsuranceData());
  }, [dispatch]);
 
  const handleRedirect1 = () => {
    navigation.navigate('DriverFrontPhoto')
  }
  const handleRedirect2 = () => {
    navigation.navigate('CreditFrontPhoto')
  }
  const handleRedirect3 = () => {
    navigation.navigate('InsuranceFrontPhoto')
  }

  const renderDriverCard = (driverData) => {
    
      return (
        <View
          style={styles.cardRender}
        >
          <View style={styles.cardRender2}>
            <Text style={styles.caardTitle} >{driverData.name}</Text>
            <Text style={styles.caardDate} >{formtDATE(driverData.createdAt)} </Text>
            {/* <View> */}
              <View 
                style={styles.imagesContainer}
              >
              <View
                style={styles.imageContainer2}
              >
                <Image
                    style={styles.frontImage}
                    source={{
                      uri: driverData.front,
                    }}
                  />
                  <Text style={styles.bottomImageText} >Front</Text>
              </View>
              <View
                style={styles.imageContainer2}
              >
                <Image
                    style={styles.frontImage}
                    source={{
                      uri: driverData.back,
                    }}
                  />
                <Text style={styles.bottomImageText} >Back</Text>
              </View>
              </View>
            {/* </View> */}
          </View>
          <TouchableOpacity
            style={styles.cardRender3}
            onPress={handleRedirect1}
          >
            <Text style={styles.btnRetake} >Retake Photo</Text>
          </TouchableOpacity>
        </View>
      )
  }
  const renderCreditCard = (creditData) => {
      return (
        <View
          style={styles.cardRender}
        >
          <View style={styles.cardRender2}>
            <Text style={styles.caardTitle} >{creditData.name}</Text>
            <Text style={styles.caardDate} >{formtDATE(creditData.createdAt)} </Text>
            <View>
              <View 
                style={styles.imagesContainer}
              >
              <View
                style={styles.imageContainer2}
              >
                <Image
                    style={styles.frontImage}
                    source={{
                      uri: creditData.front,
                    }}
                  />
                  <Text style={styles.bottomImageText} >Front</Text>
              </View>
              <View
                style={styles.imageContainer2}
              >
                <Image
                    style={styles.frontImage}
                    source={{
                      uri: creditData.back,
                    }}
                  />
                <Text style={styles.bottomImageText} >Back</Text>
              </View>
              </View>
            </View>
          </View>
          <TouchableOpacity
            style={styles.cardRender3}
            onPress={handleRedirect2}
          >
            <Text style={styles.btnRetake} >Retake Photo</Text>
          </TouchableOpacity>
        </View>
      )
  }
  const renderInsuranceCard = (insuranceData) => {
      return (
        <View
          style={styles.cardRender}
        >
          <View style={styles.cardRender2}>
            <Text style={styles.caardTitle} >{insuranceData.name}</Text>
            <Text style={styles.caardDate} >{formtDATE(insuranceData.createdAt)} </Text>
            <View>
              <View 
                style={styles.imagesContainer}
              >
              <View
                style={styles.imageContainer2}
              >
                <Image
                    style={styles.frontImage}
                    source={{
                      uri: insuranceData.front,
                    }}
                  />
                  <Text style={styles.bottomImageText} >Front</Text>
              </View>
              <View
                style={styles.imageContainer2}
              >
                <Image
                    style={styles.frontImage}
                    source={{
                      uri: insuranceData.back,
                    }}
                  />
                <Text style={styles.bottomImageText} >Back</Text>
              </View>
              </View>
            </View>
          </View>
          <TouchableOpacity
            style={styles.cardRender3}
            onPress={handleRedirect3}
          >
            <Text style={styles.btnRetake} >Retake Photo</Text>
          </TouchableOpacity>
        </View>
      )
  }
  const renderTakePhoto1 = () => { 
    return (
      <TouchableOpacity
          // disabled={isStyle1}
          // activeOpacity={isStyle1 ? 0.2 : 0.2}
          style={
            styles.buttonBorder
          }
          onPress={handleRedirect1}
      >
        <IconFeather
            style={styles.cameraIcon}
            name="camera"
        />
        <Text
            style={styles.rightText}
        >
          Tap to take a photo
        </Text>
      </TouchableOpacity>
    )
  }
  const renderTakePhoto2 = () => { 
    return(
      <TouchableOpacity
          // disabled={isStyle1}
          // activeOpacity={isStyle1 ? 0.2 : 0.2}
          style={
            styles.buttonBorder
          }
          onPress={handleRedirect2}
      >
        <IconFeather
            style={styles.cameraIcon}
            name="camera"
        />
        <Text
            style={styles.rightText}
        >
          Tap to take a photo
        </Text>
      </TouchableOpacity>
    )
  }
  const renderTakePhoto3 = () => { 
    return (
      <TouchableOpacity
          // disabled={isStyle1}
          // activeOpacity={isStyle1 ? 0.2 : 0.2}
          style={
            styles.buttonBorder
          }
          onPress={handleRedirect3}
      >
        <IconFeather
            style={styles.cameraIcon}
            name="camera"
        />
        <Text
            style={styles.rightText}
        >
          Tap to take a photo
        </Text>
      </TouchableOpacity>
    )
  }

  const formtDATE  = (ch) => {
    const dateFinal = ch.toDate().toString().substr(4, 11)
    return `Added on ${dateFinal.substr(0, 3)} ${dateFinal.substr(4, 2)}, ${dateFinal.substr(7, 4)}` 
  }
  const renderSave = () => {
    if(driverData && creditData && insuranceData){
      return (
        <TouchableOpacity 
          onPress={handleSave}
        >
          <Text style={styles.signup}>Save</Text>
        </TouchableOpacity>
      )
    }
  }
  const handleSave = () => {
    console.log('<=====> FETCHING <======>')
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View
          style={styles.header}
        >
          <Text
            style={styles.headerTitle}
          >
            Identification
          </Text>
        </View>
        <View
            style={styles.VerifyContent}
        >
            {/* Driver's License Start */}
            <View
                  style={
                    styles.sectionContent
                  }
              >
                <Text
                    style={styles.section}
                >
                    Driver's License
                </Text>
                {
                  driverData === null 
                  ? renderTakePhoto1() 
                  : driverData.front !== '' && driverData.back !== '' && driverData.date !== '' && driverData.name !== ''
                  ? renderDriverCard(driverData) 
                  : renderTakePhoto1()
                }
                {/* { 
                  driverData && (
                  driverData.front === '' || driverData.back === '' || driverData.date === '' || driverData.name === ''
                  ? renderDriverCard(driverData) : renderTakePhoto1() )
                } */}
                {/* { 
                  !driverData === null ? (
                    driverData.front === '' || driverData.back === '' || driverData.date === '' || driverData.name === '' 
                    ? renderDriverCard(driverData) : renderTakePhoto1()
                  ) : renderTakePhoto1()
                } */}
                
            </View>
            {/* Driver's License End */}
            {/* Credit Card Start */}
            <View
                style={styles.sectionContent}
            >
                <Text
                    style={styles.section}
                >
                    Credit Card
                </Text>
                {
                  creditData === null 
                  ? renderTakePhoto2() 
                  : creditData.front !== '' && creditData.back !== '' && creditData.date !== '' && creditData.name !== ''
                  ? renderCreditCard(creditData) 
                  : renderTakePhoto2()
                }
                {/* {
                  creditData.front !== '' && creditData.back !== '' && creditData.date !== '' && creditData.name !== ''
                  ? renderCreditCard(creditData) 
                  : renderTakePhoto2()
                } */}
                {/* {
                  creditData && (
                  creditData.front === '' || creditData.back === '' || creditData.date === '' || creditData.name === ''
                  ? renderCreditCard(creditData) : renderTakePhoto2() )
                } */}
                {/* { 
                  !creditData === null ? (
                    creditData.front === '' || creditData.back === '' || creditData.date === '' || creditData.name === '' 
                    ? renderCreditCard(creditData) : renderTakePhoto2()
                  ) : renderTakePhoto2()
                } */}
            </View>
            {/* Credit Card End */}
            {/* Insurance Start */}
            <View
                style={styles.sectionContent}
            >
                <Text
                    style={styles.section}
                >
                    Insurance Card
                </Text>
                {
                  insuranceData === null 
                  ? renderTakePhoto3() 
                  : insuranceData.front !== '' && insuranceData.back !== '' && insuranceData.date !== '' && insuranceData.name !== ''
                  ? renderInsuranceCard(insuranceData) 
                  : renderTakePhoto3()
                }
                {/* {
                  insuranceData.front !== '' && insuranceData.back !== '' && insuranceData.date !== '' && insuranceData.name !== ''
                  ? renderInsuranceCard(insuranceData) 
                  : renderTakePhoto3()
                } */}
                {/* { 
                  insuranceData && (
                  insuranceData.front === '' || insuranceData.back === '' || insuranceData.date === '' || insuranceData.name === ''
                  ? renderInsuranceCard(insuranceData) : renderTakePhoto3() )
                } */}
                {/* { 
                  !insuranceData === null ? (
                    insuranceData.front === '' || insuranceData.back === '' || insuranceData.date === '' || insuranceData.name === '' 
                    ? renderInsuranceCard(insuranceData) : renderTakePhoto3()
                  ) : renderTakePhoto2()
                } */}
            </View>
            {/* Insurance Start */}
            <View
              style={styles.saveDistance}
            >
              {renderSave()}
            </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Identification;

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
    borderBottomColor: COLORS.main,
    paddingVertical: 5,
  },
  headerTitle: {
    textAlign: 'center',
    fontSize: 16,
    paddingVertical:10,
  },
  sectionContent: {
    paddingTop: 10,
  },
  sectionContent1: {
    paddingTop: 40,
  },
  buttonBorder: {
    borderColor: COLORS.main,
    borderWidth: 1,
    borderRadius: 5,
    width: '100%',
    padding: 8,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',

  },
  VerifyContent: {
    padding: 20,
    paddingTop: 0,
  },
  section: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.main,
    paddingTop: 20,
    paddingBottom: 10,
  },
  cameraIcon: {
      fontSize: 25,
  },
  rightText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.main,
    paddingLeft: 20,
  },
  image: {
    width: 200,
    height: 200,
  },
  driverStyle: {
    opacity: 1
  },  
  creditStyle: {
    opacity: 0.6
  },  
  insureanceStyle: {
    opacity: 0.6
  },  
  cardRender: {
    borderWidth: 1,
    borderRadius: 4,
    borderColor: 'grey',
  },
  cardRender2: {
    padding: 20,
  },
  imagesContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 0,
    margin: 0,
    marginTop: 15,
  },
  frontImage: {
    width: 130,
    height: 70,
    borderRadius: 8,
    margin: 0,
  },
  bottomImageText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 0,
  },
  imageContainer2: {
    overflow: 'hidden',
  },
  caardDate: {
    fontSize: 16,
  },
  caardTitle: {
    fontSize: 18,
    fontWeight: '800',
    marginBottom: 10,
  },
  cardRender3: {
    borderTopWidth: 1,
    borderColor: 'grey',
  },
  btnRetake: {
    paddingVertical: 15,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '800',
  },
  saveDistance: {
    marginVertical: 50,
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
});
