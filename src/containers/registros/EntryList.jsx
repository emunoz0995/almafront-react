import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from "react-i18next";
import { useForm } from 'react-hook-form';
//UI
import HomeLayout from '../../layouts/HomeLayout';
import BtnTable from '../../components/buttons/BtnTable';
import MainLoader from '../../components/Loaders/MainLoader';
import HeaderRegister from '../../components/headers/catalogs/HeaderRegister';

//SLICE
import { getRegistersThunk, deleteRegisterThunk } from '../../store/slices/registers/registers.slice';


const EntryList = () => {

    const { t } = useTranslation();
    const registerState = useSelector(state => state.registers);
    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(getRegistersThunk());
    }, []);


    if (registerState.message.message === "resource deleted successfully") {
        dispatch(getRegistersThunk());
    }

    const handleDelete = (register_id) => {
        dispatch(deleteRegisterThunk(register_id));
    };


    return (
        <HomeLayout>
            {registerState.fetching || registerState.processing ? (
                <MainLoader />
            ) : (
                <div className="mx-5 my-5 w-[97%]">
                    <HeaderRegister title='Existencias' titleOne="Procesados" to='/exit_list' />
                    {/* <HeaderSimple title='Usuarios' to='/Registers_new' /> */}
                    <div className="overflow-y-scroll h-[87%] contenedor">
                        <table className="text-[13px] table table-zebra w-full">
                            <thead className='border-t-2 border-t-sky-500' >
                                <tr className='bg-green'>
                                    <th>Registro</th>
                                    <th>Fecha</th>
                                    <th>Operacion</th>
                                    <th>Equipo</th>
                                    <th>Proceso</th>
                                    <th>Tipo Carga</th>
                                    <th>Forma de Operar</th>
                                    <th>Cap Contenedor</th>
                                    <th>Estado</th>
                                    <th>Operador</th>
                                    <th>Patio</th>
                                    <th>Otro Patio</th>
                                    <th>N° Contenedor</th>
                                    <th>N° Plataforma</th>
                                    <th>Orden Ingreso</th>
                                    <th>Conductor</th>
                                    <th>Placas</th>
                                    <th>Cliente</th>
                                    <th>Tipo transporte</th>
                                    <th>Mercancia</th>
                                    <th>Observaciones</th>
                                    <th>Valor ingreso</th>
                                    <th>Estatus</th>
                                    <th>N° Factura</th>
                                    <th className='sticky right-0'></th>
                                </tr>
                            </thead>
                            <tbody>
                                {registerState.registers.map(register => (
                                    <tr key={register.id}>
                                        <td>{register.id}</td>
                                        <td>{register.entryDate}</td>
                                        <td>{register.opertion}</td>
                                        <td>{register.typeTeam}</td>
                                        <td>{register.typeOperation}</td>
                                        <td>{register.typeLoad}</td>
                                        <td>{register.wayOperating}</td>
                                        <td>{register.container}</td>
                                        <td>{register.state}</td>
                                        <td>{register.operator}</td>
                                        <td>{register.yard}</td>
                                        <td>{register.otros_patios?.name}</td>
                                        <td>{register.numberContainer}</td>
                                        <td>{register.numberPlataform}</td>
                                        <td>{register.numberOrderIncome}</td>
                                        <td>{register.econductor}</td>
                                        <td>{register.placas}</td>
                                        <td>{register.cliente.name}</td>
                                        <td>{register.typeTransport}</td>
                                        <td>{register.mercancie}</td>
                                        <td>{register.entryObservations}</td>
                                        <td>{register.valOperationEntry}</td>
                                        <td>{register.status}</td>
                                        <td>{register.facture}</td>
                                        <td className='flex gap-1 justify-end sticky right-0'>
                                            <BtnTable action="edit" to={`/gruas/${register.id}`} />
                                            <BtnTable title={t("Register_delete")} action="delete" onclick={() => handleDelete(register.id)} />
                                            <BtnTable action="process" to={`/Registers/${register.id}`} />
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

export default EntryList;