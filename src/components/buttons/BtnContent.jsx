import React from 'react';
import useModalStore from '../../store/VitalStore';
import { useNavigate } from 'react-router-dom';

export default function BtnContent({ children, type, cancel, to }) {
  
  const navigate = useNavigate();

  if (cancel) {
    return (
      <div
        onClick={() => navigate(`${to}`)}
        className={`bg-gray-400 hover:bg-gray-600 cursor-pointer 
        text-white  transition-all active:scale-95 p-3 md:py-1 rounded-md font-normal shadow-lg shadow-base-content/30 flex items-center gap-1 justify-center`}
      >
        {children}
      </div>
    );
  }

  return (
    <button
      type={type && type}
      className={`
        text-white  transition-all p-3 md:py-1 rounded-md font-normal shadow-lg shadow-base-content/30 flex items-center justify-center ${
          type === 'submit'
            ? 'bg-sky-400 hover:bg-sky-600 active:scale-95'
            : 'bg-gray-300'
        }`}
    >
      {children}
    </button>
  );
}
