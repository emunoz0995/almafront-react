import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from "react-i18next";

//UI
import HomeLayout from '../../../layouts/HomeLayout';
import BtnTable from '../../../components/buttons/BtnTable';
import HeaderSimple from '../../../components/headers/catalogs/HeaderSimple';
import MainLoader from '../../../components/Loaders/MainLoader';
import IconStatus from '../../../components/icons/IconStatus';
//SLICE
import { getClientsThunk, deleteClientThunk } from '../../../store/slices/catalogs/clients.slice';

const ClientList = () => {

    const { t } = useTranslation();
    const clientState = useSelector(state => state.clients);
    const dispatch = useDispatch();
 

    useEffect(() => {
        dispatch(getClientsThunk());
    }, []);


    if (clientState.message.message === "resource deleted successfully") {
        dispatch(getClientsThunk());
    }

    const handleDelete = (user_id) => {
        dispatch(deleteClientThunk(user_id));
    };

  console.log(clientState)
    return (
        <HomeLayout>
             {clientState.fetching || clientState.processing ? (
                <MainLoader />
            ) : (
                <div className="mx-5 my-5 w-full">
                <HeaderSimple title='Clientes' to='/clients_new' />
                    <div className="overflow-y-scroll h-[87%] contenedor">
                        <table className="text-[13px] table table-zebra w-full">
                            <thead className='border-t-2 border-t-sky-500' >
                                <tr>
                                    <th className='w-[15px]'></th>
                                    <th>Nombre</th>    
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {clientState.clients.map(client => (
                                    <tr key={client.id}>
                                        <td><IconStatus active={client.active} /></td>
                                        <td>{client.name}</td>
                                        <td className='flex gap-1 justify-end'>
                                            <BtnTable action="edit" to={`/clients/${client.id}`} />
                                            <BtnTable title="¿Quieres eliminar este cliente?" action="delete" onclick={() => handleDelete(client.id)} />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </HomeLayout>
    );
};

export default ClientList;