/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import IconFeather from 'react-native-vector-icons/Feather';
import { COLORS } from '../../constants';
import {useDispatch, useSelector} from 'react-redux';
import {uploadInsuranceFront, resetPhotos} from '../../redux/User/user.actions';
import { RNCamera } from 'react-native-camera';

const PendingView = () => (
  <View
    style={{
      flex: 1,
      backgroundColor: 'lightgreen',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
    <Text>Waiting</Text>
  </View>
);

const mapState = ({user}) => ({
  uploadInsuranceFrontSuccess: user.uploadInsuranceFrontSuccess,
  errors: user.errors,
});

const InsuranceFrontPhoto = ({navigation}) => {
  
  console.log('FROM INSURANCE FRONT PHOTO')
  console.log('+ + + + + + + + + + + + +')

  const { uploadInsuranceFrontSuccess, errors} = useSelector(mapState);
  const dispatch = useDispatch();

  console.log('uploadInsuranceFrontSuccess =>', uploadInsuranceFrontSuccess);
  console.log('errors =>', errors);

  const [imageSource, setImageSource] = useState(null);

  const takePicture = async function (camera) {
    const options = {quality: 0.8, base64: true};
    const data = await camera.takePictureAsync(options);
    setImageSource(data.uri);
    dispatch(uploadInsuranceFront(imageSource))
    navigation.navigate('InsuranceBackPhoto')
  };
  const uploadImage = () => {
    if(imageSource){
      dispatch(uploadInsuranceFront(imageSource))
    }
  }
  useEffect(() => {
    if(uploadInsuranceFrontSuccess){
      setImageSource(null)
      dispatch(resetPhotos())
      navigation.navigate('InsuranceBackPhoto')
    }
  }, [uploadInsuranceFrontSuccess])

  return (
    <ScrollView>
      <SafeAreaView style={styles.container}>
        <View style={styles.scrollHeight}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.scrollView}>
            <View style={styles.header}>
              <IconFeather
                name="arrow-left"
                size={25}
                color={COLORS.main}
                style={styles.icon_style}
                onPress={() => navigation.goBack()}
              />
              <View style={styles.center_header}>
                <View style={styles.cardContainer}>
                  <Text style={styles.text_above}>Insurance Card</Text>
                  <View style={styles.card}>
                  {
                      imageSource 
                      ? <Image
                      style={styles.currentImage}
                      source={{
                        uri: imageSource,
                      }}
                    />
                      : null                    
                    }
                  </View>
                  <View style={styles.text_under_container}>
                    <Text style={styles.text_under}>
                      Take a photo of front side
                    </Text>
                    {imageSource ? (
                      <TouchableOpacity    
                        style={styles.nextBtn}
                        // onPress={uploadImage()}
                        >
                        <Text style={styles.nextText}>Next</Text>
                      </TouchableOpacity>
                    ) : null}
                    
                  </View>

                  <View style={styles.leftEdge}></View>
                  <View style={styles.rightEdge}></View>
                </View>
              </View>
              <TouchableOpacity
                style={styles.getPhoto}
                // onPress={uploadImage()}
                >
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
      <RNCamera
        style={styles.preview}
        type={RNCamera.Constants.Type.back}
        flashMode={RNCamera.Constants.FlashMode.off}
        androidCameraPermissionOptions={{
          title: 'Permission to use camera',
          message: 'We need your permission to use your camera',
          buttonPositive: 'Ok',
          buttonNegative: 'Cancel',
        }}
        captureAudio={false}>
        {({camera, status}) => {
          if (status !== 'READY') return <PendingView />;
          return (
            <View
              style={{flex: 0, flexDirection: 'row', justifyContent: 'center'}}>
              <TouchableOpacity
                onPress={() => takePicture(camera)}
                style={styles.capture}>
                <Text style={{fontSize: 14}}>
                  <IconFeather
                      style={styles.cameraIcon}
                      name="camera"
                  />
                </Text>
              </TouchableOpacity>
            </View>
          );
        }}
      </RNCamera>
    </ScrollView>
  );
};

export default InsuranceFrontPhoto;

const styles = StyleSheet.create({
  nextBtn: {
    // position: 'absolute',
    // bottom: -50,
    // left: 80,
    width: 100,
    borderWidth: 1,
    borderColor: 'grey',
    color: 'grey',
    fontSize: 16,
    paddingVertical: 3,
    borderRadius: 4,
    marginTop: 10,
  },
  nextText: {
    textAlign: 'center',

  },
  currentImage: {
    height: 180,
    resizeMode: 'contain',
    marginTop: -10,
    transform: [{rotate: '-90deg'}],
  },
  preview: {
    // flex: 1,
    // justifyContent: 'flex-end',
    // alignItems: 'center',
    position: 'absolute',
    height: 80,
    width: '100%',
    bottom: 0,
    left: 0,
  },
  capture: {
    flex: 0,
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 5,
    paddingHorizontal: 10,
    alignSelf: 'center',
    margin: 20,
    transform: [{scale: 1.5}]
  },
  //
  scrollHeight: {
    height: 660,
  },
  scrollView: {
    flex: 1,
    height: 50,
    backgroundColor: 'white',
  },
  container: {
    flex: 1,
    color: COLORS.main,
    backgroundColor: 'black',
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    borderBottomWidth: 0.5,
    borderBottomColor: COLORS.main,
    paddingVertical: 5,
  },
  center_header: {
    marginHorizontal: 100,
    marginVertical: 10,
  },
  text_above: {
    textAlign: 'center',
    fontSize: 13,
    backgroundColor: 'white',
    position: 'absolute',
    top: -10,
    left: 38,
    height: 60,
    width: 270,
  },
  text_under_container: {
    position: 'absolute',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    // bottom: -40,
    bottom: -8,
    left: 35,
    width: 270,
    backgroundColor: 'white',
  },
  text_under: {
    textAlign: 'center',
    fontSize: 16,
    marginBottom: 0,
  },
  cardContainer: {
    marginTop: 40,
    position: 'relative',
    width: 340,
    height: 220,
    borderWidth: 1,
    borderColor: 'grey',
  },
  card: {
    marginTop: 25,
    marginLeft: 25,
    width: 285,
    height: 160,
    borderWidth: 1,
    borderColor: 'grey',
  },
  icon_style: {
    flex: 0.45,
    padding: 10,
  },
  getPhoto: {
    width: 60,
    height: 60,
    borderRadius: 45,
    backgroundColor: 'grey',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 140,
    marginHorizontal: 40,
    marginLeft: 0,
  },
  leftEdge: {
    position: 'absolute',
    backgroundColor: 'white',
    top: 35,
    left: -10,
    width: 20,
    height: 140,
  },
  rightEdge: {
    position: 'absolute',
    backgroundColor: 'white',
    top: 35,
    right: -10,
    width: 20,
    height: 140,
  },
});
