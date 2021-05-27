import React, { useState, useEffect } from 'react'
import { StatusBar } from 'expo-status-bar'
import {
  View,
  Text,
  KeyboardAvoidingView,
  ActivityIndicator
} from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import * as yup from 'yup'

import CustomText from '../../Components/CustomText'
import Header from '../../Components/Header'
import { NavigationProps } from '../../Routes/stack-routes'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { fetchUser, updateUser } from '../../store/userReducer'
import showMessage from '../../helpers/toasts'
import {
  Container,
  Title,
  FormContainer,
  InputContainer
} from './Account-style'
import Input from '../../Components/Input'
import { theme } from '../../assets/style/theme'
import Button from '../../Components/Button'

const schema = yup.object().shape({
  password: yup
    .string()
    .min(6)
    .required(),
  password_confirmation: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match'),
  email: yup
    .string()
    .email()
    .required(),
  username: yup
    .string()
    .min(3)
    .required('')
})

export default function Account ({ navigation }: NavigationProps) {
  const [loading, setLoading] = useState(false)

  const [userUpdate, setUserUpdate] = useState({
    username: '',
    email: '',
    password: '',
    password_confirmation: ''
  })

  const user = useAppSelector(state => state.user.user)
  const error = useAppSelector(state => state.user.error)
  const token = useAppSelector(state => state.session.token)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchUser(token)).then(res => {
      if (!res.payload) {
        if (error) {
          showMessage('error', error)
        }
      }
    })
  }, [])

  useEffect(() => {
    setUserUpdate({ ...userUpdate, username: user.username, email: user.email })
  }, [user])

  const handleClick = async () => {
    await schema
      .validate(userUpdate)
      .then(res => {
        dispatch(updateUser(res))
          .then(response => {
            if (response.payload === undefined) {
              return showMessage('error', 'Email already exists')
            }

            showMessage(
              'success',
              'Successfully changed data, you will be redirected',
              3000
            )
            setTimeout(() => {
              navigation.navigate('Home')
              setUserUpdate({
                username: '',
                email: '',
                password: '',
                password_confirmation: ''
              })
            }, 2000)
          })
          .catch(err => showMessage('error', err.error.message))
      })
      .catch(err => showMessage('error', err.errors[0]))
  }

  const handleChange = (value: string, key: string) => {
    setUserUpdate({ ...userUpdate, [key]: value })
  }

  const reconnect = (): void => {
    setLoading(true)
    dispatch(fetchUser(token)).then(res => {
      setTimeout(() => {
        if (!res.payload) {
          return setLoading(false)
        }
      }, 1000)
    })
  }

  return (
    <>
      <Header navigation={navigation} />
      <StatusBar style='auto' translucent={true} />
      <Container>
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          {!loading && (
            <FormContainer>
              <Title style={{ fontSize: 34 }}>
                Hello {userUpdate.username}
              </Title>
              <InputContainer>
                <Input
                  onChangeText={(value: string) =>
                    handleChange(value, 'username')
                  }
                  value={userUpdate.username}
                  placeholder='Name'
                />
                <Input
                  onChangeText={(value: string) => handleChange(value, 'email')}
                  autoCapitalize='none'
                  value={userUpdate.email}
                  placeholder='Email'
                />
                <Input
                  onChangeText={(value: string) =>
                    handleChange(value, 'password')
                  }
                  secureTextEntry
                  autoCapitalize='none'
                  value={userUpdate.password}
                  placeholder='Password'
                />

                <Input
                  onChangeText={(value: string) =>
                    handleChange(value, 'password_confirmation')
                  }
                  secureTextEntry
                  autoCapitalize='none'
                  value={userUpdate.password_confirmation}
                  placeholder='Password confirmation'
                />

                <Button
                  onPress={handleClick}
                  margin='21px'
                  fontSize='30px'
                  width='180px'
                  color={theme.colors.green}
                >
                  <Text>
                    Update{' '}
                    <AntDesign
                      name='arrowright'
                      size={30}
                      color={theme.colors.green}
                    />
                  </Text>
                </Button>
              </InputContainer>
            </FormContainer>
          )}
          {loading && (
            <ActivityIndicator size={110} color={theme.colors.green} />
          )}
        </View>
      </Container>
    </>
  )
}
