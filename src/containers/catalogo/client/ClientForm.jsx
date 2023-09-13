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
import { getClientThunk, createClientThunk, updateClientThunk } from '../../../store/slices/catalogs/clients.slice';


const ClientForm = () => {

    const navigate = useNavigate();
    const { client_id } = useParams();
    const { setValue, register, handleSubmit, formState: { errors } } = useForm();
    const clientState = useSelector(state => state.clients);
    const dispatch = useDispatch();

    useEffect(() => {
        if (client_id) {
            dispatch(getClientThunk(client_id));
        }
    }, []);


    const onSubmit = (data) => {
        if (client_id) {
            dispatch(updateClientThunk(client_id, data));
        } else {
            dispatch(createClientThunk(data));
        }
    };

     if (clientState.message.message === "resource created successfully" || clientState.message.message === "resource updated successfully") {
         navigate("/clients");
     }

     if (Object.keys(clientState.client).length !== 0) {
         setValue('name', clientState.client.name)
         setValue('active', clientState.client.active)
     }


    return (
        <HomeLayout>
             {clientState.fetching || clientState.processing ? (
                <MainLoader />
            ) : (
                <div className="w-[96%] mt-5 ml-5 ">
                    <HeaderForm title="Clientes"/>
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
                                <BtnContent cancel={true} to={'/clients'}>Cancelar</BtnContent>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </HomeLayout>
    );
};

export default ClientForm;