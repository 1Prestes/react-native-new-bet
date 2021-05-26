import React, { useState } from 'react'
import { StyleSheet, Text, TouchableHighlight, View } from 'react-native'
import Modal from 'react-native-modal'

import { StatusBar } from 'expo-status-bar'
import { Feather } from '@expo/vector-icons'
import { AntDesign } from '@expo/vector-icons'
import { Octicons } from '@expo/vector-icons'

import {
  HeaderContainer,
  LogoContainer,
  Title,
  BorderBottom,
  CartContainer,
  CloseContainer
} from './Header-style'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { LOGOUT_USER } from '../../store/sessionReducer'
import { CLEAR_DATA } from '../../store/gamesReducer'
import { CLEAR_USER_ERROR } from '../../store/userReducer'
import { theme } from '../../assets/style/theme'
import CustomText from '../CustomText'
import CartItem from '../CartItem'

interface HeaderProps {
  showCart?: boolean
}

export interface CartItemProps {
  id: number
  bet: number[]
  price: number
  kindOfGame: string
  color: string
}

export default function Header ({ showCart }: HeaderProps) {
  const cart = useAppSelector(state => state.games.cart)
  const [modalVisible, setModalVisible] = useState(false)
  const dispatch = useAppDispatch()

  const logout = () => {
    dispatch(LOGOUT_USER())
    dispatch(CLEAR_DATA())
    dispatch(CLEAR_USER_ERROR())
  }

  return (
    <>
      <HeaderContainer>
        <StatusBar style='auto' translucent={true} />
        <LogoContainer>
          <Title>TGL</Title>
          <BorderBottom />
        </LogoContainer>

        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          {showCart && (
            <View>
              <AntDesign
                onPress={() => {
                  setModalVisible(true)
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

      <Modal
        style={{ alignItems: 'flex-end', margin: 0 }}
        isVisible={modalVisible}
        swipeDirection='right'
        onSwipeComplete={() => setModalVisible(!modalVisible)}
      >
        <CartContainer>
          <CloseContainer>
            <Octicons
              onPress={() => setModalVisible(!modalVisible)}
              name='x'
              size={28}
              color={theme.colors.green}
            />
          </CloseContainer>
          <CustomText size='22px'>
            <AntDesign
              onPress={() => {
                setModalVisible(true)
              }}
              style={{ marginRight: 31 }}
              name='shoppingcart'
              size={26}
              color={theme.colors.green}
            />{' '}
            CART
          </CustomText>
          {!!cart.length &&
            cart.map((item: CartItemProps) => (
              <CartItem
                key={item.id}
                betnumbers={item.bet}
                price={item.price}
                type={item.kindOfGame}
                color={item.color}
              />
            ))}
        </CartContainer>
      </Modal>
    </>
  )
}
