
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Accueil from '../composants/Acceuil';
import FormUpdate from '../composants/FormUpdate';
import FormUpdateUser from '../composants/FormUpdateUser';
import FormCreate from '../composants/FormCreate';
import GestionOeuvres from '../composants/GestionOeuvres';
import Login from '../composants/Login';
import SinglePage from '../composants/SinglePage';
import GestionUser from '../composants/GestionUser';
import FormCreateUser from '../composants/FormCreateUser';
import ForgotPassword from '../composants/ForgotPassword';

const Stack = createNativeStackNavigator()
 

const NavigationStack = () => {
    return (
        <Stack.Navigator screenOptions={{
          unmountOnBlur : true,
        }}>
          <Stack.Screen component={Accueil} name="accueil" options={{title: "accueil"}}/>

          <Stack.Screen component={FormUpdate} name="Update" options={{title: "Update"}}/>
          <Stack.Screen component={FormCreate} name="Create" options={{title: "Create"}}/>
          <Stack.Screen component={GestionOeuvres} name="Gestion" options={{title: "Gestion"}}/>

          <Stack.Screen component={Login} name="Login" options={{title: "Login"}}/>
          <Stack.Screen component={ForgotPassword} name="ForgotPassword" options={{title: "ForgotPassword"}}/>


          <Stack.Screen component={SinglePage} name="Single" options={{title: "Single"}}/>

          


        </Stack.Navigator>
      );
}



export default NavigationStack;


export const NavigationStack2 = () => {
  return (
      <Stack.Navigator screenOptions={{
        unmountOnBlur : true,
      }}>
        <Stack.Screen component={GestionOeuvres} name="gestion" options={{headerShown : false}}/>
        <Stack.Screen component={FormUpdate} name="Update" options={{title: "Update"}}/>
        <Stack.Screen component={FormCreate} name="Create" options={{title: "Create"}}/>
        <Stack.Screen component={GestionOeuvres} name="Gestion" options={{title: "Gestion"}}/>

        
      

       

      </Stack.Navigator>
    );
}


export const NavigationStack3 = () => {
  return (
      <Stack.Navigator screenOptions={{
        unmountOnBlur : true,
      }}>
        

        <Stack.Screen component={GestionUser} name="GestionUser" options={{headerShown : false}}/>
        <Stack.Screen component={FormCreateUser} name="CreateUser" options={{title: "CreateUser"}}/>
        <Stack.Screen component={FormUpdateUser} name="UpdateUser" options={{title: "Retour"}}/>

       

      </Stack.Navigator>
    );
}
