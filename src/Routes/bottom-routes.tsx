import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import { useAppSelector } from '../store/hooks'
import Home from '../Pages/Home'
import NewBet from '../Pages/NewBet'
import {
  NavItemAccount,
  NavItemHome,
  NavItemNewBet
} from '../Components/NavTabItems'
import SignIn from '../Pages/Sign-in'
import SignUp from '../Pages/Sign-up'
import ForgotPassword from '../Pages/ForgotPassword'
import Account from '../Pages/Account'
const Tab = createBottomTabNavigator()

function BottomRoutes () {
  const token = useAppSelector(state => state.session.token)

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
      {!token ? (
        <>
          <Tab.Screen
            name='SignIn'
            component={SignIn}
            options={{
              tabBarVisible: false
            }}
          />
          <Tab.Screen
            name='SignUp'
            component={SignUp}
            options={{
              tabBarVisible: false
            }}
          />
          <Tab.Screen
            name='ForgotPassword'
            component={ForgotPassword}
            options={{
              tabBarVisible: false
            }}
          />
        </>
      ) : (
        <>
          <Tab.Screen
            name='Home'
            component={Home}
            options={{
              tabBarIcon: ({ focused }) => <NavItemHome focused={focused} />
            }}
          />

          <Tab.Screen
            name='NewBet'
            component={NewBet}
            options={{
              tabBarIcon: () => <NavItemNewBet />
            }}
          />
          <Tab.Screen
            name='Account'
            component={Account}
            options={{
              tabBarIcon: ({ focused }) => <NavItemAccount focused={focused} />
            }}
          />
        </>
      )}
    </Tab.Navigator>
  )
}

export default BottomRoutes
