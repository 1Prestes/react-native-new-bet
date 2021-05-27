import React from 'react'
import { StatusBar } from 'expo-status-bar'
import { View } from 'react-native'
import { useRoute } from '@react-navigation/native'
import { Feather, AntDesign } from '@expo/vector-icons'

import Cart from '../Cart'
import {
  HeaderContainer,
  LogoContainer,
  Title,
  BorderBottom
} from './Header-style'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { LOGOUT_USER } from '../../store/sessionReducer'
import { CLEAR_USER_ERROR } from '../../store/userReducer'
import { NavigationProps } from '../../Routes/routes'
import { theme } from '../../assets/style/theme'

import { CLEAR_DATA } from '../../store/gamesReducer'
import { SET_SHOW_CART } from '../../store/cartReducer'

export default function Header ({ navigation }: NavigationProps) {
  const cartStatus = useAppSelector(state => state.cartStatus.showCart)
  const dispatch = useAppDispatch()
  const route = useRoute()

  const logout = () => {
    dispatch(LOGOUT_USER())
    dispatch(CLEAR_DATA())
    dispatch(CLEAR_USER_ERROR())
  }

  return (
    <>
      <HeaderContainer style={{ elevation: 5 }}>
        <StatusBar style='auto' translucent={true} />
        <LogoContainer>
          <Title>TGL</Title>
          <BorderBottom />
        </LogoContainer>

        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          {route.name === 'NewBet' && (
            <View>
              <AntDesign
                onPress={() => {
                  dispatch(SET_SHOW_CART(!cartStatus))
                }}
                style={{ marginRight: 31 }}
                name='shoppingcart'
                size={26}
                color={theme.colors.green}
              />
            </View>
          )}
          <Feather onPress={logout} name='log-out' size={26} color='#C1C1C1' />
        </View>
      </HeaderContainer>

      <Cart navigation={navigation} />
    </>
  )
}
