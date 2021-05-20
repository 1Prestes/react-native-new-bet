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

export default function Header () {
  return (
    <HeaderContainer>
      <LogoContainer>
        <Title>TGL</Title>
        <BorderBottom />
      </LogoContainer>

      <Feather name='log-out' size={26} color='#C1C1C1' />
    </HeaderContainer>
  )
}
