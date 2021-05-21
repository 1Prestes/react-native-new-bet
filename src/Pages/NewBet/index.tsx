import React from 'react'
import { View, Text } from 'react-native'
import Button from '../../Components/Button'

import Header from '../../Components/Header'
import CustomText from '../../Components/CustomText'
import {
  Container,
  FilterContainer,
  Numbers,
  NumbersContainer,
  Number,
  BorderBottom
} from './NewBet-style'
import { theme } from '../../assets/style/theme'

export default function NewBet () {
  return (
    <>
      <Header />
      <Container>
        <CustomText transform='uppercase' margin='26px 0 15px 0' size='22px'>
          New bet for LOTOMANIA
        </CustomText>
        <CustomText color='#868686' weight='normal' size='22px'>
          Choose a game
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
            bg='#F79C31'
            width='105px'
            weight='normal'
            fontSize='14px'
            bColor='#F79C31'
            color='#fff'
            margin='0 9px 0 0'
          >
            Lotomania
          </Button>
        </FilterContainer>
        <CustomText margin='20px 0 5px 0' size='17px' color='#868686'>
          Fill Your Bet
        </CustomText>
        <CustomText weight='normal'>
          Mark as many numbers as you want up to a maximum of 50. Win by hitting
          15, 16, 17, 18, 19, 20 or none of the 20 numbers drawn.
        </CustomText>

        <View style={{ alignItems: 'center' }}>
          <BorderBottom />
        </View>
      </Container>

      <Numbers>
        <NumbersContainer>
          {[
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1
          ].map((item, index) => (
            <Number key={index}>
              <CustomText size='18px' style='normal' color='#fff'>
                {index}
              </CustomText>
            </Number>
          ))}
        </NumbersContainer>
      </Numbers>
    </>
  )
}
