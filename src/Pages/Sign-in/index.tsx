import React, { useEffect, useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { View, Text } from 'react-native'
import * as yup from 'yup'
import { AntDesign } from '@expo/vector-icons'

import {
  Title,
  Container,
  BorderBottom,
  FormContainer,
  InputContainer,
  Footer
} from './SignIn-styles'
import Input from '../../Components/Input'
import { theme } from '../../assets/style/theme'
import Button from '../../Components/Button/Button'

const signInValidationSchema = yup.object().shape({
  password: yup
    .string()
    .min(6)
    .required(),
  email: yup
    .string()
    .email()
    .required()
})

export default function SignIn () {
  const [login, setLogin] = useState({ email: '', password: '' })

  const handleChange = (text: string, key: string) => {
    console.log(text, key)
    setLogin({ ...login, [key]: text })
  }

  const handleClick = () => {
    console.log(login)
  }

  return (
    <Container>
      <StatusBar style='auto' translucent={true} />
      <View>
        <Title>TGL</Title>
        <BorderBottom />
      </View>

      <FormContainer>
        <Title style={{ fontSize: 34 }}>Authentication</Title>
        <InputContainer>
          <Input
            onChangeText={(value: string) => handleChange(value, 'email')}
            value={login.email}
            placeholder='Email'
          />
          <Input
            onChangeText={(value: string) => handleChange(value, 'password')}
            value={login.password}
            secureTextEntry
            placeholder='Password'
          />

          <Button
            align='flex-end'
            margin='20px 31px'
            label='I forgot my password'
            weight='normal'
            fontSize='14px'
            color='#C1C1C1'
          />
          <Button
            onPress={handleClick}
            label='Log In '
            fontSize='30px'
            color={theme.colors.green}
          >
            <AntDesign name='arrowright' size={30} color={theme.colors.green} />
          </Button>
        </InputContainer>
        <Button
          onPress={handleClick}
          label='Sign Up '
          fontSize='30px'
          color={theme.colors.primary_color}
          width='200px'
        >
          <AntDesign
            name='arrowright'
            size={30}
            color={theme.colors.primary_color}
          />
        </Button>
      </FormContainer>
      <Footer>
        <Text style={{ fontSize: 15, color: theme.colors.primary_color }}>
          Copyright 2020 Luby Software
        </Text>
      </Footer>
    </Container>
  )
}