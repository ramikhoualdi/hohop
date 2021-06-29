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
  TextInput,
} from 'react-native';
import IconFeather from 'react-native-vector-icons/Feather';
import {COLORS} from '../../constants';
import {useDispatch, useSelector} from 'react-redux';
import {fetchCreditData, resetPhotos, updateCredit} from '../../redux/User/user.actions';

const mapState = ({user}) => ({
  creditData: user.creditData,
  creditDataSuccess: user.creditDataSuccess,
  errors: user.errors,
});

const CreditIdentification = ({navigation}) => {

  const { creditData, creditDataSuccess,  errors} = useSelector(mapState);
  const dispatch = useDispatch();
  const { name, createdAt, front, back } = creditData;

  console.log('<=>=>=>=>')
  console.log('name: ', name)
  console.log('createdAt: ', createdAt)
  console.log('front: ', front)
  console.log('back: ', back)
  console.log('<=>=>=>=>')

  const [creditName, onChangeDriverName] = useState(name);
  const [creditDate, onChangeDriverDate] = useState(createdAt);
  const [creditFront, onChangeDriverFront] = useState(front);
  const [creditBack, onChangeDriverBack] = useState(back);

  const [imageSource] = useState(`
  <IconMaterialCommunityIcons 
    name="image-filter-center-focus-strong-outline"
    width="100"
    height="100"
    />
  `);

  useEffect(() => {
    dispatch(fetchCreditData());
  }, [dispatch]);

  const formtDATE  = (ch) => {
    const dateFinal = ch.toDate().toString().substr(4, 11)
    return `Added on ${dateFinal.substr(0, 3)} ${dateFinal.substr(4, 2)}, ${dateFinal.substr(7, 4)}` 
  }

  useEffect(() => {
    if (creditDataSuccess){
      dispatch(resetPhotos());
      navigation.navigate('Identification');
    }
  }, [creditDataSuccess]);

  const handleDriverSave = () => {
    const date  = new Date();
    dispatch(updateCredit(creditName, date, creditFront, creditBack));
    console.log('Saved !!');
    navigation.navigate('Identification');
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
            Identification
          </Text>
        </View>
        <View
            style={styles.VerifyContent}
        >
          {/* Credit Card Start */}
          <View
                style={
                  styles.sectionContent
                }
            >
                <Text
                    style={styles.section}
                >
                    Credit Card
                </Text>
                  <View
                    style={styles.cardRender}
                  >
                    <View style={styles.cardRender2}>
                      <View>
                        <View
                          style={styles.imagesContainer}
                        >
                        <Text>{ creditDate ? formtDATE(creditDate) : null}</Text>
                        <View
                          style={styles.imageContainer2}
                        >
                          <Image
                              style={styles.frontImage}
                              source={{
                                uri: creditFront,
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
                                uri: creditBack,
                              }}
                            />
                          <Text style={styles.bottomImageText} >Back</Text>
                        </View>
                        </View>
                      </View>
                    </View>
                    <TouchableOpacity
                      style={styles.cardRender3}
                      onPress={() => navigation.navigate('CreditFrontPhoto')}
                    >
                      <Text style={styles.btnRetake} >Retake Photo</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.inputField}>
                    <Text style={styles.label}>Card Name</Text>
                    <TextInput
                      style={styles.input}
                      onChangeText={onChangeDriverName}
                      placeholder="Enter Card Name"
                      value={creditName}
                    />
                  </View>
                  <TouchableOpacity
                    style={styles.button1}
                    onPress={handleDriverSave}
                  >
                    <Text style={styles.signup}>Save</Text>
                  </TouchableOpacity>
            </View>
            {/* Driver's License End */}
        </View>
        <View>
        <Image
            style={styles.image}
            source={{
              uri: imageSource,
            }}
        />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CreditIdentification;

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderBottomColor: COLORS.main,
    paddingVertical: 5,
    paddingLeft:10,
  },
  headerTitle: {
    textAlign: 'center',
    fontSize: 16,
    paddingVertical:10,
    marginLeft: 120,
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
    opacity: 1,
  },
  creditStyle: {
    opacity: 0.6,
  },
  insureanceStyle: {
    opacity: 0.6,
  },
  cardRender: {
    borderWidth: 1,
    borderRadius: 4,
    borderColor: 'grey',
  },
  cardRender2: {
    padding: 30,
  },
  imagesContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 0,
    margin: 0,
    marginTop: -20,
  },
  frontImage: {
    width: 150,
    height: 150,
    margin: 0,
  },
  bottomImageText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: -20,
    marginBottom: 20,
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
  inputField: {
    paddingTop: 10,
    padding: 5,
    width: '100%',
  },
  label: {
    textAlign: 'left',
    fontSize: 16,
    color: COLORS.main,
    marginVertical: 10,
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
