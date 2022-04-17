import { ThunkAction } from "redux-thunk";
import {
    SET_LOADING,
    SET_ERROR,
    SET_SUCCESS,
    CREATE_VISITOR,
    CreateVisitorData,
    Visitor,
    VisitorAction,
    FETCH_VISITORS,
    FILTER_VISITORS,
    SET_ATTEND
} from '../types'

import { RootState } from "..";
import firebase from '../../firebase/config';

export const createVisitor = (data: CreateVisitorData): ThunkAction<void, RootState, null, VisitorAction> => {
    return async dispatch => {
        try {
            dispatch(setLoading(true));
            const visitorData = {
                email: data.email,
                fullName: data.fullName,
                hesCode: data.hesCode,
                isAttented: false,
                createdAt: firebase.firestore.FieldValue.serverTimestamp()
            };
            const res = await firebase.firestore().collection('/visitors').add(visitorData);

            const newVisitorData: Visitor = {
                email: data.email,
                fullName: data.fullName,
                hesCode: data.hesCode,
                isAttented: false,
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                id: res.id
            }

            await firebase.firestore().collection('/visitors').doc(res.id).set(newVisitorData);

            dispatch({
                type: CREATE_VISITOR,
                payload: newVisitorData
            });
            dispatch(setLoading(false));
            dispatch(setSuccess("Add visitor successful."))
        } catch (err: any) {
            console.log(err)
            dispatch(setError(err.message))
        };

    };
};

export const fetchVisitors = (): ThunkAction<void, RootState, null, VisitorAction> => {
    return async dispatch => {
        try {
            console.log("girdi")
            dispatch(setLoading(true));
            const ref = firebase.firestore().collection('visitors').orderBy("createdAt", "desc")

            ref.onSnapshot((querySnapshot) => {
                const item = new Array<Visitor>();

                querySnapshot.forEach((doc: any) => {
                    item.push(doc.data())
                })
                dispatch({
                    type: FETCH_VISITORS,
                    payload: item
                })
                console.log(item)
            })

            dispatch(setLoading(false));
        }
        catch (error) {
            dispatch(setLoading(false));
            console.log(error)
        }
    }
}

export const checkIn = (data: Visitor): ThunkAction<void, RootState, null, VisitorAction> => {
    return async dispatch => {
        try {
            console.log("girdi")
            dispatch(setLoading(true));

            const newData: Visitor = {
                email: data.email,
                hesCode: data.hesCode,
                fullName: data.fullName,
                createdAt: data.createdAt,
                id: data.id,
                isAttented: !data.isAttented
            }

            dispatch({
                type: SET_ATTEND,
                payload: newData
            })

            await firebase.firestore().collection('/visitors').doc(data.id).set(newData);

            dispatch(setLoading(false));
            dispatch(setSuccess(`${data.fullName} check-in was successful`))
        }
        catch (err: any) {
            dispatch(setLoading(false));
            dispatch(setError(err.message))
        }
    }
}

export const filterVisitors = (data: string): ThunkAction<void, RootState, null, VisitorAction> => {
    return dispatch => {
        dispatch({
            type: FILTER_VISITORS,
            payload: data
        })
    }

}

export const setError = (msg: string): ThunkAction<void, RootState, null, VisitorAction> => {
    return dispatch => {
        dispatch({
            type: SET_ERROR,
            payload: msg
        })
    }
}

export const setSuccess = (msg: string): ThunkAction<void, RootState, null, VisitorAction> => {
    return dispatch => {
        dispatch({
            type: SET_SUCCESS,
            payload: msg
        })
    }
}

export const setLoading = (value: boolean): ThunkAction<void, RootState, null, VisitorAction> => {
    return dispatch => {
        dispatch({
            type: SET_LOADING,
            payload: value
        })
    }
}