import React from 'react'
import { Provider } from 'react-redux'
import { AppRouter } from './router/AppRouter'
import { store } from './store/store'

export const CalendarApp = () => {
  return (
    <div className=''>
        <Provider store={store}>
          <AppRouter />
        </Provider>
    </div>
  )
}
