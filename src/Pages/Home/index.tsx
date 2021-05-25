import React, { useState, useEffect } from 'react'
import moment from 'moment'

import Button from '../../Components/Button'
import Header from '../../Components/Header'
import CustomText from '../../Components/CustomText'
import {
  Container,
  FilterContainer,
  Bets,
  BetsContainer,
  Bet,
  BorderLeft,
  BetInfo
} from './Home-style'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { fetchBets, fetchGames } from '../../store/gamesReducer'
import showMessage from '../../helpers/toasts'
import { floatToReal } from '../../helpers/floatToReal'
import { Text } from 'react-native'

interface Bet {
  id: string
  game_id: number
  userId: string
  betnumbers: string
  color: string
  price: number
  created_at: string
}

export default function Home () {
  const games = useAppSelector(state => state.games.games)
  const error = useAppSelector(state => state.games.error)
  const cart = useAppSelector(state => state.games.cart)
  const token = useAppSelector(state => state.session.token)
  const betCheckout: Bet[] = useAppSelector(state => state.games.checkout)
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

  return (
    <>
      <Header />
      <Container>
        <CustomText margin='26px 0 15px 0' size='22px'>
          Recent games
        </CustomText>
        <CustomText weight='normal' size='22px'>
          Filters
        </CustomText>

        <FilterContainer horizontal={true}>
          {!!games[0].type &&
            games.map(game => {
              return (
                <Button
                  key={game.id}
                  bg='#fff'
                  width='105px'
                  weight='normal'
                  fontSize='14px'
                  bColor={game.color}
                  color={game.color}
                  margin='0 9px 0 0'
                >
                  {game.type}
                </Button>
              )
            })}
        </FilterContainer>
      </Container>

      <Bets>
        <BetsContainer>
          {betCheckout &&
            betCheckout.map(bet => {
              return (
                <Bet key={bet.id}>
                  <BorderLeft
                    color={
                      games.filter(game => game.id === bet.game_id)[0]?.color
                    }
                  />
                  <BetInfo>
                    <CustomText size='12px' color='#868686'>
                      {bet.betnumbers
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
                      {moment().format('DD/MM/YYYY')} - (R${' '}
                      {floatToReal(bet.price)})
                    </CustomText>
                    <CustomText
                      size='16px'
                      color={
                        games.filter(game => game.id === bet.game_id)[0]?.color
                      }
                    >
                      {games.filter(game => game.id === bet.game_id)[0]?.type}
                    </CustomText>
                  </BetInfo>
                </Bet>
              )
            })}

          <Bet>
            <BorderLeft color='#7F3992' />
            <BetInfo>
              <CustomText size='12px' color='#868686'>
                01, 02, 04, 05, 06, 07, 09, 15, 17, 20, 21, 22, 23, 24, 25
              </CustomText>
              <CustomText
                margin='12px 0'
                style='normal'
                size='12px'
                weight='normal'
                color='#868686'
              >
                29/11/2020 - (R$ 2,50)
              </CustomText>
              <CustomText size='16px' color='#7F3992'>
                Lotofácil
              </CustomText>
            </BetInfo>
          </Bet>

          <Bet>
            <BorderLeft color='#7F3992' />
            <BetInfo>
              <CustomText size='12px' color='#868686'>
                01, 02, 04, 05, 06, 07, 09, 15, 17, 20, 21, 22, 23, 24, 25
              </CustomText>
              <CustomText
                margin='12px 0'
                style='normal'
                size='12px'
                weight='normal'
                color='#868686'
              >
                29/11/2020 - (R$ 2,50)
              </CustomText>
              <CustomText size='16px' color='#7F3992'>
                Lotofácil
              </CustomText>
            </BetInfo>
          </Bet>

          <Bet>
            <BorderLeft color='#01AC66' />
            <BetInfo>
              <CustomText size='12px' color='#868686'>
                01, 02, 04, 05, 06, 07
              </CustomText>
              <CustomText
                margin='12px 0'
                style='normal'
                size='12px'
                weight='normal'
                color='#868686'
              >
                27/11/2020 - (R$ 2,50)
              </CustomText>
              <CustomText size='16px' color='#01AC66'>
                Mega-Sena
              </CustomText>
            </BetInfo>
          </Bet>

          <Bet>
            <BorderLeft color='#F79C31' />
            <BetInfo>
              <CustomText size='12px' color='#868686'>
                01, 02, 04, 05, 06, 07, 09, 15, 17, 20, 21, 22, 23, 24, 25
              </CustomText>
              <CustomText
                margin='12px 0'
                style='normal'
                size='12px'
                weight='normal'
                color='#868686'
              >
                27/11/2020 - (R$ 2,50)
              </CustomText>
              <CustomText size='16px' color='#F79C31'>
                Lotomania
              </CustomText>
            </BetInfo>
          </Bet>

          <Bet>
            <BorderLeft color='#7F3992' />
            <BetInfo>
              <CustomText size='12px' color='#868686'>
                01, 02, 04, 05, 06, 07, 09, 15, 17, 20, 21, 22, 23, 24, 25
              </CustomText>
              <CustomText
                margin='12px 0'
                style='normal'
                size='12px'
                weight='normal'
                color='#868686'
              >
                29/11/2020 - (R$ 2,50)
              </CustomText>
              <CustomText size='16px' color='#7F3992'>
                Lotofácil
              </CustomText>
            </BetInfo>
          </Bet>

          <Bet>
            <BorderLeft color='#7F3992' />
            <BetInfo>
              <CustomText size='12px' color='#868686'>
                01, 02, 04, 05, 06, 07, 09, 15, 17, 20, 21, 22, 23, 24, 25
              </CustomText>
              <CustomText
                margin='12px 0'
                style='normal'
                size='12px'
                weight='normal'
                color='#868686'
              >
                29/11/2020 - (R$ 2,50)
              </CustomText>
              <CustomText size='16px' color='#7F3992'>
                Lotofácil
              </CustomText>
            </BetInfo>
          </Bet>

          <Bet>
            <BorderLeft color='#7F3992' />
            <BetInfo>
              <CustomText size='12px' color='#868686'>
                01, 02, 04, 05, 06, 07, 09, 15, 17, 20, 21, 22, 23, 24, 25
              </CustomText>
              <CustomText
                margin='12px 0'
                style='normal'
                size='12px'
                weight='normal'
                color='#868686'
              >
                29/11/2020 - (R$ 2,50)
              </CustomText>
              <CustomText size='16px' color='#7F3992'>
                Lotofácil
              </CustomText>
            </BetInfo>
          </Bet>
        </BetsContainer>
      </Bets>
    </>
  )
}
