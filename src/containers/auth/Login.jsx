import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { signInThunk } from '../../store/slices/catalogs/users.slice';

//UI
import Input from '../../components/Inputs/Input';
import InputGroup from '../../components/Inputs/InputGroup';
import Label from '../../components/Inputs/Label';
import ShowPassword from '../../components/Inputs/ShowPassword';
import logo from '../../assets/logos-03.png';
import peef from '../../assets/peef.png';
import UserLogo from '../../components/Inputs/UserLogo';
import Alerts from '../../components/alerts/Alerts';



const Login = () => {
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);
  const userState = useSelector(state => state.users)
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();

   const submit = (data) => {
    dispatch(signInThunk(data));
  }

   if (userState.user.token) {
     navigate('/');
   }

   console.log(userState)


  return (
    <div
      className={`text-[#004841 ] relative transition-all h-full w-full min-h-screen bg-cover bg-center bg-[url('../src/assets/almafront.jpg')] flex justify-center items-center `}
    >
      <div className="absolute top-0 left-0 w-full h-full bg-gray-900/60 backdrop-blur-sm"></div>

      <div className="w-full transition-all sm:w-2/3 md:w-[40%] h-full bg-[#EAFDFA]/20 sm:bg-[#EAFDFA]/50 backdrop-blur-lg shadow-lg 
                  shadow-gray-700 flex flex-col items-center justify-center rounded-sm">
        <div className="w-[280px] h-[20px] z-10 -translate-x-1/2  sm:translate-x-0  sm:top-[85%] sm:left-5 rotate-[0.5deg] mb-5 ">
          <img src={logo} alt="logo" />
        </div>
        <h1 className="text-center mt-10 text-3xl font-bold">Bienvenido</h1>
        <form onSubmit={handleSubmit(submit)} className="w-2/3 max-w-xs mx-auto mb-16">
          <InputGroup>
            <Input
              id="username"
              type="text"
              register={register("email")}
              value="paola@prueba.com"
            />
            <Label htmlFor="username">Usuario</Label>
            <UserLogo />
          </InputGroup>
          <InputGroup>
            <Input
              isPasswordHidden={isPasswordHidden}
              type={isPasswordHidden ? 'password' : 'text'}
              register={register("password")}
              value="admin123"
            />
            <Label htmlFor="password">Contraseña</Label>
            <ShowPassword
              isPasswordHidden={isPasswordHidden}
              setIsPasswordHidden={setIsPasswordHidden}
            />
          </InputGroup>
          <div className='flex w-ful h-[50px] justify-end items-center'>
            {userState.message === "user or pass incorrect" ? <Alerts alert="error1" /> : 
             userState.message === "Not email provided" ? <Alerts alert="error3" /> : 
             userState.message === "Not password provided" ? <Alerts alert="error2" /> : ""
            }
          </div>
          <button type=" submit" className="btn shadow-lg btn-block bg-sky-400 hover:bg-sky-700 border-none rounded-none mt-2 text-white">
            Ingresar
          </button>
        </form>
      </div>
      <div className="absolute w-[130px] h-[20px] z-10 -translate-x-1/2 top-5 right-5 sm:translate-x-0  sm:top-[80%] sm:right-9 rotate-[0.5deg] ">
        <img src={peef} alt="logo" />
      </div>
    </div>
  );
};

export default Login;
