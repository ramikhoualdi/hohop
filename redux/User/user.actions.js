import userTypes from './user.types';
import {auth, firestore, storage} from '../../firebase/utils';

// AUTHENTICATION
export const setCurrentUser = user => ({
  type: userTypes.SET_CURRENT_USER,
  payload: user,
});

// export const recoveryUser = ({ email }) => async dispatch => {
//     const config = {
//         url: 'https://craigslist.vercel.app/login',
//     }
//     try{
//         await auth.sendPasswordResetEmail(email, config)
//             .then(() => {
//                 dispatch({
//                     type: userTypes.RECOVERY_SUCCESS,
//                     payload: true
//                 })
//             })
//             .catch(() => {
//                 const err = ['Email Not Found! Please Enter A Valid Email']
//                 dispatch({
//                     type: userTypes.SET_ERRORS,
//                     payload: err
//                 })
//             })
//     }catch(err){
//         console.log(err)
//     }
// };

export const signInUser =
  ({email, password}) =>
  async dispatch => {
    try {
      console.log('From Sign In action');
      await auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => {
          dispatch({
            type: userTypes.SIGN_IN_SUCCESS,
            payload: true,
          });
        })
        .catch(err => {
          console.log('--- --- --- ---');
          console.log(err);
          console.log('--- --- --- ---');
        });
    } catch (err) {
      console.log('from catch in login redux actions');
      const error = ['Login problem'];
      dispatch({
        type: userTypes.SET_ERRORS,
        payload: error,
      });
    }
  };

export const signUpUser =
({
  firstName,
  lastName,
  email,
  phone,
  password,
  isSelected,
  creditData,
  driverData,
  insuranceData,
}) =>
async dispatch => {
  console.log('From Actions ===>', {
    firstName,
    lastName,
    email,
    phone,
    password,
    isSelected,
    creditData,
    driverData,
    insuranceData,
  });
  if (isSelected === true) {
    try {
      await auth()
        .createUserWithEmailAndPassword(email, password)
        .then(async () => {
          const currentUser = await auth().currentUser;
          if (currentUser != null) {
            const uidUser = currentUser.uid;
            console.log(uidUser);
            const userRef = firestore().doc(`users/${uidUser}`);
            const snapshot = await userRef.get();
            if (!snapshot.exists) {
              console.log(' == USER NOT FOUND IN FIRESTORE ==');
              const timestemps = new Date();
              const userOb = {
                firstName,
                lastName,
                email,
                phone,
                password,
                creditData,
                driverData,
                insuranceData,
                timestemps,
              };
              console.log(userOb);
              try {
                await userRef.set(userOb);
              } catch (err) {
                console.log(err);
              }
            }
            dispatch({
              type: userTypes.SIGN_UP_SUCCESS,
              payload: true,
            });
          }
        })
        .catch(err => {
          if (err.code === 'auth/email-already-in-use') {
            const error = 'That email address is already in use!';
            console.log(error);
            dispatch({
              type: userTypes.SET_ERRORS,
              payload: error,
            });
          }
          if (err.code === 'auth/invalid-email') {
            const error = 'That email address is invalid!';
            console.log(error);
            dispatch({
              type: userTypes.SET_ERRORS,
              payload: error,
            });
          }
          console.log(err);
        });
    } catch (err) {
      const error = 'Please check your information again';
      dispatch({
        type: userTypes.SET_ERRORS,
        payload: error,
      });
      console.log(error);
    }
  } else {
    console.log('Agree to the terms is required!!');
    const err = ['Agree to the terms is required!!'];
    dispatch({
      type: userTypes.SET_ERRORS,
      payload: err,
    });
  }
};

// Driver Card BEGIN

export const uploadDriveBack = imageSource => async dispatch => {
  try {
    const currentUser = await auth().currentUser;
    if (currentUser !== null) {
      const uidUser = currentUser.uid;
      const ref = await storage().ref(`${uidUser}/Driver_back.jpg`);
      await ref.putFile(`${imageSource}`);
      const url = await storage()
        .ref(`${uidUser}/Driver_back.jpg`)
        .getDownloadURL();
      const snapshot = await firestore().doc(`users/${uidUser}`).get();
      console.log('SnapShot =>', snapshot.data);
      if (snapshot.exists) {
        try {
          await firestore().doc(`users/${uidUser}`).update({
            'driverData.back': url,
          });
          dispatch({
            type: userTypes.UPLOAD_DRIVER_BACK_SUCCESS,
            payload: true,
          });
        } catch (err) {
          console.log('error1 FROM DRIVER BACK');
          console.log(err);
        }
      }
    }
  } catch (err) {
    console.log('error2 FROM DRIVER BACK');
    console.log(err);
  }
};

