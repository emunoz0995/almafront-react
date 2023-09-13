import { configureStore } from '@reduxjs/toolkit';
//CATALOGS
import users from './slices/catalogs/users.slice';
import clients from './slices/catalogs/clients.slice';
import yards from './slices/catalogs/yards.slice';
import isLoading from './slices/isLoading.slice';
import registers from './slices/registers/registers.slice';



export default configureStore({
  reducer: {
    users,
    clients,
    isLoading,
    yards,
    registers

	}
})