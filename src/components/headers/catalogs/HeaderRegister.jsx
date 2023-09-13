import React from 'react';
import BtnAdd from '../../buttons/BtnAdd';
import { Link } from 'react-router-dom';
import { FaCheckCircle } from 'react-icons/fa';


const HeaderRegister = ({ title, titleOne, to }) => {
    return (
        <div className='w-ful flex text-2xl font-semibold justify-between gap-2 mb-5'>
            <h1>{title}</h1>
            <div className='text-sky-500 hover:text-sky-300 text-[16px] flex bg-slate-100 w-[150px] justify-center items-center gap-1'>
                <FaCheckCircle/>
                <Link to={to}>{titleOne}</Link>
            </div>
        </div>
    );
};

export default HeaderRegister;