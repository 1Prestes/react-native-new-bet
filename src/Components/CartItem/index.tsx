import React, { useState } from 'react'
import { Text } from 'react-native'
import moment from 'moment'

import CustomText from '../CustomText'
import { Bets, BetsContainer, Bet, BorderLeft, BetInfo } from './CartItem-style'
import { floatToReal } from '../../helpers/floatToReal'

export interface CartItemProps {
  betnumbers: number[]
  price: number
  type: string
  color: string
}

export default function CartItem ({
  betnumbers,
  price,
  type,
  color
}: CartItemProps) {
  const [modalVisible, setModalVisible] = useState(false)
  return (
    <Bet>
      <BorderLeft color={color} />
      <BetInfo>
        <CustomText size='12px' color='#868686'>
          {betnumbers}
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
        <CustomText size='16px' color={color}>
          {type}
        </CustomText>
      </BetInfo>
    </Bet>
  )
}
