import { ThunkAction } from "redux-thunk";
import {
    AuthAction,
    SET_USER,
    SET_LOADING,
    SIGN_OUT,
    SET_ERROR,
    SET_SUCCESS,
    SignUpData,
    User,
    SignInData
} from '../types'
import { RootState } from "..";
import firebase from '../../firebase/config';

//create user
export const signup = (data: SignUpData, onError: () => void): ThunkAction<void, RootState, null, AuthAction> => {
    return async dispatch => {
        try {
            const res = await firebase.auth().createUserWithEmailAndPassword(data.email, data.password);
            if (res.user) {
                const userData: User = {
                    email: data.email,
                    name: data.name,
                    id: res.user.uid,
                    createdAt: firebase.firestore.FieldValue.serverTimestamp()
                };
                await firebase.firestore().collection('/users').doc(res.user.uid).set(userData);
                dispatch({
                    type: SET_USER,
                    payload: userData
                });
            };
        } catch (err: any) {
            onError();
            dispatch(setError(err.message))
        };
    };
};

// get user by id
export const getUserById = (id: string): ThunkAction<void, RootState, null, AuthAction> => {
    return async dispatch => {
        try {
            const user = await firebase.firestore().collection('users').doc(id).get();
            if (user.exists) {
                const userData = user.data() as User;
                dispatch({
                    type: SET_USER,
                    payload: userData
                })
            }
        } catch (error) {
            console.log(error)
        }
    }
}

export const setLoading = (value: boolean): ThunkAction<void, RootState, null, AuthAction> => {
    return dispatch => {
        dispatch({
            type: SET_LOADING,
            payload: value
        })
    }
}

export const signin = (data: SignInData, onError: () => void): ThunkAction<void, RootState, null, AuthAction> => {
    return async dispatch => {
        try {
            await firebase.auth().signInWithEmailAndPassword(data.email, data.password);
        } catch (err: any) {
            dispatch(setError(err.message))
            onError();
        }
    }
}

export const signOut = (): ThunkAction<void, RootState, null, AuthAction> => {
    return async dispatch => {
        try {
            dispatch(setLoading(true));
            await firebase.auth().signOut();
            dispatch({
                type: SIGN_OUT
            })
        } catch (error) {
            console.log(error)
            dispatch(setLoading(false))
        }
    }
}

export const setError = (msg: string): ThunkAction<void, RootState, null, AuthAction> => {
    return dispatch => {
        dispatch({
            type: SET_ERROR,
            payload: msg
        })
    }
}

export const setSuccess = (msg: string): ThunkAction<void, RootState, null, AuthAction> => {
    return dispatch => {
        dispatch({
            type: SET_SUCCESS,
            payload: msg
        })
    }
}