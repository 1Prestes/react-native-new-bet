import styled from 'styled-components/native'

export const NavItemContainer = styled.View`
  align-items: center;
  margin-bottom: 10px;
`
export const BorderTop = styled.View`
  width: 30px;
  border-color: ${props => props.theme.colors.green};
  border-top-width: 4px;
  border-radius: 6px;
  margin-bottom: 10px;
`

export const NavItemNewBetContainer = styled.View`
  margin-bottom: 50px;
  border-width: 4px;
  border-radius: 99px;
  border-color: #fff;
  box-shadow: 10px 5px 5px black;
`
