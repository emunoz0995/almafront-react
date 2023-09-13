import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

//UI
import MainLoader from '../../../components/Loaders/MainLoader';
import InputForm from '../../../components/Inputs/formInput/InputForm';
import HomeLayout from '../../../layouts/HomeLayout';
import HeaderForm from '../../../components/headers/catalogs/HeaderForm';
import BtnContent from '../../../components/buttons/BtnContent';
import '../../../App.css';
// SLICES 
import { getYardThunk, createYardThunk, updateYardThunk } from '../../../store/slices/catalogs/yards.slice';


const YardForm = () => {

    const navigate = useNavigate();
    const {yards_id} = useParams();
    const { setValue, register, handleSubmit, formState: { errors } } = useForm();
    const yardState = useSelector(state => state.yards);
    const dispatch = useDispatch();

    useEffect(() => {
        if (yards_id) {
            dispatch(getYardThunk(yards_id));
        }
    }, []);


    const onSubmit = (data) => {
        if (yards_id) {
            dispatch(updateYardThunk(yards_id, data));
        } else {
            dispatch(createYardThunk(data));
        }
    };

     if (yardState.message.message === "resource created successfully" || yardState.message.message === "resource updated successfully") {
         navigate("/yards");
     }

     if (Object.keys(yardState.yard).length !== 0) {
         setValue('name', yardState.yard.name)
         setValue('active', yardState.yard.active)
     }

     return (
        <HomeLayout>
             {yardState.fetching || yardState.processing ? (
                <MainLoader />
            ) : (
                <div className="w-[96%] mt-5 ml-5 ">
                    <HeaderForm title="Patios"/>
                    <div className='h-[90%] overflow-y-scroll contenedor'>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className='flex gap-2 p-2'>
                                <InputForm
                                    type="text"
                                    label="Nombre"
                                    input="input"
                                    spam={true}
                                    cols={1}
                                    register={register("name", { required: true })}
                                    placeholder="Nombre"
                                    errors={errors.name && (<span className="text-red-500 text-xs">{t("required_information")}</span>)}
                                />
                                 <InputForm
                                    type="checkbox"
                                    label="Activo"
                                    input="checkbox"
                                    spam={false}
                                    cols={1}
                                    register={register("active")}
                                />
                            </div>
                            <div className="flex items-center justify-start py-5 gap-2 border-t-2 border-orange-500 mt-8">
                                <BtnContent type="submit">Guardar</BtnContent>
                                <BtnContent cancel={true} to={'/yards'}>Cancelar</BtnContent>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </HomeLayout>
    );
};

export default YardForm;