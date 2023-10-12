import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Login from './composants/Login';
import Accueil from './composants/Acceuil';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import NavigationStack, { NavigationStack2, NavigationStack3 } from './Navigation/NavigationStack';
import Icone from "react-native-vector-icons/Foundation";
import FormCreate from './composants/FormCreate';
import FormCreateUser from './composants/FormCreateUser';
import GestionOeuvres from './composants/GestionOeuvres';
import GestionUser from './composants/GestionUser';




const Tabs = createBottomTabNavigator()

export default function App() {
  return (
    <View style={styles.container}>
      
      <NavigationContainer>
        <Tabs.Navigator  screenOptions={{
          unmountOnBlur : true,
        }}>
          <Tabs.Screen options={{
              headerShown: false, 
             
              tabBarIcon: function(){
                return <Icone size={20} color={'black'} name="home"/>
              }}} 
            component={NavigationStack} name="home"/>
            <Tabs.Screen component={Login} name="login" options={{
            tabBarIcon : function(){
              return <Icone size={30} color={"black"} name="eye"/>
            }       
             
            }}/>

            

            <Tabs.Screen component={FormCreateUser} name="user" options={{
            tabBarIcon : function(){
              return <Icone size={30} color={"black"} name="eye"/>
            }       
             
            }}/>
            
            <Tabs.Screen component={NavigationStack2} name="Gestion" options={{
            tabBarIcon : function(){
              return <Icone size={30} color={"black"} name="eye"/>
            }        
            }}/>

		 <Tabs.Screen component={NavigationStack3} name="GestionUser" options={{
            tabBarIcon : function(){
              return <Icone size={30} color={"black"} name="eye"/>
            }        
            }}/>
            
           
        </Tabs.Navigator>
      </NavigationContainer>
      <StatusBar style="auto" />
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});




