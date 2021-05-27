import React, { useState, useEffect } from 'react'
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
import { NavigationProps } from '../../Routes/routes'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import showMessage from '../../helpers/toasts'
import { forgotPassword } from '../../store/recoverPassword'

const emailValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email()
    .required()
})

export default function ForgotPassword ({ navigation }: NavigationProps) {
  const [email, setEmail] = useState({ email: '' })
  const dispatch = useAppDispatch()
  const error = useAppSelector(state => state.password.error)

  useEffect(() => {
    if (error) {
      showMessage('error', error)
    }
  }, [error])

  const handleChange = (value: string) => {
    setEmail({ email: value })
  }

  const handleClick = () => {
    emailValidationSchema
      .validate(email)
      .then(() => {
        const data = {
          email: email.email,
          redirect_url: 'http://localhost:3000/authentication/reset-password/'
        }
        dispatch(forgotPassword(data))
          .then(res => {
            if (res.payload === undefined) {
              return
            }
            showMessage('success', 'Success, check your inbox', 2000)
            setTimeout(() => {
              setEmail({ email: '' })
              navigation.navigate('SignIn')
            }, 2000)
          })
          .catch(err => console.log(err))
      })
      .catch(err => showMessage('error', err.errors[0]))
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
              onChangeText={handleChange}
              value={email.email}
              autoCapitalize='none'
              placeholder='Email'
            />

            <Button
              onPress={handleClick}
              width='190px'
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
