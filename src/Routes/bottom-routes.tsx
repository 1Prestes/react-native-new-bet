import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import NewBetsIcon from '../assets/icons/NewBetsIcon'
import Home from '../Pages/Home'
import HomeTest from '../Pages/HomeTest'

const Tab = createBottomTabNavigator()

function BottomRoutes () {
  return (
    <Tab.Navigator>
      <Tab.Screen name='Home' component={Home} />
      <Tab.Screen
        name='NewBet'
        component={HomeTest}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: () => <NewBetsIcon />
        }}
      />
      <Tab.Screen name='HomeTest' component={HomeTest} />
    </Tab.Navigator>
  )
}

export default BottomRoutes
