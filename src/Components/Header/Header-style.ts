import styled from 'styled-components/native'

export const HeaderContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: #fefefe;
  padding-top: 50px;
  height: 110px;
  padding-left: 20px;
  padding-right: 20px;
`

export const LogoContainer = styled.View`
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
`

export const BorderBottom = styled.View`
  justify-content: center;
  align-items: center;
  width: 75px;
  border-bottom-width: 6px;
  border-color: ${props => props.theme.colors.green};
  border-radius: 6px;
`

export const Title = styled.Text`
  font-size: 30px;
  font-weight: bold;
  font-style: italic;
  text-align: center;
  color: ${props => props.theme.colors.primary_color};
`
