import React from 'react'
import { View, Text } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'

import { Container } from './Navbar-style'
import CustomText from '../CustomText'
import { theme } from '../../assets/style/theme'

export default function Navbar () {
  return (
    <Container>
      <View>
        <MaterialCommunityIcons
          name='home-outline'
          size={25}
          color={theme.colors.green}
        />
        <CustomText>Home</CustomText>
      </View>
      <Text>New Bet</Text>
      <Text>Account</Text>
    </Container>
  )
}
