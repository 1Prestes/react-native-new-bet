import styled from 'styled-components/native'

interface TextProps {
  margin?: string
  size?: string
  style?: string
  weight?: string
  color?: string
}

interface BorderProps {
  color: string
}

export const Container = styled.View`
  background-color: ${props => props.theme.bg};
  padding: 0 20px;
`
export const CustomText = styled.Text<TextProps>`
  margin: ${props => props.margin ?? '0'};
  font-size: ${props => props.size ?? '17px'};
  font-style: ${props => props.style ?? 'italic'};
  font-weight: ${props => props.weight ?? 'bold'};
  color: ${props => props.color ?? props.theme.colors.primary_color};
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
