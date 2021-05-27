import React, { useState, useEffect } from 'react'
import { StatusBar } from 'expo-status-bar'
import { Text, KeyboardAvoidingView, ActivityIndicator } from 'react-native'
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
import { NavigationProps } from '../../Routes/stack-routes'
import showMessage from '../../helpers/toasts'
import { CLEAR_USER_ERROR, createUser } from '../../store/userReducer'
import { setAuth } from '../../store/sessionReducer'
import { useAppDispatch, useAppSelector } from '../../store/hooks'

const signUpValidationSchema = yup.object().shape({
  password: yup
    .string()
    .min(6)
    .required(),
  email: yup
    .string()
    .email()
    .required(),
  username: yup
    .string()
    .min(3)
    .required('')
})

export default function SignUp ({ navigation }: NavigationProps) {
  const loading = useAppSelector(state => state.session.loading)
  const [newUser, setNewUser] = useState({
    username: '',
    email: '',
    password: ''
  })

  const handleChange = (value: string, key: string) => {
    setNewUser({ ...newUser, [key]: value })
  }

  const currentUser = useAppSelector(state => state.user)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (currentUser.error) showMessage('error', currentUser.error)
  }, [currentUser.error])

  const handleClick = () => {
    signUpValidationSchema
      .validate(newUser)
      .then(res => {
        dispatch(createUser(res)).then(() => {
          const { email, password } = res
          dispatch(setAuth({ email, password })).then(res => {
            if (res.payload) {
            }

            dispatch(CLEAR_USER_ERROR())
          })
        })
      })
      .catch(err => showMessage('error', err.errors[0]))
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
            <Title style={{ fontSize: 34 }}>Registration</Title>
            <InputContainer>
              <Input
                onChangeText={(value: string) =>
                  handleChange(value, 'username')
                }
                value={newUser.username}
                placeholder='Name'
              />
              <Input
                onChangeText={(value: string) => handleChange(value, 'email')}
                autoCapitalize='none'
                value={newUser.email}
                placeholder='Email'
              />
              <Input
                onChangeText={(value: string) =>
                  handleChange(value, 'password')
                }
                secureTextEntry
                autoCapitalize='none'
                value={newUser.password}
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
              onPress={() => navigation.navigate('SignIn')}
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
      )}
      {loading && <ActivityIndicator size={110} color={theme.colors.green} />}
    </Container>
  )
}
