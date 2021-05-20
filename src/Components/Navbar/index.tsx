import React from 'react'
import { StatusBar } from 'expo-status-bar'
import { View, Text } from 'react-native'
import { Feather } from '@expo/vector-icons'

import {
  NavbarContainer,
  LogoContainer,
  Title,
  BorderBottom
} from './Navbar-style'

export default function Navbar () {
  return (
    <NavbarContainer>
      <LogoContainer>
        <Title>TGL</Title>
        <BorderBottom />
      </LogoContainer>

      <Feather name='log-out' size={26} color='#C1C1C1' />
    </NavbarContainer>
  )
}
