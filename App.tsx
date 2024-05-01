import 'react-native-gesture-handler'

import React from "react"

import { TransitionPresets, createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer, NavigationProp } from '@react-navigation/native';

import BudgetEntry from './screens/BudgetEntry';
import BudgetEntryList from './screens/BudgetEntryList';

import { Provider } from 'react-redux';
import store from './redux_store/configureStore';

import { View } from 'react-native';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faIndianRupee } from '@fortawesome/free-solid-svg-icons';


const App = () => {
  const Stack = createStackNavigator();
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Budget Entry'
        screenOptions={{
          headerShown: true,
          gestureEnabled: true,
          ...TransitionPresets.BottomSheetAndroid
          ,
        }}
        >
          <Stack.Screen
          name='Budget Entry' component={BudgetEntry}
          options={{title:'HOME BUDGET',headerStyle:{},
            headerLeft:()=><View style={{paddingLeft:10}}>
              <FontAwesomeIcon icon={faIndianRupee}></FontAwesomeIcon>
              </View>}}

          ></Stack.Screen>
          <Stack.Screen name='Budget Entry List' component={BudgetEntryList}
          options={{title:'SAVED ENTRIES',headerStyle:{}}}
          ></Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>

  )
}

type ScreenNames = ["Budget Entry", "Budget Entry List"];
type RootStackParamList = Record<ScreenNames[number], undefined>;
export type StackNavigation = NavigationProp<RootStackParamList>;

export default App;
