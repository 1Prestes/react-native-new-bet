import React, { useState, useEffect } from 'react'
import { View, Text } from 'react-native'
import { Octicons } from '@expo/vector-icons'
import { AntDesign } from '@expo/vector-icons'
// import jwt from 'jsonwebtoken'

import Button from '../../Components/Button'
import Header from '../../Components/Header'
import CustomText from '../../Components/CustomText'
import {
  Container,
  FilterContainer,
  Numbers,
  NumbersContainer,
  Number,
  BorderBottom,
  NumberSelected,
  NumberSelectedContainer,
  Actions
} from './NewBet-style'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import {
  ADD_BET_TO_CART,
  fetchGames,
  SET_CURRENT_GAME
} from '../../store/gamesReducer'
import showMessage from '../../helpers/toasts'
import { numberExists } from '../../helpers/numberExists'
import { removeNumber } from '../../helpers/removeNumber'
import { generateGameNumbers } from '../../helpers/generateGameNumbers'
import { theme } from '../../assets/style/theme'
import { fetchUser } from '../../store/userReducer'

export default function NewBet () {
  const [gameNumbers, setGameNumbers] = useState<number[]>([])
  const [betNumbers, setBetNumbers] = useState<number[]>([])
  const [loading, setLoading] = useState(false)

  const user = useAppSelector(state => state.user.user)
  const token = useAppSelector(state => state.session.token)
  const games = useAppSelector(state => state.games.games)
  const error = useAppSelector(state => state.games.error)
  const currentGame = useAppSelector(state => state.games.currentGame)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchGames(token))
    dispatch(fetchUser(token)).then(res => {
      if (!res.payload) {
        if (error) {
          showMessage('error', error)
        }
      }
    })
  }, [])

  useEffect(() => {
    if (error) {
      showMessage('error', error)
    }
  }, [error])

  useEffect(() => {
    dispatch(SET_CURRENT_GAME(games[0]))
  }, [games])

  useEffect(() => {
    setGameNumbers([])
    if (!currentGame) return

    for (let i = 1; i <= currentGame.range; i++) {
      setGameNumbers(prevState => [...prevState, i])
    }
  }, [currentGame])

  const toggleGame = (id: number): void => {
    const currentGame = games.filter(game => game.id === id)
    setBetNumbers([])
    dispatch(SET_CURRENT_GAME(currentGame[0]))
  }

  const chooseNumber = (number: number): void => {
    if (numberExists(betNumbers, number)) {
      const arr = removeNumber(betNumbers, number)
      return setBetNumbers(arr)
    }

    if (betNumbers.length >= currentGame.max_number) return
    setBetNumbers([...betNumbers, number])
  }

  const completeGame = () => {
    const amount = currentGame.max_number - betNumbers.length
    const range = currentGame.range
    const completedNumbers = generateGameNumbers(amount, range, betNumbers)
    setBetNumbers([...completedNumbers])
  }

  const clearGame = (clicked: boolean) => {
    if (betNumbers.length === 0) {
      showMessage('error', 'no number selected')
      return
    }
    setBetNumbers([])
    if (clicked) showMessage('success', 'Clear game successfully')
  }

  const addToCart = () => {
    const id = user.id
    if (betNumbers.length < currentGame.max_number) {
      const missingNumbers = currentGame.max_number - betNumbers.length
      showMessage(
        'error',
        `Select more ${missingNumbers} numbers to complete your bet`
      )
      return
    }
    const bet = {
      id: Date.now(),
      game_id: currentGame.id,
      userId: id,
      bet: betNumbers,
      kindOfGame: currentGame.type,
      color: currentGame.color,
      price: currentGame.price,
      date: String(new Date())
    }
    dispatch(ADD_BET_TO_CART(bet))
    showMessage('success', 'Bet added on cart :D')
    clearGame(false)
  }

  return (
    <>
      <Header showCart={true} />
      <Container>
        <CustomText transform='uppercase' margin='26px 0 15px 0' size='22px'>
          New bet for {currentGame?.type}
        </CustomText>
        <CustomText color='#868686' weight='normal' size='22px'>
          Choose a game
        </CustomText>

        <FilterContainer horizontal={true}>
          {games?.map(game => {
            let { color, type } = game
            let backgroundColor = 'transparent'
            const border = color
            if (game.type === currentGame.type) {
              backgroundColor = color
              color = '#fff'
            }

            return (
              <Button
                key={game.id}
                width='105px'
                onPress={() => toggleGame(game.id)}
                weight='normal'
                fontSize='14px'
                bColor={color}
                bg={backgroundColor}
                color={color}
                margin='0 9px 0 0'
              >
                {type}
              </Button>
            )
          })}
        </FilterContainer>

        {!betNumbers.length && (
          <>
            <CustomText margin='20px 0 5px 0' size='17px' color='#868686'>
              Fill Your Bet
            </CustomText>
            <CustomText weight='normal'>
              Mark as many numbers as you want up to a maximum of 50. Win by
              hitting 15, 16, 17, 18, 19, 20 or none of the 20 numbers drawn.
            </CustomText>
          </>
        )}
      </Container>

      <View style={{ backgroundColor: theme.bg }}>
        {!!betNumbers.length && (
          <NumberSelectedContainer>
            {betNumbers.map(number => (
              <NumberSelected
                key={number}
                onPress={() => chooseNumber(number)}
                style={{ backgroundColor: currentGame.color }}
              >
                <View style={{ marginBottom: -4, paddingLeft: 16 }}>
                  <Octicons name='x' size={8} color='#fff' />
                </View>
                <Text
                  style={{ fontWeight: 'bold', fontSize: 13, color: '#fff' }}
                >
                  {number < 10 ? '0' + number : number}
                </Text>
              </NumberSelected>
            ))}
          </NumberSelectedContainer>
        )}
      </View>

      {!!betNumbers.length && (
        <View style={{ alignItems: 'center', height: 50 }}>
          <Actions horizontal={true}>
            <Button
              onPress={completeGame}
              margin='10px 5px'
              width='110px'
              padding='8px 6px'
              bRadius='4px'
              bColor={theme.colors.green}
              fontSize='13px'
              fontStyle='normal'
              color={theme.colors.green}
            >
              Complete game
            </Button>

            <Button
              onPress={() => clearGame(true)}
              margin='10px 5px'
              width='87px'
              padding='8px 6px'
              bRadius='4px'
              bColor={theme.colors.green}
              fontSize='13px'
              fontStyle='normal'
              color={theme.colors.green}
            >
              Clear game
            </Button>
            <Button
              onPress={addToCart}
              margin='10px 5px'
              width='122px'
              padding='8px 6px'
              bRadius='4px'
              bg={theme.colors.green}
              bColor={theme.colors.green}
              fontSize='13px'
              fontStyle='normal'
              color='#fff'
            >
              <AntDesign
                style={{ paddingRight: 10 }}
                name='shoppingcart'
                size={15}
                color='#fff'
              />{' '}
              Add to cart
            </Button>
          </Actions>
        </View>
      )}

      <Numbers>
        <View style={{ alignItems: 'center' }}>
          <BorderBottom />
        </View>
        <NumbersContainer>
          {currentGame &&
            gameNumbers.map(number => {
              let selected = betNumbers.includes(number)
                ? currentGame.color
                : '#adc0c4'

              return (
                <Number
                  key={number}
                  onPress={() => chooseNumber(number)}
                  bgColor={selected}
                >
                  <CustomText size='18px' style='normal' color='#fff'>
                    {number}
                  </CustomText>
                </Number>
              )
            })}
        </NumbersContainer>
      </Numbers>
    </>
  )
}
