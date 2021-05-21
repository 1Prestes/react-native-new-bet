import React from 'react'
import { View, Text } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { FontAwesome } from '@expo/vector-icons'

import { theme } from '../../assets/style/theme'
import NewBetsIcon from '../../assets/icons/NewBetsIcon'

import CustomText from '../CustomText'
import {
  NavItemContainer,
  BorderTop,
  NavItemNewBetContainer
} from './NavTabItens'

export function NavItemHome ({ focused }: any) {
  return (
    <NavItemContainer>
      {focused && <BorderTop />}
      <MaterialCommunityIcons
        name='home-outline'
        size={26}
        color={focused ? theme.colors.green : '#C1C1C1'}
      />
      <CustomText
        color={focused ? theme.colors.primary_color : '#C1C1C1'}
        size='14px'
      >
        Home
      </CustomText>
    </NavItemContainer>
  )
}

export function NavItemNewBet () {
  return (
    <NavItemNewBetContainer
      style={{
        shadowColor: '#0000002E',
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 3
      }}
    >
      <NewBetsIcon />
    </NavItemNewBetContainer>
  )
}

export function NavItemAccount ({ focused }: any) {
  return (
    <NavItemContainer>
      {focused && <BorderTop />}
      <FontAwesome
        name='user-o'
        size={26}
        color={focused ? theme.colors.green : '#C1C1C1'}
      />
      <CustomText
        color={focused ? theme.colors.primary_color : '#C1C1C1'}
        size='14px'
      >
        Account
      </CustomText>
    </NavItemContainer>
  )
}
