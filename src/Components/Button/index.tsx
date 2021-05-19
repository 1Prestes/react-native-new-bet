import React from 'react'

import {
  StyleButtonProps,
  ButtonContainer,
  TouchableOpacityButton,
  TextButton
} from './Button-style'

interface ButtonProps extends StyleButtonProps {
  label?: string
  onPress?: () => void
  children?: React.ReactNode
}

export default function Button (
  {
    onPress,
    label,
    bg,
    margin,
    align,
    width,
    weight,
    fontSize,
    color,
    children
  }: ButtonProps,
  { ...ButtonProps }
) {
  return (
    <ButtonContainer align={align}>
      <TouchableOpacityButton
        onPress={onPress}
        bg={bg}
        margin={margin}
        width={width}
        {...ButtonProps}
      >
        <TextButton weight={weight} color={color} fontSize={fontSize}>
          {children}
          {label}
        </TextButton>
      </TouchableOpacityButton>
    </ButtonContainer>
  )
}
