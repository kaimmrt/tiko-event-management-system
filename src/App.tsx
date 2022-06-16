import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Loader from './components/Loader';
import firebase from './firebase/config';
import { RootState } from './store';
import { getUserById, setLoading } from './store/actions/authActions';
import RoutePage from './pages'

function App() {

  const dispatch = useDispatch();
  const { loading } = useSelector((state: RootState) => state.auth);
  const { loadingVisitor } = useSelector((state: RootState) => state.visitor);

  //check if user exist
  useEffect(() => {
    dispatch(setLoading(true));
    const unsubcribe = firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
        dispatch(setLoading(true));
        await dispatch(getUserById(user.uid));
      }
      dispatch(setLoading(false))
    });

    return () => {
      unsubcribe();
    };
  }, [dispatch])

  if (loading || loadingVisitor) {
    return <Loader />;
  }

  return <RoutePage />

}

export default App;
