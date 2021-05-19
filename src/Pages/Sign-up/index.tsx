import React, { useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { Text, KeyboardAvoidingView } from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import * as yup from 'yup'

import {
  Container,
  LogoContainer,
  BorderBottom,
  Title,
  FormContainer,
  InputContainer
} from './SignUp-style'
import Input from '../../Components/Input'
import { theme } from '../../assets/style/theme'
import Button from '../../Components/Button'
import { NavigationProps } from '../../routes'

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

export default function SignUp ({ navigation }: NavigationProps) {
  const [user, setUser] = useState({ name: '', email: '', password: '' })

  const handleChange = (value: string, key: string) => {
    console.log(value, key)
    setUser({ ...user, [key]: value })
  }

  const handleClick = () => {
    console.log(user)
  }

  return (
    <Container>
      <StatusBar style='auto' translucent={true} />
      <KeyboardAvoidingView behavior='height' enabled>
        <LogoContainer>
          <Title>TGL</Title>
          <BorderBottom />
        </LogoContainer>
        <FormContainer>
          <Title style={{ fontSize: 34 }}>Registration</Title>
          <InputContainer>
            <Input
              onChangeText={(value: string) => handleChange(value, 'email')}
              value={user.name}
              placeholder='Name'
            />
            <Input
              onChangeText={(value: string) => handleChange(value, 'email')}
              autoCapitalize='none'
              value={user.email}
              placeholder='Email'
            />
            <Input
              onChangeText={(value: string) => handleChange(value, 'password')}
              secureTextEntry
              autoCapitalize='none'
              value={user.password}
              placeholder='Password'
            />

            <Button
              onPress={handleClick}
              margin='21px'
              fontSize='30px'
              width='180px'
              color={theme.colors.green}
            >
              <Text>
                Register{' '}
                <AntDesign
                  name='arrowright'
                  size={30}
                  color={theme.colors.green}
                />
              </Text>
            </Button>
          </InputContainer>
          <Button
            onPress={() => navigation.goBack()}
            label=' Back'
            fontSize='30px'
            color={theme.colors.primary_color}
            width='200px'
          >
            <AntDesign
              name='arrowleft'
              size={30}
              color={theme.colors.primary_color}
            />
          </Button>
        </FormContainer>
      </KeyboardAvoidingView>
    </Container>
  )
}
