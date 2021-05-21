import styled from 'styled-components/native'

interface TextProps {
  margin?: string
  size?: string
  style?: string
  weight?: string
  color?: string
  transform?: string
}

const CustomText = styled.Text<TextProps>`
  margin: ${props => props.margin ?? '0'};
  font-size: ${props => props.size ?? '17px'};
  font-style: ${props => props.style ?? 'italic'};
  font-weight: ${props => props.weight ?? 'bold'};
  text-transform: ${props => props.transform ?? 'none'};
  color: ${props => props.color ?? props.theme.colors.primary_color};
`
export default CustomText
