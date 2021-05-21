import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { MaterialCommunityIcons } from '@expo/vector-icons'

import Home from '../Pages/Home'
import HomeTest from '../Pages/HomeTest'
import {
  NavItemAccount,
  NavItemHome,
  NavItemNewBet
} from '../Components/NavTabItems'
const Tab = createBottomTabNavigator()

function BottomRoutes () {
  return (
    <Tab.Navigator
      tabBarOptions={{
        showLabel: false,
        style: {
          justifyContent: 'center',
          alignItems: 'center',
          height: 71,
          borderTopLeftRadius: 15,
          borderTopRightRadius: 15
        }
      }}
    >
      <Tab.Screen
        name='Home'
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => <NavItemHome focused={focused} />
        }}
      />
      <Tab.Screen
        name='NewBet'
        component={HomeTest}
        options={{
          tabBarIcon: () => <NavItemNewBet />
        }}
      />
      <Tab.Screen
        name='HomeTest'
        component={HomeTest}
        options={{
          tabBarIcon: ({ focused }) => <NavItemAccount focused={focused} />
        }}
      />
    </Tab.Navigator>
  )
}

export default BottomRoutes
