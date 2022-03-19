import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator()


// Routes
import Home from './Components/Home';
import Heart from './Components/Screens/Heart';
import Lungs from './Components/Screens/Lungs';
import Brain from './Components/Screens/Brain';
import Eye from './Components/Screens/Eye';


const App = () =>{
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen component={Home} name="Home" options={{title:"Welcome to Medic AI"}}/>
        <Stack.Screen component={Heart} name="Heart" options={{title:"Welcome to Heart Diagnosis"}}/>
        <Stack.Screen component={Lungs} name="Lungs" options={{title:"Welcome to Lungs Diagnosis"}}/>
        <Stack.Screen component={Eye} name="Eye" options={{title:"Welcome to Eye Diagnosis"}}/>
        <Stack.Screen component={Brain} name="Brain" options={{title:"Welcome to Brain Diagnosis"}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App