export const uploadDriverFront = imageSource => async dispatch => {
  // console.log('from action <=> <=>')
  // console.log('from action =>',imageSource)
  try {
    console.log('<=> <=> from action <=> <=> FRONT DRIVER <=> <=>')
    const currentUser = await auth().currentUser;
    if (currentUser !== null) {
      const uidUser = currentUser.uid;
      const ref = await storage().ref(`${uidUser}/Driver_front.jpg`);
      await ref.putFile(`${imageSource}`);
      const url = await storage()
        .ref(`${uidUser}/Driver_front.jpg`)
        .getDownloadURL();
      const snapshot = await firestore().doc(`users/${uidUser}`).get();
      console.log('SnapShot =>', snapshot.data);
      if (snapshot.exists) {
        try {
          await firestore().doc(`users/${uidUser}`).update({
            'driverData.front': url,
          });
          dispatch({
            type: userTypes.UPLOAD_DRIVER_FRONT_SUCCESS,
            payload: true,
          });
        } catch (err) {
          console.log('error1 FROM DRIVER FRONT');
          console.log(err);
        }
      }
    }
  } catch (err) {
    console.log('error2 FROM DRIVER FRONT');
    console.log(err);
  }
};

export const updateDriver =
  (name, date, front, back) => async dispatch => {
    try {
      const uidUser = await auth().currentUser.uid;
      await firestore().doc(`users/${uidUser}`).update({
        'driverData.name': name,
        'driverData.createdAt': date,
        'driverData.front': front,
        'driverData.back': back,
      });
      dispatch({
        type: userTypes.UPLOAD_DRIVER_ALL_SUCCESS,
        payload: true,
      });
    } catch (err) {
      console.log('ERRORS FROM CATCH 1');
      console.log(err);
    }
  };

export const fetchDriverData = () => async dispatch => {
  try {
    const uid = auth().currentUser.uid;
    var docRef = await firestore().collection("users").doc(uid);

    docRef.get().then((doc) => {
        if (doc.exists) {
          const data = doc.data();
            console.log("Document data:", data.driverData);
            dispatch({
              type: userTypes.FETCH_DRIVER_DATA,
              payload: data.driverData,
            })
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }})
  } catch (err) {
    console.log(err);
  }
};

// Credit Card BEGIN
export const uploadCreditBack = imageSource => async dispatch => {
  try {
    const currentUser = await auth().currentUser;
    if (currentUser !== null) {
      const uidUser = currentUser.uid;
      const ref = await storage().ref(`${uidUser}/Credit_back.jpg`);
      await ref.putFile(`${imageSource}`);
      const url = await storage()
        .ref(`${uidUser}/Credit_back.jpg`)
        .getDownloadURL();
      const snapshot = await firestore().doc(`users/${uidUser}`).get();
      console.log('SnapShot =>', snapshot.data);
      if (snapshot.exists) {
        try {
          await firestore().doc(`users/${uidUser}`).update({
            'creditData.back': url,
          });
          dispatch({
            type: userTypes.UPLOAD_CREDIT_BACK_SUCCESS,
            payload: true,
          });
        } catch (err) {
          console.log('error1 FROM CREDIT BACK');
          console.log(err);
        }
      }
    }
  } catch (err) {
    console.log('error2 FROM CREDIT BACK');
    console.log(err);
  }
};

export const uploadCreditFront = imageSource => async dispatch => {
  try {
    const currentUser = await auth().currentUser;
    if (currentUser !== null) {
      const uidUser = currentUser.uid;
      const ref = await storage().ref(`${uidUser}/Credit_front.jpg`);
      await ref.putFile(`${imageSource}`);
      const url = await storage()
        .ref(`${uidUser}/Credit_front.jpg`)
        .getDownloadURL();
      const snapshot = await firestore().doc(`users/${uidUser}`).get();
      console.log('SnapShot =>', snapshot.data);
      if (snapshot.exists) {
        try {
          await firestore().doc(`users/${uidUser}`).update({
            'creditData.front': url,
          });
          dispatch({
            type: userTypes.UPLOAD_CREDIT_FRONT_SUCCESS,
            payload: true,
          });
        } catch (err) {
          console.log('error1 FROM CREDIT FRONT');
          console.log(err);
        }
      }
    }
  } catch (err) {
    console.log('error2 FROM CREDIT FRONT');
    console.log(err);
  }
};

