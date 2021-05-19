import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { StackNavigationProp } from '@react-navigation/stack'

import SignIn from './Pages/Sign-in'
import SignUp from './Pages/Sign-up'

type RootStackParamList = {
  SignIn: undefined
  SignUp: undefined
}

type ProfileScreenNavigationProp = StackNavigationProp<RootStackParamList>

export type NavigationProps = {
  navigation: ProfileScreenNavigationProp
}

const Stack = createStackNavigator<RootStackParamList>()

export default function Routes () {
  return (
    <Stack.Navigator initialRouteName='SignIn' headerMode='none'>
      <Stack.Screen name='SignIn' component={SignIn} />
      <Stack.Screen name='SignUp' component={SignUp} />
    </Stack.Navigator>
  )
}
