import styled from 'styled-components/native'

export interface StyleButtonProps {
  bg?: string
  width?: string
  align?: string
  margin?: string
  padding?: string
  weight?: string
  fontSize?: string
  fontStyle?: string
  bRadius?: string
  bColor?: string
  color?: string
}

export const ButtonContainer = styled.View<StyleButtonProps>`
  justify-content: center;
  align-items: ${props => props.align ?? 'center'};
`

export const TouchableOpacityButton = styled.TouchableOpacity<StyleButtonProps>`
  background-color: ${props => props.bg ?? 'transparent'};
  border-radius: ${props => props.bRadius ?? '100px'};
  border-width: 2px;
  border-color: ${props => props.bColor ?? 'transparent'};
  margin: ${props => props.margin ?? 'auto'};
  width: ${props => props.width ?? '160px'};
`
export const TextButton = styled.Text<StyleButtonProps>`
  padding: ${props => props.padding ?? '10px'};
  text-align: center;
  font-size: ${props => props.fontSize ?? '30px'};
  font-weight: ${props => props.weight ?? 'bold'};
  font-style: ${props => props.fontStyle ?? 'italic'};
  color: ${props => props.color ?? props.theme.colors.primary_color};
`
