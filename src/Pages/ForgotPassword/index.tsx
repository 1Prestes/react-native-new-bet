import React, { useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { KeyboardAvoidingView } from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import * as yup from 'yup'

import {
  Container,
  LogoContainer,
  Title,
  BorderBottom,
  FormContainer,
  InputContainer
} from './FogotPassword-style'
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

export default function ForgotPassword ({ navigation }: NavigationProps) {
  const [login, setLogin] = useState({ email: '' })

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
      <KeyboardAvoidingView behavior='height' enabled>
        <LogoContainer>
          <Title>TGL</Title>
          <BorderBottom />
        </LogoContainer>

        <FormContainer>
          <Title style={{ fontSize: 34 }}>Reset Password</Title>
          <InputContainer>
            <Input
              onChangeText={(value: string) => handleChange(value, 'email')}
              value={login.email}
              autoCapitalize='none'
              placeholder='Email'
            />

            <Button
              onPress={handleClick}
              width='180px'
              fontSize='30px'
              color={theme.colors.green}
            >
              Send link{' '}
              <AntDesign
                name='arrowright'
                size={30}
                color={theme.colors.green}
              />
            </Button>
          </InputContainer>

          <Button
            onPress={() => navigation.navigate('SignIn')}
            width='200px'
            margin='6px auto'
            fontSize='30px'
            color={theme.colors.primary_color}
          >
            <AntDesign
              name='arrowleft'
              size={30}
              color={theme.colors.primary_color}
            />{' '}
            Back
          </Button>

          <Button
            onPress={() => navigation.navigate('SignUp')}
            width='200px'
            margin='59px auto'
            fontSize='30px'
            color={theme.colors.primary_color}
          >
            Sign Up{' '}
            <AntDesign
              name='arrowright'
              size={30}
              color={theme.colors.primary_color}
            />
          </Button>
        </FormContainer>
      </KeyboardAvoidingView>
    </Container>
  )
}
