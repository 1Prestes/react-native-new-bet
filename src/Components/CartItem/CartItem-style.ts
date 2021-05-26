import styled from 'styled-components/native'

interface BorderProps {
  color: string
}

export const Bets = styled.View`
  flex: 1;
  padding: 0 20px;
`

export const BetsContainer = styled.ScrollView`
  padding-top: 16px;
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

export const BetInfo = styled.View`
  width: 196px;
`

export const BetInfoContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`
