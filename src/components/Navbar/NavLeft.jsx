import React, { useState } from 'react';
import { Collapse } from 'react-collapse';
import { useLocation, useNavigate } from 'react-router-dom';
import { useCollapsed, useToolbarStore, useCollapsedRate } from '../../store/VitalStore';
import { useTranslation } from "react-i18next";
//UI
import logo from '../../assets/logos-03.png';
import CatalogoAccordion from '../accordions/CatalogoAccordion';
import BtnDashboard from '../buttons/BtnDashboard';
import { FaBook, FaBuilding, FaDollarSign, FaList, FaReadme, FaShip, FaTags, FaTasks, FaUsers } from 'react-icons/fa';
import RatesAccordion from '../accordions/RatesAccordion';

const NavLeft = ({ collapsed, setCollapsed }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();
  const { isToolbarOpen, closeToolbar } = useToolbarStore((state) => state);

  const { isCollapsed, openCollapsed, closeCollapsed } = useCollapsed(
    (state) => state
  );

  const { isCollapsedRate, openCollapsedRates, closeCollapsedRates } = useCollapsedRate(
    (state) => state
  );

  return (
    <div
      className={`text-white overflow-y-scroll contenedor	shadow-lg fixed top-0 bottom-0 shadow-black/30 md:translate-x-0 transition-all  w-60 bg-[#2ca8ff] from-p-primary to-p-to z-20 ${isToolbarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
    >
      <div className="flex items-center justify-center m-auto gap-2 h-16 w-[90%]">
        <img className="object-contain h-[80px] mt-8 mb-5" src={logo} alt="logo" />
      </div>
      <ul className=" flex flex-col h-full items-start justify-start w-[100%] mt-5 gap-5">
        <li
          onClick={(e) => { navigate('/'); closeToolbar(); }}
          className={`w-full ${location.pathname === '/' || location.pathname === 'exit_list' ? 'active' : ''}`}>
          <BtnDashboard>
            <FaReadme/>
            <p>Registros</p>
          </BtnDashboard>
        </li>
        <li className={`w-full group mt-[-25px]`}>
          <input
            className="appearance-none"
            type="checkbox"
            id="catalogo"
            onChange={(e) => {
              e.target.checked ? openCollapsed() : closeCollapsed();
            }}
          />
          <label htmlFor="catalogo">
            <BtnDashboard>
              <FaTags />
              <div className="flex w-[100%] items-center justify-between  gap-2">
                <p>Nuevo Ingreso</p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className={`w-3 h-3 transition-all ${isCollapsed ? 'rotate-90' : ''
                    }`}
                >
                  <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                </svg>
              </div>
            </BtnDashboard>
          </label>
          <Collapse isOpened={isCollapsed}>
            <CatalogoAccordion />
          </Collapse>
        </li>
        <li
          onClick={(e) => { navigate('/'); closeToolbar(); }}
          className={`w-full ${location.pathname === '/reports' ? 'active' : ''}`}>
          <BtnDashboard>
            <FaBook />
            <p>Reportes</p>
          </BtnDashboard>
        </li>
        <div className='pl-2 text-[10px] text-sky-200 mb-[-15px]'>{t("administration_tag")}</div>
        <li className={`w-full group mt-[-25px]`}>
          <input
            className="appearance-none"
            type="checkbox"
            id="rates"
            onChange={(e) => {
              e.target.checked ? openCollapsedRates() : closeCollapsedRates();
            }}
          />
          <label htmlFor="rates">
            <BtnDashboard>
              <FaList />
              <div className="flex w-[100%] items-center justify-between  gap-2">
                <p>Catálogos</p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className={`w-3 h-3 transition-all ${isCollapsedRate ? 'rotate-90' : ''
                    }`}
                >
                  <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                </svg>
              </div>
            </BtnDashboard>
          </label>
          <Collapse isOpened={isCollapsedRate}>
            <RatesAccordion />
          </Collapse>
        </li>
      </ul>
    </div>
  );
};

export default NavLeft;
