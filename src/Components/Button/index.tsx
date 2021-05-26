import React from 'react'
import { Octicons } from '@expo/vector-icons'

import {
  StyleButtonProps,
  ButtonContainer,
  TouchableOpacityButton,
  TextButton
} from './Button-style'
import { View } from 'react-native'

interface ButtonProps extends StyleButtonProps {
  label?: string
  onPress?: () => void
  children?: React.ReactNode
  selected?: boolean
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
    fontStyle,
    lHeight,
    bColor,
    color,
    selected,
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
        bColor={bColor}
        style={{ flexDirection: 'row', justifyContent: 'center' }}
        {...ButtonProps}
      >
        <TextButton
          weight={weight}
          fontStyle={fontStyle}
          color={color}
          fontSize={fontSize}
        >
          {children}
          {label}
          {selected && (
            <View
              style={{
                paddingBottom: 4,
                paddingLeft: 1
              }}
            >
              <Octicons name='x' size={10} color='#FFF' />
            </View>
          )}
        </TextButton>
      </TouchableOpacityButton>
    </ButtonContainer>
  )
}
