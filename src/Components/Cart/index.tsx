import React, { useState, useEffect } from 'react'
import { View, Text } from 'react-native'
import { AntDesign, Octicons } from '@expo/vector-icons'
import Modal from 'react-native-modal'

import { useAppDispatch, useAppSelector } from '../../store/hooks'
import CustomText from '../CustomText'
import CartItem from '../CartItem'
import Button from '../Button'
import { floatToReal } from '../../helpers/floatToReal'
import {
  EmptyMessage,
  CartContainer,
  CloseContainer,
  Bets,
  CartTotalContainer,
  CartFooter
} from './Cart-style'
import { checkoutGames, CLEAR_CART, ICartItem } from '../../store/gamesReducer'
import showMessage from '../../helpers/toasts'
import { NavigationProps } from '../../Routes/routes'
import { theme } from '../../assets/style/theme'
import { SET_SHOW_CART } from '../../store/cartReducer'

export interface CartItemProps {
  id: number
  bet: number[]
  price: number
  kindOfGame: string
  color: string
}

interface CurrentValue {
  price: number
}

export default function Cart ({ navigation }: NavigationProps) {
  const cartStatus = useAppSelector(state => state.cartStatus.showCart)

  const token = useAppSelector(state => state.session.token)
  const cart = useAppSelector(state => state.games.cart)
  const dispatch = useAppDispatch()

  const totalCart = (): number => {
    return (
      cart.length &&
      cart.reduce((accumulator: number, currentValue: CurrentValue) => {
        return accumulator + currentValue.price
      }, 0)
    )
  }

  const checkout = () => {
    if (totalCart() < 30) {
      dispatch(SET_SHOW_CART(false))
      showMessage(
        'error',
        'The minimum cart value is $ 30, add more games to the cart and try again.',
        5000
      )
      return
    }

    const games: any = cart.map((item: ICartItem) => ({
      game_id: item.game_id,
      betnumbers: item.bet.toString()
    }))

    dispatch(checkoutGames({ token, games }))
      .then(res => {
        if (res.payload === undefined) {
          dispatch(SET_SHOW_CART(false))

          showMessage(
            'error',
            'Error connecting to the server, try again or wait a few minutes'
          )
          return
        }
        dispatch(SET_SHOW_CART(false))

        showMessage(
          'success',
          'Congratulations, you will be redirected to home',
          2000
        )
        setTimeout(() => {
          dispatch(CLEAR_CART())
          navigation.navigate('Home')
        }, 3000)
      })
      .catch(error => showMessage('error', error.message))
  }

  return (
    <Modal
      style={{ alignItems: 'flex-end', margin: 0 }}
      isVisible={cartStatus}
      scrollOffset={0}
      propagateSwipe={true}
      onBackdropPress={() => dispatch(SET_SHOW_CART(false))}
      animationIn='slideInRight'
      animationOut='slideOutRight'
      backdropColor='#fff'
    >
      <CartContainer>
        <CloseContainer>
          <Octicons
            onPress={() => dispatch(SET_SHOW_CART(false))}
            name='x'
            size={28}
            color={theme.colors.green}
          />
        </CloseContainer>
        <View style={{ marginLeft: 24 }}>
          <CustomText size='22px'>
            <AntDesign
              style={{ marginRight: 31 }}
              name='shoppingcart'
              size={26}
              color={theme.colors.green}
            />{' '}
            CART
          </CustomText>
        </View>

        {!cart.length && (
          <EmptyMessage>Your Cart has been Empty :'(</EmptyMessage>
        )}

        <View style={{ flex: 1, marginBottom: 10 }}>
          <Bets>
            {!!cart.length &&
              cart.map((item: CartItemProps) => (
                <CartItem
                  key={item.id}
                  id={item.id}
                  betnumbers={item.bet}
                  price={item.price}
                  type={item.kindOfGame}
                  color={item.color}
                />
              ))}
          </Bets>
        </View>
        {!!cart.length && (
          <>
            <CartTotalContainer>
              <CustomText size='15px'>
                CART{' '}
                <CustomText size='15px' style='normal' weight='normal'>
                  TOTAL:
                </CustomText>{' '}
              </CustomText>
              <CustomText size='15px'>R$ {floatToReal(totalCart())}</CustomText>
            </CartTotalContainer>
            <CartFooter>
              <Button
                onPress={checkout}
                fontSize='30px'
                color={theme.colors.green}
              >
                Save{' '}
                <AntDesign
                  name='arrowright'
                  size={30}
                  color={theme.colors.green}
                />
              </Button>
            </CartFooter>
          </>
        )}
      </CartContainer>
    </Modal>
  )
}
