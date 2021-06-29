import userTypes from './user.types';

const INITIAL_STATE = {
    currentUser: null,
    signInSuccess: false,
    signUpSuccess: false,
    recoverySuccess: false,
    errors: [],
    uploadCreditFrontSuccess: false,
    uploadCreditBackSuccess: false,
    uploadDriverFrontSuccess: false,
    uploadDriverBackSuccess: false,
    uploadInsuranceFrontSuccess: false,
    uploadInsuranceBackSuccess: false,
    driverData: null,
    creditData: null,
    insuranceData: null,
    creditDataSuccess: false,
    driverDataSuccess: false,
    insuranceDataSuccess: false,
}

const userReducer = (state = INITIAL_STATE, action) => {
    switch(action.type){
        case userTypes.SET_CURRENT_USER:
            return{
                ...state,
                currentUser: action.payload
            }
        case userTypes.SIGN_IN_SUCCESS:
            return{
                ...state,
                signInSuccess: action.payload
            }
        case userTypes.SIGN_UP_SUCCESS:
            return{
                ...state,
                signUpSuccess: action.payload
            }
        case userTypes.RECOVERY_SUCCESS:
            return{
                ...state,
                recoverySuccess: action.payload
            }
        case userTypes.SET_ERRORS:
            return{
                ...state,
                errors: action.payload
            }
        case userTypes.UPLOAD_CREDIT_FRONT_SUCCESS:
            return{
                ...state,
                uploadCreditFrontSuccess: action.payload
            }
        case userTypes.UPLOAD_CREDIT_BACK_SUCCESS:
            return{
                ...state,
                uploadCreditBackSuccess: action.payload
            }
        case userTypes.UPLOAD_DRIVER_FRONT_SUCCESS:
            return{
                ...state,
                uploadDriverFrontSuccess: action.payload
            }
        case userTypes.UPLOAD_DRIVER_BACK_SUCCESS:
            return{
                ...state,
                uploadDriverBackSuccess: action.payload
            }
        case userTypes.UPLOAD_INSURANCE_FRONT_SUCCESS:
            return{
                ...state,
                uploadInsuranceFrontSuccess: action.payload
            }
        case userTypes.UPLOAD_INSURANCE_BACK_SUCCESS:
            return{
                ...state,
                uploadInsuranceBackSuccess: action.payload
            }
        case userTypes.FETCH_CREDIT_DATA:
            return{
                ...state,
                creditData: action.payload
            }
        case userTypes.FETCH_DRIVER_DATA:
            return{
                ...state,
                driverData: action.payload
            }
        case userTypes.FETCH_INSURANCE_DATA:
            return{
                ...state,
                insuranceData: action.payload
            }
        case userTypes.UPLOAD_CREDIT_ALL_SUCCESS:
            return{
                ...state,
                creditDataSuccess: action.payload
            }
        case userTypes.UPLOAD_DRIVER_ALL_SUCCESS:
            return{
                ...state,
                driverDataSuccess: action.payload
            }
        case userTypes.UPLOAD_INSURANCE_ALL_SUCCESS:
            return{
                ...state,
                insuranceDataSuccess: action.payload
            }
        case userTypes.RESET_AUTH_FORMS:
            return{
                ...state,
                signInSuccess: false,
                signUpSuccess: false,
                recoverySuccess: false,
                errors: [],
            }
        case userTypes.RESET_PHOTOS:
            return{
                ...state,
                errors: [],
                uploadCreditFrontSuccess: false,
                uploadCreditBackSuccess: false,
                uploadDriverFrontSuccess: false,
                uploadDriverBackSuccess: false,
                uploadInsuranceFrontSuccess: false,
                uploadInsuranceBackSuccess: false,
            }
        default:
            return state;
    }
}
export default userReducer;
