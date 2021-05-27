import React, { useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { View } from 'react-native'
import Modal from 'react-native-modal'
import { useRoute } from '@react-navigation/native'
import { Feather, AntDesign, Octicons } from '@expo/vector-icons'

import {
  HeaderContainer,
  LogoContainer,
  Title,
  EmptyMessage,
  BorderBottom,
  CartContainer,
  CloseContainer,
  Bets,
  CartTotalContainer,
  CartFooter
} from './Header-style'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { LOGOUT_USER } from '../../store/sessionReducer'
import { CLEAR_USER_ERROR } from '../../store/userReducer'
import { theme } from '../../assets/style/theme'
import CustomText from '../CustomText'
import CartItem from '../CartItem'
import Button from '../Button'
import { floatToReal } from '../../helpers/floatToReal'
import showMessage from '../../helpers/toasts'
import { NavigationProps } from '../../Routes/routes'
import {
  checkoutGames,
  CLEAR_CART,
  CLEAR_DATA,
  ICartItem
} from '../../store/gamesReducer'

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

export default function Header ({ navigation }: NavigationProps) {
  const token = useAppSelector(state => state.session.token)
  const cart = useAppSelector(state => state.games.cart)
  const [modalVisible, setModalVisible] = useState(false)
  const dispatch = useAppDispatch()
  const route = useRoute()

  const logout = () => {
    dispatch(LOGOUT_USER())
    dispatch(CLEAR_DATA())
    dispatch(CLEAR_USER_ERROR())
  }

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
      setModalVisible(!modalVisible)
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
          setModalVisible(!modalVisible)
          showMessage(
            'error',
            'Error connecting to the server, try again or wait a few minutes'
          )
          return
        }
        setModalVisible(!modalVisible)

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
        scrollOffset={0}
        propagateSwipe={true}
        onBackdropPress={() => setModalVisible(!modalVisible)}
        animationIn='slideInRight'
        animationOut='slideOutRight'
        backdropColor='#fff'
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
          <View style={{ marginLeft: 24 }}>
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
                <CustomText size='15px'>
                  R$ {floatToReal(totalCart())}
                </CustomText>
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
    </>
  )
}
