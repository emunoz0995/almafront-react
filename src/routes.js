//RegistrosCompany
 //import CompanyList from "./containers/catalogo/company/CompanyList";
 import ExitList from "./containers/registros/ExitList";
 import EntryList from "./containers/registros/EntryList";
 import GruaForm from "./containers/registros/GruaForm";
//Yard
import YardList from "./containers/catalogo/yard/YardList";
import YardForm from "./containers/catalogo/yard/YardForm";
//Captain
import ClientList from "./containers/catalogo/client/ClientList";
import ClientForm from "./containers/catalogo/client/ClientForm";
//Users
import UserList from "./containers/catalogo/user/UserList";
import UserForm from "./containers/catalogo/user/UserForm";

const routes = [
  // Registros
    {
      path: "/",
      component: EntryList,
    },
    {
      path: "/exit_list",
      component: ExitList,
    },
   {
     path: "/gruas_new",
     component: GruaForm,
   },
   {
     path: "/gruas/:gruas_id",
     component: GruaForm,
   },
    
  //Yards
  {
    path: "/yards",
    component: YardList,
  },
  {
    path: "/yards_new",
    component: YardForm,
  },
  {
    path: "/yards/:yards_id",
    component: YardForm,
  },

  //Clients
  {
    path: "/clients",
    component: ClientList,
  },
  {
    path: "/clients_new",
    component: ClientForm,
  },
  {
    path: "/clients/:client_id",
    component: ClientForm,
  },

    //Users
    {
      path: "/users",
      component: UserList,
    },
    {
      path: "/users_new",
      component: UserForm,
    },
    {
      path: "/users/:user_id",
      component: UserForm,
    },
];

export default  routes ;
