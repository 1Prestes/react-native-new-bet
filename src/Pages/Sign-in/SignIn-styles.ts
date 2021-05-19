import styled from 'styled-components/native'

export const Container = styled.View`
  background-color: ${props => props.theme.bg};
  flex: 1;
  align-items: center;
  justify-content: center;
`

export const Title = styled.Text`
  font-size: 44px;
  font-weight: bold;
  font-style: italic;
  text-align: center;
  color: ${props => props.theme.colors.primary_color};
`

export const BorderBottom = styled.View`
  width: 107px;
  border-bottom-width: 7px;
  border-color: ${props => props.theme.colors.green};
  border-radius: 6px;
`

export const FormContainer = styled.View`
  margin-top: 46px;
  width: 306px;
`

export const InputContainer = styled.View`
  background-color: #fff;
  margin-top: 26px;
  margin-bottom: 38px;
  border-radius: 12px;
  border-width: 1px;
  border-color: #dddddd;
  width: 306px;
  height: 293px;
`
export const OutlineButton = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
`

export const Footer = styled.Text`
  position: absolute;
  bottom: 22px;
`
