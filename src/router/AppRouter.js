import React, { useEffect } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { LoginScreen } from '../components/auth/LoginScreen';
import { CalendarScreen } from '../components/calendar/CalendarScreen';
import { useDispatch, useSelector } from 'react-redux';
import { startChecking } from '../actions/auth';

export const AppRouter = () => {

const dispatch = useDispatch();
const {checking, uid} = useSelector(state => state.auth);   //saco checking y uid de state.auth

    useEffect(() => {
        dispatch(startChecking())
    }, [dispatch]);

    if(checking) {
        return (<h5>Espere...</h5>)
    }

  return (
    
        <BrowserRouter>
            <div>
                <Routes>
                    <Route path='/login' element={!uid ? <LoginScreen /> : <CalendarScreen />} />
                    <Route path='/' element={!!uid ? <CalendarScreen /> : <LoginScreen />  } />

                    

                </Routes>
                    
            </div>
        </BrowserRouter>
   
  )
}
