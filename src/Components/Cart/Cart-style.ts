import styled from 'styled-components/native'

export const CartContainer = styled.View`
  flex: 1;
  background-color: #fff;
  width: 265px;
`

export const CloseContainer = styled.View`
  align-items: flex-end;
  margin-top: 16px;
  margin-right: 20px;
`

export const EmptyMessage = styled.Text`
  margin-top: 100px;
  text-align: center;
  font-size: 25px;
  font-weight: bold;
  font-style: italic;
  color: ${props => props.theme.colors.primary_color};
`

export const Bets = styled.ScrollView`
  padding-left: 25px;
`

export const CartTotalContainer = styled.View`
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  margin-bottom: 135px;
`

export const CartFooter = styled.View`
  justify-content: center;
  align-items: center;
  background-color: #ebebeb;
  height: 94px;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
`
