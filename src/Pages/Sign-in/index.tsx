import React, { useState, useEffect } from 'react'
import { StatusBar } from 'expo-status-bar'
import { KeyboardAvoidingView, ActivityIndicator } from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import * as yup from 'yup'

import {
  Container,
  LogoContainer,
  Title,
  BorderBottom,
  FormContainer,
  InputContainer
} from './SignIn-style'
import Input from '../../Components/Input'
import { theme } from '../../assets/style/theme'
import Button from '../../Components/Button'
import { NavigationProps } from '../../Routes/stack-routes'
import { useDispatch, useSelector } from 'react-redux'
import {
  CLEAR_SESSION,
  getCurrentToken,
  setAuth
} from '../../store/sessionReducer'
import showMessage from '../../helpers/toasts'
import { useAppSelector } from '../../store/hooks'

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

export default function SignIn ({ navigation }: NavigationProps) {
  const dispatch = useDispatch()
  const session = useAppSelector(state => state.session)
  const [login, setLogin] = useState({ email: 'mario@gmail.com', password: '123123' })
  const loading = useAppSelector(state => state.session.loading)

  useEffect(() => {
    if (session.error) {
      showMessage('error', session.error)
      dispatch(CLEAR_SESSION())
    }
  }, [session])

  const handleChange = (text: string, key: string) => {
    setLogin({ ...login, [key]: text })
  }

  useEffect(() => {}, [session])

  const handleClick = async () => {
    await signInValidationSchema
      .validate(login)
      .then(() => dispatch(setAuth(login)))
      .catch(err => {
        if (err.errors[0]) return showMessage('error', err.errors[0])
        showMessage('error', err)
      })
  }

  return (
    <Container>
      <StatusBar style='auto' translucent={true} />
      {!loading && (
        <KeyboardAvoidingView behavior='height' enabled>
          <LogoContainer>
            <Title>TGL</Title>
            <BorderBottom />
          </LogoContainer>

          <FormContainer>
            <Title style={{ fontSize: 34 }}>Authentication</Title>
            <InputContainer>
              <Input
                onChangeText={(value: string) => handleChange(value, 'email')}
                value={login.email}
                autoCapitalize='none'
                placeholder='Email'
              />
              <Input
                onChangeText={(value: string) =>
                  handleChange(value, 'password')
                }
                value={login.password}
                secureTextEntry
                autoCapitalize='none'
                placeholder='Password'
              />

              <Button
                onPress={() => navigation.navigate('ForgotPassword')}
                align='flex-end'
                margin='20px 31px'
                label='I forgot my password'
                weight='normal'
                fontSize='14px'
                color='#C1C1C1'
              />
              <Button
                onPress={handleClick}
                fontSize='30px'
                color={theme.colors.green}
              >
                Log In{' '}
                <AntDesign
                  name='arrowright'
                  size={30}
                  color={theme.colors.green}
                />
              </Button>
            </InputContainer>
            <Button
              onPress={() => navigation.navigate('SignUp')}
              fontSize='30px'
              color={theme.colors.primary_color}
              width='200px'
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
      )}
      {loading && <ActivityIndicator size={110} color={theme.colors.green} />}
    </Container>
  )
}
