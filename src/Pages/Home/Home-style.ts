import styled from 'styled-components/native'

interface BorderProps {
  color: string
}

export const Container = styled.View`
  padding: 0 20px;
`

export const FilterContainer = styled.ScrollView`
  flex-direction: row;
  flex-wrap: wrap;
  margin-top: 15px;
`

export const Bets = styled.View`
  height: 70%;
  padding: 10px 20px 50px 20px;
  padding-bottom: 50px;
`

export const Bet = styled.View`
  flex-direction: row;
  margin: 14px 0;
`

export const BorderLeft = styled.View<BorderProps>`
  margin-right: 15px;
  border-width: 3px;
  border-radius: 6px;
  border-color: ${props => props.color};
`

export const BetInfo = styled.View``
