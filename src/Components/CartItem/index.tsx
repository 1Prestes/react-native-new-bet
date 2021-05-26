import React, { useState } from 'react'
import { Feather } from '@expo/vector-icons'
import moment from 'moment'

import CustomText from '../CustomText'
import { Bet, BorderLeft, BetInfo, BetInfoContainer } from './CartItem-style'
import { floatToReal } from '../../helpers/floatToReal'
import { theme } from '../../assets/style/theme'
import { useAppDispatch } from '../../store/hooks'
import { REMOVE_BET_OF_CART } from '../../store/gamesReducer'
import showMessage from '../../helpers/toasts'

export interface CartItemProps {
  id: number
  betnumbers: number[]
  price: number
  type: string
  color: string
}

export default function CartItem ({
  id,
  betnumbers,
  price,
  type,
  color
}: CartItemProps) {
  const dispatch = useAppDispatch()

  const removeBet = (id: number) => {
    dispatch(REMOVE_BET_OF_CART(id))
  }

  return (
    <Bet>
      <BorderLeft color={color} />
      <BetInfo>
        <CustomText size='12px' color='#868686'>
          {betnumbers
            .slice()
            .sort((a, b) => a - b)
            .map(number => {
              return number < 10 ? `0${number}` : number
            })
            .join(', ')}
        </CustomText>
        <BetInfoContainer>
          <CustomText
            margin='12px 0'
            style='normal'
            size='12px'
            weight='normal'
            color='#868686'
          >
            {moment().format('DD/MM/YYYY')} - (R$ {floatToReal(price)}){' '}
          </CustomText>
          <Feather
            onPress={() => removeBet(id)}
            name='trash-2'
            size={12}
            color={theme.colors.primary_color}
          />
        </BetInfoContainer>
        <CustomText size='16px' color={color}>
          {type}
        </CustomText>
      </BetInfo>
    </Bet>
  )
}
