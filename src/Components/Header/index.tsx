import React from 'react'
import { StatusBar } from 'expo-status-bar'
import { View, Text } from 'react-native'
import { Feather } from '@expo/vector-icons'

import {
  HeaderContainer,
  LogoContainer,
  Title,
  BorderBottom
} from './Header-style'
import { useAppDispatch } from '../../store/hooks'
import { LOGOUT_USER } from '../../store/sessionReducer'

export default function Header () {
  const dispatch = useAppDispatch()

  return (
    <HeaderContainer>
      <StatusBar style='auto' translucent={true} />
      <LogoContainer>
        <Title>TGL</Title>
        <BorderBottom />
      </LogoContainer>

      <Feather
        onPress={() => dispatch(LOGOUT_USER())}
        name='log-out'
        size={26}
        color='#C1C1C1'
      />
    </HeaderContainer>
  )
}
