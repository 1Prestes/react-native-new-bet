import styled from 'styled-components/native'

interface BorderProps {
  color: string
}

export const Container = styled.View`
  background-color: ${props => props.theme.bg};
  padding: 0 20px;
`

export const FilterContainer = styled.ScrollView`
  flex-direction: row;
  flex-wrap: wrap;
  margin-top: 15px;
`

export const Bets = styled.View`
  flex: 1;
  padding: 0 20px;
`

export const BetsContainer = styled.ScrollView`
  margin-top: 16px;
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
