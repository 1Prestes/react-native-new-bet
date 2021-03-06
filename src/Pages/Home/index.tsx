import React, { useState, useEffect } from 'react'
import moment from 'moment'
import { ScrollView, View } from 'react-native'

import Button from '../../Components/Button'
import Header from '../../Components/Header'
import CustomText from '../../Components/CustomText'
import {
  Container,
  FilterContainer,
  Bets,
  Bet,
  BorderLeft,
  BetInfo
} from './Home-style'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { fetchBets, fetchGames } from '../../store/gamesReducer'
import showMessage from '../../helpers/toasts'
import { floatToReal } from '../../helpers/floatToReal'
import { NavigationProps } from '../../Routes/routes'

interface Bet {
  id: string
  game_id: number
  userId: string
  betnumbers: string
  color: string
  price: number
  created_at: string
}

export default function Home ({ navigation }: NavigationProps) {
  const games = useAppSelector(state => state.games.games)
  const error = useAppSelector(state => state.games.error)
  const cart = useAppSelector(state => state.games.cart)
  const token = useAppSelector(state => state.session.token)
  const betCheckout: Bet[] = useAppSelector(state => state.games.checkout)

  const [selectedGames, setSelectedGames] = useState([0])

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchGames(token))
    dispatch(fetchBets(token))
  }, [])

  useEffect(() => {
    dispatch(fetchBets(token))
  }, [cart])

  useEffect(() => {
    if (error) {
      showMessage('error', error)
    }
  }, [error])

  const selectFilter = (id: number) => {
    const exists = selectedGames.some(item => item === id)
    if (!exists) {
      const gameSelected = games.filter(game => game.id === id)
      setSelectedGames([...selectedGames, gameSelected[0].id])
    } else {
      const gamesSelected = selectedGames.filter(filterId => filterId !== id)
      setSelectedGames(gamesSelected)
    }
  }

  const betTemplate = (
    id: string,
    game_id: number,
    betnumbers: string,
    price: number
  ) => {
    return (
      <Bet key={id}>
        <BorderLeft
          color={games.filter(game => game.id === game_id)[0]?.color}
        />
        <BetInfo>
          <CustomText size='12px' color='#868686'>
            {betnumbers
              .split(',')
              .map(number => Number(number))
              .slice()
              .sort((a, b) => a - b)
              .map(number => {
                return number < 10 ? `0${number}` : number
              })
              .join(', ')}
          </CustomText>
          <CustomText
            margin='12px 0'
            style='normal'
            size='12px'
            weight='normal'
            color='#868686'
          >
            {moment().format('DD/MM/YYYY')} - (R$ {floatToReal(price)})
          </CustomText>
          <CustomText
            size='16px'
            color={games.filter(game => game.id === game_id)[0]?.color}
          >
            {games.filter(game => game.id === game_id)[0]?.type}
          </CustomText>
        </BetInfo>
      </Bet>
    )
  }

  return (
    <>
      <Header navigation={navigation} />
      <Container>
        <CustomText margin='26px 0 15px 0' size='22px'>
          Recent games
        </CustomText>
        <CustomText weight='normal' size='22px'>
          Filters
        </CustomText>
      </Container>
      <View style={{ alignItems: 'center' }}>
        <FilterContainer
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        >
          {!!games[0].type &&
            games.map(game => {
              let color = game.color
              let bg = '#fff'

              const exists = selectedGames.includes(game.id)
              if (exists) {
                color = '#fff'
                bg = game.color
              }

              return (
                <Button
                  key={game.id}
                  onPress={() => selectFilter(game.id)}
                  bg={bg}
                  selected={exists}
                  width='105px'
                  weight='normal'
                  bColor={game.color}
                  fontSize='14px'
                  color={color}
                  margin='0 9px 0 0'
                >
                  {game.type}
                </Button>
              )
            })}
        </FilterContainer>
      </View>

      {games[0].type !== '' && betCheckout.length === 0 && (
        <CustomText margin='26px 20px' size='22px'>
          Opsy! It seems that you still don't have any bet done. Why don't you
          go to the bet page and start it right now?
        </CustomText>
      )}

      <Bets>
        <ScrollView showsVerticalScrollIndicator={false}>
          {betCheckout &&
            betCheckout.map(bet => {
              const exists = selectedGames.includes(bet.game_id)
              if (selectedGames.length > 1 && exists) {
                return betTemplate(
                  bet.id,
                  bet.game_id,
                  bet.betnumbers,
                  bet.price
                )
              } else if (selectedGames.length === 1) {
                return betTemplate(
                  bet.id,
                  bet.game_id,
                  bet.betnumbers,
                  bet.price
                )
              }
            })}
        </ScrollView>
      </Bets>
    </>
  )
}
