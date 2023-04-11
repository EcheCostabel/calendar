import React, { useEffect } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { LoginScreen } from '../components/auth/LoginScreen';
import { CalendarScreen } from '../components/calendar/CalendarScreen';
import { useDispatch } from 'react-redux';
import { startChecking } from '../actions/auth';

export const AppRouter = () => {

const dispatch = useDispatch();

    useEffect(() => {
        dispatch(startChecking())
    }, [dispatch])

  return (
    
        <BrowserRouter>
            <div>
                <Routes>
                    <Route path='/login' element={<LoginScreen />} />
                    <Route path='/' element={<CalendarScreen />} />
                </Routes>
                    
            </div>
        </BrowserRouter>
   
  )
}
