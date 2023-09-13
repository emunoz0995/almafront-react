import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from "react-i18next";


//UI
import MainLoader from '../../components/Loaders/MainLoader';
import InputForm from '../../components/Inputs/formInput/InputForm';
import HomeLayout from '../../layouts/HomeLayout';
import HeaderForm from '../../components/headers/catalogs/HeaderForm';
import BtnContent from '../../components/buttons/BtnContent';
import DropdownFormResours from '../../components/Inputs/formInput/DropdonwFormResours';
import '../../App.css';
// SLICES 
//SLICE
import { getYardsThunk } from '../../store/slices/catalogs/yards.slice';
import { getClientsThunk } from '../../store/slices/catalogs/clients.slice';
//RESOURCES
import { equiposGrua, proceso, contenedores, estado, operadores, patios } from '../../resources/optionsList';
import DropdownForm from '../../components/Inputs/formInput/DropdonwForm';
import InputRadioForm from '../../components/Inputs/formInput/InputRadioForm';


const GruaForm = () => {

    const navigate = useNavigate();
    const { t } = useTranslation();
    const { yards_id } = useParams();
    const { setValue, register, handleSubmit, formState: { errors } } = useForm();
    const yardState = useSelector(state => state.yards);
    const clientState = useSelector(state => state.clients);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getYardsThunk());
        dispatch(getClientsThunk());
    }, []);


    const onSubmit = (data) => {
        if (yards_id) {
            dispatch(updateYardThunk(yards_id, data));
        } else {
            console.log(data)
            //dispatch(createYardThunk(data));
        }
    };

    if (Object.keys(yardState.yard).length !== 0) {
        setValue('name', yardState.yard.name)
    }

    const currentDate = new Date().toISOString().slice(0, 10);
    const [selectedDate, setSelectedDate] = useState(currentDate);

    return (
        <HomeLayout>
            {yardState.fetching || yardState.processing ? (
                <MainLoader />
            ) : (
                <div className="w-[96%] mt-5 ml-5 ">
                    {yards_id ?
                        <HeaderForm title="Modificar Ingreso Grua" /> :
                        <HeaderForm title="Nuevo Ingreso Grua" />
                    }
                    <div className='h-[90%] overflow-y-scroll contenedor'>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className='flex gap-2 p-2'>
                                <InputForm
                                    type="date"
                                    label="Fecha de Operacion"
                                    input="input"
                                    spam={false}
                                    cols={1}
                                    register={register("entryDate")}
                                    defaultValue={selectedDate}
                                />
                                <InputForm
                                    type="text"
                                    label="Tipo de Operacion"
                                    input="input"
                                    spam={false}
                                    cols={1}
                                    register={register("opertion")}
                                    value="Grua"
                                />
                            </div>
                            <div className='flex gap-2 p-2'>
                                <DropdownFormResours
                                    label="Equipo"
                                    input="input"
                                    spam={true}
                                    cols={1}
                                    register={register("typeTeam", { required: true })}
                                    options={equiposGrua}
                                    errors={errors.typeTeam && (<span className="text-red-500 text-xs">{t("required_information")}</span>)}
                                />
                                <DropdownFormResours
                                    label="Proceso"
                                    input="input"
                                    spam={true}
                                    cols={1}
                                    register={register("typeOperation", { required: true })}
                                    options={proceso}
                                    errors={errors.typeOperation && (<span className="text-red-500 text-xs">{t("required_information")}</span>)}
                                />
                                <DropdownFormResours
                                    label="Contenedor"
                                    input="input"
                                    spam={true}
                                    cols={1}
                                    register={register("container", { required: true })}
                                    options={contenedores}
                                    errors={errors.container && (<span className="text-red-500 text-xs">{t("required_information")}</span>)}
                                />
                                <DropdownFormResours
                                    label="Estado"
                                    input="input"
                                    spam={true}
                                    cols={1}
                                    register={register("state", { required: true })}
                                    options={estado}
                                    errors={errors.state && (<span className="text-red-500 text-xs">{t("required_information")}</span>)}
                                />
                            </div>
                            <div className='flex gap-2 p-2'>
                                <DropdownFormResours
                                    label="Operador"
                                    input="input"
                                    spam={false}
                                    cols={1}
                                    register={register("operator", {required: true})}
                                    options={operadores}
                                    errors={errors.operator && (<span className="text-red-500 text-xs">{t("required_information")}</span>)}
                                />
                                <DropdownFormResours
                                    label="Patio"
                                    input="input"
                                    spam={false}
                                    cols={1}
                                    register={register("yard")}
                                    options={patios}
                                />
                                <DropdownForm
                                    label="Otro Patio"
                                    input="input"
                                    spam={true}
                                    cols={1}
                                    register={register("otherYard")}
                                    options={yardState.yards}
                                    disable={true}
                                />
                            </div>
                            <div className='flex gap-2 p-2'>
                                <InputForm
                                    type="text"
                                    label="N° Contenedor"
                                    input="input"
                                    spam={false}
                                    cols={1}
                                    register={register("numberContainer")}
                                    placeholder="N° Contenedor"
                                />
                                <InputForm
                                    type="text"
                                    label="N° Orden Ingreso"
                                    input="input"
                                    spam={false}
                                    cols={1}
                                    register={register("numberOrderIncome")}
                                    placeholder="N° Orden Ingreso"
                                />
                                <InputForm
                                    type="text"
                                    label="Conductor"
                                    input="input"
                                    spam={false}
                                    cols={1}
                                    register={register("econductor")}
                                    placeholder="Conductor"
                                />
                                <InputForm
                                    type="text"
                                    label="Placas"
                                    input="input"
                                    spam={false}
                                    cols={1}
                                    register={register("placas")}
                                    placeholder="Placas"
                                />
                            </div>
                            <div className='flex gap-2 p-2'>
                                <DropdownForm
                                    label="Cliente"
                                    input="input"
                                    spam={true}
                                    cols={1}
                                    register={register("clientId", { required: true })}
                                    options={clientState.clients}
                                    errors={errors.clientId && (<span className="text-red-500 text-xs">{t("required_information")}</span>)}
                                />
                                <InputForm
                                    type="text"
                                    label="Tipo transporte"
                                    input="input"
                                    spam={false}
                                    cols={1}
                                    register={register("typeTransport")}
                                    placeholder="Tipo transporte"
                                />
                                <InputForm
                                    type="text"
                                    label="Mercancia"
                                    input="input"
                                    spam={false}
                                    cols={1}
                                    register={register("mercancie")}
                                    placeholder="Mercancia"
                                />
                                <InputForm
                                    type="text"
                                    label="Observaciones"
                                    input="input"
                                    spam={false}
                                    cols={1}
                                    register={register("entryObservations")}
                                    placeholder="Observaciones"
                                />
                            </div>
                            <div className='flex gap-2 p-2'>
                                <InputForm
                                    type="text"
                                    label="Valor operacion ingreso"
                                    input="input"
                                    spam={false}
                                    cols={1}
                                    register={register("valOperationEntry")}
                                />
                                <InputRadioForm
                                    type="radio"
                                    label="¿Cancelado?"
                                    input="input"
                                    spam={false}
                                    cols={1}
                                    register={register("status")}
                                />
                                <InputForm
                                    type="text"
                                    label="Factura N°"
                                    input="input"
                                    spam={false}
                                    cols={1}
                                    register={register("facture")}
                                />
                            </div>
                            <div className="flex items-center justify-start py-5 gap-2 border-t-2 border-orange-500 mt-8">
                                <BtnContent type="submit">Guardar</BtnContent>
                                <BtnContent cancel={true} to={'/'}>Cancelar</BtnContent>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </HomeLayout>
    );
};

export default GruaForm;