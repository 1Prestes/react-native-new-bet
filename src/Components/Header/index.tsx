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
import { CLEAR_DATA } from '../../store/gamesReducer'
import { CLEAR_USER_ERROR } from '../../store/userReducer'

export default function Header () {
  const dispatch = useAppDispatch()

  const logout = () => {
    dispatch(LOGOUT_USER())
    dispatch(CLEAR_DATA())
    dispatch(CLEAR_USER_ERROR())
  }

  return (
    <HeaderContainer>
      <StatusBar style='auto' translucent={true} />
      <LogoContainer>
        <Title>TGL</Title>
        <BorderBottom />
      </LogoContainer>

      <Feather onPress={logout} name='log-out' size={26} color='#C1C1C1' />
    </HeaderContainer>
  )
}
