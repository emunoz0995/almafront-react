import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import BtnDashboard from '../buttons/BtnDashboard';
import { useTranslation } from "react-i18next";
import { FaCircle } from 'react-icons/fa';

const RatesAccordion = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();
  
  return (
    <ul className=''>
      <li
        onClick={() => {
          navigate('/users');
        }}
        className={`w-full ${location.pathname === '/users' ? 'active' : ''}`}
      >
        <BtnDashboard><FaCircle className='ml-5' size={"7px"} color='#fff' />Usuarios</BtnDashboard>
      </li>
      <li
        className={`w-full ${
          location.pathname === '/clients' ? 'active' : ''
        }`}
        onClick={() => {
          navigate('/clients');
        }}
      >
        <BtnDashboard><FaCircle className='ml-5' size={"7px"} color='#fff' />Clientes</BtnDashboard>
      </li>
      <li
        onClick={() => {
          navigate('/yards');
        }}
        className={`w-full ${
          location.pathname === '/yards' ? 'active' : ''
        }`}
      >
        <BtnDashboard><FaCircle className='ml-5' size={"7px"} color='#fff' />Patios</BtnDashboard>
      </li>
     
    </ul>
  );
};

export default RatesAccordion;
