import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startLogut } from '../../actions/auth';

export const Navbar = () => {

  const {name} = useSelector(state => state.auth);
  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(startLogut());
   
  }

  return (
    <div className='navbar navbar-dark bg-dark mb-4 px-3'>
        <span className='navbar-brand'>{name}</span>

        <button className='btn btn-outline-danger' onClick={handleLogout}>
            <i className='fas fa-sign-out-alt'></i>
            <span> Salir</span>
        </button>
    </div>
  )
}
