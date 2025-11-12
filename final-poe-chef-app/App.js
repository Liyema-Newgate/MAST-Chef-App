// App.js
import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './Screens/HomeScreen';
import Basket from './components/Basket';
import ChefScreen from './Screens/ChefScreen';

const Stack = createStackNavigator();

export default function App() {
  const [menuItems, setMenuItems] = useState([
    // Default dishes for each category
    { id: '1', name: 'Garlic Bread', description: 'Toasted baguette with garlic butter', price: 25, course: 'Starters' },
    { id: '2', name: 'Soup of the Day', description: 'Freshly made seasonal soup', price: 30, course: 'Starters' },
    { id: '3', name: 'Steak and Chips', description: 'Grilled steak with crispy chips', price: 120, course: 'Mains' },
    { id: '4', name: 'Pasta Alfredo', description: 'Creamy fettuccine with mushrooms', price: 95, course: 'Mains' },
    { id: '5', name: 'Chocolate Mousse', description: 'Rich dark chocolate dessert', price: 50, course: 'Desserts' },
    { id: '6', name: 'Cheesecake', description: 'Classic creamy cheesecake', price: 55, course: 'Desserts' },
  ]);

  const [basket, setBasket] = useState([]);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: '#1E1E1E' },
          headerTintColor: '#fff',
        }}
      >
        <Stack.Screen name="Home">
          {(props) => (
            <HomeScreen {...props} menuItems={menuItems} basket={basket} setBasket={setBasket} />
          )}
        </Stack.Screen>

        <Stack.Screen name="Basket">
          {(props) => <Basket {...props} basket={basket} setBasket={setBasket} />}
        </Stack.Screen>

        <Stack.Screen name="Chef">
          {(props) => (
            <ChefScreen {...props} menuItems={menuItems} setMenuItems={setMenuItems} />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
