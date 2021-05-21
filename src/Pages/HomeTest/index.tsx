import React from 'react'
import { View, Text } from 'react-native'
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
} from './HomeTest-style'

export default function HomeTest () {
  return (
    <>
      <Header />
      <Container>
        <CustomText margin='26px 0 15px 0' size='22px'>
          New Bet For Lotery
        </CustomText>
        <CustomText weight='normal' size='22px'>
          Filters
        </CustomText>

        <FilterContainer horizontal={true}>
          <Button
            bg='#fff'
            width='105px'
            weight='normal'
            fontSize='14px'
            bColor='#7F3992'
            color='#7F3992'
            margin='0 9px 0 0'
          >
            Lotofácil
          </Button>

          <Button
            bg='#fff'
            width='105px'
            weight='normal'
            fontSize='14px'
            bColor='#01AC66'
            color='#01AC66'
            margin='0 9px 0 0'
          >
            Mega-Sena
          </Button>

          <Button
            bg='#fff'
            width='105px'
            weight='normal'
            fontSize='14px'
            bColor='#F79C31'
            color='#F79C31'
            margin='0 9px 0 0'
          >
            Mega-Sena
          </Button>
        </FilterContainer>
      </Container>

      <Bets>
        <BetsContainer>
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
