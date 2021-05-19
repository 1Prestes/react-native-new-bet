import styled from 'styled-components/native'

export interface StyleButtonProps {
  bg?: string
  fontSize?: string
  color?: string
  width?: string
  align?: string
  margin?: string
  weight?: string
}

export const ButtonContainer = styled.View<StyleButtonProps>`
  justify-content: center;
  align-items: ${props => props.align ?? 'center'};
`

export const TouchableOpacityButton = styled.TouchableOpacity<StyleButtonProps>`
  background-color: ${props => props.bg ?? 'transparent'};
  margin: ${props => props.margin ?? 'auto'};
  width: ${props => props.width ?? '160px'};
`
export const TextButton = styled.Text<StyleButtonProps>`
  padding: 10px;
  text-align: center;
  font-size: ${props => props.fontSize ?? '30px'};
  font-weight: ${props => props.weight ?? 'bold'};
  font-style: italic;
  color: ${props => props.color ?? props.theme.colors.primary_color};
`