export const updateCredit =
  (name, date, front, back) => async dispatch => {
    try {
      const uidUser = await auth().currentUser.uid;
      await firestore().doc(`users/${uidUser}`).update({
        'creditData.name': name,
        'creditData.createdAt': date,
        'creditData.front': front,
        'creditData.back': back,
      });
      dispatch({
        type: userTypes.UPLOAD_CREDIT_ALL_SUCCESS,
        payload: true,
      });
    } catch (err) {
      console.log('ERRORS FROM CATCH 1');
      console.log(err);
    }
  };

export const fetchCreditData = () => async dispatch => {
  try {
    const uid = auth().currentUser.uid;
    var docRef = await firestore().collection("users").doc(uid);

    docRef.get().then((doc) => {
        if (doc.exists) {
          const data = doc.data();
            console.log("Document data:", data.creditData);
            dispatch({
              type: userTypes.FETCH_CREDIT_DATA,
              payload: data.creditData,
            })
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }})
  } catch (err) {
    console.log(err);
  }
};

// Insurance Card BEGIN
export const uploadInsuranceBack = imageSource => async dispatch => {
  try {
    const currentUser = await auth().currentUser;
    if (currentUser !== null) {
      const uidUser = currentUser.uid;
      const ref = await storage().ref(`${uidUser}/Insurance_back.jpg`);
      await ref.putFile(`${imageSource}`);
      const url = await storage()
        .ref(`${uidUser}/Insurance_back.jpg`)
        .getDownloadURL();
      const snapshot = await firestore().doc(`users/${uidUser}`).get();
      console.log('SnapShot =>', snapshot.data);
      if (snapshot.exists) {
        try {
          await firestore().doc(`users/${uidUser}`).update({
            'insuranceData.back': url,
          });
          dispatch({
            type: userTypes.UPLOAD_INSURANCE_BACK_SUCCESS,
            payload: true,
          });
        } catch (err) {
          console.log('error1 FROM INSURANCE BACK');
          console.log(err);
        }
      }
    }
  } catch (err) {
    console.log('error2 FROM INSURANCE BACK');
    console.log(err);
  }
};

export const uploadInsuranceFront = imageSource => async dispatch => {
  try {
    const currentUser = await auth().currentUser;
    if (currentUser !== null) {
      const uidUser = currentUser.uid;
      const ref = await storage().ref(`${uidUser}/Insurance_front.jpg`);
      await ref.putFile(`${imageSource}`);
      const url = await storage()
        .ref(`${uidUser}/Insurance_front.jpg`)
        .getDownloadURL();
      const snapshot = await firestore().doc(`users/${uidUser}`).get();
      console.log('SnapShot =>', snapshot.data);
      if (snapshot.exists) {
        try {
          await firestore().doc(`users/${uidUser}`).update({
            'insuranceData.front': url,
          });
          dispatch({
            type: userTypes.UPLOAD_INSURANCE_FRONT_SUCCESS,
            payload: true,
          });
        } catch (err) {
          console.log('error1 FROM INSURANCE FRONT');
          console.log(err);
        }
      }
    }
  } catch (err) {
    console.log('error2 FROM INSURANCE FRONT');
    console.log(err);
  }
};

export const updateInsurance =
  (name, date, front, back) => async dispatch => {
    try {
      const uidUser = await auth().currentUser.uid;
      await firestore().doc(`users/${uidUser}`).update({
        'insuranceData.name': name,
        'insuranceData.createdAt': date,
        'insuranceData.front': front,
        'insuranceData.back': back,
      });
      dispatch({
        type: userTypes.UPLOAD_INSURANCE_ALL_SUCCESS,
        payload: true,
      });
    } catch (err) {
      console.log('ERRORS FROM CATCH 1');
      console.log(err);
    }
  };

export const fetchInsuranceData = () => async dispatch => {
  try {
    const uid = auth().currentUser.uid;
    var docRef = await firestore().collection("users").doc(uid);

    docRef.get().then((doc) => {
        if (doc.exists) {
          const data = doc.data();
            console.log("Document data:", data.insuranceData);
            dispatch({
              type: userTypes.FETCH_INSURANCE_DATA,
              payload: data.insuranceData,
            })
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }})
  } catch (err) {
    console.log(err);
  }
};

// RESET
export const resetAllAuthForms = () => ({
  type: userTypes.RESET_AUTH_FORMS,
});
export const resetPhotos = () => ({
  type: userTypes.RESET_PHOTOS,
});
