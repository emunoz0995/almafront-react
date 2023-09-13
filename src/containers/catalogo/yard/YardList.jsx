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
import { getYardsThunk, deleteYardThunk } from '../../../store/slices/catalogs/yards.slice';

const YardList = () => {

    const { t } = useTranslation();
    const yardState = useSelector(state => state.yards);
    const dispatch = useDispatch();
 

    useEffect(() => {
        dispatch(getYardsThunk());
    }, []);


    if (yardState.message.message === "resource deleted successfully") {
        dispatch(getYardsThunk());
    }

    const handleDelete = (yard_id) => {
        dispatch(deleteYardThunk(yard_id));
    };

    return (
        <HomeLayout>
             {yardState.fetching || yardState.processing ? (
                <MainLoader />
            ) : (
                <div className="mx-5 my-5 w-full">
                <HeaderSimple title='Patios' to='/yards_new' />
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
                                {yardState.yards.map(yard => (
                                    <tr key={yard.id}>
                                        <td><IconStatus active={yard.active} /></td>
                                        <td>{yard.name}</td>                        
                                        <td className='flex gap-1 justify-end'>
                                            <BtnTable action="edit" to={`/yards/${yard.id}`} />
                                            <BtnTable title="¿Quieres eliminar este patio?" action="delete" onclick={() => handleDelete(yard.id)} />
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

export default YardList;