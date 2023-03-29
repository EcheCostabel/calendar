import React from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { LoginScreen } from '../components/auth/LoginScreen';
import { CalendarScreen } from '../components/calendar/CalendarScreen';

export const AppRouter = () => {
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
