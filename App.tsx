import 'react-native-gesture-handler'

import React from "react"

import { NavigationContainer, NavigationProp } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import BudgetEntry from './screens/BudgetEntry';
import BudgetEntryList from './screens/BudgetEntryList';

import { Provider } from 'react-redux';
import store from './redux_store/configureStore';


const App = () => {
  const Stack = createStackNavigator();
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Budget Entry'>
          <Stack.Screen name='Budget Entry' component={BudgetEntry}></Stack.Screen>
          <Stack.Screen name='Budget Entry List' component={BudgetEntryList}></Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>

  )
}

type ScreenNames = ["Budget Entry", "Budget Entry List"];
type RootStackParamList = Record<ScreenNames[number], undefined>;
export type StackNavigation = NavigationProp<RootStackParamList>;

export default App;
