import styled from 'styled-components/native'

export const Title = styled.Text`
  font-size: 44px;
  font-weight: bold;
  font-style: italic;
  text-align: center;
  color: ${props => props.theme.colors.primary_color};
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
  box-shadow: #00000f 0px 3px 25px;
  width: 306px;
  height: 293px;
`
